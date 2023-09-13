import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/models';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);

const getCurrentUserByContext = (ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
};
