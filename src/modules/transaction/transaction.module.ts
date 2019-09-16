import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

import { ProductRef, ProductSchema } from '../settings/schemas';
import {
  TransactionRef,
  TransactionSchema,
} from './schemas/transaction.schema';
import { WaybillController } from './waybill.controller';
import { WaybillService } from './waybill.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductRef, schema: ProductSchema },
      { name: TransactionRef, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController, WaybillController],
  providers: [TransactionService, WaybillService],
})
export class TransactionModule {}
