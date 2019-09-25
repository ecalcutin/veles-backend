import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WaybillService } from './waybill.service';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

import {
  ProductRef,
  ProductSchema,
  StockRef,
  StockSchema,
} from '../settings/schemas';
import {
  TransactionRef,
  TransactionSchema,
  WaybillRef,
  WaybillSchema,
} from './schemas';
import { DocumentModule } from '../document';

@Module({
  imports: [
    DocumentModule,
    MongooseModule.forFeature([
      { name: ProductRef, schema: ProductSchema },
      { name: TransactionRef, schema: TransactionSchema },
      { name: WaybillRef, schema: WaybillSchema },
      { name: StockRef, schema: StockSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, WaybillService],
})
export class TransactionModule {}
