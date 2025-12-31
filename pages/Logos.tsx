
import React from 'react';
import { Language, translations } from '../translations';

interface LogosProps {
  language: Language;
}

const Logos: React.FC<LogosProps> = ({ language }) => {
  const t = translations[language].logos;
  
  const handleDownload = (logoPath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = logoPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    const logos = [
      { path: '/logo/Type=Horizontal black.svg', name: 'TopView-Horizontal-Black.svg' },
      { path: '/logo/Type=Horizontal white.svg', name: 'TopView-Horizontal-White.svg' },
      { path: '/logo/Type=Vertical black.svg', name: 'TopView-Vertical-Black.svg' },
      { path: '/logo/Type=Vertical white.svg', name: 'TopView-Vertical-White.svg' }
    ];

    logos.forEach((logo, index) => {
      setTimeout(() => {
        handleDownload(logo.path, logo.name);
      }, index * 200);
    });
  };

  const LogoCard = ({ path, name, dark = false }: { path: string, name: string, dark?: boolean }) => (
    <div className={`group relative ${dark ? 'bg-[#222222]' : 'bg-neutral-100'} rounded-[10px] p-24 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-inner`}>
      <img src={path} alt={name} className="h-16 relative z-10" />
      
      {/* Hover Download Button - Bottom Left, No Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-6 z-20">
        <button 
          onClick={() => handleDownload(path, name)}
          className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#3643FF] hover:text-white shadow-2xl"
        >
          Download SVG
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-full text-white space-y-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
          {t.title}
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          {t.desc}
        </p>
      </div>

      <div className="space-y-32 fade-in" style={{ animationDelay: '0.1s' }}>
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Horizontal</h3>
          <LogoCard path="/logo/Type=Horizontal black.svg" name="TopView-Horizontal-Black.svg" />
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Horizontal Reverse</h3>
          <LogoCard path="/logo/Type=Horizontal white.svg" name="TopView-Horizontal-White.svg" dark />
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Vertical</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LogoCard path="/logo/Type=Vertical black.svg" name="TopView-Vertical-Black.svg" />
            <LogoCard path="/logo/Type=Vertical white.svg" name="TopView-Vertical-White.svg" dark />
          </div>
        </section>

        {/* Download Section */}
        <section className="pb-24">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Download All Assets</h3>
          <div className="flex flex-col items-start gap-6">
            <button 
              onClick={handleDownloadAll}
              className="px-12 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#3643FF] hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              {t.downloadAll}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Logos;
