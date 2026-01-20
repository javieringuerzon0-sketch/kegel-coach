import React, { useState } from 'react';
import Button from '../ui/Button';
import { Lock, Mail, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Plan } from '../../types';

interface CheckoutProps {
  plan: Plan;
  onBack: () => void;
  onSuccess: () => void;
  language: string;
  t: (ls: any) => string;
}

const Checkout: React.FC<CheckoutProps> = ({ plan, onBack, onSuccess, t }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 bg-slate-950">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors uppercase text-xs font-black tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to plans
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Secure Checkout</h2>
          
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <h3 className="font-black text-lg mb-6 flex items-center gap-3 uppercase tracking-tight">
              <Mail className="w-5 h-5 text-sky-500" />
              1. Account
            </h3>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-600 font-bold"
              />
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Access credentials sent via secure server.</p>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <h3 className="font-black text-lg mb-6 flex items-center gap-3 uppercase tracking-tight">
              <CreditCard className="w-5 h-5 text-sky-500" />
              2. Payment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Card Details</label>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Card Number"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-600 font-bold"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="px-5 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-600 font-bold" />
                    <input type="text" placeholder="CVC" className="px-5 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-600 font-bold" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                variant="primary" 
                disabled={loading || !email}
                className="h-16 text-lg"
              >
                {loading ? 'Authenticating...' : `Subscribe for $${plan.totalPrice}`}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mt-6">
                <Lock className="w-3 h-3" />
                <span>256-Bit Military Grade Encryption</span>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[2.5rem] h-fit sticky top-24 border border-slate-800 shadow-2xl">
          <h3 className="text-xl font-black mb-8 uppercase tracking-tighter italic">Order Summary</h3>
          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold">{t(plan.name)}</span>
              <span className="font-black text-white">${plan.totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold">Elite Performance Suite</span>
              <span className="text-emerald-400 font-black uppercase text-xs">Included</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold">Priority AI Support</span>
              <span className="text-emerald-400 font-black uppercase text-xs">Free</span>
            </div>
            <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-2xl font-black">
              <span className="uppercase tracking-tighter">Total Due</span>
              <span className="text-sky-400 tracking-tighter">${plan.totalPrice}</span>
            </div>
          </div>
          
          <div className="bg-sky-500/5 p-6 rounded-2xl space-y-4 border border-sky-500/10">
            {[
              'Instant high-speed delivery',
              'Cancel subscription anytime',
              'Satisfaction guaranteed'
            ].map((text, i) => (
              <p key={i} className="text-[11px] font-black uppercase tracking-wider flex items-center gap-3 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;