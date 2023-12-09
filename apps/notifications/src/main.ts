import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
      queue: configService.get<string>('NOTIFICATIONS_QUEUE'),
    },
  });

  app.startAllMicroservices();
}

bootstrap();
