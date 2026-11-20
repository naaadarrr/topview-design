import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { CORE_COLORS, TOPVIEW_PURPLE_SCALE, TOPVIEW_SUPPORTING_COLORS } from '../../constants';
import { COLOR_ROLE_PRIMARY } from '../../constants/colorRoles';
import { Language, translations } from '../../translations';
import './status-badge-lab.css';

type WashId = 'purple' | 'gold' | 'hot' | 'new';

type Rgb = { r: number; g: number; b: number };

type Ink = {
  id: string;
  name: string;
  hex: string;
  rgb: Rgb;
};

type Slot = { inkId: string; fill: number; glow: number };

type Tune = {
  wash: WashId;
  purple: Slot;
  gold: Slot;
  hot: Slot;
  new: Slot;
};

const PANEL_WIDTH = 300;
const FILL_MAX = 40;
const GLOW_MAX = 100;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function parseHex(hex: string): Rgb | null {
  const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
  const body = match?.[1];
  if (!body) return null;
  return {
    r: Number.parseInt(body.slice(0, 2), 16),
    g: Number.parseInt(body.slice(2, 4), 16),
    b: Number.parseInt(body.slice(4, 6), 16),
  };
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function tryInk(id: string, name: string, hex: string): Ink | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  return { id, name, hex, rgb };
}

function isInk(value: Ink | null): value is Ink {
  return value !== null;
}

function scaleInk(name: string): Ink | null {
  const source = TOPVIEW_PURPLE_SCALE.find((color) => color.name === name);
  if (!source) return null;
  return tryInk(slug(source.name), source.name, source.hex);
}

function collectInks(): Ink[] {
  const brandSource = CORE_COLORS.find((color) => color.hex === COLOR_ROLE_PRIMARY);
  const brand = brandSource ? tryInk('brand', brandSource.name, brandSource.hex) : null;
  const lightPurple = scaleInk('Purple 300');
  const hot = tryInk('hot-red', 'HOT', '#EB0000');
  const fresh = tryInk('new-red', 'NEW', '#FF0000');
  const supporting = TOPVIEW_SUPPORTING_COLORS
    .filter((color) => color.hex.toLowerCase() !== '#c9f75e')
    .map((color) => tryInk(slug(color.name), color.name, color.hex));
  return [lightPurple, brand, hot, fresh, ...supporting].filter(isInk);
}

const INKS = collectInks();

const INITIAL: Tune = {
  wash: 'purple',
  purple: { inkId: 'purple-300', fill: 15, glow: 50 },
  gold: { inkId: 'enterprise-gold', fill: 15, glow: 50 },
  hot: { inkId: 'hot-red', fill: 15, glow: 50 },
  new: { inkId: 'new-red', fill: 15, glow: 50 },
};

const WASHES: WashId[] = ['purple', 'gold', 'hot', 'new'];

function slotFor(tune: Tune): Slot {
  switch (tune.wash) {
    case 'purple':
      return tune.purple;
    case 'gold':
      return tune.gold;
    case 'hot':
      return tune.hot;
    case 'new':
      return tune.new;
    default: {
      const _exhaustive: never = tune.wash;
      return _exhaustive;
    }
  }
}

function withSlot(tune: Tune, patch: Partial<Slot>): Tune {
  const next = { ...slotFor(tune), ...patch };
  switch (tune.wash) {
    case 'purple':
      return { ...tune, purple: next };
    case 'gold':
      return { ...tune, gold: next };
    case 'hot':
      return { ...tune, hot: next };
    case 'new':
      return { ...tune, new: next };
    default: {
      const _exhaustive: never = tune.wash;
      return _exhaustive;
    }
  }
}

