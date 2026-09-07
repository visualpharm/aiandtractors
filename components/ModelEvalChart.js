import React, { useEffect, useMemo, useRef, useState } from 'react';

const FAMILY_COLORS = { anthropic: '#db7549', zhipu: '#2563eb', openai: '#171717' };
const SHORT_LABELS = { 'fable-low': 'Fable 5.1 low', 'opus-low': 'Opus 5 low', 'glm-claude-code': 'GLM 5.3 · Claude Code', 'glm-zcode': 'GLM 5.3 · ZCode', 'sonnet-medium': 'Sonnet 5 medium', 'codex-astra-low': 'Codex GPT-6 Astra low' };

const COST_MODES = [
  { key: 'sub', label: 'Subscription $ / task', axis: 'Subscription dollars per task', get: r => r.sub_usd, ticks: [0.5, 1, 1.5, 2], fmt: v => `$${v.toFixed(2)}` },
  { key: 'api', label: 'API-equivalent $', axis: 'API-equivalent dollars per task', get: r => r.api_usd, ticks: [10, 20, 30, 40], fmt: v => `$${v}` },
  { key: 'share', label: 'Share of one week\'s allowance', axis: 'Percent of one week\'s plan allowance', get: r => r.weekly_share_pct, ticks: [2, 4, 6, 8], fmt: v => `${v}%` },
];
const VIEWS = [
  { key: 'cost', label: 'Score vs cost' },
  { key: 'time', label: 'Score vs wall time' },
];

function fmtTokens(n) { return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : `${Math.round(n / 1e3)}K`; }
function fmtScore(v) { return String(parseFloat(v.toFixed(2))); }
const score10 = r => r.score / 2;
const item10 = v => v / 2;

