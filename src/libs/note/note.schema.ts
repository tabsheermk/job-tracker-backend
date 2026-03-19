import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

// TODO: look into whether using hydrated doc is better than this
@Schema({ versionKey: false, timestamps: true })
export class Note extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, isRequired: true, ref: 'Job' })
  jobId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true, default: ' ' })
  content: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  isDeleted: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
