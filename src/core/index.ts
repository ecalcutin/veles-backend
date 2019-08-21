import { Module } from '@nestjs/common';
import { UnitProvider } from './providers/unit.provider';
import { CategoryProvider } from './providers/category.provider';
import { PrototypeProvider } from './providers/prototype.provider';
import { StockProvider } from './providers/stock.provider';

@Module({
    providers: [UnitProvider, CategoryProvider, PrototypeProvider, StockProvider],
    exports: [StockProvider]
})
export class CoreModule { }