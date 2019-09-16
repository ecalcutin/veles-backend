import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { CreateWaybillDto } from './dto/CreateWayBill.dto';

@Controller('waybills')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @Post('/')
  async createWaybill(@Body() waybill: CreateWaybillDto): Promise<void> {
    console.log('Action: ', waybill.action);
    console.log('Date: ', waybill.date);
    console.log('Destination: ', waybill.destination);
    console.log('Products: ', waybill.products);

    switch (waybill.action) {
      case 'production':
        return await this.waybillService.createProductionWayBill(waybill);

      default:
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
