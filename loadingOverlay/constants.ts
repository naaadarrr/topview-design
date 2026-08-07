import type React from 'react';

import type { CanvasLoadingAnimationParams } from './types';

export const DEFAULT_CANVAS_LOADING_ANIMATION_PARAMS: CanvasLoadingAnimationParams = {
  dotSize: 7.5,
  speed: 1.11,
  wavelength: 0.5,
  sharpness: 0.41,
  restOpacity: 0.32,
  hoverRadius: 0.4,
  pointerPush: 0.2,
  dotFollowSpeed: 0.1,
  dotShape: 'circle',
};

export const LOADING_OVERLAY_STYLES = {
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    opacity: 1,
    transition: 'opacity 0.42s cubic-bezier(0.23, 1, 0.32, 1)',
    pointerEvents: 'all',
  } satisfies React.CSSProperties,
  overlayHidden: {
    opacity: 0,
    pointerEvents: 'none',
  } satisfies React.CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity 0.15s ease',
  } satisfies React.CSSProperties,
  logo: {
    width: 88,
    height: 88,
    display: 'block',
    touchAction: 'none',
    cursor: 'none',
  } satisfies React.CSSProperties,
  text: {
    margin: '20px 0 0',
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: '0.06em',
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  } satisfies React.CSSProperties,
} as const;
