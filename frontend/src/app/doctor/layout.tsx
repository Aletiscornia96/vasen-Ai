'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, LogOut } from 'lucide-react';
import styles from './DoctorLayout.module.css';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('user');
    
    if (!token || !userDataStr) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      if (userData.role !== 'DOCTOR') {
        router.push('/login');
        return;
      }
      setUser(userData);
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!mounted || !user) return <div className={styles.loading}>Cargando panel médico...</div>;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <h2>VÄSEN</h2>
            <span>Staff Médico</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <Link 
            href="/doctor"
            className={`${styles.navItem} ${pathname === '/doctor' ? styles.active : ''}`}
          >
            <CalendarDays size={20} />
            <span>Mi Agenda</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>D</div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>Profesional</span>
              <span className={styles.userRole}>{user.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>Mi Agenda</h1>
        </div>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
