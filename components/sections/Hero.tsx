import React from 'react';
import Button from '../ui/Button';
import { ChevronRight, Zap, Award } from 'lucide-react';
import ImageGen from '../ui/ImageGen';
import { LocalizedString } from '../../types';

interface HeroProps {
  onStart: () => void;
  language: string;
  t: (ls: LocalizedString | string) => string;
}

const Hero: React.FC<HeroProps> = ({ onStart, language }) => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Decorative premium blobs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-sky-400/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-rose-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
        <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-900/50 backdrop-blur-sm px-6 py-3 rounded-2xl mb-12 shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Award className="w-5 h-5 text-sky-500" />
          <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.25em]">
            {language === 'en' ? 'Medical Grade Precision' : 'Precisión de Grado Médico'}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter max-w-5xl mx-auto uppercase">
          {language === 'en' ? (
            <>Unlock Your <span className="text-sky-500">Elite</span> Performance</>
          ) : (
            <>Libera tu Rendimiento <span className="text-sky-500">Élite</span></>
          )}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          {language === 'en' 
            ? 'The ultimate high-performance pelvic health platform for men. Scientifically backed results in 5 minutes a day.'
            : 'La plataforma definitiva de salud pélvica de alto rendimiento para hombres. Resultados respaldados por la ciencia en 5 min al día.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Button onClick={onStart} className="text-lg px-14 py-6 bg-slate-900 dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-2xl shadow-sky-500/20">
            {language === 'en' ? 'Get My Personalized Plan' : 'Obtener Mi Plan Personalizado'} 
            <ChevronRight className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-4">
              {[12, 11, 8, 33].map(i => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i}`} 
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-lg" 
                  alt={`KegelCoach satisfied user testimonial profile ${i}`} 
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-sky-500 font-black tracking-tight text-lg">+25,000</span>
              </div>
              <p className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-wider">Men performing at peak</p>
            </div>
          </div>
        </div>

        <div className="mt-32 w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.15)] dark:shadow-none border border-slate-200/50 dark:border-slate-800/50 bg-slate-100 dark:bg-slate-900 aspect-video relative group">
          <ImageGen 
            prompt="hero" 
            className="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-12 text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-sky-500 p-2 rounded-lg">
                <Zap className="text-white w-6 h-6 fill-white" />
              </div>
              <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter">Adaptive Performance Engine</h3>
            </div>
            <p className="text-white/80 max-w-lg font-medium text-lg leading-relaxed">
              {language === 'en' ? 'Our AI analyzes your biofeedback to adapt exercise intensity in real-time.' : 'Nuestra IA analiza tu biofeedback para adaptar la intensidad del ejercicio en tiempo real.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;