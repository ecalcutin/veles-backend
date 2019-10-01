import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Model } from 'mongoose';
import moment from 'moment';

import { TransactionRef } from './schemas';
import { Transaction, TransactionOptions } from './interfaces';
import { CreateWaybillDto } from './dto';
import { StockRef } from '../settings/schemas';
import { Stock } from '../settings/interfaces';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionRef)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
  ) {}

  async incrementWaybillCount(
    stock_id: string,
    positive: boolean,
  ): Promise<string | null> {
    let stock: Stock;
    if (positive) {
      stock = await this.stockModel
        .findByIdAndUpdate(stock_id, { $inc: { incomeWaybillCount: 1 } })
        .exec();
      return `${stock.waybillPrefix}-${stock.incomeWaybillCount + 1}`;
    }
    if (!positive) {
      stock = await this.stockModel
        .findByIdAndUpdate(stock_id, { $inc: { outcomeWaybillCount: 1 } })
        .exec();
      return `${stock.waybillPrefix}-${stock.outcomeWaybillCount + 1}`;
    }
    if (stock) {
    } else {
      return null;
    }
  }

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

  async searchWaybills(options?: any) {
    let aggregated = await this.transactionModel.aggregate([
      {
        $project: {
          _id: 0,
        },
      },
      {
        $lookup: {
          from: 'stocks',
          localField: '_stock',
          foreignField: '_id',
          as: 'stock',
        },
      },
      {
        $unwind: '$stock',
      },
      {
        $lookup: {
          from: 'products',
          localField: '_product',
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
      {
        $group: {
          _id: {
            date: '$date',
            waybill_id: '$waybill_id',
            waybillType: '$waybillType',
            waybillSubType: '$waybillSubType',
            stock: '$stock',
          },
          items: {
            $push: {
              product: '$product',
              category: '$category',
              quantity: '$change',
              price: '$price.value',
            },
          },
        },
      },
    ]);
    console.log(aggregated);
    console.log(aggregated[0]);
    return aggregated;
  }

  async parseWaybill(waybill: CreateWaybillDto) {
    switch (waybill.action.type) {
      // Outcome
      case 'sell':
      case 'utilization':
        {
          let waybillID = await this.incrementWaybillCount(
            waybill.source,
            false,
          );
          await Promise.all([
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.source,
                _product: item._id,
                date: waybill.date,
                price: item.price,
                waybill_id: waybillID,
                waybillType: 'outcome',
                waybillSubType: waybill.action.title,
                change: -Math.abs(item.quantity),
                type: waybill.action.type,
              });
            }),
          ]);
        }
        break;
      // Income
      case 'buy':
      case 'import':
        {
          let waybillID = await this.incrementWaybillCount(
            waybill.destination,
            true,
          );
          await Promise.all([
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.destination,
                _product: item._id,
                date: waybill.date,
                waybill_id: waybillID,
                waybillType: 'income',
                waybillSubType: waybill.action.title,
                price: item.price,
                change: Math.abs(item.quantity),
                type: waybill.action.type,
              });
            }),
          ]);
        }
        break;
      case 'move':
        {
          let sourceWaybillID = await this.incrementWaybillCount(
            waybill.source,
            false,
          );
          let destinationWaybillID = await this.incrementWaybillCount(
            waybill.destination,
            true,
          );
          await Promise.all([
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.source,
                _product: item._id,
                date: waybill.date,
                waybill_id: sourceWaybillID,
                waybillType: 'outcome',
                waybillSubType: waybill.action.title,
                price: item.price,
                change: -Math.abs(item.quantity),
                type: waybill.action.type,
              });
            }),
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.destination,
                _product: item._id,
                date: waybill.date,
                waybill_id: destinationWaybillID,
                waybillType: 'income',
                waybillSubType: waybill.action.title,
                price: item.price,
                change: Math.abs(item.quantity),
                type: waybill.action.type,
              });
            }),
          ]);
        }
        break;
      case 'production':
        {
          let waybillID = await this.incrementWaybillCount(
            waybill.destination,
            true,
          );
          await Promise.all([
            ...waybill.products.map(item => {
              this.createTransaction({
                _stock: waybill.destination,
                _product: item._id,
                date: waybill.date,
                price: item.price,
                waybill_id: waybillID,
                waybillType: 'income',
                waybillSubType: waybill.action.title,
                change: Math.abs(item.quantity),
                type: waybill.action.type,
              });
            }),
          ]);
        }
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
