import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
  const [isCatalogExiting, setIsCatalogExiting] = useState(false);
  const [isCatalogEntering, setIsCatalogEntering] = useState(false);
  const [activeSection, setActiveSection] = useState('logo');
  const [brandLine, setBrandLine] = useState<BrandLine>('topview');
  const language: Language = 'en';
  const mainRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset scroll to top whenever the section or view changes
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [activeSection, view]);

  useEffect(() => {
    // Mirrors the exit transition: mount off-screen (above), then release on
    // the next paint so the browser animates it sliding back down into place.
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

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    setBrandLine(JUHUO_SECTIONS.has(id) ? 'juhuo' : 'topview');
    window.location.hash = id;

    if (view === 'catalog') {
      setIsCatalogExiting(true);
      setTimeout(() => {
        setView('content');
        setIsCatalogExiting(false);
      }, 800);
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

  if (view === 'splash') {
    return <Splash onComplete={() => setView('catalog')} />;
  }

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden">
      {/* Catalog / Landing Page - Fixed Overlay, slides up to exit / down to re-enter */}
      {(view === 'catalog' || isCatalogExiting) && (
        <div 
          className={`fixed inset-0 z-[200] w-full h-full bg-white transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            isCatalogExiting || isCatalogEntering ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Landing 
            onSelect={handleNavigate} 
            language={language}
            isExiting={isCatalogExiting}
          />
        </div>
      )}

      {/* Content Pages - Bento modular layout */}
      <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-white relative">
        {/* Fixed Header Module */}
        <div className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 pt-4">
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

        <div className="flex-1 pt-[112px] pb-4 px-4 md:px-6 max-w-[1600px] w-full mx-auto">
          <div className="items-start lg:grid lg:grid-cols-[280px_minmax(0,1fr)] gap-4 md:gap-6">
            {/* Sidebar Module */}
            <aside className="hidden lg:block sticky top-[112px] h-[calc(100vh-128px)] shrink-0">
              <div className="h-full w-full rounded-2xl border border-white/10 overflow-y-auto">
                <Sidebar 
                  activeId={activeSection} 
                  onNavigate={handleNavigate} 
                  language={language}
                  brandLine={brandLine}
                />
              </div>
            </aside>

            {/* Content Module */}
            <main 
              ref={mainRef}
              className="min-w-0 rounded-2xl border border-white/10 overflow-y-auto h-[calc(100vh-128px)]"
            >
              <div className="px-6 py-10 md:px-16 md:py-16">
                <div className="max-w-6xl mx-auto">
                  {renderContent()}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
