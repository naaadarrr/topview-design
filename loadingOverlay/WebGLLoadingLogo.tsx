import React, { useEffect, useRef, useState } from 'react';

import { createCrystalRenderer } from '../experiments/loading-logo/crystalRenderer';
import { mountPreview } from '../experiments/loading-logo/previewRuntime';
import { LOADING_OVERLAY_STYLES } from './constants';
import { LoadingLogoCanvas } from './LoadingLogoCanvas';
import type { LoadingLogoCanvasProps } from './types';

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function WebGLLoadingLogo({ animationParams, logoSize, onFirstFrameReady }: LoadingLogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clock = useRef({ time: 0 });
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (failed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    return mountPreview({
      canvas,
      createRenderer: createCrystalRenderer,
      paused: false,
      reducedMotion,
      clock: clock.current,
      onFailure: () => setFailed(true),
      onFirstFrame: onFirstFrameReady,
    });
  }, [failed, reducedMotion, onFirstFrameReady]);

  if (failed) {
    return (
      <LoadingLogoCanvas
        animationParams={animationParams}
        logoSize={logoSize}
        onFirstFrameReady={onFirstFrameReady}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ ...LOADING_OVERLAY_STYLES.logo, width: logoSize, height: logoSize }}
      aria-hidden
    />
  );
}
