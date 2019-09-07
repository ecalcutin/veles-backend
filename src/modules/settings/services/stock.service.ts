import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef } from '../schemas';
import { Stock } from '../interfaces';
import { CreateStockDto, UpdateStockDto } from '../dto';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
  ) { }

  async create(stock: CreateStockDto): Promise<Stock> {
    return await new this.stockModel(stock).save();
  }

  async getAll(): Promise<Stock[]> {
    return await this.stockModel.find().exec();
  }

  async getById(id: string): Promise<Stock> {
    return await this.stockModel.findById(id).exec();
  }


  async updateById(id: string, stock: UpdateStockDto): Promise<Stock> {
    return await this.stockModel
      .findByIdAndUpdate({ _id: id }, stock)
      .exec();
  }

  async removeById(id: string): Promise<Stock> {
    return await this.stockModel.findByIdAndRemove(id).exec();
  }

  async dropCollection(): Promise<void> {
    await this.stockModel.remove({}).exec();
  }
}
