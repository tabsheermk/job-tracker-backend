import { Module } from '@nestjs/common';
import { JobModule } from '../job/job.module';
import { jobProviders } from '../job/job.provider';
import { JobService } from '../job/job.service';
import { DatabaseModule } from '../database/database.module';
import { JobController } from '../job/job.controller';

@Module({
  imports: [DatabaseModule, JobModule],
  providers: [...jobProviders, JobService],
  controllers: [JobController],
})
export class NoteModule {}
