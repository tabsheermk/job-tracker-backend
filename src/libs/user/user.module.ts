import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
