import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Specialty } from '../specialties/specialty.schema';
import { Doctor } from '../doctors/doctor.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class PatientInfo {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Specialty', required: true })
  specialtyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;

  @Prop({ required: true })
  date: string; // YYYY-MM-DD

  @Prop({ required: true })
  timeStart: string; // HH:mm

  @Prop({ required: true })
  timeEnd: string; // HH:mm

  @Prop({ type: PatientInfo, required: true })
  patient: PatientInfo;

  @Prop({ default: 'pendiente', enum: ['pendiente', 'completado', 'ausente', 'incompleto', 'cancelado', 'bloqueado'] })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
