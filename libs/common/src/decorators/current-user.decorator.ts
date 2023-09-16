import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);

const getCurrentUserByContext = (ctx: ExecutionContext): UserInterface => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
};
