import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { TOPVIEW_BLUE_SCALE } from '../constants';
import { Language, translations } from '../translations';

interface ColorsProps {
  language: Language;
}

const Colors: React.FC<ColorsProps> = ({ language }) => {
  const t = translations[language].colors;
  const [copied, setCopied] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const primaryColor = {
    name: 'TOPVIEW BLUE',
    cmyk: '79 / 74 / 0 / 0',
    rgb: '54 / 67 / 255',
    hex: '#3643FF',
    pms: '2728 C'
  };

  const supportingColors = [
    { name: 'Black', cmyk: '60/40/40/100', rgb: '0/0/0', hex: '#000000', pms: 'Black C / U C' },
    { name: 'White', cmyk: '0/0/0/0', rgb: '255/255/255', hex: '#FFFFFF', pms: 'Bright White C' },
    { 
      name: 'Fill Gradient', 
      from: '#3341FF', 
      to: '#81A2FC', 
      css: 'linear-gradient(180deg, #3341FF 0%, #81A2FC 100%)', 
      type: 'Linear Gradient', 
      angle: '180deg',
      description: 'Primary fill gradient'
    },
    { 
      name: 'Text Gradient', 
      from: '#7881FF', 
      to: '#C1C5FF', 
      css: 'linear-gradient(90deg, #7881FF 0.04%, #C1C5FF 99.93%)', 
      type: 'Linear Gradient', 
      angle: '90deg',
      description: 'Used for headings and emphasis'
    }
  ];

  const exhibitionItems = [
    { id: '01', w: 'w-[400px]' },
    { id: '02', w: 'w-[758px]' },
    { id: '03', w: 'w-[840px]' },
    { id: '04', w: 'w-[984px]' },
    { id: '05', w: 'w-[706px]' },
    { id: '06', w: 'w-[736px]' }
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

  return (
    <div className="max-w-full text-white space-y-48 pb-40">
      {/* 1. 主题色介绍 */}
      <section className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 w-full">
          <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
            {t.title}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {t.desc}
          </p>
        </div>

        <div 
          className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[10px] p-4 flex flex-col justify-end transition-all duration-700 overflow-hidden hover:brightness-110 cursor-none"
          style={{ backgroundColor: primaryColor.hex }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          onClick={() => copyToClipboard(primaryColor.hex)}
        >
          <div 
            className="absolute bg-white text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap"
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {copied === primaryColor.hex ? 'Copied' : 'Copy hex'}
          </div>

          <div className="flex flex-col items-start gap-12">
            <div className="text-white font-sans text-[10px] leading-loose uppercase tracking-[0.15em] font-medium space-y-1 transition-all">
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">NAME:</span> <span className="font-bold">{primaryColor.name}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">CMYK:</span> <span className="font-bold">{primaryColor.cmyk}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">RGB:</span> <span className="font-bold">{primaryColor.rgb}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">HEX:</span> <span className="font-bold">{primaryColor.hex}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color Scale Row */}
        <div className="mt-12">
          <div className="flex w-full h-24 rounded-[10px] overflow-hidden border border-white/5">
            {TOPVIEW_BLUE_SCALE.map((color) => (
              <div 
                key={color.name}
                className="flex-1 group relative cursor-pointer hover:z-10"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="px-3 py-1.5 bg-white text-black text-[9px] font-bold rounded-full shadow-2xl uppercase tracking-widest whitespace-nowrap">
                    {copied === color.hex ? 'Copied' : 'Copy'}
                  </div>
                </div>
                {/* Tooltip on top */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-white text-black text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 border border-black/5">
                  <span className="uppercase tracking-wider font-sans">{color.name}</span>
                  <span className="font-mono text-neutral-400">{color.hex}</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Exhibition Section */}
      <section className="fade-in pt-12" style={{ animationDelay: '0.15s' }}>
        <div className="flex gap-8 overflow-x-auto pb-12 -mx-4 px-4 no-scrollbar items-start">
          {exhibitionItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex-shrink-0 ${item.w} bg-neutral-900 cursor-zoom-in`}
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={`/color/${item.id}.png`} 
                alt={`Color Case ${item.id}`} 
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. 辅助色 */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col gap-4 mb-16">
            <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.supporting}</h2>
            <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
                {t.supportingDesc}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {supportingColors.map((color) => (
                <div key={color.name} className="group space-y-8">
                    <div 
                        className={`aspect-[4/2] rounded-[10px] border border-white/5 transition-all duration-500 group-hover:brightness-110 ${color.name === 'White' ? 'bg-white' : ''}`}
                        style={{ background: color.css || color.hex }}
                    ></div>
                    <div className="text-[10px] font-sans uppercase tracking-widest leading-loose text-white/40 transition-all">
                        <div className="flex gap-8 py-1">
                            <span className="w-12 text-white/40">Name:</span> <span className="text-white font-bold">{color.name}</span>
                        </div>
                        {color.name.includes('Gradient') ? (
                          <>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">From:</span> <span className="text-white font-bold">{color.from}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">To:</span> <span className="text-white font-bold">{color.to}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">Type:</span> <span className="text-white font-bold">{color.type}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">Angle:</span> <span className="text-white font-bold">{color.angle}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">CMYK:</span> <span className="text-white font-bold">{color.cmyk}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">RGB:</span> <span className="text-white font-bold">{color.rgb}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">HEX:</span> <span className="text-white font-bold">{color.hex}</span>
                            </div>
                            <div className="flex gap-8 py-1">
                                <span className="w-12 text-white/40">PMS:</span> <span className="text-white font-bold">{color.pms}</span>
                            </div>
                          </>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 3. Accessibility */}
      <section className="fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.accessibility}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.accessibilityDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Blue Background */}
            <div className="bg-[#3643FF] aspect-square rounded-[10px] flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-outfit font-medium text-white relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">Pass, AAA (7.08:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            {/* Black Background */}
            <div className="bg-[#000000] aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-outfit font-medium text-[#5E69FF] relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">Pass, AA (4.94:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,105,255,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            {/* White Background */}
            <div className="bg-white aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-outfit font-medium text-[#3643FF] relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-black/40 relative z-10 font-bold">Pass, AA (6.16:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(54,67,255,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
        </div>

        {/* Dark Background Contrast Subsection */}
        <div className="mt-32">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-10 font-sans">{language === 'zh' ? '暗色背景对比度 (WCAG)' : 'Dark Background Contrast (WCAG)'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: '8', ratio: '3.13:1', color: 'var(--topview-blue)', status: 'Fail (Small Text)', name: 'Blue 600' },
              { id: '7', ratio: '4.94:1', color: '#3643FF', status: 'Pass (AA)', name: 'Blue 500' },
              { id: '9', ratio: '6.38:1', color: '#5E69FF', status: 'Pass (AA)', name: 'Blue 400' },
              { id: '4', ratio: '8.42:1', color: '#7881FF', status: 'Pass (AAA)', name: 'Blue 300' }
            ].map((item) => {
              const isFail = item.status.includes('Fail');
              return (
                <div 
                  key={item.id} 
                  className="bg-black aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden"
                >
                  <div className="relative">
                    <span 
                      className="text-[64px] font-outfit font-medium transition-all duration-700 relative z-10"
                      style={{ color: item.color }}
                    >
                      Text
                    </span>
                    {isFail && (
                      <div className="absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-white/20 rotate-[-45deg] z-20 pointer-events-none"></div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-1.5 relative z-10">
                    <span className={`text-[10px] font-sans tracking-widest uppercase relative z-10 font-bold ${isFail ? 'text-white/20' : 'text-white/60'}`}>
                      {item.status.toUpperCase()} ({item.ratio})
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-heading font-bold text-white tracking-tight whitespace-nowrap">{item.name}</span>
                        <span className="text-[10px] font-mono text-white/50">{item.color}</span>
                    </div>
                  </div>
                  
                  <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Related product design sections */}
      <section className="fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.related}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white font-normal">
            {language === 'zh' ? '将我们的颜色系统集成到产品界面的其他资源和指南。' : 'Additional resources and guidelines for integrating our color system into product interfaces.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Color Tokens Card */}
            <div className="group relative bg-neutral-900 border border-white/5 rounded-[10px] p-8 transition-all duration-500 overflow-hidden hover:bg-neutral-800">
                <div className="absolute top-6 right-6 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full z-10">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{t.comingSoon}</span>
                </div>
                <div className="aspect-video bg-[#111111] border border-white/5 rounded-[10px] mb-8 flex items-center justify-center p-12">
                    <div className="flex items-center gap-6 transition-transform group-hover:scale-105">
                        <div className="w-20 h-20 bg-[#3643FF] rounded-sm shadow-2xl"></div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-mono text-neutral-500">text/brand</p>
                            <p className="text-[10px] font-mono text-neutral-500">base/topview-blue/10</p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-8 h-4 bg-white/10 rounded-sm"></div>
                                <span className="text-[10px] font-mono text-neutral-400">1.96:1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className="text-xl font-bold mb-2 font-sans group-hover:text-[#3643FF] transition-colors text-white">{t.colorTokens}</h4>
                <p className="text-sm text-neutral-500 font-sans">{t.colorTokensDesc}</p>
            </div>
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
              src={`/color/${exhibitionItems[selectedIndex].id}.png`} 
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

export default Colors;
