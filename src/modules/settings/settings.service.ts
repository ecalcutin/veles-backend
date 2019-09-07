import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PrototypeRef, StockRef, CategoryRef, ProductRef } from './schemas';
import { Prototype, Stock, Category, Product } from './interfaces';
import { CreatePrototypeDto, CreateStockDto, CreateCategoryDto, UpdatePrototypeDto } from './dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(PrototypeRef) private readonly prototypeModel: Model<Prototype>,
        @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
        @InjectModel(CategoryRef) private readonly categoryModel: Model<Category>,
        @InjectModel(ProductRef) private readonly productModel: Model<Product>,
    ) { }



    async getPrototypes(): Promise<Prototype[]> {
        return await this.prototypeModel.find().populate(['_category']).exec();
    }

    async createPrototype(prototype: CreatePrototypeDto): Promise<Prototype> {
        let _prototype = await new this.prototypeModel(prototype).save();
        let stocks = await this.stockModel.find().exec();
        await Promise.all([
            ...stocks.map(_stock => new this.productModel({
                _stock,
                _prototype
            }).save())
        ])
        return _prototype;
    }

    async updatePrototype(id: string, prototype: UpdatePrototypeDto): Promise<Prototype> {
        return await this.prototypeModel.findByIdAndUpdate(id, prototype).exec();
    }

    async removePrototype(id: string): Promise<Prototype> {
        await this.productModel.remove({ _prototype: id }).exec();
        return await this.prototypeModel.findByIdAndRemove(id).exec();;
    }

    async getStocks(): Promise<Stock[]> {
        return await this.stockModel.find().exec();
    }

    async createStock(stock: CreateStockDto): Promise<Stock> {
        let _stock = await new this.stockModel(stock).save();
        let prototypes = await this.prototypeModel.find().exec();
        await Promise.all([
            ...prototypes.map(_prototype => new this.productModel({
                _prototype,
                _stock
            }).save())
        ])
        return _stock;
    }

    async removeStock(id: string): Promise<Stock> {
        await this.productModel.remove({ _stock: id }).exec();
        return await this.stockModel.findByIdAndRemove(id).exec();
    }


    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }
    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return await new this.categoryModel(category).save();
    }
    async removeCategory(id: string): Promise<Category> {
        return await this.categoryModel.findByIdAndRemove(id).exec();
    }

}