import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Logos from './pages/Logos';
import Colors from './pages/Colors';
import JuhuoColors from './pages/JuhuoColors';
import Typography from './pages/Typography';
import Foundations from './pages/Foundations';
import Glass from './pages/Glass';
import Motion from './pages/Motion';
import ComponentsPage from './pages/Components/ComponentsPage';
import Splash from './components/Splash';
import { Language } from './translations';
import { ALL_NAV_ITEMS, JUHUO_NAV_ITEMS, NAV_ITEMS, isHiddenSection } from './constants';
import SiteThemeToggle, { TopviewWordmark } from './components/SiteThemeToggle';

type ViewState = 'splash' | 'content';
type BrandLine = 'topview' | 'juhuo';

const JUHUO_SECTIONS = new Set(['juhuo-colors']);
const PANEL_TRANSITION_MS = 800;

// Foundations is a nav-only group; its members (colors, spacing, radius, typography) stay real sections.
const KNOWN_SECTIONS = new Set(
  [...NAV_ITEMS, ...JUHUO_NAV_ITEMS].flatMap((item) =>
    item.group ? (item.children ?? []).map((child) => child.id) : [item.id]
  )
);

/** Old / group hashes land on the real Color, Spacing, and Radius pages. */
const HASH_ALIASES: Record<string, { section: string; subId: string | null }> = {
  color: { section: 'colors', subId: null },
  foundations: { section: 'colors', subId: null },
  'foundations/colors': { section: 'colors', subId: null },
  'foundations/spacing': { section: 'spacing', subId: null },
  'foundations/radius': { section: 'radius', subId: null },
  'foundations/foundations-spacing': { section: 'spacing', subId: null },
  'foundations/foundations-radius': { section: 'radius', subId: null },
  // Hover moved into Overlays > Hover card (mem640).
  'components/components-hover': { section: 'components-overlays', subId: 'overlays-hover-card' },
  'components/components-menu': { section: 'components-overlays', subId: 'overlays-menu' },
  'components/overlays-menu': { section: 'components-overlays', subId: 'overlays-menu' },
  'components/components-glass': { section: 'glass', subId: null },
  'components/glass-banner-arrow': { section: 'glass', subId: 'glass-banner-arrow' },
  'components/components-glass/glass-banner-arrow': { section: 'glass', subId: 'glass-banner-arrow' },
  'components/glass-tooltip': { section: 'glass', subId: null },
  'components/components-glass/glass-tooltip': { section: 'glass', subId: null },
  'components/glass-purple-white': { section: 'glass', subId: null },
  'components/components-glass/glass-purple-white': { section: 'glass', subId: null },
};

type HashTarget = { section: string; subId: string | null; canonical?: string };

const COMPONENT_PAGE_IDS = new Set([
  'components-rules',
  'components-controls',
  'components-button',
  'components-overlays',
  'components-display',
  'components-feedback',
]);

const firstVisibleComponentPage = (): string =>
  NAV_ITEMS.find((item) => item.id === 'components')?.children?.[0]?.id ?? 'components-controls';

/**
 * Old hashes addressed one long Components page (`#components/components-controls`).
 * Each former section is now its own page, so these land on that page.
 */
const legacyComponentsHash = (raw: string): HashTarget => {
  const first = firstVisibleComponentPage();
  const rest = raw === 'components' ? '' : raw.slice('components/'.length);
  if (!rest) return { section: first, subId: null, canonical: first };

  const [page, ...more] = rest.split('/');
  const extra = more.length ? more.join('/') : null;
  if (!page || !COMPONENT_PAGE_IDS.has(page) || isHiddenSection(page) || (extra && isHiddenSection(`${page}/${extra}`))) {
    return { section: first, subId: null, canonical: first };
  }
  if (page === 'components-rules') {
    const subId = extra ? `components-rules/${extra}` : null;
    return {
      section: page,
      subId,
      canonical: subId ? `${page}/${subId}` : page,
    };
  }
  return {
    section: page,
    subId: extra,
    canonical: extra ? `${page}/${extra}` : page,
  };
};

