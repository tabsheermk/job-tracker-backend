import { IsEnum, IsString, IsUrl } from 'class-validator';
import { JobStatus } from './status.enum';

export class CreateJobRequest {
  @IsString()
  title: string;

  @IsUrl()
  jobUrl: string;

  @IsEnum(JobStatus)
  status: JobStatus;

  @IsString()
  userId: string; // will be removed when auth is added so we can just take the id from token
}
