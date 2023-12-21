import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useLogger(app.get(Logger));

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
