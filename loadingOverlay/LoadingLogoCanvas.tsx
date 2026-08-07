import React, { useLayoutEffect, useRef } from 'react';

import { LOGO_DOTS } from './assets/logoDots.generated';
import { LOADING_OVERLAY_STYLES } from './constants';
import type { LoadingLogoCanvasProps } from './types';
import { buildPhases } from './utils/buildPhases';

const LOGO_PHASES = buildPhases(LOGO_DOTS);

export function LoadingLogoCanvas({
  animationParams,
  logoSize,
  onFirstFrameReady,
}: LoadingLogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1, y: -1, active: false });
  const dotsStateRef = useRef(
    LOGO_DOTS.map((pos) => ({
      homeX: pos[0],
      homeY: pos[1],
      x: pos[0],
      y: pos[1],
      speedMult: 0.8 + Math.random() * 0.4,
    })),
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dpr = 1;
    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, window.devicePixelRatio || 1);
      const cssSize = Math.max(rect.width, rect.height);
      const px = Math.round(cssSize * dpr);
      canvas.width = px;
      canvas.height = px;
    }
    resize();
    window.addEventListener('resize', resize);

    const pointer = pointerRef.current;
    const dotsState = dotsStateRef.current;

    function onPointerEnter() {
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    function onPointerMove(e: PointerEvent) {
      if (reducedMotion || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    }

    canvas.addEventListener('pointerenter', onPointerEnter);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointermove', onPointerMove);

    const {
      dotSize,
      speed,
      wavelength,
      sharpness,
      restOpacity,
      hoverRadius,
      pointerPush,
      dotFollowSpeed,
      dotShape,
    } = animationParams;

    const sigma = Math.max(0.015, wavelength * 0.5 * (1.05 - sharpness));
    const period = 1 + 2 * sigma;
    const start = performance.now();
    let raf: number;

    function drawFrame(now: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      const side = Math.min(W, H) * (1 - 0.08 * 2);
      const ox = (W - side) / 2;
      const oy = (H - side) / 2;

      ctx.clearRect(0, 0, W, H);

      const elapsed = (now - start) / 1000;
      const t = ((elapsed * speed) % period + period) % period;
      const crest = t - sigma;
      const radius = dotSize * (side / 600);
      const minRadius = 0.75 * dpr;

      for (let i = 0; i < LOGO_DOTS.length; i++) {
        const dot = dotsState[i];
        const diff = LOGO_PHASES[i] - crest;
        const w = Math.exp(-(diff * diff) / (sigma * sigma));

        let targetX = dot.homeX;
        let targetY = dot.homeY;

        if (!reducedMotion && pointer.active) {
          const dx = dot.homeX - pointer.x;
          const dy = dot.homeY - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius && dist > 0.001) {
            const force = (hoverRadius - dist) / hoverRadius;
            const push = force * force * pointerPush;
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        }

        const currentSpeed = dotFollowSpeed * dot.speedMult;
        dot.x += (targetX - dot.x) * currentSpeed;
        dot.y += (targetY - dot.y) * currentSpeed;

        const scale = 1 + w * 1.3;
        const opacity = restOpacity + w * (1 - restOpacity);
        const px = ox + dot.x * side;
        const py = oy + dot.y * side;
        const r = Math.max(radius * scale, minRadius);

        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        if (dotShape === 'square') {
          ctx.fillRect(px - r, py - r, r * 2, r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop() {
      drawFrame(performance.now());
      raf = requestAnimationFrame(loop);
    }

    drawFrame(performance.now());
    onFirstFrameReady?.();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [animationParams, onFirstFrameReady]);

  return (
    <canvas
      ref={canvasRef}
      style={{ ...LOADING_OVERLAY_STYLES.logo, width: logoSize, height: logoSize }}
      aria-hidden
    />
  );
}
