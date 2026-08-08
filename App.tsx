import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Logos from './pages/Logos';
import Colors from './pages/Colors';
import JuhuoColors from './pages/JuhuoColors';
import Typography from './pages/Typography';
import Motion from './pages/Motion';
import Splash from './components/Splash';
import Landing from './components/Landing';
import { Language } from './translations';

type ViewState = 'splash' | 'catalog' | 'content';
type BrandLine = 'topview' | 'juhuo';

const JUHUO_SECTIONS = new Set(['juhuo-colors']);
const PANEL_TRANSITION_MS = 800;

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
  const [isSplashExiting, setIsSplashExiting] = useState(false);
  const [isCatalogRevealing, setIsCatalogRevealing] = useState(false);
  const [isCatalogExiting, setIsCatalogExiting] = useState(false);
  const [isCatalogEntering, setIsCatalogEntering] = useState(false);
  const [activeSection, setActiveSection] = useState('logo');
  const [brandLine, setBrandLine] = useState<BrandLine>('topview');
  const language: Language = 'en';
  const mainRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeSection, view]);

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
    // Mount catalog under the splash, then raise the splash curtain.
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

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    setBrandLine(JUHUO_SECTIONS.has(id) ? 'juhuo' : 'topview');
    window.location.hash = id;

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
      case 'typography': return <Typography language={language} />;
      case 'motion': return <Motion language={language} />;
      default: return <Logos language={language} />;
    }
  };

  const showSplash = view === 'splash' || isSplashExiting;
  const showCatalog = view === 'catalog' || isCatalogExiting || isSplashExiting;
  const showContent = view !== 'splash' || isSplashExiting;

  return (
    <div className="h-full bg-[#0a0a0c] text-white relative overflow-hidden">
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
        <div className="fixed inset-0 flex flex-col bg-[#0a0a0c] text-white overflow-hidden">
          <div className="shrink-0 px-4 md:px-6 pt-4">
            <header className="max-w-[1600px] mx-auto h-[80px] rounded-2xl border border-white/10 flex items-center px-5 md:px-6 bg-[#0a0a0c]">
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
                  <img src="/logo/Topview_Logo_New_RGB/SVG/Horizontal_White.svg" alt="TopView" className="h-8" />
                )}
              </div>
            </header>
          </div>

          <div className="flex-1 min-h-0 pb-4 px-4 md:px-6 max-w-[1600px] w-full mx-auto pt-4 overflow-hidden">
            <div className="items-stretch lg:grid lg:grid-cols-[280px_minmax(0,1fr)] gap-4 md:gap-6 h-full min-h-0 overflow-hidden">
              <aside className="hidden lg:block h-full min-h-0 shrink-0 overflow-hidden">
                <div className="h-full w-full rounded-2xl border border-white/10 overflow-hidden">
                  <Sidebar
                    activeId={activeSection}
                    onNavigate={handleNavigate}
                    language={language}
                    brandLine={brandLine}
                  />
                </div>
              </aside>

              <main
                ref={mainRef}
                className="min-w-0 min-h-0 h-full rounded-2xl border border-white/10 overflow-y-auto overflow-x-hidden overscroll-contain"
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
      )}
    </div>
  );
};

export default App;
