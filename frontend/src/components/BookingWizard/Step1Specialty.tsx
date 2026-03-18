'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookingData } from './BookingWizard';
import API_URL from '@/lib/api-url';
import { Sparkles, Activity, Hand, Droplet, Star, HeartPulse, Eye, Stethoscope } from 'lucide-react';

interface Props {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

type Specialty = {
  _id: string;
  name: string;
  description: string;
};

// Map names to Lucide icons
const getIconForSpecialty = (name: string) => {
  if (name.includes('Aparatología')) return <Activity size={24} />;
  if (name.includes('Faciales')) return <Sparkles size={24} />;
  if (name.includes('Corporales')) return <Hand size={24} />;
  if (name.includes('Manicuría')) return <Droplet size={24} />;
  if (name.includes('Masajes')) return <HeartPulse size={24} />;
  if (name.includes('Cejas')) return <Eye size={24} />;
  return <Star size={24} />;
};

export default function Step1Specialty({ data, updateData, onNext }: Props) {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const res = await axios.get(`${API_URL}/specialties`);
        setSpecialties(res.data);
      } catch (err) {
        console.error('Error fetching specialties', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecs();
  }, []);

  const handleSelect = (s: Specialty) => {
    updateData({ specialtyId: s._id, specialtyName: s.name });
    onNext();
  };

  if (loading) return <div className="bw-loading">Cargando especialidades...</div>;

  return (
    <div className="bw-stepContainer">
      <h2 className="bw-title">¿Qué tipo de tratamiento buscás?</h2>
      <p className="bw-subtitle">Seleccioná la especialidad para tu turno.</p>
      
      <div className="bw-grid">
        {specialties.map((s) => (
          <button
            key={s._id}
            className={`bw-card ${data.specialtyId === s._id ? 'bw-cardActive' : ''}`}
            onClick={() => handleSelect(s)}
          >
            <div className="bw-cardIcon">
              {getIconForSpecialty(s.name)}
            </div>
            <h3 className="bw-cardTitle">{s.name}</h3>
            <p className="bw-cardDesc">{s.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
