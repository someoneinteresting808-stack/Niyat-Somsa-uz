import { useEffect, useRef, useState } from 'react';
import { GALLERY_PHOTOS } from '../data/somsaData';
import { useLanguage } from '../context/LanguageContext';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

// Prevent ScrollTrigger from refreshing/bouncing on mobile viewports due to browser address bar resize
ScrollTrigger.config({
  ignoreMobileResize: true
});

export default function SecretsExplorer() {
  const { language } = useLanguage();
  const lang = (language === 'uz' || language === 'ru' || language === 'en') ? language : 'uz';

  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Listen to the Firestore gallery collection
  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const urls = snapshot.docs.map(doc => doc.data().url);
      setGalleryImages(urls);
    }, (error) => {
      console.error("Firestore gallery loading error:", error);
    });
    return () => unsubscribe();
  }, []);

  // Ensure exactly 8 items are present for bento-grid balance, fallback if < 8
  const displayImages = galleryImages.length >= 8 
    ? galleryImages.slice(0, 8) 
    : [...galleryImages, ...GALLERY_PHOTOS.slice(galleryImages.length, 8)];

  useEffect(() => {
    const galleryElement = galleryRef.current;
    const wrapElement = wrapRef.current;
    if (!galleryElement || !wrapElement) return;

    const galleryItems = galleryElement.querySelectorAll('.gallery__item');
    if (galleryItems.length === 0) return;

    // Use gsap.matchMedia for clean dynamic resize transitions and pin spacer management
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isMobile } = context.conditions as any;

      // Clean final class if left from a previous render
      galleryElement.classList.remove('gallery--final');

      // Temporarily add final class to capture the target layout state
      galleryElement.classList.add('gallery--final');
      const flipState = Flip.getState(galleryItems);
      galleryElement.classList.remove('gallery--final');

      // Create Flip animation between states
      const flip = Flip.to(flipState, {
        simple: true,
        ease: 'power1.inOut',
      });

      // Pin the section and scrub Flip progress with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapElement,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
          invalidateOnRefresh: true, // Recalculate size values on browser resize
        },
      });
      tl.add(flip);

      return () => {
        // Clean up classes and element styles on context revert
        galleryElement.classList.remove('gallery--final');
        gsap.set(galleryItems, { clearProps: 'all' });
      };
    });

    return () => mm.revert(); // Automatically reverts all matched animations & destroys ScrollTriggers
  }, [displayImages]);

  const textT = {
    uz: 'Har bir luqmada o‘zbek mehmondo‘stligi',
    en: 'Uzbek hospitality in every single bite',
    ru: 'Узбекское гостеприимство в каждом кусочке'
  }[lang];

  return (
    <div id="secrets" className="bg-[#0f0e0c] relative overflow-hidden text-[#FAF8F5]">
      
      {/* Styles optimized for phone viewport and corrected grid areas */}
      <style>{`
        .gallery-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0f0e0c;
        }

        .gallery {
          position: relative;
          width: 100%;
          height: 100%;
          flex: none;
        }

        .gallery__item {
          background-position: 50% 50%;
          background-size: cover;
          flex: none;
          position: relative;
        }

        .gallery__item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .gallery--bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }

        @media (max-width: 768px) {
          .gallery-wrap {
            height: 100vh;
          }

          .gallery--bento {
            grid-template-columns: repeat(3, 31vw);
            grid-template-rows: repeat(4, 18vh);
            gap: 0.8vh;
          }

          .gallery--final.gallery--bento {
            grid-template-columns: repeat(3, 100vw);
            grid-template-rows: repeat(4, 24.8vh);
            gap: 0.8vh;
          }
        }

        .gallery--bento .gallery__item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }

        .gallery--bento .gallery__item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }

        .gallery--bento .gallery__item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }

        .gallery--bento .gallery__item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 4;
        }

        .gallery--bento .gallery__item:nth-child(5) {
          grid-area: 3 / 1 / 4 / 2;
        }

        .gallery--bento .gallery__item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }

        .gallery--bento .gallery__item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }

        .gallery--bento .gallery__item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }

        .section {
          padding: 6rem 5rem;
          background: #0f0e0c;
          color: #FAF8F5;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section h2 {
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 0;
          letter-spacing: -0.05em;
          color: #FAF8F5;
          line-height: 1.1;
        }

        @media (max-width: 768px) {
          .section {
            padding: 4rem 1.5rem;
          }
          .section h2 {
            font-size: 2.2rem;
          }
        }
      `}</style>

      {/* 1. Main GSAP Pinned Wrap Container */}
      <div ref={wrapRef} className="gallery-wrap">
        {/* Gallery element with Bento configuration classes */}
        <div 
          ref={galleryRef} 
          id="gallery-8" 
          className="gallery gallery--bento gallery--switch"
        >
          {displayImages.map((src, i) => (
            <div key={i} className="gallery__item">
              <img 
                src={src} 
                alt="" 
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Textual content section */}
      <div className="section text-center">
        <h2>{textT}</h2>
      </div>

    </div>
  );
}
