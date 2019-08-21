import { Module } from '@nestjs/common';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from './services';

import { SettingsController } from './settings.controller';

@Module({
    controllers: [SettingsController],
    providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService],
})
export class CoreModule { }