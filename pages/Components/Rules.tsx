import React from 'react';
import { Language, translations } from '../../translations';
import lockedSystem from '../../contracts/locked-system.json';

interface RulesProps {
  language: Language;
  onNavigate?: (id: string, subId?: string) => void;
}

type Localized = { en: string; zh: string };

const loc = (value: Localized | string | undefined, language: Language): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] || value.en;
};

const Rules: React.FC<RulesProps> = ({ language, onNavigate }) => {
  const t = translations[language].rules;

  return (
    <div className="space-y-16 max-w-3xl">
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[13px] leading-[18px] text-amber-100">
        {t.draftBanner}
      </div>

      <section className="space-y-4">
        <h3 className="text-[20px] leading-[26px] font-heading tracking-tight">{t.lockedHeading}</h3>
        <div className="space-y-12">
          {lockedSystem.locks.map((lock) => (
            <article key={lock.id} id={`rules-${lock.id}`} className="scroll-mt-8 space-y-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <h4 className="text-[16px] leading-[22px] font-semibold">{loc(lock.title, language)}</h4>
                <span className="text-[12px] leading-[16px] text-white/45 font-mono">{lock.id}</span>
                {lock.page?.hash && (
                  <button
                    type="button"
                    onClick={() => onNavigate?.('components', `components-rules/${lock.id}`)}
                    className="text-[12px] leading-[16px] text-white/55 hover:text-white"
                  >
                    {t.openRulePage}
                  </button>
                )}
              </div>
              {!lock.onDesignSystemSite && lock.siteSpecimenStatus === 'column-removed-do-not-restore' && (
                <p className="text-[13px] leading-[18px] text-white/70">{t.alertBRemovedNote}</p>
              )}
              <RuleBlock label={t.what}>{loc(lock.what, language)}</RuleBlock>
              <RuleBlock label={t.when}>{loc(lock.whenToUse, language)}</RuleBlock>
              <TokenTable tokens={lock.tokens} language={language} labels={t} />
              <ListBlock label={t.must} items={(lock.must || []).map((item) => loc(item, language))} />
              <ListBlock label={t.never} items={(lock.never || []).map((item) => loc(item, language))} />
              {lock.caveats && lock.caveats.length > 0 && (
                <ListBlock
                  label={t.caveats}
                  items={lock.caveats.map((item) => loc({ en: item.en, zh: item.zh }, language))}
                />
              )}
              <ListBlock label={t.sources} items={lock.sources || []} />
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[20px] leading-[26px] font-heading tracking-tight">{t.productLockHeading}</h3>
        {lockedSystem.productLocksNotOnSite.map((item) => (
          <article key={item.id} id={`rules-${item.id}`} className="scroll-mt-8 space-y-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <h4 className="text-[16px] leading-[22px] font-semibold">{loc(item.title, language)}</h4>
              <span className="text-[12px] leading-[16px] text-white/45 font-mono">{item.id}</span>
            </div>
            <p className="text-[14px] leading-[20px] text-white/80">{loc(item.summary, language)}</p>
            {(item.families || []).map((fam) => (
              <div key={fam.id} className="space-y-2">
                <h5 className="text-[13px] leading-[18px] font-semibold text-white/90">{loc(fam.title, language)}</h5>
                <TokenTable tokens={fam.tokens} language={language} labels={t} />
              </div>
            ))}
            <ListBlock label={t.must} items={(item.must || []).map((entry) => loc(entry, language))} />
            <ListBlock label={t.never} items={(item.never || []).map((entry) => loc(entry, language))} />
            <ListBlock label={t.sources} items={item.sources || []} />
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="text-[20px] leading-[26px] font-heading tracking-tight">{t.pendingHeading}</h3>
        <div className="space-y-6">
          {lockedSystem.pending.map((item) => (
            <article key={item.id} className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h4 className="text-[15px] leading-[20px] font-semibold">{loc(item.title, language)}</h4>
                <span className="text-[12px] leading-[16px] text-white/45 font-mono">{item.id}</span>
              </div>
              <p className="text-[13px] leading-[18px] text-white/70">{loc(item.detail, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[20px] leading-[26px] font-heading tracking-tight">{t.excludedHeading}</h3>
        <ul className="space-y-2 text-[13px] leading-[18px] text-white/70">
          {lockedSystem.excludedFromFormalContract.map((item) => (
            <li key={item.id}>
              <span className="font-mono text-white/45">{item.id}</span>
              {item.siteHash ? <span className="text-white/40"> · {item.siteHash}</span> : null}
              <span> — {item.reason}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const RuleBlock: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <h5 className="text-[12px] leading-[16px] text-white/45 mb-1">{label}</h5>
    <p className="text-[14px] leading-[20px] text-white/85">{children}</p>
  </div>
);

const ListBlock: React.FC<{ label: string; items: string[] }> = ({ label, items }) => {
  if (!items.length) return null;
  return (
    <div>
      <h5 className="text-[12px] leading-[16px] text-white/45 mb-1">{label}</h5>
      <ul className="list-disc pl-5 space-y-1 text-[13px] leading-[18px] text-white/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const TokenTable: React.FC<{
  tokens: { name: string; value: string; status: string; source: string }[];
  language: Language;
  labels: { token: string; value: string; status: string; source: string };
}> = ({ tokens, labels }) => (
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
        {tokens.map((token) => (
          <tr key={token.name} className="border-t border-white/10 align-top">
            <td className="py-2 pr-3 text-white/80 whitespace-nowrap">{token.name}</td>
            <td className="py-2 pr-3 font-mono text-white/90 break-all">{token.value}</td>
            <td className="py-2 pr-3 text-white/55 whitespace-nowrap">{token.status}</td>
            <td className="py-2 text-white/45 break-words">{token.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Rules;
