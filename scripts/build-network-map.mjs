// Builds src/app/networkMapData.ts: a real China–Southeast Asia map as SVG paths.
// Source: Natural Earth 1:50m admin-0 countries (public domain).
// Run: node scripts/build-network-map.mjs [path/to/local.geojson]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SOURCE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson';
const OUT = path.resolve(import.meta.dirname, '../src/app/networkMapData.ts');

// Map window (degrees) and output width (px). Height follows from Mercator.
const BOUNDS = { west: 92, east: 125, south: -1, north: 27 };
const WIDTH = 800;

// Countries drawn in the primary land colour; the rest use the secondary colour.
const PRIMARY = new Set(['CHN', 'HKG', 'MAC', 'TWN']);

// Network locations. Label offsets keep Hong Kong and Shenzhen readable.
const LOCATIONS = {
  hk: { lon: 114.17, lat: 22.32, label: { dx: 12, dy: 18, anchor: 'start' } },
  // Real Shenzhen is 114.06, 22.54 — only ~5px from Hong Kong at this scale.
  // Drawn slightly north-west so both pins stay visible and clickable.
  sz: { lon: 113.55, lat: 23.05, label: { dx: -12, dy: -8, anchor: 'end' } },
  sg: { lon: 103.82, lat: 1.35, label: { dx: 12, dy: 5, anchor: 'start' } },
  bkk: { lon: 100.5, lat: 13.75, label: { dx: -12, dy: -10, anchor: 'end' } },
  sgn: { lon: 106.7, lat: 10.78, label: { dx: 12, dy: 5, anchor: 'start' } },
};

// Routes from Hong Kong. `via` bends the curve: sea lanes through the
// South China Sea, the road route overland through northern Vietnam.
const ROUTES = [
  { to: 'sz' },
  { to: 'sgn', via: { lon: 112.5, lat: 14 } },
  { to: 'sg', via: { lon: 113, lat: 6 } },
  { to: 'bkk', via: { lon: 104.5, lat: 21 } },
];

const COUNTRY_LABELS = [
  { en: 'CHINA', lon: 108, lat: 25.2 },
  { en: 'MYANMAR', lon: 96, lat: 21 },
  { en: 'LAOS', lon: 102.6, lat: 19.6 },
  { en: 'THAILAND', lon: 99.3, lat: 16.3 },
  { en: 'VIETNAM', lon: 107.4, lat: 16.6 },
  { en: 'CAMBODIA', lon: 104.9, lat: 12.9 },
  { en: 'MALAYSIA', lon: 101.8, lat: 4.4 },
  { en: 'PHILIPPINES', lon: 121.4, lat: 16.4 },
  { en: 'SOUTH CHINA SEA', lon: 114.2, lat: 15, sea: true },
];

const rad = (d) => (d * Math.PI) / 180;
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2));
const scale = WIDTH / rad(BOUNDS.east - BOUNDS.west);
const yTop = mercY(BOUNDS.north);
const HEIGHT = Math.round(scale * (yTop - mercY(BOUNDS.south)));
const project = (lon, lat) => [scale * rad(lon - BOUNDS.west), scale * (yTop - mercY(lat))];
const r1 = (n) => Math.round(n * 10) / 10;

// Sutherland–Hodgman: clip a ring to the map rectangle (plus a margin).
function clipRing(points) {
  const m = 6;
  const edges = [
    (p) => p[0] >= -m, (p) => p[0] <= WIDTH + m, (p) => p[1] >= -m, (p) => p[1] <= HEIGHT + m,
  ];
  const cross = [
    (a, b) => lerp(a, b, (-m - a[0]) / (b[0] - a[0])),
    (a, b) => lerp(a, b, (WIDTH + m - a[0]) / (b[0] - a[0])),
    (a, b) => lerp(a, b, (-m - a[1]) / (b[1] - a[1])),
    (a, b) => lerp(a, b, (HEIGHT + m - a[1]) / (b[1] - a[1])),
  ];
  let out = points;
  for (let e = 0; e < 4 && out.length; e++) {
    const input = out;
    out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i], prev = input[(i + input.length - 1) % input.length];
      const inCur = edges[e](cur), inPrev = edges[e](prev);
      if (inCur) { if (!inPrev) out.push(cross[e](prev, cur)); out.push(cur); }
      else if (inPrev) out.push(cross[e](prev, cur));
    }
  }
  return out;
}
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

function ringToPath(ring) {
  const pts = clipRing(ring.map(([lon, lat]) => project(lon, lat)));
  const kept = [];
  for (const p of pts) {
    const last = kept[kept.length - 1];
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= 0.9) kept.push([r1(p[0]), r1(p[1])]);
  }
  if (kept.length < 3) return '';
  return 'M' + kept.map((p) => p.join(' ')).join('L') + 'Z';
}

const geo = process.argv[2]
  ? JSON.parse(readFileSync(process.argv[2], 'utf8'))
  : await (await fetch(SOURCE)).json();

const land = [];
for (const f of geo.features) {
  const iso = f.properties.ADM0_A3;
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys.map((poly) => poly.map(ringToPath).join('')).join('');
  if (d) land.push({ iso, primary: PRIMARY.has(iso), d });
}

const locations = Object.fromEntries(Object.entries(LOCATIONS).map(([id, l]) => {
  const [x, y] = project(l.lon, l.lat);
  return [id, { x: r1(x), y: r1(y), label: l.label }];
}));

const routes = ROUTES.map(({ to, via }) => {
  const a = locations.hk, b = locations[to];
  if (!via) return { to, d: `M${a.x} ${a.y}L${b.x} ${b.y}` };
  const [cx, cy] = project(via.lon, via.lat);
  return { to, d: `M${a.x} ${a.y}Q${r1(cx)} ${r1(cy)} ${b.x} ${b.y}` };
});

const countryLabels = COUNTRY_LABELS.map(({ en, lon, lat, sea }) => {
  const [x, y] = project(lon, lat);
  return { en, x: r1(x), y: r1(y), sea: !!sea };
});

const ts = `// GENERATED by scripts/build-network-map.mjs. Do not edit by hand.
// Natural Earth 1:50m countries (public domain), Mercator, lon ${BOUNDS.west}–${BOUNDS.east}, lat ${BOUNDS.south}–${BOUNDS.north}.
export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};
export const mapLand: { iso: string; primary: boolean; d: string }[] = ${JSON.stringify(land)};
export const mapLocations: Record<string, { x: number; y: number; label: { dx: number; dy: number; anchor: 'start' | 'end' } }> = ${JSON.stringify(locations)};
export const mapRoutes: { to: string; d: string }[] = ${JSON.stringify(routes)};
export const mapCountryLabels: { en: string; x: number; y: number; sea: boolean }[] = ${JSON.stringify(countryLabels)};
`;
writeFileSync(OUT, ts);
console.log(`Wrote ${OUT}: ${land.length} countries, ${WIDTH}x${HEIGHT}, ${(ts.length / 1024).toFixed(1)} KB`);
