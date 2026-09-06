import React, { useEffect, useRef, useState } from 'react';

import { chartLayout, frontierRows } from '../lib/agent-chart-layout';

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
  const layout = chartLayout(models,width,adjusted);
  const {left,right,bottom,height,points,scoreTicks,costTicks} = layout;
  return <div className="agent-plot" ref={host}>
    <svg viewBox={`0 0 ${width} ${height}`} role="group" aria-label={`${adjusted ? 'Subscription estimate' : 'Original API cost'} versus Coding Agent Index`}>
      <text x={left} y="16" className="axis-caption">Coding Agent Index ↑</text>
      {scoreTicks.map(({v:t,y}) => <g key={t}>
        <line x1={left} x2={right} y1={y} y2={y} stroke="#e5e5e5" />
        <text x={left - 10} y={y + 5} textAnchor="end">{t}</text>
      </g>)}
      {costTicks.map(({v:t,x}) => <g key={t}>
        <text x={x} y={bottom + 28} textAnchor="middle">${t < 1 ? t.toFixed(2) : t}</text>
      </g>)}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#a9a9a9" />
      <text x={(left + right) / 2} y={height-5} textAnchor="middle">Dollars per task · log scale</text>
      {points.map(p => {
        const r=p.row,px=p.x,py=p.y,active=selected===r.short,c=COLORS[r.group],b=p.label;
        const labelText=p.text,labelX=b.x,labelY=b.y+14;
        const endX=Math.max(b.x,Math.min(b.x+b.w,px)),endY=Math.max(b.y,Math.min(b.y+b.h,py));
        const cursor = r.group === 'Cursor';
        return <g key={r.short} tabIndex="0" role="button" className="agent-point" aria-label={`${r.benchmark_label || r.label}. Score ${r.score.toFixed(2)}. ${adjusted ? 'Subscription estimate' : 'API cost'} ${money(adjusted ? r.price : r.api)} per task.`}
          onClick={() => onSelect(r.short)} onFocus={() => onSelect(r.short)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(r.short); } }}>
          <title>{`${r.benchmark_label || r.label}: ${r.score.toFixed(2)} points, ${money(adjusted ? r.price : r.api)} per task`}</title>
          {adjusted && <line x1={p.lo} x2={p.hi} y1={py} y2={py} stroke={c} strokeWidth="1.5" opacity=".45" />}
          <circle cx={px} cy={py} r="14" fill="transparent" />
          {active && <circle cx={px} cy={py} r="10" fill="none" stroke={c} strokeWidth="1.5" />}
          {r.historical ? <rect x={px - 4} y={py - 4} width="8" height="8" fill="white" stroke={c} strokeWidth="1.7" /> : cursor ? <path d={`M${px},${py-6} l6,6 -6,6 -6,-6 Z`} fill={c} /> : <circle cx={px} cy={py} r="4.5" fill={r.group === 'Antigravity' ? 'white' : c} stroke={c} strokeWidth="1.7" />}
          <line className="label-leader" x1={px} y1={py} x2={endX} y2={endY} stroke="#929292" strokeWidth=".8" />
          <text className="point-label" x={labelX} y={labelY}>{labelText}</text>
        </g>;
      })}
    </svg>
  </div>;
}

export default function CodingAgentComparison({ models }) {
  const [selected, setSelected] = useState('Fable 5.1 max');
  models = frontierRows(models);
  const row = models.find(r => r.short === selected) || models[0];
  return <section className="agent-comparison" aria-label="Original and subscription-adjusted coding agent comparison">
    <div className="agent-panels">
      <section><h2>Original · API pricing</h2><Plot models={models} selected={selected} onSelect={setSelected} /></section>
      <section><h2>Our adjustment · subscriptions</h2><Plot models={models} adjusted selected={selected} onSelect={setSelected} /></section>
    </div>
    <div className="agent-legend" aria-label="Agent platforms">
      {[['Codex','Codex'],['Claude / Fable','Claude Code'],['Kimi','Kimi CLI'],['Grok','Grok Build'],['Antigravity','Antigravity']].map(([key,label]) => <span key={key}><i style={{background:key === 'GLM historical scenario' || key === 'Antigravity' ? 'transparent' : COLORS[key],border:`1.5px solid ${COLORS[key]}`,borderRadius:key === 'Cursor' || key === 'GLM historical scenario' ? 0 : '50%',transform:key === 'Cursor' ? 'rotate(45deg)' : 'none'}} />{label}</span>)}
    </div>
    <div className="agent-selection" aria-live="polite">
      <strong>{row.benchmark_label || row.label}</strong>
      <span>{row.score.toFixed(2)} points</span><span>API {money(row.api)}</span><span>Subscription {money(row.price)}{row.price != null ? ` (${money(row.lo)}–${money(row.hi)})` : ''}</span>
    </div>
    <p className="agent-explainer">Frontier view · 55–72 points. Same scores and scales on both sides. Tap a dot or its label for values; horizontal lines show estimate ranges.</p>
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
