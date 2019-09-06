import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UnitService,
  CategoryService,
  PrototypeService,
  ProductService,
  StockService,
} from './services';
import {
  UnitRef,
  UnitSchema,
  CategoryRef,
  CategorySchema,
  PrototypeRef,
  PrototypeSchema,
  StockRef,
  StockSchema,
} from './schemas';

import { SettingsController } from './settings.controller';
import {
  UnitController,
  CategoryController,
  PrototypeController,
  StockController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitRef, schema: UnitSchema },
      { name: CategoryRef, schema: CategorySchema },
      { name: PrototypeRef, schema: PrototypeSchema },
      { name: StockRef, schema: StockSchema },
    ]),
  ],
  controllers: [
    SettingsController,
    UnitController,
    CategoryController,
    PrototypeController,
    StockController,
  ],
  providers: [
    UnitService,
    CategoryService,
    PrototypeService,
    ProductService,
    StockService,
  ],
})
export class CoreModule {}
