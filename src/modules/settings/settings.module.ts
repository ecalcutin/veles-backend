import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockRef, StockSchema } from './schemas';
import {
  TransactionRef,
  TransactionSchema,
} from '../transaction/schemas/transaction.schema';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CategoryModule } from '../category';
import { ProductModule } from '../product';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StockRef, schema: StockSchema },
      { name: TransactionRef, schema: TransactionSchema },
    ]),
    CategoryModule,
    ProductModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
