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
  ) {
    // this.getNearestBalance();
    this.calculateBalance(
      '5d7a2030266769200c0ffb4e',
      '5d7a202c266769200c0ffb4d',
      moment()
        .endOf('day')
        .toDate(),
    );
  }

  async calculateBalance(
    stock_id: string,
    product_id: string,
    date: Date,
  ): Promise<number> {
    let startDate = moment('2019-09-12')
      .startOf('day')
      .toDate();
    let endDate = moment('2019-09-20')
      .endOf('day')
      .toDate();
    let aggregated = await this.transactionModel
      .aggregate([
        {
          $match: {
            _product: new ObjectID(product_id),
            _stock: new ObjectID(stock_id),
            createdAt: {
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: '$_product',
            startIncome: {
              $sum: {
                $cond: [{ $lte: ['$createdAt', startDate] }, '$income', 0],
              },
            },
            startOutcome: {
              $sum: {
                $cond: [{ $lte: ['$createdAt', startDate] }, '$outcome', 0],
              },
            },
            totalIncome: {
              $sum: '$income',
            },
            totalOutcome: {
              $sum: '$outcome',
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            startBalance: {
              $sum: {
                $subtract: ['$startIncome', '$startOutcome'],
              },
            },
            endBalance: {
              $sum: {
                $subtract: ['$totalIncome', '$totalOutcome'],
              },
            },
            totalIncome: {
              $sum: '$totalIncome',
            },
            totalOutcome: {
              $sum: '$totalOutcome',
            },
          },
        },
        {
          $project: {
            _id: 1,
            startBalance: 1,
            endBalance: 1,
            totalIncome: 1,
            totalOutcome: 1,
          },
        },
      ])
      .exec();
    console.log(aggregated);
    return aggregated;
  }

}
