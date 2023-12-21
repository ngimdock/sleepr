import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from './dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';

@Controller('payments')
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(chargeData: PaymentsCreateChargeDto) {
    return this.paymentsService.createChargeWithTestCreditCard(chargeData);
  }
}
