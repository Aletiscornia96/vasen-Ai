'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (pathname !== '/') {
      router.push('/#' + id);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = pathname === '/';
  const isSolid = !isHomePage || scrolled;

  return (
    <nav className={`${styles.navbar} ${isSolid ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 5L15 20L30 35L45 20L30 5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M20 25C20 25 25 35 30 35C35 35 40 25 40 25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M15 20C15 20 22 30 30 35C38 30 45 20 45 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <ellipse cx="30" cy="40" rx="12" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>VASEN</span>
            <span className={styles.logoTagline}>Estética</span>
          </div>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>Inicio</a></li>
          <li><a href="#nosotros" onClick={(e) => handleNavClick(e, 'nosotros')}>Nosotros</a></li>
          <li><a href="#tratamientos" onClick={(e) => handleNavClick(e, 'tratamientos')}>Tratamientos</a></li>
          <li><a href="#horarios" onClick={(e) => handleNavClick(e, 'horarios')}>Horarios</a></li>
          <li><a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>Contacto</a></li>
        </ul>

        {pathname !== '/reservar' && (
          <Link href="/reservar" className={styles.ctaBtn}>
            Reservar Turno
          </Link>
        )}

        <button 
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
