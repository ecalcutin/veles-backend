import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef } from './schemas';
import { Stock } from './interfaces';
import { CreateStockDto, UpdateStockDto } from './dto';
import { TransactionRef } from '../transaction/schemas/transaction.schema';
import { Transaction } from '../transaction/interfaces/transaction.interface';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
  ) {}

  async getStocks(): Promise<Stock[]> {
    return await this.stockModel.find().exec();
  }

  async createStock(stock: CreateStockDto): Promise<Stock> {
    return await new this.stockModel(stock).save();
  }

  async updateStock(id: string, stock: UpdateStockDto): Promise<Stock> {
    return await this.stockModel.findByIdAndUpdate(id, stock).exec();
  }

  async removeStock(id: string): Promise<Stock> {
    return await this.stockModel.findByIdAndRemove(id).exec();
  }
}
