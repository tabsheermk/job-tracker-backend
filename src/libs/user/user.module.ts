import { Module } from '@nestjs/common';
import { userProviders } from './user.provider.js';

@Module({
  providers: [...userProviders],
})
export class UserModule {}
