import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';

export class CreateAppointmentDto {
  specialtyId: string;
  doctorId: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  patient: {
    fullName: string;
    email: string;
    phone: string;
  };
}

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(createDto: CreateAppointmentDto) {
    const existing = await this.appointmentModel.findOne({
      doctorId: createDto.doctorId,
      date: createDto.date,
      timeStart: createDto.timeStart,
      status: { $ne: 'cancelado' }
    }).exec();

    if (existing) {
      throw new BadRequestException('El turno ya no se encuentra disponible.');
    }

    const created = new this.appointmentModel(createDto);
    return created.save();
  }

  async block(doctorId: string, blockDto: { date: string, timeStart: string, timeEnd: string }) {
    const created = new this.appointmentModel({
      ...blockDto,
      doctorId,
      specialtyId: new Types.ObjectId(), // Virtual specialty for blocks
      patient: {
        fullName: 'BLOQUEO PROFESIONAL',
        email: 'admin@vasen.com',
        phone: '000-000'
      },
      status: 'bloqueado'
    });
    return created.save();
  }

  async findByDoctorAndDate(doctorId: string, date: string) {
    return this.appointmentModel.find({
      doctorId,
      date,
      status: { $ne: 'cancelado' }
    }).exec();
  }

  async findAllAdmin() {
    return this.appointmentModel.find().populate('doctorId specialtyId').sort({ date: -1, timeStart: -1 }).exec();
  }

  async findByDoctor(doctorId: string) {
    return this.appointmentModel.find({ doctorId }).populate('doctorId specialtyId').sort({ date: -1, timeStart: -1 }).exec();
  }

  async updateStatus(id: string, status: string, reason?: string) {
    const update: any = { status };
    if (status === 'cancelado' && reason) {
      update.cancellationReason = reason;
    }
    return this.appointmentModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async getStats() {
    const total = await this.appointmentModel.countDocuments();
    const completed = await this.appointmentModel.countDocuments({ status: 'completado' });
    const pending = await this.appointmentModel.countDocuments({ status: 'pendiente' });
    const cancelled = await this.appointmentModel.countDocuments({ status: 'cancelado' });
    
    const byDateList = await this.appointmentModel.aggregate([
      { $group: { _id: '$date', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    return { total, completed, pending, cancelled, byDate: byDateList };
  }
}
