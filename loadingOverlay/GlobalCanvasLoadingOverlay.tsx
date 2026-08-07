import React, { useCallback, useState } from 'react';

import { DEFAULT_CANVAS_LOADING_ANIMATION_PARAMS, LOADING_OVERLAY_STYLES } from './constants';
import { LoadingLogoCanvas } from './LoadingLogoCanvas';
import type {
  CanvasLoadingAnimationParams,
  GlobalCanvasLoadingOverlayProps,
} from './types';

export function GlobalCanvasLoadingOverlay({
  visible,
  text = 'Loading...',
  className,
  logoSize = 88,
  textGap = 24,
  animationParams,
}: GlobalCanvasLoadingOverlayProps) {
  const [contentReady, setContentReady] = useState(false);
  const handleFirstFrameReady = useCallback(() => {
    setContentReady(true);
  }, []);

  const resolvedParams: CanvasLoadingAnimationParams = {
    ...DEFAULT_CANVAS_LOADING_ANIMATION_PARAMS,
    ...animationParams,
  };

  return (
    <div
      className={className}
      style={{
        ...LOADING_OVERLAY_STYLES.overlay,
        ...(visible ? null : LOADING_OVERLAY_STYLES.overlayHidden),
      }}
      aria-busy={visible}
      aria-live="polite"
    >
      <div style={{ ...LOADING_OVERLAY_STYLES.content, opacity: contentReady ? 1 : 0 }}>
        <LoadingLogoCanvas
          animationParams={resolvedParams}
          logoSize={logoSize}
          onFirstFrameReady={handleFirstFrameReady}
        />
        <p style={{ ...LOADING_OVERLAY_STYLES.text, marginTop: textGap }}>{text}</p>
      </div>
    </div>
  );
}
