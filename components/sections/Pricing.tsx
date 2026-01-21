
import React from 'react';
// Added ShieldCheck to imports to fix the error on line 98
import { Check, ShieldCheck } from 'lucide-react';
import { PLANS } from '../../constants';
import Button from '../ui/Button';

interface PricingProps {
  onSelect: (planId: string) => void;
  language: string;
  t: (ls: any) => string;
}

const Pricing: React.FC<PricingProps> = ({ onSelect, language, t }) => {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 px-4 relative overflow-hidden" id="pricing">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight italic uppercase">
          {language === 'en' ? 'Commit to Your Elite Future' : 'Comprométete con tu Futuro de Élite'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-20 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          {language === 'en' 
            ? 'Choose the path to peak performance. Join over 250,000 men worldwide using science-backed daily coaching.' 
            : 'Elige el camino hacia el máximo rendimiento. Únete a más de 250,000 hombres en todo el mundo usando entrenamiento diario respaldado por la ciencia.'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`
                relative bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] flex flex-col border border-slate-100 dark:border-slate-800 hover:-translate-y-1.5 group
                ${plan.isPopular ? 'shadow-2xl ring-2 ring-sky-500/30' : ''}
              `}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sky-500 text-slate-950 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-xl z-20 transition-transform duration-500 group-hover:scale-105">
                  {language === 'en' ? 'Highest Efficiency' : 'Máxima Eficiencia'}
                </div>
              )}
              
              <h3 className="text-sm font-black text-sky-500 uppercase tracking-[0.15em] mb-4">{t(plan.name)}</h3>
              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">${plan.pricePerMonth}</span>
                <span className="text-sm font-bold text-slate-400 ml-2">/mo</span>
              </div>
              
              <div className="text-left space-y-5 mb-10 flex-grow">
                {[
                  { en: 'AI Biofeedback Sync', es: 'Sincronización Biofeedback IA' },
                  { en: 'Elite Performance Roadmap', es: 'Hoja de ruta rendimiento élite' },
                  { en: 'Medical Video Library', es: 'Biblioteca de videos médicos' },
                  { en: '24/7 Priority Support', es: 'Soporte prioritario 24/7' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-500 group-hover:scale-110 group-hover:bg-sky-500/20">
                      <Check className="w-3 h-3 text-sky-500" strokeWidth={4} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">{t(item)}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5 flex items-center justify-between transition-all duration-500 group-hover:border-sky-500/20 group-hover:bg-white dark:group-hover:bg-white/10">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{language === 'en' ? 'Billed once' : 'Cobro único'}: ${plan.totalPrice}</span>
                {plan.savings && (
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-500 group-hover:scale-110">
                    -{plan.savings}
                  </div>
                )}
              </div>

              <Button 
                onClick={() => onSelect(plan.id)}
                fullWidth 
                variant={plan.isPopular ? 'primary' : 'secondary'}
                className="text-lg py-6"
              >
                {language === 'en' ? 'Select Plan' : 'Seleccionar Plan'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-10">
          <div className="flex items-center gap-8 flex-wrap justify-center opacity-60 hover:opacity-100 transition-all duration-500">
            {[
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg", alt: "Secure payment via Visa", h: "h-4" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", alt: "Secure payment via Mastercard", h: "h-8" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", alt: "Secure payment via PayPal", h: "h-6" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg", alt: "Secure payment via American Express", h: "h-8" }
            ].map((img, i) => (
              <div key={i} className="h-10 px-4 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-default">
                <img src={img.src} alt={img.alt} className={`${img.h} w-auto block grayscale hover:grayscale-0 transition-all duration-500`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-600 text-xs font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>256-Bit SSL Military Grade Security</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
