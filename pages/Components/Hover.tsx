import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Language, translations } from '../../translations';
import '../../registry/hover.css';
import './button-inventory.css';
import './hover-specimens.css';

const HOVER_PROMPT = `Add a Topview hover card to this project. Read https://raw.githubusercontent.com/naaadarrr/topview-design/main/registry/hover.css. Copy those treatments. Use only .hover-seedance, .hover-poster, .hover-quickstart, and .hf-tile. Hover is an edge highlight or sheen, plus glow and a bottom highlight. Do not substitute a brighter gray. Do not invent a new hover.`;

const HoverPrompt: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].buttonInventory;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(HOVER_PROMPT);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="prompt-row">
      <button type="button" className="prompt-copy" onClick={copy}>
        {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
        {copied ? t.copiedCommand : t.copyCommand}
      </button>
    </div>
  );
};

interface HoverProps {
  language: Language;
}

// Rendered inside Overlays > Hover card; sub-blocks use small labels, not page headings.
const SubLabel: React.FC<{ title: string }> = ({ title }) => (
  <h4 className="font-sans text-[14px] leading-[20px] font-semibold text-white/70 mb-4">{title}</h4>
);

const Hover: React.FC<HoverProps> = ({ language }) => {
  const t = translations[language].hover;

  return (
    <div className="hoverSpecimens space-y-12">
      <HoverPrompt language={language} />

      <section>
        <SubLabel title={t.ruleLabel} />
        <p className="font-sans text-[16px] leading-[22px] text-white max-w-2xl">
          {t.rule}
        </p>
      </section>

      <section>
        <SubLabel title={t.samplesLabel} />
        <div className="stage">
          <div className="row samples">
            <button type="button" className="hover-seedance" aria-label={t.seedanceTitle} />
            <button type="button" className="hover-poster" aria-label={t.posterTitle}>
              <span className="art" aria-hidden="true" />
              <span className="edge" aria-hidden="true" />
            </button>
            <button type="button" className="hover-quickstart" aria-label={t.quickStartTitle}>
              <span className="media" aria-hidden="true" />
              <span className="edge" aria-hidden="true" />
              <span className="glow" aria-hidden="true" />
              <span className="floor" aria-hidden="true" />
            </button>
            <div className="hf-tile" aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hover;
