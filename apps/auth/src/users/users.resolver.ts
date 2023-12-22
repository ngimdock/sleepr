import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from './models';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { CurrentUser, UserInterface } from '@app/common';

@Resolver(UserDocument)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserDocument)
  findMe(@CurrentUser() user: UserInterface) {
    return user;
  }

  @Mutation(() => UserDocument)
  createUser(@Args('input') input: CreateUserDto) {
    return this.usersService.create(input);
  }

  @Query(() => [UserDocument], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
