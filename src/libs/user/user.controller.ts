import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dtos/create_user.request';
import { CreateUserResponse } from './dtos/create_user.response';
import { GetUsersRequest } from './dtos/get_users.request';
import { CreateUserResponseList } from './dtos/get_users.response';
import { UpdateUserRequest } from './dtos/update_user.request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return await this.userService.create(body);
  }

  @Get()
  async getUsers(
    @Query() query: GetUsersRequest,
  ): Promise<CreateUserResponseList> {
    return await this.userService.get(query);
  }

  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<CreateUserResponse> {
    return await this.userService.getUser(userId);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserRequest,
  ): Promise<CreateUserResponse> {
    return await this.userService.update(userId, body);
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return await this.userService.delete(userId);
  }
}
