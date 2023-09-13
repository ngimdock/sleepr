import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsCreditCard()
  @IsNotEmpty()
  number: string;
}
