import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  // Public
  @Get()
  async findAll(@Query('specialtyId') specialtyId?: string) {
    if (specialtyId) {
      return this.doctorsService.findBySpecialty(specialtyId);
    }
    return this.doctorsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    console.log('GET /api/doctors/me hit by user:', req.user);
    return this.doctorsService.findById(req.user.doctorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/settings')
  updateSettings(@Req() req, @Body() settings: { slotDuration: number }) {
    return this.doctorsService.updateSettings(req.user.doctorId, settings);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/schedule')
  updateSchedule(@Req() req, @Body() schedule: Record<string, string[]>) {
    return this.doctorsService.updateSchedule(req.user.doctorId, schedule);
  }

  // Admin
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAllAdmin() {
    return this.doctorsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDoctorDto: any) {
    return this.doctorsService.create(createDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: any) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    return this.doctorsService.activate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    // We use DELETE method semantically for removal, but service deactivates
    return this.doctorsService.deactivate(id);
  }
}
