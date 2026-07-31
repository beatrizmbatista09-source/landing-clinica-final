import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useClinic } from '@/hooks/useClinic';
import { applyClinicTheme } from '@/lib/theme';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Treatments } from '@/components/Treatments';
import { BeforeAfter } from '@/components/BeforeAfter';
import { Features } from '@/components/Features';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ClinicSwitcher } from '@/components/ClinicSwitcher';
import { LoadingScreen, ErrorScreen } from '@/components/Screens';

interface ClinicOption {
  slug: string;
  name: string;
  city: string;
}

export default function App() {
  const [slug, setSlug] = useState('lumiere');
  const [clinics, setClinics] = useState<ClinicOption[]>([]);
  const { data, loading, error } = useClinic(slug);

  useEffect(() => {
    supabase
      .from('clinics')
      .select('slug, name, city')
      .order('name')
      .then(({ data: rows }) => {
        if (rows) setClinics(rows as ClinicOption[]);
      });
  }, []);

  useEffect(() => {
    if (data) {
      applyClinicTheme(data.clinic);
      const titleParts = [data.clinic.name, data.clinic.tagline].filter(Boolean);
      document.title = titleParts.length
        ? titleParts.join(' · ')
        : 'Clínica · Medicina Estética';
    }
  }, [data]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!data) return <ErrorScreen message="Clínica não encontrada." />;

  const { clinic, features, process, treatments, beforeAfter, testimonials, faqs } =
    data;

  return (
    <>
      <Header clinic={clinic} />
      <main>
        <Hero clinic={clinic} />
        <Treatments treatments={treatments} />
        <BeforeAfter items={beforeAfter} />
        <Features features={features} />
        <Process steps={process} />
        <Testimonials testimonials={testimonials} />
        <Faq faqs={faqs} />
        <Contact clinic={clinic} />
      </main>
      <Footer clinic={clinic} />
      <ClinicSwitcher
        clinics={clinics}
        currentSlug={slug}
        onSelect={setSlug}
      />
    </>
  );
}
