import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly title: string;
  readonly _category: string;

  @IsNumber()
  @IsPositive()
  readonly price_retail: number;

  @IsNumber()
  @IsPositive()
  readonly price_wholesale: number;
}

export class UpdateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  readonly title: string;
  readonly _category: string;

  @IsNumber()
  @IsPositive()
  readonly price_retail: number;

  @IsNumber()
  @IsPositive()
  readonly price_wholesale: number;
}
