import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductModel, ProductPopulated } from './interfaces';
import { ProductRef } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductRef) private readonly productModel: Model<ProductModel>,
  ) {}

  async find(): Promise<ProductPopulated[]> {
    return await this.productModel
      .find()
      .populate(['_category'])
      .exec();
  }

  async create(product: Product): Promise<ProductModel> {
    return await new this.productModel(product).save();
  }

  async update(id: string, product: Product): Promise<ProductModel> {
    return await this.productModel.findByIdAndUpdate(id, product).exec();
  }

  async remove(id: string): Promise<ProductModel> {
    return await this.productModel.findByIdAndRemove(id).exec();
  }
}
