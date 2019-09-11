import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BalanceRef } from './schemas/balance.schema';
import { Balance } from './interfaces/balance.interface';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(BalanceRef) private readonly balanceModel: Model<Balance>,
  ) {}
}
