import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { RmqOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { RmOptions } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
      queue: configService.get<string>('PAYMENTS_QUEUE'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
