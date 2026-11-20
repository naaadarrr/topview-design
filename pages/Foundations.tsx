import React from 'react';
import { Language, translations } from '../translations';
import { RADIUS_SCALE, SPACING_SCALE, radiusPx, spacingPx } from '../constants/foundationTokens';
import './foundations-specimens.css';

interface FoundationsProps {
  language: Language;
  section: 'spacing' | 'radius';
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

type Duty = { name: string; value: string; used: string };

// Spacing sources: aigc-web-turbo origin/develop b0c5a29. Paths are relative to apps/base/src.
const SRC = {
  globalCss: 'app/global.css',
  panel: 'app/board/[id]/components/ToolPanel/constants/panelOverlay.ts',
  formSection: 'app/board/[id]/components/ToolPanel/components/primitives/FormSection.tsx',
  generate: 'app/board/[id]/components/ToolPanel/components/primitives/GenerateButton.tsx',
  presetToolbar: 'app/board/[id]/components/ToolPanel/components/CreativePresets/PresetToolbar.tsx',
};

type SpaceToken = { token: string; px: number };
type RhythmRow = { where: string; token?: string; px?: number; pending?: string };

const Foundations: React.FC<FoundationsProps> = ({ language, section }) => {
  const s = translations[language].spacing;
  const r = translations[language].radius;

  // Same list as index.css :root. Product names appear only as sources.
  const spacingScale: SpaceToken[] = SPACING_SCALE.map((item) => ({ token: item.token, px: item.px }));

  const spacingRhythm: RhythmRow[] = [
    { where: s.levelInline, token: '--spacing-03', px: spacingPx('--spacing-03') },
    { where: s.levelInset, token: '--spacing-04', px: spacingPx('--spacing-04') },
    { where: s.levelGroup, token: '--spacing-04', px: spacingPx('--spacing-04'), pending: s.levelGroupPending },
    { where: s.levelStack, token: '--spacing-05', px: spacingPx('--spacing-05') },
    { where: s.levelSection, pending: s.pending },
    { where: s.levelModule, token: '--spacing-08', px: spacingPx('--spacing-08') },
  ];

  const radiusNames: Record<(typeof RADIUS_SCALE)[number]['token'], string> = {
    '--radius-01': r.scaleTab,
    '--radius-02': r.scaleButton,
    '--radius-03': r.scaleSegmentItem,
    '--radius-04': r.scaleItem,
    '--radius-05': r.scalePanel,
    '--radius-pill': r.scalePill,
  };
  const radiusScale = RADIUS_SCALE.map((item) => ({
    token: item.token,
    name: radiusNames[item.token],
    value: item.token === '--radius-pill' ? `${r.pillValue} (${item.px}px)` : `${item.px}px`,
    radius: `${item.px}px`,
  }));

  const radiusDuties: Duty[] = [
    { name: r.dutyTooltip, value: `--radius-01 · ${radiusPx('--radius-01')}px`, used: r.dutyTooltipUsed },
    { name: r.dutyTab, value: `--radius-01 · ${radiusPx('--radius-01')}px`, used: r.dutyTabUsed },
    { name: r.dutyButton, value: `--radius-02 · ${radiusPx('--radius-02')}px`, used: r.dutyButtonUsed },
    { name: r.dutyIcon, value: `--radius-02 · ${radiusPx('--radius-02')}px`, used: r.dutyIconUsed },
    { name: r.dutyMenuItem, value: r.pending, used: r.dutyMenuItemUsed },
    { name: r.dutySegmentItem, value: `--radius-03 · ${radiusPx('--radius-03')}px`, used: r.dutySegmentItemUsed },
    { name: r.dutyItem, value: `--radius-04 · ${radiusPx('--radius-04')}px`, used: r.dutyItemUsed },
    { name: r.dutySegmentTrack, value: `--radius-04 · ${radiusPx('--radius-04')}px`, used: r.dutySegmentTrackUsed },
    { name: r.dutyPanel, value: `--radius-05 · ${radiusPx('--radius-05')}px`, used: r.dutyPanelUsed },
    { name: r.dutyPill, value: r.pending, used: r.dutyPillUsed },
    { name: r.dutyToast, value: r.pending, used: r.dutyToastUsed },
    { name: r.dutySheet, value: r.pending, used: r.dutySheetUsed },
  ];

  return (
    <div className="foundationsSpecimens max-w-full text-white space-y-16 pb-40 overflow-x-hidden">
      {section === 'spacing' ? (
      <section id="spacing" className="fade-in scroll-mt-8 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          <h1 className="site-h1">
            {s.title}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {s.pageLine}
          </p>
        </div>

        <div>
          <SectionHeading title={s.scaleLabel.replace('{n}', String(spacingScale.length))} />
          <div className="space-table">
            <div className="space-table-head space-scale-grid">
              <span>{s.colScaleToken}</span>
              <span>{s.colRem}</span>
              <span>{s.colPx}</span>
              <span>{s.colExample}</span>
            </div>
            {spacingScale.map((item) => (
              <div key={item.token} className="space-table-row space-scale-grid">
                <span className="space-token-cell">
                  <code className="space-token">{item.token}</code>
                </span>
                <span className="space-value">{item.px / 16}</span>
                <span className="space-value">{item.px}</span>
                <span className="space-example">
                  <span className="space-swatch" style={{ width: item.px, height: item.px }} />
                </span>
              </div>
            ))}
          </div>
          <p className="note mt-4">{s.scaleNote}</p>
        </div>

        <div>
          <SectionHeading title={s.rhythmLabel} />
          <div className="space-table">
            <div className="space-table-head space-rhythm-grid">
              <span>{s.colWhere}</span>
              <span>{s.colSpace}</span>
            </div>
            {spacingRhythm.map((row) => (
              <div key={row.where} className="space-table-row space-rhythm-grid">
                <span className="space-where">{row.where}</span>
                <span className="space-rhythm-cell">
                  {row.token ? <code className="space-token">{row.token}</code> : null}
                  {row.px != null ? <span className="space-value">{row.px}px</span> : null}
                  {row.pending ? <span className="space-flag">{row.pending}</span> : null}
                </span>
              </div>
            ))}
          </div>
          <p className="note mt-4">{s.rhythmNote}</p>
        </div>

        <div>
          <SectionHeading title={s.nestLabel} />
          <p className="space-rule">{s.nestRule}</p>
          <div className="stage space-nest-stage">
            <div className="space-nest-outer">
              <span className="space-nest-tag">{s.nestOuter}</span>
              <span className="space-pad is-top">--spacing-05 · 16</span>
              <span className="space-pad is-right">--spacing-05 · 16</span>
              <span className="space-pad is-bottom">--spacing-05 · 16</span>
              <span className="space-pad is-left">--spacing-05 · 16</span>
              <div className="space-nest-inner">
                <span className="space-nest-tag">{s.nestInner}</span>
                <span className="space-pad is-top">--spacing-04 · 12</span>
                <span className="space-pad is-right">--spacing-04 · 12</span>
                <span className="space-pad is-bottom">--spacing-04 · 12</span>
                <span className="space-pad is-left">--spacing-04 · 12</span>
                <div className="space-nest-content">
                  <span className="space-nest-icon" />
                  <span className="space-nest-gap">--spacing-03 · 8</span>
                  <span className="space-nest-text">{s.nestContent}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-table mt-4">
            <div className="space-table-head space-nest-grid">
              <span>{s.colWhere}</span>
              <span>{s.colSpace}</span>
              <span>{s.colSource}</span>
            </div>
            {[
              { part: s.nestOuter, value: `--spacing-05 · 16 · ${s.allSides}`, source: `${SRC.formSection} p-4` },
              { part: s.nestInner, value: `--spacing-04 · 12 · ${s.allSides}`, source: `${SRC.globalCss} --panel-overlay-inset; p-panel-overlay in ${SRC.presetToolbar}` },
              { part: s.nestContent, value: '--spacing-03 · 8', source: `${SRC.generate} gap-2` },
            ].map((row) => (
              <div key={row.part} className="space-table-row space-nest-grid">
                <span className="space-where">{row.part}</span>
                <span className="space-value">{row.value}</span>
                <span className="space-source">{row.source}</span>
              </div>
            ))}
          </div>
          <p className="note mt-4">{s.nestNote}</p>
        </div>

      </section>
      ) : (
      <section id="radius" className="fade-in scroll-mt-8 space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          <h1 className="site-h1">
            {r.title}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {r.pageLine}
          </p>
        </div>

        <div>
          <SectionHeading title={r.scaleLabel} />
          <div className="space-table radius-table">
            <div className="space-table-head space-radius-grid">
              <span>{s.colScaleToken}</span>
              <span>{r.colValue}</span>
              <span>{r.colUse}</span>
              <span>{s.colExample}</span>
            </div>
            {radiusScale.map((item) => (
              <div key={item.token} className="space-table-row space-radius-grid">
                <span className="space-token-cell">
                  <code className="space-token">{item.token}</code>
                </span>
                <span className="space-value">{item.value}</span>
                <span className="space-where">{item.name}</span>
                <span className="space-example">
                  <span className="space-swatch radius-swatch" style={{ borderRadius: item.radius }} />
                </span>
              </div>
            ))}
          </div>
          <p className="note mt-4">{r.scaleNote}</p>
        </div>

        <div>
          <SectionHeading title={r.dutyLabel} />
          <div className="space-table radius-table">
            <div className="space-table-head space-radius-duty-grid">
              <span>{s.colWhere}</span>
              <span>{r.colRadius}</span>
              <span>{s.colSource}</span>
            </div>
            {radiusDuties.map((item) => (
              <div key={item.name} className="space-table-row space-radius-duty-grid">
                <span className="space-where">{item.name}</span>
                <span className="space-value">{item.value}</span>
                <span className="space-source">{item.used}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default Foundations;
