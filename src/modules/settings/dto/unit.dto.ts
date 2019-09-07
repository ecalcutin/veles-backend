import { MinLength, MaxLength, IsString } from 'class-validator';

export class CreateUnitDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;
}

export class UpdateUnitDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;
}
