import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { CategoryRef, CategorySchema } from './schemas';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryRef,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
