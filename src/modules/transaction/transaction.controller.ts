import { Controller, Get, Query, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { DocumentService } from '../document';

import { TransactionService } from './transaction.service';
import { CreateWaybillDto } from './dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly documentService: DocumentService,
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
  async createWaybill(@Body() waybill: CreateWaybillDto) {
    await this.transactionService.parseWaybill(waybill);
  }

  @Get('/waybill')
  async findWaybills(): Promise<any> {
    return await this.transactionService.searchWaybills();
  }

  @Post('/waybill/document')
  async getWaybillDocument(@Res() response: Response, @Body() waybill) {
    let stream = this.documentService.prepareWaybillDocument(waybill);
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
