import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WaybillRef } from './schemas';
import { Waybill } from './interfaces';

type TWaybill = {
  _source: string;
  _destination: string;
  date: string;
  items: Array<any>;
};

@Injectable()
export class WaybillService {
  constructor(
    @InjectModel(WaybillRef) private readonly waybillModel: Model<Waybill>,
  ) {}

  async createWaybill(waybill: TWaybill): Promise<Waybill> {
    return await new this.waybillModel(waybill).save();
  }
}
