import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

import { UnitRef } from '../schemas';
import { Unit } from '../interfaces';

@Injectable()
export class UnitService {
    constructor(@InjectModel(UnitRef) private readonly unitModel: PaginateModel<Unit>) { }
}