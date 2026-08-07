import React from 'react';
import { Language, translations } from '../translations';

interface LandingProps {
  onSelect: (id: string) => void;
  language: Language;
  isExiting?: boolean;
}

const Landing: React.FC<LandingProps> = ({ onSelect, language, isExiting }) => {
  const t = translations[language].landing;
  const menuItems = [
    { id: 'logo', label: t.logo },
    { id: 'colors', label: t.colors },
    { id: 'typography', label: t.typography },
    { id: 'motion', label: t.motion },
  ];

  return (
    <div className="h-screen bg-white text-black flex flex-col font-sans overflow-hidden">
      <header className="h-[80px] px-10 flex items-center relative flex-shrink-0 border-b border-black/5">
        <div className="flex items-center">
          <img src="/logo/Topview_Logo_New_RGB/SVG/Horizontal_Black.svg" alt="TopView.AI" className="h-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex-1 group relative w-full flex items-center px-10 transition-all hover:bg-black/[0.02] active:scale-[0.995] cursor-pointer border-b border-black/5 last:border-0 origin-center ${
              isExiting
                ? '-translate-y-8 opacity-0 duration-[400ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]'
                : 'duration-300'
            }`}
            style={isExiting ? { transitionDelay: `${index * 30}ms` } : undefined}
          >
            <div className="w-full flex justify-between items-center">
              <h2 className="catalog-title text-[64px] md:text-[88px] lg:text-[112px] leading-none tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {item.label}
              </h2>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 mr-10 shrink-0">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.2">
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};

export default Landing;
