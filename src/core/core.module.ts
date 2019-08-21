import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from './services';
import { UnitRef, UnitSchema } from './schemas';

import { SettingsController } from './settings.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UnitRef, schema: UnitSchema }
        ])
    ],
    controllers: [SettingsController],
    providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService],
})
export class CoreModule { }