import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Specialty } from './specialties/specialty.schema';
import { Doctor } from './doctors/doctor.schema';
import { User } from './users/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const specialtyModel = app.get<Model<Specialty>>(getModelToken(Specialty.name));
  const doctorModel = app.get<Model<Doctor>>(getModelToken(Doctor.name));
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  console.log('Limpiando base de datos...');
  await userModel.deleteMany({});
  await specialtyModel.deleteMany({});
  await doctorModel.deleteMany({});

  console.log('Insertando especialidades...');
  const specialtiesData = [
    { name: 'Aparatología', description: 'Tecnología de última generación' },
    { name: 'Faciales', description: 'Tratamientos personalizados para el rostro' },
    { name: 'Corporales Manuales', description: 'Tratamientos corporales profesionales' },
    { name: 'Manicuría', description: 'Cuidado y diseño de uñas' },
    { name: 'Masajes', description: 'Relajación integral' },
    { name: 'Médicos', description: 'Consultas especializadas' },
    { name: 'Cejas y Pestañas', description: 'Diseño de mirada' }
  ];

  const docs = await specialtyModel.insertMany(specialtiesData);
  console.log('Especialidades insertadas');

  console.log('Insertando doctores y usuarios...');
  const mdId = docs.find(d => d.name === 'Médicos')?._id;
  const facId = docs.find(d => d.name === 'Faciales')?._id;
  const apaId = docs.find(d => d.name === 'Aparatología')?._id;

  const defaultSchedule = {
    'Lunes': ['09:00-13:00', '14:00-20:00'],
    'Martes': ['09:00-13:00', '14:00-20:00'],
    'Miércoles': ['09:00-13:00', '14:00-20:00'],
    'Jueves': ['09:00-13:00', '14:00-20:00'],
    'Viernes': ['09:00-13:00', '14:00-20:00'],
    'Sábado': ['09:00-14:00']
  };

  const doctorsData = [
    { name: 'Dra. María Laura', specialtyId: mdId as any, role: 'Médica Especialista', weeklySchedule: defaultSchedule },
    { name: 'Lic. Sofia Rossi', specialtyId: facId as any, role: 'Cosmetóloga', weeklySchedule: defaultSchedule },
    { name: 'Dra. Camila Vázquez', specialtyId: apaId as any, role: 'Especialista en Aparatología', weeklySchedule: defaultSchedule }
  ];

  const insertedDoctors = await doctorModel.insertMany(doctorsData);
  
  // Create users
  const defaultPassword = await bcrypt.hash('vasen2026', 10);
  
  // Admin
  await userModel.create({
    email: 'admin@vasen.com',
    passwordHash: defaultPassword,
    role: 'ADMIN'
  });

  // Doctors log in
  await userModel.create({
    email: 'maria@vasen.com',
    passwordHash: defaultPassword,
    role: 'DOCTOR',
    doctorId: insertedDoctors.find(d => d.name === 'Dra. María Laura')?._id
  });
  await userModel.create({
    email: 'sofia@vasen.com',
    passwordHash: defaultPassword,
    role: 'DOCTOR',
    doctorId: insertedDoctors.find(d => d.name === 'Lic. Sofia Rossi')?._id
  });
  await userModel.create({
    email: 'camila@vasen.com',
    passwordHash: defaultPassword,
    role: 'DOCTOR',
    doctorId: insertedDoctors.find(d => d.name === 'Dra. Camila Vázquez')?._id
  });

  console.log('Usuarios y Doctores insertados');
  console.log('¡Base de datos populada exitosamente!');
  await app.close();
}

bootstrap();
