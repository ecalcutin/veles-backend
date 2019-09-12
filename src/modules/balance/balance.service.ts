import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

import { BalanceRef } from './schemas/balance.schema';
import { Balance } from './interfaces/balance.interface';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(BalanceRef) private readonly balanceModel: Model<Balance>,
  ) {
    this.getNearestBalance();
  }

  async testBalance(options) {
    return await this.balanceModel
      .find(options)
      .populate([
        '_stock',
        {
          path: '_product',
          populate: '_category',
        },
      ])
      .exec();
  }

  async getNearestBalance() {
    let _date = Date.now();

    let balance = await this.balanceModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: moment('2019-09-10')
                .startOf('day')
                .toDate(),
              $lte: moment('2019-09-13')
                .endOf('day')
                .toDate(),
            },
          },
        },
        {
          $sort: { createdAt: 1 },
        },
        {
          $group: {
            _id: '$_product',
            startQuantity: {
              $first: '$quantity',
            },
            totalIncome: {
              $sum: '$income',
            },
          },
        },
        {
          $project: {
            _id: '$_id',
            totalIncome: 1,
            startQuantity: 1,
          },
        },
        {
          $group: {
            _id: '$_id',
            totalIncome: {
              $first: '$totalIncome',
            },
            startQuantity: {
              $first: '$startQuantity',
            },
            balance: {
              $sum: {
                $add: ['$totalIncome', '$startQuantity'],
              },
            },
          },
        },
        {
          $project: {
            _id: '$_id',
            totalIncome: 1,
            startQuantity: 1,
            balance: 1,
          },
        },
      ])
      .exec();

    console.log(balance);

    // let balance = await this.balanceModel
    //   .find({
    //     _stock: '5d7a2030266769200c0ffb4e',
    //     createdAt: {
    //       $lte: moment(),
    //       $gte: moment().subtract(3, 'day').startOf('day'),
    //     },
    //   })
    //   .sort({ createdAt: -1 })
    //   .exec();
    // console.log(balance);
    // return balance;
  }
}
