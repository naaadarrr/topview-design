import React, { useEffect, useRef, useState } from 'react';
import { createCrystalRenderer } from './crystalRenderer';
import { createCanvasReference, mountPreview, type PreviewRenderer } from './previewRuntime';
import './loading-logo-experiment.css';

type Mode = 'compare' | 'webgl' | 'canvas';

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

function PreviewCanvas({ kind, paused, reducedMotion }: { kind: 'webgl' | 'canvas'; paused: boolean; reducedMotion: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const clock = useRef({ time: 0 });
  const [failure, setFailure] = useState('');
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || failure) return;
    const createRenderer: (canvas: HTMLCanvasElement) => PreviewRenderer = kind === 'webgl' ? createCrystalRenderer : createCanvasReference;
    return mountPreview({ canvas, createRenderer, paused, reducedMotion, clock: clock.current, onFailure: setFailure });
  }, [kind, paused, reducedMotion, failure]);
  if (failure && kind === 'webgl') {
    return <div className="loadingLab-fallback"><PreviewCanvas kind="canvas" paused={paused} reducedMotion={reducedMotion} /><p role="status">Canvas2D fallback. Replay retries WebGL.</p><details><summary>Renderer details</summary><p>{failure}</p></details></div>;
  }
  if (failure) return <p role="status">Canvas rendering unavailable.</p>;
  return <canvas ref={ref} className="loadingLab-canvas" role="img" aria-label={kind === 'webgl' ? 'Lit microcrystal loading logo' : 'Canvas2D loading logo'} />;
}

export default function LoadingLogoExperiment() {
  const [mode, setMode] = useState<Mode>('compare');
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const reducedMotion = useReducedMotion();
  return (
    <main className="loadingLab">
      <header className="loadingLab-header">
        <h1>Loading logo</h1>
        <a href="/">Back to site</a>
      </header>
      <div className="loadingLab-controls" role="group" aria-label="Renderer comparison">
        <button type="button" aria-pressed={mode === 'compare'} onClick={() => setMode('compare')}>Compare</button>
        <button type="button" aria-pressed={mode === 'webgl'} onClick={() => setMode('webgl')}>WebGL</button>
        <button type="button" aria-pressed={mode === 'canvas'} onClick={() => setMode('canvas')}>Canvas2D</button>
        <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? 'Resume' : 'Pause'}</button>
        <button type="button" onClick={() => { setReplay((value) => value + 1); setPaused(false); }}>Replay</button>
      </div>
      <div className="loadingLab-specimens">
        {mode !== 'webgl' && <section><h2>Canvas2D</h2><div className="loadingLab-stage"><PreviewCanvas key={`canvas-${replay}`} kind="canvas" paused={paused} reducedMotion={reducedMotion} /></div></section>}
        {mode !== 'canvas' && <section><h2>WebGL microcrystals</h2><div className="loadingLab-stage"><PreviewCanvas key={`webgl-${replay}`} kind="webgl" paused={paused} reducedMotion={reducedMotion} /></div></section>}
      </div>
      <p className="loadingLab-note" role="status">88px. {reducedMotion ? 'Reduced motion: static rendering.' : paused ? 'Paused.' : 'Continuous preview.'} Official loading is unchanged.</p>
    </main>
  );
}
