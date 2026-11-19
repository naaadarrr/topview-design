import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Language, translations } from '../../translations';
import './controls-specimens.css';

interface ControlsProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

const SparklesIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
  </svg>
);

const ImagePlayIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m11 16-5 5" />
    <path d="M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5" />
    <path d="M15.765 22a.5.5 0 0 1-.765-.424V13.5a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.65z" />
    <circle cx="9" cy="9" r="2" />
  </svg>
);

const TypeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
);

const ChevronDown = () => (
  <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const SearchField: React.FC<{
  placeholder: string;
  shortcut: string;
  defaultValue?: string;
  disabled?: boolean;
  showFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}> = ({ placeholder, shortcut, defaultValue = '', disabled = false, showFocus = false, inputRef }) => (
  <label className={`search-field${disabled ? ' is-disabled' : ''}${showFocus ? ' show-focus' : ''}`}>
    <SearchIcon />
    <input
      ref={inputRef}
      type="search"
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      tabIndex={disabled || showFocus ? -1 : undefined}
      aria-label={placeholder}
    />
    <kbd aria-hidden="true">{shortcut}</kbd>
  </label>
);

const PromptSurface: React.FC<{
  placeholder: string;
  defaultValue?: string;
  disabled?: boolean;
}> = ({ placeholder, defaultValue = '', disabled = false }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <div className={`prompt-surface${disabled ? ' is-disabled' : ''}`}>
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

const BoardSwitch: React.FC<{
  checked: boolean;
  onCheckedChange?: (next: boolean) => void;
  size?: 'default' | 'sm';
  disabled?: boolean;
  showFocus?: boolean;
  ariaLabel: string;
}> = ({
  checked,
  onCheckedChange,
  size = 'default',
  disabled = false,
  showFocus = false,
  ariaLabel,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    data-state={checked ? 'checked' : 'unchecked'}
    data-size={size}
    disabled={disabled}
    onClick={() => {
      if (disabled) return;
      onCheckedChange?.(!checked);
    }}
    className={`board-switch${showFocus ? ' show-focus' : ''}${disabled ? ' is-disabled' : ''}`}
  >
    <span className="board-switch-thumb" data-state={checked ? 'checked' : 'unchecked'} />
  </button>
);

const OPTIONS = ['selectOptionA', 'selectOptionB', 'selectOptionC'] as const;

const DefaultSelect: React.FC<{
  labels: Record<(typeof OPTIONS)[number] | 'selectLabel', string>;
}> = ({ labels }) => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<(typeof OPTIONS)[number]>('selectOptionA');
  return (
    <div>
      <div className="select-label">{labels.selectLabel}</div>
      <button
        type="button"
        className="select-trigger"
        data-state={open ? 'open' : 'closed'}
        onClick={() => setOpen((next) => !next)}
      >
        <span>{labels[value]}</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="select-menu" style={{ marginTop: 8 }}>
          <span className="select-menu-edge" aria-hidden />
          <div className="select-menu-body">
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`select-item${option === value ? ' is-active' : ''}`}
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
              >
                {labels[option]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BoardSlider: React.FC<{
  min?: number;
  max?: number;
  value: number;
  onChange?: (value: number) => void;
  showTicks?: boolean;
  size?: 'md' | 'sm';
  disabled?: boolean;
}> = ({ min = 1, max = 4, value, onChange, showTicks = false, size = 'md', disabled = false }) => {
  const ticks = useMemo(() => {
    const list: number[] = [];
    for (let n = min; n <= max; n += 1) list.push(n);
    return list;
  }, [min, max]);
  const span = max - min || 1;
  const thumbPx = size === 'sm' ? 12 : 16;
  const percent = ((value - min) / span) * 100;
  const thumbLeft = `calc(${percent}% + ${(0.5 - percent / 100) * thumbPx}px)`;

  const setFromClientX = (track: HTMLElement, clientX: number) => {
    if (disabled) return;
    const rect = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + p * span;
    onChange?.(Math.min(max, Math.max(min, Math.round(raw))));
  };

  return (
    <div className={`board-slider${size === 'sm' ? ' is-sm' : ''}${disabled ? ' is-disabled' : ''}`}>
      <div
        className="board-slider-root"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : 0}
        onClick={(event) => setFromClientX(event.currentTarget, event.clientX)}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            onChange?.(Math.min(max, value + 1));
          }
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            onChange?.(Math.max(min, value - 1));
          }
        }}
      >
        <div className="board-slider-track">
          <div className="board-slider-range" style={{ width: `${percent}%` }} />
        </div>
        <span className="board-slider-thumb" style={{ left: thumbLeft }} />
      </div>
      {showTicks && (
        <div className="board-slider-ticks">
          {ticks.map((tick) => {
            const p = ((tick - min) / span) * 100;
            const left = `calc(${p}% + ${(0.5 - p / 100) * thumbPx}px)`;
            return (
              <span
                key={tick}
                className={`board-slider-tick${tick === value ? ' is-current' : ''}`}
                style={{ left }}
              >
                {tick}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Board MainToolbar right group (origin/develop b0c5a29):
// GridSizeSlider = BoardSlider min 3 / max 5 / step 0.5 / showTicks false / showTrackMarks.
const GridSizeSlider: React.FC<{ value: number; onChange: (value: number) => void; label: string }> = ({
  value,
  onChange,
  label,
}) => {
  const min = 3;
  const max = 5;
  const step = 0.5;
  const thumbPx = 14;
  const span = max - min;
  const marks: number[] = [];
  for (let n = min; n <= max; n += step) marks.push(n);
  const at = (v: number) => {
    const p = ((v - min) / span) * 100;
    return `calc(${p}% + ${(0.5 - p / 100) * thumbPx}px)`;
  };
  const snap = (raw: number) => Math.min(max, Math.max(min, Math.round(raw / step) * step));
  return (
    <div className="grid-size-slot">
      <div className="board-slider is-marks">
        <div
          className="board-slider-root"
          role="slider"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={0}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            onChange(snap(min + ratio * span));
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              event.preventDefault();
              onChange(snap(value + step));
            }
            if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              event.preventDefault();
              onChange(snap(value - step));
            }
          }}
        >
          <div className="board-slider-track" />
          {marks.map((mark) => (
            <span key={mark} aria-hidden className="board-slider-mark" style={{ left: at(mark) }} />
          ))}
          <span className="board-slider-thumb" style={{ left: at(value) }} />
        </div>
      </div>
    </div>
  );
};

const ToolbarIconButton: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ label, active = false, onClick, children }) => (
  <button
    type="button"
    className={`toolbar-icon-btn${active ? ' is-active' : ''}`}
    aria-label={label}
    aria-pressed={onClick ? active : undefined}
    onClick={onClick}
  >
    <span aria-hidden className="toolbar-icon-hover" />
    {children}
  </button>
);

// JustifiedLayoutIcon from ViewMenu/components/LayoutIcons.tsx (default layout is JUSTIFIED).
const JustifiedLayoutIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" aria-hidden="true">
    <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="1" />
    <path d="M1.75 6.08h12.5M1.75 9.92h12.5M6.5 2.25v3.83M10 6.08v3.84M5.5 9.92v3.83" />
  </svg>
);

