import styles from './Schedule.module.css';

const scheduleData = [
  { day: 'Lunes a Viernes', hours: '9:00 a 20:00', available: true },
  { day: 'Sábados', hours: '9:00 a 14:00', available: true },
  { day: 'Domingos', hours: 'Cerrado', available: false },
];

export default function Schedule() {
  return (
    <section id="horarios" className={styles.schedule}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSide}>
            <span className={styles.label}>Horarios de Atención</span>
            <h2 className={styles.title}>
              Nuestros{' '}
              <em>horarios</em>
            </h2>
            <p className={styles.subtitle}>
              Te esperamos de lunes a sábados para brindarte la mejor atención 
              en un ambiente cálido y profesional.
            </p>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.logoSymbol}>
                <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <path d="M30 5L15 20L30 35L45 20L30 5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M20 25C20 25 25 35 30 35C35 35 40 25 40 25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M15 20C15 20 22 30 30 35C38 30 45 20 45 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="30" cy="40" rx="12" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div className={styles.cardHeaderText}>
                <span className={styles.cardHeaderScript}>nuestros</span>
                <span className={styles.cardHeaderTitle}>HORARIOS</span>
              </div>
            </div>

            <div className={styles.scheduleList}>
              {scheduleData.map((item) => (
                <div key={item.day} className={styles.scheduleRow}>
                  <span className={styles.scheduleDay}>{item.day}</span>
                  <span className={styles.scheduleLine}></span>
                  <span className={`${styles.scheduleHours} ${!item.available ? styles.closed : ''}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <a href="#reservar" className={styles.scheduleBtn}>
                Reservar Turno
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
