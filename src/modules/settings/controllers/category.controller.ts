import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';

import { CategoryService } from '../services';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../interfaces';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get('/')
    async list() {
        return await this.categoryService.getAll();
    }

    @Post('/')
    async create(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(category);
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.getById(id);
    }

    @Put('/:id')
    async updateById(@Body() category: UpdateCategoryDto, @Param('id') id: string): Promise<Category> {
        return await this.categoryService.updateById(id, category);
    }

    @Delete('/:id')
    async removeById(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.removeById(id);
    }
}