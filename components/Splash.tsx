import React, { useState, useEffect } from 'react';
import { GlobalCanvasLoadingOverlay } from '../loadingOverlay';

interface SplashProps {
  onComplete?: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 2100; // 2.1s duration for 0 -> 100 counter

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      
      // Smooth cubic ease-out curve for natural counting speed
      const eased = 1 - Math.pow(1 - rawProgress, 2.5);
      const currentVal = Math.min(100, Math.floor(eased * 100));

      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        if (onComplete) {
          setTimeout(onComplete, 250);
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
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
