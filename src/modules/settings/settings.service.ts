import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryRef, PrototypeRef, StockRef, UnitRef } from './schemas';
import { Category, Prototype, Stock, Unit } from './interfaces';
import { CreateCategoryDto, UpdateCategoryDto, CreateUnitDto } from './dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(CategoryRef) private readonly categoryModel: Model<Category>,
        @InjectModel(PrototypeRef) private readonly prototypeModel: Model<Prototype>,
        @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
        @InjectModel(UnitRef) private readonly unitModel: Model<Unit>,
    ) { }

    // Category
    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return await new this.categoryModel(category).save();
    }
    async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    // Unit
    async createUnit(unit: CreateUnitDto): Promise<Unit> {
        return await new this.unitModel(unit).save();
    }
    async getUnits(): Promise<Unit[]> {
        return await this.unitModel.find().exec();
    }
    async removeUnit(unit_id: string): Promise<void> {
        // Find & delete categories depends on that unit
        // Find & delete prototypes depends on that category
        // Find & delete products in all stocks on that prototypes

        await this.unitModel.findByIdAndRemove(unit_id).exec();
        let categories = await this.categoryModel.find({ _unit: unit_id }).exec();
        let prototypes = [];

    }

}