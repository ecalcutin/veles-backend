import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoryService,
  PrototypeService,
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
  ],
  providers: [
    CategoryService,
    PrototypeService,
    StockService,
  ],
})
export class SettingsModule { }
