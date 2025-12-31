
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Language, translations } from '../translations';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeId, 
  onNavigate, 
  language
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
    <nav className="w-full lg:w-72 flex-shrink-0 lg:fixed lg:top-[80px] lg:left-0 lg:h-[calc(100vh-80px)] bg-transparent lg:border-r border-white/10 px-10 py-12 z-50 overflow-y-auto">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 font-heading">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-0 py-1 text-[24px] font-heading leading-[32px] ${
                activeId === item.id 
                  ? 'bg-gradient-to-r from-[#7881FF] to-[#C1C5FF] bg-clip-text text-transparent font-medium' 
                  : 'text-neutral-500'
              }`}
            >
              {getLabel(item.id)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
