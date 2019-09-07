import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { CategoryService, PrototypeService, ProductService, StockService } from './services/';

import { Category, Stock, Prototype } from './interfaces';
import { CreateCategoryDto, UpdateCategoryDto, CreateStockDto, UpdateStockDto, CreatePrototypeDto, UpdatePrototypeDto } from './dto';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly prototypeService: PrototypeService,
        private readonly stockService: StockService,
        private readonly productService: ProductService
    ) { }

    // Category

    @Get('categories')
    async getCategories() {
        return await this.categoryService.getAll();
    }

    @Post('categories')
    async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(category);
    }

    @Put('categories/:id')
    async updateCategoryById(@Body() category: UpdateCategoryDto, @Param('id') id: string): Promise<Category> {
        return await this.categoryService.updateById(id, category);
    }

    @Delete('categories/:id')
    async removeCategoryById(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.removeById(id);
    }

    // Stocks

    @Get('stocks')
    async getStocks() {
        return await this.stockService.getAll();
    }

    @Post('stocks')
    async createStock(@Body() stock: CreateStockDto): Promise<Stock> {
        return await this.stockService.create(stock);
    }

    // Prototypes

    @Get('prototypes')
    async getPrototypes() {
        return await this.prototypeService.getAll();
    }

    @Post('prototypes')
    async createPrototype(@Body() prototype: CreatePrototypeDto): Promise<Prototype> {
        return await this.prototypeService.create(prototype);
    }

    @Put('prototypes/:id')
    async updatePrototypeById(@Body() prototype: UpdatePrototypeDto, @Param('id') id: string): Promise<Prototype> {
        return await this.prototypeService.updateById(id, prototype);
    }

    @Delete('prototypes/:id')
    async removePrototypeById(@Param('id') id: string): Promise<Prototype> {
        return await this.prototypeService.removeById(id);
    }
}