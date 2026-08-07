import React from 'react';
import { JUHUO_NAV_ITEMS, NAV_ITEMS } from '../constants';
import { Language, translations } from '../translations';

type BrandLine = 'topview' | 'juhuo';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  language: Language;
  brandLine?: BrandLine;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  onNavigate,
  language,
  brandLine = 'topview',
}) => {
  const t = translations[language].sidebar;
  const navItems = brandLine === 'juhuo' ? JUHUO_NAV_ITEMS : NAV_ITEMS;

  const getLabel = (id: string) => {
    switch (id) {
      case 'logo': return t.logo;
      case 'colors': return t.colors;
      case 'typography': return t.typography;
      case 'motion': return t.motion;
      case 'juhuo-colors': return t.juhuoColors;
      default: return id;
    }
  };

  return (
    <nav className="w-full h-full px-6 py-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`catalog-title w-full text-left px-3 py-2 rounded-lg text-[24px] leading-[32px] transition-colors ${
                activeId === item.id
                  ? 'text-white font-medium'
                  : 'text-neutral-500 hover:text-white'
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
