import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards';
import { CurrentUser, UserInterface } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@CurrentUser() user: UserInterface) {
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.delete(userId);
  }
}
