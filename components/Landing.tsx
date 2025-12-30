
import React from 'react';
import { Language, translations } from '../translations';

interface LandingProps {
  onSelect: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelect, language, onLanguageChange }) => {
  const t = translations[language].landing;
  const menuItems = [
    { id: 'logo', label: t.logo },
    { id: 'colors', label: t.colors },
    { id: 'typography', label: t.typography },
    { id: 'motion', label: t.motion },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans fade-in">
      {/* Top Header */}
      <header className="px-8 py-6 flex justify-between items-center relative">
        <div className="flex items-center">
           <img src="/TopviewDesignLogo.svg" alt="TopView.AI" className="h-10 invert" />
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 md:block hidden">
          <span className="text-[11px] font-bold uppercase tracking-widest text-black/40">{t.brandGuidelines}</span>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-black/40">
          <button 
            onClick={() => onLanguageChange('en')}
            className={`transition-colors hover:text-black ${language === 'en' ? 'text-black' : ''}`}
          >
            EN
          </button>
          <span className="w-[1px] h-3 bg-black/10"></span>
          <button 
            onClick={() => onLanguageChange('zh')}
            className={`transition-colors hover:text-black ${language === 'zh' ? 'text-black' : ''}`}
          >
            中文
          </button>
        </div>
      </header>

      {/* Main Catalog Navigation */}
      <main className="flex-1 flex flex-col">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex-1 group relative w-full flex items-center px-8 transition-colors duration-500 hover:bg-black/5 cursor-pointer border-b border-black/5 last:border-0"
          >
            <div className="py-4">
                <h2 className="text-[80px] md:text-[140px] font-heading leading-[1.1] tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {item.label}
                </h2>
            </div>
            
            {/* Hover arrow indicator */}
            <div className="absolute right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.2">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};

export default Landing;
