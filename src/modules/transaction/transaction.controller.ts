import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { DocumentService } from '../document';
import { TransactionService } from './transaction.service';
import { WaybillService } from './waybill.service';
import { CreateWaybill } from './dto';
import { Waybill } from './interfaces';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly waybillService: WaybillService,
    private readonly documentService: DocumentService,
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
    console.log(waybill);
    switch (waybill.action.type) {
      case 'buy':
        await this.waybillService.createWaybill({ ...waybill, type: 'income' });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item.original,
              change: Math.abs(item.quantity),
            });
          }),
        ]);
        break;
      case 'move':
        await this.waybillService.createWaybill({
          ...waybill,
          type: 'outcome',
        });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item.original,
              change: Math.abs(item.quantity) * -1,
            });
          }),
        ]);
        await this.waybillService.createWaybill({ ...waybill, type: 'income' });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.destination,
              _product: item.original,
              change: Math.abs(item.quantity),
            });
          }),
        ]);
        break;
      case 'production':
        break;
      case 'sell':
        await this.waybillService.createWaybill({
          ...waybill,
          type: 'outcome',
        });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item.original,
              change: Math.abs(item.quantity) * -1,
            });
          }),
        ]);
        break;
      case 'utilization':
        await this.waybillService.createWaybill({
          ...waybill,
          type: 'outcome',
        });
        await Promise.all([
          ...waybill.products.map(item => {
            this.transactionService.createTransaction({
              _stock: waybill.source,
              _product: item.original,
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

  @Get('/waybill/document/:id')
  async getWaybillDocument(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    let waybill = await this.waybillService.getWaybillData(id);
    let stream = this.documentService.prepareWaybillDocument(waybill.toObject());
    response.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    stream.pipe(
      response,
      { end: true },
    );
  }
}
