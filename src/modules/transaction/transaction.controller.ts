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
import { CreateWaybillDto } from './dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    // private readonly documentService: DocumentService,
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
  async createWaybill(@Body() waybill: CreateWaybillDto) {
    console.log(waybill)
    await this.transactionService.parseWaybill(waybill);
  }

  @Get('/waybill')
  async findWaybills(): Promise<void> {
    return await this.transactionService.searchWaybills();
  }

  @Get('/waybill/document/:id')
  async getWaybillDocument(@Res() response: Response, @Param('id') id: string) {
    // let waybill = await this.waybillService.getWaybillData(id);
    let stream = null;
    // this.documentService.prepareWaybillDocument(
    //   null
    //   // waybill.toObject(),
    // );
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
