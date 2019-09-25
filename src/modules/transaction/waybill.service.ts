import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef } from '../settings/schemas';
import { Stock } from '../settings/interfaces';

import { WaybillRef } from './schemas';
import { Waybill } from './interfaces';
import { CreateWaybillDto } from './dto';

@Injectable()
export class WaybillService {
  constructor(
    @InjectModel(WaybillRef) private readonly waybillModel: Model<Waybill>,
    @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
  ) {}

  async createWaybill(waybill): Promise<Waybill> {
    if (!waybill.source) delete waybill.source;
    if (!waybill.destination) delete waybill.destination;
    let destStock = await this.stockModel
      .findByIdAndUpdate(waybill.stock, { $inc: { waybillNumber: 1 } })
      .exec();
    let destNumber = destStock.toObject().waybillNumber + 1;

    return await new this.waybillModel({
      action: waybill.action,
      _source: waybill.source,
      _destination: waybill.destination,
      _stock: waybill.stock,
      number: destNumber.toString(),
      products: waybill.products,
      date: waybill.date,
      type: waybill.action.type,
    }).save();
  }

  async findWaybills(): Promise<Waybill[]> {
    return await this.waybillModel
      .find()
      .populate([
        '_source',
        '_destination',
        {
          path: 'products.original',
        },
      ])
      .sort({ createdAt: 1 })
      .exec();
  }

  async getWaybillData(id: string): Promise<Waybill> {
    return await this.waybillModel
      .findById(id)
      .populate([
        '_source',
        '_destination',
        {
          path: 'products.original',
          populate: {
            path: '_category',
          },
        },
      ])
      .exec();
  }
}
