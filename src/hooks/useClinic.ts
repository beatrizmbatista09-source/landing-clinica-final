import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  Clinic,
  ClinicContent,
  Feature,
  ProcessStep,
  Treatment,
  BeforeAfter,
  Testimonial,
  Faq,
} from '@/types/clinic';

export function useClinic(slug: string) {
  const [data, setData] = useState<ClinicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      const { data: clinic, error: clinicError } = await supabase
        .from('clinics')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (cancelled) return;

      if (clinicError) {
        setError(clinicError.message);
        setLoading(false);
        return;
      }
      if (!clinic) {
        setError('Clinic not found');
        setLoading(false);
        return;
      }

      const c = clinic as Clinic;

      const [features, process, treatments, beforeAfter, testimonials, faqs] =
        await Promise.all([
          supabase
            .from('features')
            .select('*')
            .eq('clinic_id', c.id)
            .order('sort_order'),
          supabase
            .from('process_steps')
            .select('*')
            .eq('clinic_id', c.id)
            .order('step_number'),
          supabase
            .from('treatments')
            .select('*')
            .eq('clinic_id', c.id)
            .order('sort_order'),
          supabase
            .from('before_after')
            .select('*')
            .eq('clinic_id', c.id)
            .order('sort_order'),
          supabase
            .from('testimonials')
            .select('*')
            .eq('clinic_id', c.id)
            .order('sort_order'),
          supabase
            .from('faqs')
            .select('*')
            .eq('clinic_id', c.id)
            .order('sort_order'),
        ]);

      if (cancelled) return;

      setData({
        clinic: c,
        features: (features.data ?? []) as Feature[],
        process: (process.data ?? []) as ProcessStep[],
        treatments: (treatments.data ?? []) as Treatment[],
        beforeAfter: (beforeAfter.data ?? []) as BeforeAfter[],
        testimonials: (testimonials.data ?? []) as Testimonial[],
        faqs: (faqs.data ?? []) as Faq[],
      });
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
}
