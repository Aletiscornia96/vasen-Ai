'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarCheck, CalendarClock, CalendarX, TrendingUp } from 'lucide-react';
import API_URL from '@/lib/api-url';
import styles from './AdminDashboard.module.css';

interface DashboardStats {
  total: number;
  completed: number;
  pending: number;
  cancelled: number;
  byDate: { _id: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/appointments/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Format dates for chart
        const formattedData = {
          ...res.data,
          byDate: res.data.byDate.map((item: any) => ({
            day: item._id.split('-').slice(1).join('/'), // Converts YYYY-MM-DD -> MM/DD
            turnos: item.count
          }))
        };
        
        setStats(formattedData);
      } catch (error) {
        console.error('Error fetching stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className={styles.loadingState}>Cargando estadísticas...</div>;
  }

  if (!stats) {
    return <div className={styles.errorState}>Error al cargar las métricas.</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: '#f0fdf4', color: '#16a34a' }}>
            <CalendarCheck size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Completados</span>
            <span className={styles.metricValue}>{stats.completed}</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: '#fffbeb', color: '#d97706' }}>
            <CalendarClock size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Pendientes</span>
            <span className={styles.metricValue}>{stats.pending}</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: '#fef2f2', color: '#dc2626' }}>
            <CalendarX size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Cancelados</span>
            <span className={styles.metricValue}>{stats.cancelled}</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: '#f8fafc', color: 'var(--olive)' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Histórico</span>
            <span className={styles.metricValue}>{stats.total}</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Turnos por Fecha</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byDate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="turnos" fill="var(--olive)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
