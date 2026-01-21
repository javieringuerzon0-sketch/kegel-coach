import React from 'react';
import { CheckCircle, Smartphone, Download, Star } from 'lucide-react';
import { LocalizedString } from '../../types';

interface SuccessProps {
  language: string;
  t: (ls: LocalizedString | string) => string;
}

const Success: React.FC<SuccessProps> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 dark:bg-slate-950">
      <div className="max-w-xl w-full text-center">
        <div className="mb-8 inline-block animate-bounce">
          <CheckCircle className="w-20 h-20 text-[#3498DB]" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-[#2C3E50] dark:text-white mb-4">You're All Set!</h1>
        <p className="text-xl text-gray-600 dark:text-slate-400 mb-12">
          Your personalized plan is ready. We've sent your credentials and a quick start guide to your email.
        </p>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 mb-12">
          <h3 className="font-bold text-xl mb-6 flex items-center justify-center gap-2 dark:text-white">
            <Smartphone className="w-6 h-6 text-[#3498DB]" />
            Download the App
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="#" className="flex-1 bg-black text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-60">Download on the</p>
                <p className="text-lg font-bold leading-none">App Store</p>
              </div>
            </a>
            <a href="#" className="flex-1 bg-black text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <Download className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-60">Get it on</p>
                <p className="text-lg font-bold leading-none">Google Play</p>
              </div>
            </a>
          </div>

          <div className="space-y-4 text-left">
            <p className="text-sm font-bold text-gray-600 dark:text-slate-400 mb-2 uppercase tracking-wider">Next Steps:</p>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#3498DB] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Download and log in with your email.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#3498DB] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Complete your first 5-minute session.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#3498DB] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Watch your stamina soar over the next 3 weeks.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-yellow-500 font-bold">
          <Star className="w-5 h-5 fill-current" />
          <span>4.9/5 Average User Rating</span>
        </div>
      </div>
    </div>
  );
};

export default Success;