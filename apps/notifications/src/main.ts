import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { join } from 'path';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
    },
  });

  app.startAllMicroservices();
}

bootstrap();
