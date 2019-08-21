import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from './services';
import { UnitRef, UnitSchema, CategoryRef, CategorySchema, PrototypeRef, PrototypeSchema } from './schemas';

import { SettingsController } from './settings.controller';
import { UnitController, CategoryController, PrototypeController } from './controllers';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UnitRef, schema: UnitSchema },
            { name: CategoryRef, schema: CategorySchema },
            { name: PrototypeRef, schema: PrototypeSchema }
        ])
    ],
    controllers: [SettingsController, UnitController, CategoryController, PrototypeController],
    providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService],
})
export class CoreModule { }