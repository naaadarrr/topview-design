import React, { useState } from 'react';
import { Language, translations } from '../../translations';
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
const MODEL_BADGES = ['HOT', 'NEW'] as const; // AIModelBadge in types/gen/ai-creation
const SAMPLE_TAGS = ['Chinese & English', 'Best Emotion Cloning', '80+ Languages']; // InstantVoiceClone/config.ts

const Display: React.FC<DisplayProps> = ({ language }) => {
  const t = translations[language].display;
  const tabs = [
    { value: 'public', label: t.tabPublic },
    { value: 'favorite', label: t.tabFavorite },
    { value: 'custom', label: t.tabCustom },
  ];
  const [activeTab, setActiveTab] = useState('public');
  const [bfIndex, setBfIndex] = useState(0);
  const [segIndex, setSegIndex] = useState(0);
  const segLabels = [t.genericSegVideo, t.genericSegImage, t.genericSegAvatar];

  return (
    <div className="overlaySpecimens displaySpecimens space-y-24">
      <p className="max-w-2xl text-[20px] leading-[26px] font-sans text-white font-normal">{t.pageLine}</p>

      <section>
        <SectionHeading title={t.badgeTitle} />
        <div className="stage">
          <div className="model-badges">
            {MODEL_BADGES.map((item) => (
              <div key={item} className="model-badge">
                <div className={`model-badge-face is-${item.toLowerCase()}`}>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="caption">{t.badgeNote}</p>
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
        <p className="caption">{t.tagNote}</p>
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
        <p className="caption">{t.tabsNote}</p>

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

        <div id="display-generic-segmented" className="mt-12 scroll-mt-8">
          <h4 className="font-heading text-[14px] leading-[20px] font-semibold text-white/70 mb-4">{t.genericSegTitle}</h4>
          <div className="stage">
            {/* Same markup and classes as the former Glass specimen, recipe in glass-specimens.css .g / .seg */}
            <div className="glassSpecimens">
              <div className="g seg">
                <div className="thumb" style={{ transform: `translateX(${segIndex * 78}px)` }} />
                <div className="tabs" role="tablist">
                  {segLabels.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={segIndex === i}
                      onClick={() => setSegIndex(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Display;
