import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';

import { PrototypeService } from '../services';

@Controller('settings/prototypes')
export class PrototypeController {
    constructor(private readonly prototypeService: PrototypeService) {
    }

    @Get('/')
    async list() {
        return await this.prototypeService.getAll();
    }
}