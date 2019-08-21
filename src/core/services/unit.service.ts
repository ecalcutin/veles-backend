import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

import { UnitRef } from '../schemas';
import { Unit } from '../interfaces';
import { CreateUnitDto, UpdateUnitDto } from '../dto';

@Injectable()
export class UnitService {
    constructor(@InjectModel(UnitRef) private readonly unitModel: PaginateModel<Unit>) { }

    async create(@Body() unit: CreateUnitDto): Promise<Unit> {
        return await new this.unitModel(unit).save();
    }

    async getAll(): Promise<Unit[]> {
        return await this.unitModel.find().exec();
    }

    async getById(id: string): Promise<Unit> {
        return this.unitModel.findById(id).exec();
    }

    async updateById(id: string, unit: UpdateUnitDto): Promise<Unit> {
        return this.unitModel.findOneAndUpdate({ _id: id }, unit).exec();
    }

    async removeById(id: string): Promise<Unit> {
        return await this.unitModel.findByIdAndRemove(id).exec();
    }

    async dropCollection(): Promise<void> {
        await this.unitModel.remove({}).exec();
    }
}