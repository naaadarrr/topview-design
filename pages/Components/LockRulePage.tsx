import React from 'react';
import { Language, translations } from '../../translations';
import lockedSystem from '../../contracts/locked-system.json';
import LockSpecimens from './LockSpecimens';
import './lock-rule-page.css';

interface LockRulePageProps {
  language: Language;
  lockId: string;
  onNavigate?: (id: string, subId?: string) => void;
}

type Localized = { en: string; zh: string };

const loc = (value: Localized | string | undefined, language: Language): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] || value.en;
};

type TokenRow = { name: string; value: string; status: string; source?: string };
type StatusItem = {
  name?: string;
  status?: string;
  value?: Localized | string;
  en?: string;
  zh?: string;
  source?: string;
};
type RelatedItem = { id: string; status?: string; note?: Localized };
type ExampleItem = { id: string; specimen?: string; title: Localized; caption: Localized };

type LockPage = {
  hash: string;
  examples?: ExampleItem[];
  sizes?: TokenRow[];
  states?: StatusItem[] | { status?: string; items?: StatusItem[]; note?: Localized };
  usage?: { use?: Localized[]; notFor?: Localized[] };
  edgeCases?: { status?: string; items?: StatusItem[] };
  accessibility?: { status?: string; items?: StatusItem[] };
  api?: { status?: string; items?: StatusItem[] };
  related?: RelatedItem[];
};

type LockRecord = {
  id: string;
  title: Localized;
  what: Localized;
  whenToUse: Localized;
  tokens: TokenRow[];
  must?: Localized[];
  never?: Localized[];
  caveats?: { status?: string; en: string; zh: string }[];
  sources?: string[];
  siteSpecimenStatus?: string;
  page?: LockPage;
};

const SECTION_DEFS = [
  { id: 'definition', labelKey: 'definition' },
  { id: 'examples', labelKey: 'examples' },
  { id: 'sizes', labelKey: 'sizes' },
  { id: 'states', labelKey: 'states' },
  { id: 'usage', labelKey: 'usage' },
  { id: 'rules', labelKey: 'must' },
  { id: 'edge-cases', labelKey: 'edgeCases' },
  { id: 'accessibility', labelKey: 'accessibility' },
  { id: 'api', labelKey: 'api' },
  { id: 'tokens', labelKey: 'tokensHeading' },
  { id: 'related', labelKey: 'related' },
] as const;

const isPendingStatus = (status?: string) =>
  !status || status === 'pending' || status === '待定';

