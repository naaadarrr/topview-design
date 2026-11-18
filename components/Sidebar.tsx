import React from 'react';
import { JUHUO_NAV_ITEMS, NAV_ITEMS } from '../constants';
import { Language, translations } from '../translations';
import lockedSystem from '../contracts/locked-system.json';

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

  const c = translations[language].components;

  const getLabel = (id: string, fallback: string) => {
    switch (id) {
      case 'logo': return t.logo;
      case 'foundations': return t.foundations;
      case 'colors': return t.colors;
      case 'spacing': return t.spacing;
      case 'radius': return t.radius;
      case 'typography': return t.typography;
      case 'motion': return t.motion;
      case 'components': return t.components;
      case 'glass': return c.glass;
      case 'components-rules': return c.rules;
      case 'components-controls': return c.controls;
      case 'components-overlays': return c.overlays;
      case 'overlays-menu': return c.menu;
      case 'components-display': return c.display;
      case 'components-feedback': return c.feedback;
      case 'components-button': return c.buttons;
      case 'colors-layers': return translations[language].colors.layers;
      case 'juhuo-colors': return t.juhuoColors;
      default: {
        if (id.startsWith('components-rules/')) {
          const lockId = id.slice('components-rules/'.length);
          const lock = lockedSystem.locks.find((item) => item.id === lockId);
          if (lock) return lock.title[language] || lock.title.en;
        }
        return fallback;
      }
    }
  };

  return (
    <nav className="w-full h-full px-6 py-8 overflow-y-auto overflow-x-hidden overscroll-contain">
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const children = item.children ?? [];

          if (item.group) {
            const isGroupActive = children.some((member) => member.id === activeId);
            return (
              <div key={item.id} className="flex flex-col">
                <button
                  onClick={() => children[0] && onNavigate(children[0].id)}
                  className={`catalog-title w-full text-left px-3 py-2 rounded-lg text-[24px] leading-[32px] transition-colors ${
                    isGroupActive
                      ? 'text-white font-medium'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {getLabel(item.id, item.label)}
                </button>
                <div className="flex flex-col mt-0 mb-1 pl-3">
                  {children.map((member) => {
                    const isMemberActive = activeId === member.id;
                    const anchors = member.children ?? [];
                    return (
                      <div key={member.id} className="flex flex-col">
                        <button
                          onClick={() => onNavigate(member.id)}
                          className={`font-sans w-full text-left px-3 py-1 text-[16px] leading-[22px] transition-colors ${
                            isMemberActive
                              ? 'text-white'
                              : 'text-white/35 hover:text-white'
                          }`}
                        >
                          {getLabel(member.id, member.label)}
                        </button>
                        {isMemberActive && anchors.length > 0 && (
                          <div className="flex flex-col pl-3 mb-1">
                            {anchors.map((anchor) => (
                              <button
                                key={anchor.id}
                                onClick={() => onNavigate(member.id, anchor.id)}
                                className={`font-sans w-full text-left px-3 py-0 text-[13px] leading-[20px] transition-colors ${
                                  activeSubId === anchor.id
                                    ? 'text-white'
                                    : 'text-white/35 hover:text-white'
                                }`}
                              >
                                {getLabel(anchor.id, anchor.label)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

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
                    const grandChildren = child.children ?? [];
                    return (
                      <div key={child.id} className="flex flex-col">
                        <button
                          onClick={() => onNavigate(item.id, child.id)}
                          className={`font-sans w-full text-left px-3 py-1 text-[16px] leading-[22px] transition-colors ${
                            isChildActive
                              ? 'text-white'
                              : 'text-white/35 hover:text-white'
                          }`}
                        >
                          {getLabel(child.id, child.label)}
                        </button>
                        {grandChildren.length > 0 && (
                          <div className="flex flex-col pl-3 mb-1">
                            {grandChildren.map((grand) => {
                              const isGrandActive = activeSubId === grand.id;
                              return (
                                <button
                                  key={grand.id}
                                  onClick={() => onNavigate(item.id, grand.id)}
                                  className={`font-sans w-full text-left px-3 py-0 text-[13px] leading-[20px] transition-colors ${
                                    isGrandActive
                                      ? 'text-white'
                                      : 'text-white/35 hover:text-white'
                                  }`}
                                >
                                  {getLabel(grand.id, grand.label)}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
