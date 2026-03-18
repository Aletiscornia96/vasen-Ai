import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookingData } from './BookingWizard';
import styles from './BookingWizard.module.css';
import { User } from 'lucide-react';
import API_URL from '@/lib/api-url';

interface Props {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type Doctor = {
  _id: string;
  name: string;
  role: string;
};

export default function Step2Doctor({ data, updateData, onNext, onBack }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data.specialtyId) return;
    
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_URL}/doctors?specialtyId=${data.specialtyId}`);
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [data.specialtyId]);

  const handleSelect = (d: Doctor) => {
    updateData({ doctorId: d._id, doctorName: d.name });
    onNext();
  };

  if (loading) return <div className={styles.loading}>Cargando profesionales...</div>;

  return (
    <div className={styles.stepContainer}>
      <div className={styles.navHeader}>
        <button onClick={onBack} className={styles.backBtn}>← Volver</button>
        <span className={styles.pillBadge}>{data.specialtyName}</span>
      </div>

      <h2 className={styles.title}>Elegí un profesional</h2>
      <p className={styles.subtitle}>Nuestro equipo está listo para atenderte.</p>
      
      {doctors.length === 0 ? (
        <div className={styles.emptyState}>No hay profesionales disponibles para esta especialidad en este momento.</div>
      ) : (
        <div className={styles.grid}>
          {doctors.map((d) => (
            <button
              key={d._id}
              className={`${styles.card} ${styles.cardDoctor} ${data.doctorId === d._id ? styles.cardActive : ''}`}
              onClick={() => handleSelect(d)}
            >
              <div className={styles.avatar}>
                <User size={32} />
              </div>
              <div className={styles.doctorInfo}>
                <h3 className={styles.cardTitle}>{d.name}</h3>
                <p className={styles.cardDesc}>{d.role}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
