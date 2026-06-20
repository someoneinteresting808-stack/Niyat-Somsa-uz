import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_PRODUCTS } from '../data/somsaData';
import { useLanguage } from '../context/LanguageContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { gsap } from 'gsap';

interface MenuItem {
  id: string;
  name: any;
  price: string;
  category: any;
  description: string;
  tagline?: any;
  image: string;
}

export default function InteractiveMenu() {
  const { language } = useLanguage();
  const lang = (language === 'uz' || language === 'ru' || language === 'en') ? language : 'uz';
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(2); // Start focused on the 3rd card (index 2)

  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch menu from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      
      // Only include items selected for Lazzat Xaritasi (isSpecial), max 8 items
      const validItems = items.filter(item => item.image && (item as any).isSpecial).slice(0, 8);
      setMenuItems(validItems);
    });
    return () => unsubscribe();
  }, []);

  const displayItems = menuItems.length > 0 ? menuItems : HERO_PRODUCTS;

  // Set active index to 3rd item (index 2) when items load
  useEffect(() => {
    if (displayItems.length > 0) {
      const targetIdx = Math.min(2, displayItems.length - 1);
      setActiveIndex(targetIdx);
    }
  }, [menuItems]);

  const updateCardLayout = (centerIdx: number) => {
    const N = displayItems.length;
    if (N === 0) return;

    for (let i = 0; i < N; i++) {
      const card = cardsRef.current[i];
      if (!card) continue;

      // Calculate wrapped looping distance for a circular layout
      let diff = i - centerIdx;
      const half = N / 2;

      if (diff > half) {
        diff -= N;
      } else if (diff < -half) {
        diff += N;
      } else if (diff === half) {
        diff = -half; 
      }

      const absDiff = Math.abs(diff);

      // Rotate, translate and shift cards 3D coverflow-style using scale to avoid browser hit-testing issues
      let translateX = diff * 210; 
      let scale = 1 - absDiff * 0.15; 
      let rotateY = diff * -25; 
      let opacity = 1 - absDiff * 0.35; 
      let zIndex = 30 - absDiff;

      // Responsive adjustments for tablet / mobile viewports
      if (window.innerWidth < 640) {
        translateX = diff * 90;
        scale = 1 - absDiff * 0.18;
        rotateY = diff * -20;
        opacity = 1 - absDiff * 0.45;
      } else if (window.innerWidth < 1024) {
        translateX = diff * 160;
        scale = 1 - absDiff * 0.15;
        rotateY = diff * -25;
      }

      gsap.to(card, {
        x: translateX,
        scale: scale,
        rotateY: rotateY,
        opacity: Math.max(opacity, 0.05),
        zIndex: zIndex,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  useEffect(() => {
    updateCardLayout(activeIndex);
  }, [activeIndex, displayItems]);

  // Window resize handler to maintain responsiveness on window size changes
  useEffect(() => {
    const handleResize = () => updateCardLayout(activeIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, displayItems]);

  const handleCardClick = (idx: number) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    } else {
      navigate('/menu');
    }
  };

  const textT = {
    uz: {
      menuTitle: 'Lazzat Xaritasi',
      menuDesc: 'Menyuimizdagi eng sara taomlar to‘plami. Istalgan somsa ustiga bosib uni markazga keltiring va batafsil ko‘rish uchun yana bir bor bosing.',
    },
    en: {
      menuTitle: 'Flavors Chart',
      menuDesc: 'Explore our selected dishes. Click any card to focus on it, and click again to view full menu and order.',
    },
    ru: {
      menuTitle: 'Карта Вкусов',
      menuDesc: 'Подборка лучших блюд из нашего меню. Нажмите на любую самсу, чтобы переместить ее в центр, и нажмите еще раз для подробного просмотра.',
    }
  }[lang];

  // Clean the cards ref list on each render
  cardsRef.current = cardsRef.current.slice(0, displayItems.length);

  return (
    <section id="menu-interactive" className="bg-[#FAF8F5] py-16 sm:py-24 border-t border-brand-charcoal/5 relative overflow-hidden">
      
      {/* Dynamic 3D Transform perspective style wrapper */}
      <style>{`
        .perspective-stage {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-[15%] w-[1px] bg-brand-charcoal/[0.03] pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 right-[15%] w-[1px] bg-brand-charcoal/[0.03] pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col items-center">
        
        {/* Header Text block */}
        <div className="text-center space-y-2 mb-12 max-w-xl">
          <h2 className="font-sans text-3xl sm:text-5xl font-black text-brand-charcoal tracking-tighter uppercase leading-none">
            {textT.menuTitle}
          </h2>
          <p className="text-brand-charcoal/60 text-xs sm:text-sm font-light leading-relaxed">
            {textT.menuDesc}
          </p>
        </div>

        {/* 3D Coverflow stage area - expanded width to fit spacing properly */}
        <div 
          ref={stageRef} 
          className="perspective-stage relative w-full max-w-xl sm:max-w-3xl md:max-w-4xl h-[330px] sm:h-[430px] flex items-center justify-center mb-4"
        >
          {displayItems.map((item, idx) => {
            // Check if name and category are translated (fallback if loading from DB as raw string)
            const itemName = typeof item.name === 'object' ? item.name[lang] : item.name;
            const itemTagline = typeof item.tagline === 'object' ? item.tagline[lang] : (item.description || '');
            const itemCategory = typeof item.category === 'object' ? item.category[lang] : item.category;

            return (
              <div
                key={item.id ?? idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                onClick={() => handleCardClick(idx)}
                className="absolute w-[170px] h-[255px] sm:w-[250px] sm:h-[350px] cursor-pointer preserve-3d bg-brand-cream border border-brand-charcoal/10 rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 flex flex-col justify-between shadow-lg select-none hover:shadow-xl transition-shadow"
              >
                {/* Category + Price Badge header line */}
                <div className="flex justify-between items-center border-b border-brand-charcoal/5 pb-1.5 sm:pb-2">
                  <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase text-brand-sunset bg-brand-sunset/5 px-1.5 py-0.5 rounded">
                    {itemCategory}
                  </span>
                  <span className="font-mono text-[9px] sm:text-xs font-black text-brand-charcoal">
                    {item.price}
                  </span>
                </div>

                {/* Product Image representation - Enriched size for best responsiveness */}
                <div className="w-full h-28 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden border border-brand-charcoal/5 shadow-inner my-1.5 sm:my-2">
                  <img
                    src={item.image}
                    alt={itemName}
                    className="w-full h-full object-cover filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Item Textual Identity info */}
                <div className="flex-grow flex flex-col justify-center text-center">
                  <h3 className="font-sans text-[10px] sm:text-xs md:text-sm font-black text-brand-charcoal uppercase tracking-tight leading-none mb-0.5 sm:mb-1">
                    {itemName}
                  </h3>
                  <p className="text-brand-charcoal/60 text-[8px] sm:text-[10px] leading-snug font-light max-w-[95%] mx-auto line-clamp-2">
                    {itemTagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
