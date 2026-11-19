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
import Landing from './components/Landing';
import { Language } from './translations';
import { JUHUO_NAV_ITEMS, NAV_ITEMS, isHiddenSection } from './constants';
import SiteThemeToggle, { TopviewWordmark } from './components/SiteThemeToggle';

type ViewState = 'splash' | 'catalog' | 'content';
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
  'components/components-hover': { section: 'components', subId: 'overlays-hover-card' },
  'components/components-menu': { section: 'components', subId: 'overlays-menu' },
  'components/components-glass': { section: 'glass', subId: null },
  'components/glass-banner-arrow': { section: 'glass', subId: 'glass-banner-arrow' },
  'components/components-glass/glass-banner-arrow': { section: 'glass', subId: 'glass-banner-arrow' },
  'components/glass-tooltip': { section: 'glass', subId: 'glass-tooltip' },
  'components/components-glass/glass-tooltip': { section: 'glass', subId: 'glass-tooltip' },
  'components/glass-purple-white': { section: 'glass', subId: null },
  'components/components-glass/glass-purple-white': { section: 'glass', subId: null },
};

type HashTarget = { section: string; subId: string | null; canonical?: string };

/**
 * Sections in HIDDEN_SECTIONS (constants.tsx) never render. A hidden top-level section
 * (e.g. #motion, #motion/motion-spec) goes to the catalog; a hidden child (e.g.
 * #components/components-rules, #components/components-rules/<lock>) goes to the first
 * visible child of its parent (Components › Controls).
 */
const resolveHiddenTarget = (section: string, subId: string | null): HashTarget | 'catalog' | null => {
  if (isHiddenSection(section)) return 'catalog';
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
  const [isCatalogRevealing, setIsCatalogRevealing] = useState(false);
  const [isCatalogExiting, setIsCatalogExiting] = useState(false);
  const [isCatalogEntering, setIsCatalogEntering] = useState(false);
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
        // Hidden section: drop the hash; from a content page, return to the catalog.
        history.replaceState(null, '', window.location.pathname + window.location.search);
        if (viewRef.current === 'content') {
          setIsCatalogEntering(true);
          setView('catalog');
          setIsCatalogExiting(false);
        }
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
    // The intro always plays on first load / hard refresh, then the catalog
    // is shown. Hash changes after that must not replay the intro.
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

  useEffect(() => {
    if (!isCatalogEntering) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setIsCatalogEntering(false);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isCatalogEntering]);

  const handleSplashComplete = useCallback(() => {
    // After the intro, always enter the existing catalog / landing page,
    // even if the arrival URL had a hash. Later in-site navigation still
    // uses the hash; this path must not jump into a content section.
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setView('catalog');
    setIsSplashExiting(true);
    setIsCatalogRevealing(true);
    setTimeout(() => {
      setIsSplashExiting(false);
    }, PANEL_TRANSITION_MS);
    // Keep reveal state until staggered item animations finish
    setTimeout(() => {
      setIsCatalogRevealing(false);
    }, PANEL_TRANSITION_MS + 350);
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

    if (view === 'catalog') {
      setIsCatalogExiting(true);
      setTimeout(() => {
        setView('content');
        setIsCatalogExiting(false);
      }, PANEL_TRANSITION_MS);
    } else {
      setView('content');
    }
  };

  const goHome = () => {
    if (view === 'content') {
      setIsCatalogEntering(true);
    }
    setView('catalog');
    setIsCatalogExiting(false);
    window.location.hash = '';
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
      case 'components': return <ComponentsPage language={language} activeSubId={activeSubId} onNavigate={handleNavigate} />;
      default: return <Logos language={language} />;
    }
  };

  const showSplash = view === 'splash' || isSplashExiting;
  const showCatalog = view === 'catalog' || isCatalogExiting;
  const showContent = view !== 'splash' || isSplashExiting;

  return (
    <div className="site-root h-full bg-[#101010] text-white relative overflow-hidden">
      {/* Splash curtain — slides up to reveal catalog */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[300] w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isSplashExiting ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Splash onComplete={handleSplashComplete} />
        </div>
      )}

      {/* Catalog / Landing Page */}
      {showCatalog && (
        <div
          className={`fixed inset-0 z-[200] w-full h-full bg-white transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isCatalogExiting || isCatalogEntering ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Landing
            onSelect={handleNavigate}
            language={language}
            isExiting={isCatalogExiting}
            isEnteringFromSplash={isCatalogRevealing}
          />
        </div>
      )}

      {/* Content shell — only <main> may scroll */}
      {showContent && (
        <div className="site-shell fixed inset-0 flex flex-col bg-[#101010] text-white overflow-hidden">
          <div className="shrink-0 px-4 pt-4">
            <header className="site-header max-w-[1600px] mx-auto h-[80px] rounded-2xl border border-white/10 flex items-center px-5 md:px-6 bg-[#101010]">
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

          <div className="flex-1 min-h-0 w-full px-4 pb-4 pt-4 overflow-hidden">
            <div className="max-w-[1600px] mx-auto h-full min-h-0">
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
