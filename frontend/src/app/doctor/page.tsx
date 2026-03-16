'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './DoctorAgenda.module.css';

export default function DoctorAgendaPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3001/api/appointments/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status', error);
      alert('Error al actualizar el turno');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completado': return styles.statusCompleted;
      case 'cancelado': return styles.statusCancelled;
      case 'pendiente': default: return styles.statusPending;
    }
  };

  if (loading) return <div className={styles.loading}>Sincronizando agenda...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Tus próximos turnos</h3>
        <span className={styles.badge}>{appointments.length} totales</span>
      </div>

      <div className={styles.grid}>
        {appointments.map(app => (
          <div key={app._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.dateTime}>
                <span className={styles.time}>{app.timeStart} hs</span>
                <span className={styles.date}>{format(parseISO(app.date), "dd 'de' MMMM", { locale: es })}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusBadgeClass(app.status)}`}>
                {app.status}
              </span>
            </div>
            
            <div className={styles.patientInfo}>
              <h4 className={styles.patientName}>{app.patient.fullName}</h4>
              <span className={styles.treatment}>{app.specialtyId?.name}</span>
            </div>

            <div className={styles.contactInfo}>
              <span>{app.patient.phone}</span>
              <span>{app.patient.email}</span>
            </div>

            {app.status === 'pendiente' && (
              <div className={styles.actions}>
                <button 
                  onClick={() => updateStatus(app._id, 'completado')}
                  className={styles.completeBtn}
                >
                  <CheckCircle2 size={18} /> Asistió / Completar
                </button>
                <button 
                  onClick={() => updateStatus(app._id, 'cancelado')}
                  className={styles.cancelBtn}
                >
                  <XCircle size={18} /> Ausente
                </button>
              </div>
            )}
            {app.status !== 'pendiente' && (
              <div className={styles.actionsStatic}>
                Marcado como {app.status}
              </div>
            )}
          </div>
        ))}

        {appointments.length === 0 && (
          <div className={styles.emptyState}>No tenés turnos asignados.</div>
        )}
      </div>
    </div>
  );
}
