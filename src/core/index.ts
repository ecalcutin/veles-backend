import { Module } from '@nestjs/common';
import { UnitProvider } from './unit.provider';
import { CategoryProvider } from './category.provider';
import { PrototypeProvider } from './prototype.provider';
import { StockProvider } from './stock.provider';

@Module({
    providers: [UnitProvider, CategoryProvider, PrototypeProvider, StockProvider],
    exports: [StockProvider]
})
export class CoreModule { }