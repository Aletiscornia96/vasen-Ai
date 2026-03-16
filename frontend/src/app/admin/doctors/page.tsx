'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, UserMinus, UserCheck, Trash2 } from 'lucide-react';
import styles from './Doctors.module.css';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Doctor Form
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [docsRes, specsRes] = await Promise.all([
        axios.get('http://localhost:3001/api/doctors/admin', { headers }),
        axios.get('http://localhost:3001/api/specialties/admin', { headers })
      ]);
      
      setDoctors(docsRes.data);
      setSpecialties(specsRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/doctors', {
        name,
        role,
        specialtyId,
        weeklySchedule: {
          'Lunes': ['09:00-13:00', '14:00-20:00'],
          'Martes': ['09:00-13:00', '14:00-20:00'],
          'Miércoles': ['09:00-13:00', '14:00-20:00'],
          'Jueves': ['09:00-13:00', '14:00-20:00'],
          'Viernes': ['09:00-13:00', '14:00-20:00'],
        } // Default schedule for MVP
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setRole('');
      setSpecialtyId('');
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error adding doctor', error);
      alert('Error al agregar el profesional');
    }
  };

  const toggleStatus = async (id: string, currentlyActive: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (currentlyActive) {
        // Soft delete (Deactivate)
        await axios.delete(`http://localhost:3001/api/doctors/${id}`, { headers });
      } else {
        // Activate
        await axios.patch(`http://localhost:3001/api/doctors/${id}/activate`, {}, { headers });
      }
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error toggling status', error);
    }
  };

  if (loading) return <div className={styles.loading}>Cargando profesionales...</div>;

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3><UserPlus size={20}/> Nuevo Profesional</h3>
        </div>
        <form onSubmit={handleAddDoctor} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Ej: Dra. Ana Pérez" />
          </div>
          <div className={styles.inputGroup}>
            <label>Cargo/Rol</label>
            <input type="text" value={role} onChange={e => setRole(e.target.value)} required placeholder="Ej: Médica Dermatóloga" />
          </div>
          <div className={styles.inputGroup}>
            <label>Especialidad Principal</label>
            <select value={specialtyId} onChange={e => setSpecialtyId(e.target.value)} required>
              <option value="">Seleccione especialidad...</option>
              {specialties.filter(s => s.isActive).map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitBtn}>Guardar Profesional</button>
        </form>
      </section>

      <section className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <h3>Plantel Profesional</h3>
          <span className={styles.badge}>{doctors.length} registrados</span>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Especialidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doc => (
                <tr key={doc._id} className={!doc.isActive ? styles.inactiveRow : ''}>
                  <td className={styles.fontWeightMedium}>{doc.name}</td>
                  <td>{doc.role}</td>
                  <td>{doc.specialtyId?.name || 'N/A'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${doc.isActive ? styles.active : styles.inactive}`}>
                      {doc.isActive ? 'Activo' : 'De baja'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleStatus(doc._id, doc.isActive)}
                      className={`${styles.actionBtn} ${doc.isActive ? styles.btnDanger : styles.btnSuccess}`}
                      title={doc.isActive ? "Dar de baja temporal" : "Reactivar en el sistema"}
                    >
                      {doc.isActive ? <UserMinus size={16}/> : <UserCheck size={16}/>}
                      {doc.isActive ? 'Dar de baja' : 'Reactivar'}
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>No hay profesionales registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
