import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note } from './note.schema';
import { CreateNoteRequest } from './dtos/create_note.request';
import { CreateNoteResponse } from './dtos/create_note.response';
import { Job } from '../job/job.schema';
import { GetNotesResponseList } from './dtos/get_notes.response';
import { UpdateNoteRequest } from './dtos/update_note.request';

@Injectable()
export class NoteService {
  constructor(
    @Inject('NOTE_MODEL') private readonly noteModel: Model<Note>,
    @Inject('JOB_MODEL') private readonly jobModel: Model<Job>,
  ) {}

  // TODO: see if we can directly just use .lean() insted of .exec() and .toObject()
  async create(body: CreateNoteRequest): Promise<CreateNoteResponse> {
    const job = await this.jobModel
      .findOne({ _id: body.jobId, isDeleted: { $ne: true } })
      .exec();

    if (!job) {
      throw new HttpException('Jot not found', HttpStatus.NOT_FOUND);
    }

    const note = new this.noteModel(body);

    await note.save();

    const { isDeleted, ...createdNote } = note.toObject();

    return { ...createdNote, jobId: createdNote.jobId.toString() };
  }

  async findAll(jobId: string): Promise<GetNotesResponseList> {
    const job = await this.jobModel.findOne({
      _id: jobId,
      isDeleted: { $ne: true },
    });

    if (!job) {
      throw new HttpException('JOb not found', HttpStatus.NOT_FOUND);
    }

    const notes = await this.noteModel
      .find({ jobId: jobId, isDeleted: { $ne: true } })
      .select('-isDeleted')
      .exec();

    const res = notes.map((note) => {
      return {
        ...note,
        jobId: note.jobId.toString(),
      };
    });

    return { data: res };
  }

  // TODO: check to add .lean() to all other findOne in other place as well
  async findOne(noteId: string): Promise<CreateNoteResponse> {
    const note = await this.noteModel
      .findOne({ _id: noteId, isDeleted: { $ne: true } })
      .select('-isDeleted')
      .lean()
      .exec();

    if (!note) {
      throw new HttpException('NOte not foudn', HttpStatus.NOT_FOUND);
    }

    return { ...note, jobId: note.jobId.toString() };
  }

  async update(
    noteId: string,
    body: UpdateNoteRequest,
  ): Promise<CreateNoteRequest> {
    const existingNote = await this.noteModel
      .findOne({ _id: noteId, isDeleted: { $ne: true } })
      .lean()
      .exec();

    if (!existingNote) {
      throw new HttpException('NOte not foudn', HttpStatus.NOT_FOUND);
    }

    const updatedNote = await this.noteModel
      .findOneAndUpdate({ _id: noteId }, { $set: { body } }, { new: true })
      .select('-isDeleted')
      .lean()
      .exec();

    if (!updatedNote) {
      throw new HttpException(
        'NOte did not get updated',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { ...updatedNote, jobId: updatedNote.jobId.toString() };
  }

  async delete(noteId: string): Promise<void> {
    const existingNote = await this.noteModel
      .findOne({ _id: noteId, isDeleted: { $ne: true } })
      .lean()
      .exec();

    if (!existingNote) {
      throw new HttpException('NOte not foudn', HttpStatus.NOT_FOUND);
    }

    await this.noteModel
      .findOneAndUpdate({ _id: noteId }, { $set: { isDeleted: true } })
      .exec();
  }
}
