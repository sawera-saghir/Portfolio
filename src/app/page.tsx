import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { SelectedWork } from '@/components/work/SelectedWork';
import { ServicesSection } from '@/components/services/ServicesSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-white relative overflow-x-hidden">
      {/* Site-Wide Ambient Character Presence (Natural scrolling background, never fixed, zero pointer-events) */}
      <Navbar />
      <HeroSection />
      <SelectedWork />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
