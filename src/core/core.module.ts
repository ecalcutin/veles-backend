import { Module } from '@nestjs/common';
import { UnitProvider } from './providers/unit.provider';
import { CategoryProvider } from './providers/category.provider';
import { PrototypeProvider } from './providers/prototype.provider';
import { StockProvider } from './providers/stock.provider';
import { SettingsController } from './settings.controller';

@Module({
    controllers: [SettingsController],
    providers: [UnitProvider, CategoryProvider, PrototypeProvider, StockProvider],
})
export class CoreModule { }