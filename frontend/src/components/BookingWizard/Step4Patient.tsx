'use client';

import { BookingData } from './BookingWizard';
import styles from './BookingWizard.module.css';

interface Props {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function Step4Patient({ data, updateData, onSubmit, onBack, loading }: Props) {
  const { patient } = data;
  
  const isValid = patient.fullName.length > 2 && patient.email.includes('@') && patient.phone.length > 6;

  return (
    <div className={styles.stepContainer}>
      <div className={styles.navHeader}>
        <button onClick={onBack} className={styles.backBtn}>← Volver</button>
        <span className={styles.pillBadge}>{data.date} a las {data.timeStart}hs</span>
      </div>

      <h2 className={styles.title}>Tus datos</h2>
      <p className={styles.subtitle}>Completá la información para confirmar el turno.</p>
      
      <div className={styles.formGroup}>
        <div className={styles.inputBlock}>
          <label>Nombre y Apellido</label>
          <input 
            type="text" 
            placeholder="Ej: Laura Gómez"
            value={patient.fullName}
            onChange={e => updateData({ patient: { ...patient, fullName: e.target.value } })}
          />
        </div>

        <div className={styles.inputBlock}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="tu@email.com"
            value={patient.email}
            onChange={e => updateData({ patient: { ...patient, email: e.target.value } })}
          />
        </div>

        <div className={styles.inputBlock}>
          <label>Teléfono (WhatsApp)</label>
          <input 
            type="tel" 
            placeholder="Ej: 11 0000 0000"
            value={patient.phone}
            onChange={e => updateData({ patient: { ...patient, phone: e.target.value } })}
          />
        </div>
      </div>

      <div className={styles.actionsBox}>
        <button 
          className={styles.submitBtn} 
          disabled={!isValid || loading}
          onClick={onSubmit}
        >
          {loading ? 'Confirmando...' : 'Confirmar Turno'}
        </button>
      </div>
    </div>
  );
}
