import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialty, SpecialtyDocument } from './specialty.schema';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialty.name) private specialtyModel: Model<SpecialtyDocument>,
  ) {}

  // Public
  async findAll(): Promise<Specialty[]> {
    return this.specialtyModel.find({ isActive: true }).exec();
  }

  // Admin
  async findAllAdmin(): Promise<Specialty[]> {
    return this.specialtyModel.find().exec();
  }

  async findById(id: string) {
    return this.specialtyModel.findById(id).exec();
  }

  async create(createSpecialtyDto: any) {
    const createdSpecialty = new this.specialtyModel(createSpecialtyDto);
    return createdSpecialty.save();
  }

  async update(id: string, updateSpecialtyDto: any) {
    return this.specialtyModel.findByIdAndUpdate(id, updateSpecialtyDto, { new: true }).exec();
  }

  async deactivate(id: string) {
    return this.specialtyModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
  }

  async activate(id: string) {
    return this.specialtyModel.findByIdAndUpdate(id, { isActive: true }, { new: true }).exec();
  }
}
