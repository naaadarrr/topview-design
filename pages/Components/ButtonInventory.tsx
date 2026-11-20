import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Language, translations } from '../../translations';
import './controls-specimens.css';
import './button-inventory.css';

export const BUTTON_PROMPT = `Add a Topview button to this project. Read https://raw.githubusercontent.com/naaadarrr/topview-design/main/registry/button.tsx and https://raw.githubusercontent.com/naaadarrr/topview-design/main/registry/button.css. Copy that component. Use only the variants it defines. Do not invent new ones.`;

export const ButtonInstall: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].buttonInventory;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BUTTON_PROMPT);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="prompt-copy" onClick={copy}>
      {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
      {copied ? t.copiedCommand : t.copyCommand}
    </button>
  );
};

interface ButtonInventoryProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

const VARIANTS = [
  { id: 'cta-primary', className: 'product-cta cta-primary' },
  { id: 'cta-white', className: 'product-cta cta-white' },
  { id: 'neutral-board', className: 'product-button board-type neutral-board' },
  { id: 'outline-board', className: 'cancel-board' },
  { id: 'ghost-board', className: 'product-button board-type ghost-board' },
  { id: 'danger-board', className: 'product-button board-type danger-board' },
  { id: 'auth-link', className: 'product-button auth-link' },
];

const SIZE_ROWS = [
  { labelKey: 'ctrlSmall' as const, heightClass: 'size-h32', measure: '32 / 2' },
  { labelKey: 'ctrlMedium' as const, heightClass: 'size-h36', measure: '36 / 2.25' },
  { labelKey: 'ctrlLarge' as const, heightClass: 'size-h40', measure: '40 / 2.5' },
];

const ButtonInventory: React.FC<ButtonInventoryProps> = ({ language }) => {
  const t = translations[language].buttonInventory;

  return (
    <div className="buttonInventory space-y-24">
      <section>
        <SectionHeading title={t.variants} />
        <div className="stage">
          <div className="controlsSpecimens inv-row">
            {VARIANTS.map((variant) => (
              <span className="inv-slot" key={variant.id} data-variant={variant.id}>
                <button type="button" className={variant.className}>Button</button>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.groupTitle} />
        <div className="stage">
          <div className="button-group">
            <button type="button" className="product-button board-type neutral-board">Button</button>
            <button type="button" className="product-cta cta-white">Button</button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.controlHeightLabel} />
        <div className="stage size-stage">
          <div className="size-rows">
            {SIZE_ROWS.map((row) => (
              <div className="size-row" key={row.heightClass}>
                <button type="button" className={`product-cta cta-primary ${row.heightClass}`}>
                  Button
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
