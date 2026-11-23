import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Language, translations } from '../translations';
import GlassSpecimens from './Components/Glass';
import './Components/button-inventory.css';

const GLASS_PROMPT = `Add Topview glass to this project. Read https://raw.githubusercontent.com/naaadarrr/topview-design/main/pages/Components/glass-specimens.css. Copy only .arrow-final, .card-micro.a, .card-micro.daily, .g, and .module-icon. frost-thin is .g (fill 60%, blur 6px). frost is .card-micro.daily (fill 82%, blur 3px). frost-thick is .card-micro.a (fill 92%, blur 3px). Do not copy .material-plate or the toast dock. Do not invent new ones.`;

const GlassPrompt: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].buttonInventory;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(GLASS_PROMPT);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="prompt-copy" onClick={copy}>
      {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
      {copied ? t.copiedCommand : t.copyCommand}
    </button>
  );
};

const Glass: React.FC<{ language: Language }> = ({ language }) => (
  <div className="max-w-full text-white space-y-16 pb-40">
    <section id="glass" className="fade-in scroll-mt-8 button-page-intro">
      <h1 className="site-h1">{translations[language].components.glass}</h1>
      <GlassPrompt language={language} />
    </section>
    <GlassSpecimens language={language} />
  </div>
);

export default Glass;
