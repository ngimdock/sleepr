import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgen from 'mailgen';

@Injectable()
export class TemplatesService {
  constructor(private readonly configService: ConfigService) {}

  private readonly mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: this.configService.get('COMPANY_NAME'),
      link: this.configService.get('CLIENT_APP_HOST'),
    },
  });

  notifyReservationPayment(message: string) {
    const companyName = this.configService.get('COMPANY_NAME');
    const clientHost = this.configService.get('CLIENT_APP_HOST');

    const template = {
      body: {
        name: 'there.',
        intro: message,
        action: {
          instructions: `Please click the button below to access the application.`,
          button: {
            color: '#22BC66',
            text: 'Access the application',
            link: `${clientHost}`,
          },
        },
        outro: `Need help, or have questions? Just reply to this email, we'd love to help.

                ${companyName} Team.
              `,
      },
    };

    return this.mailGenerator.generatePlaintext(template);
  }
}
