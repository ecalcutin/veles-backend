import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateUnitDto {
    @IsString()
    @MinLength(1)
    @MaxLength(5)
    readonly title: string;
}

export class UpdateUnitDto {
    @IsString()
    @MinLength(1)
    @MaxLength(5)
    readonly title: string;
}