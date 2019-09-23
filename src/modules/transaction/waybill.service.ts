import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

import { WaybillRef } from './schemas';
import { Waybill } from './interfaces';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(WaybillRef) private readonly waybillModel: Model<Waybill>,
  ) {}

  
}
