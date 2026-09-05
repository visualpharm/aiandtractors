import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', '..');
const scaleDir = path.join(root, 'public', 'scale');
const framesDir = path.join(scaleDir, '.animation-frames-v5');
const width = 1080;
const height = 1350;
const fps = 24;
const seconds = 18;
const frameCount = fps * seconds;

const colors = {
  ink: '#17212b',
  muted: '#68727d',
  grid: '#dce2e6',
  teal: '#147d78',
  orange: '#d75f32',
  white: '#ffffff',
};

function parseCsvLine(line) {
  const cells = [];
  let value = '';
  let quoted = false;
  for (const char of line) {
    if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) {
      cells.push(value);
      value = '';
    } else value += char;
  }
  cells.push(value);
  return cells;
}

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function ease(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function fadeWindow(time, start, holdEnd, end) {
  return Math.min(ease((time - start) / 0.35), 1 - ease((time - holdEnd) / (end - holdEnd)));
}

const csvLines = fs.readFileSync(path.join(scaleDir, 'cs10h-readings.csv'), 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(csvLines[0]);
const column = Object.fromEntries(headers.map((name, index) => [name, index]));
const ivan = csvLines
  .slice(1)
  .map(parseCsvLine)
  .map((row) => ({
    weight: Number(row[column['Weight(kg)']]),
    fat: Number(row[column['Body Fat(%)']]),
  }))
  .filter((row) => Number.isFinite(row.weight) && Number.isFinite(row.fat))
  .map((row) => ({ ...row, bmi: row.weight / 1.86 ** 2 }));

const peerCsvLines = fs.readFileSync(path.join(scaleDir, 'cs10h-peer-review.csv'), 'utf8').trim().split(/\r?\n/);
const peerHeaders = parseCsvLine(peerCsvLines[0]);
const peerColumn = Object.fromEntries(peerHeaders.map((name, index) => [name, index]));
const peer = peerCsvLines
  .slice(1)
  .map(parseCsvLine)
  .map((row) => ({
    bmi: Number(row[peerColumn.bmi]),
    fat: Number(row[peerColumn.reported_body_fat_pct]),
  }))
  .filter((row) => Number.isFinite(row.bmi) && Number.isFinite(row.fat));

const formulas = {
  ivan: { slope: 1.5, intercept: -17.5 },
  peer: {
    slope: 1.5,
    intercept: peer.reduce((sum, point) => sum + point.fat - 1.5 * point.bmi, 0) / peer.length,
  },
};

const orderedIvan = [...ivan].sort((a, b) => a.weight - b.weight);
const representatives = [
  orderedIvan[0],
  orderedIvan[Math.floor(orderedIvan.length / 2)],
  orderedIvan.at(-1),
];

const dataUri = (buffer, mime = 'image/png') => `data:${mime};base64,${buffer.toString('base64')}`;

async function removeWhiteBackground(input, extract) {
  const image = sharp(input).extract(extract).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const alpha = new Uint8Array(info.width * info.height);

  for (let y = 0; y < info.height; y += 1) {
    let left = info.width;
    let right = -1;
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * 4;
      const distance = Math.max(255 - data[offset], 255 - data[offset + 1], 255 - data[offset + 2]);
      if (distance > 13) {
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
      alpha[y * info.width + x] = Math.max(0, Math.min(255, Math.round((distance - 2) * 24)));
    }

    if (right > left && y < info.height * 0.53) {
      for (let x = left; x <= right; x += 1) alpha[y * info.width + x] = 255;
    }
  }

  for (let i = 0; i < alpha.length; i += 1) data[i * 4 + 3] = alpha[i];
  return sharp(data, { raw: info })
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
}

const ivanSheet = path.join(import.meta.dirname, 'ivan-body-compositions.png');
const ivanSprites = [];
for (let index = 0; index < 3; index += 1) {
  ivanSprites.push(dataUri(await removeWhiteBackground(ivanSheet, {
    left: index * 512,
    top: 0,
    width: 512,
    height: 1024,
  })));
}

const logoSprite = dataUri(await sharp(path.join(scaleDir, 'ge-logo.svg')).resize(92, 92).png().toBuffer());
const clownSprite = dataUri(await sharp(path.join(import.meta.dirname, 'clown-emoji.png')).trim().resize(92, 92, { fit: 'fill' }).png().toBuffer());
const peerSprite = dataUri(await sharp(path.join(import.meta.dirname, 'peer-reviewer-silhouette.png')).trim().png().toBuffer());

const chart = { left: 90, top: 294, width: 900, height: 446 };
const domain = { xMin: 22, xMax: 42, yMin: 14, yMax: 48 };
const sx = (value) => chart.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * chart.width;
const sy = (value) => chart.top + chart.height - (value - domain.yMin) / (domain.yMax - domain.yMin) * chart.height;
const linePath = (formula) => `M ${sx(domain.xMin)} ${sy(formula.slope * domain.xMin + formula.intercept)} L ${sx(domain.xMax)} ${sy(formula.slope * domain.xMax + formula.intercept)}`;
const lineSegmentPath = (formula, minBmi, maxBmi) => `M ${sx(minBmi)} ${sy(formula.slope * minBmi + formula.intercept)} L ${sx(maxBmi)} ${sy(formula.slope * maxBmi + formula.intercept)}`;

const xTicks = [22, 26, 30, 34, 38, 42];
const yTicks = [20, 30, 40];
const grid = [
  ...xTicks.map((value) => `<line x1="${sx(value)}" y1="${chart.top}" x2="${sx(value)}" y2="${chart.top + chart.height}" stroke="${colors.grid}"/><text x="${sx(value)}" y="${chart.top + chart.height + 34}" text-anchor="middle" class="tick">${value}</text>`),
  ...yTicks.map((value) => `<line x1="${chart.left}" y1="${sy(value)}" x2="${chart.left + chart.width}" y2="${sy(value)}" stroke="${colors.grid}"/><text x="${chart.left - 16}" y="${sy(value) + 7}" text-anchor="end" class="tick">${value}%</text>`),
].join('');

const peerDots = peer.map((point, index) => `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="5" fill="${colors.orange}" opacity="${0.44 + index * 0.06}"/>`).join('');

const pointKey = (point) => `${point.bmi.toFixed(9)}|${point.fat.toFixed(1)}`;
const multiplicity = orderedIvan.reduce((counts, point) => {
  const key = pointKey(point);
  counts.set(key, (counts.get(key) || 0) + 1);
  return counts;
}, new Map());
const seenMultiplicity = new Map();
const orderedPlottedIvan = orderedIvan.map((point) => {
  const key = pointKey(point);
  const duplicateIndex = seenMultiplicity.get(key) || 0;
  seenMultiplicity.set(key, duplicateIndex + 1);
  return { ...point, duplicateIndex, duplicateCount: multiplicity.get(key) };
});

const ivanPointGroups = [
  orderedPlottedIvan.slice(0, 12),
  orderedPlottedIvan.slice(12, 24),
  orderedPlottedIvan.slice(24),
];

const ivanSegments = ivanPointGroups.map((points) => ({
  min: Math.min(...points.map((point) => point.bmi)) - 0.08,
  max: Math.max(...points.map((point) => point.bmi)) + 0.08,
}));

function activeIvanGroup(time) {
  if (time < 1.8) return 0;
  if (time < 3.9) return 1;
  return 2;
}

function ivanDotsMarkup(activeGroup, activeOpacity) {
  return ivanPointGroups.flatMap((points, groupIndex) => [...points].sort((a, b) => b.duplicateIndex - a.duplicateIndex).map((point) => {
    const active = groupIndex === activeGroup && activeOpacity > 0.5;
    const radius = (active ? 3.8 : 2.7) + point.duplicateIndex * 1.75;
    return `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="${radius}" fill="${active && point.duplicateIndex === 0 ? colors.teal : colors.white}" stroke="${colors.teal}" stroke-width="${active ? 1.7 : 1.4}" opacity="${active ? 1 : 0.86}"/>`;
  })).join('');
}

const ivanFigures = [
  { x: 88, center: 178, width: 180, height: 370 },
  { x: 270, center: 365, width: 190, height: 370 },
  { x: 462, center: 562, width: 200, height: 370 },
];

function personLayer() {
  return ivanFigures.map((figure, index) => (
    `<image href="${ivanSprites[index]}" x="${figure.x}" y="842" width="${figure.width}" height="${figure.height}" opacity="1" preserveAspectRatio="xMidYMax meet"/>`
  )).join('');
}

function personHighlightLayer(activeGroup, activeOpacity) {
  const figure = ivanFigures[activeGroup];
  return `<line x1="${figure.center}" y1="870" x2="${figure.center}" y2="1195" stroke="${colors.teal}" stroke-width="${figure.width * 0.72}" stroke-linecap="round" opacity="${0.16 * activeOpacity}"/>`;
}

function frameSvg(frame) {
  const time = frame / fps;
  const socksReveal = fadeWindow(time, 6.0, 7.75, 8.15);
  const gadgetsReveal = fadeWindow(time, 8.2, 9.95, 10.35);
  const critiqueReveal = fadeWindow(time, 10.4, 12.05, 12.45);
  const evidenceMode = ease((time - 5.8) / 0.2) * (1 - ease((time - 12.25) / 0.2));
  const reviewerReveal = ease((time - 12.55) / 0.95);
  const peerLabelReveal = ease((time - 13.25) / 0.7);
  const activeGroup = activeIvanGroup(time);
  const activeSegment = ivanSegments[activeGroup];
  const reviewerOpacity = reviewerReveal;
  const activeIvanOpacity = 1 - ease((time - 5.75) / 0.25);
  const peerMinBmi = Math.min(...peer.map((point) => point.bmi)) - 0.18;
  const peerMaxBmi = Math.max(...peer.map((point) => point.bmi)) + 0.18;

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <clipPath id="chart-clip"><rect x="${chart.left - 8}" y="${chart.top - 8}" width="${chart.width + 16}" height="${chart.height + 16}"/></clipPath>
    </defs>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${colors.ink}; }
      .headline { font-size: 42px; font-weight: 780; letter-spacing: -1.2px; }
      .axis-label { font-size: 24px; font-weight: 650; fill: ${colors.muted}; }
      .tick { font-size: 22px; font-weight: 520; fill: ${colors.muted}; }
      .formula { font-size: 30px; font-weight: 740; }
      .evidence { font-size: 38px; font-weight: 780; letter-spacing: -0.7px; }
      .person-label { font-size: 22px; font-weight: 760; }
      .footer { font-size: 24px; font-weight: 650; fill: ${colors.muted}; }
    </style>
    <rect width="${width}" height="${height}" fill="${colors.white}"/>
    <image href="${logoSprite}" x="54" y="70" width="82" height="82"/>
    <image href="${clownSprite}" x="148" y="70" width="82" height="82"/>
    <g opacity="${1 - evidenceMode}">
      <text x="254" y="102" class="headline">My $120 smart scale reports “measured”</text>
      <text x="254" y="151" class="headline">body fat as 1.5 × BMI − 17.5</text>
    </g>
    <text x="254" y="126" class="evidence" fill="${colors.teal}" opacity="${socksReveal}">Socks on. Every metric returned.</text>
    <g opacity="${gadgetsReveal}">
      <text x="254" y="105" class="evidence" fill="${colors.teal}">Clothes, headphones, phone.</text>
      <text x="254" y="151" class="evidence" fill="${colors.teal}">Still “measured.”</text>
    </g>
    <text x="254" y="126" class="evidence" fill="${colors.ink}" opacity="${critiqueReveal}">Bad contact should fail, not guess.</text>
    <text x="${chart.left}" y="270" class="axis-label">“Measured” body fat (%)</text>
    ${grid}
    <line x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <line x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <g clip-path="url(#chart-clip)">
      <path d="${linePath(formulas.ivan)}" fill="none" stroke="${colors.teal}" stroke-width="6" stroke-linecap="round"/>
      <path d="${lineSegmentPath(formulas.ivan, activeSegment.min, activeSegment.max)}" fill="none" stroke="${colors.teal}" stroke-width="18" stroke-linecap="round" opacity="${0.24 * activeIvanOpacity}"/>
      ${ivanDotsMarkup(activeGroup, activeIvanOpacity)}
      <path d="${lineSegmentPath(formulas.peer, peerMinBmi, peerMaxBmi)}" fill="none" stroke="${colors.orange}" stroke-width="5" stroke-linecap="round" stroke-dasharray="15 10" opacity="${reviewerReveal}"/>
      <path d="${lineSegmentPath(formulas.peer, peerMinBmi, peerMaxBmi)}" fill="none" stroke="${colors.orange}" stroke-width="18" stroke-linecap="round" opacity="${0.22 * reviewerReveal}"/>
      <g opacity="${reviewerReveal}">${peerDots}</g>
    </g>
    <text x="${chart.left + 410}" y="${chart.top + 52}" class="formula" fill="${colors.orange}" opacity="${peerLabelReveal}">1.5 slope reference · 0.95 lower</text>
    <text x="${chart.left + chart.width / 2}" y="${chart.top + chart.height + 64}" text-anchor="middle" class="axis-label">Measured BMI</text>
    ${personHighlightLayer(activeGroup, activeIvanOpacity)}
    ${personLayer()}
    <image href="${peerSprite}" x="700" y="802" width="310" height="470" opacity="${reviewerOpacity}" preserveAspectRatio="xMidYMax meet"/>
    <text x="855" y="1293" text-anchor="middle" class="person-label" fill="${colors.orange}" opacity="${reviewerOpacity}">6′8″ · ≈166 kg</text>
    <text x="540" y="1330" text-anchor="middle" class="footer">Methodology and full data set · aiandtractors.com/ge-cs10h-body-fat-formula</text>
  </svg>`;
}

async function writePreviewFrames() {
  await sharp(Buffer.from(frameSvg(0))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-opening.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 5.2)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-ivan-heavy.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 7.0)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-socks.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 9.1)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-gadgets.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 11.2)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-critique.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 14.2)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-reviewer.png'));
  await sharp(Buffer.from(frameSvg(Math.floor(fps * 17.5)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-final.png'));
}

// Shared source for the approved still and its four discrete animation states.
function requestedFrameSvg(activeGroup = 3, showPeer = true) {
  const activePoints = new Set(activeGroup < 3 ? ivanPointGroups[activeGroup].map(pointKey) : []);
  const dots = (points, color, isPeer = false) => points.map(point => {
    const active = isPeer ? activeGroup === 3 : activePoints.has(pointKey(point));
    return `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="${active ? 6.5 : 5}" fill="${active ? color : 'white'}" stroke="${colors.ink}" stroke-width="2"/>`;
  }
  ).join('');
  let stripe = '<rect x="735" y="294" width="245" height="978" fill="#f0f2f3"/>';
  if (activeGroup < 3) {
    const segment = ivanSegments[activeGroup];
    const left = sx(segment.min) - 8;
    const right = sx(segment.max) + 8;
    const body = ivanFigures[activeGroup];
    // The same flat band covers the observed x-range and continues behind its figure.
    // Only its position changes between states; it never glides or fades.
    stripe = `<path d="M ${left} 294 H ${right} V 740 L ${body.x + body.width} 842 V 1215 H ${body.x} V 842 L ${left} 740 Z" fill="#f0f2f3"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="charcoal" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.20 0 0 0 0 0.23 0 0 0 0 0.26 0 0 0 1 0"/>
      </filter>
    </defs>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${colors.ink}; }
      .headline { font-size:42px; font-weight:780; letter-spacing:-1.2px; }
      .axis-label { font-size:24px; font-weight:650; }
      .tick { font-size:22px; fill:#68727d; }
      .footer { font-size:24px; font-weight:650; }
    </style>
    <rect width="1080" height="1350" fill="white"/>
    <image href="${logoSprite}" x="54" y="70" width="82" height="82"/>
    <image href="${clownSprite}" x="148" y="70" width="82" height="82"/>
    <text x="254" y="102" class="headline">My $120 smart scale reports “measured”</text>
    <text x="254" y="151" class="headline">body fat as 1.5 × BMI − 17.5</text>
    ${stripe}
    <text x="90" y="270" class="axis-label">“Measured” body fat (%)</text>
    ${grid}
    <line x1="90" y1="740" x2="990" y2="740" stroke="${colors.ink}" stroke-width="2"/>
    <line x1="90" y1="294" x2="90" y2="740" stroke="${colors.ink}" stroke-width="2"/>
    <path d="${linePath(formulas.ivan)}" fill="none" stroke="${colors.teal}" stroke-width="5" stroke-linecap="round"/>
    ${showPeer ? `<path d="${linePath(formulas.peer)}" fill="none" stroke="${colors.orange}" stroke-width="5" stroke-linecap="round"/>` : ''}
    ${dots(ivan, colors.teal)}
    ${showPeer ? dots(peer, colors.orange, true) : ''}
    <text x="540" y="804" text-anchor="middle" class="axis-label">Measured BMI</text>
    ${personLayer()}
    ${showPeer ? `<image href="${peerSprite}" x="700" y="802" width="310" height="470" preserveAspectRatio="xMidYMax meet" filter="url(#charcoal)"/>` : ''}
    <text x="540" y="1330" text-anchor="middle" class="footer">Methodology and full data set · aiandtractors.com/scale</text>
  </svg>`;
}

if (process.argv.includes('--requested-still')) {
  const output = path.join(scaleDir, 'cs10h-requested-parallel-still.png');
  await sharp(Buffer.from(requestedFrameSvg())).png().toFile(output);
  console.log(JSON.stringify({ output, ivanPoints: ivan.length, peerPoints: peer.length, slopes: [formulas.ivan.slope, formulas.peer.slope], videoGenerated: false }));
  process.exit(0);
}

if (process.argv.includes('--approved-animation') || process.argv.includes('--approved-preview')) {
  const prefix = path.join(scaleDir, 'cs10h-parallel-animation-v6');
  for (let state = 0; state < 4; state += 1) {
    await sharp(Buffer.from(requestedFrameSvg(state, state === 3))).png().toFile(`${prefix}-state-${state}.png`);
  }
  await sharp(Buffer.from(requestedFrameSvg())).png().toFile(`${prefix}-poster.png`);
  if (process.argv.includes('--approved-animation')) {
    // Four three-second holds: lean, middle, heavy, then reviewer with both full lines.
    ffmpeg(['-y', '-framerate', '1/3', '-start_number', '0', '-i', `${prefix}-state-%d.png`, '-vf', 'fps=24', '-t', '12', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${prefix}.mp4`]);
    ffmpeg(['-y', '-i', `${prefix}.mp4`, '-filter_complex', '[0:v]fps=8,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse=dither=bayer:bayer_scale=3', '-loop', '0', `${prefix}.gif`]);
  }
  console.log(JSON.stringify({ prefix, states: 4, secondsPerState: 3, ivanPoints: ivan.length, peerPoints: peer.length, slopes: [formulas.ivan.slope, formulas.peer.slope] }));
  process.exit(0);
}

