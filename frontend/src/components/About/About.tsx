import styles from './About.module.css';

export default function About() {
  return (
    <section id="nosotros" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageBg}></div>
            <img 
              src="/assets/clinic_about.png" 
              alt="Väsen Estética - Nuestro espacio" 
              className={styles.image}
            />
            <div className={styles.accentLine}></div>
          </div>
        </div>
        <div className={styles.textCol}>
          <span className={styles.label}>Sobre Nosotros</span>
          <h2 className={styles.title}>
            Un espacio pensado para{' '}
            <em>vos</em>
          </h2>
          <p className={styles.text}>
            En Väsen Estética creemos que el cuidado personal es un acto de amor propio. 
            Nuestro centro combina tecnología de vanguardia con un enfoque humano y 
            personalizado, brindando tratamientos que realzan tu belleza natural.
          </p>
          <p className={styles.text}>
            Contamos con un equipo de profesionales altamente capacitados en medicina 
            estética, cosmetología, aparatología y bienestar corporal, listos para 
            acompañarte en cada paso de tu transformación.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Profesionales certificados</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Tecnología de última generación</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Atención personalizada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
