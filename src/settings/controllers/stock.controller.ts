import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { StockService } from '../services';
import { CreateStockDto } from '../dto';
import { Stock } from '../interfaces';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('/')
  async list() {
    return await this.stockService.getAll();
  }

  @Post('/')
  async create(@Body() stock: CreateStockDto): Promise<Stock> {
    return await this.stockService.create(stock);
  }
}
