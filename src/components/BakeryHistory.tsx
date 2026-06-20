import { useEffect, useRef, useState } from 'react';
import { TIMELINE_EVENTS } from '../data/somsaData';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BakeryHistory() {
  const { language } = useLanguage();
  const lang = (language === 'uz' || language === 'ru' || language === 'en') ? language : 'uz';

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeEra, setActiveEra] = useState(0);

  // Responsive state detection
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP animation runs only on desktop viewports
  useEffect(() => {
    if (!isDesktop) return;

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Create stacking layers timeline for overscroll pinned panels
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: '+=220%', // Compact scroll depth space
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * cards.length),
              cards.length - 1
            );
            setActiveEra(index);
          }
        },
      });

      // Animate cards stacking on top of each other elegantly
      cards.forEach((card, i) => {
        if (i === 0) return;

        tl.fromTo(
          card,
          {
            yPercent: 120,
            scale: 1,
            opacity: 1,
          },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          `card-${i}`
        );

        const prevCard = cards[i - 1];
        if (prevCard) {
          tl.to(
            prevCard,
            {
              scale: 0.95,
              opacity: 0.8,
              yPercent: -8,
              duration: 1,
              ease: 'power2.inOut',
            },
            `card-${i}`
          );
        }
      });
    }, triggerEl);

    return () => ctx.revert();
  }, [isDesktop]);

  const textT = {
    uz: {
      badge: '1998-YILDAN BUYON',
      deck: 'Karta to‘plami',
      title1: 'Tandir olovi,',
      title2: 'Sehrli mahorat',
      desc: 'Bizning tandir o‘chog‘imiz va oilaviy retseptlarimiz ko‘p yillik an‘analarga asoslangan. Tariximizning har bir sahifasini bilish uchun pastga aylantiring.',
      swipeDesc: 'Tariximizning sahifalarini ko‘rish uchun suring.',
      chapter: 'Sahifa'
    },
    en: {
      badge: 'SINCE 1998 HISTORICAL',
      deck: 'Pinned Deck',
      title1: 'Forged in Tandir,',
      title2: 'Baked with Love',
      desc: 'Our clay-baked somsa starter story spans over decades of wood-fired craftsmanship. Scroll down to trace our culinary historical milestones.',
      swipeDesc: 'Swipe left or right to explore our history.',
      chapter: 'Chapter'
    },
    ru: {
      badge: 'С 1998 ГОДА НАШЕЙ ИСТОРИИ',
      deck: 'Колода карт',
      title1: 'Создано в тандыре,',
      title2: 'Сделано с любовью',
      desc: 'Наша история выпечки самсы в глиняной печи насчитывает десятилетия ручного труда. Прокрутите вниз, чтобы проследить основные этапы.',
      swipeDesc: 'Прокрутите вбок, чтобы изучить нашу историю.',
      chapter: 'Глава'
    }
  }[lang];

  return (
    <section ref={containerRef} id="history" className="bg-brand-tan border-t border-brand-charcoal/5 py-12 lg:py-0">
      
      {isDesktop ? (
        /* Pinned Stacked Cards Timeline for Desktop View */
        <div ref={triggerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
          
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
          <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-brand-charcoal/10 pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-brand-charcoal/10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-8 md:px-12 w-full h-[80vh] flex flex-row items-center justify-between gap-16 z-10">
            
            {/* Left Column: Title narrative */}
            <div className="w-[42%] flex flex-col justify-center space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-sunset animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-brand-sunset">
                    {textT.badge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-brand-charcoal/30">/ {textT.deck}</span>
                </div>
                
                <h2 className="font-sans text-4xl lg:text-[45px] font-black text-brand-charcoal leading-[0.95] uppercase tracking-tighter">
                  {textT.title1}<br />{textT.title2}
                </h2>
              </div>

              <div className="h-[1px] w-full bg-brand-charcoal/10" />

              <p className="text-brand-charcoal/[0.65] text-sm leading-relaxed max-w-sm font-light">
                {textT.desc}
              </p>
            </div>

            {/* Right Column: Stacked absolute deck cards */}
            <div className="w-[52%] relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-sm h-[420px] lg:h-[450px]">
                {TIMELINE_EVENTS.map((event, i) => (
                  <div
                    key={event.year}
                    ref={(el) => { cardsRef.current[i] = el; }}
                    className="absolute inset-0 w-full h-full bg-brand-cream border border-brand-charcoal/10 rounded-[32px] p-6 shadow-xl flex flex-col justify-between origin-bottom transition-shadow duration-300 transform-gpu"
                    style={{
                      zIndex: i + 1,
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-sunset" />
                        <span className="font-mono text-xs font-black text-brand-charcoal tracking-wide bg-brand-tan px-2.5 py-1 rounded">
                          {event.year}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-brand-charcoal/40 font-bold">
                        {event.subtitle[lang]}
                      </span>
                    </div>

                    <div className="flex-1 my-3 flex flex-col justify-center">
                      <h3 className="font-sans text-xl lg:text-2xl font-black text-brand-charcoal tracking-tighter uppercase mb-2 leading-none">
                        {event.title[lang]}
                      </h3>
                      <p className="text-brand-charcoal/70 text-xs leading-relaxed font-light">
                        {event.description[lang]}
                      </p>
                    </div>

                    <div className="relative h-32 lg:h-[180px] w-full rounded-2xl overflow-hidden border border-brand-charcoal/10 group mt-auto">
                      <img
                        src={event.image}
                        alt={event.title[lang]}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent pointer-events-none" />
                      
                      <span className="absolute bottom-3 right-3 bg-brand-cream/90 backdrop-blur-xs text-brand-charcoal text-[9px] font-mono uppercase tracking-widest font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                        {textT.chapter} {i + 1}
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Native-feeling mobile swipeable timeline cards container */
        <div className="max-w-7xl mx-auto px-4 w-full flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-brand-sunset animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-brand-sunset">
                {textT.badge}
              </span>
            </div>
            
            <h2 className="font-sans text-2xl font-black text-brand-charcoal uppercase tracking-tighter leading-tight">
              {textT.title1} {textT.title2}
            </h2>
            <p className="text-brand-charcoal/[0.65] text-xs font-light max-w-sm mx-auto leading-relaxed">
              {textT.swipeDesc}
            </p>
          </div>

          {/* Swipe timeline wrapper */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 py-4 px-2 -mx-4">
            {TIMELINE_EVENTS.map((event, i) => (
              <div
                key={event.year}
                className="snap-center shrink-0 w-[285px] bg-brand-cream border border-brand-charcoal/10 rounded-[24px] p-4 sm:p-5 shadow-lg flex flex-col justify-between h-[360px]"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-sunset" />
                    <span className="font-mono text-xs font-black text-brand-charcoal bg-brand-tan px-2 py-0.5 rounded">
                      {event.year}
                    </span>
                  </div>
                  <span className="text-[8px] uppercase font-mono tracking-widest text-brand-charcoal/40 font-bold truncate max-w-[120px]">
                    {event.subtitle[lang]}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex-grow my-2 flex flex-col justify-center">
                  <h3 className="font-sans text-base font-black text-brand-charcoal uppercase tracking-tight mb-1.5 leading-snug">
                    {event.title[lang]}
                  </h3>
                  <p className="text-brand-charcoal/70 text-[10px] leading-relaxed font-light line-clamp-4">
                    {event.description[lang]}
                  </p>
                </div>

                {/* Card Image */}
                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-brand-charcoal/10 mt-auto">
                  <img
                    src={event.image}
                    alt={event.title[lang]}
                    className="w-full h-full object-cover filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent pointer-events-none" />
                  
                  <span className="absolute bottom-2 right-2 bg-brand-cream/90 backdrop-blur-xs text-brand-charcoal text-[8px] font-mono uppercase tracking-widest font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-white/10">
                    {textT.chapter} {i + 1}
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator dots */}
          <div className="flex justify-center gap-1.5 pt-1">
            {TIMELINE_EVENTS.map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-brand-sunset/30" 
              />
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
