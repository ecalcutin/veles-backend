import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryRef, PrototypeRef, StockRef } from './schemas';
import { Category, Prototype, Stock } from './interfaces';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(CategoryRef) private readonly categoryModel: Model<Category>,
        @InjectModel(PrototypeRef) private readonly prototypeModel: Model<Prototype>,
        @InjectModel(StockRef) private readonly stockModel: Model<Stock>,

    ) { }

    // Category
    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return await new this.categoryModel(category).save();
    }
    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

}