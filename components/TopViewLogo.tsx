
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  color?: string;
}

const TopViewLogo: React.FC<LogoProps> = ({ className = "h-8", iconOnly = false, color = "#3643FF" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Five-bar Icon */}
      <div className="flex items-start gap-[12%] h-full aspect-[4/3] pt-[5%]">
        <div className="w-[12%] h-[40%] rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-[12%] h-[75%] rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-[12%] h-[100%] rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-[12%] h-[75%] rounded-full" style={{ backgroundColor: color }}></div>
        <div className="w-[12%] h-[40%] rounded-full" style={{ backgroundColor: color }}></div>
      </div>
      
      {!iconOnly && (
        <span 
          className="font-display font-black tracking-tighter uppercase whitespace-nowrap font-sans"
          style={{ fontSize: '120%', color: color === '#3643FF' ? '#FFFFFF' : color }}
        >
          TopView<span className="opacity-40">.AI</span>
        </span>
      )}
    </div>
  );
};

export default TopViewLogo;
