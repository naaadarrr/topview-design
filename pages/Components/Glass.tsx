import React, { useState } from 'react';
import { Language, translations } from '../../translations';
import './glass-specimens.css';

interface GlassProps {
  language: Language;
}

type MaterialStatus = 'locked' | 'candidate';

type GlassMaterial = {
  id: 'banner' | 'card-a' | 'daily';
  plateClass: string;
  name: string;
  use: string;
  status: MaterialStatus;
};

// lucide chevron-left, as TopviewBanner.tsx imports it (lucide-react 0.468.0, origin/develop b0c5a29).
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const Volume2Icon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11 5 6 9H2v6h4l5 4z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeXIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11 5 6 9H2v6h4l5 4z" />
    <path d="m22 9-6 6" />
    <path d="m16 9 6 6" />
  </svg>
);

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

const Glass: React.FC<GlassProps> = ({ language }) => {
  const t = translations[language].glass;
  const [selectedId, setSelectedId] = useState<GlassMaterial['id'] | null>(null);
  const materials: GlassMaterial[] = [
    {
      id: 'banner',
      plateClass: 'material-plate g',
      name: t.materialBanner,
      use: t.materialBannerUse,
      status: 'locked',
    },
    {
      id: 'daily',
      plateClass: 'material-plate card-micro daily',
      name: t.materialDaily,
      use: t.materialDailyUse,
      status: 'candidate',
    },
    {
      id: 'card-a',
      plateClass: 'material-plate card-micro a',
      name: t.materialCardA,
      use: t.materialCardAUse,
      status: 'locked',
    },
  ];
  const selected = materials.find((material) => material.id === selectedId);

  return (
    <div className="glassSpecimens space-y-24">
      <section>
        <SectionHeading title={t.materialsTitle} />
        <div className="stage">
          <div className="material-field">
            {materials.map((material) => (
              <button
                key={material.id}
                type="button"
                className={material.id === selectedId ? `${material.plateClass} is-selected` : material.plateClass}
                aria-pressed={material.id === selectedId}
                onClick={() => setSelectedId(material.id)}
              >
                {material.name}
              </button>
            ))}
          </div>
          <p className="material-use">{selected?.use ?? ''}</p>
        </div>
      </section>

      <section id="glass-banner-arrow">
        <SectionHeading title={t.arrowTitle} />
        <div className="stage">
          <div className="row" style={{ gap: 28, alignItems: 'center' }}>
            <button className="arrow-final" type="button" aria-label="Previous">
              <ChevronLeftIcon />
            </button>
            <button className="arrow-final" type="button" aria-label="Next">
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.cardsTitle} />
        <div className="stage">
          <div className="cards">
            <div className="card-micro a is-plate" />
            <div className="card-micro daily is-plate" />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.hoverIconsTitle} />
        <div className="stage">
          <div className="row" style={{ gap: 20, alignItems: 'center' }}>
            <span className="module-icon" aria-hidden="true" style={{ position: 'relative' }}>
              <ArrowUpRightIcon />
            </span>
            <button type="button" className="module-icon" aria-label={t.soundOn} style={{ position: 'relative' }}>
              <Volume2Icon />
            </button>
            <button type="button" className="module-icon" aria-label={t.muted} style={{ position: 'relative' }}>
              <VolumeXIcon />
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.pendingTitle} />

        <div className="space-y-10 mt-8">
          <div>
            <SectionHeading title={t.iconBtnTitle} />
            <div className="stage">
              <div className="row">
                <button className="g ibtn" type="button" aria-label="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 14 4 9l5-5" />
                    <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
                  </svg>
                </button>
                <button className="g ibtn" type="button" aria-label="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 20s-7-4.3-7-9.6A4 4 0 0 1 12 8a4 4 0 0 1 7 2.4C19 15.7 12 20 12 20Z" />
                  </svg>
                </button>
                <button className="g ibtn" type="button" aria-label="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13" />
                  </svg>
                </button>
                <button className="g ibtn sq" type="button" aria-label="icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading title={t.botBubbleTitle} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Glass;
