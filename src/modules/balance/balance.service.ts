import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
      .findOne({
        createdAt: {
          $lte: _date,
        },
      })
      .sort({ createdAt: -1 })
      .exec();
    console.log(balance);
    return balance;
  }
}
