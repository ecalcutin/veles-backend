import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { Stock, Product } from './interfaces';
import {
  CreateStockDto,
  UpdateStockDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto';
import { SettingsService } from './settings.service';

import { CategoryService } from '../categories';
import { CreateCategoryDto, UpdateCategoryDto } from '../categories/dto';
import { CategoryModel } from '../categories/interfaces';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly categoryService: CategoryService,
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
    return await this.settingsService.getProducts();
  }

  @Post('products')
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.settingsService.createProduct(product);
  }

  @Put('products/:id')
  async updateProductById(
    @Body() product: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.settingsService.updateProduct(id, product);
  }

  @Delete('products/:id')
  async removeProductById(@Param('id') id: string): Promise<Product> {
    return await this.settingsService.removeProduct(id);
  }
}
