'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import API_URL from '@/lib/api-url';
import styles from './Appointments.module.css';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/appointments`, {
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

  const handleUpdateStatus = async (id: string, status: string) => {
    let reason = '';
    if (status === 'cancelado') {
      reason = window.prompt('Por favor, indique el motivo de la cancelación:') || '';
      if (!reason.trim()) return alert('El motivo es obligatorio para cancelar.');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/appointments/${id}/status`, 
        { status, reason }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData(); // Refresh
    } catch (error) {
      console.error('Error updating status', error);
      alert('Error al actualizar el estado.');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completado': return styles.statusCompleted;
      case 'cancelado': return styles.statusCancelled;
      case 'ausente': return styles.statusAbsent;
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
              <th>Acciones</th>
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
                  {app.status === 'cancelado' && app.cancellationReason && (
                    <span className={styles.reasonText}>Motive: {app.cancellationReason}</span>
                  )}
                </td>
                <td>
                  {app.status !== 'cancelado' && (
                    <button 
                      onClick={() => handleUpdateStatus(app._id, 'cancelado')}
                      className={styles.cancelBtn}
                      title="Cancelar turno"
                    >
                      <Trash2 size={14} />
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>No hay turnos registrados en el sistema.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