/**
 * Sections in HIDDEN_SECTIONS (constants.tsx) never render. A hidden top-level section
 * A hidden top-level section opens Logo. A hidden page inside a nav
 * group (e.g. #components-rules) opens that group's first visible page.
 */
const resolveHiddenTarget = (section: string, subId: string | null): HashTarget | 'catalog' | null => {
  if (isHiddenSection(section)) {
    const group = ALL_NAV_ITEMS.find(
      (item) => item.group && item.children?.some((child) => child.id === section)
    );
    const first = group
      ? NAV_ITEMS.find((item) => item.id === group.id)?.children?.[0]?.id ?? null
      : null;
    if (first) return { section: first, subId: null, canonical: first };
    return 'catalog';
  }
  if (!subId || !isHiddenSection(subId)) return null;
  const first = NAV_ITEMS.find((item) => item.id === section)?.children?.[0]?.id ?? null;
  return { section, subId: first, canonical: first ? `${section}/${first}` : section };
};

const readLocationHash = (): HashTarget | 'catalog' | null => {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return null;
  const alias = HASH_ALIASES[raw];
  if (alias) {
    return { ...alias, canonical: alias.subId ? `${alias.section}/${alias.subId}` : alias.section };
  }
  if (raw === 'components' || raw.startsWith('components/')) return legacyComponentsHash(raw);
  const [section, ...rest] = raw.split('/');
  const subId = rest.length ? rest.join('/') : null;
  const hidden = section ? resolveHiddenTarget(section, subId) : null;
  if (hidden) return hidden;
  if (!section || !KNOWN_SECTIONS.has(section)) return null;
  return { section, subId };
};


