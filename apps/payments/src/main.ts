import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { GrpcOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { PAYMENTS_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: PAYMENTS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/payments.proto'),
      url: configService.getOrThrow('PAYMENTS_GRPC_URL'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(+configService.getOrThrow<number>('HTTP_PORT'));
}

bootstrap();
