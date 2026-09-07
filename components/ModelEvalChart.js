import React, { useEffect, useMemo, useRef, useState } from 'react';

export const FAMILY_COLORS = { anthropic: '#db7549', zhipu: '#2563eb', openai: '#171717' };
export const familyOf = r => r.model.startsWith('claude') ? 'anthropic' : r.model.startsWith('glm') ? 'zhipu' : 'openai';
const SHORT_LABELS = { 'fable-low': 'Fable 5.1 low · Claude Code', 'opus-low': 'Opus 5 low · Claude Code', 'glm-claude-code': 'GLM 5.3 · Claude Code', 'glm-zcode': 'GLM 5.3 · ZCode (2 sessions)', 'sonnet-medium': 'Sonnet 5 medium · Claude Code', 'codex-astra-low': 'GPT-6 Astra low · Codex CLI' };

export const fmt = {
  money: v => v == null ? '–' : `$${v.toFixed(2)}`,
  price: v => v == null ? '–' : `$${String(parseFloat(v.toFixed(2)))}`,
  pct: v => `${parseFloat(Number(v).toFixed(1))}%`,
  minutes: v => `${v} min`,
  score: v => String(parseFloat(v.toFixed(2))),
  tokens: n => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n),
  int: v => v.toLocaleString('en-US'),
  ratio: v => v.toFixed(3),
};

const AXES = [
  { key: 'sub', label: 'Subscription $ per task', axis: 'Subscription dollars per task', get: r => r.sub_usd, step: 0.5, tick: v => v === 0 ? '$0' : `$${v.toFixed(2)}` },
  { key: 'api', label: 'API-equivalent $', axis: 'API-equivalent dollars per task', get: r => r.api_usd, step: 10, tick: v => `$${v}` },
  { key: 'tokens', label: 'Tokens per task', axis: 'Total tokens per task (input + cache + output)', get: r => totalTokens(r), step: 10e6, tick: v => v === 0 ? '0' : `${v / 1e6}M` },
  { key: 'share', label: 'Share of a week', axis: 'Percent of one week\'s plan allowance', get: r => r.weekly_share_pct, step: 2, tick: v => `${v}%` },
  { key: 'time', label: 'Wall time', axis: 'Minutes per task', get: r => r.wall_min, step: 10, tick: v => `${v} min` },
];

export const totalTokens = r => r.tokens.input + r.tokens.cache_write + r.tokens.cache_read + r.tokens.output;
const score10 = r => r.score / 2;

// Pareto frontier: runs where no other run has both lower x and >= score.
export function paretoFrontier(runs, get) {
  return runs.filter(r => !runs.some(o => o !== r && get(o) < get(r) && score10(o) >= score10(r)))
    .sort((a, b) => get(a) - get(b));
}

