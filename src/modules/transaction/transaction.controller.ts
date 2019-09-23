import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { WaybillService } from './waybill.service';
import { CreateWaybill } from './dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly waybillService: WaybillService,
  ) {}

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
    await this.waybillService.createWaybill(waybill);
    switch (waybill.action) {
      case 'buy':
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item._id,
              change: Math.abs(item.quantity),
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
            });
          }),
        ]);
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item._id,
              change: Math.abs(item.quantity),
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
            });
          }),
        ]);
        break;
      default:
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
