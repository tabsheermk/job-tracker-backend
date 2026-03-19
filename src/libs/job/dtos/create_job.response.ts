import { JobStatus } from './status.enum';

export class CreateJobResponse {
  title: string;

  jobUrl: string;

  status: JobStatus;
}
