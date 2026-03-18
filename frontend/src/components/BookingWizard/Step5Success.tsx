'use client';

import './BookingWizard.css';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  onReset: () => void;
}

export default function Step5Success({ onReset }: Props) {
  return (
    <div className="bw-stepContainer" style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div className="bw-successIconBox">
        <CheckCircle2 size={80} color="var(--olive)" />
      </div>
      <h2 className="bw-title">¡Turno Confirmado!</h2>
      <p className="bw-subtitle">
        Gracias por confiar en Vasen. Te enviamos los detalles de tu cita por correo electrónico.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <button className="bw-secondaryBtn" onClick={() => window.location.href = '/'}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
