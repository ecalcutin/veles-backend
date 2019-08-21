import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';

import { UnitService } from '../services';

@Controller('settings/units')
export class UnitController {
    constructor(private readonly unitService: UnitService) {
    }

    @Get('/')
    async list() {
        return await this.unitService.list();
    }
}