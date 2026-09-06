import React, { useEffect, useRef, useState } from 'react';

const COLORS = { Codex: '#333333', 'Claude / Opus': '#a6512d', 'Claude / Fable': '#a6512d', Kimi: '#276486', Grok: '#657135', Antigravity: '#977216', 'GLM historical scenario': '#526775', Cursor: '#785190' };
const money = (n) => n == null ? 'Not established' : `$${n.toFixed(3)}`;
const short = (r) => r.short.replace(' · $30 plan', '').replace(' historical', '');

function Plot({ models, adjusted, selected, onSelect }) {
  const host = useRef(null);
  const [width, setWidth] = useState(540);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)));
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  const left = 38, right = width - 20, top = 30, bottom = 365;
  const x = (v) => left + (Math.log10(v) - Math.log10(.005)) / (Math.log10(20) - Math.log10(.005)) * (right - left);
  const y = (v) => bottom - (v - 34) / 40 * (bottom - top);
  const rows = models.filter(r => !adjusted || r.price != null);
  const activeRow = rows.find(r => r.short === selected);
  const named = ['Fable 5.1 max', 'Luna max', 'GLM 5.2 historical', 'GLM 5.1 historical', 'Composer 2.5 Fast'];
  return <div className="agent-plot" ref={host}>
    <svg viewBox={`0 0 ${width} 420`} role="group" aria-label={`${adjusted ? 'Subscription estimate' : 'Original API cost'} versus Coding Agent Index`}>
      <text x={left} y="16" className="axis-caption">Coding Agent Index ↑</text>
      {[35, 45, 55, 65, 70].map(t => <g key={t}>
        <line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="#e5e5e5" />
        <text x={left - 10} y={y(t) + 5} textAnchor="end">{t}</text>
      </g>)}
      {[.01, .1, 1, 10].map(t => <g key={t}>
        <text x={x(t)} y={bottom + 28} textAnchor="middle">${t < 1 ? t.toFixed(2) : t}</text>
      </g>)}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#a9a9a9" />
      <text x={(left + right) / 2} y="415" textAnchor="middle">Dollars per task · log scale</text>
      {rows.map(r => {
        const px = x(adjusted ? r.price : r.api), py = y(r.score), active = selected === r.short;
        const c = COLORS[r.group];
        const nearActive = activeRow && Math.abs(y(activeRow.score) - py) < 32 && Math.abs(x(adjusted ? activeRow.price : activeRow.api) - px) < 180;
        const label = active || (named.includes(r.short) && !nearActive);
        const labelText = short(r);
        const labelWidth = labelText.length * 7.6;
        const labelLeft = px > width * .59 || r.short === 'Luna max';
        const labelX = Math.max(4, Math.min(width - labelWidth - 4, px + (labelLeft ? -labelWidth - 10 : 10)));
        const labelY = py + (r.historical && r.short.includes('5.1') ? 24 : -12);
        const cursor = r.group === 'Cursor';
        return <g key={r.short} tabIndex="0" role="button" className="agent-point" aria-label={`${r.benchmark_label || r.label}. Score ${r.score.toFixed(2)}. ${adjusted ? 'Subscription estimate' : 'API cost'} ${money(adjusted ? r.price : r.api)} per task.`}
          onClick={() => onSelect(r.short)} onFocus={() => onSelect(r.short)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(r.short); } }}>
          <title>{`${r.benchmark_label || r.label}: ${r.score.toFixed(2)} points, ${money(adjusted ? r.price : r.api)} per task`}</title>
          {adjusted && <line x1={x(r.lo)} x2={x(r.hi)} y1={py} y2={py} stroke={c} strokeWidth="1.5" opacity=".45" />}
          <circle cx={px} cy={py} r="14" fill="transparent" />
          {active && <circle cx={px} cy={py} r="10" fill="none" stroke={c} strokeWidth="1.5" />}
          {r.historical ? <rect x={px - 4} y={py - 4} width="8" height="8" fill="white" stroke={c} strokeWidth="1.7" /> : cursor ? <path d={`M${px},${py-6} l6,6 -6,6 -6,-6 Z`} fill={c} /> : <circle cx={px} cy={py} r="4.5" fill={r.group === 'Antigravity' ? 'white' : c} stroke={c} strokeWidth="1.7" />}
          {label && <text className="point-label" x={labelX} y={labelY}>{labelText}</text>}
        </g>;
      })}
    </svg>
  </div>;
}

