import React from 'react';
import { Language, translations } from '../../translations';
import Button from '../../components/Button';
import SectionHeader from '../../components/SectionHeader';

interface ButtonPageProps {
  language: Language;
}

const ButtonPage: React.FC<ButtonPageProps> = ({ language }) => {
  const t = translations[language].sidebar;

  const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  return (
    <div className="space-y-24">
      <SectionHeader 
        title="Button" 
        description="A versatile button component with multiple variants, sizes, and states, based on our design system."
      />

      <section className="space-y-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans border-b border-white/10 pb-4">
          Variants
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="ghostMuted">Ghost Muted</Button>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans border-b border-white/10 pb-4">
          Sizes
        </h2>
        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase">Mini</span>
            <Button size="mini">Label</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase">Small</span>
            <Button size="small">Label</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase">Regular</span>
            <Button size="regular">Label</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase">Large</span>
            <Button size="large">Label</Button>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans border-b border-white/10 pb-4">
          Shapes
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Button shape="default">Default Shape</Button>
          <Button shape="rounded">Rounded Shape</Button>
          <Button shape="round">Round Shape</Button>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans border-b border-white/10 pb-4">
          States
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Button variant="primary">Default</Button>
          <Button variant="primary" className="hover:bg-[#313DE8]">Hover</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" isLoading>Loading</Button>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans border-b border-white/10 pb-4">
          Icons
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Button iconLeft={<PlusIcon />}>Icon Left</Button>
          <Button iconRight={<PlusIcon />}>Icon Right</Button>
          <Button iconOnly={<PlusIcon />} aria-label="Add item" />
          <Button variant="secondary" iconLeft={<PlusIcon />}>Secondary Icon</Button>
          <Button variant="outline" iconOnly={<PlusIcon />} shape="round" />
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;
