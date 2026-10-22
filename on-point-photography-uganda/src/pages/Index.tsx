import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Portfolio } from '../components/Portfolio';
import { Services } from '../components/Services';
import { Skills } from '../components/Skills';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const Index: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF5A1F] selection:text-white">
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      <main>
        <Hero />
        <About />
        <Portfolio onOpenAdmin={() => setIsAdminOpen(true)} />
        <Services />
        <Skills />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default Index;
