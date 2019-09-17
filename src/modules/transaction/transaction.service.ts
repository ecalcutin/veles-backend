import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Model } from 'mongoose';
import moment from 'moment';

import { TransactionRef } from './schemas/transaction.schema';
import {
  Transaction,
  TransactionOptions,
} from './interfaces/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionRef)
    private readonly transactionModel: Model<Transaction>,
  ) {}

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

  async createTransaction(transaction: TransactionOptions): Promise<any> {
    await new this.transactionModel(transaction).save();
  }
}
