import React, { useEffect, useRef, useState } from 'react';
import { Language, translations } from '../../translations';
import './overlays-specimens.css';
import './glass-specimens.css';
import '../../registry/button.css';
import Hover from './Hover';
import DropdownMenu from './DropdownMenu';

interface OverlaysProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

// Specimen field text only, not a token. Matches a typical Shared Assets target.name
// so Save stays disabled until the value differs, as canRenameSharedAsset requires.
const DIALOG_NAME_INITIAL = 'Asset';

const Overlays: React.FC<OverlaysProps> = ({ language }) => {
  const t = translations[language].overlays;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogName, setDialogName] = useState(DIALOG_NAME_INITIAL);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dialogSaveDisabled =
    dialogName.trim().length === 0 || dialogName.trim() === DIALOG_NAME_INITIAL;

  useEffect(() => {
    if (!popoverOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopoverOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPopoverOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [popoverOpen]);

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogName(DIALOG_NAME_INITIAL);
  };

  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dialogOpen]);

  return (
    <div className="overlaySpecimens space-y-24">
      <section>
        <SectionHeading title={t.popover} />
        <div className="stage is-popover">
          <div className="popover-wrap" ref={popoverRef}>
            <button
              type="button"
              className="cancel-board"
              aria-expanded={popoverOpen}
              aria-haspopup="dialog"
              onClick={() => setPopoverOpen((open) => !open)}
            >
              {t.popoverTrigger}
            </button>
            {popoverOpen ? (
              <div className="share-panel" role="dialog" aria-label={t.popoverTitle}>
                <div className="share-head">
                  <p className="share-title">{t.popoverTitle}</p>
                  <p className="share-desc">{t.popoverDescription}</p>
                </div>
                <div className="share-link">
                  <input readOnly value={t.popoverLink} aria-label={t.popoverLink} />
                  <button
                    type="button"
                    className="share-copy"
                    onClick={() => {
                      const write = navigator.clipboard?.writeText(t.popoverLink);
                      if (write) {
                        write.then(() => {
                          setCopied(true);
                          window.setTimeout(() => setCopied(false), 1500);
                        }).catch(() => {});
                      }
                    }}
                  >
                    {copied ? t.popoverCopied : t.popoverCopy}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.tooltip} />
        <div className="glassSpecimens">
          <div className="stage is-tooltip">
            <div className="tt-wrap">
              <div className="tt" role="tooltip">
                {t.tooltipBody}
              </div>
              <button type="button" className="overlay-trigger">
                {t.tooltipTrigger}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hover card: the product hover light (formerly the Hover page). */}
      <section id="overlays-hover-card" className="scroll-mt-8">
        <SectionHeading title={t.hoverCard} />
        <Hover language={language} />
      </section>

      <section>
        <SectionHeading title={t.dialog} />
        <div className="stage">
          <button type="button" className="overlay-trigger" onClick={() => setDialogOpen(true)}>
            {t.dialogTrigger}
          </button>
          {dialogOpen ? (
            <>
              <button
                type="button"
                className="dialog-dim"
                aria-label={t.close}
                onClick={closeDialog}
              />
              <div className="dialog-layer">
                <form
                  className="dialog-panel"
                  role="dialog"
                  aria-labelledby="overlays-dialog-title"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!dialogSaveDisabled) closeDialog();
                  }}
                >
                  <h4 id="overlays-dialog-title" className="dialog-title">
                    {t.dialogTitle}
                  </h4>
                  <label className="dialog-field">
                    {t.dialogNameLabel}
                    <input
                      autoFocus
                      value={dialogName}
                      maxLength={256}
                      onChange={(event) => setDialogName(event.target.value)}
                      className="dialog-input"
                    />
                  </label>
                  <div className="dialog-footer">
                    <button type="button" className="dialog-cancel" onClick={closeDialog}>
                      {t.dialogCancel}
                    </button>
                    <button type="submit" className="dialog-save" disabled={dialogSaveDisabled}>
                      {t.dialogSave}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section id="overlays-menu" className="scroll-mt-8">
        <SectionHeading title={translations[language].components.menu} />
        <DropdownMenu language={language} />
      </section>
    </div>
  );
};

export default Overlays;
