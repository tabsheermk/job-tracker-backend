import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteRequest } from './dtos/create_note.request';
import { GetNotesResponseList } from './dtos/get_notes.response';
import { CreateNoteResponse } from './dtos/create_note.response';
import { UpdateNoteRequest } from './dtos/update_note.request';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(
    @Body() body: CreateNoteRequest,
  ): Promise<CreateNoteRequest> {
    return await this.noteService.create(body);
  }

  @Get()
  async getNotesByJobId(jobId: string): Promise<GetNotesResponseList> {
    return await this.noteService.findAll(jobId);
  }

  @Get(':id')
  async getNoteById(@Param('id') noteId: string): Promise<CreateNoteResponse> {
    return await this.noteService.findOne(noteId);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') noteId: string,
    @Body() body: UpdateNoteRequest,
  ): Promise<CreateNoteResponse> {
    return await this.noteService.update(noteId, body);
  }

  @Delete(':id')
  async deleteNote(@Param('id') noteId: string): Promise<void> {
    return await this.noteService.delete(noteId);
  }
}
