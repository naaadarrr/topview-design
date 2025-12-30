import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Logos from './pages/Logos';
import Colors from './pages/Colors';
import Typography from './pages/Typography';
import Motion from './pages/Motion';
import Splash from './components/Splash';
import Landing from './components/Landing';
import { Language } from './translations';

type ViewState = 'splash' | 'catalog' | 'content';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
  const [activeSection, setActiveSection] = useState('logo');
  const [language, setLanguage] = useState<Language>('en');
  const mainRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => {
      // Force loading catalog page on fresh entry/refresh as requested
      setView('catalog');
      window.location.hash = ''; 
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    window.location.hash = id;
    setView('content');
    
    // Scroll the main content area to top
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goHome = () => {
    setView('catalog');
    window.location.hash = '';
  };

  if (view === 'splash') {
    return <Splash />;
  }

  // Catalog / Landing Page - No Sidebar
  if (view === 'catalog') {
    return (
      <Landing 
        onSelect={handleNavigate} 
        language={language} 
        onLanguageChange={setLanguage}
      />
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'logo': return <Logos language={language} />;
      case 'colors': return <Colors language={language} />;
      case 'typography': return <Typography language={language} />;
      case 'motion': return <Motion language={language} />;
      default: return <Logos language={language} />;
    }
  };

  // Content Pages - With Sidebar
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-[#111111] text-white fade-in relative">
      <Sidebar 
        activeId={activeSection} 
        onNavigate={handleNavigate} 
        onLogoClick={goHome} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main 
        ref={mainRef}
        className="flex-1 lg:ml-72 flex flex-col overflow-y-auto overflow-x-hidden bg-[#111111]"
      >
        {/* Unified Top Header for Content Pages - 88px */}
        <header className="h-[88px] px-10 md:px-20 flex justify-between items-center flex-shrink-0 z-50 border-b border-white/10">
          <div className="flex items-center">
            {/* Breadcrumb or placeholder for logic later if needed */}
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/20">
              Topview.design / {activeSection}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-colors hover:text-white ${language === 'en' ? 'text-white' : ''}`}
            >
              EN
            </button>
            <span className="w-[1px] h-3 bg-white/10"></span>
            <button 
              onClick={() => setLanguage('zh')}
              className={`transition-colors hover:text-white ${language === 'zh' ? 'text-white' : ''}`}
            >
              中
            </button>
          </div>
        </header>

        <div className="flex-1 px-10 md:px-20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
