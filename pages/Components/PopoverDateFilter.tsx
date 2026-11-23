import React, { useState } from 'react';
import { Calendar, Check, ChevronDown, Star, User, Wand2 } from 'lucide-react';
import { Language, translations } from '../../translations';

type DatePreset = 'today' | 'yesterday' | 'week';
export type DateFilterSelection = {
  preset: DatePreset;
  start: Date;
  end: Date;
} | null;

type RatingSymbol = '>' | '≥' | '=' | '≤' | '<';
type StarValue = 1 | 2 | 3;
type SourceId = 'imageToVideo' | 'textToVideo' | 'textToImage';

const RATING_SYMBOLS: RatingSymbol[] = ['>', '≥', '=', '≤', '<'];
const STAR_VALUES: StarValue[] = [1, 2, 3];
const SOURCES: { id: SourceId; count: number }[] = [
  { id: 'imageToVideo', count: 24 },
  { id: 'textToVideo', count: 11 },
  { id: 'textToImage', count: 7 },
];

// FilterMenu -> DateFilter, immutable product b0c5a29. Local state only;
// "week" is the trailing seven days, not the locale's calendar week.
function presetRange(preset: DatePreset): NonNullable<DateFilterSelection> {
  const start = new Date();
  const end = new Date(start);
  if (preset === 'yesterday') end.setDate(end.getDate() - 1);
  start.setDate(start.getDate() - (preset === 'week' ? 6 : preset === 'yesterday' ? 1 : 0));
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { preset, start, end };
}

interface PopoverDateFilterProps {
  language: Language;
  value: DateFilterSelection;
  onChange: (value: DateFilterSelection) => void;
}

const PopoverDateFilter: React.FC<PopoverDateFilterProps> = ({ language, value, onChange }) => {
  const t = translations[language].overlays;
  const presets: { id: DatePreset; label: string }[] = [
    { id: 'today', label: t.popoverDateToday },
    { id: 'yesterday', label: t.popoverDateYesterday },
    { id: 'week', label: t.popoverDateThisWeek },
  ];
  const ratingLabels: Record<RatingSymbol, string> = {
    '>': t.popoverRatingGt,
    '≥': t.popoverRatingGte,
    '=': t.popoverRatingEq,
    '≤': t.popoverRatingLte,
    '<': t.popoverRatingLt,
  };
  const sourceLabels: Record<SourceId, string> = {
    imageToVideo: t.popoverSourceImageToVideo,
    textToVideo: t.popoverSourceTextToVideo,
    textToImage: t.popoverSourceTextToImage,
  };

  const [ratingMode, setRatingMode] = useState<RatingSymbol>('≥');
  const [ratingValue, setRatingValue] = useState<StarValue | null>(null);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [sources, setSources] = useState<SourceId[]>([]);
  const [creatorOn, setCreatorOn] = useState(false);

  const ratingActive = ratingValue !== null;
  const starDisabled = (star: StarValue) => ratingMode === '>' && star === 3;

  return (
    <div className="popover-date-filter">
      <section>
        <div className="date-filter-heading">
          <div className="date-filter-label is-rating"><Star aria-hidden size={14} />{t.popoverRating}</div>
          {ratingActive ? (
            <button type="button" className="date-filter-clear" onClick={() => setRatingValue(null)}>{t.popoverClear}</button>
          ) : null}
        </div>
        <div className="date-filter-rating">
          <div className="date-filter-op">
            <button
              type="button"
              className={`date-filter-op-trigger${ratingActive ? ' is-on' : ''}`}
              aria-label={t.popoverRating}
              aria-expanded={ratingOpen}
              onClick={() => setRatingOpen((open) => !open)}
            >
              <span>{ratingMode}</span>
              <ChevronDown aria-hidden size={12} />
            </button>
            {ratingOpen ? (
              <div className="date-filter-op-menu" role="listbox" aria-label={t.popoverRating}>
                {RATING_SYMBOLS.map((symbol) => (
                  <button
                    key={symbol}
                    type="button"
                    role="option"
                    aria-selected={ratingMode === symbol}
                    onClick={() => {
                      setRatingMode(symbol);
                      if (symbol === '>' && ratingValue === 3) setRatingValue(2);
                      setRatingOpen(false);
                    }}
                  >
                    <span>{symbol}</span>
                    <span>{ratingLabels[symbol]}</span>
                    {ratingMode === symbol ? <Check aria-hidden size={14} /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="date-filter-stars">
            {STAR_VALUES.map((star) => {
              const lit = ratingActive && ratingValue !== null && star <= ratingValue;
              const threshold = ratingActive && star === ratingValue;
              return (
                <button
                  key={star}
                  type="button"
                  className={`date-filter-star${threshold ? ' is-threshold' : ''}`}
                  disabled={starDisabled(star)}
                  aria-pressed={lit}
                  aria-label={`${star}`}
                  onClick={() => setRatingValue(ratingValue === star ? null : star)}
                >
                  <Star aria-hidden size={20} className={lit ? 'is-lit' : ''} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="date-filter-rule" />

      <section>
        <div className="date-filter-heading">
          <div className="date-filter-label"><Calendar aria-hidden size={14} />{t.popoverDate}</div>
          {value ? <button type="button" className="date-filter-clear" onClick={() => onChange(null)}>{t.popoverClear}</button> : null}
        </div>
        <div className="date-filter-presets" role="group" aria-label={t.popoverDate}>
          {presets.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="date-filter-preset"
              aria-pressed={value?.preset === id}
              onClick={() => onChange(value?.preset === id ? null : presetRange(id))}
            >{label}</button>
          ))}
        </div>
        <button type="button" className="date-filter-custom">
          {t.popoverCustomRange}
          <ChevronDown aria-hidden size={12} />
        </button>
      </section>

      <div className="date-filter-rule" />

      <section>
        <div className="date-filter-heading">
          <div className="date-filter-label is-source"><Wand2 aria-hidden size={14} />{t.popoverSourceLabel}</div>
          {sources.length > 0 ? (
            <button type="button" className="date-filter-clear" onClick={() => setSources([])}>{t.popoverClear}</button>
          ) : null}
        </div>
        <div className="date-filter-presets" role="group" aria-label={t.popoverSourceLabel}>
          {SOURCES.map(({ id, count }) => {
            const selected = sources.includes(id);
            return (
              <button
                key={id}
                type="button"
                className="date-filter-preset is-source"
                aria-pressed={selected}
                onClick={() => setSources((current) => (
                  current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
                ))}
              >
                {sourceLabels[id]}
                <span className="date-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="date-filter-rule" />

      <section>
        <div className="date-filter-heading">
          <div className="date-filter-label is-creator"><User aria-hidden size={14} />{t.popoverCreator}</div>
          {creatorOn ? (
            <button type="button" className="date-filter-clear" onClick={() => setCreatorOn(false)}>{t.popoverClear}</button>
          ) : null}
        </div>
        <button
          type="button"
          className="date-filter-creator"
          aria-pressed={creatorOn}
          onClick={() => setCreatorOn((on) => !on)}
        >
          <span className="date-filter-avatar" aria-hidden>{t.popoverYou.charAt(0).toUpperCase()}</span>
          <span className="date-filter-creator-name">{t.popoverYou}</span>
          <span className="date-filter-count">18</span>
          {creatorOn ? <Check aria-hidden size={12} /> : null}
        </button>
      </section>
    </div>
  );
};

export default PopoverDateFilter;
