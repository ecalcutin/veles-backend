import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  TransactionRef,
  TransactionSchema,
} from '../transaction/schemas/transaction.schema';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CategoryModule } from '../category';
import { ProductModule } from '../product';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionRef, schema: TransactionSchema },
    ]),
    CategoryModule,
    ProductModule,
    StockModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
