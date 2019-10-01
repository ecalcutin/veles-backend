import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductRef, ProductSchema } from './schemas/product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductRef,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
