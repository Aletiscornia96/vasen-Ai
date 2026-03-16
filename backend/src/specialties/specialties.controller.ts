import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  // Public
  @Get()
  async findAll() {
    return this.specialtiesService.findAll();
  }

  // Admin
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAllAdmin() {
    return this.specialtiesService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSpecialtyDto: any) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSpecialtyDto: any) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/activate')
  async activate(@Param('id') id: string) {
    return this.specialtiesService.activate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    return this.specialtiesService.deactivate(id);
  }
}
