import { DATABASE_CONNECTION, JOB_MODEL } from 'src/utils/constants';
import { Job, JobSchema } from './job.schema';
import { Connection } from 'mongoose';

export const jobProviders = [
  {
    provide: JOB_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Job.name, JobSchema),
    inject: [DATABASE_CONNECTION],
  },
];
