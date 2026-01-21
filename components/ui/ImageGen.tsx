import React from 'react';

interface ImageGenProps {
  prompt: string;
  className?: string;
  priority?: boolean;
}

/**
 * URLs de Unsplash actualizadas y verificadas para evitar fallos de carga.
 */
const IMAGE_ASSETS: Record<string, string> = {
  hero: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=2000',
  anatomy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
  stamina: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
  bloodflow: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
  sitting: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
  longevity: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
  recovery: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
  mindset: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
  habit: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200',
  ai_tech: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  performance_stats: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  fallback: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200'
};

const DESCRIPTIVE_ALTS: Record<string, string> = {
  hero: 'Peak male health and vitality performance.',
  anatomy: 'Foundation of pelvic strength and core health.',
  stamina: 'Physical stamina and endurance training.',
  bloodflow: 'Optimal cardiovascular and vascular health.',
  sitting: 'Counteracting sedentary lifestyle effects.',
  longevity: 'Long-term health and vitality lifestyle.',
  recovery: 'Importance of consistency and body recovery.',
  mindset: 'Mental confidence and physical performance.',
  habit: 'Daily 5-minute performance habit discipline.',
  ai_tech: 'Advanced AI-driven personalization technology.',
  performance_stats: 'Data-driven performance tracking metrics.',
  fallback: 'Elite male physical performance potential.'
};

const ImageGen: React.FC<ImageGenProps> = ({ prompt, className = "", priority = false }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const getAssetKey = (p: string): string => {
    const lowerP = p.toLowerCase();
    if (lowerP === 'hero') return 'hero';
    if (lowerP.includes('anatomy')) return 'anatomy';
    if (lowerP.includes('stamina')) return 'stamina';
    if (lowerP.includes('bloodflow')) return 'bloodflow';
    if (lowerP.includes('sitting')) return 'sitting';
    if (lowerP.includes('longevity')) return 'longevity';
    if (lowerP.includes('recovery')) return 'recovery';
    if (lowerP.includes('mindset')) return 'mindset';
    if (lowerP.includes('habit')) return 'habit';
    if (lowerP.includes('ai_tech')) return 'ai_tech';
    if (lowerP.includes('performance_stats')) return 'performance_stats';
    return 'fallback'; 
  };

  const assetKey = getAssetKey(prompt);
  const imageUrl = IMAGE_ASSETS[assetKey] || IMAGE_ASSETS.fallback;
  const altText = DESCRIPTIVE_ALTS[assetKey] || DESCRIPTIVE_ALTS.fallback;

  return (
    <div className={`${className} bg-slate-900 overflow-hidden relative group flex items-center justify-center`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-20">
          <div className="w-10 h-10 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin" />
        </div>
      )}
      
      <img 
        src={imageUrl} 
        alt={altText}
        loading={priority ? "eager" : "lazy"}
        className={`w-full h-full object-cover transition-all duration-[1s] group-hover:scale-110 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          // Fallback silencioso para no ensuciar la consola
          e.currentTarget.src = IMAGE_ASSETS.fallback;
          setIsLoaded(true);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default ImageGen;