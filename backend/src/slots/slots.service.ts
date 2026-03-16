import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsService } from '../doctors/doctors.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Injectable()
export class SlotsService {
  constructor(
    private doctorsService: DoctorsService,
    private appointmentsService: AppointmentsService,
  ) {}

  async getAvailableSlots(doctorId: string, dateStr: string): Promise<string[]> {
    const doctor = await this.doctorsService.findById(doctorId);
    if (!doctor) throw new NotFoundException('Doctor no encontrado');

    const dateObj = new Date(dateStr + 'T12:00:00Z'); // Parse date safely
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = days[dateObj.getUTCDay()];

    const daySchedule = doctor.weeklySchedule?.[dayName];
    if (!daySchedule || daySchedule.length === 0) {
      return []; // Not working this day
    }

    // Generate all possible 30 min slots for the day
    const possibleSlots: string[] = [];
    for (const range of daySchedule) {
      const [startStr, endStr] = range.split('-');
      let current = this.timeToMinutes(startStr);
      const end = this.timeToMinutes(endStr);

      while (current + 30 <= end) {
        possibleSlots.push(this.minutesToTime(current));
        current += 30;
      }
    }

    // Get booked appointments for this doctor on this day
    const bookedAppointments = await this.appointmentsService.findByDoctorAndDate(doctorId, dateStr);
    
    // Remove booked slots from possible slots
    // For a 30 min appointment, it just occupies that exact slot.
    const bookedTimeStarts = bookedAppointments.map(a => a.timeStart);
    
    return possibleSlots.filter(slot => !bookedTimeStarts.includes(slot));
  }

  private timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}
