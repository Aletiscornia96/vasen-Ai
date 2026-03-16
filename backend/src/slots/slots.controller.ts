import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('api/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getSlots(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    if (!doctorId || !date) {
      throw new BadRequestException('Se requiere doctorId y date (YYYY-MM-DD)');
    }
    const availableSlots = await this.slotsService.getAvailableSlots(doctorId, date);
    return { slots: availableSlots };
  }
}
