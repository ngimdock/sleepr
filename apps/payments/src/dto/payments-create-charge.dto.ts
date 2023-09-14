import { CreateChargeDto, UserInterface } from '@app/common';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  user: UserInterface;
}
