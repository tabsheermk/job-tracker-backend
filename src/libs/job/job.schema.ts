import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { JobStatus } from './dtos/status.enum';

@Schema({ versionKey: false, timestamps: true })
export class Job extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, isRequired: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true })
  jobUrl: string;

  @Prop({ type: mongoose.Schema.Types.String, default: 'applied' })
  status: JobStatus;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  isDeleted: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
