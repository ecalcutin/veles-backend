import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;

    @IsString()
    readonly _unit: string;
}

export class UpdateCategoryDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;

    @IsString()
    readonly _unit: string;
}
