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
  hero: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  anatomy: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  stamina: 'https://images.unsplash.com/photo-1577221084712-45b0445d2b00?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bloodflow: 'https://images.unsplash.com/photo-1718248028293-934f04a578db?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  sitting: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  longevity: 'https://plus.unsplash.com/premium_photo-1733342645393-8d00c5e901b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  recovery: 'https://images.unsplash.com/photo-1607824135829-4aa56d718c58?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  mindset: 'https://images.unsplash.com/photo-1674504502895-3ac04ab2943e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  habit: 'https://images.unsplash.com/photo-1669322779651-5ca89652492e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ai_tech: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  performance_stats: 'https://images.unsplash.com/photo-1626984260200-baa56cbf0f05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  fallback: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200'
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