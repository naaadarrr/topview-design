import React, { useEffect, useRef, useState } from 'react';
import { Language, translations } from '../../translations';
import './overlays-specimens.css';
import './menu-specimens.css';

interface DropdownMenuProps {
  language: Language;
}

const MENU_TRIGGER_CLASS = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-white/20 text-white hover:bg-white/5 active:bg-white/10 focus-visible:ring-white px-4 py-2.5 text-[14px] rounded-[8px]";

const SELECT_OPTIONS = ['selectOptionA', 'selectOptionB', 'selectOptionC', 'selectDelete'] as const;
type SelectOption = (typeof SELECT_OPTIONS)[number];
type SelectLabels = Record<SelectOption | 'selectLabel', string>;

// ToolPanel SelectParameter (stacked, default variant) on BoardDropdownMenu, PANEL_OVERLAY_* (b0c5a29).
// Copied from the Controls specimen; values follow source where they differ.
const BoardSelect: React.FC<{ labels: SelectLabels; triggerLabel: string }> = ({ labels, triggerLabel }) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [value, setValue] = useState<SelectOption>('selectOptionA');
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusOnOpen = useRef(false);

  const close = (refocus: boolean) => {
    setOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(!reduced);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    if (focusOnOpen.current) itemRefs.current[SELECT_OPTIONS.indexOf(value)]?.focus();
    const onPointer = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) close(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const openMenu = (byKey: boolean) => {
    focusOnOpen.current = byKey;
    setClosing(false);
    setOpen(true);
  };

  const moveFocus = (from: number, delta: number) => {
    const next = (from + delta + SELECT_OPTIONS.length) % SELECT_OPTIONS.length;
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="bsel-anchor" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        id="menu-new-trigger"
        className={MENU_TRIGGER_CLASS}
        aria-controls="menu-new-content"
        data-state={open ? 'open' : 'closed'}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          if (open) close(false);
          else openMenu(event.detail === 0);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            openMenu(true);
          }
        }}
      >
        {triggerLabel}
      </button>
      {open || closing ? (
        <div
          id="menu-new-content"
          className="bsel-menu"
          role="menu"
          aria-label={labels.selectLabel}
          data-state={open ? 'open' : 'closed'}
          onAnimationEnd={() => {
            if (!open) setClosing(false);
          }}
        >
          <span className="bsel-menu-edge" aria-hidden />
          <div className="bsel-menu-body">
            {SELECT_OPTIONS.map((option, i) => (
              <React.Fragment key={option}>
                {option === 'selectDelete' ? <div className="menu-separator" role="separator" /> : null}
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className={`bsel-item${option === 'selectDelete' ? ' is-danger' : ''}${option === value ? ' is-selected' : ''}`}
                  onMouseEnter={(event) => event.currentTarget.focus()}
                  onClick={() => {
                    setValue(option);
                    close(true);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      moveFocus(i, 1);
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault();
                      moveFocus(i, -1);
                    }
                  }}
                >
                  <span className="bsel-item-text">{labels[option]}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ language }) => {
  const t = translations[language].menu;
  const c = translations[language].controls;
  const selectLabels: SelectLabels = {
    selectLabel: c.selectLabel,
    selectOptionA: c.selectOptionA,
    selectOptionB: c.selectOptionB,
    selectOptionC: c.selectOptionC,
    selectDelete: t.delete,
  };

  return (
    <div className="overlaySpecimens menuSpecimens">
      <div className="stage is-popover">
        <BoardSelect labels={selectLabels} triggerLabel={t.trigger} />
      </div>
    </div>
  );
};

export default DropdownMenu;
