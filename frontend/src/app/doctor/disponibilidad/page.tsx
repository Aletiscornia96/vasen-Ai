'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, AlertCircle, Clock, Calendar } from 'lucide-react';
import styles from './Disponibilidad.module.css';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function DoctorDisponibilidadPage() {
  const [doctor, setDoctor] = useState<any>(null);
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [slotDuration, setSlotDuration] = useState(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/doctors/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctor(res.data);
      setSchedule(res.data.weeklySchedule || {});
      setSlotDuration(res.data.slotDuration || 30);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:3001/api/doctors/me/settings', { slotDuration }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await axios.patch('http://localhost:3001/api/doctors/me/schedule', schedule, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Cambios guardados con éxito');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      alert('Error guardando cambios');
    } finally {
      setSaving(false);
    }
  };

  const updateDayRanges = (day: string, value: string) => {
    const ranges = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setSchedule(prev => ({ ...prev, [day]: ranges }));
  };

  const [blockDate, setBlockDate] = useState('');
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');

  const handleBlockSlot = async () => {
    if (!blockDate || !blockStart || !blockEnd) return alert('Completá todos los campos');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/appointments/block', {
        date: blockDate,
        timeStart: blockStart,
        timeEnd: blockEnd
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Turno bloqueado con éxito');
      setBlockDate('');
      setBlockStart('');
      setBlockEnd('');
    } catch (e) {
      alert('Error bloqueando turno');
    }
  };

  if (loading) return <div className={styles.loading}>Cargando configuración...</div>;

  return (
    <div className={styles.container}>
      {/* ... previous card ... */}
      
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Calendar size={24} className={styles.headerIcon} />
          <div>
            <h3>Citas Libres / Bloqueos Rápidos</h3>
            <p>Seleccioná una fecha y hora para que nadie pueda reservar ese turno.</p>
          </div>
        </div>
        
        <div className={styles.blockForm}>
          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Desde (HH:mm)</label>
            <input type="text" placeholder="09:00" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Hasta (HH:mm)</label>
            <input type="text" placeholder="09:30" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} className={styles.input} />
          </div>
          <button onClick={handleBlockSlot} className={styles.blockBtn}>
            Bloquear este Horario
          </button>
        </div>
      </div>
    </div>
  );
}
