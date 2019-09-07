import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryRef, PrototypeRef, StockRef, UnitRef } from './schemas';
import { Category, Prototype, Stock, Unit } from './interfaces';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(CategoryRef) private readonly categoryModel: Model<Category>,
        @InjectModel(PrototypeRef) private readonly prototypeModel: Model<Prototype>,
        @InjectModel(StockRef) private readonly stockModel: Model<Stock>,
        @InjectModel(UnitRef) private readonly unitModel: Model<Unit>,
    ) { }

        
}