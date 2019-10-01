import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductModel } from './interfaces';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async find() {
    return await this.productService.find();
  }

  @Post('/')
  async create(@Body() product: CreateProductDto): Promise<ProductModel> {
    return await this.productService.create(product);
  }

  @Put('/:id')
  async update(
    @Body() product: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<ProductModel> {
    return await this.productService.update(id, product);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<ProductModel> {
    return await this.productService.remove(id);
  }
}
