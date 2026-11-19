import { LOGO_DOTS } from '../../loadingOverlay/assets/logoDots.generated';
import { DEFAULT_CANVAS_LOADING_ANIMATION_PARAMS as defaults } from '../../loadingOverlay/constants';
import { buildPhases } from '../../loadingOverlay/utils/buildPhases';

export interface PreviewRenderer {
  resize(width: number, height: number): void;
  draw(time: number, pointer: readonly [number, number] | null, motion: boolean): void;
  dispose(): void;
}

const GLYPH = 0.72;

export function placeParticles(
  homes: ReadonlyArray<readonly [number, number]>,
  x: Float32Array,
  y: Float32Array,
  speed: Float32Array,
  formed: Float32Array,
  pointer: readonly [number, number] | null,
  motion: boolean,
  time: number,
  dt: number,
) {
  const frames = Math.min(4, Math.max(dt, 1 / 60) * 60);
  const glyph = motion && pointer
    ? [(pointer[0] - (1 - GLYPH) / 2) / GLYPH, (pointer[1] - (1 - GLYPH) / 2) / GLYPH] as const
    : null;
  for (let i = 0; i < homes.length; i++) {
    formed[i] = 1;
    let targetX = homes[i][0];
    let targetY = homes[i][1];
    if (glyph) {
      const dx = targetX - glyph[0];
      const dy = targetY - glyph[1];
      const dist = Math.hypot(dx, dy);
      if (dist < defaults.hoverRadius && dist > 0.001) {
        const force = (defaults.hoverRadius - dist) / defaults.hoverRadius;
        const push = force * force * defaults.pointerPush;
        targetX += (dx / dist) * push;
        targetY += (dy / dist) * push;
      }
    }
    if (!motion) {
      x[i] = homes[i][0];
      y[i] = homes[i][1];
      continue;
    }
    const follow = 1 - Math.pow(1 - defaults.dotFollowSpeed * speed[i], frames);
    x[i] += (targetX - x[i]) * follow;
    y[i] += (targetY - y[i]) * follow;
  }
}

export function mountPreview({ canvas, createRenderer, paused, reducedMotion, clock, onFailure, onFirstFrame }: {
  canvas: HTMLCanvasElement;
  createRenderer: (canvas: HTMLCanvasElement) => PreviewRenderer;
  paused: boolean;
  reducedMotion: boolean;
  clock: { time: number };
  onFailure: (message: string) => void;
  onFirstFrame?: () => void;
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
  let pointer: readonly [number, number] | null = null;
  let reportedFrame = false;
  const canAnimate = () => !stopped && !paused && !reducedMotion && !document.hidden && inView;
  const draw = () => {
    if (stopped) return;
    try { renderer.draw(clock.time, pointer, !reducedMotion); }
    catch (error: unknown) { stop(); onFailure(error instanceof Error ? error.message : 'Drawing failed'); return; }
    if (!reportedFrame) {
      reportedFrame = true;
      onFirstFrame?.();
    }
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
    const width = Math.max(512, Math.round(rect.width * dpr));
    const height = Math.max(512, Math.round(rect.height * dpr));
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
    pointer = [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height];
    if (!canAnimate()) draw();
  };
  const onLeave = () => { pointer = null; if (!canAnimate()) draw(); };
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
  const plate = document.createElement('canvas');
  const plateCtx = plate.getContext('2d');
  if (!plateCtx) throw new Error('Canvas2D unavailable');
  const x = Float32Array.from(LOGO_DOTS, (dot) => dot[0]);
  const y = Float32Array.from(LOGO_DOTS, (dot) => dot[1]);
  const speed = Float32Array.from(LOGO_DOTS, (_, i) => 0.8 + ((i * 0.61803398875) % 1) * 0.4);
  const formed = new Float32Array(LOGO_DOTS.length);
  let previous = 0;
  return {
    resize() {},
    draw(time, pointer, motion) {
      const dt = previous ? Math.min(Math.max(time - previous, 0), 0.1) : 1 / 60;
      previous = time;
      placeParticles(LOGO_DOTS, x, y, speed, formed, pointer, motion, time, dt);
      if (plate.width !== canvas.width || plate.height !== canvas.height) {
        plate.width = canvas.width;
        plate.height = canvas.height;
      }
      const side = Math.min(canvas.width, canvas.height) * GLYPH;
      const ox = (canvas.width - side) / 2;
      const oy = (canvas.height - side) / 2;
      const sigma = Math.max(0.015, defaults.wavelength * 0.5 * (1.05 - defaults.sharpness));
      const crest = ((time * defaults.speed) % (1 + 2 * sigma)) - sigma;
      const dpr = canvas.width / Math.max(1, canvas.clientWidth || 140);
      plateCtx.clearRect(0, 0, plate.width, plate.height);
      for (let i = 0; i < LOGO_DOTS.length; i++) {
        const diff = phases[i] - crest;
        const wave = motion ? Math.exp(-(diff * diff) / (sigma * sigma)) * formed[i] : 0;
        const radius = Math.max(defaults.dotSize * side / 520 * (0.45 + 0.55 * formed[i]) * (1 + wave * 0.45), 0.6 * dpr);
        plateCtx.globalAlpha = 0.55 + 0.45 * formed[i];
        plateCtx.fillStyle = '#fff';
        plateCtx.beginPath();
        plateCtx.arc(ox + x[i] * side, oy + y[i] * side, radius, 0, Math.PI * 2);
        plateCtx.fill();
      }
      const gathered = formed.reduce((sum, value) => sum + value, 0) / formed.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.filter = `blur(${Math.max(1, canvas.width * (0.008 + 0.028 * gathered))}px)`;
      ctx.globalAlpha = 0.35 + 0.6 * gathered;
      ctx.drawImage(plate, 0, 0);
      ctx.restore();
      ctx.drawImage(plate, 0, 0);
    },
    dispose() { ctx.clearRect(0, 0, canvas.width, canvas.height); },
  };
}
