'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Power, PowerOff } from 'lucide-react';
import API_URL from '@/lib/api-url';
import styles from './Specialties.module.css';

export default function AdminSpecialtiesPage() {
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Specialty Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/specialties`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSpecialties(res.data);
    } catch (error) {
      console.error('Error fetching specialties', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSpecialty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/specialties`, { name, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setDescription('');
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error adding specialty', error);
      alert('Error al agregar la especialidad');
    }
  };

  const toggleStatus = async (id: string, currentlyActive: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (currentlyActive) {
        await axios.delete(`${API_URL}/specialties/${id}`, { headers });
      } else {
        await axios.patch(`${API_URL}/specialties/${id}/activate`, {}, { headers });
      }
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error toggling status', error);
    }
  };

  if (loading) return <div className={styles.loading}>Cargando especialidades...</div>;

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h3><PlusCircle size={20}/> Nueva Especialidad</h3>
        </div>
        <form onSubmit={handleAddSpecialty} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre del servicio</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Ej: Depilación Láser" />
          </div>
          <div className={styles.inputGroup} style={{ flexGrow: 2 }}>
            <label>Descripción breve</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required placeholder="Tecnología indolora..." />
          </div>
          <button type="submit" className={styles.submitBtn}>Guardar</button>
        </form>
      </section>

      <section className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <h3>Catálogo de Especialidades</h3>
          <span className={styles.badge}>{specialties.length} registradas</span>
        </div>
        
        <div className={styles.grid}>
          {specialties.map(spec => (
            <div key={spec._id} className={`${styles.card} ${!spec.isActive ? styles.inactiveCard : ''}`}>
              <div className={styles.cardHeader}>
                <h4>{spec.name}</h4>
                <span className={`${styles.statusBadge} ${spec.isActive ? styles.active : styles.inactive}`}>
                  {spec.isActive ? 'Activa' : 'Pausada'}
                </span>
              </div>
              <p>{spec.description}</p>
              
              <div className={styles.cardActions}>
                <button 
                  onClick={() => toggleStatus(spec._id, spec.isActive)}
                  className={`${styles.actionBtn} ${spec.isActive ? styles.btnDanger : styles.btnSuccess}`}
                >
                  {spec.isActive ? <PowerOff size={16}/> : <Power size={16}/>}
                  {spec.isActive ? 'Pausar servicio' : 'Reactivar'}
                </button>
              </div>
            </div>
          ))}
          {specialties.length === 0 && (
            <div className={styles.emptyState}>No hay especialidades registradas.</div>
          )}
        </div>
      </section>
    </div>
  );
}
