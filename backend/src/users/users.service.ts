import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createInitialAdmin(passwordHash: string) {
    const existing = await this.userModel.findOne({ role: 'ADMIN' });
    if (!existing) {
      const admin = new this.userModel({
        email: 'admin@vasen.com',
        passwordHash,
        role: 'ADMIN'
      });
      await admin.save();
    }
  }

  // Used by seed script to easily link a doctor
  async createDoctorUser(email: string, passwordHash: string, doctorId: string) {
    const existing = await this.userModel.findOne({ email });
    if (!existing) {
      const doc = new this.userModel({
        email,
        passwordHash,
        role: 'DOCTOR',
        doctorId
      });
      await doc.save();
    }
  }
}
