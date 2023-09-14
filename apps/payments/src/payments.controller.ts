import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern('create_charge')
  async createCharge(@Payload() chargeData: PaymentsCreateChargeDto) {
    return this.paymentsService.createChargeWithTestCreditCard(chargeData);
  }
}