// Shape-preserving monotone cubic (Fritsch–Carlson) through the frontier
// points: a smooth visual guide with no overshoot or extrapolation. It is
// not evidence for achievable intermediate scores or costs.
export function monotoneCubic(pts) {
  if (pts.length < 2) return { path: '', sample: () => null };
  const n = pts.length;
  const dx = [], slope = [], m = [];
  for (let i = 0; i < n - 1; i++) { dx.push(pts[i + 1].px - pts[i].px); slope.push((pts[i + 1].py - pts[i].py) / (dx[i] || 1)); }
  m.push(slope[0]);
  for (let i = 1; i < n - 1; i++) m.push(slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2);
  m.push(slope[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (pts[i + 1].py === pts[i].py) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / slope[i], b = m[i + 1] / slope[i], h = Math.hypot(a, b);
    if (h > 3) { m[i] = 3 * a / h * slope[i]; m[i + 1] = 3 * b / h * slope[i]; }
  }
  let path = `M ${pts[0].px} ${pts[0].py}`;
  for (let i = 0; i < n - 1; i++) {
    path += ` C ${pts[i].px + dx[i] / 3} ${pts[i].py + m[i] * dx[i] / 3}, ${pts[i + 1].px - dx[i] / 3} ${pts[i + 1].py - m[i + 1] * dx[i] / 3}, ${pts[i + 1].px} ${pts[i + 1].py}`;
  }
  const sample = x => {
    if (x < pts[0].px || x > pts[n - 1].px) return null;
    let i = 0;
    while (i < n - 2 && x > pts[i + 1].px) i++;
    const t = (x - pts[i].px) / (dx[i] || 1);
    const t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * pts[i].py + (t3 - 2 * t2 + t) * m[i] * dx[i] + (-2 * t3 + 3 * t2) * pts[i + 1].py + (t3 - t2) * m[i + 1] * dx[i];
  };
  return { path, sample };
}

export default function ModelEvalChart({ runs }) {
  const [axisKey, setAxisKey] = useState('sub');
  const [hover, setHover] = useState(null);
  const host = useRef(null);
  const [width, setWidth] = useState(540);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  const narrow = width < 480;
  const metric = useMemo(() => {
    const m = AXES.find(a => a.key === axisKey);
    const max = Math.max(...runs.map(m.get)) * 1.25;
    const ticks = [];
    for (let t = m.step; t <= max; t += m.step) ticks.push(parseFloat(t.toFixed(2)));
    return { ...m, min: 0, max, ticks };
  }, [axisKey, runs]);
  const frontier = useMemo(() => paretoFrontier(runs, metric.get), [runs, metric]);
  const onFrontier = new Set(frontier.map(r => r.id));

  const height = narrow ? 560 : 520, left = narrow ? 30 : 40, right = width - 16, top = 30, bottom = height - 60;
  const x = v => left + (v - metric.min) / (metric.max - metric.min) * (right - left);
  const Y_MIN = 6, Y_MAX = 10;
  const y = v => bottom - (v - Y_MIN) / (Y_MAX - Y_MIN) * (bottom - top);
  let ticks = metric.ticks.map(t => ({ v: t, x: x(t) }));
  ticks.unshift({ v: 0, x: x(0) });
  if (ticks.length > 1 && (right - left) / (ticks.length - 1) < 64) ticks = ticks.filter((_, i) => i % 2 === 0);

  // Smooth Pareto curve through the frontier points (monotone, no overshoot).
  const fpts = frontier.map(r => ({ px: x(metric.get(r)), py: y(score10(r)) }));
  const { path: frontierPath, sample: frontierY } = monotoneCubic(fpts);
  const lastF = fpts[fpts.length - 1], prevF = fpts[fpts.length - 2];
  const flW = 15 * (narrow ? 7.2 : 7.8);
  const frontierLabel = fpts.length > 1 ? (lastF.px + 8 + flW <= right
    ? { x: lastF.px + 8, y: (lastF.py + prevF.py) / 2 + 5, anchor: 'start' }
    : { x: lastF.px - 8, y: (lastF.py + prevF.py) / 2 + 5, anchor: 'end' }) : null;

  // Labels sit beside their dot (right, else left); only when that collides
  // does the label move above or below with a leader line.
  const placed = runs.map(r => ({ r, px: x(metric.get(r)), py: y(score10(r)), text: SHORT_LABELS[r.id] }))
    .sort((a, b) => a.py - b.py || a.px - b.px);
  const charW = narrow ? 7.7 : 8.1, lh = 19.5, gap = 9;
  const taken = placed.map(p => ({ x1: p.px - 7, x2: p.px + 7, y1: p.py - 7, y2: p.py + 7, own: p }));
  if (frontierLabel) taken.push({ x1: frontierLabel.anchor === 'start' ? frontierLabel.x : frontierLabel.x - flW, x2: frontierLabel.anchor === 'start' ? frontierLabel.x + flW : frontierLabel.x, y1: frontierLabel.y - 14, y2: frontierLabel.y + 4 });
  // The Pareto curve is an obstacle too — no label sits on the line it names.
  if (frontierY) {
    for (let k = 0; k <= 34; k++) {
      const sx = fpts[0].px + (fpts[fpts.length - 1].px - fpts[0].px) * (k / 34);
      const sy = frontierY(sx);
      if (sy != null) taken.push({ x1: sx - 9, x2: sx + 9, y1: sy - 16, y2: sy + 7 });
    }
  }
  let self = null;
  const hits = (x1, x2, y1, y2) => taken.some(b => b.own !== self && x1 < b.x2 + 6 && b.x1 < x2 + 6 && y1 < b.y2 + 3 && b.y1 < y2 + 3);
  placed.forEach(p => {
    self = p;
    const w = p.text.length * charW;
    const side = [];
    side.push({ x1: p.px + 14, anchor: 'start', y1: p.py - lh / 2 });
    side.push({ x1: p.px - 14 - w, anchor: 'end', y1: p.py - lh / 2 });
    const fits = c => c.x1 >= left && c.x1 + w <= right && !hits(c.x1, c.x1 + w, c.y1, c.y1 + lh);
    let c = side.find(fits);
    if (c) {
      taken.push({ x1: c.x1, x2: c.x1 + w, y1: c.y1, y2: c.y1 + lh });
      p.label = { x: c.anchor === 'start' ? c.x1 : c.x1 + w, y: p.py + 5, anchor: c.anchor, leader: false };
      return;
    }
    const cx = Math.max(left + w / 2 + 2, Math.min(p.px, right - w / 2 - 2));
    let ly = p.py - gap - lh;
    if (ly < top || hits(cx - w / 2, cx + w / 2, ly, ly + lh)) {
      ly = p.py + gap + 4;
      while (hits(cx - w / 2, cx + w / 2, ly, ly + lh)) ly += lh + 4;
    }
    taken.push({ x1: cx - w / 2, x2: cx + w / 2, y1: ly, y2: ly + lh });
    p.label = { x: cx, y: ly + 13, anchor: 'middle' };
  });

  const hovered = hover != null ? runs.find(r => r.id === hover) : null;

  return <section className="model-eval-chart" aria-label="Which agent is the best subagent?">
    <h2>Which agent is the best subagent?</h2>
    <div className="eval-axis" role="radiogroup" aria-label="Horizontal axis">
      {AXES.map(a => <button key={a.key} type="button" role="radio" aria-checked={axisKey === a.key} className={axisKey === a.key ? 'on' : ''} onClick={() => setAxisKey(a.key)}>{a.label}</button>)}
    </div>
    <div className="model-eval-plot" ref={host}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Score from 6 to 10 against ${metric.axis.toLowerCase()}`}>
        {[6, 7, 8, 9, 10].map(t => <g key={t}>
          <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="#e5e5e5" />
          <text x={left - 10} y={y(t) + 5} textAnchor="end">{t}</text>
        </g>)}
        {ticks.map(t => <text key={t.v} x={t.x} y={bottom + 26} textAnchor="middle">{metric.tick(t.v)}</text>)}
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#a9a9a9" />
        <text x={left} y="16">Score ↑</text>
        <text x={(left + right) / 2} y={height - 6} textAnchor="middle">{metric.axis}</text>
        {frontierPath && <path className="pareto" data-axis={axisKey} d={frontierPath} fill="none" stroke="#b5b5b5" strokeWidth="1.5" />}
        {frontierLabel && <text className="pareto-label" x={frontierLabel.x} y={frontierLabel.y} textAnchor={frontierLabel.anchor}>Pareto frontier</text>}
        {placed.map(p => {
          const c = FAMILY_COLORS[familyOf(p.r)];
          const active = hover === p.r.id;
          const dim = !onFrontier.has(p.r.id);
          return <g key={p.r.id} className="eval-point" tabIndex="0" role="button"
            aria-label={`${p.r.label}. Score ${fmt.score(score10(p.r))} of 10. ${metric.axis}: ${metric.tick(metric.get(p.r))}.`}
            onMouseEnter={() => setHover(p.r.id)} onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(p.r.id)} onBlur={() => setHover(null)}
            onClick={() => setHover(active ? null : p.r.id)}>
            <title>{`${p.r.label}: ${fmt.score(score10(p.r))}/10, ${metric.tick(metric.get(p.r))}`}</title>
            <circle cx={p.px} cy={p.py} r="16" fill="transparent" />
            {active && <circle cx={p.px} cy={p.py} r="10" fill="none" stroke={c} strokeWidth="1.5" />}
            <circle cx={p.px} cy={p.py} r="4.5" fill={c} stroke={c} strokeWidth="1.7" opacity={dim ? .55 : 1} />
            <text className="point-label" x={p.label.x} y={p.label.y} textAnchor={p.label.anchor}>{p.text}</text>
          </g>;
        })}
      </svg>
      {hovered && <div className="eval-tooltip" role="status">
        <strong>{hovered.label}</strong>
        <dl>
          <div><dt>Score</dt><dd>{fmt.score(score10(hovered))} / 10</dd></div>
          <div><dt>Wall time</dt><dd>{fmt.minutes(hovered.wall_min)}</dd></div>
          <div><dt>Tokens</dt><dd>{fmt.tokens(totalTokens(hovered))}</dd></div>
          <div><dt>API $</dt><dd>{fmt.money(hovered.api_usd)}</dd></div>
          <div><dt>Subscription $</dt><dd>{fmt.money(hovered.sub_usd)}</dd></div>
          <div><dt>Share of a week</dt><dd>{fmt.pct(hovered.weekly_share_pct)}</dd></div>
        </dl>
      </div>}
    </div>
    <div className="agent-legend" aria-label="Providers">
      {[['anthropic', 'Anthropic'], ['zhipu', 'Z.ai'], ['openai', 'OpenAI']].map(([k, label]) => <span key={k}><i style={{ background: FAMILY_COLORS[k] }} />{label}</span>)}
    </div>
    <style>{`
      .model-eval-chart { margin:32px 0; color:#252525; }
      .eval-axis { display:inline-grid; grid-auto-flow:column; grid-auto-columns:max-content; border:1px solid #252525; margin:0 0 20px; max-width:100%; }
      .eval-axis button { font:15px/1.2 system-ui,sans-serif; padding:9px 14px; border:0; border-left:1px solid #252525; background:#fff; color:#252525; cursor:pointer; white-space:nowrap; }
      .eval-axis button:first-child { border-left:0; }
      .eval-axis button.on { background:#252525; color:#fff; }
      .eval-axis button:focus-visible { outline:2px solid currentColor; outline-offset:-4px; }
      @media(max-width:600px) {
        .eval-axis { display:grid; grid-template-columns:1fr 1fr; grid-auto-flow:row; width:100%; }
        .eval-axis button { padding:10px 8px; white-space:normal; }
        .eval-axis button:nth-child(3) { border-left:0; }
        .eval-axis button:nth-child(n+3) { border-top:1px solid #252525; }
        .eval-axis button:nth-child(5) { grid-column:1 / -1; border-left:0; }
      }
      .model-eval-chart h2 { font:600 24px/1.3 system-ui,sans-serif; margin:40px 0 16px; text-wrap:balance; }
      .model-eval-plot { position:relative; width:100%; min-width:0; }
      .model-eval-plot svg { display:block; width:100%; height:auto; overflow:visible; font:15px system-ui,sans-serif; fill:#252525; }
      .model-eval-plot .point-label { font-size:15px; }
      .model-eval-plot .pareto-label { font-size:14px; fill:#6b6b6b; paint-order:stroke; stroke:white; stroke-width:4px; }
      .eval-point { cursor:pointer; outline:none; }
      .eval-point:focus-visible circle:first-of-type { stroke:#252525; stroke-width:2; }
      .agent-legend { display:flex; flex-wrap:wrap; gap:12px 22px; margin:24px 0; font-size:16px; }
      .agent-legend span { display:flex; align-items:center; gap:8px; }
      .agent-legend i { width:9px; height:9px; display:inline-block; border-radius:50%; }
      .eval-tooltip { position:absolute; top:8px; right:8px; width:min(260px,80%); background:#fff; border:1px solid #d9d9d9; box-shadow:0 4px 16px rgba(0,0,0,.08); padding:12px 14px; font:15px/1.45 system-ui,sans-serif; pointer-events:none; }
      .eval-tooltip strong { display:block; font-weight:600; margin-bottom:6px; }
      .eval-tooltip dl { display:grid; grid-template-columns:max-content 1fr; gap:2px 14px; margin:0; font-variant-numeric:tabular-nums; }
      .eval-tooltip dl div { display:contents; }
      .eval-tooltip dt { color:#4a4a4a; }
      .eval-tooltip dd { margin:0; text-align:right; }
    `}</style>
  </section>;
}
