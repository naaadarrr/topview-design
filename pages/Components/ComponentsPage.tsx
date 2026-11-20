import React from 'react';
import { Language, translations } from '../../translations';
import Controls from './Controls';
import Rules from './Rules';
import Overlays from './Overlays';
import ButtonInventory, { ButtonInstall } from './ButtonInventory';
import Display from './Display';
import Feedback from './Feedback';
import LockRulePage from './LockRulePage';
import lockedSystem from '../../contracts/locked-system.json';
import { isHiddenSection } from '../../constants';

interface ComponentsPageProps {
  language: Language;
  page: string;
  activeSubId?: string | null;
  onNavigate?: (id: string, subId?: string) => void;
}

const PageHeader: React.FC<{ title: string; line?: string }> = ({ title, line }) => (
  <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
    <h1 className="site-h1">{title}</h1>
    {line ? (
      <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
        {line}
      </p>
    ) : null}
  </div>
);

const ComponentsPage: React.FC<ComponentsPageProps> = ({ language, page, activeSubId, onNavigate }) => {
  const t = translations[language].components;
  const lockId = activeSubId?.startsWith('components-rules/')
    ? activeSubId.slice('components-rules/'.length)
    : null;
  // Rules and the lock rule pages are hidden while 'components-rules' is in HIDDEN_SECTIONS (constants.tsx).
  const showRules = !isHiddenSection('components-rules');
  const isLockPage = Boolean(
    showRules && page === 'components-rules' && lockId && lockedSystem.locks.some((lock) => lock.id === lockId)
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

  const pages: Record<string, { title: string; line?: string; body: React.ReactNode }> = {
    'components-rules': {
      title: t.rules,
      body: <Rules language={language} onNavigate={onNavigate} />,
    },
    'components-controls': {
      title: t.controls,
      line: t.formsLine,
      body: <Controls language={language} />,
    },
    'components-button': {
      title: t.buttons,
      line: translations[language].buttonInventory.pageLine,
      body: <ButtonInventory language={language} />,
    },
    'components-overlays': {
      title: t.overlays,
      line: translations[language].overlays.pageLine,
      body: <Overlays language={language} />,
    },
    'components-display': {
      title: t.display,
      line: translations[language].display.pageLine,
      body: <Display language={language} />,
    },
    'components-feedback': {
      title: t.feedback,
      line: translations[language].feedback.pageLine,
      body: <Feedback language={language} />,
    },
  };

  const current = pages[page] ?? pages['components-controls'];

  const showButtonInstall = page === 'components-button';

  return (
    <div className="max-w-full text-white space-y-16 pb-40">
      <div className={showButtonInstall ? 'button-page-intro' : undefined}>
        <PageHeader title={current.title} line={current.line} />
        {showButtonInstall ? <ButtonInstall language={language} /> : null}
      </div>
      <div className="fade-in">{current.body}</div>
    </div>
  );
};

export default ComponentsPage;
