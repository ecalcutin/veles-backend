import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly unit: string;
}

export class UpdateCategoryDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  readonly unit: string;
}
