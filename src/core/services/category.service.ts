import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

import { CategoryRef } from '../schemas';
import { Category } from '../interfaces';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(CategoryRef) private readonly categoryModel: PaginateModel<Category>) {

    }

    
}