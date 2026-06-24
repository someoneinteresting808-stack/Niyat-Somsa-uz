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

  // GSAP animation runs on all screen sizes to keep experience unified
  useEffect(() => {
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
          end: '+=200%', // Compact scroll depth space for optimal scrolling
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
  }, []);

  const textT = {
    uz: {
      title1: 'Tandir olovi,',
      title2: 'Sehrli mahorat',
      desc: 'Bizning tandir o‘chog‘imiz va oilaviy retseptlarimiz ko‘p yillik an‘analarga asoslangan. Tariximizning har bir sahifasini bilish uchun pastga aylantiring.',
      chapter: 'Sahifa'
    },
    en: {
      title1: 'Forged in Tandir,',
      title2: 'Baked with Love',
      desc: 'Our clay-baked somsa starter story spans over decades of wood-fired craftsmanship. Scroll down to trace our culinary historical milestones.',
      chapter: 'Chapter'
    },
    ru: {
      title1: 'Создано в тандыре,',
      title2: 'Сделано с любовью',
      desc: 'Наша история выпечки самсы в глиняной печи насчитывает десятилетия ручного труда. Прокрутите вниз, чтобы проследить основные этапы.',
      chapter: 'Глава'
    }
  }[lang];

  return (
    <section ref={containerRef} id="history" className="bg-history-section border-t border-brand-charcoal/5 relative py-0">
      
      {/* Pinned Stacked Cards Timeline - Responsive Unified Layout */}
      <div ref={triggerRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Soft overlay borders */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-brand-charcoal/10 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border-b border-r border-brand-charcoal/10 pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full h-[90vh] lg:h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-16 z-10 pt-10 lg:pt-0">
          
          {/* Left/Top Column: Title narrative */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center space-y-3 lg:space-y-6 text-center lg:text-left">
            <h2 className="font-sans text-3xl lg:text-[45px] font-black text-brand-charcoal leading-[0.95] uppercase tracking-tighter">
              {textT.title1}<br className="hidden lg:block" /> {textT.title2}
            </h2>

            <div className="h-[1px] w-full bg-brand-charcoal/10 hidden lg:block" />

            <p className="text-brand-charcoal/[0.65] text-[11px] lg:text-sm leading-relaxed max-w-sm mx-auto lg:mx-0 font-light">
              {textT.desc}
            </p>
          </div>

          {/* Right/Bottom Column: Stacked absolute deck cards */}
          <div className="w-full lg:w-[52%] relative h-[380px] lg:h-full flex items-center justify-center">
            <div className="relative w-full max-w-[305px] lg:max-w-sm h-[340px] lg:h-[450px]">
              {TIMELINE_EVENTS.map((event, i) => (
                <div
                  key={event.year}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="absolute inset-0 w-full h-full bg-brand-cream border border-brand-charcoal/10 rounded-[28px] lg:rounded-[32px] p-4 lg:p-6 shadow-xl flex flex-col justify-between origin-bottom transition-shadow duration-300 transform-gpu"
                  style={{
                    zIndex: i + 1,
                  }}
                >
                  <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-2 lg:pb-3">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-sunset" />
                      <span className="font-mono text-[10px] lg:text-xs font-black text-brand-charcoal tracking-wide bg-brand-tan px-2 py-0.5 lg:px-2.5 lg:py-1 rounded">
                        {event.year}
                      </span>
                    </div>
                    <span className="text-[8px] lg:text-[9px] uppercase font-mono tracking-widest text-brand-charcoal/40 font-bold">
                      {event.subtitle[lang]}
                    </span>
                  </div>

                  <div className="flex-1 my-2 lg:my-3 flex flex-col justify-center">
                    <h3 className="font-sans text-base lg:text-2xl font-black text-brand-charcoal tracking-tighter uppercase mb-1 lg:mb-2 leading-none">
                      {event.title[lang]}
                    </h3>
                    <p className="text-brand-charcoal/70 text-[10px] lg:text-xs leading-relaxed font-light line-clamp-3 lg:line-clamp-none">
                      {event.description[lang]}
                    </p>
                  </div>

                  <div className="relative h-24 lg:h-[180px] w-full rounded-xl lg:rounded-2xl overflow-hidden border border-brand-charcoal/10 group mt-auto">
                    <img
                      src={event.image}
                      alt={event.title[lang]}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent pointer-events-none" />
                    
                    <span className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 bg-brand-cream/90 backdrop-blur-xs text-brand-charcoal text-[8px] lg:text-[9px] font-mono uppercase tracking-widest font-black px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full flex items-center gap-0.5 lg:gap-1 border border-white/20">
                      {textT.chapter} {i + 1}
                      <ArrowUpRight className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Frosted Glass SVG wave transition zone connecting to Menu */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none translate-y-[1px]">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent backdrop-blur-[6px]" />
        <svg className="relative block w-full h-[40px] md:h-[70px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.3,25.86C160.7,41.9,235.14,67.24,321.39,56.44Z" className="fill-[#FAF8F5]/50"></path>
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C235.14,67.24,160.7,41.9,90.3,25.86,57.05,18.3,26.9,8.75,0,0V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#FAF8F5]"></path>
        </svg>
      </div>

    </section>
  );
}
