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
  ) {}

  async create(stock: CreateStockDto): Promise<Stock> {
    return await new this.stockModel(stock).save();
  }

  async getAll(): Promise<Stock[]> {
    return await this.stockModel.find().exec();
  }
}
