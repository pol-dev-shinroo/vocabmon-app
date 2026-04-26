"use client";
import React, { useEffect, useState } from 'react';

interface Props {
  level: number;
  feedTrigger?: number;
  attackTrigger?: number;
  className?: string;
}

export default function PixelVocabmon({ level, feedTrigger, attackTrigger, className = "" }: Props) {
  const safeLevel = Math.max(1, Math.min(10, level));
  const [isEating, setIsEating] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [expPopups, setExpPopups] = useState<{id: number}[]>([]);
  const [spriteMode, setSpriteMode] = useState<'idle' | 'atk'>('idle');
  
  // NEW: Tracks whether we need to use CSS animations because the attack GIF is missing
  const [useCssFallback, setUseCssFallback] = useState(false);

  useEffect(() => {
    if (feedTrigger && feedTrigger > 0) {
      setIsEating(true);
      const newId = Date.now();
      setExpPopups(prev => [...prev, { id: newId }]);
      const animTimer = setTimeout(() => setIsEating(false), 600);
      const popupTimer = setTimeout(() => {
        setExpPopups(prev => prev.filter(p => p.id !== newId));
      }, 1000);
      return () => { clearTimeout(animTimer); clearTimeout(popupTimer); };
    }
  }, [feedTrigger]);

  useEffect(() => {
    if (attackTrigger && attackTrigger > 0) {
      setIsAttacking(true);
      setSpriteMode('atk');
      setUseCssFallback(false); // Reset fallback state on new attack
      
      // EXTENDED TIMEOUT: Gives long GIFs 2.5 seconds to finish playing
      const timer = setTimeout(() => {
        setIsAttacking(false);
        setSpriteMode('idle');
        setUseCssFallback(false);
      }, 2500); 
      
      return () => clearTimeout(timer);
    }
  }, [attackTrigger]);

  const getAnimationClass = () => {
    if (!isAttacking) return '';
    // ONLY apply the wild CSS movements if the attack GIF failed to load
    if (useCssFallback) return `anim-spc-${safeLevel}`;
    // If it's a real attack GIF, just enlarge it slightly for impact, no sliding!
    return 'scale-110 transition-transform duration-300';
  };

  const spriteSuffix = spriteMode === 'atk' ? '_atk' : '';
  const spritePath = `/sprites/lvl${safeLevel}${spriteSuffix}.gif`;

  return (
    <div className={`relative flex flex-col items-center justify-end w-[140px] h-[140px] mx-auto ${className}`}>
      <style jsx>{`
        /* ULTRA-DYNAMIC CLASS BINDINGS */
        .anim-atk-1 { animation: atk-1 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); } 
        .anim-spc-1 { animation: spc-1 0.8s ease-in-out; }
        .anim-atk-2 { animation: atk-2 0.6s cubic-bezier(0.5, -0.5, 0.5, 1.5); }    
        .anim-spc-2 { animation: spc-2 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .anim-atk-3 { animation: atk-3 0.5s cubic-bezier(0.1, 0.9, 0.2, 1); } 
        .anim-spc-3 { animation: spc-3 0.9s ease-out; }
        .anim-atk-4 { animation: atk-4 0.4s ease-in-out; } 
        .anim-spc-4 { animation: spc-4 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .anim-atk-5 { animation: atk-5 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .anim-spc-5 { animation: spc-5 1.0s ease-out; }
        .anim-atk-6 { animation: atk-6 0.5s cubic-bezier(0.5, -0.5, 0, 1.5); }
        .anim-spc-6 { animation: spc-6 1.2s cubic-bezier(0.1, 0.9, 0.2, 1); }
        .anim-atk-7 { animation: atk-7 0.4s steps(4, end); }    
        .anim-spc-7 { animation: spc-7 1.2s cubic-bezier(0.5, 0, 0.1, 1); }
        .anim-atk-8 { animation: atk-8 0.5s cubic-bezier(0.1, 0.9, 0.2, 1); }
        .anim-spc-8 { animation: spc-8 0.9s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .anim-atk-9 { animation: atk-9 0.7s ease-in-out; }      
        .anim-spc-9 { animation: spc-9 1.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .anim-atk-10{ animation: atk-10 0.5s cubic-bezier(1, 0, 0, 1); }
        .anim-spc-10{ animation: spc-10 1.2s cubic-bezier(0.1, 1, 0.1, 1); }

        /* LV 1 & 2: Bouncing and Bubbles */
        @keyframes atk-1 { 0%, 100% { transform: translateY(0) scale(1); } 40% { transform: translateY(-30px) scale(0.8, 1.2); } 60% { transform: translateY(0) scale(1.2, 0.8); } }
        @keyframes spc-1 { 0%, 100% { filter: brightness(1) drop-shadow(0 0 0 transparent); } 50% { filter: brightness(1.5) drop-shadow(0 0 40px #facc15); transform: scale(1.1); } }
        @keyframes atk-2 { 0%, 100% { transform: translate(0,0) scale(1); } 30% { transform: translate(-10px, 10px) scale(1.2, 0.8); } 60% { transform: translate(50px, -20px) scale(0.9, 1.2); } }
        @keyframes spc-2 { 0%, 100% { filter: drop-shadow(0 0 0 transparent); } 50% { filter: drop-shadow(50px 0 20px #0f172a); transform: scale(1.2) translateY(-10px); } }

        /* LV 3 & 4: Koromon & Agumon (Fast Strikes & Fireballs) */
        @keyframes atk-3 { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(60px) scale(1.1); filter: drop-shadow(-10px 0 5px rgba(0,0,0,0.2)); } }
        @keyframes spc-3 { 0%, 100% { filter: drop-shadow(0 0 0 transparent); } 50% { filter: drop-shadow(60px -20px 20px #f472b6); transform: scale(1.2) rotate(-5deg); } }
        @keyframes atk-4 { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(30px); } 40% { transform: translateX(10px); } 60% { transform: translateX(50px); } }
        @keyframes spc-4 { 0%, 100% { transform: scale(1) translateX(0); filter: brightness(1); } 30% { transform: scale(0.85) translateX(-15px); filter: brightness(0.7); } 50% { transform: scale(1.3) translateX(20px); filter: brightness(2.5) drop-shadow(100px 0 40px #f97316); } }

        /* LV 5 & 6: Tyrannomon & Greymon (Heavy Impacts) */
        @keyframes atk-5 { 0%, 100% { transform: scaleX(1) translateX(0); } 50% { transform: scaleX(-1) translateX(-50px) translateY(-10px); filter: drop-shadow(10px 10px 5px rgba(0,0,0,0.3)); } }
        @keyframes spc-5 { 0%, 100% { filter: drop-shadow(0 0 0 transparent); transform: translateY(0); } 50% { transform: translateY(-10px) scale(1.15); filter: brightness(2) drop-shadow(100px 0 50px #ef4444); } }
        @keyframes atk-6 { 0%, 100% { transform: translate(0, 0); } 30% { transform: translate(-20px, 20px) scale(1.1, 0.9); } 60% { transform: translate(80px, -60px) scale(0.9, 1.1) rotate(15deg); } }
        @keyframes spc-6 { 0%, 100% { transform: scale(1); filter: brightness(1) drop-shadow(0 0 0 transparent); } 30% { transform: scale(0.9) translateX(-10px); } 60% { transform: scale(1.6) translateX(10px); filter: brightness(3) drop-shadow(150px 0 80px #ea580c) drop-shadow(50px 0 30px yellow); } }

        /* LV 7 & 8: SkullGreymon & MetalGreymon (Glitch & Missiles) */
        @keyframes atk-7 { 0%, 100% { transform: translate(0,0); opacity: 1; filter: grayscale(0); } 25% { transform: translate(50px, -30px); opacity: 0.8; filter: grayscale(1) invert(1); } 50% { transform: translate(80px, 20px); filter: hue-rotate(180deg); } }
        @keyframes spc-7 { 0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 0 transparent); } 40% { transform: translateY(-100px) scale(1.2); filter: drop-shadow(0 -50px 30px #9333ea); } 60% { transform: translateY(-100px); filter: brightness(2) drop-shadow(120px 180px 60px #7e22ce); } }
        @keyframes atk-8 { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-20px); } 50% { transform: translateX(100px) scaleX(1.2); filter: drop-shadow(-30px 0 10px #94a3b8); } }
        @keyframes spc-8 { 0%, 100% { transform: translateX(0); filter: drop-shadow(0 0 0 transparent); } 20% { transform: translateX(-25px); filter: brightness(2) drop-shadow(80px -40px 40px #f59e0b); } 40% { transform: translateX(-15px); filter: brightness(2.5) drop-shadow(100px 40px 50px #ef4444); } 60% { transform: translateX(15px); filter: brightness(3) drop-shadow(150px 0px 100px #ea580c); } }

        /* LV 9 & 10: WarGreymon & Omnimon (God-Tier Attacks) */
        @keyframes atk-9 { 0%, 100% { transform: translateX(0) rotate(0deg); } 20% { transform: translateX(-30px) rotate(-45deg); } 70% { transform: translateX(120px) rotate(1440deg); filter: drop-shadow(0 0 15px #facc15); } }
        @keyframes spc-9 { 0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0 transparent); } 30% { transform: translateY(-120px) scale(1.2); filter: brightness(1.5) drop-shadow(0 -60px 40px #fbbf24); } 50% { transform: translateY(-120px) scale(1.6); filter: brightness(3) drop-shadow(0 -150px 200px #f59e0b) drop-shadow(0 -50px 80px white); } 70% { transform: translate(60px, 30px) scale(1); filter: brightness(2) drop-shadow(150px 0 100px #fbbf24); } }
        @keyframes atk-10 { 0%, 100% { transform: translateX(0); opacity: 1; filter: brightness(1); } 10% { transform: translateX(-20px); opacity: 0; } 30% { transform: translateX(180px); opacity: 1; filter: brightness(3) drop-shadow(-80px 0 5px white); } 50% { transform: translateX(180px); opacity: 1; filter: brightness(1); } 60% { transform: translateX(180px); opacity: 0; } }
        @keyframes spc-10 { 0%, 100% { transform: scale(1) translateX(0); filter: drop-shadow(0 0 0 transparent); } 20% { transform: scale(0.8) translateX(-30px); filter: brightness(2) drop-shadow(30px 0 30px #06b6d4); } 40% { transform: scaleX(5) scaleY(0.4) translateX(40px); transform-origin: left; filter: brightness(5) drop-shadow(200px 0 80px #22d3ee) drop-shadow(0 0 40px white); } 60% { transform: scaleX(4) scaleY(0.5) translateX(30px); transform-origin: left; filter: brightness(2) drop-shadow(150px 0 30px #06b6d4); } }

        /* IDLE & COMMON */
        @keyframes squish-breathe { 0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); } 50% { transform: scaleY(0.9) scaleX(1.05) translateY(6px); } }
        @keyframes happy-jump { 0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); } 25% { transform: scaleY(1.2) scaleX(0.8) translateY(-15px); } 50% { transform: scaleY(0.8) scaleX(1.2) translateY(5px); } 75% { transform: scaleY(1.1) scaleX(0.9) translateY(-5px); } }
        @keyframes float-up { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-40px) scale(1.2); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
        
        .animate-breathe { animation: squish-breathe 2s ease-in-out infinite; }
        .animate-jump { animation: happy-jump 0.6s ease-in-out; }
        .exp-float { animation: float-up 1s ease-out forwards; position: absolute; font-weight: 900; color: #f97316; text-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 50; top: -20px; }
        .animate-float-slow { animation: float-slow 3s ease-in-out infinite; }
      `}</style>

      {expPopups.map((popup) => (
        <div key={popup.id} className="exp-float text-xl font-black text-orange-500 drop-shadow-md">
          +15 EXP!
        </div>
      ))}

      {/* Notice 'animate-breathe' is removed so the GIF can handle its own idle animation naturally! */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center ${isEating ? "animate-jump" : ""}`}>
        
        <img
          src={spritePath}
          alt={`Vocabmon Level ${safeLevel}`}
          className={`max-w-[130px] max-h-[130px] w-auto h-auto object-contain drop-shadow-2xl transition-transform ${getAnimationClass()}`}
          style={{ 
            imageRendering: 'pixelated', // This keeps the DS-era pixel art perfectly crisp
          }}
          onError={(e) => {
            if (e.currentTarget.src.includes('_atk')) {
              // Trigger the CSS fallback animation and swap the image source
              setUseCssFallback(true);
              e.currentTarget.src = `/sprites/lvl${safeLevel}.gif`;
            } else {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.classList.remove('hidden');
              }
            }
          }}
        />
        
        {/* Helper UI if the GIF is missing */}
        <div className="hidden text-[10px] font-black text-gray-400 text-center border-2 border-dashed border-gray-300 bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-inner">
          Missing GIF<br/>
          <span className="text-indigo-500">public/sprites/lvl{safeLevel}.gif</span>
        </div>

      </div>
      
      <div className="absolute bottom-0 w-24 h-3 bg-black/10 rounded-full blur-[2px]"></div>
    </div>
  );
}
