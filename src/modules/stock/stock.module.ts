import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockRef, StockSchema } from './schemas';
import { StockService } from './stock.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockRef, schema: StockSchema }]),
  ],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
