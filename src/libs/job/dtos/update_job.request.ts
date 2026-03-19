import { IsEnum } from 'class-validator';
import { JobStatus } from './status.enum';

export class UpdateJobRequest {
  @IsEnum(JobStatus)
  status: JobStatus;
}
