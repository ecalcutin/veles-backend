import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

import { TransactionRef, TransactionSchema } from './schemas';
import { DocumentModule } from '../document';

import { StockRef, StockSchema } from '../stock/schemas';
import { ProductRef, ProductSchema } from '../product/schemas';
import { StockModule } from '../stock';

@Module({
  imports: [
    DocumentModule,
    StockModule,
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
