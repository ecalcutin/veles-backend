import { MinLength, MaxLength, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreatePrototypeDto {
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    readonly title: string;
    readonly category: string;

    @IsNumber()
    @IsPositive()
    readonly price_retail: number;

    @IsNumber()
    @IsPositive()
    readonly price_wholesale: number;
}

export class UpdatePrototypeDto {
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    readonly title: string;
    readonly category: string;

    @IsNumber()
    @IsPositive()
    readonly price_retail: number;

    @IsNumber()
    @IsPositive()
    readonly price_wholesale: number;
}
