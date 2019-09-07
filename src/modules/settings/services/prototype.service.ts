import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PrototypeRef } from '../schemas';
import { Prototype } from '../interfaces';
import { CreatePrototypeDto, UpdatePrototypeDto } from '../dto';
import { ProductService } from './product.service';

@Injectable()
export class PrototypeService {
  constructor(
    @InjectModel(PrototypeRef)
    private readonly prototypeModel: Model<Prototype>,
    private readonly productService: ProductService
  ) { }

  async create(prototype: CreatePrototypeDto): Promise<Prototype> {
    return await new this.prototypeModel(prototype).save();
  }

  async getAll(): Promise<Prototype[]> {
    return await this.prototypeModel
      .find()
      .populate(['category'])
      .exec();
  }

  async getById(id: string): Promise<Prototype> {
    return await this.prototypeModel.findById(id).exec();
  }

  async updateById(
    id: string,
    prototype: UpdatePrototypeDto,
  ): Promise<Prototype> {
    return await this.prototypeModel.findOneAndUpdate(id, prototype).exec();
  }

  async removeById(id: string): Promise<Prototype> {
    return await this.prototypeModel.findByIdAndRemove(id).exec();
  }

  async dropCollection(): Promise<void> {
    await this.prototypeModel.remove({}).exec();
  }
}
