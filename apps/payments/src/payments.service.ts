import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-08-16' },
  );

  /**The createCharge method creates a charge with a test credit card provided by stipe */
  async createChargeWithTestCreditCard({ amout }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amout * 100,
      currency: 'usd',
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return paymentIntent;
  }

  /**The createCharge method creates a charge with a true credit card provided */
  // async createCharge({ card, amout }: CreateChargeDto) {
  //   const paymentMethod = await this.stripe.paymentMethods.create({
  //     type: 'card',
  //     card: card,
  //   });

  //   const paymentIntent = await this.stripe.paymentIntents.create({
  //     payment_method: paymentMethod.id,
  //     amount: amout * 100,
  //     currency: 'usd',
  //     confirm: true,
  //     payment_method_types: ['card'],
  //   });

  //   return paymentIntent;
  // }
}
