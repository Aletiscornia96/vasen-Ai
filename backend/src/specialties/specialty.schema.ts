import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecialtyDocument = Specialty & Document;

@Schema({ timestamps: true })
export class Specialty {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const SpecialtySchema = SchemaFactory.createForClass(Specialty);
