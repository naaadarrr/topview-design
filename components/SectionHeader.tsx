
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-20 fade-in">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
