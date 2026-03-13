import React, { useState } from 'react';
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
  const tc = translations[language].components;
  const [expandedItems, setExpandedItems] = useState<string[]>(['components']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getLabel = (id: string) => {
    switch (id) {
      case 'logo': return t.logo;
      case 'colors': return t.colors;
      case 'typography': return t.typography;
      case 'motion': return t.motion;
      case 'components': return t.components;
      case 'button': return tc.button;
      default: return id;
    }
  };

  return (
    <nav className="w-full lg:w-72 flex-shrink-0 lg:fixed lg:top-[80px] lg:left-0 lg:h-[calc(100vh-80px)] bg-transparent lg:border-r border-white/10 px-10 py-12 z-50 overflow-y-auto">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 font-heading">
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className="space-y-2">
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`w-full text-left px-0 py-1 text-[24px] font-heading leading-[32px] flex justify-between items-center transition-all ${
                  activeId === item.id || (item.children && item.children.some(child => child.id === activeId))
                    ? 'bg-gradient-to-r from-[#7881FF] to-[#C1C5FF] bg-clip-text text-transparent font-medium' 
                    : 'text-neutral-500 hover:text-white transition-colors'
                }`}
              >
                {getLabel(item.id)}
                {item.children && (
                  <svg 
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                    className={`transition-transform duration-300 ${expandedItems.includes(item.id) ? 'rotate-180' : ''} ${activeId === item.id || (item.children && item.children.some(child => child.id === activeId)) ? 'stroke-[#7881FF]' : 'stroke-neutral-500'}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </button>
              
              {item.children && expandedItems.includes(item.id) && (
                <div className="flex flex-col gap-2 pl-4 border-l border-white/5 ml-1 mt-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id)}
                      className={`w-full text-left py-1 text-[16px] font-sans tracking-wide ${
                        activeId === child.id 
                          ? 'text-[#7881FF] font-semibold' 
                          : 'text-neutral-500 hover:text-white transition-colors'
                      }`}
                    >
                      {getLabel(child.id)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
