import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

import { StockRef, StockSchema } from '../settings/schemas';
import { TransactionRef, TransactionSchema } from './schemas';
import { DocumentModule } from '../document';

import { ProductRef, ProductSchema } from '../product/schemas';

@Module({
  imports: [
    DocumentModule,
    MongooseModule.forFeature([
      { name: ProductRef, schema: ProductSchema },
      { name: TransactionRef, schema: TransactionSchema },
      { name: StockRef, schema: StockSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
