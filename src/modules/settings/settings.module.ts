import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoryService,
  PrototypeService,
  ProductService,
  StockService,
} from './services';
import {
  CategoryRef,
  CategorySchema,
  PrototypeRef,
  PrototypeSchema,
  StockRef,
  StockSchema,
} from './schemas';

import { SettingsController } from './settings.controller';
import {
  CategoryController,
  PrototypeController,
  StockController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryRef, schema: CategorySchema },
      { name: PrototypeRef, schema: PrototypeSchema },
      { name: StockRef, schema: StockSchema },
    ]),
  ],
  controllers: [
    SettingsController,
    CategoryController,
    PrototypeController,
    StockController,
  ],
  providers: [
    CategoryService,
    PrototypeService,
    ProductService,
    StockService,
  ],
})
export class SettingsModule {}
