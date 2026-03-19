import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
