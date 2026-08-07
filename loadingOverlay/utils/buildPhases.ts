import type { LogoDot } from '../types';

export function buildPhases(dots: ReadonlyArray<LogoDot>): Float32Array {
  const arr = new Float32Array(dots.length);
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < dots.length; i++) {
    const ph = (dots[i][0] + dots[i][1]) * 0.5;
    arr[i] = ph;
    if (ph < min) min = ph;
    if (ph > max) max = ph;
  }
  const range = max - min || 1;
  for (let i = 0; i < arr.length; i++) arr[i] = (arr[i] - min) / range;
  return arr;
}
