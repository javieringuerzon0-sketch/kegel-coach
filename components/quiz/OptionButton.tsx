import React from 'react';

interface OptionButtonProps {
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        w-full p-6 text-left rounded-2xl border-2 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
        flex items-center justify-between group active:scale-[0.97] relative overflow-hidden select-none
        ${selected 
          ? 'border-sky-500 bg-sky-500/10 dark:bg-sky-500/20 shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] z-10 ring-4 ring-sky-500/10 scale-[1.02]' 
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-lg hover:shadow-sky-500/5 hover:-translate-y-0.5 hover:ring-4 hover:ring-sky-500/5'}
      `}
    >
      <span className={`text-lg font-black tracking-tight transition-colors duration-300 ${selected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-900 dark:text-white'}`}>
        {label}
      </span>
      <div className={`
        w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500
        ${selected 
          ? 'bg-sky-500 border-sky-500 scale-110 shadow-[0_0_15px_rgba(14,165,233,0.5)]' 
          : 'border-slate-300 dark:border-slate-700 group-hover:border-sky-500/50 group-hover:scale-105 group-hover:bg-sky-500/5'}
      `}>
        {selected && (
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-white animate-in zoom-in-50 duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>
      
      {/* Background interactions: subtle depth highlight */}
      <div className={`absolute inset-0 bg-sky-500 transition-opacity duration-300 pointer-events-none ${selected ? 'opacity-5' : 'opacity-0 group-hover:opacity-[0.03]'}`} />
    </button>
  );
};

export default OptionButton;