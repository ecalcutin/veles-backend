import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { StockService } from './stock.service';
import { CreateStockDto, UpdateStockDto } from './dto';
import { StockModel } from './interfaces';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('/')
  async find() {
    return await this.stockService.find();
  }

  @Post('/')
  async create(@Body() stock: CreateStockDto): Promise<StockModel> {
    return await this.stockService.create(stock);
  }

  @Put('/:id')
  async update(
    @Body() stock: UpdateStockDto,
    @Param('id') id: string,
  ): Promise<StockModel> {
    return await this.stockService.update(id, stock);
  }

  @Delete('/:id')
  async removeStockById(@Param('id') id: string): Promise<StockModel> {
    return await this.stockService.remove(id);
  }
}
