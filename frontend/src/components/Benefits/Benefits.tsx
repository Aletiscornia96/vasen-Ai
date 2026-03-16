import styles from './Benefits.module.css';

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Seguridad Garantizada',
    description: 'Protocolos estrictos y productos de primera calidad para tu tranquilidad.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Tecnología Avanzada',
    description: 'Equipos de última generación: Hifu, Picolaser, Radiofrecuencia y más.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Equipo Profesional',
    description: 'Médicos y cosmetólogos con años de experiencia y formación continua.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Atención Personalizada',
    description: 'Cada tratamiento es diseñado según tus necesidades y objetivos individuales.',
  },
];

export default function Benefits() {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>¿Por qué Elegirnos?</span>
          <h2 className={styles.title}>
            La excelencia como{' '}
            <em>compromiso</em>
          </h2>
        </div>
        
        <div className={styles.grid}>
          {benefits.map((benefit, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.iconWrapper}>
                {benefit.icon}
              </div>
              <h3 className={styles.itemTitle}>{benefit.title}</h3>
              <p className={styles.itemText}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
