import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Specialty } from '../specialties/specialty.schema';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Specialty', required: true })
  specialtyId: Types.ObjectId;

  @Prop({ required: true })
  role: string;

  // Format: { "Lunes": ["09:00-13:00", "14:00-18:00"], "Martes": ... }
  @Prop({ type: Object, default: {} })
  weeklySchedule: Record<string, string[]>;

  @Prop({ default: true })
  isActive: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
