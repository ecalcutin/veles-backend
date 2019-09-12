import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Get('/')
  async fetchBalance(
    @Query('stock_id') stock_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return await this.transactionService.calculateBalances(stock_id, startDate, endDate);
  }
}
