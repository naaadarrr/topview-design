import React from 'react';
import { Language, translations } from '../../translations';
import Controls from './Controls';
import Rules from './Rules';
import Overlays from './Overlays';
import ButtonInventory from './ButtonInventory';
import Display from './Display';
import Feedback from './Feedback';
import LockRulePage from './LockRulePage';
import lockedSystem from '../../contracts/locked-system.json';
import { isHiddenSection } from '../../constants';

interface ComponentsPageProps {
  language: Language;
  activeSubId?: string | null;
  onNavigate?: (id: string, subId?: string) => void;
}

const ComponentsPage: React.FC<ComponentsPageProps> = ({ language, activeSubId, onNavigate }) => {
  const t = translations[language].components;
  const lockId = activeSubId?.startsWith('components-rules/')
    ? activeSubId.slice('components-rules/'.length)
    : null;
  // Rules and the lock rule pages are hidden while 'components-rules' is in HIDDEN_SECTIONS (constants.tsx).
  const showRules = !isHiddenSection('components-rules');
  const isLockPage = Boolean(
    showRules && lockId && lockedSystem.locks.some((lock) => lock.id === lockId)
  );

  if (isLockPage && lockId) {
    return (
      <LockRulePage
        language={language}
        lockId={lockId}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="max-w-full text-white space-y-32 pb-40">
      <section className="fade-in scroll-mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6 w-full">
          <h1 className="site-h1">
            {t.title}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {t.desc}
          </p>
        </div>
      </section>

      {showRules ? (
        <section id="components-rules" className="fade-in scroll-mt-8" style={{ animationDelay: '0.08s' }}>
          <div className="mb-12">
            <h2 className="text-[44px] md:text-[56px] leading-[1.1] md:leading-[72px] font-heading tracking-tight">
              {t.rules}
            </h2>
          </div>
          <Rules language={language} onNavigate={onNavigate} />
        </section>
      ) : null}

      <section id="components-controls" className="fade-in scroll-mt-8" style={{ animationDelay: '0.12s' }}>
        <div className="mb-12">
          <h2 className="site-h2">
            {t.controls}
          </h2>
        </div>
        <Controls language={language} />
      </section>

      <section id="components-button" className="fade-in scroll-mt-8" style={{ animationDelay: '0.18s' }}>
        <div className="mb-12">
          <h2 className="site-h2">
            {t.buttons}
          </h2>
        </div>
        <ButtonInventory language={language} />
      </section>

      <section id="components-overlays" className="fade-in scroll-mt-8" style={{ animationDelay: '0.16s' }}>
        <div className="mb-12">
          <h2 className="site-h2">
            {t.overlays}
          </h2>
        </div>
        <Overlays language={language} />
      </section>

      <section id="components-display" className="fade-in scroll-mt-8" style={{ animationDelay: '0.16s' }}>
        <div className="mb-12">
          <h2 className="site-h2">
            {t.display}
          </h2>
        </div>
        <Display language={language} />
      </section>

      <section id="components-feedback" className="fade-in scroll-mt-8" style={{ animationDelay: '0.16s' }}>
        <div className="mb-12">
          <h2 className="site-h2">
            {t.feedback}
          </h2>
        </div>
        <Feedback language={language} />
      </section>
    </div>
  );
};

export default ComponentsPage;
