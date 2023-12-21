import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '../types';

@Injectable()
export class JwtAuthGuard implements CanActivate, OnModuleInit {
  private authClient: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.authClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;

    if (!jwt) throw new UnauthorizedException('Provide a jwt token.');

    return this.authClient.authenticate({ Authentication: jwt }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
