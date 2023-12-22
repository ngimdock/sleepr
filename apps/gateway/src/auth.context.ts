import { UnauthorizedException } from '@nestjs/common';
import { app } from './app';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { lastValueFrom } from 'rxjs';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientGrpc>(AUTH_SERVICE_NAME);

    const authService: AuthServiceClient =
      authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);

    const user = await lastValueFrom(
      authService.authenticate({ Authentication: req.headers?.authentication }),
    );

    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
