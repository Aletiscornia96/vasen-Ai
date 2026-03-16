import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  // 'ADMIN' or 'DOCTOR'
  @Prop({ required: true, enum: ['ADMIN', 'DOCTOR'], default: 'DOCTOR' })
  role: string;

  // Only populated if role === 'DOCTOR'
  @Prop({ type: Types.ObjectId, ref: 'Doctor' })
  doctorId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
