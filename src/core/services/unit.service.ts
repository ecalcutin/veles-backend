import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

import { UnitRef } from '../schemas';
import { Unit } from '../interfaces';
import { CreateUnitDto } from '../dto';

@Injectable()
export class UnitService {
    constructor(@InjectModel(UnitRef) private readonly unitModel: PaginateModel<Unit>) { }

    async create(@Body() unit: CreateUnitDto): Promise<Unit> {
        return await new this.unitModel(unit).save();
    }

    async list(): Promise<Unit[]> {
        return await this.unitModel.find().exec();
    }

}