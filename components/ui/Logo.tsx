
import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className = "w-9 h-9", theme = 'light' }) => {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer`}>
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-sky-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity rounded-full`} />
        
        {/* Main Icon Box */}
        <div className="relative bg-[#0F172A] p-2 rounded-xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden">
          <svg 
            viewBox="0 0 24 24" 
            className={`${className} text-sky-400 group-hover:scale-110 transition-transform`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Powerful Pulse / Frequency Wave Symbol */}
            <path d="M2 12h3l2-6 3 12 3-12 3 12 2-6h3" />
            <circle cx="12" cy="12" r="10" strokeOpacity="0.1" />
          </svg>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-sky-500/50 blur-sm"></div>
        </div>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className={`text-xl font-black tracking-tighter uppercase ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
          KEGEL<span className="text-sky-500">COACH</span>
        </span>
        <span className="text-[10px] font-black text-sky-500/80 tracking-[0.3em] uppercase pl-0.5">Performance Elite</span>
      </div>
    </div>
  );
};

export default Logo;
