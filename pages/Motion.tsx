import React from 'react';
import { Language, translations } from '../translations';

interface MotionProps {
  language: Language;
}

const Motion: React.FC<MotionProps> = ({ language }) => {
  const t = translations[language].motion;
  const principles = t.principles;

  return (
    <div className="max-w-full text-white space-y-32 pb-40">
      {/* Philosophy Section */}
      <section className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 w-full">
          <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
            {t.title}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {t.desc}
          </p>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-[#222222] border border-white/5 rounded-[10px] p-8">
              <h4 className="text-xl font-bold mb-3 font-sans text-white uppercase tracking-wider">{p.title}</h4>
              <p className="text-sm text-neutral-500 font-sans leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Incorrect Examples Section - Moved above Specs */}
      <section className="fade-in pt-20" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{translations[language].colors.incorrect}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 font-normal">
            {translations[language].colors.incorrectDesc}
          </p>
        </div>

        <div className="flex">
          {/* Unified Motion Principles Card */}
          <div className="group bg-white/5 hover:bg-white/10 transition-all duration-500 rounded-[12px] p-6 md:p-8 w-fit max-w-full overflow-hidden">
            <div className="bg-black rounded-[8px] flex items-center justify-center p-6 md:p-12 mb-8 border border-white/5 w-fit">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center">
                {/* Incorrect Example (item2.png) */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-64 md:w-80 lg:w-[400px] aspect-square rounded-sm relative">
                    <img src="/motion/item2.png" alt="Incorrect Motion" className="w-full h-full object-contain rounded-sm" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 z-10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Avoid Outlines</span>
                </div>
                {/* Correct Example (item1.png) */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-64 md:w-80 lg:w-[400px] aspect-square rounded-sm relative group/item">
                    <img src="/motion/item1.png" alt="Correct Motion" className="w-full h-full object-contain rounded-sm" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3643FF" strokeWidth="4">
                        <path d="M20 6L9 17L4 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Correct Alignment</span>
                </div>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 font-sans group-hover:text-white transition-colors">{language === 'zh' ? '模块 Hover Motion' : "Module Hover Motion"}</h4>
            <p className="max-w-2xl text-sm text-white/40 group-hover:text-white/60 font-sans leading-relaxed transition-colors">{language === 'zh' ? '避免添加复杂的描边动画或不符合视觉感知的装饰性抖动。' : 'Avoid complex stroke animations or decorative jitter that defies visual perception.'}</p>
          </div>
        </div>
      </section>

      {/* Related Specs Section */}
      <section className="fade-in pt-20" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.spec}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 mt-4 md:mt-10 font-normal">
            {t.techSpecs}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group relative bg-[#222222] border border-white/5 rounded-[10px] p-8 transition-all duration-500 overflow-hidden hover:bg-neutral-800">
            <div className="aspect-video bg-[#111111] border border-white/5 rounded-[10px] mb-8 flex items-center justify-center overflow-hidden">
              <video 
                src="/motion/hero-animation-preview.mp4" 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <h4 className="text-xl font-bold mb-2 font-sans group-hover:bg-gradient-to-r group-hover:from-[#7881FF] group-hover:to-[#C1C5FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-white">{t.heroSpec}</h4>
            <p className="text-sm text-neutral-500 font-sans mb-8">{t.heroDesc}</p>
            
            <button 
              onClick={() => window.open('/HERO_ANIMATION_SPEC.md', '_blank')}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm hover:bg-[#3643FF] hover:text-white transition-all duration-300"
            >
              {t.downloadSpec}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Pending Text */}
      <footer className="pt-24 pb-12 opacity-20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] font-sans">
          {language === 'zh' ? '更多详细规范 持续补充中...' : 'Additional technical specs pending...'}
        </p>
      </footer>
    </div>
  );
};

export default Motion;
