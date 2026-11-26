import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, translations } from '../translations';

interface TypographyProps {
  language: Language;
}

const Typography: React.FC<TypographyProps> = ({ language }) => {
  const t = translations[language].typography;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const exhibitionItems = [
    { id: '01', w: 'w-[525px]' },
    { id: '02', w: 'w-[606px]' },
    { id: '03', w: 'w-[672px]' },
    { id: '04', w: 'w-[787px]' },
    { id: '05', w: 'w-[565px]' },
    { id: '06', w: 'w-[483px]' },
    { id: '07', w: 'w-[508px]' }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + exhibitionItems.length) % exhibitionItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % exhibitionItems.length);
    }
  };

  const videoFonts = [
    { name: 'Saira Extra Condensed', family: '"Saira Extra Condensed", sans-serif', weight: 700, href: 'https://fonts.google.com/specimen/Saira+Extra+Condensed' },
    { name: 'Archivo Black', family: '"Archivo Black", sans-serif', weight: 400, href: 'https://fonts.google.com/specimen/Archivo+Black' },
    { name: 'Bebas Neue', family: '"Bebas Neue", sans-serif', weight: 400, href: 'https://fonts.google.com/specimen/Bebas+Neue' },
    { name: 'League Gothic', family: '"League Gothic", sans-serif', weight: 400, href: 'https://fonts.google.com/specimen/League+Gothic' },
    { name: 'Google Sans Flex', family: '"Google Sans Flex", sans-serif', weight: 400, href: 'https://fonts.google.com/specimen/Google+Sans+Flex' },
    { name: 'Lexend Deca', family: '"Lexend Deca", sans-serif', weight: 400, href: 'https://fonts.google.com/specimen/Lexend+Deca' },
    { name: 'Montserrat', family: '"Montserrat", sans-serif', weight: 500, href: 'https://fonts.google.com/specimen/Montserrat' },
  ];

  const typeRoles = [
    {
      id: 'display',
      name: t.roleDisplay,
      meta: t.roleDisplayMeta,
      sample: t.sampleDisplay,
      className: 'font-darker text-[52px] font-black uppercase leading-none tracking-[-1.5px] text-white',
    },
    {
      id: 'section',
      name: t.roleSection,
      meta: t.roleSectionMeta,
      sample: t.sampleSection,
      className: 'font-darker text-[32px] font-black uppercase leading-none tracking-[-1.5px] text-white',
    },
    {
      id: 'group',
      name: t.roleGroup,
      meta: t.roleGroupMeta,
      sample: t.sampleGroup,
      className: 'font-sans text-[14px] font-semibold leading-[20px] text-white',
    },
    {
      id: 'body',
      name: t.roleBody,
      meta: t.roleBodyMeta,
      sample: t.sampleBody,
      className: 'font-sans text-[14px] font-normal leading-[20px] text-white',
    },
    {
      id: 'small',
      name: t.roleSmall,
      meta: t.roleSmallMeta,
      sample: t.sampleSmall,
      className: 'font-sans text-[12px] font-normal leading-[16px] text-white/60',
    },
    {
      id: 'mono',
      name: t.roleMono,
      meta: t.roleMonoMeta,
      sample: t.sampleMono,
      className: 'mono text-[12px] font-normal leading-[16px] text-white',
    },
  ];

  return (
    <div className="max-w-full text-white space-y-48 pb-32 overflow-x-visible">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="site-h1">
          {t.title}
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          {t.desc}
        </p>
      </div>

      {/* 2. Fonts Section — Current */}
      <div id="typography-families" className="space-y-24 fade-in scroll-mt-8" style={{ animationDelay: '0.1s' }}>
        <div>
          <h2 className="site-h2 mb-12">{t.siteTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-12 rounded-[10px] bg-[#222222] border border-white/5 h-[400px] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-8 block font-sans">{t.brandMarketing}</span>
              <p className="text-6xl md:text-7xl font-darker font-bold tracking-tighter leading-[0.95]">Darker Grotesque</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white/40 text-sm mb-8 uppercase tracking-widest">{t.weights}: 300–900</p>
              <button 
                onClick={() => window.open('https://fonts.google.com/specimen/Darker+Grotesque', '_blank')}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-[#731DFB] hover:text-white transition-all duration-300"
              >
                {t.downloadGoogleFonts}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          <div className="p-12 rounded-[10px] bg-[#222222] border border-white/5 h-[400px] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-8 block font-sans">{t.productUI}</span>
              <p className="text-5xl md:text-6xl font-sans font-semibold tracking-tight leading-[0.95]">Instrument Sans</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white/40 text-sm mb-8 uppercase tracking-widest">{t.weights}: 400, 500, 600, 700</p>
              <button 
                onClick={() => window.open('https://fonts.google.com/specimen/Instrument+Sans', '_blank')}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-[#731DFB] hover:text-white transition-all duration-300"
              >
                {t.downloadGoogleFonts}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
          </div>
        </div>

        <section className="space-y-16">
          <div>
            <h2 className="site-h2">{t.videoTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-5 font-sans text-white/60">{t.videoNote}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoFonts.map((font) => (
              <a
                key={font.name}
                href={font.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[188px] flex-col justify-between rounded-[10px] border border-white/5 bg-[#222222] p-6 text-white transition-colors duration-200 hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white"
              >
                <span className="text-[28px] leading-[0.95] lg:text-[32px]" style={{ fontFamily: font.family, fontWeight: font.weight }}>
                  {font.name}
                </span>
                <span className="inline-flex w-fit items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-5 py-2.5 font-sans text-sm font-bold text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {t.downloadGoogleFonts}
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>

      <section id="typography-text-styles" className="fade-in pt-12 scroll-mt-8" style={{ animationDelay: '0.15s' }}>
        <h2 className="site-h2 mb-12">{t.textStylesTitle}</h2>
        <div className="flex flex-col gap-10">
          {typeRoles.map((role) => (
            <div key={role.id} className="grid grid-cols-1 items-baseline gap-3 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12">
              <div>
                <p className="font-sans text-sm font-medium leading-5 text-white">{role.name}</p>
                <p className="mt-1 font-sans text-sm leading-5 text-white/60">{role.meta}</p>
              </div>
              <p className={role.className}>{role.sample}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-xl font-sans text-sm leading-5 text-white/60">{t.rolePending}</p>
        <p className="mt-2 max-w-xl font-sans text-sm leading-5 text-white/60">{t.roleFaceNote}</p>
      </section>

      {/* 4. Exhibition Section */}
      <section className="fade-in pt-12 relative group/section overflow-visible" style={{ animationDelay: '0.2s' }}>
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-12 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 no-scrollbar items-start cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {exhibitionItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex-shrink-0 ${item.w} cursor-zoom-in snap-start`}
              onClick={() => !isDragging && setSelectedIndex(index)}
            >
              <img 
                src={`/typography/${item.id}.png`} 
                alt={`Typography Case ${item.id}`} 
                className="w-full h-auto block select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('left')}
          className={`absolute left-0 top-[40%] -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white/5 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 rounded-full ${canScrollLeft ? 'opacity-0 group-hover/section:opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-0 top-[40%] -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white/5 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 rounded-full ${canScrollRight ? 'opacity-0 group-hover/section:opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </section>

      <p className="text-sm leading-[22px] font-sans text-white/40">{t.legacyLine}</p>

      {/* Lightbox Modal */}
      {selectedIndex !== null && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Controls */}
          <div className="absolute top-8 right-8 flex items-center gap-8 z-[110]">
            <span className="font-mono text-xs text-white/40 tracking-widest">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(exhibitionItems.length).padStart(2, '0')}
            </span>
            <button 
              className="text-white/60 hover:text-white transition-colors p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <button 
            className="absolute left-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block"
            onClick={handlePrev}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button 
            className="absolute right-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block"
            onClick={handleNext}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-12 md:p-24 lg:p-32">
            <img 
              key={exhibitionItems[selectedIndex].id}
              src={`/typography/${exhibitionItems[selectedIndex].id}.png`} 
              alt="Enlarged Case" 
              className="max-w-full max-h-full object-contain shadow-2xl animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Typography;
