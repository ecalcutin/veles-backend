import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { UnitService, CategoryService } from '../services';
import { CreateUnitDto, UpdateUnitDto } from '../dto';
import { Unit } from '../interfaces';

@Controller('units')
export class UnitController {
    constructor(
        private readonly unitService: UnitService,
        private readonly categoryService: CategoryService
    ) {
    }

    @Get('/')
    async list() {
        return await this.unitService.getAll();
    }

    @Post('/')
    async create(@Body() unit: CreateUnitDto): Promise<Unit> {
        return await this.unitService.create(unit);
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Unit> {
        return await this.unitService.getById(id);
    }

    @Put('/:id')
    async updateById(@Body() unit: UpdateUnitDto, @Param('id') id: string): Promise<Unit> {
        return await this.unitService.updateById(id, unit);
    }

    @Delete('/:id')
    async removeById(@Param('id') id: string): Promise<Unit> {
        // change to removeByUnitId
        let categories = await this.categoryService.getByUnitId(id);
        // let prototypes = [].push(
        //     // find prototypes by each category
        // )
        await Promise.all(categories.map(category => this.categoryService.removeById(category._id)))
        return await this.unitService.removeById(id);
    }
}