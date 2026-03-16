'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './Appointments.module.css';

export default function AdminAppointmentsPage() {
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

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completado': return styles.statusCompleted;
      case 'cancelado': return styles.statusCancelled;
      case 'pendiente': default: return styles.statusPending;
    }
  };

  if (loading) return <div className={styles.loading}>Cargando historial de turnos...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Todos los Turnos</h3>
        <span className={styles.badge}>{appointments.length} totales</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Paciente</th>
              <th>Contacto</th>
              <th>Profesional</th>
              <th>Tratamiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app._id}>
                <td>
                  <div className={styles.dateTimeCell}>
                    <span className={styles.date}>
                      {format(parseISO(app.date), "dd 'de' MMM, yyyy", { locale: es })}
                    </span>
                    <span className={styles.time}>{app.timeStart} hs</span>
                  </div>
                </td>
                <td className={styles.patientName}>{app.patient.fullName}</td>
                <td>
                  <div className={styles.contactCell}>
                    <span>{app.patient.phone}</span>
                    <span className={styles.emailText}>{app.patient.email}</span>
                  </div>
                </td>
                <td>{app.doctorId?.name}</td>
                <td>{app.specialtyId?.name}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusBadgeClass(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>No hay turnos registrados en el sistema.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
