import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { UnitProvider } from './core/unit.provider';
import { StockProvider } from './core/stock.provider';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [StockProvider],
})
export class AppModule { }
