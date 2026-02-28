import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/utils/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/job-tracker'),
  },
];
