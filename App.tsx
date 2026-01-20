
import React, { useState, useEffect, useCallback } from 'react';
import { QUIZ_DATA, PLANS, COLORS } from './constants';
import { Plan, Language, LocalizedString } from './types';
import { db } from './db';
import Hero from './components/sections/Hero';
import QuestionCard from './components/quiz/QuestionCard';
import InfoSlide from './components/quiz/InfoSlide';
import ProgressBar from './components/quiz/ProgressBar';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Checkout from './components/sections/Checkout';
import Success from './components/sections/Success';
import Logo from './components/ui/Logo';
import { Globe, Target, Activity, Zap, Check, ChevronDown, ChevronUp, ShieldCheck, HeartPulse, Database } from 'lucide-react';
import { redirectToCheckout } from './lib/stripe';

type AppState = 'hero' | 'quiz' | 'calculating' | 'pricing' | 'checkout' | 'success';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('hero');
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [language, setLanguage] = useState<Language>('es');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const t = useCallback((ls: LocalizedString | string) => {
    if (typeof ls === 'string') return ls;
    return ls[language];
  }, [language]);

  const totalSteps = QUIZ_DATA.length;
  const currentStep = QUIZ_DATA[stepIndex];

  const toggleLang = () => setLanguage(prev => prev === 'en' ? 'es' : 'en');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = COLORS.darkBg;

    // Recuperar sesión de Antigravity al cargar
    const initDB = async () => {
      const user = await db.getUser(userEmail); // Note: Initial load might not have email if not persisted locally yet. 
      // But typically we might check local storage or auth state first. 
      // For this simple flow, let's assume we might have it or just check generic.
      // Actually, standard pattern is to check auth session. 
      // Since we are mocking auth via "Quiz Email", we might not have it on reload unless we save it to localStorage too.
      // Let's check db.getRawData() which might have it from localStorage if we kept that valid.

      const localData = db.getRawData();
      if (localData.email) setUserEmail(localData.email);

      if (localData.email) {
        const user = await db.getUser(localData.email);
        if (user?.isSubscribed) {
          setState('success');
        }
      }
    };
    initDB();
    initDB();
  }, []);

  const handleStartQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setState('quiz');
      setStepIndex(0);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setIsTransitioning(false);
    }, 200);
  };

  const handleNextStep = useCallback(() => {
    setIsTransitioning(true);

    setTimeout(() => {
      if (stepIndex < totalSteps - 1) {
        setStepIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'auto' });
        setIsTransitioning(false);
      } else {
        setState('calculating');
        setIsTransitioning(false);
      }
    }, 250);
  }, [stepIndex, totalSteps]);

  const handleAnswerSelect = async (value: string) => {
    setIsSyncing(true);
    const user = db.getRawData(); // This is synchronous local fallback or we need to manage state better
    // Ideally we update state
    if (QUIZ_DATA[stepIndex].type === 'input' && (QUIZ_DATA[stepIndex].data as any).inputType === 'email') {
      setUserEmail(value);
      await db.saveLead({ email: value });
    }

    const questionId = QUIZ_DATA[stepIndex].type === 'question' ? (QUIZ_DATA[stepIndex].data as any).id : 'info_slide';

    // Sincronización con Antigravity
    if (userEmail || (QUIZ_DATA[stepIndex].type === 'input' && (QUIZ_DATA[stepIndex].data as any).inputType === 'email')) {
      const currentEmail = userEmail || value; // If this step is email, use value
      await db.saveLead({
        email: currentEmail,
        quizAnswers: { ...user.quizAnswers, [questionId]: value }
      });
    }

    setIsSyncing(false);
    setTimeout(handleNextStep, 200);
  };

  useEffect(() => {
    if (state === 'calculating') {
      const timer = setTimeout(() => {
        setState('pricing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handlePlanSelect = async (planId: string) => {
    const plan = PLANS.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);

      let emailToUse = userEmail;

      if (!emailToUse) {
        const input = window.prompt(language === 'en' ? "Please enter your email to continue:" : "Por favor ingresa tu email para continuar:");
        if (!input) return;
        setUserEmail(input);
        emailToUse = input;
      }

      setIsSyncing(true);
      await db.saveLead({ email: emailToUse, selectedPlanId: planId });

      try {
        const priceIdKey = planId === 'yearly' ? import.meta.env.VITE_STRIPE_PRICE_ID_YEARLY : import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY;
        if (priceIdKey) {
          await redirectToCheckout(priceIdKey, emailToUse);
        } else {
          // Fallback for demo if no keys
          console.warn('No Stripe Keys found, simulating success after delay');
          setTimeout(() => {
            handleCheckoutSuccess();
          }, 1500);
        }
      } catch (e) {
        console.error(e);
        setIsSyncing(false);
      }
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') === 'true') {
      // We need to know who the user is to mark success.
      // In a real flow, the session_id would verify this.
      // For this simple redirect, we rely on local state or params. 
      // If we lost state on redirect, we need to recover it (e.g. from localStorage).
      const localData = db.getRawData();
      if (localData.email) {
        db.completePurchase(localData.email, 'unknown_plan_from_url').then(() => {
          setState('success');
        });
      }
    }
  }, []);

  const handleCheckoutSuccess = async () => {
    setIsSyncing(true);
    // En un entorno real pasaríamos el email aquí
    await db.completePurchase('user@example.com', selectedPlan?.id || '');
    setIsSyncing(false);
    setState('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHeader = () => (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div onClick={() => { setState('hero'); setStepIndex(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo theme="dark" />
        </div>

        <div className="flex items-center gap-6">
          {/* Indicador de Conexión Antigravity */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors ${isSyncing ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500 bg-slate-800/50'}`}>
            <Database className={`w-3 h-3 ${isSyncing ? 'animate-pulse' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Antigravity Connected'}
          </div>

          <button
            onClick={toggleLang}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-sky-500 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language}
          </button>

          {state === 'hero' && (
            <button
              onClick={handleStartQuiz}
              className="hidden md:block bg-sky-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-lg shadow-sky-500/10"
            >
              {language === 'en' ? 'Start Quiz' : 'Iniciar Quiz'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  const FAQAccordion = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border border-slate-800 rounded-2xl mb-4 overflow-hidden bg-slate-900/40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
        >
          <span className="font-bold text-slate-200">{question}</span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-sky-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>
        {isOpen && (
          <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
            {answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {renderHeader()}

      <main className={`pt-20 font-normal transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {state === 'hero' && (
          <>
            <Hero onStart={handleStartQuiz} language={language} t={t} />

            <section className="py-24 px-4 bg-white dark:bg-transparent">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12 italic uppercase tracking-tighter">
                  {language === 'en' ? 'How it Works' : 'Cómo Funciona'}
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Target, title: language === 'en' ? 'Take the Quiz' : 'Haz el Quiz', desc: language === 'en' ? 'Answer some questions about your goals' : 'Responde algunas preguntas sobre tus metas', bg: 'bg-emerald-500/10', color: 'text-emerald-500' },
                    { icon: Activity, title: language === 'en' ? 'Get Your Plan' : 'Obtén Tu Plan', desc: language === 'en' ? 'Receive a personalized exercise program' : 'Recibe un programa de ejercicios personalizado', bg: 'bg-sky-500/10', color: 'text-sky-500' },
                    { icon: Zap, title: language === 'en' ? 'See Results' : 'Ve Resultados', desc: language === 'en' ? 'Follow daily exercises and track progress' : 'Sigue los ejercicios diarios y rastrea tu progreso', bg: 'bg-emerald-500/10', color: 'text-emerald-500' }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-left hover:border-sky-500/30 transition-colors group">
                      <div className={`p-4 rounded-2xl ${step.bg} group-hover:scale-110 transition-transform`}>
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg">{step.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-16 italic uppercase tracking-tighter">
                  {language === 'en' ? 'Benefits You Can Feel' : 'Beneficios Que Puedes Sentir'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    language === 'en' ? 'Better bladder control' : 'Mejor control de vejiga',
                    language === 'en' ? 'Greater confidence' : 'Mayor confianza',
                    language === 'en' ? 'Better quality of life' : 'Mejor calidad de vida',
                    language === 'en' ? 'Discreet exercises' : 'Ejercicios discretos',
                    language === 'en' ? 'Progress tracking' : 'Seguimiento de progreso',
                    language === 'en' ? 'Expert guidance' : 'Guía experta'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 text-left hover:scale-[1.02] transition-transform">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-700 dark:text-slate-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <Testimonials language={language} t={t} />

            <section className="py-24 px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12 text-center italic uppercase tracking-tighter">
                  {language === 'en' ? 'Frequent Questions' : 'Preguntas Frecuentes'}
                </h2>
                <div className="space-y-2">
                  <FAQAccordion
                    question={language === 'en' ? "How long until I see results?" : "¿Cuánto tiempo hasta ver resultados?"}
                    answer={language === 'en' ? "Most users notice significant changes within the first 3 to 4 weeks of consistent training." : "La mayoría de los usuarios notan cambios significativos dentro de las primeras 3 a 4 semanas de entrenamiento constante."}
                  />
                  <FAQAccordion
                    question={language === 'en' ? "How much time do I need daily?" : "¿Cuánto tiempo necesito al día?"}
                    answer={language === 'en' ? "Just 5 minutes a day. Our routines are optimized for efficiency so you can perform them anytime, anywhere." : "Solo 5 minutos al día. Nuestras rutinas están optimizadas para la eficiencia, por lo que puedes realizarlas en cualquier momento y lugar."}
                  />
                  <FAQAccordion
                    question={language === 'en' ? "Is it scientifically backed?" : "¿Está respaldado científicamente?"}
                    answer={language === 'en' ? "Yes, Kegel exercises are the gold standard recommended by urologists and pelvic health specialists worldwide." : "Sí, los ejercicios de Kegel son el estándar de oro recomendado por urólogos y especialistas en salud pélvica de todo el mundo."}
                  />
                  <FAQAccordion
                    question={language === 'en' ? "Can I cancel anytime?" : "¿Puedo cancelar en cualquier momento?"}
                    answer={language === 'en' ? "Absolutely. You have full control over your subscription through the app settings." : "Absolutamente. Tienes control total sobre tu suscripción a través de los ajustes de la aplicación."}
                  />
                  <FAQAccordion
                    question={language === 'en' ? "Is my data private?" : "¿Mis datos son privados?"}
                    answer={language === 'en' ? "Your privacy is our priority. All your data is encrypted and we never share it with third parties." : "Tu privacidad es nuestra prioridad. Todos tus datos están encriptados y nunca los compartimos con terceros."}
                  />
                </div>
              </div>
            </section>

            <section className="pb-24 px-4">
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="p-8 rounded-[2rem] bg-sky-500/5 border border-sky-500/10 flex items-center gap-6 text-left group transition-all duration-300 hover:bg-sky-500/10">
                  <div className="p-4 rounded-2xl bg-sky-500/10 group-hover:rotate-12 transition-transform">
                    <ShieldCheck className="w-8 h-8 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight">
                      {language === 'en' ? 'Medical Grade Security' : 'Seguridad de Grado Médico'}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {language === 'en' ? 'Your data is fully encrypted and private.' : 'Todos tus datos están encriptados y son privados.'}
                    </p>
                  </div>
                </div>
                <div className="p-8 rounded-[2rem] bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-6 text-left group transition-all duration-300 hover:bg-yellow-500/10">
                  <div className="p-4 rounded-2xl bg-yellow-500/10 group-hover:rotate-12 transition-transform">
                    <HeartPulse className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight">
                      {language === 'en' ? '30-Day Money Back Guarantee' : 'Garantía de Devolución de 30 Días'}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {language === 'en' ? 'Not satisfied? Full refund within 30 days. No questions asked.' : '¿No satisfecho? Reembolso completo en 30 días. Sin preguntas.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {state === 'quiz' && (
          <div className={`max-w-4xl mx-auto px-4 py-12 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-sky-500 uppercase tracking-[0.3em]">
                  {language === 'en' ? 'Male Performance Profile' : 'Perfil de Rendimiento Masculino'}
                </span>
                <span className="text-xs font-black text-slate-400">
                  {stepIndex + 1} / {totalSteps}
                </span>
              </div>
              <ProgressBar current={stepIndex + 1} total={totalSteps} />
            </div>

            <div className="min-h-[400px]">
              {currentStep.type === 'question' ? (
                <QuestionCard
                  question={currentStep.data as any}
                  onSelect={handleAnswerSelect}
                  language={language}
                  t={t}
                />
              ) : (
                <InfoSlide
                  slide={currentStep.data as any}
                  onNext={handleNextStep}
                  language={language}
                  t={t}
                />
              )}
            </div>
          </div>
        )}

        {state === 'calculating' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in zoom-in-95 duration-700">
            <div className="relative mb-12">
              <div className="w-24 h-24 border-2 border-sky-400/20 border-t-sky-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <Logo className="w-6 h-6" theme="dark" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter italic uppercase">
              {language === 'en' ? 'Processing Your Metrics...' : 'Procesando tus Métricas...'}
            </h2>
            <div className="space-y-4 max-w-sm w-full">
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 animate-[loading_4s_ease-in-out]" />
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest animate-pulse">
                {language === 'en' ? 'Tailoring intensity algorithm' : 'Ajustando algoritmo de intensidad'}
              </p>
            </div>
          </div>
        )}

        {state === 'pricing' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="bg-slate-900/50 py-24">
              <div className="max-w-4xl mx-auto text-center px-4">
                <div className="inline-block bg-sky-900/40 text-sky-400 px-8 py-3 rounded-2xl text-[10px] font-black mb-10 uppercase tracking-widest">
                  {language === 'en' ? 'Assessment Complete' : 'Evaluación Completa'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tighter uppercase">
                  {language === 'en' ? 'Your Peak Potential' : 'Tu Potencial Máximo'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  {[
                    { l: 'Efficiency', v: '42%' },
                    { l: 'Potential', v: '98%' },
                    { l: 'Goal Speed', v: '2.4x' },
                    { l: 'Status', v: 'Elite' }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-slate-800 rounded-[2rem] shadow-sm border border-slate-700 hover:border-sky-500/50 transition-colors">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.l}</p>
                      <p className="text-2xl font-black text-white tracking-tighter">{item.v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
                  {language === 'en'
                    ? 'Based on your metrics, you are at 42% pelvic efficiency. Our Adaptive Coaching system can fast-track your results by 2.4x.'
                    : 'Basado en tus métricas, estás en un 42% de eficiencia pélvica. Nuestro sistema de Adaptive Coaching puede acelerar tus resultados 2.4 veces.'}
                </p>
              </div>
            </div>
            <Pricing onSelect={handlePlanSelect} language={language} t={t} />
            <Testimonials language={language} t={t} />
          </div>
        )}

        {state === 'checkout' && selectedPlan && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <Checkout
              plan={selectedPlan}
              onBack={() => { setState('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onSuccess={handleCheckoutSuccess}
              language={language}
              t={t}
            />
          </div>
        )}

        {state === 'success' && (
          <div className="animate-in zoom-in-95 duration-1000">
            <Success language={language} t={t} />
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Logo theme="dark" className="w-10 h-10" />
            <p className="text-slate-400 mt-6 max-w-sm leading-relaxed text-base font-medium">
              {language === 'en'
                ? 'Scientifically redefining male performance. The standard in modern pelvic health.'
                : 'Redefiniendo el rendimiento masculino científicamente. El estándar en salud pélvica moderna.'}
            </p>
          </div>

          <div>
            <h4 className="font-black text-sky-500 text-[10px] uppercase tracking-[0.3em] mb-6">Product</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Adaptive AI</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Science' : 'Ciencia'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Case Studies' : 'Casos de estudio'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sky-500 text-[10px] uppercase tracking-[0.3em] mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-xs">
              <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Privacy' : 'Privacidad'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Terms' : 'Términos'}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{language === 'en' ? 'Help' : 'Ayuda'}</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} KEGELCOACH INTERNATIONAL</p>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>SECURE DATA INFRASTRUCTURE</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes loading {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default App;
