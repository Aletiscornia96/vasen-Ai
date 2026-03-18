'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, addDays, startOfToday, isSunday } from 'date-fns';
import { es } from 'date-fns/locale';
import API_URL from '@/lib/api-url';
import { ChevronLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { BookingData } from './BookingWizard';

interface Props {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3DateTime({ data, updateData, onNext, onBack }: Props) {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Generate next 14 valid days (skip sundays)
  useEffect(() => {
    const nextDates: Date[] = [];
    let d = startOfToday();
    while (nextDates.length < 14) {
      if (!isSunday(d)) {
        nextDates.push(d);
      }
      d = addDays(d, 1);
    }
    setDates(nextDates);
    setSelectedDate(nextDates[0]); // auto select first
  }, []);

  // Fetch slots when date or doctor changes
  useEffect(() => {
    if (!data.doctorId || !selectedDate) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      updateData({ date: formattedDate, timeStart: null, timeEnd: null }); // reset slot

      try {
        const res = await axios.get(`${API_URL}/slots?doctorId=${data.doctorId}&date=${formattedDate}`);
        setSlots(res.data.slots);
      } catch (err) {
        console.error('Error fetching slots', err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    
    fetchSlots();
  }, [data.doctorId, selectedDate]);

  const handleSlotSelect = (timeSlot: string) => {
    // timeEnd will be +30 mins simply
    const [h, m] = timeSlot.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(h, m + 30);
    const endStr = `${dateObj.getHours().toString().padStart(2,'0')}:${dateObj.getMinutes().toString().padStart(2,'0')}`;
    
    updateData({ timeStart: timeSlot, timeEnd: endStr });
    onNext();
  };

  return (
    <div className="bw-stepContainer">
      <div className="bw-navHeader">
        <button className="bw-backBtn" onClick={onBack}>
          <ChevronLeft size={16} /> Volver
        </button>
        <div className="bw-badges">
          <span className="bw-pillBadge">{data.specialtyName}</span>
          <span className="bw-pillBadge">{data.doctorName}</span>
        </div>
      </div>

      <h2 className="bw-title">Fecha y Hora</h2>
      <p className="bw-subtitle">Seleccioná el momento que mejor te quede.</p>
      
      <div className="bw-dateCarousel">
        {dates.map((d) => {
          const isSelected = selectedDate && format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          return (
            <div
              key={d.toISOString()}
              className={`bw-dateBlock ${isSelected ? 'bw-dateBlockSelected' : ''}`}
              onClick={() => setSelectedDate(d)}
            >
              <span className="bw-dateDayName">{format(d, 'eee', { locale: es })}</span>
              <span className="bw-dateDayNum">{format(d, 'd')}</span>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="bw-slotsSection">
          <h3 className="bw-slotsTitle">
            Horarios para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
          </h3>
          
          {loadingSlots ? (
            <div className="bw-loadingSmall">Buscando turnos...</div>
          ) : slots.length === 0 ? (
            <div className="bw-emptyState">No hay turnos disponibles para este día.</div>
          ) : (
            <div className="bw-slotsGrid">
              {slots.map((s) => (
                <button
                  key={s}
                  className="bw-slotBtn"
                  onClick={() => handleSlotSelect(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
