import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../translations';

interface VisualStyleProps {
  language: Language;
}

const styleDNA = [
  {
    category: 'Core Style',
    zh: '核心风格',
    tags: ['Neo-Memphis style', 'Modern flat vector illustration', 'Brutalist graphic design', 'Pop art aesthetic'],
  },
  {
    category: 'Linework & Shading',
    zh: '线条与质感',
    tags: ['Bold black outlines', 'Thick black strokes', 'Clean line art', 'Solid color fills', 'No gradients', 'Flat shading'],
  },
  {
    category: 'Color Palette',
    zh: '色彩矩阵',
    tags: ['High-saturation electric purple', 'Vibrant orange accents', 'Bright yellow accents', 'High-contrast stark white blocks'],
  },
  {
    category: 'Composition & Motifs',
    zh: '构图与特定元素',
    tags: ['Central floating sticker frame', 'Rounded rectangle containers', 'Minimalist tech and media icons', 'Hand-drawn marker circles', 'UI cursor element'],
  },
  {
    category: 'Overall Vibe',
    zh: '画面整体氛围',
    tags: ['Retro-future vibe', 'Clean and geometric layout', 'Playful tech aesthetic'],
  },
];

const zhKeyterms = [
  { category: '核心风格', terms: ['新孟菲斯风格（Neo-Memphis）', '现代扁平向量插画', '新野兽主义平面视觉', '波普艺术美学'] },
  { category: '线条轮廓', terms: ['粗黑闭合线条', '纯平描边', '2D纯平填色', '无渐变', '块状几何切面'] },
  { category: '色彩调性', terms: ['高饱和度电光紫（主色）', '活力橙/明黄（高亮辅助色）', '纯白撞色色块（反差焦点）'] },
  { category: '构成特征', terms: ['悬浮贴纸边框', '微圆角几何容器', '极简科技与视频媒介图标', '手绘马克笔圈选线', '系统光标/指针'] },
  { category: '整体视觉', terms: ['复古未来主义', '模块化拼贴感', '趣味科技', '高对比度大字报排版'] },
];

const galleryItems = [
  { id: '01', w: 'w-[480px]' },
  { id: '02', w: 'w-[480px]' },
  { id: '03', w: 'w-[480px]' },
  { id: '04', w: 'w-[480px]' },
];

const VisualStyle: React.FC<VisualStyleProps> = ({ language }) => {
  const isZh = language === 'zh';
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftPos(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => { setIsDragging(false); checkScroll(); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeftPos - (x - startX) * 2;
  };
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -480 : 480, behavior: 'smooth' });
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
  };

  return (
    <>
      <div className="max-w-full text-white space-y-32 pb-32 overflow-x-visible">

        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20 fade-in">
          <h1 className="text-[100px] lg:text-[120px] font-heading leading-none tracking-tight">
            {isZh ? '视觉风格' : 'Visual Style'}
          </h1>
          <p className="max-w-md text-[20px] leading-[26px] font-sans text-white mt-4 md:mt-10 font-normal">
            {isZh
              ? 'Neo-Memphis 科技海报风格——高饱和电光紫、粗黑描边、纯色块，用于 Banner、社媒配图与产品推广。'
              : 'Neo-Memphis tech poster aesthetic — electric purple, bold black outlines, and solid color blocks for banners, social media, and campaign visuals.'}
          </p>
        </div>

        {/* Main Reference */}
        <section className="fade-in" style={{ animationDelay: '0.08s' }}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">
            {isZh ? '主参考图' : 'Main Reference'}
          </h3>
          <div className="rounded-[16px] overflow-hidden max-w-[480px]">
            <img
              src="/visual-style/reference.png"
              alt="Visual Style Main Reference"
              className="w-full h-auto block select-none"
            />
          </div>
        </section>

        {/* Gallery */}
        <section className="fade-in relative group/section overflow-visible" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 font-sans">
            {isZh ? '风格样例' : 'Style Gallery'}
          </h3>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-12 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 no-scrollbar items-start cursor-grab active:cursor-grabbing scroll-smooth snap-x snap-mandatory"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex-shrink-0 ${item.w} cursor-zoom-in snap-start rounded-[10px] overflow-hidden`}
                onClick={() => !isDragging && setSelectedIndex(index)}
              >
                <img
                  src={`/visual-style/${item.id}.png`}
                  alt={`Visual Style Case ${item.id}`}
                  className="w-full h-auto block select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-[40%] -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white/5 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 rounded-full ${canScrollLeft ? 'opacity-0 group-hover/section:opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-[40%] -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white/5 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 rounded-full ${canScrollRight ? 'opacity-0 group-hover/section:opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </section>

        {/* Style DNA */}
        <section className="fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="flex flex-col gap-4 mb-16">
            <h2 className="text-[44px] md:text-[56px] leading-[1.1] font-heading tracking-tight">
              {isZh ? '风格 DNA' : 'Style DNA'}
            </h2>
            <p className="max-w-md text-[14px] leading-[20px] font-sans text-white/60">
              {isZh
                ? '将以下维度关键词拼装，可直接用于中英文生图提示词或团队沟通。'
                : 'Combine keywords from these dimensions to build prompts or align with the team.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styleDNA.map((dna) => (
              <div key={dna.category} className="bg-[#1a1a1a] rounded-[10px] p-8 border border-white/5 transition-all duration-300">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white font-sans">{dna.category}</span>
                  {isZh && <span className="ml-2 text-[10px] text-white/30 font-sans">{dna.zh}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {dna.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 rounded-full text-[11px] font-sans text-white/70 border border-white/10 hover:border-[#731DFB]/50 hover:text-white transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Chinese Keyterms card */}
            {isZh && (
              <div className="bg-[#1a1a1a] rounded-[10px] p-8 border border-white/5 transition-all duration-300 md:col-span-2 lg:col-span-3">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white font-sans">中文关键词汇总</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {zhKeyterms.map((group) => (
                    <div key={group.category}>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-sans">{group.category}</p>
                      <div className="flex flex-col gap-1.5">
                        {group.terms.map((term) => (
                          <span key={term} className="text-[12px] text-white/70 font-sans leading-relaxed">{term}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Lightbox */}
      {selectedIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="absolute top-8 right-8 flex items-center gap-8 z-[110]">
            <span className="font-mono text-xs text-white/40 tracking-widest">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
            </span>
            <button className="text-white/60 hover:text-white transition-colors p-2" onClick={() => setSelectedIndex(null)}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <button className="absolute left-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block" onClick={handlePrev}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="absolute right-8 p-4 text-white/20 hover:text-white transition-colors z-[110] hidden md:block" onClick={handleNext}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-12 md:p-24 lg:p-32">
            <img
              key={galleryItems[selectedIndex].id}
              src={`/visual-style/${galleryItems[selectedIndex].id}.png`}
              alt="Visual Style Case"
              className="max-w-full max-h-full object-contain shadow-2xl animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)] rounded-[10px]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default VisualStyle;
