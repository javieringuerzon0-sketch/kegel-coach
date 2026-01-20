import React from 'react';
import { InfoSlide as InfoSlideType } from '../../types';
import Button from '../ui/Button';
import { TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import ImageGen from '../ui/ImageGen';

interface InfoSlideProps {
  slide: InfoSlideType;
  onNext: () => void;
  language: string;
  t: (ls: any) => string;
}

const InfoSlide: React.FC<InfoSlideProps> = ({ slide, onNext, t, language }) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="mb-10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video relative group border border-slate-200/50 dark:border-slate-800/50 bg-slate-900">
        <ImageGen 
          prompt={slide.imagePrompt} 
          className="w-full h-full group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Scientific Insights</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
        {/* H2 set to 36px (text-4xl) with Montserrat 900 (font-black) */}
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4 italic uppercase tracking-tighter">
          <CheckCircle className="text-sky-500 w-8 h-8 flex-shrink-0" />
          {t(slide.title)}
        </h2>
        
        {/* Content set to 18px (text-lg) with Inter 500 (font-medium) */}
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
          {t(slide.content)}
        </p>

        {slide.stats && (
          <div className="bg-sky-50 dark:bg-sky-400/10 p-8 rounded-3xl mb-10 flex items-start gap-5 border border-sky-100 dark:border-sky-400/20">
            <TrendingUp className="text-sky-500 w-8 h-8 mt-1 flex-shrink-0" />
            <p className="text-lg font-black text-slate-900 dark:text-sky-400 tracking-tight uppercase">
              {t(slide.stats)}
            </p>
          </div>
        )}

        <Button fullWidth onClick={onNext} className="py-5 text-lg">
          {language === 'en' ? 'Continue' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
};

export default InfoSlide;