function useWidePanel(): boolean {
  const query = '(min-width: 1024px)';
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setWide(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return wide;
}

function clampPos(pos: { x: number; y: number }): { x: number; y: number } {
  return {
    x: clamp(pos.x, 8, Math.max(8, window.innerWidth - PANEL_WIDTH - 8)),
    y: clamp(pos.y, 8, Math.max(8, window.innerHeight - 80)),
  };
}

function parseDraft(raw: string, min: number, max: number): number | null {
  const trimmed = raw.trim().replace(/%$/, '');
  if (!/^\d+$/.test(trimmed)) return null;
  return clamp(Number.parseInt(trimmed, 10), min, max);
}

/** Flat tint. Glow sits on the top inner edge, not an even 4px halo. */
function paint(ink: Ink, slot: Slot): React.CSSProperties {
  const { r, g, b } = ink.rgb;
  const fill = slot.fill / 100;
  const glow = slot.glow / 100;
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${fill})`,
    backgroundImage: 'none',
    color: ink.hex,
    boxShadow: `inset 0 1px 2px rgba(${r}, ${g}, ${b}, ${glow})`,
  };
}

function findInk(id: string): Ink | null {
  return INKS.find((item) => item.id === id) ?? null;
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
  onReset: () => void;
};

function NumericValue({ label, value, min, max, onChange, onReset }: SliderProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const clickTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);

  useEffect(() => {
    return () => {
      if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
    };
  }, []);

  function commit(raw: string) {
    const next = parseDraft(raw, min, max);
    if (next !== null) onChange(next);
    setEditing(false);
  }

  return (
    <span className="badge-debug-value-wrap">
      {editing ? (
        <input
          ref={inputRef}
          className="badge-debug-value-input"
          inputMode="numeric"
          aria-label={`${label} ${value}%`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commit(draft);
            }
            if (event.key === 'Escape') {
              event.preventDefault();
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="badge-debug-value"
          onClick={() => {
            if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
            clickTimer.current = window.setTimeout(() => {
              setDraft(String(value));
              setEditing(true);
              clickTimer.current = null;
            }, 180);
          }}
          onDoubleClick={() => {
            if (clickTimer.current !== null) window.clearTimeout(clickTimer.current);
            clickTimer.current = null;
            setEditing(false);
            onReset();
          }}
        >
          {value}
        </button>
      )}
      <span aria-hidden="true">%</span>
    </span>
  );
}

function Slider({ label, value, min, max, onChange, onReset }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const percent = ((value - min) / (max - min)) * 100;

  function read(clientX: number): number {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return value;
    const t = clamp((clientX - rect.left) / rect.width, 0, 1);
    return Math.round(min + t * (max - min));
  }

  function nudge(delta: number) {
    onChange(clamp(value + delta, min, max));
  }

  return (
    <div className="badge-debug-field">
      <div className="badge-debug-field-head">
        <span>{label}</span>
        <NumericValue
          label={label}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          onReset={onReset}
        />
      </div>
      <div
        ref={trackRef}
        className="badge-debug-track"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}%`}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          onChange(read(event.clientX));
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          onChange(read(event.clientX));
        }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 10 : 1;
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            nudge(step);
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            nudge(-step);
          } else if (event.key === 'Home') {
            event.preventDefault();
            onChange(min);
          } else if (event.key === 'End') {
            event.preventDefault();
            onChange(max);
          }
        }}
      >
        <span className="badge-debug-track-line" />
        <span className="badge-debug-track-fill" style={{ width: `${percent}%` }} />
        <span
          className="badge-debug-thumb"
          style={{ left: `${percent}%` }}
          onDoubleClick={(event) => {
            event.stopPropagation();
            onReset();
          }}
        />
      </div>
    </div>
  );
}

type PanelCopy = {
  title: string;
  recipe: string;
  ink: string;
  fill: string;
  glow: string;
  purple: string;
  gold: string;
  hot: string;
  fresh: string;
  reset: string;
  collapse: string;
  expand: string;
};

