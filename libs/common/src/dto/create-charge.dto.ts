import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';
import { CreateChargeMessage } from '../types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChargeDto implements Omit<CreateChargeMessage, 'user'> {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  amout: number;
}
