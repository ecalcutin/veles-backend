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
import { Waybill } from './interfaces';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly waybillService: WaybillService,
  ) { }

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

    switch (waybill.action) {
      case 'buy':
        await this.waybillService.createWaybill({ ...waybill, waybillType: 'income' });
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
        await this.waybillService.createWaybill({ ...waybill, waybillType: 'outcome' });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item._id,
              change: Math.abs(item.quantity) * -1,
            });
          }),
        ]);
        await this.waybillService.createWaybill({ ...waybill, waybillType: 'income' });
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
        await this.waybillService.createWaybill({ ...waybill, waybillType: 'outcome' });
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
        await this.waybillService.createWaybill({ ...waybill, waybillType: 'outcome' });
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

  @Get('/waybill')
  async findWaybills(): Promise<Waybill[]> {
    return await this.waybillService.findWaybills();
  }
}
