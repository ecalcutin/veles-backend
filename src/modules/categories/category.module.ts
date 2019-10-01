import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryRef, CategorySchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryRef,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService],
})
export class CategoryModule {}
