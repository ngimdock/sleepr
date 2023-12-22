import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto';

@Injectable()
export class PaymentsService {
  private notificationsService: NotificationsServiceClient;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    { apiVersion: '2023-08-16' },
  );

  async findAllPayments() {
    const payments = await this.stripe.paymentIntents.list();

    return payments.data;
  }

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

    if (!this.notificationsService) {
      this.notificationsService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    }

    this.notificationsService
      .notifyEmail({
        email: user.email,
        message: `Your payment of ${amout}$ has been confirmed for ${this.configService.get(
          'COMPANY_NAME',
        )}`,
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {});

    return paymentIntent;
  }

  async createChargeWithValidCreditCard({
    card,
    amout,
    user,
  }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: card.number,
        cvc: card.cvc,
        exp_month: card.expMonth,
        exp_year: card.expYear,
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amout * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    this.notificationsService
      .notifyEmail({
        email: user.email,
        message: `Your payment of ${amout}$ has been confirmed for ${this.configService.get(
          'COMPANY_NAME',
        )}`,
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {});

    return paymentIntent;
  }
}
