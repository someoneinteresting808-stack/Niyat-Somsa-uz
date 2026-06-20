import { useState, useEffect, useRef } from 'react';
import { HERO_PRODUCTS } from '../data/somsaData';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

export default function InteractiveHero() {
  const { language } = useLanguage();
  const lang = (language === 'uz' || language === 'ru' || language === 'en') ? language : 'uz';

  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProduct = HERO_PRODUCTS[selectedIdx];

  // Animation References
  const mainImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  // Trigger high-fidelity transitions on selection change
  useEffect(() => {
    // 1. Text elements fade-up stagger
    if (textContentRef.current) {
      gsap.fromTo(
        textContentRef.current.querySelectorAll('.hero-anim-item'),
        { opacity: 0, y: 25, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08, ease: 'power2.out' }
      );
    }

    // 2. Main product image zoom & rotation pop
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { scale: 0.8, rotate: -15, opacity: 0.5, filter: 'blur(8px)' },
        { scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.2)' }
      );
    }

    // 3. Explosion of sensory ingredient particles
    createSensoryParticles();
  }, [selectedIdx]);

  const createSensoryParticles = () => {
    if (!particleContainerRef.current) return;
    const container = particleContainerRef.current;
    
    // Clear old particles
    container.innerHTML = '';
    
    // Generate 12 tiny visual fragments (wheat, sparks, droplets, stars, sesame)
    const particleTypes = ['🌾', '✨', '💧', '🧅', '🥯', '🌶️'];
    
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'absolute text-lg select-none pointer-events-none opacity-0';
      p.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      container.appendChild(p);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 140;
      
      // Animate explosion outward
      gsap.fromTo(
        p,
        { 
          x: 0, 
          y: 0, 
          scale: 0.2, 
          opacity: 0.9 
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: Math.random() * 0.8 + 0.6,
          opacity: 0,
          duration: 1.2 + Math.random() * 0.8,
          ease: 'power3.out'
        }
      );
    }
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % HERO_PRODUCTS.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
  };

  const textT = {
    uz: { badge: 'Eng Sara Somsa Tanlovi' },
    en: { badge: 'Artisan Batch Selection' },
    ru: { badge: 'Выбор Ручной Работы' }
  }[lang];

  return (
    <section
      id="hero"
      className="relative min-h-[75vh] sm:min-h-[85vh] bg-brand-cream overflow-hidden pt-14 sm:pt-20 pb-4 flex flex-col justify-center items-center"
    >
      <style>{`
        .satellite-button {
          --distance: 100px;
        }
        @media (min-width: 640px) {
          .satellite-button {
            --distance: 165px;
          }
        }
        @media (min-width: 768px) {
          .satellite-button {
            --distance: 210px;
          }
        }
      `}</style>

      {/* Transitioning backgrounds for each samsa */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {HERO_PRODUCTS.map((prod, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-800 ease-in-out"
            style={{
              backgroundImage: `url(/bg${idx + 1}.jpeg)`,
              opacity: selectedIdx === idx ? 0.38 : 0,
            }}
          />
        ))}
        {/* Soft overlay to blend with the cream aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/65 to-[#FAF8F5]/90" />
      </div>

      {/* Modern thin guidelines / decorative borders from theme */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-brand-charcoal/[0.04] pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-brand-charcoal/[0.04] pointer-events-none hidden md:block" />

      {/* Dynamic light amber soft ambient glow behind the crust platter */}
      <div className="absolute top-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-sunset/5 blur-[120px] transition-all duration-1000 -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 flex flex-col items-center">
        
        {/* Main Showcase Plate Carousel Grid */}
        <div className="relative flex items-center justify-center w-full max-w-2xl py-2 sm:py-6">
          
          {/* Circular dial backing */}
          <div className="relative w-64 h-64 sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            
            {/* Outer Rotary Dial containing product avatars */}
            <div 
              ref={discRef}
              className="absolute inset-0 rounded-full border border-dashed border-brand-charcoal/15 bg-brand-cream/30 flex items-center justify-center transition-all duration-1000"
              style={{ 
                transform: `rotate(${selectedIdx * -60}deg)`
              }}
            >
              {/* Compass numbers for 6 spots */}
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-brand-charcoal/5 flex items-center justify-center font-bold">
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = i * 60;
                  return (
                    <span 
                      key={i} 
                      className="absolute text-[8px] font-mono tracking-widest text-brand-charcoal/20 font-bold"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-40%)`
                      }}
                    >
                      •
                    </span>
                  );
                })}
              </div>

              {/* 6 Satellite Miniature Previews (Bigger with near to edge padding) */}
              {HERO_PRODUCTS.map((prod, idx) => {
                const rotationAngle = idx * 60; // 360 / 6
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={prod.id ?? idx}
                    onClick={() => setSelectedIdx(idx)}
                    className={`satellite-button absolute w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border p-1 overflow-hidden transition-all duration-500 shadow-md ${
                      isSelected 
                        ? 'border-brand-sunset ring-4 ring-brand-sunset/20 scale-110 z-20 opacity-100 bg-brand-cream' 
                        : 'border-brand-charcoal/10 scale-90 opacity-55 hover:opacity-100 bg-brand-cream/90'
                    }`}
                    style={{
                      transform: `rotate(${rotationAngle}deg) translate(var(--distance)) rotate(-${rotationAngle}deg) rotate(${selectedIdx * 60}deg)`
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name[lang]}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>

            {/* Central Elevated Product Display Pedestal - 1.5x Larger & Strictly on Top (Covers 1/3 of small plates) */}
            <div className="absolute z-30 w-60 h-60 sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-radial from-brand-charcoal/[0.04] via-transparent to-transparent flex items-center justify-center pointer-events-none">
              
              {/* Floating particle/ingredient anchor point */}
              <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center" />

              {/* Selected Product Main Image (No Weight overlay) - 1.5x original size */}
              <div 
                ref={mainImageRef} 
                className="w-44 h-44 sm:w-[292px] sm:h-[292px] md:w-[382px] md:h-[382px] rounded-full overflow-hidden shadow-2xl border-[4px] sm:border-[6px] border-brand-cream aspect-square group relative pointer-events-auto"
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name[lang]}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle depth overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Decorative soft shadow */}
            <div className="absolute -bottom-2 w-52 sm:w-64 h-6 sm:h-8 bg-brand-charcoal/5 blur-xl rounded-full -z-10" />
          </div>

          {/* Platter Left/Right Physical Swipers */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-8 md:-left-16 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-charcoal/15 bg-brand-cream flex items-center justify-center text-brand-charcoal hover:border-brand-sunset hover:text-brand-sunset hover:bg-brand-charcoal/5 transition-all shadow-sm cursor-pointer z-20 font-bold focus:outline-none"
            aria-label="Previous Hearth Product"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-8 md:-right-16 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-charcoal/15 bg-brand-cream flex items-center justify-center text-brand-charcoal hover:border-brand-sunset hover:text-brand-sunset hover:bg-brand-charcoal/5 transition-all shadow-sm cursor-pointer z-20 font-bold focus:outline-none"
            aria-label="Next Hearth Product"
          >
            →
          </button>

        </div>

        {/* Compact, clean text presentation section instead of diagnostic bars */}
        <div 
          ref={textContentRef}
          className="mt-4 md:mt-10 bg-brand-cream border border-brand-charcoal/10 rounded-2xl py-4 px-4 sm:py-5 sm:px-6 text-center max-w-xl w-full"
        >
          <h1 className="hero-anim-item font-sans text-xl sm:text-2xl md:text-3xl font-black text-brand-charcoal uppercase tracking-tighter mb-2 leading-tight">
            {activeProduct.name[lang]}
          </h1>

          <p className="hero-anim-item text-brand-charcoal/70 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
            {activeProduct.description[lang]}
          </p>
        </div>

      </div>

      {/* Signature Vertical Side Decoration strip */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 py-20 px-3 bg-brand-charcoal text-white rounded-l-[20px] z-20 hidden xl:block border-l border-y border-brand-sunset/20">
        <div className="writing-vertical-rl rotate-180 text-[9px] uppercase tracking-[0.55em] font-bold text-brand-cream/90">
          Halol • Mazali • Tandir Somsa
        </div>
      </div>
    </section>
  );
}
