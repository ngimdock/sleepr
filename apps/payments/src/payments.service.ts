import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-08-16' },
  );

  async createChargeWithTestCreditCard({
    amout,
    user,
  }: PaymentsCreateChargeDto) {
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

    this.notificationService.emit('notify_email', {
      email: user.email,
      message: `Your payment of ${amout}$ has been confirmed for ${this.configService.get(
        'COMPANY_NAME',
      )}`,
    });

    return paymentIntent;
  }

  async createChargeWithValidCreditCard({
    card,
    amout,
    user,
  }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amout * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    this.notificationService.emit('notify_email', { email: user.email });

    return paymentIntent;
  }
}
