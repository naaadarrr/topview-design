import React from 'react';
import { Language, translations } from '../translations';
import GlassSpecimens from './Components/Glass';

const Glass: React.FC<{ language: Language }> = ({ language }) => (
  <div className="max-w-full text-white space-y-16 pb-40">
    <section id="glass" className="fade-in scroll-mt-8">
      <h1 className="site-h1">{translations[language].components.glass}</h1>
    </section>
    <GlassSpecimens language={language} />
  </div>
);

export default Glass;
