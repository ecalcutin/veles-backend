import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

import { TransactionRef } from './schemas/transaction.schema';
import { Transaction } from './interfaces/transaction.interface';
import { ObjectID } from 'bson';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionRef)
    private readonly transactionModel: Model<Transaction>,
  ) { }

  async calculateBalances(
    stock_id: string,
    start: Date,
    end: Date
  ): Promise<number> {
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
                $cond: [{ $lte: ['$createdAt', startDate] }, {
                  $subtract: ['$income', '$outcome']
                }, 0]
              }
            },
            endBalance: {
              $sum: {
                $subtract: ['$income', '$outcome']
              }
            },
            totalIncome: {
              $sum: {
                $cond: [{ $gte: ['$createdAt', startDate] }, '$income', 0]
              }
            },
            totalOutcome: {
              $sum: {
                $cond: [{ $gte: ['$createdAt', startDate] }, '$outcome', 0]
              }
            },
          },
        },
      ])
      .exec();
    return aggregated;
  }

}