const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
  const [isSplashExiting, setIsSplashExiting] = useState(false);
  const [activeSection, setActiveSection] = useState('logo');
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [brandLine, setBrandLine] = useState<BrandLine>('topview');
  const language: Language = 'en';
  const mainRef = React.useRef<HTMLElement>(null);
  const viewRef = React.useRef<ViewState>(view);
  viewRef.current = view;

  useEffect(() => {
    const applyHash = (updateView: boolean) => {
      const parsed = readLocationHash();
      if (!parsed) return;
      if (parsed === 'catalog') {
        history.replaceState(null, '', '#logo');
        setActiveSection('logo');
        setActiveSubId(null);
        setBrandLine('topview');
        if (viewRef.current !== 'splash') setView('content');
        return;
      }
      if (parsed.canonical && window.location.hash !== `#${parsed.canonical}`) {
        history.replaceState(null, '', `#${parsed.canonical}`);
      }
      setActiveSection(parsed.section);
      setActiveSubId(parsed.subId);
      setBrandLine(JUHUO_SECTIONS.has(parsed.section) ? 'juhuo' : 'topview');
      if (updateView) {
        setView('content');
        setIsSplashExiting(false);
      }
    };
    // The intro plays on first load. The hash, when there is one, is applied
    // underneath it. Hash changes after that must not replay the intro.
    applyHash(false);
    const onHash = () => applyHash(false);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);


  useEffect(() => {
    if (!mainRef.current || activeSubId) return;
    mainRef.current.scrollTop = 0;
  }, [activeSection, view, activeSubId]);

  useEffect(() => {
    if (!mainRef.current || !activeSubId?.includes('/')) return;
    mainRef.current.scrollTop = 0;
  }, [activeSection, activeSubId, view]);

  useEffect(() => {
    if (view !== 'content' || !activeSubId || !mainRef.current) return;
    if (activeSubId.includes('/')) return;
    const target = mainRef.current.querySelector<HTMLElement>(`#${CSS.escape(activeSubId)}`);
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeSection, activeSubId, view]);

  const handleSplashComplete = useCallback(() => {
    const parsed = readLocationHash();
    if (!parsed || parsed === 'catalog') {
      setActiveSection('logo');
      setActiveSubId(null);
      setBrandLine('topview');
      if (window.location.hash !== '#logo') {
        history.replaceState(null, '', '#logo');
      }
    }
    setView('content');
    setIsSplashExiting(true);
    setTimeout(() => {
      setIsSplashExiting(false);
    }, PANEL_TRANSITION_MS);
  }, []);

  const handleNavigate = (targetId: string, targetSubId?: string) => {
    const hidden = resolveHiddenTarget(targetId, targetSubId ?? null);
    if (hidden === 'catalog') {
      goHome();
      return;
    }
    const id = hidden ? hidden.section : targetId;
    const subId = hidden ? hidden.subId ?? undefined : targetSubId;
    setActiveSection(id);
    setActiveSubId(subId ?? null);
    setBrandLine(JUHUO_SECTIONS.has(id) ? 'juhuo' : 'topview');
    window.location.hash = subId ? `${id}/${subId}` : id;
    setView('content');
  };

  const goHome = () => {
    setActiveSection('logo');
    setActiveSubId(null);
    setBrandLine('topview');
    setView('content');
    window.location.hash = 'logo';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'logo': return <Logos language={language} />;
      case 'colors': return <Colors language={language} />;
      case 'juhuo-colors': return <JuhuoColors language={language} />;
      case 'spacing': return <Foundations language={language} section="spacing" />;
      case 'radius': return <Foundations language={language} section="radius" />;
      case 'typography': return <Typography language={language} />;
      case 'glass': return <Glass language={language} />;
      case 'motion': return <Motion language={language} />;
      case 'components-rules':
      case 'components-controls':
      case 'components-button':
      case 'components-overlays':
      case 'components-display':
      case 'components-feedback':
        return (
          <ComponentsPage
            language={language}
            page={activeSection}
            activeSubId={activeSubId}
            onNavigate={handleNavigate}
          />
        );
      default: return <Logos language={language} />;
    }
  };

  const showSplash = view === 'splash' || isSplashExiting;
  const showContent = view === 'content' || isSplashExiting;

  return (
    <div className="site-root h-full bg-[#101010] text-white relative overflow-hidden">
      {/* Splash curtain — slides up to reveal the page */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[300] w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isSplashExiting ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Splash onComplete={handleSplashComplete} />
        </div>
      )}

      {/* Content shell — only <main> may scroll */}
      {showContent && (
        <div className="site-shell fixed inset-0 flex flex-col bg-[#101010] text-white overflow-hidden">
          <div className="shrink-0 pt-4">
            <header className="site-header mx-auto h-[80px] w-[87.5%] max-w-[1680px] rounded-2xl border border-white/10 flex items-center px-5 md:px-6 bg-[#101010]">
              <div
                className="flex items-center cursor-pointer h-full gap-3"
                onClick={goHome}
              >
                {brandLine === 'juhuo' ? (
                  <>
                    <img src="/juhuo/logo.png" alt="Juhuo" className="h-8 w-8 rounded-lg object-contain" />
                    <span className="text-lg font-heading tracking-tight">Juhuo</span>
                  </>
                ) : (
                  <TopviewWordmark />
                )}
              </div>
              <SiteThemeToggle language={language} />
            </header>
          </div>

          <div className="flex-1 min-h-0 w-full pb-4 pt-4 overflow-hidden">
            <div className="mx-auto h-full min-h-0 w-[87.5%] max-w-[1680px]">
              <div className="items-stretch lg:grid lg:grid-cols-[280px_minmax(0,1fr)] gap-4 h-full min-h-0 overflow-hidden">
              <aside className="hidden lg:block h-full min-h-0 shrink-0 overflow-hidden">
                <div className="site-frame site-sidebar h-full w-full rounded-2xl border border-white/10 overflow-hidden">
                  <Sidebar
                    activeId={activeSection}
                    activeSubId={activeSubId}
                    onNavigate={handleNavigate}
                    language={language}
                    brandLine={brandLine}
                  />
                </div>
              </aside>

              <main
                ref={mainRef}
                className="site-frame site-docs min-w-0 min-h-0 h-full rounded-2xl border border-white/10 overflow-y-auto overflow-x-hidden overscroll-contain"
              >
                <div className="p-6 md:p-8 h-full min-w-0">
                  <div className="w-full min-w-0 max-w-full">
                    {renderContent()}
                  </div>
                </div>
              </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
