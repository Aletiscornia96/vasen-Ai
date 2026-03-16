import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService, CreateAppointmentDto } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Public ( Booking Flow )
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  // Admin / Protected
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    return this.appointmentsService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAppointments(@Request() req, @Query('doctorId') doctorId?: string) {
    // If the logged in user is a DOCTOR, enforce they only see their own appointments
    if (req.user.role === 'DOCTOR') {
      return this.appointmentsService.findByDoctor(req.user.doctorId);
    }
    
    // If ADMIN and applied filter
    if (doctorId) {
      return this.appointmentsService.findByDoctor(doctorId);
    }

    // Default ADMIN behavior
    return this.appointmentsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentsService.updateStatus(id, status);
  }
}
