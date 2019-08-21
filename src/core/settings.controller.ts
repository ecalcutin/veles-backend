import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';
import { UnitProvider } from './providers/unit.provider';
import { CategoryProvider } from './providers/category.provider';
import { PrototypeProvider } from './providers/prototype.provider';
import { StockProvider } from './providers/stock.provider';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly unitProvider: UnitProvider,
        private readonly categoryProvider: CategoryProvider,
        private readonly prototypeProvider: PrototypeProvider,
        private readonly stockProvider: StockProvider,
    ) { }
}