
import React from 'react';

interface LandingProps {
  onSelect: (id: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelect }) => {
  const menuItems = [
    { id: 'logo', label: 'Logo' },
    { id: 'colors', label: 'Color' },
    { id: 'typography', label: 'Typography' },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans fade-in">
      {/* Top Header */}
      <header className="px-8 py-6 flex justify-between items-center">
        <img src="/TopviewDesignLogo.svg" alt="TopView.AI" className="h-10" />
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Brand Guidelines</span>
        </div>
        {/* Navigation links removed as per request */}
        <div className="w-6 h-6 md:block hidden"></div>
      </header>

      {/* Main Catalog Navigation */}
      <main className="flex-1 flex flex-col">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex-1 group relative w-full flex items-center px-8 transition-colors duration-500 hover:bg-white/5 cursor-pointer"
          >
            <div className="py-4">
                <h2 className="text-[80px] md:text-[140px] font-heading leading-[1.1] tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {item.label}
                </h2>
            </div>
            
            {/* Hover arrow indicator */}
            <div className="absolute right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
            </div>
          </button>
        ))}
        {/* Placeholder for vertical balance */}
        <div className="flex-[1.5] opacity-10"></div>
      </main>
    </div>
  );
};

export default Landing;
