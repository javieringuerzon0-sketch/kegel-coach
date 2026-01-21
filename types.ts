
export type Language = 'en' | 'es';
export type Theme = 'light' | 'dark';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface Option {
  id: string;
  label: LocalizedString;
  value: string;
}

export interface Question {
  id: string;
  text: LocalizedString;
  options: Option[];
}

export interface InfoSlide {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  stats?: LocalizedString;
  imagePrompt: string; // Used for AI image generation
}

export type QuizStep =
  | { type: 'question'; data: Question }
  | { type: 'info'; data: InfoSlide };

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  content: LocalizedString;
  rating: number;
  metric: LocalizedString;
  image: string;
}

export interface Plan {
  id: string;
  name: LocalizedString;
  duration: LocalizedString;
  pricePerMonth: number;
  totalPrice: number;
  savings?: string;
  isPopular?: boolean;
}
