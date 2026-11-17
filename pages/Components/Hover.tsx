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
        <p className="mt-3 font-sans text-[12px] leading-[18px] text-white/45 max-w-2xl">
          {t.ruleNote}
        </p>
      </section>

      <section>
        <SubLabel title={t.samplesLabel} />
        <div className="stage">
          <div className="row">
            <button type="button" className="hover-seedance" aria-label={t.seedanceTitle}>
              <span className="name">Seedance 2.5</span>
              <span className="unlimited">30 DAYS UNLIMITED</span>
            </button>
            <button type="button" className="hover-poster" aria-label={t.posterTitle}>
              <span className="art" aria-hidden="true" />
              <span className="edge" aria-hidden="true" />
            </button>
          </div>
          <p className="caption">
            <span className="pending">{t.pending}</span>
            {' — '}
            {t.seedanceNote}
          </p>
          <p className="caption">
            <span className="pending">{t.pending}</span>
            {' — '}
            {t.posterNote}
          </p>
          <div className="row">
            <button type="button" className="hover-quickstart" aria-label={t.quickStartTitle}>
              <span className="media" aria-hidden="true" />
              <span className="title">Short Film</span>
              <span className="edge" aria-hidden="true" />
              <span className="glow" aria-hidden="true" />
              <span className="floor" aria-hidden="true" />
            </button>
          </div>
          <p className="caption">
            <span className="pending">{t.pending}</span>
            {' — '}
            {t.quickStartNote}
          </p>
        </div>
      </section>

      <section>
        <SubLabel title={t.contrastLabel} />
        <div className="stage">
          <div className="row">
            <div className="pair">
              <button type="button" className="hover-wrong" aria-label={t.contrastWrong} />
              <div className="card-label">{t.contrastWrong}</div>
            </div>
            <div className="pair">
              <button type="button" className="hover-right" aria-label={t.contrastRight}>
                <span className="edge" aria-hidden="true" />
              </button>
              <div className="card-label">{t.contrastRight}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hover;
