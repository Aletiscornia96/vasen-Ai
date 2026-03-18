import styles from './BookingWizard.module.css';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  onReset: () => void;
}

export default function Step5Success({ onReset }: Props) {
  return (
    <div className={styles.stepContainer} style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div className={styles.successIconBox}>
        <CheckCircle2 size={80} color="var(--olive)" />
      </div>
      <h2 className={styles.title} style={{ marginBottom: '1rem' }}>¡Turno Confirmado!</h2>
      <p className={styles.subtitle} style={{ marginBottom: '2.5rem' }}>
        Te enviamos un correo con los detalles de tu turno. 
        ¡Te esperamos en Vasen Estética!
      </p>
      
      <button className={styles.secondaryBtn} onClick={onReset}>
        Agendar otro turno
      </button>
    </div>
  );
}
