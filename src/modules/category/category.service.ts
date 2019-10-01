import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryRef } from './schemas';
import { Category, CategoryModel } from './interfaces';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryRef)
    private readonly categoryModel: Model<CategoryModel>,
  ) {}

  async find(): Promise<CategoryModel[]> {
    return await this.categoryModel.find().exec();
  }
  async update(id: string, category: Category): Promise<CategoryModel> {
    return await this.categoryModel.findByIdAndUpdate(id, category).exec();
  }

  async create(category: Category): Promise<CategoryModel> {
    return await new this.categoryModel(category).save();
  }
  async remove(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByIdAndRemove(id).exec();
  }
}
