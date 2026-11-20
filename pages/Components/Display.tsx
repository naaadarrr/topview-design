import React, { useState } from 'react';
import { Language, translations } from '../../translations';
import StatusBadgeLab from './StatusBadgeLab';
import './overlays-specimens.css';
import './display-specimens.css';
import './glass-specimens.css';

interface DisplayProps {
  language: Language;
}

const SectionHeading: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="site-h3 mb-6">
    {title}
  </h3>
);

// Product data strings (origin/develop b0c5a29), shown as-is in both languages.
const SAMPLE_TAGS = ['Chinese & English', 'Best Emotion Cloning', '80+ Languages']; // InstantVoiceClone/config.ts

const SparklesIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
  </svg>
);

const ImagePlayIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m11 16-5 5" />
    <path d="M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5" />
    <path d="M15.765 22a.5.5 0 0 1-.765-.424V13.5a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.65z" />
    <circle cx="9" cy="9" r="2" />
  </svg>
);

const TypeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
  </svg>
);

const FeaturedCaseTabChip: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({
  active,
  label,
  onClick,
}) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    className={`home-tab-chip${active ? ' is-active' : ''}`}
    onClick={onClick}
  >
    <span className="home-tab-chip-face">
      {!active ? <span aria-hidden className="home-tab-chip-hover-fill" /> : null}
      <span className="home-tab-chip-label">{label}</span>
    </span>
    <span aria-hidden className="home-tab-chip-edge" />
  </button>
);

const TAB_IDS = ['omni-reference', 'image-to-video', 'text-to-video'] as const;

const TAB_ICONS = {
  'omni-reference': SparklesIcon,
  'image-to-video': ImagePlayIcon,
  'text-to-video': TypeIcon,
} as const;

const SubtoolTabs: React.FC<{ labels: Record<(typeof TAB_IDS)[number], string> }> = ({ labels }) => {
  const [active, setActive] = useState<(typeof TAB_IDS)[number]>('omni-reference');
  return (
    <div className="subtool-wrap">
      <div className="subtool-track">
        {TAB_IDS.map((id) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              data-subtool-tab={id}
              className={`subtool-btn${isActive ? ' is-active' : ''}`}
              onClick={() => setActive(id)}
            >
              {React.createElement(TAB_ICONS[id])}
              <span className="label">{labels[id]}</span>
              <span className="subtool-underline" aria-hidden />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Display: React.FC<DisplayProps> = ({ language }) => {
  const t = translations[language].display;
  const tabs = [
    { value: 'public', label: t.tabPublic },
    { value: 'favorite', label: t.tabFavorite },
    { value: 'custom', label: t.tabCustom },
  ];
  const [activeTab, setActiveTab] = useState('public');
  const [bfIndex, setBfIndex] = useState(0);
  const [homeTab, setHomeTab] = useState<'functions' | 'skills'>('functions');

  return (
    <div className="overlaySpecimens displaySpecimens space-y-24">
      <section>
        <SectionHeading title={t.statusBadgeTitle} />
        <StatusBadgeLab language={language} />
      </section>

      <section>
        <SectionHeading title={t.tagTitle} />
        <div className="stage">
          <div className="model-tags">
            {SAMPLE_TAGS.map((item) => (
              <div key={item} className="model-tag">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.avatarTitle} />
        <div className="stage">
          <div className="avatar-row">
            <div className="avatar-sizes">
              <div className="avatar-item">
                <span className="avatar is-user is-24" />
                <span className="avatar-size">24</span>
              </div>
              <div className="avatar-item">
                <span className="avatar is-user is-32" />
                <span className="avatar-size">32</span>
              </div>
              <div className="avatar-item">
                <span className="avatar is-user is-40" />
                <span className="avatar-size">40</span>
              </div>
            </div>
            <button type="button" className="dock-row">
              <span className="avatar is-user is-24" />
              <span className="dock-name">{t.dockName}</span>
              <span className="dock-plan">{t.dockPlan}</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.cardTitle} />
        <div className="stage">
          <div className="board-card">
            <div className="board-card-shell">
              <div className="board-card-cover">
                <div className="board-card-cover-inner">
                  <div className="board-card-mosaic">
                    <div className="board-card-cell" />
                    <div className="board-card-mosaic-side">
                      <div className="board-card-cell" />
                      <div className="board-card-cell" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="board-card-meta">
                <h3 className="board-card-title">{t.cardName}</h3>
                <p className="board-card-sub">
                  <strong>0 {t.cardAssets}</strong>
                  <span className="board-card-dot"> · </span>
                  {t.cardToday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.tabsTitle} />
        <div className="stage">
          <div className="voice-tabs" role="tablist" aria-label={t.tabsTitle}>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.value}
                data-state={activeTab === tab.value ? 'active' : 'inactive'}
                className="voice-tab"
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div id="display-bf-segmented-b" className="mt-12 scroll-mt-8">
          <h4 className="font-heading text-[14px] leading-[20px] font-semibold text-white/70 mb-4">{t.bfTitle}</h4>
          <div className="stage">
            {/* Same markup and classes as the bf-segmented-b rule page (LockSpecimens), recipe in glass-specimens.css .bf-seg */}
            <div className="glassSpecimens">
              <div className="bf-seg-demo">
                <div className="bf-seg">
                  <div className="thumb" style={{ transform: `translateX(${bfIndex * 52}px)` }} />
                  <div className="tabs" role="tablist">
                    {['720p', '1080p'].map((label, i) => (
                      <button
                        key={label}
                        type="button"
                        role="tab"
                        aria-selected={bfIndex === i}
                        onClick={() => setBfIndex(i)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title={t.subtoolTitle} />
        <div className="stage">
          <SubtoolTabs
            labels={{
              'omni-reference': t.tabOmniReference,
              'image-to-video': t.tabImageToVideo,
              'text-to-video': t.tabTextToVideo,
            }}
          />
        </div>
      </section>

      <section>
        <SectionHeading title={t.homeTabsTitle} />
        <div className="stage">
          <div className="home-tab-list" role="tablist" aria-label={t.homeTabsAria}>
            <FeaturedCaseTabChip
              active={homeTab === 'functions'}
              label={t.homeTabFunctions}
              onClick={() => setHomeTab('functions')}
            />
            <FeaturedCaseTabChip
              active={homeTab === 'skills'}
              label={t.homeTabSkills}
              onClick={() => setHomeTab('skills')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Display;
