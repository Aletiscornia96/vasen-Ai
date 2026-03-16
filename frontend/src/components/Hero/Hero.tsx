import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.particle} style={{ animationDelay: `${i * 0.8}s` }}></div>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeLine}></span>
          <span className={styles.badgeText}>Medicina Estética y Bienestar</span>
          <span className={styles.badgeLine}></span>
        </div>
        <h1 className={styles.title}>
          Tu belleza,{' '}
          <em>nuestra</em>{' '}
          pasión
        </h1>
        <p className={styles.subtitle}>
          Descubrí tratamientos estéticos de última generación en un espacio 
          diseñado para tu bienestar. Tecnología avanzada, profesionales expertos 
          y resultados que se notan.
        </p>
        <div className={styles.actions}>
          <Link href="/reservar" className={styles.primaryBtn}>
            Reservar Turno
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <a href="#tratamientos" className={styles.secondaryBtn}>
            Ver Tratamientos
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>+40</span>
            <span className={styles.statLabel}>Tratamientos</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Especialidades</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>+5</span>
            <span className={styles.statLabel}>Años de experiencia</span>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
