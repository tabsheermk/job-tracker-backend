import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.String, isRequired: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true, unique: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, isRequired: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Number, isRequired: true })
  age: number;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    isRequired: true,
    default: false,
  })
  employmentStatus: boolean;

  @Prop({ type: mongoose.Schema.Types.Number, isRequired: true })
  yoe: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
