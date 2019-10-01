import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { Stock } from './interfaces';
import { CreateStockDto, UpdateStockDto } from './dto';
import { SettingsService } from './settings.service';

import { CategoryService } from '../category';
import { CreateCategoryDto, UpdateCategoryDto } from '../category/dto';
import { CategoryModel } from '../category/interfaces';

import { ProductService } from '../product';
import { CreateProductDto, UpdateProductDto } from '../product/dto';
import { ProductModel } from '../product/interfaces';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get('categories')
  async getCategories() {
    return await this.categoryService.find();
  }

  @Post('categories')
  async createCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<CategoryModel> {
    return await this.categoryService.create(category);
  }

  @Put('categories/:id')
  async updateCategoryById(
    @Body() category: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<CategoryModel> {
    return await this.categoryService.update(id, category);
  }

  @Delete('categories/:id')
  async removeCategoryById(@Param('id') id: string): Promise<CategoryModel> {
    return await this.categoryService.remove(id);
  }

  @Get('stocks')
  async getStocks() {
    return await this.settingsService.getStocks();
  }

  @Post('stocks')
  async createStock(@Body() stock: CreateStockDto): Promise<Stock> {
    return await this.settingsService.createStock(stock);
  }

  @Put('stocks/:id')
  async updateStockById(
    @Body() stock: UpdateStockDto,
    @Param('id') id: string,
  ): Promise<Stock> {
    return await this.settingsService.updateStock(id, stock);
  }

  @Delete('stocks/:id')
  async removeStockById(@Param('id') id: string): Promise<Stock> {
    return await this.settingsService.removeStock(id);
  }

  @Get('products')
  async getProducts() {
    return await this.productService.find();
  }

  @Post('products')
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<ProductModel> {
    return await this.productService.create(product);
  }

  @Put('products/:id')
  async updateProductById(
    @Body() product: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<ProductModel> {
    return await this.productService.update(id, product);
  }

  @Delete('products/:id')
  async removeProductById(@Param('id') id: string): Promise<ProductModel> {
    return await this.productService.remove(id);
  }
}
