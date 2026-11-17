/** Draft role map for the dark product UI. Not locked. Not a contract source.
 *  Only existing verified product colors. Nothing is averaged or invented.
 *  Leftover homepage grays stay on the Gray page inventory.
 */

export type ColorRoleId = 'background' | 'surface' | 'surface-raised' | 'overlay';
export type CrossLayerId = 'text' | 'border-subtle' | 'border-strong' | 'fill';

export type RoleCandidate = {
  hex: string;
  /** Translation key on translations[lang].colors */
  sourceKey: string;
  /** When true, show as 待定 (dashed empty frame). Do not fill the candidate color. */
  pending?: boolean;
};

export type DraftSwatch = {
  id: ColorRoleId | CrossLayerId;
  /** Mapped color value (hex or rgba), or null when the role is 待定. */
  hex: string | null;
  /** Other verified values that were not merged into `hex`. */
  alsoVerified?: RoleCandidate[];
};

/** Four stacking roles. Overlay and surface-raised have no single agreed hex. */
export const COLOR_ROLES: DraftSwatch[] = [
  { id: 'background', hex: '#101010' },
  { id: 'surface', hex: '#131313' },
  {
    id: 'surface-raised',
    hex: null,
    alsoVerified: [
      { hex: '#242424', sourceKey: 'layersRaisedHomepage' },
    ],
  },
  {
    id: 'overlay',
    hex: null,
    alsoVerified: [
      { hex: '#141414', sourceKey: 'layersOverlayBoardFloat' },
      { hex: '#222222', sourceKey: 'layersOverlayBoardSettings' },
    ],
  },
];

export const COLOR_CROSS_LAYER: DraftSwatch[] = [
  {
    id: 'border-subtle',
    hex: 'rgba(255,255,255,0.07)',
  },
  {
    id: 'border-strong',
    hex: '#232323',
    alsoVerified: [
      // Live homepage Dock column edge. Not merged with #232323. Not the confirmed strong fill.
      { hex: '#1A1A1A', sourceKey: 'layersBorderStrongDock', pending: true },
    ],
  },
  { id: 'fill', hex: '#2F2F2F' },
  {
    id: 'text',
    hex: null,
    alsoVerified: [
      { hex: '#E3E3E3', sourceKey: 'layersTextHomepage' },
      { hex: '#FFFFFF', sourceKey: 'layersTextBoard' },
    ],
  },
];

/** Formal board order: background, surface, surface-raised, overlay,
 *  border-subtle, border-strong, fill, text.
 *  Border is one type with two levels. Flyout separators are not a token here.
 */
export const COLOR_FORMAL_BOARD: DraftSwatch[] = [
  COLOR_ROLES[0],
  COLOR_ROLES[1],
  COLOR_ROLES[2],
  COLOR_ROLES[3],
  COLOR_CROSS_LAYER[0],
  COLOR_CROSS_LAYER[1],
  COLOR_CROSS_LAYER[2],
  COLOR_CROSS_LAYER[3],
];

export const COLOR_ROLE_PRIMARY = '#731DFB';
