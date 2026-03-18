'use client';

import { BookingData } from './BookingWizard';
import './BookingWizard.css';
import { ChevronLeft } from 'lucide-react';

interface Props {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function Step4Patient({ data, updateData, onSubmit, onBack, loading }: Props) {
  // The 'patient' object is no longer directly destructured from data,
  // as patient details are now direct properties of BookingData.
  // const { patient } = data;
  
  // The isValid logic is now handled directly in the disabled prop of the button
  // const isValid = patient.fullName.length > 2 && patient.email.includes('@') && patient.phone.length > 6;

  return (
    <div className="bw-stepContainer">
      <div className="bw-navHeader">
        <button className="bw-backBtn" onClick={onBack}>
          <ChevronLeft size={16} /> Volver
        </button>
        <div className="bw-badges">
          <span className="bw-pillBadge">{data.specialtyName}</span>
          <span className="bw-pillBadge">{data.doctorName}</span>
          <span className="bw-pillBadge">{data.date} - {data.timeStart}hs</span>
        </div>
      </div>

      <h2 className="bw-title">Datos del Paciente</h2>
      <p className="bw-subtitle">Completá tus datos para confirmar el turno.</p>
      
      <div className="bw-formGroup">
        <div className="bw-inputBlock">
          <label>Nombre Completo</label>
          <input 
            type="text" 
            placeholder="Ej: Ana García"
            value={data.patient.fullName}
            onChange={e => updateData({ patient: { ...data.patient, fullName: e.target.value } })}
          />
        </div>

        <div className="bw-inputBlock">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="ana@ejemplo.com"
            value={data.patient.email}
            onChange={e => updateData({ patient: { ...data.patient, email: e.target.value } })}
          />
        </div>

        <div className="bw-inputBlock">
          <label>Teléfono</label>
          <input 
            type="tel" 
            placeholder="Ej: 11 1234 5678"
            value={data.patient.phone}
            onChange={e => updateData({ patient: { ...data.patient, phone: e.target.value } })}
          />
        </div>
      </div>

      <div className="bw-actionsBox">
        <button 
          className="bw-submitBtn" 
          disabled={!data.patient.fullName || !data.patient.email || !data.patient.phone || loading}
          onClick={onSubmit}
        >
          {loading ? 'Confirmando...' : 'Confirmar Turno'}
        </button>
      </div>
    </div>
  );
}
