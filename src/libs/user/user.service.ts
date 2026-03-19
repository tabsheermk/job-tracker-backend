import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.schema.js';
import { Model } from 'mongoose';
import { CreateUserResponse } from './dtos/create_user.response.js';
import * as bcryptjs from 'bcryptjs';
import { CreateUserRequest } from './dtos/create_user.request.js';
import { GetUsersRequest } from './dtos/get_users.request.js';
import { CreateUserResponseList } from './dtos/get_users.response.js';
import { UpdateUserRequest } from './dtos/update_user.request.js';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(body: CreateUserRequest): Promise<CreateUserResponse> {
    const existingUser = await this.userModel.findOne({ email: body.email });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hash = await bcryptjs.hash(
      body['password'],
      Number(process.env.BCRYPT_SALT),
    );

    body['password'] = hash;

    const user = new this.userModel(body);

    await user.save();

    const { password, ...createdUser } = user.toObject();

    return createdUser;
  }

  async get(query: GetUsersRequest): Promise<CreateUserResponseList> {
    let users: CreateUserResponse[];
    if (query.sendAll === 'true') {
      users = await this.userModel
        .find({ isDeleted: { $ne: true } })
        .select('-password -isDeleted')
        .exec();
    } else {
      users = await this.userModel
        .find({ isDeleted: { $ne: true } })
        .select('-password -isDeleted')
        .skip(query.from)
        .limit(query.size);
    }

    return { data: users };
  }

  async getUser(userId: string): Promise<CreateUserResponse> {
    const user = await this.userModel
      .findOne({ _id: userId, isDeleted: { $ne: true } })
      .select('-password -isDeleted')
      .exec();

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(
    userId: string,
    body: UpdateUserRequest,
  ): Promise<CreateUserResponse> {
    const existingUser = await this.userModel
      .findOne({ _id: userId, isDeleted: { $ne: true } })
      .exec();

    if (!existingUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.userModel
      .findOneAndUpdate({ _id: userId }, { $set: body }, { new: true })
      .select('-password -isDeleted')
      .exec();

    if (!updateUser) {
      throw new HttpException(
        'Update failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = updateUser?.toObject();

    return user;
  }

  async delete(userId: string): Promise<void> {
    const existingUser = await this.userModel
      .findOne({ _id: userId, isDeleted: { $ne: true } })
      .exec();

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } },
    );
  }
}
