import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, addDays, startOfToday, isSunday } from 'date-fns';
import { es } from 'date-fns/locale';
import { BookingData } from './BookingWizard';
import styles from './WizardSteps.module.css';

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
        const res = await axios.get(`http://localhost:3001/api/slots?doctorId=${data.doctorId}&date=${formattedDate}`);
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
    <div className={styles.stepContainer}>
      <div className={styles.navHeader}>
        <button onClick={onBack} className={styles.backBtn}>← Volver</button>
        <div className={styles.badges}>
          <span className={styles.pillBadge}>{data.specialtyName}</span>
          <span className={styles.pillBadge}>{data.doctorName}</span>
        </div>
      </div>

      <h2 className={styles.title}>¿Cuándo querés venir?</h2>
      <p className={styles.subtitle}>Seleccioná la fecha y horario de tu turno.</p>
      
      {/* Date Carousel */}
      <div className={styles.dateCarousel}>
        {dates.map((d, i) => {
          const isSelected = selectedDate?.getTime() === d.getTime();
          return (
            <button
              key={i}
              className={`${styles.dateBlock} ${isSelected ? styles.dateBlockSelected : ''}`}
              onClick={() => setSelectedDate(d)}
            >
              <span className={styles.dateDayName}>{format(d, 'EEE', { locale: es })}</span>
              <span className={styles.dateDayNum}>{format(d, 'd')}</span>
            </button>
          )
        })}
      </div>

      {/* Slots Grid */}
      <div className={styles.slotsSection}>
        <h3 className={styles.slotsTitle}>Horarios disponibles</h3>
        {loadingSlots ? (
          <div className={styles.loadingSmall}>Buscando horarios...</div>
        ) : slots.length === 0 ? (
          <div className={styles.emptyState}>No hay horarios disponibles para esta fecha.</div>
        ) : (
          <div className={styles.slotsGrid}>
            {slots.map((slot) => (
              <button
                key={slot}
                className={styles.slotBtn}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot} hs
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
