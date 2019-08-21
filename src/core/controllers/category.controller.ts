import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';

import { CategoryService } from '../services';

@Controller('settings/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get('/')
    async list() {
        return await this.categoryService.getAll();
    }
}