/** Tunable animation parameters for the dot logo wave + mouse hover push. */
export interface CanvasLoadingAnimationParams {
  dotSize: number;
  speed: number;
  wavelength: number;
  sharpness: number;
  restOpacity: number;
  hoverRadius: number;
  pointerPush: number;
  dotFollowSpeed: number;
  dotShape: 'circle' | 'square';
}

export interface GlobalCanvasLoadingOverlayProps {
  /** When false, overlay fades out but stays mounted for smooth exit. */
  visible: boolean;
  /** Loading label below the logo. Default: "Loading..." */
  text?: string;
  className?: string;
  /** Logo canvas size in px. Default: 88 */
  logoSize?: number;
  /** Gap between logo and text in px. Default: 24 */
  textGap?: number;
  animationParams?: Partial<CanvasLoadingAnimationParams>;
}

export interface LoadingLogoCanvasProps {
  animationParams: CanvasLoadingAnimationParams;
  logoSize: number;
  onFirstFrameReady?: () => void;
}

export type LogoDot = readonly [number, number];