const LockRulePage: React.FC<LockRulePageProps> = ({ language, lockId, onNavigate }) => {
  const t = translations[language].rules;
  const lock = (lockedSystem.locks as LockRecord[]).find((item) => item.id === lockId);

  if (!lock || !lock.page) {
    return (
      <div className="max-w-3xl">
        <p className="text-[14px] leading-[20px] text-white/70">{t.pendingEmpty}</p>
      </div>
    );
  }

  const page = lock.page;
  const goOverview = () => onNavigate?.('components', 'components-rules');
  const goRelated = (id: string) => {
    const related = (lockedSystem.locks as LockRecord[]).find((item) => item.id === id);
    if (related?.page) onNavigate?.('components', `components-rules/${id}`);
  };

  return (
    <div className="lock-rule-page text-white pb-24">
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[13px] leading-[18px] text-amber-100 mb-10">
        {t.draftBanner}
      </div>

      <button
        type="button"
        onClick={goOverview}
        className="text-[13px] leading-[18px] text-white/45 hover:text-white mb-6"
      >
        {t.backToOverview}
      </button>

      <header className="mb-12">
        <div className="flex flex-wrap items-baseline gap-2 mb-3">
          <h1 className="text-[32px] md:text-[40px] leading-[1.15] font-heading tracking-tight">
            {loc(lock.title, language)}
          </h1>
          <span className="text-[11px] leading-[14px] text-white/45 font-mono">{lock.id}</span>
        </div>
        {lock.siteSpecimenStatus === 'column-removed-do-not-restore' && (
          <p className="text-[13px] leading-[18px] text-white/70">{t.alertBRemovedNote}</p>
        )}
      </header>

      <div className="lock-rule-layout">
        <div className="space-y-14 min-w-0">
          <section id="definition" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.definition}</h2>
            <p className="text-[16px] leading-[24px] text-white/90">{loc(lock.what, language)}</p>
          </section>

          <section id="examples" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.examples}</h2>
            {page.examples && page.examples.length > 0 ? (
              <div className="space-y-6">
                {page.examples.map((example) => (
                  <div key={example.id} className="space-y-3">
                    <h3 className="text-[15px] leading-[20px] font-semibold">
                      {loc(example.title, language)}
                    </h3>
                    <p className="text-[13px] leading-[18px] text-white/65">
                      {loc(example.caption, language)}
                    </p>
                  </div>
                ))}
                <LockSpecimens lockId={lock.id} language={language} />
              </div>
            ) : (
              <PendingNote label={t.pending} message={t.pendingEmpty} />
            )}
          </section>

          <section id="sizes" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.sizes}</h2>
            {page.sizes && page.sizes.length > 0 ? (
              <TokenTable rows={page.sizes} labels={t} />
            ) : (
              <PendingNote label={t.pending} message={t.pendingEmpty} />
            )}
          </section>

          <section id="states" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.states}</h2>
            <StateBlock states={page.states} language={language} labels={t} />
          </section>

          <section id="usage" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.usage}</h2>
            <UsageBlock usage={page.usage} language={language} labels={t} />
          </section>

          <section id="rules" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.must} / {t.never}</h2>
            <ListBlock label={t.must} items={(lock.must || []).map((item) => loc(item, language))} />
            <div className="mt-4">
              <ListBlock label={t.never} items={(lock.never || []).map((item) => loc(item, language))} />
            </div>
            {lock.caveats && lock.caveats.length > 0 && (
              <div className="mt-4">
                <ListBlock
                  label={t.caveats}
                  items={lock.caveats.map((item) => `${item.status ? `[${item.status}] ` : ''}${loc({ en: item.en, zh: item.zh }, language)}`)}
                />
              </div>
            )}
          </section>

          <section id="edge-cases" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.edgeCases}</h2>
            <StatusList block={page.edgeCases} language={language} labels={t} />
          </section>

          <section id="accessibility" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.accessibility}</h2>
            <StatusList block={page.accessibility} language={language} labels={t} />
          </section>

          <section id="api" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.api}</h2>
            <StatusList block={page.api} language={language} labels={t} />
          </section>

          <section id="tokens" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.tokensHeading}</h2>
            <TokenTable rows={lock.tokens} labels={t} />
          </section>

          <section id="related" className="lock-rule-section">
            <h2 className="lock-rule-kicker">{t.related}</h2>
            {page.related && page.related.length > 0 ? (
              <ul className="space-y-3">
                {page.related.map((item) => {
                  const relatedLock = (lockedSystem.locks as LockRecord[]).find((entry) => entry.id === item.id);
                  const canOpen = Boolean(relatedLock?.page);
                  return (
                    <li key={item.id} className="text-[14px] leading-[20px] text-white/80">
                      {canOpen ? (
                        <button
                          type="button"
                          onClick={() => goRelated(item.id)}
                          className="font-mono text-white/70 hover:text-white underline-offset-2 hover:underline"
                        >
                          {item.id}
                        </button>
                      ) : (
                        <span className="font-mono text-white/45">{item.id}</span>
                      )}
                      {item.status ? (
                        <span className="text-white/40"> · {item.status === 'pending' ? t.pending : item.status}</span>
                      ) : null}
                      {item.note ? <p className="mt-1 text-white/70">{loc(item.note, language)}</p> : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <PendingNote label={t.pending} message={t.pendingEmpty} />
            )}
          </section>

          <section className="lock-rule-section">
            <ListBlock label={t.sources} items={lock.sources || []} />
          </section>
        </div>

        <nav className="lock-rule-toc" aria-label={t.onThisPage}>
          <div className="text-[11px] leading-[14px] uppercase tracking-wide text-white/45 mb-2">
            {t.onThisPage}
          </div>
          {SECTION_DEFS.map((section) => (
            <button
              key={section.id}
              type="button"
              className="text-left"
              onClick={() =>
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              {section.id === 'rules' ? `${t.must} / ${t.never}` : t[section.labelKey]}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const PendingNote: React.FC<{ label: string; message: string }> = ({ label, message }) => (
  <p className="text-[14px] leading-[20px] text-white/60">
    <span className="font-medium text-white/80">{label}</span>
    {' — '}
    {message}
  </p>
);

const ListBlock: React.FC<{ label: string; items: string[] }> = ({ label, items }) => {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-[13px] leading-[18px] font-semibold text-white/80 mb-1">{label}</h3>
      <ul className="list-disc pl-5 space-y-1 text-[13px] leading-[18px] text-white/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const TokenTable: React.FC<{
  rows: TokenRow[];
  labels: { token: string; value: string; status: string; source: string };
}> = ({ rows, labels }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-[12px] leading-[16px] border-collapse">
      <thead>
        <tr className="text-white/45">
          <th className="font-medium py-1 pr-3 align-top">{labels.token}</th>
          <th className="font-medium py-1 pr-3 align-top">{labels.value}</th>
          <th className="font-medium py-1 pr-3 align-top">{labels.status}</th>
          <th className="font-medium py-1 align-top">{labels.source}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} className="border-t border-white/10 align-top">
            <td className="py-2 pr-3 text-white/80 whitespace-nowrap">{row.name}</td>
            <td className="py-2 pr-3 font-mono text-white/90 break-all">{row.value}</td>
            <td className="py-2 pr-3 text-white/55 whitespace-nowrap">{row.status}</td>
            <td className="py-2 text-white/45 break-words">{row.source || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StateBlock: React.FC<{
  states?: StatusItem[] | { status?: string; items?: StatusItem[]; note?: Localized };
  language: Language;
  labels: { pending: string; pendingEmpty: string; status: string };
}> = ({ states, language, labels }) => {
  if (!states) return <PendingNote label={labels.pending} message={labels.pendingEmpty} />;
  if (Array.isArray(states)) {
    return <StateList items={states} language={language} labels={labels} />;
  }
  return (
    <div className="space-y-3">
      {isPendingStatus(states.status) && (!states.items || states.items.length === 0) && (
        <PendingNote label={labels.pending} message={labels.pendingEmpty} />
      )}
      {states.note ? (
        <p className="text-[14px] leading-[20px] text-white/70">{loc(states.note, language)}</p>
      ) : null}
      {states.items && states.items.length > 0 ? (
        <StateList items={states.items} language={language} labels={labels} />
      ) : null}
    </div>
  );
};

const StateList: React.FC<{
  items: StatusItem[];
  language: Language;
  labels: { pending: string };
}> = ({ items, language, labels }) => (
  <ul className="space-y-4">
    {items.map((item, index) => (
      <li key={item.name || item.en || String(index)} className="text-[14px] leading-[20px]">
        <div className="flex flex-wrap items-baseline gap-2">
          {item.name ? <span className="font-semibold">{item.name}</span> : null}
          {item.status ? (
            <span className="text-[11px] leading-[14px] text-white/45">
              {isPendingStatus(item.status) ? labels.pending : item.status}
            </span>
          ) : null}
        </div>
        <p className="text-white/75 mt-1">
          {typeof item.value === 'string' || (item.value && typeof item.value === 'object' && ('en' in item.value || 'zh' in item.value))
            ? loc(item.value as Localized | string, language)
            : loc({ en: item.en || '', zh: item.zh || '' }, language)}
        </p>
        {item.source ? <p className="text-[12px] leading-[16px] text-white/40 mt-1">{item.source}</p> : null}
      </li>
    ))}
  </ul>
);

const UsageBlock: React.FC<{
  usage?: { use?: Localized[]; notFor?: Localized[] };
  language: Language;
  labels: { usageUse: string; usageNotFor: string; pending: string; pendingEmpty: string };
}> = ({ usage, language, labels }) => {
  if (!usage || (!(usage.use && usage.use.length) && !(usage.notFor && usage.notFor.length))) {
    return <PendingNote label={labels.pending} message={labels.pendingEmpty} />;
  }
  return (
    <div className="space-y-4">
      {usage.use && usage.use.length > 0 && (
        <ListBlock label={labels.usageUse} items={usage.use.map((item) => loc(item, language))} />
      )}
      {usage.notFor && usage.notFor.length > 0 && (
        <ListBlock label={labels.usageNotFor} items={usage.notFor.map((item) => loc(item, language))} />
      )}
    </div>
  );
};

const StatusList: React.FC<{
  block?: { status?: string; items?: StatusItem[] };
  language: Language;
  labels: { pending: string; pendingEmpty: string };
}> = ({ block, language, labels }) => {
  const items = block?.items || [];
  const onlyPending = isPendingStatus(block?.status) && items.length === 0;
  if (!block || onlyPending) {
    return <PendingNote label={labels.pending} message={labels.pendingEmpty} />;
  }
  return (
    <div className="space-y-3">
      {isPendingStatus(block.status) && items.length === 0 && (
        <PendingNote label={labels.pending} message={labels.pendingEmpty} />
      )}
      {items.map((item, index) => (
        <div key={item.en || item.name || String(index)} className="text-[14px] leading-[20px]">
          <div className="flex flex-wrap items-baseline gap-2">
            {item.name ? <span className="font-semibold">{item.name}</span> : null}
            {item.status ? (
              <span className="text-[11px] leading-[14px] text-white/45">
                {isPendingStatus(item.status) ? labels.pending : item.status}
              </span>
            ) : null}
          </div>
          <p className="text-white/75 mt-1">
            {loc(item.value || { en: item.en || '', zh: item.zh || '' }, language)}
          </p>
          {item.source ? <p className="text-[12px] leading-[16px] text-white/40 mt-1">{item.source}</p> : null}
        </div>
      ))}
    </div>
  );
};

export default LockRulePage;
