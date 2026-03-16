'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, Users, Briefcase, LogOut } from 'lucide-react';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
      if (userData.role !== 'ADMIN') {
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

  if (!mounted || !user) return <div className={styles.loading}>Cargando panel...</div>;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Turnos', path: '/admin/appointments', icon: <Calendar size={20} /> },
    { name: 'Profesionales', path: '/admin/doctors', icon: <Users size={20} /> },
    { name: 'Especialidades', path: '/admin/specialties', icon: <Briefcase size={20} /> },
  ];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <h2>VÄSEN</h2>
            <span>Admin</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>A</div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>Administración</span>
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
          <h1 className={styles.pageTitle}>
            {navItems.find(i => i.path === pathname)?.name || 'Panel'}
          </h1>
        </div>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}
