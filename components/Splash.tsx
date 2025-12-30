
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#111111] z-[100] flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          <img src="/TopviewDesignLogo.svg" alt="TopView Logo" className="w-full h-full" />
        </div>
      </div>
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(54,67,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
    </div>
  );
};

export default Splash;
