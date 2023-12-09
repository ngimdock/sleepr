import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser, UserInterface } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() user: UserInterface,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(user, response);

    console.log({ loginToken: token });

    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