function StatusBadgePanel({
  copy,
  tune,
  ink,
  open,
  spinning,
  pos,
  onToggle,
  onReset,
  onPos,
  onWash,
  onInk,
  onFill,
  onGlow,
  onResetFill,
  onResetGlow,
  inline = false,
}: {
  copy: PanelCopy;
  tune: Tune;
  ink: Ink;
  open: boolean;
  spinning: boolean;
  pos: { x: number; y: number };
  onToggle: () => void;
  onReset: () => void;
  onPos: (next: { x: number; y: number }) => void;
  onWash: (wash: WashId) => void;
  onInk: (id: string) => void;
  onFill: (fill: number) => void;
  onGlow: (glow: number) => void;
  onResetFill: () => void;
  onResetGlow: () => void;
  inline?: boolean;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; x: number; y: number; origin: { x: number; y: number } } | null>(null);
  const [ready, setReady] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const slot = slotFor(tune);

  useEffect(() => {
    const first = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(first);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node || !open) return;
    const measure = () => setOverflowing(node.scrollHeight > node.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [open]);

  function focusInk(id: string) {
    const button = paletteRef.current?.querySelector<HTMLButtonElement>(`[data-ink="${CSS.escape(id)}"]`);
    button?.focus();
  }

  function moveInk(delta: number) {
    const index = INKS.findIndex((item) => item.id === ink.id);
    const next = INKS[(index + delta + INKS.length) % INKS.length];
    if (!next) return;
    onInk(next.id);
    focusInk(next.id);
  }

  const rootClass = [
    'badge-debug',
    inline ? 'is-inline' : '',
    ready ? 'is-ready' : '',
    open ? '' : 'is-collapsed',
  ].filter(Boolean).join(' ');

  const panel = (
    <div
      className={rootClass}
      role="region"
      aria-label={copy.title}
      style={inline ? undefined : { left: pos.x, top: pos.y }}
    >
      <div
        ref={headerRef}
        className="badge-debug-header"
        onPointerDown={(event) => {
          const target = event.target;
          if (!(target instanceof Element) || target.closest('button')) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin: pos };
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.id !== event.pointerId) return;
          onPos(clampPos({
            x: drag.origin.x + event.clientX - drag.x,
            y: drag.origin.y + event.clientY - drag.y,
          }));
        }}
        onPointerUp={(event) => {
          if (dragRef.current?.id === event.pointerId) dragRef.current = null;
        }}
      >
        <div className="badge-debug-title">{copy.title}</div>
        <button
          type="button"
          className={spinning ? 'badge-debug-icon badge-debug-reset is-spin' : 'badge-debug-icon badge-debug-reset'}
          aria-label={copy.reset}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onReset}
        >
          <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="badge-debug-icon"
          aria-label={open ? copy.collapse : copy.expand}
          aria-expanded={open}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onToggle}
        >
          <ChevronDown className="badge-debug-chevron" size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div className="badge-debug-body" inert={open ? undefined : true}>
        <div
          ref={scrollRef}
          className={overflowing ? 'badge-debug-scroll is-overflowing' : 'badge-debug-scroll'}
        >
          <section className="badge-debug-section">
            <div className="badge-debug-section-title">{copy.recipe}</div>
            <div className="badge-debug-fields">
              <div className="badge-debug-seg" role="radiogroup" aria-label={copy.recipe}>
                {WASHES.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={tune.wash === id}
                    onClick={() => onWash(id)}
                  >
                    {copy[id === 'new' ? 'fresh' : id]}
                  </button>
                ))}
              </div>
              <Slider
                label={copy.fill}
                value={slot.fill}
                min={0}
                max={FILL_MAX}
                onChange={onFill}
                onReset={onResetFill}
              />
              <Slider
                label={copy.glow}
                value={slot.glow}
                min={0}
                max={GLOW_MAX}
                onChange={onGlow}
                onReset={onResetGlow}
              />
            </div>
          </section>
          <section className="badge-debug-section">
            <div className="badge-debug-section-title">
              <span>{copy.ink}</span>
              <span className="badge-debug-field-value">{ink.name}</span>
            </div>
            <div className="badge-debug-fields">
              <div className="badge-debug-field">
                <div
                  ref={paletteRef}
                  className="badge-debug-palette"
                  role="radiogroup"
                  aria-label={copy.ink}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                      event.preventDefault();
                      moveInk(1);
                    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                      event.preventDefault();
                      moveInk(-1);
                    }
                  }}
                >
                  {INKS.map((item) => {
                    const selected = item.id === ink.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        data-ink={item.id}
                        aria-checked={selected}
                        aria-label={`${item.name} ${item.hex}`}
                        title={item.name}
                        tabIndex={selected ? 0 : -1}
                        className={selected ? 'badge-debug-swatch is-selected' : 'badge-debug-swatch'}
                        style={{ background: item.hex }}
                        onClick={() => onInk(item.id)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return inline ? panel : createPortal(panel, document.body);
}

const StatusBadgeLab: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].display;
  const [tune, setTune] = useState<Tune>(INITIAL);
  const [open, setOpen] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [pos, setPos] = useState(() => clampPos({ x: window.innerWidth - PANEL_WIDTH - 16, y: 16 }));
  const [stageOnScreen, setStageOnScreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const wide = useWidePanel();
  const active = slotFor(tune);
  const ink = findInk(active.inkId);
  const purpleInk = findInk(tune.purple.inkId);
  const goldInk = findInk(tune.gold.inkId);
  const hotInk = findInk(tune.hot.inkId);
  const newInk = findInk(tune.new.inkId);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const scroller = node.closest('main');
    const place = () => {
      if (dragged.current) return;
      const rect = node.getBoundingClientRect();
      const margin = 16;
      const maxY = Math.max(margin, window.innerHeight - 160);
      setPos(clampPos({
        x: window.innerWidth - PANEL_WIDTH - margin,
        y: clamp(rect.top, margin, maxY),
      }));
    };
    const observer = new IntersectionObserver(([entry]) => {
      setStageOnScreen(Boolean(entry?.isIntersecting));
    });
    observer.observe(node);
    place();
    scroller?.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      observer.disconnect();
      scroller?.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
  }, []);

  useEffect(() => {
    if (!spinning) return;
    const id = window.setTimeout(() => setSpinning(false), 420);
    return () => window.clearTimeout(id);
  }, [spinning]);

  if (!ink || !purpleInk || !goldInk || !hotInk || !newInk) return null;

  const badgeInk: Record<WashId, Ink> = {
    purple: purpleInk,
    gold: goldInk,
    hot: hotInk,
    new: newInk,
  };

  const copy: PanelCopy = {
    title: t.debugTitle,
    recipe: t.debugRecipe,
    ink: t.debugInk,
    fill: t.debugFill,
    glow: t.debugGlow,
    purple: t.statusPurple,
    gold: t.statusGold,
    hot: t.statusHot,
    fresh: t.statusNew,
    reset: t.debugReset,
    collapse: t.debugCollapse,
    expand: t.debugExpand,
  };

  function resetTune() {
    setTune(INITIAL);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setSpinning(true);
  }

  return (
    <div className="status-badge-lab">
      <div className="stage" ref={stageRef}>
        <div className="hf-badges">
          {WASHES.map((id) => (
            <button
              key={id}
              type="button"
              className={tune.wash === id ? 'hf-badge status-badge-live is-current' : 'hf-badge status-badge-live'}
              style={paint(badgeInk[id], tune[id])}
              aria-pressed={tune.wash === id}
              onClick={() => setTune((prev) => ({ ...prev, wash: id }))}
            >
              {copy[id === 'new' ? 'fresh' : id]}
            </button>
          ))}
        </div>
      </div>
      {wide ? null : (
        <StatusBadgePanel
          inline
          copy={copy}
          tune={tune}
          ink={ink}
          open={open}
          spinning={spinning}
          pos={pos}
          onToggle={() => setOpen((prev) => !prev)}
          onReset={resetTune}
          onPos={setPos}
          onWash={(wash) => setTune((prev) => ({ ...prev, wash }))}
          onInk={(inkId) => setTune((prev) => withSlot(prev, { inkId }))}
          onFill={(fill) => setTune((prev) => withSlot(prev, { fill }))}
          onGlow={(glow) => setTune((prev) => withSlot(prev, { glow }))}
          onResetFill={() => setTune((prev) => withSlot(prev, { fill: INITIAL[prev.wash].fill }))}
          onResetGlow={() => setTune((prev) => withSlot(prev, { glow: INITIAL[prev.wash].glow }))}
        />
      )}
      {wide && stageOnScreen ? (
        <StatusBadgePanel
          copy={copy}
          tune={tune}
          ink={ink}
          open={open}
          spinning={spinning}
          pos={pos}
          onToggle={() => setOpen((prev) => !prev)}
          onReset={resetTune}
          onPos={(next) => {
            dragged.current = true;
            setPos(next);
          }}
          onWash={(wash) => setTune((prev) => ({ ...prev, wash }))}
          onInk={(inkId) => setTune((prev) => withSlot(prev, { inkId }))}
          onFill={(fill) => setTune((prev) => withSlot(prev, { fill }))}
          onGlow={(glow) => setTune((prev) => withSlot(prev, { glow }))}
          onResetFill={() => setTune((prev) => withSlot(prev, { fill: INITIAL[prev.wash].fill }))}
          onResetGlow={() => setTune((prev) => withSlot(prev, { glow: INITIAL[prev.wash].glow }))}
        />
      ) : null}
    </div>
  );
};

export default StatusBadgeLab;
