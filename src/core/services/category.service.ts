import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

import { CategoryRef } from '../schemas';
import { Category } from '../interfaces';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(CategoryRef) private readonly categoryModel: PaginateModel<Category>) {

    }

    async create(category: CreateCategoryDto): Promise<Category> {
        return await new this.categoryModel(category).save()
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async getById(id: string): Promise<Category> {
        return await this.categoryModel.findById(id).exec();
    }

    async updateById(id: string, category: UpdateCategoryDto): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate({ _id: id }, category).exec();
    }

    async removeById(id: string): Promise<Category> {
        return await this.categoryModel.findByIdAndRemove(id).exec();
    }

    async dropCollection(): Promise<void> {
        await this.categoryModel.remove({}).exec();
    }


}