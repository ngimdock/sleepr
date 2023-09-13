import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern('create_charge')
  async createCharge(@Payload() chargeData: CreateChargeDto) {
    return this.paymentsService.createChargeWithTestCreditCard(chargeData);
  }
}
