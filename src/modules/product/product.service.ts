import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductModel } from './interfaces';
import { ProductRef } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductRef) private readonly productModel: Model<ProductModel>,
  ) {}
}
