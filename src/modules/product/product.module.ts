import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductRef, ProductSchema } from './schemas/product.schema';

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
  providers: [],
  exports: [],
})
export class ProductModule {}
