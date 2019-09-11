import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoryRef,
  CategorySchema,
  StockRef,
  StockSchema,
  ProductRef,
  ProductSchema,
} from './schemas';
import { BalanceRef, BalanceSchema } from '../balance/schemas/balance.schema';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryRef, schema: CategorySchema },
      { name: StockRef, schema: StockSchema },
      { name: ProductRef, schema: ProductSchema },
      { name: BalanceRef, schema: BalanceSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
