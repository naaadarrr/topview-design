import React, { useState, useEffect, useRef } from 'react';
import { GlobalCanvasLoadingOverlay } from '../loadingOverlay';

interface SplashProps {
  onComplete?: () => void;
}

async function waitForCatalogFonts() {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load('400 112px "Instrument Serif"'),
      document.fonts.load('400 16px "Instrument Sans"'),
    ]);
    await document.fonts.ready;
  } catch {
    // Fonts may fail offline; still proceed.
  }
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    let animationFrameId = 0;
    const startTime = performance.now();
    const duration = 2100;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - rawProgress, 2.5);
      const currentVal = Math.min(100, Math.floor(eased * 100));

      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      setProgress(100);
      if (completedRef.current) return;
      completedRef.current = true;

      void (async () => {
        await waitForCatalogFonts();
        // Brief hold at 100% before the curtain rises
        setTimeout(() => onComplete?.(), 200);
      })();
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <GlobalCanvasLoadingOverlay
        visible={true}
        text={`${progress}%`}
      />
    </div>
  );
};

export default Splash;
