import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BookingWizard from '@/components/BookingWizard/BookingWizard';

export const metadata = {
  title: 'Reservar Turno | Vasen Estética',
  description: 'Agendá tu cita en Vasen Estética de manera rápida y sencilla.',
};

export default function ReservarPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '80vh', background: 'var(--cream)' }}>
        <BookingWizard />
      </main>
      <Footer />
    </>
  );
}
