import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef } from './schemas';
import { StockModel, Stock } from './interfaces';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockRef) private readonly stockModel: Model<StockModel>,
  ) {}

  async find(): Promise<StockModel[]> {
    return await this.stockModel.find().exec();
  }

  async get(id: string): Promise<StockModel> {
    return await this.stockModel.findById(id);
  }

  async create(stock: Stock): Promise<StockModel> {
    return await new this.stockModel(stock).save();
  }

  async update(id: string, stock: Stock): Promise<StockModel> {
    return await this.stockModel.findByIdAndUpdate(id, stock).exec();
  }

  async remove(id: string): Promise<StockModel> {
    return await this.stockModel.findByIdAndRemove(id).exec();
  }
}
