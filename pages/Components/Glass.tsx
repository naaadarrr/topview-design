import React, { useEffect, useState } from 'react';
import { Language, translations } from '../../translations';
import './glass-specimens.css';

interface GlassProps {
  language: Language;
}

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

const MicroCard: React.FC<{
  variant: 'a' | 'daily' | 'b';
  cap: string;
  heading: string;
  body: string;
  caption: string;
}> = ({ variant, cap, heading, body, caption }) => (
  <figure>
    <div className={`card-micro ${variant}`}>
      <div className="cap">{cap}</div>
      <h3>{heading}</h3>
      <p>{body}</p>
    </div>
    <figcaption>{caption}</figcaption>
  </figure>
);

const Glass: React.FC<GlassProps> = ({ language }) => {
  const t = translations[language].glass;
  const [forceTooltip, setForceTooltip] = useState(false);
  const [escHide, setEscHide] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEscHide(true);
        setForceTooltip(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`glassSpecimens space-y-24 ${forceTooltip ? 'force-tt' : ''}`}>
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
            <MicroCard
              variant="a"
              cap={t.cardCap}
              heading={t.cardHeading}
              body={t.cardBody}
              caption={t.cardACaption}
            />
            <MicroCard
              variant="daily"
              cap={t.cardCap}
              heading={t.cardHeading}
              body={t.cardBody}
              caption={t.cardDailyCaption}
            />
          </div>
          <details className="card-archive">
            <summary>{t.cardArchive}</summary>
            <div className="cards">
              <MicroCard
                variant="b"
                cap={t.cardCap}
                heading={t.cardHeading}
                body={t.cardBody}
                caption={t.cardBCaption}
              />
            </div>
          </details>
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
          <div id="glass-tooltip" className="scroll-mt-8">
            <SectionHeading title={t.tooltipTitle} />
            <div className="stage tt-stage">
              <div className="row" style={{ alignItems: 'flex-end', gap: 28, paddingTop: 36 }}>
                <div
                  className={`tt-wrap ${escHide ? 'esc-hide' : ''}`}
                  onMouseEnter={() => setEscHide(false)}
                >
                  <div className="tt" role="tooltip">
                    {t.tooltipLabel}
                  </div>
                  <button
                    className="glass-btn"
                    type="button"
                    onFocus={() => setEscHide(false)}
                  >
                    {t.tooltipTrigger}
                  </button>
                </div>
                <div className="tt-cap">
                  <h3>{t.tooltipTitle}</h3>
                  <p>{t.tooltipBlurb}</p>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <button
                  className="glass-btn"
                  type="button"
                  aria-pressed={forceTooltip}
                  onClick={() => {
                    setForceTooltip((v) => !v);
                    setEscHide(false);
                  }}
                >
                  {forceTooltip ? t.tooltipForceHide : t.tooltipForce}
                </button>
              </div>
            </div>
          </div>

          <div id="glass-purple-white" className="scroll-mt-8">
            <SectionHeading title={t.purpleWhiteTitle} />
            <div className="stage">
              <div className="pw-compare">
                <div>
                  <div className="state-label">{t.purpleWhiteCurrent}</div>
                  <div className="row">
                    <button className="btn primary" type="button">{t.generate}</button>
                    <button className="btn primary is-hover" type="button">{t.stateHover}</button>
                    <button className="btn primary" type="button" disabled>{t.disabled}</button>
                  </div>
                </div>
                <div>
                  <div className="state-label">{t.purpleWhiteTrial}</div>
                  <div className="row">
                    <button className="pw-lg-trial" type="button">
                      <span className="pw-lg-trial-hair" aria-hidden="true" />
                      <span className="pw-lg-trial-backing" aria-hidden="true" />
                      <span className="pw-lg-trial-material" aria-hidden="true">
                        <span className="pw-lg-trial-tint-w50" />
                        <span className="pw-lg-trial-tint-sat" />
                        <span className="pw-lg-trial-tint-ov" />
                        <span className="pw-lg-trial-tint-accent" />
                        <span className="pw-lg-trial-glass-mul" />
                        <span className="pw-lg-trial-frost" />
                        <span className="pw-lg-trial-in-burn" />
                        <span className="pw-lg-trial-in-dodge-bot" />
                        <span className="pw-lg-trial-in-dodge-top" />
                      </span>
                      <span className="pw-lg-trial-label">{t.generate}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <button className="btn white" type="button">{t.upload}</button>
                <button className="btn white is-pressed" type="button">{t.pressed}</button>
                <button className="g btn sec" type="button">{t.cancel}</button>
              </div>
            </div>
          </div>

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
