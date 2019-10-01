import {
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { Product } from '../interfaces';

export class CreateProductDto implements Product {
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
