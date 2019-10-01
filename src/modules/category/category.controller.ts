import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryModel } from './interfaces';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async find() {
    return await this.categoryService.find();
  }

  @Post('/')
  async create(@Body() category: CreateCategoryDto): Promise<CategoryModel> {
    return await this.categoryService.create(category);
  }

  @Put('/:id')
  async update(
    @Body() category: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<CategoryModel> {
    return await this.categoryService.update(id, category);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<CategoryModel> {
    return await this.categoryService.remove(id);
  }
}
