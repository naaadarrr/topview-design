import React, { useEffect, useState } from 'react';
import { Language, translations } from '../translations';
import { DURATION_SCALE } from '../constants/foundationTokens';
import './foundations-specimens.css';
import './motion-specimens.css';

interface MotionProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">{title}</h3>
);

const LayoutIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" aria-hidden="true">
    <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="1" />
    <path d="M1.75 6.08h12.5M1.75 9.92h12.5M6.5 2.25v3.83M10 6.08v3.84M5.5 9.92v3.83" />
  </svg>
);

const Motion: React.FC<MotionProps> = ({ language }) => {
  const t = translations[language].motion;
  const [on, setOn] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      setOn(true);
      return;
    }
    const id = window.setInterval(() => setOn((value) => !value), 1400);
    return () => window.clearInterval(id);
  }, []);

  const durations = [
    { token: DURATION_SCALE[0].token, time: `${DURATION_SCALE[0].ms}ms`, used: t.fastUsed },
    { token: DURATION_SCALE[1].token, time: `${DURATION_SCALE[1].ms}ms`, used: t.baseUsed },
    { token: DURATION_SCALE[2].token, time: `${DURATION_SCALE[2].ms}ms`, used: t.slowUsed },
  ];

  const jobs = [
    { job: t.jobPlate, token: '--dur-fast', moves: t.jobPlateMoves },
    { job: t.jobEdge, token: '--dur-base', moves: t.jobEdgeMoves },
    { job: t.jobEnter, token: '--dur-slow', moves: t.jobEnterMoves },
  ];

  return (
    <div className="motionSpecimens max-w-full text-white space-y-16 pb-40 overflow-x-hidden">
      <section className="fade-in scroll-mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          <h1 className="site-h1">{t.title}</h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {t.pageLine}
          </p>
        </div>
      </section>

      <section>
        <SectionHeading title={t.durations} />
        <div className="foundationsSpecimens">
          <div className="space-table">
            <div className="space-table-head motion-dur-grid">
              <span>{t.colToken}</span>
              <span>{t.colTime}</span>
              <span>{t.colUsed}</span>
            </div>
            {durations.map((row) => (
              <div className="space-table-row motion-dur-grid" key={row.token}>
                <span className="space-token-cell">
                  <code className="space-token">{row.token}</code>
                </span>
                <span className="space-value">{row.time}</span>
                <span className="space-where">{row.used}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`stage${on ? ' is-on' : ''}`}>
          <div className="motion-live">
            <figure>
              <code>--dur-fast</code>
              <div className="motion-zoom">
                <div className="motion-icon is-play" aria-hidden="true">
                  <span className="motion-plate" />
                  <LayoutIcon />
                </div>
              </div>
            </figure>
            <figure>
              <code>--dur-base</code>
              <div className="motion-edge" aria-hidden="true" />
            </figure>
            <figure>
              <code>--dur-slow</code>
              <div className="motion-enter" aria-hidden="true" />
            </figure>
            <figure>
              <div className="state-label">{t.hoverLabel}</div>
              <button type="button" className="motion-icon" aria-label={t.hoverLabel}>
                <span className="motion-plate" aria-hidden="true" />
                <LayoutIcon />
              </button>
            </figure>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.byJob} />
        <div className="foundationsSpecimens">
          <div className="space-table">
            <div className="space-table-head motion-job-grid">
              <span>{t.colJob}</span>
              <span>{t.colTime}</span>
              <span>{t.colMoves}</span>
            </div>
            {jobs.map((row) => (
              <div className="space-table-row motion-job-grid" key={row.token}>
                <span className="space-where">{row.job}</span>
                <span className="space-token-cell">
                  <code className="space-token">{row.token}</code>
                </span>
                <span className="space-source">{row.moves}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Motion;
