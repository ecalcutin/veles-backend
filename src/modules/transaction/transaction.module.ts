import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

import { ProductRef, ProductSchema } from '../settings/schemas';
import {
  TransactionRef,
  TransactionSchema,
} from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductRef, schema: ProductSchema },
      { name: TransactionRef, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
