import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GMAIL_SMTP_USER: Joi.string().required(),
        GMAIL_SMTP_PASSWORD: Joi.string().required(),
        COMPANY_NAME: Joi.string().required(),
        CLIENT_APP_HOST: Joi.string().required(),
        NOTIFICATIONS_GRPC_URL: Joi.string().required(),
      }),
    }),
    LoggerModule,
    TemplatesModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
