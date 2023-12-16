import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CardMessage } from '../types';

export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  expYear: number;

  @IsCreditCard()
  @IsNotEmpty()
  number: number;
}
