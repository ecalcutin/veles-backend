import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';
import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from './services/';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly unitService: UnitService,
        private readonly categoryService: CategoryService,
        private readonly prototypeService: PrototypeService,
        private readonly stockService: StockService,
        private readonly productService: ProductService
    ) { }
}