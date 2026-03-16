'use client';

import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Schedule from '@/components/Schedule/Schedule';
import Benefits from '@/components/Benefits/Benefits';
import BookingCTA from '@/components/BookingCTA/BookingCTA';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  useScrollAnimations();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Schedule />
      <Benefits />
      <BookingCTA />
      <Footer />
    </>
  );
}
