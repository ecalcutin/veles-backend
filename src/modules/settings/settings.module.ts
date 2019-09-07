import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoryRef,
  CategorySchema,
  PrototypeRef,
  PrototypeSchema,
  StockRef,
  StockSchema,
  ProductRef,
  ProductSchema,
} from './schemas';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryRef, schema: CategorySchema },
      { name: PrototypeRef, schema: PrototypeSchema },
      { name: StockRef, schema: StockSchema },
      { name: ProductRef, schema: ProductSchema }
    ]),
  ],
  controllers: [
    SettingsController,
  ],
  providers: [
    SettingsService
  ],
})
export class SettingsModule { }
