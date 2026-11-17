import React from 'react';
import { Language, translations } from '../../translations';
import './controls-specimens.css';
import './button-inventory.css';

interface ButtonInventoryProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

const Cell: React.FC<{ state: string; children: React.ReactNode; wide?: boolean }> = ({ state, children, wide }) => (
  <div className={`inv-cell${wide ? ' inv-col' : ''}`}>
    {children}
    <span className="inv-state">{state}</span>
  </div>
);

const ArrowRight: React.FC<{ stroke?: number }> = ({ stroke = 2.25 }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SIZE_ROWS = [
  { labelKey: 'ctrlSmall' as const, heightClass: 'size-h32', measure: '32 / 2' },
  { labelKey: 'ctrlMedium' as const, heightClass: 'size-h36', measure: '36 / 2.25' },
  { labelKey: 'ctrlLarge' as const, heightClass: 'size-h40', measure: '40 / 2.5' },
];

const ButtonInventory: React.FC<ButtonInventoryProps> = ({ language }) => {
  const t = translations[language].buttonInventory;

  return (
    <div className="buttonInventory space-y-24">
      <p className="max-w-2xl text-[20px] leading-[26px] font-sans text-white font-normal">
        {t.pageLine}
      </p>

      <section>
        <SectionHeading title={t.primary} />
        <div className="stage stage-primary">
          <div className="inv-row-primary">
            <Cell state={t.stateDefault}>
              <button type="button" className="purple-thick">{t.quickStartLabel}<ArrowRight stroke={2.2} /></button>
            </Cell>
            <Cell state={t.statePressed}>
              <button type="button" className="purple-thick is-pressed">{t.quickStartLabel}<ArrowRight stroke={2.2} /></button>
            </Cell>
            <Cell state={t.stateDisabled}>
              <button type="button" className="purple-thick" disabled>{t.quickStartLabel}<ArrowRight stroke={2.2} /></button>
            </Cell>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.solidWhite} />
        <div className="stage">
          <div className="controlsSpecimens inv-row">
            <Cell state={t.stateDefault}>
              <button type="button" className="install-plugin">
                {t.installPluginLabel}
                <ArrowRight />
              </button>
            </Cell>
            <Cell state={t.statePressed}>
              <button type="button" className="install-plugin is-pressed">
                {t.installPluginLabel}
                <ArrowRight />
              </button>
            </Cell>
          </div>
        </div>
      </section>

      {/* Small white and Cancel share one row; each keeps its states on one line. */}
      <div className="inv-pair">
        <section>
          <SectionHeading title={t.smallWhite} />
          <div className="stage stage-row">
            <div className="inv-row-nowrap">
              <Cell state={t.stateDefault}>
                <button type="button" className="white-small">{t.skillUseLabel}</button>
              </Cell>
              <Cell state={t.statePressed}>
                <button type="button" className="white-small is-pressed">{t.skillUseLabel}</button>
              </Cell>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading title={t.cancel} />
          <div className="stage stage-row">
            <div className="inv-row-nowrap">
              <Cell state={t.stateDefault}>
                <button type="button" className="cancel-board">{t.cancelLabel}</button>
              </Cell>
              <Cell state={t.stateHover}>
                <button type="button" className="cancel-board is-hover">{t.cancelLabel}</button>
              </Cell>
              <Cell state={t.stateDisabled}>
                <button type="button" className="cancel-board" disabled>{t.cancelLabel}</button>
              </Cell>
            </div>
          </div>
        </section>
      </div>

      <section>
        <SectionHeading title={t.controlHeightLabel} />
        <div className="stage size-stage">
          <div className="size-rows">
            {SIZE_ROWS.map((row) => (
              <div className="size-row" key={row.heightClass}>
                <button type="button" className={`purple-thick ${row.heightClass}`}>
                  {t[row.labelKey]}
                </button>
                <div className={`size-dim ${row.heightClass}`}>
                  <span className="size-dim-line" aria-hidden="true" />
                  <span className="size-dim-label">{row.measure}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="size-table" role="table">
          <div className="size-table-head" role="row">
            <span role="columnheader">{t.controlHeightLabel}</span>
            <span role="columnheader">{t.sizeHeightCol}</span>
          </div>
          {SIZE_ROWS.map((row) => (
            <div className="size-table-row" role="row" key={`table-${row.heightClass}`}>
              <span role="cell">{t[row.labelKey]}</span>
              <span role="cell"><code>{row.measure}</code></span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ButtonInventory;
