import React from 'react';
import { Language, translations } from '../translations';
import { isHiddenSection } from '../constants';

interface LandingProps {
  onSelect: (id: string) => void;
  language: Language;
  isExiting?: boolean;
  /** Soft staggered reveal while splash curtain is rising */
  isEnteringFromSplash?: boolean;
}

const Landing: React.FC<LandingProps> = ({
  onSelect,
  language,
  isExiting,
  isEnteringFromSplash,
}) => {
  const t = translations[language].landing;
  const menuItems = [
    { id: 'logo', label: t.logo },
    // Foundations groups Color, Spacing, Radius, and Typography; it opens Color.
    { id: 'colors', label: t.foundations },
    { id: 'motion', label: t.motion },
    { id: 'components', label: t.components },
  ].filter((item) => !isHiddenSection(item.id)); // HIDDEN_SECTIONS in constants.tsx

  return (
    <div className="h-screen bg-white text-black flex flex-col font-sans overflow-hidden">
      <header className="h-[80px] px-10 flex items-center relative flex-shrink-0 border-b-2 border-black/35">
        <div className="flex items-center">
          <img src="/logo/Topview_Logo_New_RGB/SVG/Horizontal_Black.svg" alt="TopView.AI" className="h-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex-1 group relative w-full flex items-center px-10 cursor-pointer border-b-2 border-black/35 last:border-0 origin-center [container-type:size] transition-[transform,opacity,background-color] hover:bg-black/[0.02] active:scale-[0.995] ${
              isExiting
                ? '-translate-y-8 opacity-0 duration-[400ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]'
                : isEnteringFromSplash
                  ? 'opacity-0 animate-catalog-item-in'
                  : 'duration-300'
            }`}
            style={
              isExiting
                ? { transitionDelay: `${index * 30}ms` }
                : isEnteringFromSplash
                  ? {
                      animationDelay: `${120 + index * 70}ms`,
                      animationFillMode: 'forwards',
                    }
                  : undefined
            }
          >
            <div className="w-full flex justify-between items-center">
              <h2 className="catalog-title text-[min(52cqh,15vw)] leading-none tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {item.label}
              </h2>
              <div className="opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 transform translate-x-4 group-hover:translate-x-0 mr-10 shrink-0">
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
