import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Model } from 'mongoose';
import moment from 'moment';

import { TransactionRef } from './schemas';
import { Transaction, TransactionOptions } from './interfaces';
import { CreateWaybillDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionRef)
    private readonly transactionModel: Model<Transaction>,
  ) { }

  async calculateBalances(
    stock_id: string,
    start: string | Date,
    end: string | Date,
  ): Promise<any> {
    let startDate = moment(start)
      .startOf('day')
      .toDate();
    let endDate = moment(end)
      .endOf('day')
      .toDate();
    let aggregated = await this.transactionModel
      .aggregate([
        {
          $match: {
            _stock: new ObjectID(stock_id),
            createdAt: {
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: '$_product',
            startBalance: {
              $sum: {
                $cond: [{ $lte: ['$createdAt', startDate] }, '$change', 0],
              },
            },
            endBalance: {
              $sum: '$change',
            },
            totalIncome: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gte: ['$createdAt', startDate] },
                      { $gt: ['$change', 0] },
                    ],
                  },
                  '$change',
                  0,
                ],
              },
            },
            totalOutcome: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gte: ['$createdAt', startDate] },
                      { $lt: ['$change', 0] },
                    ],
                  },
                  '$change',
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'product._category',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
      ])
      .exec();
    return aggregated;
  }

  async searchWaybills() {
    let aggregated = await this.transactionModel.aggregate([
      {
        $project: {
          _id: 0
        }
      },
      {
        $match: {
          _stock: new ObjectID('5d7ab3f6e8ccc22b60275206')
        }
      },
      {
        $group: {
          _id: {
            date: '$date',
            waybill_id: '$waybill_id'
          },
          items: {
            $push: {
              product: '$_product',
              quantity: '$change',
              price: '$price.value'
            }
          }
        }
      },
    ]);
    console.log(aggregated);
    console.log(aggregated[0]);
  }

  async parseWaybill(waybill: CreateWaybillDto) {
    switch (waybill.action.type) {
      // Outcome
      case 'sell':
      case 'utilization':
        await Promise.all([
          ...waybill.products.map(item => {
            this.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              date: waybill.date,
              price: item.price,
              change: -Math.abs(item.quantity),
              type: waybill.action.type
            })
          })
        ]);
        break;
      // Income
      case 'buy':
      case 'import':
        await Promise.all([
          ...waybill.products.map(item => {
            this.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              date: waybill.date,
              price: item.price,
              change: Math.abs(item.quantity),
              type: waybill.action.type
            })
          })
        ])
        break;
      case 'move':
        await Promise.all(
          [
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.source,
                _product: item._id,
                date: waybill.date,
                price: item.price,
                change: -Math.abs(item.quantity),
                type: waybill.action.type
              })
            }),
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.destination,
                _product: item._id,
                date: waybill.date,
                price: item.price,
                change: Math.abs(item.quantity),
                type: waybill.action.type
              })
            })
          ])
        break;
      case 'production':
        await Promise.all([
          ...waybill.products.map(item => {
            this.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              date: waybill.date,
              price: item.price,
              change: Math.abs(item.quantity),
              type: waybill.action.type
            })
          })
        ])
        // decrease items
        break;
      default:
        break;
    }
  }

  async createTransaction(transaction: TransactionOptions): Promise<void> {
    await new this.transactionModel(transaction).save();
  }
}
