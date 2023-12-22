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
import { Payload } from '@nestjs/microservices';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CurrentUser,
  UserInterface,
} from '@app/common';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() user: UserInterface,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(user, response);

    return { token };
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
