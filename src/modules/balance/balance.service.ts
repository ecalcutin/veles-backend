import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductRef } from '../settings/schemas';
import { Product } from '../settings/interfaces';

@Injectable()
export class BalanceService {
    constructor(
        @InjectModel(ProductRef) private readonly productModel: Model<Product>
    ) { }

    async getBalance(options): Promise<any> {
        console.log(options)
        return await this.productModel.find(options).populate(['_stock', {
            path: '_prototype',
            populate: {
                path: '_category'
            }
        }]).exec();
    }
}