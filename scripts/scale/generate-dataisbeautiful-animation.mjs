import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', '..');
const scaleDir = path.join(root, 'public', 'scale');
const framesDir = path.join(scaleDir, '.animation-frames');
const sourceCsv = path.join(scaleDir, 'cs10h-readings.csv');
const spriteSheet = path.join(import.meta.dirname, 'ivan-build-sprites.png');

const width = 1080;
const height = 1350;
const fps = 24;
const seconds = 15;
const frameCount = fps * seconds;

const colors = {
  ink: '#17212b',
  muted: '#68727d',
  grid: '#dce2e6',
  paper: '#fbfaf7',
  white: '#ffffff',
  teal: '#197c78',
  tealLight: '#9fd4cf',
  orange: '#d9633b',
  orangeLight: '#efb19d',
  wash: '#f0eee8',
};

function parseCsvLine(line) {
  const cells = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) {
      cells.push(value);
      value = '';
    } else value += char;
  }
  cells.push(value);
  return cells;
}

const csvLines = fs.readFileSync(sourceCsv, 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(csvLines[0]);
const index = Object.fromEntries(headers.map((name, i) => [name, i]));
const ivan = csvLines
  .slice(1)
  .map(parseCsvLine)
  .map((row) => ({
    date: row[index['Measure Time']],
    weight: Number(row[index['Weight(kg)']]),
    fat: Number(row[index['Body Fat(%)']]),
  }))
  .filter((row) => Number.isFinite(row.fat))
  .map((row) => ({ ...row, bmi: row.weight / 1.86 ** 2 }))
  .sort((a, b) => {
    const parse = (value) => {
      const [date, time] = value.split(' ');
      const [day, month, year] = date.split('/').map(Number);
      return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${time}`).getTime();
    };
    return parse(a.date) - parse(b.date);
  });

const peer = [
  { bmi: 39.8, fat: 41.2 },
  { bmi: 40.1, fat: 41.7 },
  { bmi: 40.7, fat: 42.6 },
  { bmi: 40.8, fat: 42.8 },
];

const combined = [...ivan, ...peer];

function regression(points) {
  const n = points.length;
  const meanX = points.reduce((sum, p) => sum + p.bmi, 0) / n;
  const meanY = points.reduce((sum, p) => sum + p.fat, 0) / n;
  const slope = points.reduce((sum, p) => sum + (p.bmi - meanX) * (p.fat - meanY), 0)
    / points.reduce((sum, p) => sum + (p.bmi - meanX) ** 2, 0);
  const intercept = meanY - slope * meanX;
  const predicted = points.map((p) => slope * p.bmi + intercept);
  const residuals = points.map((p, i) => p.fat - predicted[i]);
  const sse = residuals.reduce((sum, value) => sum + value ** 2, 0);
  const sst = points.reduce((sum, p) => sum + (p.fat - meanY) ** 2, 0);
  return {
    slope,
    intercept,
    r2: 1 - sse / sst,
    mae: residuals.reduce((sum, value) => sum + Math.abs(value), 0) / n,
    maxError: Math.max(...residuals.map(Math.abs)),
  };
}

const fit = regression(combined);
const ivanFit = regression(ivan);
const minWeight = Math.min(...ivan.map((d) => d.weight));
const maxWeight = Math.max(...ivan.map((d) => d.weight));

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function ease(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function fade(t, start, end) {
  return ease((t - start) / (end - start));
}

function xml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function formatDate(raw) {
  const [day, month] = raw.split(' ')[0].split('/');
  return `${Number(day)} ${['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(month)]}`;
}

const sprites = [];
const sheet = sharp(spriteSheet);
const sheetMeta = await sheet.metadata();
const spriteWidth = Math.floor(sheetMeta.width / 3);
for (let i = 0; i < 3; i += 1) {
  const buffer = await sharp(spriteSheet)
    .extract({ left: i * spriteWidth, top: 0, width: spriteWidth, height: sheetMeta.height })
    .png()
    .toBuffer();
  sprites.push(`data:image/png;base64,${buffer.toString('base64')}`);
}

function characterImages(weight, opacity = 1, stable = false) {
  if (stable) {
    return `<image href="${sprites[1]}" x="40" y="810" width="390" height="520" preserveAspectRatio="xMidYMid meet" opacity="${opacity.toFixed(3)}"/>`;
  }
  const position = clamp((weight - minWeight) / (maxWeight - minWeight)) * 2;
  const low = Math.min(1, Math.floor(position));
  const high = Math.min(2, low + 1);
  const mix = position - low;
  const image = (idx, alpha) => `<image href="${sprites[idx]}" x="40" y="810" width="390" height="520" preserveAspectRatio="xMidYMid meet" opacity="${(alpha * opacity).toFixed(3)}"/>`;
  return image(low, 1 - mix) + image(high, mix);
}

function chartScale(t) {
  const zoomOut = fade(t, 0.66, 0.75);
  const zoomBack = fade(t, 0.86, 0.93);
  const global = clamp(zoomOut - zoomBack);
  return {
    xMin: lerp(24.0, 22.8, global),
    xMax: lerp(27.2, 42.2, global),
    yMin: lerp(18.0, 16.5, global),
    yMax: lerp(23.3, 44.5, global),
    global,
  };
}

function frameSvg(frame) {
  const t = frame / (frameCount - 1);
  const chart = { left: 90, top: 242, width: 900, height: 500 };
  const scale = chartScale(t);
  const sx = (value) => chart.left + (value - scale.xMin) / (scale.xMax - scale.xMin) * chart.width;
  const sy = (value) => chart.top + chart.height - (value - scale.yMin) / (scale.yMax - scale.yMin) * chart.height;

  const timelineT = ease(clamp((t - 0.035) / 0.61));
  const timelinePosition = timelineT * (ivan.length - 1);
  const currentIndex = Math.min(ivan.length - 2, Math.floor(timelinePosition));
  const currentMix = timelinePosition - currentIndex;
  const a = ivan[currentIndex];
  const b = ivan[currentIndex + 1] || a;
  const current = {
    bmi: lerp(a.bmi, b.bmi, currentMix),
    fat: lerp(a.fat, b.fat, currentMix),
    weight: lerp(a.weight, b.weight, currentMix),
    date: currentMix < 0.5 ? a.date : b.date,
  };

  const peerOpacity = clamp(fade(t, 0.70, 0.78) - fade(t, 0.86, 0.92));
  const heightPhase = fade(t, 0.91, 0.955);
  const headerOpacity = fade(t, 0.0, 0.035);
  const bodyOpacity = 1 - 0.15 * peerOpacity;

  const heightStart = { bmi: 25.4, fat: 20.6 };
  const heightEnd = { bmi: 27.1, fat: 23.2 };
  const movingDot = heightPhase > 0
    ? {
        bmi: lerp(heightStart.bmi, heightEnd.bmi, heightPhase),
        fat: lerp(heightStart.fat, heightEnd.fat, heightPhase),
      }
    : current;

  const xTicks = scale.global > 0.5 ? [25, 30, 35, 40] : [24, 25, 26, 27];
  const yTicks = scale.global > 0.5 ? [20, 30, 40] : [18, 20, 22];
  const grid = [
    ...xTicks.map((value) => `<line x1="${sx(value)}" y1="${chart.top}" x2="${sx(value)}" y2="${chart.top + chart.height}" stroke="${colors.grid}" stroke-width="1"/><text x="${sx(value)}" y="${chart.top + chart.height + 35}" text-anchor="middle" class="tick">${value}</text>`),
    ...yTicks.map((value) => `<line x1="${chart.left}" y1="${sy(value)}" x2="${chart.left + chart.width}" y2="${sy(value)}" stroke="${colors.grid}" stroke-width="1"/><text x="${chart.left - 18}" y="${sy(value) + 7}" text-anchor="end" class="tick">${value}%</text>`),
  ].join('');

  const lineX1 = scale.xMin;
  const lineX2 = scale.xMax;
  const formulaLine = `<line x1="${sx(lineX1)}" y1="${sy(fit.slope * lineX1 + fit.intercept)}" x2="${sx(lineX2)}" y2="${sy(fit.slope * lineX2 + fit.intercept)}" stroke="${colors.ink}" stroke-width="4" stroke-linecap="round"/>`;

  const revealed = Math.max(1, Math.floor(timelinePosition) + 1);
  const trail = ivan.slice(0, revealed).map((d, i) => {
    const alpha = 0.28 + 0.62 * (i / Math.max(1, revealed - 1));
    return `<circle cx="${sx(d.bmi)}" cy="${sy(d.fat)}" r="7" fill="${colors.teal}" fill-opacity="${alpha.toFixed(2)}" stroke="${colors.paper}" stroke-width="2"/>`;
  }).join('');
  const allIvan = ivan.map((d) => `<circle cx="${sx(d.bmi)}" cy="${sy(d.fat)}" r="6" fill="${colors.teal}" fill-opacity="0.78" stroke="${colors.paper}" stroke-width="2"/>`).join('');
  const peerDots = peer.map((d, i) => `<circle cx="${sx(d.bmi)}" cy="${sy(d.fat)}" r="${9 + i}" fill="${colors.orange}" fill-opacity="${peerOpacity.toFixed(3)}" stroke="${colors.paper}" stroke-width="3"/>`).join('');

  const title = heightPhase > 0.05
    ? 'Changing only my height moved the dot.'
    : peerOpacity > 0.45
      ? 'Another owner got the same straight line.'
      : 'Every weigh-in lands on the same formula.';
  const subtitle = heightPhase > 0.05
    ? 'Same body, same 87.7 kg: 1.86 m → 1.80 m in the app'
    : peerOpacity > 0.45
      ? '41 readings · 2 owners · same GE CS10H model'
      : '37 Fit Profile readings · June–August 2026';

  const formulaLabel = scale.global > 0.42
    ? `combined fit  fat = ${fit.slope.toFixed(4)} × BMI ${fit.intercept < 0 ? '−' : '+'} ${Math.abs(fit.intercept).toFixed(3)}`
    : 'fat = 1.5 × BMI − 17.5';

  const timelinePanel = `
    <text x="455" y="940" class="label">${xml(formatDate(current.date))}</text>
    <text x="455" y="1002" class="big-number">${current.weight.toFixed(1)} kg</text>
    <text x="455" y="1044" class="small">actual load-cell reading</text>
    <line x1="455" y1="1080" x2="950" y2="1080" stroke="${colors.grid}"/>
    <text x="455" y="1132" class="label">Scale reports</text>
    <text x="455" y="1194" class="big-number teal">${current.fat.toFixed(1)}% fat</text>
    <text x="455" y="1234" class="small">formula prediction ${(1.5 * current.bmi - 17.5).toFixed(1)}%</text>`;

  const peerPanel = `
    <text x="455" y="925" class="label orange">PEER REVIEW</text>
    <text x="455" y="985" class="big-number">2 owners. 41 readings.</text>
    <text x="455" y="1034" class="small">The reviewer is 6′8″ and owns the same model.</text>
    <line x1="455" y1="1070" x2="950" y2="1070" stroke="${colors.grid}"/>
    <text x="455" y="1125" class="metric">R² ${fit.r2.toFixed(5)}</text>
    <text x="455" y="1174" class="small">mean error ${fit.mae.toFixed(2)} percentage points</text>
    <text x="455" y="1215" class="small">worst error ${fit.maxError.toFixed(2)} points</text>`;

  const heightPanel = `
    <text x="455" y="910" class="label orange">HEIGHT TEST</text>
    <text x="455" y="970" class="big-number">The body did not change.</text>
    <text x="455" y="1028" class="small">Profile height</text>
    <text x="455" y="1084" class="metric">1.86 m</text>
    <text x="640" y="1084" class="metric muted">→</text>
    <text x="720" y="1084" class="metric orange">1.80 m</text>
    <text x="455" y="1145" class="small">Reported body fat</text>
    <text x="455" y="1203" class="metric">20.6%</text>
    <text x="640" y="1203" class="metric muted">→</text>
    <text x="720" y="1203" class="metric orange">23.2%</text>`;

  const panel = heightPhase > 0.05 ? heightPanel : peerOpacity > 0.45 ? peerPanel : timelinePanel;
  const points = peerOpacity > 0.02 ? allIvan : trail;
  const heightStartDot = heightPhase > 0.05
    ? `<circle cx="${sx(heightStart.bmi)}" cy="${sy(heightStart.fat)}" r="11" fill="${colors.paper}" stroke="${colors.teal}" stroke-width="4"/><text x="${sx(heightStart.bmi) - 8}" y="${sy(heightStart.fat) + 44}" text-anchor="end" class="annotation">1.86 m</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${colors.ink}; }
      .headline { font-size: 52px; font-weight: 760; letter-spacing: -1.7px; }
      .subhead { font-size: 25px; font-weight: 450; fill: ${colors.muted}; }
      .chart-title { font-size: 26px; font-weight: 700; }
      .formula { font-size: 20px; font-weight: 620; fill: ${colors.muted}; }
      .tick { font-size: 20px; font-weight: 500; fill: ${colors.muted}; }
      .axis-label { font-size: 21px; font-weight: 650; fill: ${colors.muted}; }
      .annotation { font-size: 19px; font-weight: 700; fill: ${colors.muted}; }
      .label { font-size: 22px; font-weight: 760; letter-spacing: 1px; }
      .big-number { font-size: 43px; font-weight: 760; letter-spacing: -1px; }
      .metric { font-size: 39px; font-weight: 740; }
      .small { font-size: 21px; font-weight: 480; fill: ${colors.muted}; }
      .footer { font-size: 15px; font-weight: 500; fill: ${colors.muted}; }
      .teal { fill: ${colors.teal}; }
      .orange { fill: ${colors.orange}; }
      .muted { fill: ${colors.muted}; }
    </style>
    <rect width="${width}" height="${height}" fill="${colors.paper}"/>
    <g opacity="${headerOpacity.toFixed(3)}">
      <text x="70" y="82" class="headline">${xml(title)}</text>
      <text x="70" y="132" class="subhead">${xml(subtitle)}</text>
    </g>
    <text x="${chart.left}" y="210" class="chart-title">Reported body fat (%)</text>
    <text x="${chart.left + chart.width}" y="210" text-anchor="end" class="formula">${xml(formulaLabel)}</text>
    ${grid}
    <line x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <line x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    ${formulaLine}
    ${points}
    ${peerDots}
    ${heightStartDot}
    <circle cx="${sx(movingDot.bmi)}" cy="${sy(movingDot.fat)}" r="18" fill="${heightPhase > 0.05 ? colors.orange : colors.white}" stroke="${heightPhase > 0.05 ? colors.orange : colors.teal}" stroke-width="7"/>
    <text x="${chart.left + chart.width / 2}" y="${chart.top + chart.height + 62}" text-anchor="middle" class="axis-label">BMI from profile height + measured weight</text>
    ${characterImages(heightPhase > 0.05 ? 87.7 : current.weight, bodyOpacity, heightPhase > 0.05 || peerOpacity > 0.45)}
    <rect x="438" y="860" width="562" height="388" rx="22" fill="${colors.white}" stroke="${colors.grid}" stroke-width="2"/>
    ${panel}
    <line x1="70" y1="1283" x2="1010" y2="1283" stroke="${colors.grid}"/>
    <text x="70" y="1320" class="footer">Dots: Fit Profile export + 4 values digitized from u/WorldTallestEngineer’s chart. Character is illustrative.</text>
    <text x="1010" y="1320" text-anchor="end" class="footer">JavaScript · SVG · FFmpeg</text>
  </svg>`;
}

fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });

for (let frame = 0; frame < frameCount; frame += 1) {
  const target = path.join(framesDir, `frame-${String(frame).padStart(4, '0')}.png`);
  await sharp(Buffer.from(frameSvg(frame))).png().toFile(target);
  if (frame % fps === 0) process.stdout.write(`Rendered ${Math.round(frame / fps)}s / ${seconds}s\n`);
}

await sharp(Buffer.from(frameSvg(Math.floor(frameCount * 0.82))))
  .png()
  .toFile(path.join(scaleDir, 'cs10h-formula-animation-poster.png'));

function runFfmpeg(args) {
  const result = spawnSync('ffmpeg', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }
}

runFfmpeg([
  '-y', '-framerate', String(fps), '-i', path.join(framesDir, 'frame-%04d.png'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', path.join(scaleDir, 'cs10h-formula-animation.mp4'),
]);

runFfmpeg([
  '-y', '-i', path.join(scaleDir, 'cs10h-formula-animation.mp4'),
  '-filter_complex', '[0:v]fps=12,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3',
  '-loop', '0', path.join(scaleDir, 'cs10h-formula-animation.gif'),
]);

fs.rmSync(framesDir, { recursive: true, force: true });

console.log(JSON.stringify({
  ivanReadings: ivan.length,
  peerReadings: peer.length,
  combinedFit: fit,
  ivanFit,
  outputs: [
    'public/scale/cs10h-formula-animation.mp4',
    'public/scale/cs10h-formula-animation.gif',
    'public/scale/cs10h-formula-animation-poster.png',
  ],
}, null, 2));
