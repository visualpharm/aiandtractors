import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', '..');
const scaleDir = path.join(root, 'public', 'scale');
const framesDir = path.join(scaleDir, '.animation-frames');
const width = 1080;
const height = 1350;
const fps = 24;
const seconds = 10;
const frameCount = fps * seconds;

const colors = {
  ink: '#17212b',
  muted: '#68727d',
  grid: '#dce2e6',
  teal: '#147d78',
  orange: '#d75f32',
  quiet: '#c9ced2',
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

function parseDate(value) {
  const [date, time] = value.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${time}`).getTime();
}

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

const csvLines = fs.readFileSync(path.join(scaleDir, 'cs10h-readings.csv'), 'utf8').trim().split(/\r?\n/);
const headers = parseCsvLine(csvLines[0]);
const column = Object.fromEntries(headers.map((name, index) => [name, index]));
const ivan = csvLines
  .slice(1)
  .map(parseCsvLine)
  .map((row) => ({
    date: row[column['Measure Time']],
    weight: Number(row[column['Weight(kg)']]),
    fat: Number(row[column['Body Fat(%)']]),
  }))
  .filter((row) => Number.isFinite(row.fat))
  .map((row) => ({ ...row, bmi: row.weight / 1.86 ** 2 }))
  .sort((a, b) => parseDate(a.date) - parseDate(b.date));

const peer = [
  { bmi: 39.8, fat: 41.2 },
  { bmi: 40.1, fat: 41.7 },
  { bmi: 40.7, fat: 42.6 },
  { bmi: 40.8, fat: 42.8 },
];
const formulas = {
  ivan: { slope: 1.5, intercept: -17.5 },
  peer: {
    slope: 1.5,
    intercept: peer.reduce((sum, point) => sum + point.fat - 1.5 * point.bmi, 0) / peer.length,
  },
};

const dataUri = (buffer, mime = 'image/png') => `data:${mime};base64,${buffer.toString('base64')}`;
const spriteSheet = path.join(import.meta.dirname, 'ivan-build-sprites.png');
const sheetMeta = await sharp(spriteSheet).metadata();
const spriteWidth = Math.floor(sheetMeta.width / 3);
const ivanSprites = [];
for (let index = 0; index < 3; index += 1) {
  ivanSprites.push(dataUri(await sharp(spriteSheet)
    .extract({ left: index * spriteWidth, top: 0, width: spriteWidth, height: sheetMeta.height })
    .png()
    .toBuffer()));
}
const peerSprite = dataUri(await sharp(path.join(import.meta.dirname, 'peer-reviewer-silhouette.png')).png().toBuffer());
const logoSprite = dataUri(await sharp(path.join(scaleDir, 'ge-logo.svg')).resize(96, 96).png().toBuffer());

const chart = { left: 90, top: 240, width: 900, height: 535 };
const domain = { xMin: 22.5, xMax: 42, yMin: 15, yMax: 46 };
const sx = (value) => chart.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * chart.width;
const sy = (value) => chart.top + chart.height - (value - domain.yMin) / (domain.yMax - domain.yMin) * chart.height;
const linePath = (formula) => `M ${sx(domain.xMin)} ${sy(formula.slope * domain.xMin + formula.intercept)} L ${sx(domain.xMax)} ${sy(formula.slope * domain.xMax + formula.intercept)}`;

const ordered = [...ivan].sort((a, b) => a.weight - b.weight);
const representative = [ordered.at(-1), ordered[Math.floor(ordered.length / 2)], ordered[0], peer[2]];
const figures = [
  { x: 52, y: 850, width: 235, height: 390, sprite: ivanSprites[2], label: `${representative[0].weight.toFixed(1)} kg` },
  { x: 287, y: 850, width: 235, height: 390, sprite: ivanSprites[1], label: `${representative[1].weight.toFixed(1)} kg` },
  { x: 522, y: 850, width: 235, height: 390, sprite: ivanSprites[0], label: `${representative[2].weight.toFixed(1)} kg` },
  { x: 752, y: 815, width: 275, height: 425, sprite: peerSprite, label: '6′8″ · ≈166 kg' },
];

function figureMarkup(figure, index, activeIndex) {
  const active = index === activeIndex;
  const opacity = active ? 1 : 0.10;
  const filter = active ? '' : 'filter="url(#desaturate)"';
  const color = index === 3 ? colors.orange : colors.teal;
  return `
    <g opacity="${opacity}" ${filter}>
      <image href="${figure.sprite}" x="${figure.x}" y="${figure.y}" width="${figure.width}" height="${figure.height}" preserveAspectRatio="xMidYMid meet"/>
    </g>
    ${active ? `<text x="${figure.x + figure.width / 2}" y="1267" text-anchor="middle" class="person-label" fill="${color}">${figure.label}</text>` : ''}`;
}

function frameSvg(frame) {
  const t = frame / (frameCount - 1);
  const peerPhase = t >= 0.64;
  let current;
  let activeIndex;
  let stripeMin;
  let stripeMax;

  if (peerPhase) {
    const position = ease((t - 0.64) / 0.36) * (peer.length - 1);
    const index = Math.min(peer.length - 2, Math.floor(position));
    const mix = position - index;
    current = {
      bmi: lerp(peer[index].bmi, peer[index + 1].bmi, mix),
      fat: lerp(peer[index].fat, peer[index + 1].fat, mix),
    };
    activeIndex = 3;
    stripeMin = 39.55;
    stripeMax = 41.05;
  } else {
    const position = ease(t / 0.64) * (ivan.length - 1);
    const index = Math.min(ivan.length - 2, Math.floor(position));
    const mix = position - index;
    current = {
      bmi: lerp(ivan[index].bmi, ivan[index + 1].bmi, mix),
      fat: lerp(ivan[index].fat, ivan[index + 1].fat, mix),
    };
    if (t < 0.22) {
      activeIndex = 0;
      stripeMin = 26.0;
      stripeMax = 27.0;
    } else if (t < 0.43) {
      activeIndex = 1;
      stripeMin = 25.2;
      stripeMax = 26.0;
    } else {
      activeIndex = 2;
      stripeMin = 24.3;
      stripeMax = 25.2;
    }
  }

  const activeColor = peerPhase ? colors.orange : colors.teal;
  const activeFormula = peerPhase ? formulas.peer : formulas.ivan;
  const inactiveFormula = peerPhase ? formulas.ivan : formulas.peer;
  const formulaText = peerPhase
    ? 'The same formula sits 0.95 point lower.'
    : 'Body fat = 1.50 × BMI − 17.50.';
  const formulaY = peerPhase
    ? sy(formulas.peer.slope * 39.2 + formulas.peer.intercept) + 25
    : sy(formulas.ivan.slope * 39.2 + formulas.ivan.intercept) - 15;
  const stripeX = sx(stripeMin);
  const stripeWidth = sx(stripeMax) - stripeX;
  const xTicks = [25, 30, 35, 40];
  const yTicks = [20, 30, 40];
  const grid = [
    ...xTicks.map((value) => `<line x1="${sx(value)}" y1="${chart.top}" x2="${sx(value)}" y2="${chart.top + chart.height}" stroke="${colors.grid}"/><text x="${sx(value)}" y="${chart.top + chart.height + 34}" text-anchor="middle" class="tick">${value}</text>`),
    ...yTicks.map((value) => `<line x1="${chart.left}" y1="${sy(value)}" x2="${chart.left + chart.width}" y2="${sy(value)}" stroke="${colors.grid}"/><text x="${chart.left - 16}" y="${sy(value) + 7}" text-anchor="end" class="tick">${value}%</text>`),
  ].join('');
  const ivanDots = ivan.map((point) => `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="5" fill="${colors.teal}" opacity="${peerPhase ? 0.08 : 0.32}"/>`).join('');
  const peerDots = peer.map((point) => `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="7" fill="${colors.orange}" opacity="${peerPhase ? 0.58 : 0.08}"/>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs><filter id="desaturate"><feColorMatrix type="saturate" values="0"/></filter></defs>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${colors.ink}; }
      .headline { font-size: 50px; font-weight: 770; letter-spacing: -1.5px; }
      .axis-label { font-size: 21px; font-weight: 650; fill: ${colors.muted}; }
      .tick { font-size: 18px; font-weight: 520; fill: ${colors.muted}; }
      .formula { font-size: 20px; font-weight: 720; }
      .person-label { font-size: 19px; font-weight: 720; }
      .footer { font-size: 15px; font-weight: 500; fill: ${colors.muted}; }
    </style>
    <rect width="${width}" height="${height}" fill="${colors.white}"/>
    <image href="${logoSprite}" x="64" y="62" width="92" height="92"/>
    <text x="184" y="106" class="headline">41 readings from 2 owners followed</text>
    <text x="184" y="160" class="headline">2 nearly parallel BMI formulas.</text>
    <text x="${chart.left}" y="218" class="axis-label">Reported body fat (%)</text>
    ${grid}
    <rect x="${stripeX}" y="${chart.top}" width="${stripeWidth}" height="${chart.height}" fill="${activeColor}" opacity="0.12"/>
    <line x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <line x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <path d="${linePath(inactiveFormula)}" fill="none" stroke="${colors.quiet}" stroke-width="4" stroke-linecap="round"/>
    <path d="${linePath(activeFormula)}" fill="none" stroke="${activeColor}" stroke-width="6" stroke-linecap="round"/>
    ${ivanDots}
    ${peerDots}
    <circle cx="${sx(current.bmi)}" cy="${sy(current.fat)}" r="17" fill="${colors.white}" stroke="${activeColor}" stroke-width="7"/>
    <text x="982" y="${formulaY}" text-anchor="end" class="formula" fill="${activeColor}">${formulaText}</text>
    <text x="${chart.left + chart.width / 2}" y="${chart.top + chart.height + 64}" text-anchor="middle" class="axis-label">BMI</text>
    ${figures.map((figure, index) => figureMarkup(figure, index, activeIndex)).join('')}
    <line x1="64" y1="1290" x2="1016" y2="1290" stroke="${colors.grid}"/>
    <text x="64" y="1324" class="footer">Fit Profile export and 4 values digitized from the other owner’s chart. Figures are illustrative.</text>
  </svg>`;
}

fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });
for (let frame = 0; frame < frameCount; frame += 1) {
  await sharp(Buffer.from(frameSvg(frame))).png().toFile(path.join(framesDir, `frame-${String(frame).padStart(4, '0')}.png`));
  if (frame % fps === 0) process.stdout.write(`Rendered ${Math.round(frame / fps)}s / ${seconds}s\n`);
}

await sharp(Buffer.from(frameSvg(Math.floor(frameCount * 0.82)))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-poster.png'));

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }
}
ffmpeg(['-y', '-framerate', String(fps), '-i', path.join(framesDir, 'frame-%04d.png'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(scaleDir, 'cs10h-formula-animation.mp4')]);
ffmpeg(['-y', '-i', path.join(scaleDir, 'cs10h-formula-animation.mp4'), '-filter_complex', '[0:v]fps=12,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3', '-loop', '0', path.join(scaleDir, 'cs10h-formula-animation.gif')]);
fs.rmSync(framesDir, { recursive: true, force: true });

console.log(JSON.stringify({
  ivanReadings: ivan.length,
  peerReadings: peer.length,
  formulas,
  outputs: ['public/scale/cs10h-formula-animation.mp4', 'public/scale/cs10h-formula-animation.gif', 'public/scale/cs10h-formula-animation-poster.png'],
}, null, 2));
