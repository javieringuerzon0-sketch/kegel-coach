import React, { useState } from 'react';
// Added Check to the imports from lucide-react to fix the error on line 58
import { Star, Check } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';
import { LocalizedString } from '../../types';

interface TestimonialsProps {
  language: string;
  t: (ls: LocalizedString | string) => string;
}

const TestimonialAvatar = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-16 h-16 rounded-full border-2 border-sky-500/30 overflow-hidden bg-slate-200 dark:bg-slate-800 relative flex-shrink-0">
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 animate-pulse" />
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ language, t }) => {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black text-[#2C3E50] dark:text-white mb-16 tracking-tighter uppercase italic">
          {language === 'en' ? 'Real Results from Real Men' : 'Resultados Reales de Hombres Reales'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="bg-[#F8F9FA] dark:bg-slate-900 p-8 rounded-[2rem] text-left hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <TestimonialAvatar 
                  src={item.image} 
                  alt={`Portrait of ${item.name}, a satisfied KegelCoach user`} 
                />
                <div>
                  <h4 className="font-black text-[#2C3E50] dark:text-white uppercase tracking-tight">{item.name}, {item.age}</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-slate-400 italic mb-8 text-lg leading-relaxed">"{t(item.content)}"</p>
              <div className="pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sky-500 font-black text-xs uppercase tracking-widest">{t(item.metric)}</span>
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;