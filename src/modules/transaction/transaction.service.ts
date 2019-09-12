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
    let startDate = moment('2019-09-11')
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
    console.log(aggregated);
    return aggregated;
  }

}
