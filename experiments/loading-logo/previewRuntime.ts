import { LOGO_DOTS } from '../../loadingOverlay/assets/logoDots.generated';
import { DEFAULT_CANVAS_LOADING_ANIMATION_PARAMS as defaults } from '../../loadingOverlay/constants';
import { buildPhases } from '../../loadingOverlay/utils/buildPhases';

export interface PreviewRenderer {
  resize(width: number, height: number): void;
  draw(time: number, pointer: readonly [number, number], motion: boolean): void;
  dispose(): void;
}

export function mountPreview({ canvas, createRenderer, paused, reducedMotion, clock, onFailure }: {
  canvas: HTMLCanvasElement;
  createRenderer: (canvas: HTMLCanvasElement) => PreviewRenderer;
  paused: boolean;
  reducedMotion: boolean;
  clock: { time: number };
  onFailure: (message: string) => void;
}): () => void {
  let renderer: PreviewRenderer;
  try { renderer = createRenderer(canvas); }
  catch (error: unknown) {
    onFailure(error instanceof Error ? error.message : 'Renderer unavailable');
    return () => {};
  }
  let stopped = false;
  let frame = 0;
  let lastTime = 0;
  let inView = true;
  let pointer: readonly [number, number] = [0, 0];
  const canAnimate = () => !stopped && !paused && !reducedMotion && !document.hidden && inView;
  const draw = () => {
    if (stopped) return;
    try { renderer.draw(clock.time, pointer, !reducedMotion); }
    catch (error: unknown) { stop(); onFailure(error instanceof Error ? error.message : 'Drawing failed'); }
  };
  const tick = (now: number) => {
    frame = 0;
    if (!canAnimate()) return;
    if (!lastTime) lastTime = now;
    if (now - lastTime >= 1000 / 30) {
      clock.time += Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      draw();
    }
    if (canAnimate()) frame = requestAnimationFrame(tick);
  };
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (!stopped && !document.hidden && inView) draw();
    if (canAnimate()) frame = requestAnimationFrame(tick);
  };
  const resize = () => {
    if (stopped) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    try {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      renderer.resize(width, height);
      if (!document.hidden && inView) draw();
    } catch (error: unknown) { stop(); onFailure(error instanceof Error ? error.message : 'Resize failed'); }
  };
  const onPointer = (event: PointerEvent) => {
    if (paused || reducedMotion) return;
    const rect = canvas.getBoundingClientRect();
    pointer = [(event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1];
  };
  const onLeave = () => { pointer = [0, 0]; };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    stop();
    onFailure('WebGL context lost. Replay retries WebGL.');
  };
  const observer = new ResizeObserver(resize);
  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false;
    schedule();
    if (inView && !document.hidden) draw();
  });
  function stop() {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    document.removeEventListener('visibilitychange', schedule);
    canvas.removeEventListener('pointermove', onPointer);
    canvas.removeEventListener('pointerleave', onLeave);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    renderer.dispose();
  }
  document.addEventListener('visibilitychange', schedule);
  canvas.addEventListener('pointermove', onPointer);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('webglcontextlost', onContextLost);
  observer.observe(canvas);
  intersection.observe(canvas);
  resize();
  schedule();
  return stop;
}

const phases = buildPhases(LOGO_DOTS);
export function createCanvasReference(canvas: HTMLCanvasElement): PreviewRenderer {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas2D unavailable');
  return {
    resize() {},
    draw(time, _pointer, motion) {
      const side = Math.min(canvas.width, canvas.height) * 0.84;
      const ox = (canvas.width - side) / 2;
      const oy = (canvas.height - side) / 2;
      const sigma = Math.max(0.015, defaults.wavelength * 0.5 * (1.05 - defaults.sharpness));
      const crest = ((time * defaults.speed) % (1 + 2 * sigma)) - sigma;
      const dpr = canvas.width / 88;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < LOGO_DOTS.length; i++) {
        const [x, y] = LOGO_DOTS[i];
        const diff = phases[i] - crest;
        const wave = motion ? Math.exp(-(diff * diff) / (sigma * sigma)) : 0;
        const radius = Math.max(defaults.dotSize * side / 600 * (1 + wave * 1.3), 0.75 * dpr);
        const opacity = motion ? defaults.restOpacity + wave * (1 - defaults.restOpacity) : 0.72;
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.beginPath();
        ctx.arc(ox + x * side, oy + y * side, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    dispose() { ctx.clearRect(0, 0, canvas.width, canvas.height); },
  };
}
