import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Language, translations } from '../translations';

interface TypographyProps {
  language: Language;
}

const Typography: React.FC<TypographyProps> = ({ language }) => {
  const t = translations[language].typography;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const exhibitionItems = [
    { id: '01', w: 'w-[656px]' },
    { id: '02', w: 'w-[758px]' },
    { id: '03', w: 'w-[840px]' },
    { id: '04', w: 'w-[984px]' },
    { id: '05', w: 'w-[706px]' },
    { id: '06', w: 'w-[604px]' },
    { id: '07', w: 'w-[635px]' }
  ];

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

  const weightHierarchy = [
    { left: { label: 'Extralight', weight: 'font-extralight' }, right: { label: 'Semibold', weight: 'font-semibold' } },
    { left: { label: 'Light', weight: 'font-light' }, right: { label: 'Bold', weight: 'font-bold' } },
    { left: { label: 'Regular', weight: 'font-normal' }, right: { label: 'Black', weight: 'font-black' } },
    { left: { label: 'Medium', weight: 'font-medium' }, right: { label: 'Extrablack', weight: 'font-black' } },
  ];

  return (
    <div className="max-w-full text-white space-y-32 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
          {t.title}
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          {t.desc}
        </p>
      </div>

      <div className="space-y-24 fade-in" style={{ animationDelay: '0.1s' }}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-12 rounded-[10px] bg-neutral-900 border border-white/5 h-[400px] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-8 block font-sans">{t.brandMarketing}</span>
              <p className="text-8xl font-outfit font-black tracking-tighter">Outfit</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white/40 text-sm mb-8 uppercase tracking-widest">{t.weights}: 400, 500, 600, 700, 800, 900</p>
              <button 
                onClick={() => window.open('https://fonts.google.com/specimen/Outfit', '_blank')}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-[#3643FF] hover:text-white transition-all duration-300"
              >
                {t.downloadGoogleFonts}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          <div className="p-12 rounded-[10px] bg-neutral-900 border border-white/5 h-[400px] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-8 block font-sans">{t.productUI}</span>
              <p className="text-8xl font-inter font-bold tracking-tight">Inter</p>
            </div>
            <div>
              <p className="font-sans font-bold text-white/40 text-sm mb-8 uppercase tracking-widest">{t.weights}: 300, 400, 500, 600, 700</p>
              <button 
                onClick={() => window.open('https://fonts.google.com/specimen/Inter', '_blank')}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-[#3643FF] hover:text-white transition-all duration-300"
              >
                {t.downloadGoogleFonts}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Font Weight Hierarchy Section */}
        <section className="pt-12">
          <div className="bg-black border border-white/5 rounded-[10px] overflow-hidden">
            <div className="flex flex-col">
              {weightHierarchy.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 border-b border-white/10 last:border-0">
                  <div className={`p-8 md:p-12 ${row.left.weight} font-outfit text-[32px] tracking-tight text-white border-r border-white/10`}>
                    {row.left.label}
                  </div>
                  <div className={`p-8 md:p-12 ${row.right.weight} font-outfit text-[32px] tracking-tight text-white`}>
                    {row.right.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 案例展示 Section */}
      <section className="fade-in pt-12" style={{ animationDelay: '0.2s' }}>
        <div className="flex gap-8 overflow-x-auto pb-12 -mx-4 px-4 no-scrollbar items-start">
          {exhibitionItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex-shrink-0 ${item.w} bg-neutral-900 cursor-zoom-in`}
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={`/typography/${item.id}.png`} 
                alt={`Typography Case ${item.id}`} 
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      </section>

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
