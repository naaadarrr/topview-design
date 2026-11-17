import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageSquare, Pencil, Share2, Trash2 } from 'lucide-react';
import { Language, translations } from '../../translations';
import './overlays-specimens.css';
import './menu-specimens.css';

interface DropdownMenuProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

type MenuItem = { key: string; label: string; Icon: typeof Pencil; danger?: boolean };

const SELECT_OPTIONS = ['selectOptionA', 'selectOptionB', 'selectOptionC'] as const;
type SelectOption = (typeof SELECT_OPTIONS)[number];
type SelectLabels = Record<SelectOption | 'selectLabel', string>;

// ToolPanel SelectParameter (stacked, default variant) on BoardDropdownMenu, PANEL_OVERLAY_* (b0c5a29).
// Copied from the Controls specimen; values follow source where they differ.
const BoardSelect: React.FC<{ labels: SelectLabels; frozen?: 'default' | 'hover'; defaultOpen?: boolean }> = ({
  labels,
  frozen,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [closing, setClosing] = useState(false);
  const [value, setValue] = useState<SelectOption>('selectOptionA');
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusOnOpen = useRef(false);
  // The open-state specimen starts open; it only closes on outside click / Escape after the user opens it.
  const userOpened = useRef(false);

  const close = (refocus: boolean) => {
    setOpen(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(!reduced);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open || !userOpened.current) return;
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
    userOpened.current = true;
    setClosing(false);
    setOpen(true);
  };

  const moveFocus = (from: number, delta: number) => {
    const next = (from + delta + SELECT_OPTIONS.length) % SELECT_OPTIONS.length;
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="bsel-field">
      <label className="bsel-label">{labels.selectLabel}</label>
      <div className="bsel-anchor" ref={wrapRef}>
        <button
          ref={triggerRef}
          type="button"
          className={`bsel-trigger${frozen === 'hover' ? ' show-hover' : ''}`}
          data-state={open ? 'open' : 'closed'}
          aria-haspopup="menu"
          aria-expanded={open}
          tabIndex={frozen ? -1 : undefined}
          onClick={(event) => {
            if (frozen) return;
            if (open) close(false);
            else openMenu(event.detail === 0);
          }}
          onKeyDown={(event) => {
            if (frozen) return;
            if (event.key === 'ArrowDown' && !open) {
              event.preventDefault();
              openMenu(true);
            }
          }}
        >
          <span className="bsel-value">{labels[value]}</span>
          <ChevronDown className="bsel-chevron" aria-hidden="true" />
        </button>
        {open || closing ? (
          <div
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
                <button
                  key={option}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className={`bsel-item${option === value ? ' is-selected' : ''}`}
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
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Drama Studio CardMenu.tsx on ui/dropdown-menu.tsx (origin/develop b0c5a29).
const DropdownMenu: React.FC<DropdownMenuProps> = ({ language }) => {
  const t = translations[language].menu;
  const c = translations[language].controls;
  const selectLabels: SelectLabels = {
    selectLabel: c.selectLabel,
    selectOptionA: c.selectOptionA,
    selectOptionB: c.selectOptionB,
    selectOptionC: c.selectOptionC,
  };
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openedByKey = useRef(false);

  const groups: MenuItem[][] = [
    [
      { key: 'rename', label: t.rename, Icon: Pencil },
      { key: 'share', label: t.share, Icon: Share2 },
      { key: 'feedback', label: t.feedback, Icon: MessageSquare },
    ],
    [
      { key: 'delete', label: t.delete, Icon: Trash2, danger: true },
      { key: 'batchDelete', label: t.batchDelete, Icon: Trash2, danger: true },
    ],
  ];
  const flat = groups.flat();

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    if (openedByKey.current) itemRefs.current[0]?.focus();
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

  const moveFocus = (from: number, delta: number) => {
    const next = (from + delta + flat.length) % flat.length;
    itemRefs.current[next]?.focus();
  };

  let index = -1;
  return (
    <div className="overlaySpecimens menuSpecimens space-y-24">
      <p className="max-w-2xl text-[20px] leading-[26px] font-sans text-white font-normal">{t.pageLine}</p>

      <section>
        <SectionHeading title={t.menuTitle} />
        <div className="stage is-popover">
          <div className="menu-wrap" ref={wrapRef}>
            <button
              ref={triggerRef}
              type="button"
              className="overlay-trigger"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={(event) => {
                openedByKey.current = event.detail === 0;
                setOpen((value) => !value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' && !open) {
                  event.preventDefault();
                  openedByKey.current = true;
                  setOpen(true);
                }
              }}
            >
              {t.trigger}
            </button>
            {open ? (
              <div className="menu-content" role="menu" aria-label={t.trigger}>
                {groups.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {groupIndex > 0 ? <div className="menu-separator" role="separator" /> : null}
                    {group.map(({ key, label, Icon, danger }) => {
                      index += 1;
                      const i = index;
                      return (
                        <button
                          key={key}
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          type="button"
                          role="menuitem"
                          tabIndex={-1}
                          className={`menu-item${danger ? ' is-danger' : ''}`}
                          onMouseEnter={(event) => event.currentTarget.focus()}
                          onClick={() => close(true)}
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
                          <Icon size={14} className="menu-icon" aria-hidden="true" />
                          {label}
                        </button>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <p className="caption">{t.menuNote}</p>
      </section>

      <section id="menu-board-select">
        <SectionHeading title={c.selectTitle} />
        <div className="stage is-popover bsel-stage">
          <div className="bsel-row">
            <div>
              <div className="bsel-state">{c.stateDefault}</div>
              <BoardSelect labels={selectLabels} frozen="default" />
            </div>
            <div>
              <div className="bsel-state">{c.stateHover}</div>
              <BoardSelect labels={selectLabels} frozen="hover" />
            </div>
            <div>
              <div className="bsel-state">{c.stateOpen}</div>
              <BoardSelect labels={selectLabels} defaultOpen />
            </div>
          </div>
        </div>
        <p className="caption">{t.selectNote}</p>
      </section>

      <section>
        <SectionHeading title={t.pendingTitle} />
        <p className="caption">{t.pendingNote}</p>
      </section>
    </div>
  );
};

export default DropdownMenu;
