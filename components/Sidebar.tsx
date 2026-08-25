import React from 'react';
import { JUHUO_NAV_ITEMS, NAV_ITEMS } from '../constants';
import { Language, translations } from '../translations';

type BrandLine = 'topview' | 'juhuo';

interface SidebarProps {
  activeId: string;
  activeSubId?: string | null;
  onNavigate: (id: string, subId?: string) => void;
  language: Language;
  brandLine?: BrandLine;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  activeSubId,
  onNavigate,
  language,
  brandLine = 'topview',
}) => {
  const t = translations[language].sidebar;
  const navItems = brandLine === 'juhuo' ? JUHUO_NAV_ITEMS : NAV_ITEMS;

  const getLabel = (id: string, fallback: string) => {
    switch (id) {
      case 'logo': return t.logo;
      case 'colors': return t.colors;
      case 'typography': return t.typography;
      case 'motion': return t.motion;
      case 'juhuo-colors': return t.juhuoColors;
      default: return fallback;
    }
  };

  return (
    <nav className="w-full h-full px-6 py-8 overflow-y-auto overflow-x-hidden overscroll-contain">
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const children = item.children ?? [];

          return (
            <div key={item.id} className="flex flex-col">
              <button
                onClick={() => onNavigate(item.id)}
                className={`catalog-title w-full text-left px-3 py-2 rounded-lg text-[24px] leading-[32px] transition-colors ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {getLabel(item.id, item.label)}
              </button>

              {isActive && children.length > 0 && (
                <div className="flex flex-col mt-0 mb-1 pl-3">
                  {children.map((child) => {
                    const isChildActive = activeSubId === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => onNavigate(item.id, child.id)}
                        className={`font-sans w-full text-left px-3 py-0 text-[16px] leading-[22px] transition-colors ${
                          isChildActive
                            ? 'text-white'
                            : 'text-white/35 hover:text-white'
                        }`}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
