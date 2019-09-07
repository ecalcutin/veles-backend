import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;
}

export class UpdateCategoryDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;
}
