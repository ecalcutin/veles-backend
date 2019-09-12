import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { Category, Stock, Product } from './interfaces';
import {
  CreateCategoryDto,
  CreateStockDto,
  UpdateStockDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('categories')
  async getCategories() {
    return await this.settingsService.getCategories();
  }

  @Post('categories')
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.settingsService.createCategory(category);
  }

  @Delete('categories/:id')
  async removeCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.settingsService.removeCategory(id);
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
    return await this.settingsService.createStock(stock);
  }

  @Delete('stocks/:id')
  async removeStockById(@Param('id') id: string): Promise<Category> {
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
