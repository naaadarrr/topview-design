
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-6xl text-white">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
        <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
          Visual Intelligence.
        </h1>
        <p className="max-w-md text-[20px] font-sans leading-snug text-white mt-4 md:mt-10 font-normal">
          TopView.AI V3 is the core design engine driving the next generation of creative AI. It is built for scale, clarity, and uncompromising speed.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-20 fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-[#3643FF] rounded-[10px] p-16 aspect-[4/3] flex flex-col justify-end group cursor-pointer transition-transform duration-500 hover:scale-[1.01]">
            <h3 className="text-5xl font-heading tracking-tight mb-4 text-white">Infinite Scale.</h3>
            <p className="text-white font-sans text-lg max-w-xs opacity-90">Dynamic tokens designed for multi-modal AI interactions.</p>
        </div>
        <div className="bg-[#222222] rounded-[10px] p-16 aspect-[4/3] flex flex-col justify-end group cursor-pointer transition-transform duration-500 hover:scale-[1.01]">
            <h3 className="text-5xl font-heading tracking-tight mb-4 text-[#3643FF]">Pure Logic.</h3>
            <p className="text-white font-sans text-lg max-w-xs opacity-70">Deterministic design patterns for machine-augmented creativity.</p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
