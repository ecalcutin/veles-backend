import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { PrototypeService } from '../services';
import { Prototype } from '../interfaces';
import { CreatePrototypeDto, UpdatePrototypeDto } from '../dto';

@Controller('prototypes')
export class PrototypeController {
    constructor(private readonly prototypeService: PrototypeService) {
    }

    @Get('/')
    async list() {
        return await this.prototypeService.getAll();
    }

    @Post('/')
    async create(@Body() prototype: CreatePrototypeDto): Promise<Prototype> {
        return await this.prototypeService.create(prototype);
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Prototype> {
        return await this.prototypeService.getById(id);
    }

    @Put('/:id')
    async updateById(@Body() prototype: UpdatePrototypeDto, @Param('id') id: string): Promise<Prototype> {
        return await this.prototypeService.updateById(id, prototype);
    }

    @Delete('/:id')
    async removeById(@Param('id') id: string): Promise<Prototype> {
        return await this.prototypeService.removeById(id);
    }
}