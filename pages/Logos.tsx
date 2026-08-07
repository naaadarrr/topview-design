
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import lottie, { AnimationItem } from 'lottie-web';
import JSZip from 'jszip';
import { Language, translations } from '../translations';

interface LogosProps {
  language: Language;
}

const Logos: React.FC<LogosProps> = ({ language }) => {
  const t = translations[language].logos;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const logoExhibitionItems = [
    { id: '01', w: 'w-[560px]' },
    { id: '02', w: 'w-[560px]' },
    { id: '03', w: 'w-[560px]' },
    { id: '04', w: 'w-[560px]' },
  ];

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftPos(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => { setIsDragging(false); checkScroll(); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };
  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex - 1 + logoExhibitionItems.length) % logoExhibitionItems.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex + 1) % logoExhibitionItems.length);
  };

  const handleDownload = (logoPath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = logoPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const svgToPngPath = (svgPath: string) => svgPath.replace('/SVG/', '/PNG/').replace('.svg', '.png');

  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadAll = async () => {
    const logos = [
      { path: '/logo/Topview_Logo_New_RGB/SVG/Horizontal_Black.svg', name: 'SVG/Horizontal_Black.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Horizontal_White.svg', name: 'SVG/Horizontal_White.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Horizontal_Purple.svg', name: 'SVG/Horizontal_Purple.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Vertical_Black.svg', name: 'SVG/Vertical_Black.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Vertical_White.svg', name: 'SVG/Vertical_White.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Vertical_Purple.svg', name: 'SVG/Vertical_Purple.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Symbol_Black.svg', name: 'SVG/Symbol_Black.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Symbol_White.svg', name: 'SVG/Symbol_White.svg' },
      { path: '/logo/Topview_Logo_New_RGB/SVG/Symbol_Purple.svg', name: 'SVG/Symbol_Purple.svg' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Horizontal_Black.png', name: 'PNG/Horizontal_Black.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Horizontal_White.png', name: 'PNG/Horizontal_White.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Horizontal_Purple.png', name: 'PNG/Horizontal_Purple.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Vertical_Black.png', name: 'PNG/Vertical_Black.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Vertical_White.png', name: 'PNG/Vertical_White.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Vertical_Purple.png', name: 'PNG/Vertical_Purple.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Symbol_Black.png', name: 'PNG/Symbol_Black.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Symbol_White.png', name: 'PNG/Symbol_White.png' },
      { path: '/logo/Topview_Logo_New_RGB/PNG/Symbol_Purple.png', name: 'PNG/Symbol_Purple.png' },
      { path: '/favicon_io/favicon.ico', name: 'Favicon/favicon.ico' },
      { path: '/favicon_io/favicon-32x32.png', name: 'Favicon/favicon-32x32.png' },
      { path: '/favicon_io/favicon-16x16.png', name: 'Favicon/favicon-16x16.png' },
      { path: '/favicon_io/apple-touch-icon.png', name: 'Favicon/apple-touch-icon.png' },
      { path: '/favicon_io/android-chrome-192x192.png', name: 'Favicon/android-chrome-192x192.png' },
      { path: '/favicon_io/android-chrome-512x512.png', name: 'Favicon/android-chrome-512x512.png' },
      { path: '/logo/Topview_Logo_New_RGB/Topview%20Japan%20logo/TopviewJapan_new_logo.png', name: 'Japan/TopviewJapan_new_logo.png' },
    ];

    setIsZipping(true);
    const zip = new JSZip();
    const folder = zip.folder('TopView_Logo_Assets')!;

    await Promise.all(
      logos.map(async (logo) => {
        try {
          const res = await fetch(logo.path);
          const blob = await res.blob();
          folder.file(logo.name, blob);
        } catch {
          // skip files that fail to fetch
        }
      })
    );

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TopView_Logo_Assets.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const LogoAnimation = ({ src, downloadName, dark = false }: { src: string; downloadName: string; dark?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;
      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
      });
      return () => { animRef.current?.destroy(); };
    }, [src]);

    return (
      <div
        className={`group relative rounded-[10px] overflow-hidden flex items-center justify-center ${dark ? 'bg-[#0e0e0e]' : 'bg-neutral-100'}`}
        style={{ aspectRatio: '1024 / 288' }}
      >
        <div ref={containerRef} className="w-full h-full" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-6 z-20">
          <button
            onClick={() => handleDownload(src, downloadName)}
            className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#731DFB] hover:text-white shadow-2xl"
          >
            Download Lottie JSON
          </button>
        </div>
      </div>
    );
  };

  const LogoCard = ({ path, nameBase, dark = false }: { path: string, nameBase: string, dark?: boolean }) => {
    const pngPath = svgToPngPath(path);
    const nameSvg = `${nameBase}.svg`;
    const namePng = `${nameBase}.png`;
    return (
      <div className={`group relative ${dark ? 'bg-[#222222]' : 'bg-neutral-100'} rounded-[10px] p-24 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-inner`}>
        <img src={path} alt={nameBase} className="h-16 relative z-10" />
        
        {/* Hover Download Buttons - SVG + PNG */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start gap-3 p-6 z-20">
          <button 
            onClick={() => handleDownload(path, nameSvg)}
            className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#731DFB] hover:text-white shadow-2xl"
          >
            Download SVG
          </button>
          <button 
            onClick={() => handleDownload(pngPath, namePng)}
            className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#731DFB] hover:text-white shadow-2xl"
          >
            Download PNG
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="max-w-full text-white space-y-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="catalog-title text-[24px] leading-[32px] tracking-tight">
          {t.title}
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          {t.desc}
        </p>
      </div>

      <div className="space-y-32 fade-in" style={{ animationDelay: '0.1s' }}>
        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Horizontal</h3>
          <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Horizontal_Black.svg" nameBase="TopView-Horizontal-Black" />
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Horizontal Reverse</h3>
          <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Horizontal_White.svg" nameBase="TopView-Horizontal-White" dark />
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Horizontal Purple</h3>
          <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Horizontal_Purple.svg" nameBase="TopView-Horizontal-Purple" />
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Vertical</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Vertical_Black.svg" nameBase="TopView-Vertical-Black" />
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Vertical_White.svg" nameBase="TopView-Vertical-White" dark />
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Vertical_Purple.svg" nameBase="TopView-Vertical-Purple" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Symbol</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Symbol_Black.svg" nameBase="TopView-Symbol-Black" />
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Symbol_White.svg" nameBase="TopView-Symbol-White" dark />
            <LogoCard path="/logo/Topview_Logo_New_RGB/SVG/Symbol_Purple.svg" nameBase="TopView-Symbol-Purple" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Logo Animation</h3>
          <div className="flex flex-col gap-6">
            <LogoAnimation src="/lottie/topview-logo-purple.json" downloadName="TopView-Logo-Animation-Light.json" />
            <LogoAnimation src="/lottie/topview-logo-white.json" downloadName="TopView-Logo-Animation-Dark.json" dark />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Favicon</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { file: 'favicon-16x16.png', label: '16×16' },
              { file: 'favicon-32x32.png', label: '32×32' },
              { file: 'apple-touch-icon.png', label: '180×180 (Apple)' },
              { file: 'android-chrome-192x192.png', label: '192×192 (Android)' },
              { file: 'android-chrome-512x512.png', label: '512×512 (Android)' },
            ].map(({ file, label }) => {
              const path = `/favicon_io/${file}`;
              return (
                <div
                  key={file}
                  className="group relative bg-neutral-100 rounded-[10px] p-8 flex flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-500 shadow-inner"
                >
                  <img src={path} alt={label} className="w-12 h-12 object-contain relative z-10" />
                  <span className="text-[10px] font-sans text-neutral-400 tracking-widest text-center">{label}</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4 z-20">
                    <button
                      onClick={() => handleDownload(path, file)}
                      className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#731DFB] hover:text-white shadow-2xl"
                    >
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Japan</h3>
          <div className="group relative w-full md:w-1/3 bg-[#222222] rounded-[10px] p-24 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-inner">
            <img
              src="/logo/Topview_Logo_New_RGB/Topview%20Japan%20logo/TopviewJapan_new_logo.png"
              alt="TopView Japan Logo"
              className="h-16 relative z-10 object-contain"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-6 z-20">
              <button
                onClick={() => handleDownload(
                  '/logo/Topview_Logo_New_RGB/Topview%20Japan%20logo/TopviewJapan_new_logo.png',
                  'TopView-Japan-Logo.png'
                )}
                className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#731DFB] hover:text-white shadow-2xl"
              >
                Download PNG
              </button>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="pb-4">
          <h3 className="text-xs font-bold tracking-widest text-neutral-500 mb-8 font-sans capitalize">Download All Assets</h3>
          <div className="flex flex-col items-start gap-6">
            <button
              onClick={handleDownloadAll}
              disabled={isZipping}
              className="px-12 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#731DFB] hover:text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-wait disabled:scale-100"
            >
              {isZipping ? 'Preparing ZIP…' : t.downloadAll}
            </button>
          </div>
        </section>

        {/* Logo Exhibition */}
        <section className="fade-in relative group/section overflow-visible pb-24">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-12 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 no-scrollbar items-start cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {logoExhibitionItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[420px] cursor-zoom-in snap-start"
                onClick={() => !isDragging && setSelectedIndex(index)}
              >
                <img
                  src={`/logo/${item.id}.png`}
                  alt={`Logo Case ${item.id}`}
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
      </div>
    </div>

    {/* Lightbox */}
      {selectedIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute top-8 right-8 flex items-center gap-8 z-[110]">
            <span className="font-mono text-xs text-white/40 tracking-widest">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(logoExhibitionItems.length).padStart(2, '0')}
            </span>
            <button className="text-white/60 hover:text-white transition-colors p-2" onClick={() => setSelectedIndex(null)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button className="absolute left-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block" onClick={handlePrev}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="absolute right-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block" onClick={handleNext}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-12 md:p-24 lg:p-32">
            <img
              key={logoExhibitionItems[selectedIndex].id}
              src={`/logo/${logoExhibitionItems[selectedIndex].id}.png`}
              alt="Enlarged Logo Case"
              className="max-w-full max-h-full object-contain shadow-2xl animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Logos;
