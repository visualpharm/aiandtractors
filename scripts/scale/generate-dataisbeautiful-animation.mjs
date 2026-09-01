import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..', '..');
const scaleDir = path.join(root, 'public', 'scale');
const framesDir = path.join(scaleDir, '.animation-frames-v3');
const width = 1080;
const height = 1350;
const fps = 24;
const seconds = 12;
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

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixPoint(a, b, t) {
  return {
    bmi: lerp(a.bmi, b.bmi, t),
    fat: lerp(a.fat, b.fat, t),
    weight: lerp(a.weight ?? 0, b.weight ?? 0, t),
  };
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

const chart = { left: 90, top: 238, width: 900, height: 512 };
const domain = { xMin: 22, xMax: 42, yMin: 14, yMax: 48 };
const sx = (value) => chart.left + (value - domain.xMin) / (domain.xMax - domain.xMin) * chart.width;
const sy = (value) => chart.top + chart.height - (value - domain.yMin) / (domain.yMax - domain.yMin) * chart.height;
const linePath = (formula) => `M ${sx(domain.xMin)} ${sy(formula.slope * domain.xMin + formula.intercept)} L ${sx(domain.xMax)} ${sy(formula.slope * domain.xMax + formula.intercept)}`;

const xTicks = [22, 26, 30, 34, 38, 42];
const yTicks = [20, 30, 40];
const grid = [
  ...xTicks.map((value) => `<line x1="${sx(value)}" y1="${chart.top}" x2="${sx(value)}" y2="${chart.top + chart.height}" stroke="${colors.grid}"/><text x="${sx(value)}" y="${chart.top + chart.height + 34}" text-anchor="middle" class="tick">${value}</text>`),
  ...yTicks.map((value) => `<line x1="${chart.left}" y1="${sy(value)}" x2="${chart.left + chart.width}" y2="${sy(value)}" stroke="${colors.grid}"/><text x="${chart.left - 16}" y="${sy(value) + 7}" text-anchor="end" class="tick">${value}%</text>`),
].join('');

const ivanDots = ivan.map((point) => `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="3.5" fill="${colors.teal}" opacity="0.24"/>`).join('');
const peerDots = peer.map((point, index) => `<circle cx="${sx(point.bmi)}" cy="${sy(point.fat)}" r="5" fill="${colors.orange}" opacity="${0.44 + index * 0.06}"/>`).join('');

function ivanState(time) {
  if (time < 1.8) return { from: 0, to: 0, mix: 0, point: representatives[0] };
  if (time < 2.5) {
    const mix = ease((time - 1.8) / 0.7);
    return { from: 0, to: 1, mix, point: mixPoint(representatives[0], representatives[1], mix) };
  }
  if (time < 3.9) return { from: 1, to: 1, mix: 0, point: representatives[1] };
  if (time < 4.6) {
    const mix = ease((time - 3.9) / 0.7);
    return { from: 1, to: 2, mix, point: mixPoint(representatives[1], representatives[2], mix) };
  }
  return { from: 2, to: 2, mix: 0, point: representatives[2] };
}

function peerPointAt(time) {
  const position = clamp((time - 7.4) / 3.7) * (peer.length - 1);
  const index = Math.min(peer.length - 2, Math.floor(position));
  const mix = position - index;
  return mixPoint(peer[index], peer[index + 1], mix);
}

function personLayer(state, opacity) {
  const figure = { x: 125, y: 834, width: 230, height: 430 };
  const visibleIndex = state.mix < 0.5 ? state.from : state.to;
  return `<image href="${ivanSprites[visibleIndex]}" x="${figure.x}" y="${figure.y}" width="${figure.width}" height="${figure.height}" opacity="${opacity}" preserveAspectRatio="xMidYMax meet"/>`;
}

function stripeMarkup(point, centerX, halfTop, halfBottom, color, opacity) {
  const pointX = sx(point.bmi);
  const points = [
    `${pointX - halfTop},${chart.top}`,
    `${pointX + halfTop},${chart.top}`,
    `${centerX + halfBottom},1270`,
    `${centerX - halfBottom},1270`,
  ].join(' ');
  return `<polygon points="${points}" fill="${color}" opacity="${opacity}"/>`;
}

function frameSvg(frame) {
  const time = frame / fps;
  const reviewerReveal = ease((time - 6.35) / 0.95);
  const lineReveal = ease((time - 6.65) / 1.15);
  const peerLabelReveal = ease((time - 7.1) / 0.7);
  const state = ivanState(time);
  const currentPeer = peerPointAt(time);
  const ivanFigureOpacity = 1 - reviewerReveal * 0.82;
  const reviewerOpacity = reviewerReveal;
  const activeIvanOpacity = 1 - reviewerReveal;
  const activePeerOpacity = reviewerReveal;
  const visibleIvanIndex = state.mix < 0.5 ? state.from : state.to;
  const currentWeight = representatives[visibleIvanIndex].weight.toFixed(1);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <clipPath id="chart-clip"><rect x="${chart.left - 8}" y="${chart.top - 8}" width="${chart.width + 16}" height="${chart.height + 16}"/></clipPath>
    </defs>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; fill: ${colors.ink}; }
      .headline { font-size: 46px; font-weight: 780; letter-spacing: -1.4px; }
      .axis-label { font-size: 21px; font-weight: 650; fill: ${colors.muted}; }
      .tick { font-size: 18px; font-weight: 520; fill: ${colors.muted}; }
      .formula { font-size: 18px; font-weight: 720; }
      .person-label { font-size: 19px; font-weight: 760; }
      .footer { font-size: 20px; font-weight: 650; fill: ${colors.muted}; }
    </style>
    <rect width="${width}" height="${height}" fill="${colors.white}"/>
    <image href="${logoSprite}" x="54" y="62" width="82" height="82"/>
    <image href="${clownSprite}" x="148" y="62" width="82" height="82"/>
    <text x="254" y="124" class="headline">Two People, Same Math Theater.</text>
    <text x="${chart.left}" y="214" class="axis-label">“Measured” body fat (%)</text>
    ${grid}
    ${stripeMarkup(state.point, 240, 38, 76, colors.teal, 0.105 * activeIvanOpacity)}
    ${stripeMarkup(currentPeer, 855, 42, 126, colors.orange, 0.11 * activePeerOpacity)}
    <line x1="${chart.left}" y1="${chart.top + chart.height}" x2="${chart.left + chart.width}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <line x1="${chart.left}" y1="${chart.top}" x2="${chart.left}" y2="${chart.top + chart.height}" stroke="${colors.ink}" stroke-width="2"/>
    <g clip-path="url(#chart-clip)">
      <path d="${linePath(formulas.ivan)}" fill="none" stroke="${colors.teal}" stroke-width="6" stroke-linecap="round"/>
      ${ivanDots}
      <path d="${linePath(formulas.peer)}" pathLength="1" fill="none" stroke="${colors.orange}" stroke-width="5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="${1 - lineReveal}" opacity="${reviewerReveal}"/>
      <g opacity="${reviewerReveal}">${peerDots}</g>
      <circle cx="${sx(state.point.bmi)}" cy="${sy(state.point.fat)}" r="15" fill="${colors.white}" stroke="${colors.teal}" stroke-width="7" opacity="${activeIvanOpacity}"/>
      <circle cx="${sx(currentPeer.bmi)}" cy="${sy(currentPeer.fat)}" r="16" fill="${colors.white}" stroke="${colors.orange}" stroke-width="7" opacity="${activePeerOpacity}"/>
    </g>
    <g transform="translate(${chart.left + 22} ${chart.top + 44})">
      <line x1="0" y1="0" x2="38" y2="0" stroke="${colors.teal}" stroke-width="6" stroke-linecap="round"/>
      <text x="52" y="6" class="formula" fill="${colors.teal}">Ivan · 1.5×BMI−17.50</text>
      <g opacity="${peerLabelReveal}">
        <line x1="0" y1="36" x2="38" y2="36" stroke="${colors.orange}" stroke-width="5" stroke-linecap="round"/>
        <text x="52" y="42" class="formula" fill="${colors.orange}">Reviewer · 1.5×BMI−${Math.abs(formulas.peer.intercept).toFixed(2)}</text>
      </g>
    </g>
    <text x="${chart.left + chart.width / 2}" y="${chart.top + chart.height + 64}" text-anchor="middle" class="axis-label">Measured BMI</text>
    ${personLayer(state, ivanFigureOpacity)}
    <image href="${peerSprite}" x="700" y="802" width="310" height="470" opacity="${reviewerOpacity}" preserveAspectRatio="xMidYMax meet"/>
    <text x="240" y="1293" text-anchor="middle" class="person-label" fill="${colors.teal}" opacity="${ivanFigureOpacity}">${currentWeight} kg</text>
    <text x="855" y="1293" text-anchor="middle" class="person-label" fill="${colors.orange}" opacity="${reviewerOpacity}">6′8″ · ≈166 kg</text>
    <text x="540" y="1330" text-anchor="middle" class="footer">aiandtractors.com/ge-cs10h-body-fat-formula</text>
  </svg>`;
}

fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });
for (let frame = 0; frame < frameCount; frame += 1) {
  await sharp(Buffer.from(frameSvg(frame))).png().toFile(path.join(framesDir, `frame-${String(frame).padStart(4, '0')}.png`));
  if (frame % fps === 0) process.stdout.write(`Rendered ${Math.round(frame / fps)}s / ${seconds}s\n`);
}

await sharp(Buffer.from(frameSvg(0))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v3-opening.png'));
await sharp(Buffer.from(frameSvg(0))).png().toFile(path.join(scaleDir, 'cs10h-formula-animation-v3-poster.png'));

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }
}

ffmpeg(['-y', '-framerate', String(fps), '-i', path.join(framesDir, 'frame-%04d.png'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(scaleDir, 'cs10h-formula-animation-v3.mp4')]);
ffmpeg(['-y', '-i', path.join(scaleDir, 'cs10h-formula-animation-v3.mp4'), '-filter_complex', '[0:v]fps=12,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3', '-loop', '0', path.join(scaleDir, 'cs10h-formula-animation-v3.gif')]);
fs.rmSync(framesDir, { recursive: true, force: true });

console.log(JSON.stringify({
  ivanReadings: ivan.length,
  peerReadings: peer.length,
  formulas,
  representatives,
  outputs: [
    'public/scale/cs10h-formula-animation-v3.mp4',
    'public/scale/cs10h-formula-animation-v3.gif',
    'public/scale/cs10h-formula-animation-v3-opening.png',
    'public/scale/cs10h-formula-animation-v3-poster.png',
  ],
}, null, 2));
