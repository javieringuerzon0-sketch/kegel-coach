import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-2xl font-black transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) active:scale-[0.98] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none text-center flex items-center justify-center gap-3 uppercase tracking-wider text-sm select-none group";
  
  const variants = {
    primary: "bg-sky-500 text-slate-950 hover:bg-sky-400 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.4)] shadow-xl shadow-sky-500/20 hover:ring-4 hover:ring-sky-500/10 hover:brightness-105 saturate-110",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-50 hover:shadow-2xl hover:ring-4 hover:ring-slate-500/5 dark:hover:ring-white/10 hover:brightness-110",
    outline: "border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:border-sky-500/50 hover:ring-4 hover:ring-sky-500/5 hover:text-sky-600 dark:hover:text-sky-400",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-xl shadow-rose-500/20 hover:shadow-2xl hover:shadow-rose-500/30 hover:ring-4 hover:ring-rose-500/10 hover:brightness-105",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      {/* Dynamic light streak overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};

export default Button;