import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Language, translations } from '../../translations';

type Point = [number, number];

const FRAME_PAD = 80;
const ARROW = { width: 14, height: 7, baseRound: 4, tipRound: 2 };
const RADIUS = 18;

function arrowSegment(base: Point, e: Point, n: Point, o: number) {
  const half = ARROW.width / 2;
  const add = (p: Point, v: Point, k: number): Point => [p[0] + v[0] * k, p[1] + v[1] * k];
  const unit = (a: Point, b: Point): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  const b1 = add(base, e, -half);
  const tip = add(base, n, ARROW.height);
  const b2 = add(base, e, half);
  const up = unit(b1, tip);
  const down = unit(tip, b2);
  const pt = (p: Point) => `${p[0] + o} ${p[1] + o}`;
  const corner = (p: Point, inDir: Point, outDir: Point, k: number) =>
    `L${pt(add(p, inDir, -k))} Q${pt(p)} ${pt(add(p, outDir, k))}`;
  return [
    corner(b1, e, up, ARROW.baseRound),
    corner(tip, up, down, ARROW.tipRound),
    corner(b2, down, e, ARROW.baseRound),
  ].join(' ');
}

/** Box on the right of the anchor; the arrow leaves the left edge. Same outline as GuideBubble. */
function bubbleOutline(w: number, h: number) {
  const r = RADIUS;
  const o = FRAME_PAD;
  const half = ARROW.width / 2;
  const min = r + half + ARROW.baseRound;
  const c = Math.min(Math.max(h / 2, min), h - min);
  const arc = (x: number, y: number) => `A${r} ${r} 0 0 1 ${x + o} ${y + o}`;
  return [
    `M${r + o} ${o}`,
    `H${w - r + o}`,
    arc(w, r),
    `V${h - r + o}`,
    arc(w - r, h),
    `H${r + o}`,
    arc(0, h - r),
    arrowSegment([0, c], [0, -1], [-1, 0], o),
    `V${r + o}`,
    arc(r, 0),
    'Z',
  ].join(' ');
}

function highlights(text: string, tokens: string[]) {
  const list = tokens.filter(Boolean);
  if (!list.length) return text;
  const pattern = new RegExp(
    `(${list.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  );
  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <span className="guide-highlight" key={index}>{part}</span>
    ) : (
      part
    ),
  );
}

const GuideBubbleSpecimen: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language].glass;
  const [open, setOpen] = useState(true);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const edgeId = useId().replace(/:/g, '');
  const [outline, setOutline] = useState('');
  const [frame, setFrame] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble || !open) return;
    const draw = () => {
      const w = bubble.offsetWidth;
      const h = bubble.offsetHeight;
      if (!w || !h) return;
      setFrame({ width: w + FRAME_PAD * 2, height: h + FRAME_PAD * 2 });
      setOutline(bubbleOutline(w, h));
    };
    draw();
    const resize = new ResizeObserver(draw);
    resize.observe(bubble);
    return () => resize.disconnect();
  }, [open, language]);

  return (
    <div className="tour-specimen">
      {open ? (
        <div className="guide-bubble" ref={bubbleRef} role="dialog" aria-label={t.tourTitle}>
          {outline ? (
            <div
              className="guide-surface"
              style={{ width: frame.width, height: frame.height, clipPath: `path('${outline}')` }}
              aria-hidden="true"
            >
              <svg className="guide-stroke-layer" width={frame.width} height={frame.height}>
                <defs>
                  <linearGradient id={edgeId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(255 255 255 / 0.3)" />
                    <stop offset="30%" stopColor="rgb(255 255 255 / 0.24)" />
                    <stop offset="70%" stopColor="rgb(255 255 255 / 0.24)" />
                    <stop offset="100%" stopColor="rgb(255 255 255 / 0.28)" />
                  </linearGradient>
                </defs>
                <path d={outline} fill="none" stroke={`url(#${edgeId})`} strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
          ) : null}
          <div className="guide-text">
            <div className="guide-header">
              <p className="guide-title">{t.tourTitle}</p>
              <button type="button" className="guide-close" aria-label={t.tourClose} onClick={() => setOpen(false)}>
                <X size={14} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <p className="guide-body">{highlights(t.tourBody, [t.tourHighlight, t.tourMore])}</p>
          </div>
          <div className="guide-footer">
            <span className="guide-step">{t.tourStep}</span>
            <button type="button" className="guide-action" onClick={() => setOpen(false)}>
              {t.tourAction}
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="tour-replay" onClick={() => setOpen(true)}>
          {t.tourShow}
        </button>
      )}
    </div>
  );
};

export default GuideBubbleSpecimen;
