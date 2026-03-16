import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecialtiesModule } from './specialties/specialties.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SlotsModule } from './slots/slots.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/vasen-estetica'),
    SpecialtiesModule,
    DoctorsModule,
    AppointmentsModule,
    SlotsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
