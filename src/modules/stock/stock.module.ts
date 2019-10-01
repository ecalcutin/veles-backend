import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockRef, StockSchema } from './schemas';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockRef, schema: StockSchema }]),
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
