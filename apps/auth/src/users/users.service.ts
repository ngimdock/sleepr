import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    return this.usersRepository.create({ ...dto, password: hash });
  }

  async findAll() {
    return this.usersRepository.findAll({});
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async findOneById(id: string) {
    return this.usersRepository.findOne({ id });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Invalid credentials.');

    return user;
  }

  async delete(id: string) {
    return this.usersRepository.findOneAndDelete({ id });
  }
}
