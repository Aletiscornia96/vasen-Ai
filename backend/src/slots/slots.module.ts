import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { DoctorsModule } from '../doctors/doctors.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [DoctorsModule, AppointmentsModule],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
