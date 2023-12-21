import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CardMessage } from '../types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CardDto implements CardMessage {
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  @Field()
  expMonth: number;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  expYear: number;

  @IsCreditCard()
  @IsNotEmpty()
  @Field()
  number: string;
}
