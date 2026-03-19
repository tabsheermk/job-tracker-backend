import { IsString } from 'class-validator';

export class UpdateNoteRequest {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
