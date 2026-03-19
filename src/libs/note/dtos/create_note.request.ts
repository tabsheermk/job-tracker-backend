import { IsString } from 'class-validator';

export class CreateNoteRequest {
  @IsString()
  jobId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
