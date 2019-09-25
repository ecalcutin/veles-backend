import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly title: string;
  readonly waybillPrefix: string;
  readonly waybillNumber: number;
}

export class UpdateStockDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly title: string;
  readonly waybillPrefix: string;
}
