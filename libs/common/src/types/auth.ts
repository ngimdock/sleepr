/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface AuthenticateMessage {
  Authentication: string;
}

export interface AuthenticateResponse {
  id: string;
  email: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  authenticate(request: AuthenticateMessage): Observable<AuthenticateResponse>;
}

export interface AuthServiceController {
  authenticate(
    request: AuthenticateMessage,
  ):
    | Promise<AuthenticateResponse>
    | Observable<AuthenticateResponse>
    | AuthenticateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['authenticate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
