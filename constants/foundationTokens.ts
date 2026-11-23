/* Decided foundation tokens. The same names and values are in index.css :root.
   Pending roles (surface-raised, overlay, text) and pending radius duties
   (menu item, pill, toast, sheet) are not variables. */

export const SPACING_SCALE = [
  { token: '--spacing-01', px: 2 },
  { token: '--spacing-02', px: 4 },
  { token: '--spacing-03', px: 8 },
  { token: '--spacing-04', px: 12 },
  { token: '--spacing-05', px: 16 },
  { token: '--spacing-06', px: 24 },
  { token: '--spacing-07', px: 32 },
  { token: '--spacing-08', px: 40 },
] as const;

export const DURATION_SCALE = [
  { token: '--dur-fast', ms: 160 },
  { token: '--dur-base', ms: 200 },
  { token: '--dur-slow', ms: 250 },
] as const;

export const EASE_SCALE = [
  { token: '--ease-fast', value: 'cubic-bezier(0.23, 1, 0.32, 1)' },
  { token: '--ease-enter', value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
] as const;

export const RADIUS_SCALE = [
  { token: '--radius-01', px: 6 },
  { token: '--radius-02', px: 8 },
  { token: '--radius-03', px: 10 },
  { token: '--radius-04', px: 12 },
  { token: '--radius-05', px: 16 },
  { token: '--radius-pill', px: 9999 },
] as const;

export function spacingPx(token: (typeof SPACING_SCALE)[number]['token']): number {
  const row = SPACING_SCALE.find((item) => item.token === token);
  if (!row) throw new Error(token);
  return row.px;
}

export function radiusPx(token: (typeof RADIUS_SCALE)[number]['token']): number {
  const row = RADIUS_SCALE.find((item) => item.token === token);
  if (!row) throw new Error(token);
  return row.px;
}
