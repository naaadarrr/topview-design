import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

const GroupLabel: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="font-sans text-[14px] leading-[20px] font-semibold text-white/70">{title}</h3>
);

const CheckIcon = () => (
  <svg className="check" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CircleIcon = () => (
  <svg className="radio-mark" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const RadioCheckedIcon = () => (
  <svg className="radio-mark" viewBox="0 0 18 18" aria-hidden="true">
    <circle cx="9" cy="9" r="8.5" fill="none" stroke="var(--topview-purple)" strokeWidth="1" />
    <circle cx="9" cy="9" r="6" fill="var(--topview-purple)" />
  </svg>
);

const FormCheckbox: React.FC<{
  checked: boolean;
  label: string;
  disabled?: boolean;
  showFocus?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}> = ({ checked, label, disabled = false, showFocus = false, onCheckedChange }) => (
  <label className={`choice-row${disabled ? ' is-disabled' : ''}`}>
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      tabIndex={showFocus ? -1 : undefined}
      className={`form-checkbox${checked ? ' is-checked' : ''}${showFocus ? ' show-focus' : ''}${disabled ? ' is-disabled' : ''}`}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {checked ? <CheckIcon /> : null}
    </button>
    <span>{label}</span>
  </label>
);

const RadioOption: React.FC<{
  selected: boolean;
  label: string;
  showHover?: boolean;
  onSelect?: () => void;
}> = ({ selected, label, showHover = false, onSelect }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    tabIndex={onSelect ? 0 : -1}
    className={`radio-option${selected ? ' is-selected' : ''}${showHover ? ' show-hover' : ''}`}
    onClick={onSelect}
  >
    {selected ? <RadioCheckedIcon /> : <CircleIcon />}
    <span>{label}</span>
  </button>
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
    <kbd aria-hidden="true">
      {[...shortcut].map((glyph, index) => (
        <span key={`${glyph}-${index}`} className={'⌘⌥⌃⇧'.includes(glyph) ? 'is-symbol' : undefined}>{glyph}</span>
      ))}
    </kbd>
  </label>
);

const PromptSurface: React.FC<{
  placeholder: string;
}> = ({ placeholder }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

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
    <div className="prompt-surface">
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
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
    onClick={(event) => {
      event.stopPropagation();
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

const SEGMENTED = ['segmentBoard', 'segmentInspirations', 'segmentDocuments'] as const;

const SegmentedTabs: React.FC<{ labels: Record<(typeof SEGMENTED)[number], string>; ariaLabel: string }> = ({
  labels,
  ariaLabel,
}) => {
  const [value, setValue] = useState<(typeof SEGMENTED)[number]>('segmentBoard');
  const btnRefs = useRef<Partial<Record<(typeof SEGMENTED)[number], HTMLButtonElement | null>>>({});
  const pillRef = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const tab = btnRefs.current[value];
    const pill = pillRef.current;
    if (!tab || !pill) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pill.style.transition = first.current || reduce ? 'none' : '';
    first.current = false;
    pill.style.width = `${tab.offsetWidth}px`;
    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
  }, [value, labels]);

  return (
    <div className="seg-list" role="tablist" aria-label={ariaLabel}>
      <span className="seg-pill" ref={pillRef} aria-hidden />
      {SEGMENTED.map((id) => (
        <button
          key={id}
          ref={(el) => {
            btnRefs.current[id] = el;
          }}
          type="button"
          role="tab"
          aria-selected={value === id}
          className={`seg-tab${value === id ? ' is-active' : ''}`}
          onClick={() => setValue(id)}
        >
          <span className="seg-face">{labels[id]}</span>
          <span className="seg-edge" aria-hidden />
        </button>
      ))}
    </div>
  );
};

const SearchSelect: React.FC<{
  placeholder: string;
  empty: string;
  options: string[];
  query: string;
  onQuery?: (query: string) => void;
}> = ({ placeholder, empty, options, query, onQuery }) => {
  const matches = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div className="select-menu is-search">
      <span className="select-menu-edge" aria-hidden />
      <label className="select-search">
        <SearchIcon />
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          readOnly={!onQuery}
          onChange={(event) => onQuery?.(event.target.value)}
        />
      </label>
      <div className="select-menu-body" role="listbox">
        {matches.length > 0 ? (
          matches.map((option) => (
            <button key={option} type="button" role="option" className="select-item">
              {option}
            </button>
          ))
        ) : (
          <div className="select-empty">{empty}</div>
        )}
      </div>
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

const PasswordEye: React.FC<{ clipId: string }> = ({ clipId }) => (
  <svg className="password-eye" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <clipPath id={clipId}>
        <path className="password-eye-lid" />
      </clipPath>
    </defs>
    <circle className="password-eye-pupil" cx="12" cy="12" r="3" clipPath={`url(#${clipId})`} />
    <path className="password-eye-lid" />
    <path className="password-eye-lash" pathLength={1} d="M4.4 14.6 3 16.4" />
    <path className="password-eye-lash" pathLength={1} d="M9 16.6 8.5 19" />
    <path className="password-eye-lash" pathLength={1} d="M15 16.6 15.5 19" />
    <path className="password-eye-lash" pathLength={1} d="M19.6 14.6 21 16.4" />
  </svg>
);

const PasswordField: React.FC<{ showLabel: string; hideLabel: string }> = ({ showLabel, hideLabel }) => {
  const [visible, setVisible] = useState(false);
  const clipId = `password-eye${useId().replace(/:/g, '')}`;

  return (
    <div className="login-password">
      <input
        className="login-input"
        type={visible ? 'text' : 'password'}
        placeholder="Password"
        aria-label="Password"
        autoComplete="off"
      />
      <button
        type="button"
        className={`login-password-toggle${visible ? ' is-open' : ''}`}
        aria-pressed={visible}
        aria-label={visible ? hideLabel : showLabel}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setVisible((open) => !open)}
      >
        <PasswordEye clipId={clipId} />
      </button>
    </div>
  );
};

const Controls: React.FC<ControlsProps> = ({ language }) => {
  const t = translations[language].controls;
  const [notify, setNotify] = useState(false);
  const [sliderMd, setSliderMd] = useState(2);
  const [sliderTicks, setSliderTicks] = useState(3);
  const [sliderSm, setSliderSm] = useState(2);
  const [batchMode, setBatchMode] = useState(false);
  const [proof, setProof] = useState('');
  const [keepCopy, setKeepCopy] = useState(true);
  const [resolution, setResolution] = useState<'720' | '1080'>('1080');
  const [menuQuery, setMenuQuery] = useState('');
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
      <div>
        <GroupLabel title={t.fieldsTitle} />
        <div className="mt-6 space-y-24">
      <section>
        <SectionHeading title={t.fieldTitle} />
        <div className="stage">
          <div className="field-stack">
            <div className="login-fields">
              <input className="login-input" type="email" placeholder="Email" aria-label="Email" />
              <PasswordField showLabel={t.passwordShow} hideLabel={t.passwordHide} />
            </div>
            <div className="form-field">
              <label className="form-field-label" htmlFor="activity-proof">{t.textareaLabel}</label>
              <input
                id="activity-proof"
                className="login-input"
                type="text"
                value={proof}
                placeholder={t.textareaPlaceholder}
                onChange={(event) => setProof(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.inputTitle} />
        <div className="stage">
          <PromptSurface placeholder={t.inputPlaceholder} />
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
        <SectionHeading title={t.segmentTitle} />
        <div className="stage">
          <SegmentedTabs
            ariaLabel={t.segmentTitle}
            labels={{
              segmentBoard: t.segmentBoard,
              segmentInspirations: t.segmentInspirations,
              segmentDocuments: t.segmentDocuments,
            }}
          />
        </div>
      </section>

      <section>
        <SectionHeading title={t.searchSelectTitle} />
        <div className="stage stage-open">
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <figure>
              <div className="state-label">{t.stateDefault}</div>
              <SearchSelect
                placeholder={t.searchSelectPlaceholder}
                empty={t.searchSelectEmpty}
                query={menuQuery}
                onQuery={setMenuQuery}
                options={[
                  t.segmentBoard,
                  t.segmentInspirations,
                  t.segmentDocuments,
                  t.searchImage,
                  t.searchVideo,
                  t.searchAudio,
                ]}
              />
            </figure>
            <figure>
              <div className="state-label">{t.searchSelectEmpty}</div>
              <SearchSelect
                placeholder={t.searchSelectPlaceholder}
                empty={t.searchSelectEmpty}
                query={t.searchSelectMiss}
                options={[]}
              />
            </figure>
          </div>
        </div>
      </section>
        </div>
      </div>

      <section>
        <SectionHeading title={t.checkboxTitle} />
        <div className="stage">
          <FormCheckbox checked={keepCopy} label={t.choiceCopy} onCheckedChange={setKeepCopy} />
        </div>
      </section>

      <section>
        <SectionHeading title={t.switchTitle} />
        <div className="stage">
          <div className="choice-row" onClick={() => setNotify((on) => !on)}>
            <BoardSwitch checked={notify} onCheckedChange={setNotify} ariaLabel={t.choiceNotify} />
            <span>{t.choiceNotify}</span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.radioTitle} />
        <div className="stage">
          <div className="radio-field">
            <span className="radio-field-label">{t.radioLabel}</span>
            <div className="radio-group" role="radiogroup" aria-label={t.radioLabel}>
              <RadioOption
                selected={resolution === '720'}
                label={t.radio720}
                onSelect={() => setResolution('720')}
              />
              <RadioOption
                selected={resolution === '1080'}
                label={t.radio1080}
                onSelect={() => setResolution('1080')}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.sliderTitle} />
        <div className="stage">
          <div className="flex w-full max-w-[320px] flex-col gap-8">
            <BoardSlider value={sliderMd} onChange={setSliderMd} />
            <BoardSlider value={sliderTicks} onChange={setSliderTicks} showTicks />
            <BoardSlider value={sliderSm} onChange={setSliderSm} size="sm" />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.toolbarTitle} />
        <div className="stage">
          <div className="board-toolbar-right">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Controls;
