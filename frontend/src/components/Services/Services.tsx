'use client';

import { useState } from 'react';
import styles from './Services.module.css';

const serviceCategories = [
  {
    name: 'Aparatología',
    icon: '⚡',
    description: 'Tecnología de última generación para resultados visibles',
    services: ['Alpha Synergy', 'Mio Up', 'Hifu', 'Liposonix', 'Picolaser', 'Radiofrecuencia', 'Depilación láser'],
  },
  {
    name: 'Faciales',
    icon: '✨',
    description: 'Tratamientos personalizados para el cuidado de tu rostro',
    services: ['Limpieza facial', 'Microdermoabrasión', 'Dermaplaning', 'Peeling', 'Dermapen', 'Experiencia vinoterapia', 'Mesoterapia', 'Plasma rico en plaquetas', 'Bioestimuladores', 'Relleno de labios', 'Toxina botulínica'],
  },
  {
    name: 'Corporales Manuales',
    icon: '🤲',
    description: 'Tratamientos corporales con técnicas profesionales',
    services: ['Mesoterapia', 'Peptonas', 'Plasma rico en plaquetas'],
  },
  {
    name: 'Manicuría',
    icon: '💅',
    description: 'Cuidado y diseño profesional de uñas',
    services: ['Kapping', 'Semipermanente', 'Baño de gel', 'Soft gel', 'Estética de pies', 'Diseño'],
  },
  {
    name: 'Masajes',
    icon: '🧘',
    description: 'Relajación y bienestar corporal integral',
    services: ['Descontracturantes', 'Drenaje linfático', 'Deportivos', 'Relajantes'],
  },
  {
    name: 'Médicos',
    icon: '🩺',
    description: 'Consultas y tratamientos médicos especializados',
    services: ['Flebología', 'Dermatología', 'Gineco estética'],
  },
  {
    name: 'Cejas y Pestañas',
    icon: '👁️',
    description: 'Realzá tu mirada con técnicas profesionales',
    services: ['Perfilado de cejas', 'Extensiones de pestañas pelo por pelo', 'Lifting', 'Tinte de pestañas'],
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <section id="tratamientos" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Nuestros Servicios</span>
          <h2 className={styles.title}>
            Nuestros{' '}
            <em>tratamientos</em>
          </h2>
          <p className={styles.subtitle}>
            Más de 40 tratamientos diseñados para realzar tu belleza natural 
            con tecnología avanzada y el cuidado de nuestros profesionales.
          </p>
        </div>

        <div className={styles.grid}>
          {serviceCategories.map((cat, i) => (
            <div 
              key={cat.name} 
              className={`${styles.card} ${activeCategory === i ? styles.cardActive : ''}`}
              onClick={() => toggleCategory(i)}
            >
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>{cat.icon}</span>
                <h3 className={styles.cardTitle}>{cat.name}</h3>
                <p className={styles.cardDesc}>{cat.description}</p>
                <span className={styles.cardCount}>{cat.services.length} tratamientos</span>
              </div>
              
              <div className={`${styles.cardBody} ${activeCategory === i ? styles.cardBodyOpen : ''}`}>
                <div className={styles.pillsContainer}>
                  {cat.services.map((service) => (
                    <span key={service} className={styles.pill}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className={styles.cardToggle} aria-label="Ver tratamientos">
                <svg 
                  width="20" height="20" viewBox="0 0 20 20" fill="none" 
                  style={{ transform: activeCategory === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
