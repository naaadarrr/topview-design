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
            <div key={idx} className="bg-neutral-900 border border-white/5 rounded-[10px] p-8">
              <h4 className="text-xl font-bold mb-3 font-sans text-white uppercase tracking-wider">{p.title}</h4>
              <p className="text-sm text-neutral-500 font-sans leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="fade-in pt-20" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">{t.spec}</h2>
          <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60 mt-4 md:mt-10 font-normal">
            {t.techSpecs}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group relative bg-neutral-900 border border-white/5 rounded-[10px] p-8 transition-all duration-500 overflow-hidden hover:bg-neutral-800">
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
            <h4 className="text-xl font-bold mb-2 font-sans group-hover:text-[#3643FF] transition-colors text-white">{t.heroSpec}</h4>
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
    </div>
  );
};

export default Motion;
