import { MinLength, MaxLength, IsString } from 'class-validator';

import { Category } from '../interfaces';

export class UpdateCategoryDto implements Category {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly unit: string;
}
