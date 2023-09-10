import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async findAll() {
    return this.usersRepository.findAll({});
  }
}
