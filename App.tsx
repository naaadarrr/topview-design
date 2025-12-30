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
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
        setView('content');
      } else {
        setView('catalog');
      }
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
        className="flex-1 lg:ml-72 px-6 md:px-12 lg:px-20 py-12 md:py-24 overflow-y-auto overflow-x-hidden bg-[#111111]"
      >
        <div className="max-w-7xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
