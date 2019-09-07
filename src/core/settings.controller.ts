import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';
import { CategoryService, PrototypeService, ProductService, StockService } from './services/';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly prototypeService: PrototypeService,
        private readonly stockService: StockService,
        private readonly productService: ProductService
    ) { }
}