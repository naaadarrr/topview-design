
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Language, translations } from '../translations';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  onLogoClick?: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeId, 
  onNavigate, 
  onLogoClick,
  language,
  onLanguageChange
}) => {
  const t = translations[language].sidebar;

  const getLabel = (id: string) => {
    switch (id) {
      case 'logo': return t.logo;
      case 'colors': return t.colors;
      case 'typography': return t.typography;
      case 'motion': return t.motion;
      default: return id;
    }
  };

  return (
    <nav className="w-full lg:w-72 flex-shrink-0 lg:fixed lg:top-0 lg:left-0 lg:h-screen bg-transparent border-b lg:border-b-0 lg:border-r border-white/10 px-10 py-0 z-50 flex flex-col justify-between">
      <div>
        <div className="h-[72px] flex items-center cursor-pointer mb-0" onClick={onLogoClick || (() => onNavigate('logo'))}>
          <img src="/TopviewDesignLogo.svg" alt="TopView" className="h-10" />
        </div>
        
        <div className="h-[1px] w-full bg-white/10 mb-12 -mx-10 w-[calc(100%+80px)]"></div>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-3 font-heading">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-0 py-1 text-[24px] leading-[32px] transition-all duration-300 ${
                  activeId === item.id 
                    ? 'bg-gradient-to-r from-[#7881FF] to-[#C1C5FF] bg-clip-text text-transparent font-medium' 
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {getLabel(item.id)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="pb-12 pt-8 border-t border-white/5">
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
          <button 
            onClick={() => onLanguageChange('en')}
            className={`transition-colors hover:text-white ${language === 'en' ? 'text-white' : ''}`}
          >
            EN
          </button>
          <span className="w-[1px] h-3 bg-white/10"></span>
          <button 
            onClick={() => onLanguageChange('zh')}
            className={`transition-colors hover:text-white ${language === 'zh' ? 'text-white' : ''}`}
          >
            中文
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