export default function CodingAgentComparison({ models }) {
  const [selected, setSelected] = useState('Fable 5.1 max');
  const row = models.find(r => r.short === selected) || models[0];
  return <section className="agent-comparison" aria-label="Original and subscription-adjusted coding agent comparison">
    <div className="agent-panels">
      <section><h2>Original · API pricing</h2><Plot models={models} selected={selected} onSelect={setSelected} /></section>
      <section><h2>Our adjustment · subscriptions</h2><Plot models={models} adjusted selected={selected} onSelect={setSelected} /></section>
    </div>
    <div className="agent-legend" aria-label="Agent platforms">
      {[['Codex','Codex'],['Claude / Fable','Claude Code'],['Kimi','Kimi CLI'],['Grok','Grok Build'],['Antigravity','Antigravity'],['GLM historical scenario','GLM 5.1 / 5.2'],['Cursor','Cursor CLI']].map(([key,label]) => <span key={key}><i style={{background:key === 'GLM historical scenario' || key === 'Antigravity' ? 'transparent' : COLORS[key],border:`1.5px solid ${COLORS[key]}`,borderRadius:key === 'Cursor' || key === 'GLM historical scenario' ? 0 : '50%',transform:key === 'Cursor' ? 'rotate(45deg)' : 'none'}} />{label}</span>)}
    </div>
    <div className="agent-selection" aria-live="polite">
      <strong>{row.benchmark_label || row.label}</strong>
      <span>{row.score.toFixed(2)} points</span><span>API {money(row.api)}</span><span>Subscription {money(row.price)}{row.price != null ? ` (${money(row.lo)}–${money(row.hi)})` : ''}</span>
    </div>
    <p className="agent-explainer">Same scores and scales on both sides. Tap a point for its values. Lines show estimate ranges; open squares mark historical GLM results. Three Cursor configurations have API results only.</p>
    <style>{`
      .agent-comparison { margin:32px 0; color:#252525; }
      .agent-panels { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:32px; }
      .agent-panels h2 { font:600 22px/1.3 system-ui,sans-serif; margin:0 0 14px; }
      .agent-plot { width:100%; min-width:0; }
      .agent-plot svg { display:block; width:100%; height:auto; overflow:visible; font:15px system-ui,sans-serif; fill:#252525; }
      .agent-plot .point-label { font-size:15px; paint-order:stroke; stroke:white; stroke-width:5px; stroke-linejoin:round; }
      .agent-point { cursor:pointer; outline:none; }
      .agent-point:focus-visible circle:first-of-type { stroke:#252525; stroke-width:2; }
      .agent-legend { display:flex; flex-wrap:wrap; gap:12px 22px; margin:24px 0; font-size:16px; }
      .agent-legend span { display:flex; align-items:center; gap:8px; }
      .agent-legend i { width:9px; height:9px; display:inline-block; border-radius:50%; }
      .agent-selection { display:flex; flex-wrap:wrap; gap:8px 22px; padding:18px 0; border-top:1px solid #d9d9d9; border-bottom:1px solid #d9d9d9; font-size:17px; font-variant-numeric:tabular-nums; }
      .agent-selection strong { flex-basis:100%; font-weight:600; }
      .agent-explainer { font-size:17px; margin:18px 0 0; }
      @media(max-width:959px) { .agent-panels {grid-template-columns:1fr;gap:32px;} .agent-panels section {width:100%;max-width:680px;margin:0 auto;} }
    `}</style>
  </section>;
}
