import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StockRef, CategoryRef, ProductRef } from './schemas';
import { Stock, Category, Product } from './interfaces';
import {
  CreateProductDto,
  CreateStockDto,
  CreateCategoryDto,
  UpdateProductDto,
  UpdateCategoryDto,
} from './dto';
import { TransactionRef } from '../transaction/schemas/transaction.schema';
import { Transaction } from '../transaction/interfaces/transaction.interface';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
    @InjectModel(CategoryRef) private readonly categoryModel: Model<Category>,
    @InjectModel(ProductRef) private readonly productModel: Model<Product>,
    @InjectModel(TransactionRef)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate(['_category'])
      .exec();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return await new this.productModel(product).save();
  }

  async updateProduct(id: string, product: UpdateProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product).exec();
  }

  async removeProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id).exec();
  }

  async getStocks(): Promise<Stock[]> {
    return await this.stockModel.find().exec();
  }

  async createStock(stock: CreateStockDto): Promise<Stock> {
    return await new this.stockModel(stock).save();
  }

  async removeStock(id: string): Promise<Stock> {
    await this.productModel.remove({ _stock: id }).exec();
    return await this.stockModel.findByIdAndRemove(id).exec();
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }
  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category).exec();
  }
  async createCategory(category: CreateCategoryDto): Promise<Category> {
    return await new this.categoryModel(category).save();
  }
  async removeCategory(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id).exec();
  }
}
