import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { TemplatesService } from './templates/templates.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: TemplatesService,
  ) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configService.get('GMAIL_SMTP_USER'),
      pass: this.configService.get('GMAIL_SMTP_PASSWORD'),
    },
  });

  async notifyEmail({ email, message }: NotifyEmailDto) {
    this.transporter.sendMail({
      from: this.configService.get('GMAIL_SMTP_USER'),
      to: email,
      subject: `${this.configService.get('COMPANY_NAME')} notifications`,
      text: this.templateService.notifyReservationPayment(message),
    });
  }
}
