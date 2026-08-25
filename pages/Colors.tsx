import React, { useState } from 'react';
import {
  TOPVIEW_GRADIENTS,
  TOPVIEW_PURPLE_SCALE,
  TOPVIEW_SUPPORTING_COLORS,
} from '../constants';
import { Language, translations } from '../translations';
import { ColorSwatch } from '../types';

interface ColorsProps {
  language: Language;
}

const Colors: React.FC<ColorsProps> = ({ language }) => {
  const t = translations[language].colors;
  const [copied, setCopied] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const primaryColor = {
    name: 'TOPVIEW PURPLE',
    cmyk: '54 / 88 / 0 / 0',
    rgb: '115 / 29 / 251',
    hex: '#731DFB',
    pms: '—'
  };

  const renderScale = (scale: ColorSwatch[]) => (
    <div className="flex w-full h-24 rounded-[10px] overflow-hidden border border-white/5">
      {scale.map((color) => (
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
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-white text-black text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 border border-black/5">
            <span className="uppercase tracking-wider font-sans">{color.name}</span>
            <span className="font-mono text-neutral-400">{color.hex}</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-full text-white space-y-48 pb-40 overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
        <h1 className="catalog-title text-[64px] md:text-[88px] lg:text-[112px] leading-none tracking-tight">
          {t.title}
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          {t.desc}
        </p>
      </div>

      <section id="colors-purple" className="scroll-mt-8">
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
            {t.purple}
          </h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.purpleDesc}
          </p>
        </div>

        <div
          className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[10px] p-4 flex flex-col justify-end overflow-hidden hover:brightness-110 cursor-none"
          style={{ backgroundColor: primaryColor.hex, transition: 'filter 0.7s ease' }}
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
              transform: 'translate(-50%, -50%)',
            }}
          >
            {copied === primaryColor.hex ? 'Copied' : 'Copy hex'}
          </div>

          <div className="flex flex-col items-start gap-12">
            <div className="text-white font-sans text-[10px] leading-loose uppercase tracking-[0.15em] font-medium space-y-1">
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

        <div className="mt-12">{renderScale(TOPVIEW_PURPLE_SCALE)}</div>
      </section>

      <section id="colors-supporting" className="fade-in scroll-mt-8" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.supporting}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.supportingDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TOPVIEW_SUPPORTING_COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => copyToClipboard(color.hex)}
              className="group space-y-8 text-left"
            >
              <div
                className="aspect-[4/2] rounded-[10px] border border-white/5 transition-all duration-500 group-hover:brightness-110"
                style={{ background: color.hex }}
              />
              <div className="text-[10px] font-sans uppercase tracking-widest leading-loose text-white/40">
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Name:</span> <span className="text-white font-bold">{color.name}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Rgb:</span> <span className="text-white font-bold">{color.rgb}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Hex:</span> <span className="text-white font-bold">{color.hex}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Use:</span>{' '}
                  <span className="text-white font-bold normal-case tracking-normal">{color.usage}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="colors-gradients" className="fade-in scroll-mt-8" style={{ animationDelay: '0.15s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.gradients}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.gradientsDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TOPVIEW_GRADIENTS.map((gradient) => (
            <button
              key={gradient.name}
              type="button"
              onClick={() => copyToClipboard(gradient.css)}
              className="group space-y-8 text-left"
            >
              <div
                className="aspect-[5/2] rounded-[10px] border border-white/5 transition-all duration-500 group-hover:brightness-110"
                style={{ background: gradient.css }}
              />
              <div className="text-[10px] font-sans uppercase tracking-widest leading-loose text-white/40">
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Name:</span> <span className="text-white font-bold">{gradient.name}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">From:</span> <span className="text-white font-bold">{gradient.from}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">To:</span> <span className="text-white font-bold">{gradient.to}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Type:</span> <span className="text-white font-bold">{gradient.type}</span>
                </div>
                <div className="flex gap-8 py-1">
                  <span className="w-12 text-white/40">Angle:</span> <span className="text-white font-bold">{gradient.angle}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Accessibility */}
      <section id="colors-accessibility" className="fade-in scroll-mt-8" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.accessibility}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.accessibilityDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Purple Background */}
            <div className="bg-[#731DFB] aspect-square rounded-[10px] flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-heading font-medium text-white relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">Pass, AAA (7.08:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            {/* Black Background */}
            <div className="bg-[#000000] aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-heading font-medium text-[#9452FF] relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">Pass, AA (4.91:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,105,255,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            {/* White Background */}
            <div className="bg-white aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
                <span className="text-[64px] font-heading font-medium text-[#731DFB] relative z-10 transition-transform duration-700">Text</span>
                <span className="text-[10px] font-sans tracking-widest uppercase text-black/40 relative z-10 font-bold">Pass, AA (6.16:1)</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(54,67,255,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
        </div>

        {/* Dark Background Contrast Subsection */}
        <div className="mt-32">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-10 font-sans">{language === 'zh' ? '暗色背景对比度 (WCAG)' : 'Dark Background Contrast (WCAG)'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: '8', ratio: '3.13:1', color: 'var(--topview-blue)', status: 'Fail (Small Text)', name: 'Purple 600' },
              { id: '7', ratio: '4.94:1', color: '#731DFB', status: 'Pass (AA)', name: 'Purple 500' },
              { id: '9', ratio: '4.91:1', color: '#9452FF', status: 'Pass (AA)', name: 'Purple 400' },
              { id: '4', ratio: '8.42:1', color: '#A873FF', status: 'Pass (AAA)', name: 'Purple 300' }
            ].map((item) => {
              const isFail = item.status.includes('Fail');
              const isRecommended = item.id === '4';
              return (
                <div 
                  key={item.id} 
                  className="bg-black aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden"
                >
                  <div className="relative">
                    <span 
                      className="text-[64px] font-heading font-medium transition-all duration-700 relative z-10"
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
                  
                  {isRecommended && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#731DFB] py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center z-20">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{t.bestPractice}</span>
                    </div>
                  )}
                  
                  <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incorrect Examples Section */}
        <div id="colors-incorrect" className="mt-48 scroll-mt-8">
          <div className="flex flex-col gap-4 mb-16">
            <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.incorrect}</h2>
            <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
              {t.incorrectDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Color Usage Card */}
            <div className="bg-white/5 rounded-[12px] p-8">
              <div className="bg-[#222222] rounded-[8px] aspect-video flex items-center justify-center p-8 mb-8 border border-white/5">
                <div className="flex gap-4">
                  {/* Correct */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-24 bg-[#731DFB] rounded-sm relative">
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#731DFB" strokeWidth="4">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Incorrect 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-24 bg-[#4E40F3] rounded-sm relative">
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Incorrect 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-24 bg-[#6255FF] rounded-sm relative">
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2 font-sans transition-colors">{language === 'zh' ? '不要替代品牌紫' : "Don't substitute Brand Purple"}</h4>
              <p className="text-sm text-white/40 font-sans leading-relaxed">{language === 'zh' ? '始终使用提供的 Topview Purple，除非有特定的 UI 或无障碍需求。' : 'Always use the provided Topview Purple unless you have a specific UI or accessibility need.'}</p>
            </div>

            {/* Gradient Usage Card */}
            <div className="bg-white/5 rounded-[12px] p-8">
              <div className="bg-[#222222] rounded-[8px] aspect-video flex items-center justify-center p-8 mb-8 border border-white/5">
                <div className="flex gap-4">
                  {/* Correct Gradient 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className="w-16 h-24 rounded-sm relative"
                      style={{ background: 'linear-gradient(180deg, #731DFB 0%, #A873FF 100%)' }}
                    >
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#731DFB" strokeWidth="4">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Correct Gradient 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className="w-16 h-24 rounded-sm relative"
                      style={{ background: 'linear-gradient(90deg, #A873FF 0.04%, #E2CCFF 99.93%)' }}
                    >
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#731DFB" strokeWidth="4">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Incorrect Gradient 1 */}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className="w-16 h-24 rounded-sm relative"
                      style={{ background: 'linear-gradient(83.305deg, rgb(30, 52, 255) 1.5249%, rgb(48, 213, 229) 44.341%, rgb(223, 224, 255) 68.597%, rgb(229, 59, 229) 97.781%)' }}
                    >
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Incorrect Gradient 2 */}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className="w-16 h-24 rounded-sm relative"
                      style={{ background: 'linear-gradient(90deg, #5943F5 11.11%, #89FCC1 47.91%, #BB5BFF 81.55%), linear-gradient(77deg, #1E34FF 1.52%, #30D5E5 44.34%, #DFE0FF 68.6%, #E53BE5 97.78%)' }}
                    >
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2 font-sans transition-colors">{language === 'zh' ? '避免浑浊或复杂的渐变' : "Don't make muddy gradients"}</h4>
              <p className="text-sm text-white/40 font-sans leading-relaxed">{language === 'zh' ? '渐变应保持明亮。如果使用渐变，请确保在起始色和结束色之间不会变成灰色或紫色。' : 'Gradients should be bright. If you are using gradients, make sure they do not turn muddy or grey in between.'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Colors;
