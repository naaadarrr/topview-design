import React from 'react';
import { Calendar } from 'lucide-react';
import { Language, translations } from '../../translations';

type DatePreset = 'today' | 'yesterday' | 'week';
export type DateFilterSelection = {
  preset: DatePreset;
  start: Date;
  end: Date;
} | null;

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
  const format = (date: Date) => date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US');

  return (
    <div className="popover-date-filter">
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
      <output className="caption" aria-live="polite">
        {value ? `${format(value.start)} — ${format(value.end)}` : t.popoverLocalDemo}
      </output>
    </div>
  );
};

export default PopoverDateFilter;
