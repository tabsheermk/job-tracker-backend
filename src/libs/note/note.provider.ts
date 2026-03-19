import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, NOTE_MODEL } from 'src/utils/constants';
import { Note, NoteSchema } from './note.schema';

export const noteProviders = [
  {
    provide: NOTE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(Note.name, NoteSchema),
    inject: [DATABASE_CONNECTION],
  },
];
