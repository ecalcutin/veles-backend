import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WaybillRef } from './schemas';
import { Waybill } from './interfaces';

type TWaybill = {
  action: {
    type: string;
    title: string;
  };
  type: 'income' | 'outcome';
  source?: string;
  destination?: string;
  date: string;
  products: Array<any>;
};

@Injectable()
export class WaybillService {
  constructor(
    @InjectModel(WaybillRef) private readonly waybillModel: Model<Waybill>,
  ) { }

  async createWaybill(waybill: TWaybill): Promise<Waybill> {
    if (!waybill.source) delete waybill.source;
    if (!waybill.destination) delete waybill.destination;
    return await new this.waybillModel({
      action: waybill.action,
      _source: waybill.source,
      _destination: waybill.destination,
      products: waybill.products,
      date: waybill.date,
      type: waybill.type
    }).save();
  }

  async findWaybills(): Promise<Waybill[]> {
    return await this.waybillModel
      .find()
      .populate(['_source', '_destination', {
        path: 'products._id',
        populate: {
          path: '_category'
        }
      }]).sort({ createdAt: 1 })
      .exec();
  }
}
