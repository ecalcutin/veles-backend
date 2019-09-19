import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateWaybill } from './dto';

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

  @Post('/waybill/production')
  async createProductionWaybill(@Body() waybill: CreateWaybill) {
    // let rawMaterials = [];
    // create transactions for income to destination stock
    return await Promise.all([
      ...waybill.products.map(item => {
        // each item/product to calculate raw materials
        // if (item.product.requires.lenght > 0)
        //   rawMaterials.push(item.product.requires);
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: item.quantity,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
    // create transactios for outcome raw materials to be consumed
  }

  @Post('/waybill/buy')
  async createBuyWaybill(@Body() waybill: CreateWaybill) {
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: item.quantity,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }

  @Post('/waybill/import')
  async createImportWaybill(@Body() waybill: CreateWaybill) {
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: item.quantity,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }

  @Post('/waybill/return')
  async createReturnWaybill(@Body() waybill: CreateWaybill) {
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: item.quantity,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }

  @Post('/waybill/sell')
  async createSellWaybill(@Body() waybill: CreateWaybill) {
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: Math.abs(item.quantity) * -1,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }

  @Post('/waybill/realization')
  async createRealizationWaybill(@Body() waybill: CreateWaybill) {
    await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.source,
          _product: item.product._id,
          change: Math.abs(item.quantity) * -1,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: Math.abs(item.quantity),
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }

  @Post('/waybill/utilization')
  async createUtilizationWaybill(@Body() waybill: CreateWaybill) {
    return await Promise.all([
      ...waybill.products.map(item => {
        this.transactionService.createTransaction({
          _stock: waybill.destination,
          _product: item.product._id,
          change: Math.abs(item.quantity) * -1,
          action: waybill.action,
          date: waybill.date,
        });
      }),
    ]);
  }
}