if (process.argv.includes('--preview-only')) {
  await writePreviewFrames();
  console.log('Rendered v5 preview frames');
  process.exit(0);
}

fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });
for (let frame = 0; frame < frameCount; frame += 1) {
  await sharp(Buffer.from(frameSvg(frame))).png().toFile(path.join(framesDir, `frame-${String(frame).padStart(4, '0')}.png`));
  if (frame % fps === 0) process.stdout.write(`Rendered ${Math.round(frame / fps)}s / ${seconds}s\n`);
}

await writePreviewFrames();
await sharp(Buffer.from(frameSvg(0))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v5-poster.png'));

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }
}

ffmpeg(['-y', '-framerate', String(fps), '-i', path.join(framesDir, 'frame-%04d.png'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(scaleDir, 'cs10h-formula-animation-v5.mp4')]);
ffmpeg(['-y', '-i', path.join(scaleDir, 'cs10h-formula-animation-v5.mp4'), '-filter_complex', '[0:v]fps=12,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3', '-loop', '0', path.join(scaleDir, 'cs10h-formula-animation-v5.gif')]);
fs.rmSync(framesDir, { recursive: true, force: true });

console.log(JSON.stringify({
  ivanReadings: ivan.length,
  peerReadings: peer.length,
  formulas,
  representatives,
  outputs: [
    'public/scale/cs10h-formula-animation-v5.mp4',
    'public/scale/cs10h-formula-animation-v5.gif',
    'public/scale/cs10h-formula-animation-v5-opening.png',
    'public/scale/cs10h-formula-animation-v5-poster.png',
  ],
}, null, 2));
