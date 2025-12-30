
import React from 'react';

const Logos: React.FC = () => {
  const handleDownload = (logoPath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = logoPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    const logos = [
      { path: '/logo/Type=Horizontal black.svg', name: 'TopView-Horizontal-Black.svg' },
      { path: '/logo/Type=Horizontal white.svg', name: 'TopView-Horizontal-White.svg' },
      { path: '/logo/Type=Vertical black.svg', name: 'TopView-Vertical-Black.svg' },
      { path: '/logo/Type=Vertical white.svg', name: 'TopView-Vertical-White.svg' }
    ];

    logos.forEach((logo, index) => {
      setTimeout(() => {
        handleDownload(logo.path, logo.name);
      }, index * 200);
    });
  };

  return (
    <div className="max-w-full text-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
          Logo
        </h1>
        <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
          Our logo represents the 'View'—a five-bar perspective that symbolizes depth, movement, and analytical clarity.
        </p>
      </div>

      {/* Logo Sections */}
      <div className="space-y-32 fade-in" style={{ animationDelay: '0.1s' }}>
        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Horizontal Black</h3>
          <div className="group relative bg-neutral-100 rounded-[10px] p-24 flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-700">
            <img src="/logo/Type=Horizontal black.svg" alt="TopView.AI Horizontal Black Logo" className="h-16" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Horizontal White</h3>
          <div className="group relative bg-neutral-900 rounded-[10px] p-24 flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-700">
            <img src="/logo/Type=Horizontal white.svg" alt="TopView.AI Horizontal White Logo" className="h-16" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Vertical Logos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-neutral-100 p-16 rounded-[10px] flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-700">
              <img src="/logo/Type=Vertical black.svg" alt="TopView.AI Vertical Black Logo" className="h-32" />
            </div>
            <div className="group relative bg-neutral-900 p-16 rounded-[10px] flex items-center justify-center overflow-hidden cursor-pointer transition-transform duration-700">
              <img src="/logo/Type=Vertical white.svg" alt="TopView.AI Vertical White Logo" className="h-32" />
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="pb-24">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">Download Logos</h3>
          <div className="flex flex-col items-start gap-6">
            <button 
              onClick={handleDownloadAll}
              className="px-12 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
            >
              Download All Logos
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Logos;
