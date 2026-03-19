import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, USER_MODEL } from 'src/utils/constants';
import { User, UserSchema } from './user.schema';

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(User.name, UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
