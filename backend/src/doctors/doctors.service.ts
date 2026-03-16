import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  // Public: only active doctors
  async findAll() {
    return this.doctorModel.find({ isActive: true }).populate('specialtyId').exec();
  }

  // Admin: all doctors
  async findAllAdmin() {
    return this.doctorModel.find().populate('specialtyId').exec();
  }

  async findBySpecialty(specialtyId: string) {
    return this.doctorModel
      .find({ specialtyId: new Types.ObjectId(specialtyId), isActive: true })
      .populate('specialtyId')
      .exec();
  }

  async findById(id: string) {
    return this.doctorModel.findById(id).exec();
  }

  async create(createDoctorDto: any) {
    const created = new this.doctorModel(createDoctorDto);
    return created.save();
  }

  async update(id: string, updateDoctorDto: any) {
    return this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, { new: true }).exec();
  }

  async updateSettings(id: string, settings: { slotDuration: number }) {
    return this.doctorModel.findByIdAndUpdate(id, { slotDuration: settings.slotDuration }, { new: true }).exec();
  }

  async updateSchedule(id: string, schedule: Record<string, string[]>) {
    return this.doctorModel.findByIdAndUpdate(id, { weeklySchedule: schedule }, { new: true }).exec();
  }

  // Soft delete / Deactivate
  async deactivate(id: string) {
    return this.doctorModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
  }

  // Reactivate
  async activate(id: string) {
    return this.doctorModel.findByIdAndUpdate(id, { isActive: true }, { new: true }).exec();
  }
}
