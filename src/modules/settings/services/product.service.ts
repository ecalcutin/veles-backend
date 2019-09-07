import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductRef } from '../schemas';
import { Product } from '../interfaces';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductRef) private readonly productModel: Model<Product>,
    ) { }


}
