import React from 'react';
import { Language, translations } from '../../translations';
import './hover-specimens.css';

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
