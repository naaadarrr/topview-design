import React, { useState } from 'react';
import { JUHUO_FLAME_SCALE, JUHUO_GRADIENTS, JUHUO_PRIMARY } from '../constants/juhuoColors';
import { Language, translations } from '../translations';

interface JuhuoColorsProps {
  language: Language;
}

const JuhuoColors: React.FC<JuhuoColorsProps> = ({ language }) => {
  const t = translations[language].juhuoColors;
  const [copied, setCopied] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const supportingColors = [
    { name: 'Black', cmyk: '0/0/0/100', rgb: '0/0/0', hex: '#000000', pms: 'Black C' },
    { name: 'White', cmyk: '0/0/0/0', rgb: '255/255/255', hex: '#FFFFFF', pms: 'Bright White C' },
    JUHUO_GRADIENTS.brand,
    JUHUO_GRADIENTS.fill,
    JUHUO_GRADIENTS.text,
  ];

  return (
    <div className="max-w-full text-white space-y-48 pb-40 overflow-x-visible">
      {/* Brand identity */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 w-full">
          <div className="flex flex-col gap-6">
            <img
              src="/juhuo/logo.png"
              alt="Juhuo"
              className="h-16 w-16 rounded-2xl object-contain bg-black"
            />
            <h1 className="catalog-title text-[64px] md:text-[88px] lg:text-[112px] leading-none tracking-tight">
              {t.title}
            </h1>
          </div>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {t.desc}
          </p>
        </div>

        {/* Primary swatch */}
        <div
          className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[10px] p-4 flex flex-col justify-end overflow-hidden hover:brightness-110 cursor-none"
          style={{ backgroundColor: JUHUO_PRIMARY.hex, transition: 'filter 0.7s ease' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          onClick={() => copyToClipboard(JUHUO_PRIMARY.hex)}
        >
          <div
            className="absolute bg-white text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {copied === JUHUO_PRIMARY.hex ? 'Copied' : 'Copy hex'}
          </div>

          <div className="flex flex-col items-start gap-12">
            <div className="text-white font-sans text-[10px] leading-loose uppercase tracking-[0.15em] font-medium space-y-1">
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">NAME:</span>{' '}
                <span className="font-bold">{JUHUO_PRIMARY.name}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">CMYK:</span>{' '}
                <span className="font-bold">{JUHUO_PRIMARY.cmyk}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">RGB:</span>{' '}
                <span className="font-bold">{JUHUO_PRIMARY.rgb}</span>
              </div>
              <div className="flex gap-8">
                <span className="w-12 inline-block text-white/50">HEX:</span>{' '}
                <span className="font-bold">{JUHUO_PRIMARY.hex}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color scale */}
        <div className="mt-12">
          <div className="flex w-full rounded-[10px] overflow-hidden border border-white/5">
            {JUHUO_FLAME_SCALE.map((color) => {
              const labelW =
                (color.wcagWhite ?? 0) >= 7
                  ? 'AAA'
                  : (color.wcagWhite ?? 0) >= 4.5
                    ? 'AA'
                    : (color.wcagWhite ?? 0) >= 3
                      ? 'AA*'
                      : '—';
              const labelB =
                (color.wcagBlack ?? 0) >= 7
                  ? 'AAA'
                  : (color.wcagBlack ?? 0) >= 4.5
                    ? 'AA'
                    : (color.wcagBlack ?? 0) >= 3
                      ? 'AA*'
                      : '—';
              const shortName = color.name.replace('Flame ', 'flame-');
              return (
                <div
                  key={color.name}
                  className="flex-1 group relative cursor-pointer hover:z-10 flex flex-col justify-between py-3 px-1.5"
                  style={{ backgroundColor: color.hex, minHeight: '120px' }}
                  onClick={() => copyToClipboard(color.hex)}
                >
                  <div className="flex flex-col items-end gap-0.5 text-white">
                    <span className="text-[8px] font-bold leading-none opacity-70">{labelW}</span>
                    <span className="text-[9px] font-mono font-bold leading-none">
                      {color.wcagWhite?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-end justify-start px-0.5">
                    <span className="text-[8px] font-mono text-white/50 leading-none">{shortName}</span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 text-black">
                    <span className="text-[8px] font-bold leading-none opacity-70">{labelB}</span>
                    <span className="text-[9px] font-mono font-bold leading-none">
                      {color.wcagBlack?.toFixed(2)}
                    </span>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-white text-black text-[10px] font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 border border-black/5 z-30">
                    <span className="uppercase tracking-wider font-sans">{color.name}</span>
                    <span className="font-mono text-neutral-400">{color.hex}</span>
                    <span className="font-mono text-neutral-500 text-[9px]">
                      W {color.wcagWhite?.toFixed(2)}:1 · B {color.wcagBlack?.toFixed(2)}:1
                    </span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <div className="px-3 py-1.5 bg-white text-black text-[9px] font-bold rounded-full shadow-2xl uppercase tracking-widest whitespace-nowrap">
                      {copied === color.hex ? 'Copied' : 'Copy'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] text-white/20 font-sans">
            W = vs white · B = vs black · AA* = AA large text only
          </p>
        </div>
      </section>

      {/* Supporting colors & gradients */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
            {t.supporting}
          </h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.supportingDesc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {supportingColors.map((color) => {
            const isGradient = 'css' in color && color.css;
            return (
              <div key={color.name} className="group space-y-8">
                <div
                  className={`aspect-[4/2] rounded-[10px] transition-all duration-500 group-hover:brightness-110 ${
                    isGradient ? 'overflow-hidden' : 'border border-white/5'
                  } ${color.name === 'White' ? 'bg-white' : ''}`}
                  style={{ background: isGradient ? color.css : color.hex }}
                />
                <div className="text-[10px] font-sans uppercase tracking-widest leading-loose text-white/40 transition-all">
                  <div className="flex gap-8 py-1">
                    <span className="w-12 text-white/40">Name:</span>{' '}
                    <span className="text-white font-bold">{color.name}</span>
                  </div>
                  {isGradient ? (
                    <>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">From:</span>{' '}
                        <span className="text-white font-bold">{color.from}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">To:</span>{' '}
                        <span className="text-white font-bold">{color.to}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">Type:</span>{' '}
                        <span className="text-white font-bold">{color.type}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">Angle:</span>{' '}
                        <span className="text-white font-bold">{color.angle}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">CMYK:</span>{' '}
                        <span className="text-white font-bold">{color.cmyk}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">RGB:</span>{' '}
                        <span className="text-white font-bold">{color.rgb}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">HEX:</span>{' '}
                        <span className="text-white font-bold">{color.hex}</span>
                      </div>
                      <div className="flex gap-8 py-1">
                        <span className="w-12 text-white/40">PMS:</span>{' '}
                        <span className="text-white font-bold">{color.pms}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accent Explorations */}
      <section className="fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
            {language === 'zh' ? '记忆色探索' : 'Memory Accents Exploration'}
          </h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {language === 'zh'
              ? '在火焰主色基础上引入冷色或生长色对撞，提升品牌记忆点与科技/增长感。'
              : 'Introducing cold or growth color collisions to the flame primary color to enhance brand memory and tech/growth feel.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Cyan Direction */}
          <div className="space-y-8 p-8 rounded-[12px] bg-white/5 border border-white/5">
            <div>
              <h3 className="text-2xl font-heading mb-2">Direction A: Electric Cyan</h3>
              <p className="text-sm text-white/60">科技、能量、冷暖对撞 (Tech, Energy)</p>
            </div>
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-[8px] p-4 flex flex-col justify-end" style={{ background: JUHUO_GRADIENTS.cyanSpark.css }}>
                 <span className="text-black font-bold text-sm">Cyan Spark</span>
                 <span className="text-black/60 font-mono text-xs">Gradient</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E83028' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#E83028</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF7E47' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FF7E47</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD18E' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FFD18E</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#00E5FF' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#00E5FF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lime Direction */}
          <div className="space-y-8 p-8 rounded-[12px] bg-white/5 border border-white/5">
            <div>
              <h3 className="text-2xl font-heading mb-2">Direction B: Energy Lime</h3>
              <p className="text-sm text-white/60">增长、流量、新鲜感 (Growth, Viral)</p>
            </div>
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-[8px] p-4 flex flex-col justify-end" style={{ background: JUHUO_GRADIENTS.limeEnergy.css }}>
                 <span className="text-black font-bold text-sm">Lime Energy</span>
                 <span className="text-black/60 font-mono text-xs">Gradient</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E83028' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#E83028</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF7E47' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FF7E47</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD18E' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FFD18E</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B6FF2E' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#B6FF2E</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pink Direction */}
          <div className="space-y-8 p-8 rounded-[12px] bg-white/5 border border-white/5">
            <div>
              <h3 className="text-2xl font-heading mb-2">Direction C: Neon Pink</h3>
              <p className="text-sm text-white/60">橘、红、粉渐变 (Orange → Red → Pink)</p>
            </div>
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-[8px] p-4 flex flex-col justify-end" style={{ background: JUHUO_GRADIENTS.pinkPulse.css }}>
                 <span className="text-white font-bold text-sm">Pink Pulse</span>
                 <span className="text-white/70 font-mono text-xs">Gradient</span>
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD18E' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FFD18E</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF7E47' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FF7E47</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#E83028' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#E83028</span>
                </div>
                <div className="w-4 h-[1px] bg-white/10"></div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF2A6D' }}></div>
                  <span className="text-[10px] font-mono text-white/40">#FF2A6D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
            {t.accessibility}
          </h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {t.accessibilityDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-[#E83028] aspect-square rounded-[10px] flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <span className="text-[64px] font-heading font-medium text-white relative z-10 transition-transform duration-700">
              Text
            </span>
            <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">
              Pass, Large AA (4.30:1)
            </span>
          </div>
          <div className="bg-[#000000] aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <span className="text-[64px] font-heading font-medium text-[#FF7E47] relative z-10 transition-transform duration-700">
              Text
            </span>
            <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 relative z-10 font-bold">
              Pass, Large AA (8.33:1)
            </span>
          </div>
          <div className="bg-white aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden">
            <span className="text-[64px] font-heading font-medium text-[#E83028] relative z-10 transition-transform duration-700">
              Text
            </span>
            <span className="text-[10px] font-sans tracking-widest uppercase text-black/40 relative z-10 font-bold">
              Pass, AA (4.88:1)
            </span>
          </div>
        </div>

        <div className="mt-32">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-10 font-sans">
            {language === 'zh' ? '暗色背景对比度 (WCAG)' : 'Dark Background Contrast (WCAG)'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: '6', ratio: '3.72:1', color: '#C6281A', status: 'Pass (Large AA)', name: 'Flame 600' },
              { id: '5', ratio: '4.30:1', color: '#E83028', status: 'Pass (Large AA)', name: 'Flame 500' },
              { id: '4', ratio: '8.33:1', color: '#FF7E47', status: 'Pass (Large AA)', name: 'Flame 400' },
              { id: '3', ratio: '8.86:1', color: '#F09060', status: 'Pass (AA)', name: 'Flame 300', recommended: true },
            ].map((item) => {
              const isRecommended = item.recommended;
              return (
                <div
                  key={item.id}
                  className="bg-black aspect-square rounded-[10px] border border-white/5 flex flex-col items-center justify-center gap-6 relative group overflow-hidden"
                >
                  <span
                    className="text-[64px] font-heading font-medium transition-all duration-700 relative z-10"
                    style={{ color: item.color }}
                  >
                    Text
                  </span>
                  <div className="flex flex-col items-center gap-1.5 relative z-10">
                    <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 font-bold">
                      {item.status.toUpperCase()} ({item.ratio})
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-heading font-bold text-white tracking-tight whitespace-nowrap">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{item.color}</span>
                    </div>
                  </div>
                  {isRecommended && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#E83028] py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center z-20">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        {t.bestPractice}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage guidelines */}
        <div className="mt-48">
          <div className="flex flex-col gap-4 mb-16">
            <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
              {t.incorrect}
            </h2>
            <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
              {t.incorrectDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 rounded-[12px] p-8">
              <div className="bg-[#222222] rounded-[8px] aspect-video flex items-center justify-center p-8 mb-8 border border-white/5">
                <div className="flex gap-4">
                  <div className="w-16 h-24 bg-[#E83028] rounded-sm relative">
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E83028" strokeWidth="4">
                        <path d="M20 6L9 17L4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-16 h-24 bg-[#FF4500] rounded-sm relative">
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-16 h-24 bg-[#DC143C] rounded-sm relative">
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2 font-sans">{t.dontSubstitute}</h4>
              <p className="text-sm text-white/40 font-sans leading-relaxed">{t.dontSubstituteDesc}</p>
            </div>

            <div className="bg-white/5 rounded-[12px] p-8">
              <div className="bg-[#222222] rounded-[8px] aspect-video flex items-center justify-center p-8 mb-8 border border-white/5">
                <div className="flex gap-4">
                  <div
                    className="w-16 h-24 rounded-sm relative"
                    style={{ background: JUHUO_GRADIENTS.brand.css }}
                  >
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E83028" strokeWidth="4">
                        <path d="M20 6L9 17L4 12" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="w-16 h-24 rounded-sm relative"
                    style={{ background: 'linear-gradient(135deg, #FF0000 0%, #FFFF00 50%, #00FF00 100%)' }}
                  >
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2 font-sans">{t.dontMuddyGradients}</h4>
              <p className="text-sm text-white/40 font-sans leading-relaxed">{t.dontMuddyGradientsDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JuhuoColors;
