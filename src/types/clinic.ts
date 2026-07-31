export interface ClinicHours {
  day: string;
  hours: string;
}

export interface Clinic {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  logo_url: string | null;
  hero_image_url: string | null;
  hero_title: string;
  hero_subtitle: string;
  address: string;
  city: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  whatsapp: string | null;
  hours: ClinicHours[];
  primary_color: string;
  accent_color: string;
  rating: number;
  patients_count: string;
  reviews_count: string;
  reviews_label: string;
  cta_title: string;
  cta_subtitle: string;
  cta_image_url: string | null;
  footer_note: string;
}

export interface Feature {
  id: string;
  clinic_id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ProcessStep {
  id: string;
  clinic_id: string;
  step_number: number;
  title: string;
  description: string;
}

export interface Treatment {
  id: string;
  clinic_id: string;
  name: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

export interface BeforeAfter {
  id: string;
  clinic_id: string;
  image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  caption: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  clinic_id: string;
  name: string;
  location: string;
  avatar_url: string | null;
  rating: number;
  quote: string;
  sort_order: number;
}

export interface Faq {
  id: string;
  clinic_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface ClinicContent {
  clinic: Clinic;
  features: Feature[];
  process: ProcessStep[];
  treatments: Treatment[];
  beforeAfter: BeforeAfter[];
  testimonials: Testimonial[];
  faqs: Faq[];
}
