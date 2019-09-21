import { Controller, Get, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateWaybill } from './dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

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

  @Post('/waybill')
  async createWaybill(@Body() waybill: CreateWaybill) {
    console.log(waybill);

    switch (waybill.action) {
      case 'buy':
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item._id,
              change: Math.abs(item.quantity),
              action: waybill.action,
              date: waybill.date,
            });
          }),
        ]);
        break;
      case 'move':
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              change: Math.abs(item.quantity) * -1,
              action: waybill.action,
              date: waybill.date,
            });
          }),
        ]);
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item._id,
              change: Math.abs(item.quantity),
              action: waybill.action,
              date: waybill.date,
            });
          }),
        ]);
        break;
      case 'production':
        break;
      case 'sell':
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              change: Math.abs(item.quantity) * -1,
              action: waybill.action,
              date: waybill.date,
            });
          }),
        ]);
        break;
      case 'utilization':
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              change: Math.abs(item.quantity) * -1,
              action: waybill.action,
              date: waybill.date,
            });
          }),
        ]);
        break;
      default:
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }
  }
}
