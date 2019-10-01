import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockRef, StockSchema, ProductRef, ProductSchema } from './schemas';
import {
  TransactionRef,
  TransactionSchema,
} from '../transaction/schemas/transaction.schema';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CategoryModule } from '../category';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StockRef, schema: StockSchema },
      { name: ProductRef, schema: ProductSchema },
      { name: TransactionRef, schema: TransactionSchema },
    ]),
    CategoryModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
