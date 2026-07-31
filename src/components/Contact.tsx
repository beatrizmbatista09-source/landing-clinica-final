import { useState, type FormEvent } from 'react';
import { Check, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Reveal } from './Reveal';
import type { Clinic } from '@/types/clinic';

interface ContactProps {
  clinic: Clinic;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ clinic }: ContactProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferred_time: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await supabase.from('leads').insert({
      clinic_id: clinic.id,
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      preferred_time: form.preferred_time,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({
      name: '',
      phone: '',
      email: '',
      message: '',
      preferred_time: '',
    });
  };

  const inputClass =
    'w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15';

  const hasAddress = clinic.address || clinic.city;
  const mapsLink =
    clinic.latitude && clinic.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${clinic.latitude},${clinic.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${clinic.address} ${clinic.city}`,
        )}`;
  const mapEmbedSrc =
    clinic.latitude && clinic.longitude
      ? `https://www.google.com/maps?q=${clinic.latitude},${clinic.longitude}&z=11&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(
          clinic.city || 'Algarve',
        )}&z=11&output=embed`;

  return (
    <>
      {/* CTA banner */}
      <section className="relative overflow-hidden bg-brand-dark py-24 lg:py-32">
        {clinic.cta_image_url && (
          <div className="absolute inset-0">
            <img
              src={clinic.cta_image_url}
              alt=""
              className="h-full w-full object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-dark/50" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
          <Reveal>
            <h2 className="mb-4 font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              {clinic.cta_title}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
              {clinic.cta_subtitle}
            </p>
            {clinic.footer_note && (
              <p className="text-sm text-white/60">{clinic.footer_note}</p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Contact form + location */}
      <section id="contacto" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <Reveal>
              <div>
                <h2 className="mb-2 font-serif text-3xl font-semibold text-brand-dark">
                  Consulta de avaliação
                </h2>
                <p className="mb-8 text-stone-600">
                  Preencha os dados e entramos em contacto para confirmar o seu
                  horário.
                </p>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-stone-50 p-12 text-center ring-1 ring-stone-100">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                      <Check className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-brand-dark">
                      Pedido recebido!
                    </h3>
                    <p className="max-w-sm text-sm text-stone-600">
                      Obrigada pelo seu contacto. Entraremos em contacto em
                      breve para confirmar o seu horário.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm font-medium text-brand underline-offset-4 hover:underline"
                    >
                      Enviar outro pedido
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-stone-700">
                          Nome *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={inputClass}
                          placeholder="O seu nome"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-stone-700">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className={inputClass}
                          placeholder="+351 ..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-stone-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass}
                        placeholder="o.seu@email.pt"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-stone-700">
                        Horário preferido
                      </label>
                      <input
                        type="text"
                        value={form.preferred_time}
                        onChange={(e) =>
                          setForm({ ...form, preferred_time: e.target.value })
                        }
                        className={inputClass}
                        placeholder="Ex: manhã, 3ª-feira"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-stone-700">
                        Mensagem
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className={`${inputClass} resize-none`}
                        placeholder="Diga-nos como podemos ajudar."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                        Ocorreu um erro. Tente novamente.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg disabled:opacity-60 sm:w-auto"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          A enviar...
                        </>
                      ) : (
                        'Enviar pedido'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Location + map */}
            <Reveal delay={120}>
              <div className="lg:pl-8">
                <div className="space-y-6 rounded-2xl bg-stone-50 p-8 ring-1 ring-stone-100">
                  <h3 className="font-serif text-xl font-semibold text-brand-dark">
                    Localização &amp; Contactos
                  </h3>

                  {hasAddress && (
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <div>
                        <p className="text-stone-700">{clinic.address}</p>
                        <p className="text-stone-700">
                          {clinic.city}
                          {clinic.region ? `, ${clinic.region}` : ''}
                        </p>
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm font-medium text-brand hover:underline"
                        >
                          Ver no Google Maps
                        </a>
                      </div>
                    </div>
                  )}

                  {clinic.phone && (
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <a
                        href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                        className="text-stone-700 transition-colors hover:text-brand"
                      >
                        {clinic.phone}
                      </a>
                    </div>
                  )}

                  {clinic.email && (
                    <div className="flex items-start gap-4">
                      <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <a
                        href={`mailto:${clinic.email}`}
                        className="text-stone-700 transition-colors hover:text-brand"
                      >
                        {clinic.email}
                      </a>
                    </div>
                  )}

                  {clinic.hours.length > 0 && (
                    <div className="flex items-start gap-4">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <div className="space-y-1">
                        {clinic.hours.map((h, i) => (
                          <div
                            key={i}
                            className="flex justify-between gap-6 text-sm"
                          >
                            <span className="text-stone-600">{h.day}</span>
                            <span className="font-medium text-stone-800">
                              {h.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Map */}
                <div className="mt-6 overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-100">
                  <iframe
                    title="Mapa"
                    src={mapEmbedSrc}
                    className="h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
