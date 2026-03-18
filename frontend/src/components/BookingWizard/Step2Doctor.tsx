'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookingData } from './BookingWizard';
import './BookingWizard.css';
import { User, ChevronLeft } from 'lucide-react';
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
  experience?: string; // Added experience based on new code
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

  if (loading) return <div className="bw-loading">Buscando profesionales...</div>;

  return (
    <div className="bw-stepContainer">
      <div className="bw-navHeader">
        <button className="bw-backBtn" onClick={onBack}>
          <ChevronLeft size={16} /> Volver
        </button>
        <div className="bw-badges">
          <span className="bw-pillBadge">{data.specialtyName}</span>
        </div>
      </div>

      <h2 className="bw-title">Elegí tu profesional</h2>
      <p className="bw-subtitle">Contamos con un equipo altamente calificado.</p>
      
      <div className="bw-grid">
        {doctors.length === 0 ? (
          <div className="bw-emptyState">No hay profesionales disponibles para esta especialidad.</div>
        ) : (
          doctors.map((d) => (
            <button
              key={d._id}
              className={`bw-card bw-cardDoctor ${data.doctorId === d._id ? 'bw-cardActive' : ''}`}
              onClick={() => handleSelect(d)}
            >
              <div className="bw-avatar">
                <User size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="bw-cardTitle" style={{ fontSize: '1.1rem' }}>{d.name}</h3>
                <p className="bw-cardDesc">{d.experience || 'Especialista'}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
