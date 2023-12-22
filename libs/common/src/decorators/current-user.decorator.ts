import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);

const getCurrentUserByContext = (ctx: ExecutionContext): UserInterface => {
  if (ctx.getType() === 'http') return ctx.switchToHttp().getRequest().user;

  const user = ctx.getArgs()[2].req.headers?.user;

  if (user) return JSON.parse(user);
};