// lucide-react 0.468.0 geometry (Filter, CheckSquare = square-check-big, Upload).
const LucideFilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const LucideCheckSquareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const LucideUploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

// FeaturedCaseTabChip from home FilmStudioShowcase.tsx.
const FeaturedCaseTabChip: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({
  active,
  label,
  onClick,
}) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    className={`home-tab-chip${active ? ' is-active' : ''}`}
    onClick={onClick}
  >
    <span className="home-tab-chip-face">
      {!active ? <span aria-hidden className="home-tab-chip-hover-fill" /> : null}
      <span className="home-tab-chip-label">{label}</span>
    </span>
    <span aria-hidden className="home-tab-chip-edge" />
  </button>
);

const TAB_IDS = ['omni-reference', 'image-to-video', 'text-to-video'] as const;

const TAB_ICONS = {
  'omni-reference': SparklesIcon,
  'image-to-video': ImagePlayIcon,
  'text-to-video': TypeIcon,
} as const;

const SubtoolTabs: React.FC<{ labels: Record<(typeof TAB_IDS)[number], string> }> = ({ labels }) => {
  const [active, setActive] = useState<(typeof TAB_IDS)[number]>('omni-reference');
  return (
    <div className="subtool-wrap">
      <div className="subtool-track">
        {TAB_IDS.map((id) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              data-subtool-tab={id}
              className={`subtool-btn${isActive ? ' is-active' : ''}`}
              onClick={() => setActive(id)}
            >
              {React.createElement(TAB_ICONS[id])}
              <span className="label">{labels[id]}</span>
              <span className="subtool-underline" aria-hidden />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Controls: React.FC<ControlsProps> = ({ language }) => {
  const t = translations[language].controls;
  const [switchOn, setSwitchOn] = useState(true);
  const [switchOff, setSwitchOff] = useState(false);
  const [switchSm, setSwitchSm] = useState(true);
  const [sliderMd, setSliderMd] = useState(2);
  const [sliderTicks, setSliderTicks] = useState(3);
  const [sliderSm, setSliderSm] = useState(2);
  const [gridSize, setGridSize] = useState(4);
  const [batchMode, setBatchMode] = useState(false);
  const [homeTab, setHomeTab] = useState<'functions' | 'skills'>('functions');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="controlsSpecimens space-y-24">
      <section>
        <SectionHeading title={t.inputTitle} />
        <div className="stage">
          <div className="state-label">{t.stateDefault}</div>
          <PromptSurface placeholder={t.inputPlaceholder} />
          <div className="state-label" style={{ marginTop: 20 }}>
            {t.stateDisabled}
          </div>
          <PromptSurface placeholder={t.inputPlaceholder} defaultValue={t.inputFilled} disabled />
        </div>
      </section>

      <section>
        <SectionHeading title={t.searchTitle} />
        <div className="stage">
          <div className="row">
            <figure>
              <div className="state-label">{t.stateDefault}</div>
              <SearchField
                placeholder={t.searchPlaceholder}
                shortcut={t.searchShortcut}
                inputRef={searchRef}
              />
            </figure>
            <figure>
              <div className="state-label">{t.stateFocus}</div>
              <SearchField placeholder={t.searchPlaceholder} shortcut={t.searchShortcut} showFocus />
            </figure>
            <figure>
              <div className="state-label">{t.stateDisabled}</div>
              <SearchField placeholder={t.searchPlaceholder} shortcut={t.searchShortcut} defaultValue={t.searchFilled} disabled />
            </figure>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.switchTitle} />
        <div className="stage">
          <div className="row">
            <figure>
              <div className="state-label">{t.stateOn}</div>
              <BoardSwitch checked={switchOn} onCheckedChange={setSwitchOn} ariaLabel={t.stateOn} />
            </figure>
            <figure>
              <div className="state-label">{t.stateOff}</div>
              <BoardSwitch checked={switchOff} onCheckedChange={setSwitchOff} ariaLabel={t.stateOff} />
            </figure>
            <figure>
              <div className="state-label">{t.stateFocus}</div>
              <BoardSwitch checked showFocus ariaLabel={t.stateFocus} />
            </figure>
            <figure>
              <div className="state-label">{t.stateDisabled}</div>
              <BoardSwitch checked disabled ariaLabel={t.stateDisabled} />
            </figure>
            <figure>
              <div className="state-label">{t.stateSm}</div>
              <BoardSwitch
                checked={switchSm}
                onCheckedChange={setSwitchSm}
                size="sm"
                ariaLabel={t.stateSm}
              />
            </figure>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.selectTitle} />
        <div className="stage stage-open">
          <div className="row" style={{ alignItems: 'flex-start', gap: 28 }}>
            <div>
              <div className="state-label">{t.stateDefault}</div>
              <button type="button" className="select-trigger" tabIndex={-1}>
                <span>{t.selectOptionA}</span>
                <ChevronDown />
              </button>
            </div>
            <div>
              <div className="state-label">{t.stateHover}</div>
              <button type="button" className="select-trigger show-hover" tabIndex={-1}>
                <span>{t.selectOptionA}</span>
                <ChevronDown />
              </button>
            </div>
            <div>
              <div className="state-label">{t.stateOpen}</div>
              <DefaultSelect
                labels={{
                  selectLabel: t.selectLabel,
                  selectOptionA: t.selectOptionA,
                  selectOptionB: t.selectOptionB,
                  selectOptionC: t.selectOptionC,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.sliderTitle} />
        <div className="stage">
          <div className="state-label">{t.stateDefault}</div>
          <BoardSlider value={sliderMd} onChange={setSliderMd} />
          <div className="state-label" style={{ marginTop: 20 }}>
            {t.stateTicks}
          </div>
          <BoardSlider value={sliderTicks} onChange={setSliderTicks} showTicks />
          <div className="state-label" style={{ marginTop: 20 }}>
            {t.stateSm}
          </div>
          <BoardSlider value={sliderSm} onChange={setSliderSm} size="sm" />
          <div className="state-label" style={{ marginTop: 20 }}>
            {t.stateDisabled}
          </div>
          <BoardSlider value={3} disabled showTicks />
        </div>
      </section>

      <section>
        <SectionHeading title={t.tabsTitle} />
        <div className="stage">
          <SubtoolTabs
            labels={{
              'omni-reference': t.tabOmniReference,
              'image-to-video': t.tabImageToVideo,
              'text-to-video': t.tabTextToVideo,
            }}
          />
        </div>
      </section>

      <section>
        <SectionHeading title={t.toolbarTitle} />
        <div className="stage">
          <div className="board-toolbar-right">
            <GridSizeSlider value={gridSize} onChange={setGridSize} label={t.toolbarSize} />
            <ToolbarIconButton label={t.toolbarView}>
              <JustifiedLayoutIcon />
            </ToolbarIconButton>
            <ToolbarIconButton label={t.toolbarFilter}>
              <LucideFilterIcon />
            </ToolbarIconButton>
            <div className="toolbar-divider" aria-hidden />
            <ToolbarIconButton
              label={t.toolbarBatch}
              active={batchMode}
              onClick={() => setBatchMode((on) => !on)}
            >
              <LucideCheckSquareIcon />
            </ToolbarIconButton>
            <div className="toolbar-divider" aria-hidden />
            <ToolbarIconButton label={t.toolbarUpload}>
              <LucideUploadIcon />
            </ToolbarIconButton>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.homeTabsTitle} />
        <div className="stage">
          <div className="home-tab-list" role="tablist" aria-label={t.homeTabsAria}>
            <FeaturedCaseTabChip
              active={homeTab === 'functions'}
              label={t.homeTabFunctions}
              onClick={() => setHomeTab('functions')}
            />
            <FeaturedCaseTabChip
              active={homeTab === 'skills'}
              label={t.homeTabSkills}
              onClick={() => setHomeTab('skills')}
            />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.pluginTitle} />
        <div className="stage">
          <button type="button" className="install-plugin">
            {t.pluginLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Controls;