export default function ModelEvalChart({ runs, rubricItems }) {
  const [costMode, setCostMode] = useState('sub');
  const [view, setView] = useState('cost');
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
    if (view === 'time') return { get: r => r.wall_min, axis: 'Wall-clock minutes per task', min: 10, max: 50, ticks: [15, 20, 25, 30, 35, 40, 45], fmt: v => `${v}` };
    const m = COST_MODES.find(c => c.key === costMode);
    return { ...m, min: 0, max: Math.max(...runs.map(m.get)) * 1.28 };
  }, [view, costMode, runs]);

  const scoreMin = 0, scoreMax = 10;
  const height = narrow ? 640 : 560, left = narrow ? 34 : 44, right = width - 24, top = 26, bottom = height - (narrow ? 90 : 60);
  const x = v => left + (v - metric.min) / (metric.max - metric.min) * (right - left);
  const y = v => bottom - (v - scoreMin) / (scoreMax - scoreMin) * (bottom - top);
  let ticks = view === 'cost' && metric.ticks
    ? metric.ticks.filter(t => t >= metric.min && t <= metric.max).map(t => ({ v: t, x: x(t) }))
    : metric.ticks.map(t => ({ v: t, x: x(t) }));
  if (narrow && ticks.length > 1) {
    const spacing = (right - left) / (ticks.length - 1);
    if (spacing < 56) ticks = ticks.filter((_, i) => i % 2 === 0);
  }

  // Place labels greedily top-to-bottom, above the point when that rectangle is
  // free and below otherwise, so same-side neighbors never collide; on narrow
  // screens space them further apart and draw leader lines to the label.
  const placed = runs.map(r => ({ r, px: x(metric.get(r)), py: y(score10(r)) }))
    .sort((a, b) => a.py - b.py);
  const step = narrow ? 26 : 20;
  const gap = narrow ? 10 : 8;
  const half = Math.min((right - left) / 2, 82);
  const taken = [];
  const hits = (x1, x2, y1, y2) => taken.some(b => x1 < b.x2 + 12 && b.x1 < x2 + 12 && y1 < b.y2 && b.y1 < y2);
  placed.forEach(p => {
    const lx = Math.max(left + half, Math.min(p.px, right - half));
    const lw = half * 2, lh = 16;
    let dy;
    const aboveY = p.py - gap - lh;
    if (aboveY >= top && !hits(lx - half, lx + half, aboveY, aboveY + lh)) dy = -gap;
    else {
      let k = 1;
      do { dy = gap + 6 + k * step; k++; } while (hits(lx - half, lx + half, p.py + dy, p.py + dy + lh));
    }
    taken.push({ x1: lx - half, x2: lx + half, y1: p.py + dy, y2: p.py + dy + lh });
    p.label = { dy, lx, leader: dy !== -gap || Math.abs(lx - p.px) > 4 };
  });

  const hoveredRun = hover != null ? runs.find(r => r.id === hover) : null;

  return <section className="model-eval-chart" aria-label="Agent runs plotted by cost and rubric score">
    <div className="eval-controls" role="group" aria-label="Chart axes">
      {view === 'cost' && <div className="eval-toggle" role="radiogroup" aria-label="Cost basis">
        {COST_MODES.map(m => <button key={m.key} role="radio" aria-checked={costMode === m.key} className={costMode === m.key ? 'on' : ''} onClick={() => setCostMode(m.key)}>{m.label}</button>)}
      </div>}
      <div className="eval-toggle" role="radiogroup" aria-label="View">
        {VIEWS.map(v => <button key={v.key} role="radio" aria-checked={view === v.key} className={view === v.key ? 'on' : ''} onClick={() => setView(v.key)}>{v.label}</button>)}
      </div>
    </div>
    <div className="model-eval-plot" ref={host}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Rubric score from 0 to 10 against ${metric.axis.toLowerCase()}`}>
        {[0, 2, 4, 6, 8, 10].map(t => <g key={t}>
          <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="#e5e5e5" />
          <text x={left - 10} y={y(t) + 5} textAnchor="end">{t}</text>
        </g>)}
        {ticks.map(t => <text key={t.v} x={t.x} y={bottom + 28} textAnchor="middle">{metric.fmt(t.v)}</text>)}
        <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#a9a9a9" />
        <text x={left} y="16" className="axis-caption">Score (0 to 10) ↑</text>
        <text x={(left + right) / 2} y={height - 4} textAnchor="middle">{metric.axis}</text>
        {placed.map(p => {
          const family = p.r.model.startsWith('claude') ? 'anthropic' : p.r.model.startsWith('glm') ? 'zhipu' : 'openai';
          const c = FAMILY_COLORS[family];
          const active = hover === p.r.id;
          return <g key={p.r.id} className="eval-point" tabIndex="0" role="button"
            aria-label={`${p.r.label}. Score ${fmtScore(score10(p.r))} of 10. ${metric.axis}: ${metric.fmt(metric.get(p.r))}.`}
            onMouseEnter={() => setHover(p.r.id)} onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(p.r.id)} onBlur={() => setHover(null)}
            onClick={() => setHover(active ? null : p.r.id)}>
            <title>{`${p.r.label}: ${fmtScore(score10(p.r))}/10, ${metric.fmt(metric.get(p.r))}`}</title>
            <circle cx={p.px} cy={p.py} r="16" fill="transparent" />
            {active && <circle cx={p.px} cy={p.py} r="9" fill="none" stroke={c} strokeWidth="1.5" />}
            <circle cx={p.px} cy={p.py} r="5" fill={c} stroke="white" strokeWidth="1.5" />
            {p.label.leader && <line x1={p.px} y1={p.py + (p.label.dy < 0 ? -7 : 7)} x2={p.label.lx} y2={p.py + p.label.dy + (p.label.dy < 0 ? 8 : -8)} stroke="#9a9a9a" strokeWidth="1" />}
            <text className="point-label" x={p.label.lx} y={p.py + p.label.dy} textAnchor="middle">{SHORT_LABELS[p.r.id]}</text>
          </g>;
        })}
      </svg>
      {hoveredRun && <div className="eval-tooltip" role="status">
        <strong>{hoveredRun.label}</strong>
        <span className="score-line">{fmtScore(score10(hoveredRun))}/10 · {hoveredRun.wall_min} min · {metric.fmt(metric.get(hoveredRun))}</span>
        <ol className="rubric-mini">{hoveredRun.rubric.map((v, i) => <li key={i}><span>{fmtScore(item10(v))}</span> {rubricItems[i]}</li>)}</ol>
        <dl>
          <div><dt>Input</dt><dd>{fmtTokens(hoveredRun.tokens.input)}</dd></div>
          <div><dt>Output</dt><dd>{fmtTokens(hoveredRun.tokens.output)}</dd></div>
          <div><dt>Cache read</dt><dd>{fmtTokens(hoveredRun.tokens.cache_read)}</dd></div>
          <div><dt>Cache write</dt><dd>{fmtTokens(hoveredRun.tokens.cache_write)}</dd></div>
          <div><dt>API $</dt><dd>${hoveredRun.api_usd.toFixed(2)}</dd></div>
          <div><dt>Subscription $</dt><dd>${hoveredRun.sub_usd.toFixed(2)}</dd></div>
          <div><dt>Weekly share</dt><dd>{hoveredRun.weekly_share_pct}%</dd></div>
        </dl>
        <ul className="eval-notes">{hoveredRun.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
      </div>}
    </div>
    <div className="agent-legend" aria-label="Model families">
      {[['anthropic', 'Claude / Fable (Anthropic)'], ['zhipu', 'GLM 5.3 (Z.ai)'], ['openai', 'Codex (OpenAI)']].map(([k, label]) => <span key={k}><i style={{ background: FAMILY_COLORS[k] }} />{label}</span>)}
    </div>
    <style>{`
      .model-eval-chart { margin:32px 0; color:#252525; }
      .eval-controls { display:flex; flex-direction:column; gap:10px; margin:0 0 18px; }
      .eval-toggle { display:flex; flex-wrap:wrap; gap:8px; }
      .eval-toggle button { font:15px/1.2 system-ui,sans-serif; padding:8px 14px; border:1px solid #c9c9c9; background:#fff; color:#252525; border-radius:999px; cursor:pointer; }
      .eval-toggle button.on { background:#252525; border-color:#252525; color:#fff; }
      .eval-toggle button:focus-visible { outline:2px solid currentColor; outline-offset:2px; }
      .model-eval-plot { position:relative; width:100%; min-width:0; }
      .model-eval-plot svg { display:block; width:100%; height:auto; overflow:visible; font:15px system-ui,sans-serif; fill:#252525; }
      .model-eval-plot .point-label { font-size:14px; paint-order:stroke; stroke:white; stroke-width:5px; stroke-linejoin:round; }
      .eval-point { cursor:pointer; outline:none; }
      .eval-point:focus-visible circle:first-of-type { stroke:#252525; stroke-width:2; }
      .agent-legend { display:flex; flex-wrap:wrap; gap:12px 22px; margin:24px 0; font-size:16px; }
      .agent-legend span { display:flex; align-items:center; gap:8px; }
      .agent-legend i { width:9px; height:9px; display:inline-block; border-radius:50%; }
      .eval-tooltip { position:absolute; top:8px; right:8px; width:min(340px,90%); max-height:420px; overflow:auto; background:#fff; border:1px solid #d9d9d9; box-shadow:0 4px 16px rgba(0,0,0,.08); padding:14px 16px; font:15px/1.45 system-ui,sans-serif; }
      .eval-tooltip strong { display:block; font-weight:600; margin-bottom:2px; }
      .eval-tooltip .score-line { display:block; color:#4a4a4a; margin-bottom:10px; font-variant-numeric:tabular-nums; }
      .rubric-mini { list-style:none; padding:0; margin:0 0 10px; font-size:14px; }
      .rubric-mini li { display:flex; gap:8px; margin:0 0 5px; }
      .rubric-mini li span { font-weight:600; min-width:26px; text-align:right; font-variant-numeric:tabular-nums; }
      .eval-tooltip dl { display:grid; grid-template-columns:1fr 1fr; gap:2px 14px; margin:0 0 10px; font-size:14px; font-variant-numeric:tabular-nums; }
      .eval-tooltip dl div { display:flex; justify-content:space-between; gap:8px; border-bottom:1px solid #eee; padding:2px 0; }
      .eval-tooltip dt { color:#4a4a4a; }
      .eval-tooltip dd { margin:0; }
      .eval-notes { list-style:disc; padding-left:18px; margin:0; font-size:14px; }
      .eval-notes li { margin:0 0 5px; }
    `}</style>
  </section>;
}
