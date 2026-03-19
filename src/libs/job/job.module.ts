import { Module } from '@nestjs/common';
import { jobProviders } from './job.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [...jobProviders],
})
export class JobModule {}
