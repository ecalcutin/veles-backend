import { IsString, MinLength, MaxLength } from 'class-validator';

class Waybill {
  prefix: string;
  number: number;
}
export class CreateStockDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly title: string;

  readonly waybill: Waybill;
}

export class IncreaseStockWaybillNumberDto {
  readonly number: number;
}

export class UpdateStockDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly title: string;
  readonly waybill: Waybill;
}
