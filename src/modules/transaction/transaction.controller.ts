import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  async calculateBalances(
    @Query('stock_id') stock_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.transactionService.calculateBalances(
      stock_id,
      startDate,
      endDate,
    );
  }

  @Post('/')
  async makeTransaction(
    @Body('stock_id') stock_id: string,
    @Body('product_id') product_id: string,
    @Body('change') change: number,
    @Body('action') action: string,
  ) {
    return this.transactionService.createTransaction(
      product_id,
      stock_id,
      change,
      action,
      '',
    );
  }
}
