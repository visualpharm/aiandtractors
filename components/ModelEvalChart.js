import React,{useEffect,useMemo,useRef,useState} from 'react';
import {paretoFrontier,monotoneCubic} from '../lib/feature-eval-math';
export {paretoFrontier,monotoneCubic};
export const FAMILY_COLORS={anthropic:'#db7549',zhipu:'#2563eb',openai:'#171717'};
export const familyOf=r=>r.model.startsWith('claude')?'anthropic':r.model.startsWith('glm')?'zhipu':'openai';
export const totalTokens=r=>r.tokens.input+r.tokens.cache_write+r.tokens.cache_read+r.tokens.output;
export const fmt={money:v=>v==null?'–':`$${v.toFixed(2)}`,price:v=>v==null?'–':`$${Number(v.toFixed(3))}`,pct:v=>`${Number(v.toFixed(1))}%`,minutes:v=>`${v} min`,score:v=>`${Number(v.toFixed(2))}`,tokens:n=>n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:`${n}`,int:v=>v.toLocaleString('en-US'),ratio:v=>v.toFixed(3)};
const LABELS={'fable-low':['Fable 5.1 low','Claude Code'],'opus-low':['Opus 5 low','Claude Code'],'glm-claude-code':['GLM 5.3','Claude Code'],'glm-zcode':['GLM 5.3','ZCode'],'sonnet-medium':['Sonnet 5 medium','Claude Code'],'codex-astra-low':['GPT-6 Astra low','Codex CLI']};
const AXES=[
 {key:'sub',label:'Subscription $',axis:'Estimated subscription dollars per task',get:r=>r.sub_usd,step:.25,tick:v=>v?`$${v.toFixed(2)}`:'$0'},
 {key:'api',label:'API-equivalent $',axis:'API-equivalent dollars per task',get:r=>r.api_usd,step:5,tick:v=>`$${v}`},
 {key:'tokens',label:'Tokens',axis:'Total tokens per task',get:totalTokens,step:10e6,tick:v=>v?`${v/1e6}M`:'0'},
 {key:'share',label:'Weekly allowance',axis:'Percent of one week’s allowance',get:r=>r.weekly_share_pct,step:1,tick:v=>`${v}%`},
 {key:'time',label:'Wall time',axis:'Minutes per task',get:r=>r.wall_min,step:10,tick:v=>`${v}`}
];
export default function ModelEvalChart({runs}){
 const [axisKey,setAxisKey]=useState('sub'),[hover,setHover]=useState(null),[width,setWidth]=useState(700);
 const host=useRef(null);
 useEffect(()=>{const o=new ResizeObserver(([e])=>setWidth(Math.max(280,e.contentRect.width)));o.observe(host.current);return()=>o.disconnect();},[]);
 const narrow=width<620, height=narrow?740:480,left=30,right=width-12,top=narrow?70:36,bottom=height-75;
 const metric=useMemo(()=>{const a=AXES.find(x=>x.key===axisKey);return {...a,max:Math.ceil(Math.max(...runs.map(a.get))*1.28/a.step)*a.step};},[axisKey,runs]);
 const x=v=>left+v/metric.max*(right-left),y=v=>bottom-(v-6)/4*(bottom-top);
 const frontier=paretoFrontier(runs,metric.get),curve=monotoneCubic(frontier.map(r=>({px:x(metric.get(r)),py:y(r.score/2)})));
 const pts=runs.map(r=>({r,px:x(metric.get(r)),py:y(r.score/2),lines:LABELS[r.id]})).sort((a,b)=>a.py-b.py);
 const pointBoxes=pts.map(p=>({x:p.px-8,y:p.py-8,w:16,h:16}));
 const lineHeight=20;
 const intersects=(a,b)=>a.x<b.x+b.w+5&&b.x<a.x+a.w+5&&a.y<b.y+b.h+4&&b.y<a.y+a.h+4;
 const distance=(p,c)=>Math.hypot(Math.max(c.x-p.px,0,p.px-c.x-c.w),Math.max(c.y-p.py,0,p.py-c.y-c.h));
 const curveHits=c=>{for(let sx=c.x;sx<=c.x+c.w;sx+=6){const sy=curve.sample(sx);if(sy!==null&&sy>c.y-3&&sy<c.y+c.h+3)return true;}return false;};
 const choices=pts.map(p=>{
  const w=Math.max(...p.lines.map(t=>t.length))*8.25,h=40,candidates=[];
  const xs=[p.px+12,p.px-12-w,Math.max(left,Math.min(right-w,p.px-w/2)),left,right-w];
  const ys=[p.py-h/2,p.py+12,p.py-h-12];
  for(const shift of [0,-22,22,-44,44,-66,66,-88,88])for(const yy of ys)for(const xx of xs){
   const c={x:xx,y:yy+shift,w,h};
   if(narrow&&p.r.id==='glm-claude-code'&&pts.some(o=>o.r.id==='glm-zcode'&&Math.abs(o.px-p.px)<60)&&c.y+c.h>p.py-12)continue;
   if(c.x<left||c.x+c.w>right||c.y<28||c.y+c.h>bottom||pointBoxes.some(b=>intersects(c,b))||curveHits(c))continue;
   const dist=distance(p,c),other=Math.min(...pts.filter(o=>o!==p).map(o=>distance(o,c)));
   c.cost=dist*dist+Math.hypot(c.x+w/2-p.px,c.y+h/2-p.py)*.12+(other<dist?2500:0);
   candidates.push(c);
  }
  return candidates.sort((a,b)=>a.cost-b.cost).slice(0,80);
 });
 let beam=[{cost:0,labels:[]}];
 for(let i=0;i<pts.length;i++){
  const next=[];
  for(const state of beam)for(const c of choices[i])if(!state.labels.some(b=>intersects(c,b)))next.push({cost:state.cost+c.cost,labels:[...state.labels,c]});
  beam=next.sort((a,b)=>a.cost-b.cost).slice(0,60);
  if(!beam.length)break;
 }
 if(beam.length&&beam[0].labels.length===pts.length)pts.forEach((p,i)=>p.label=beam[0].labels[i]);
 else pts.forEach((p,i)=>p.label=choices[i][0]||{x:left,y:28+i*60,w:140,h:40});
 let tickStep=metric.step;while((right-left)/(metric.max/tickStep)<70)tickStep*=2;
 const ticks=[];for(let v=0;v<=metric.max+.00001;v+=tickStep)ticks.push(v);
 const hovered=runs.find(r=>r.id===hover);
 return <section className="model-eval-chart" aria-label="Agent score comparison"><div className="eval-axis" role="radiogroup" aria-label="Horizontal axis">{AXES.map(a=><button key={a.key} type="button" role="radio" aria-checked={axisKey===a.key} className={axisKey===a.key?'on':''} onClick={()=>{setAxisKey(a.key);setHover(null);}}>{a.label}</button>)}</div>
 <div className="model-eval-plot" ref={host}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Score from 6 to 10 versus ${metric.axis.toLowerCase()}`}>
 {[6,7,8,9,10].map(v=><g key={v}><line x1={left} x2={right} y1={y(v)} y2={y(v)} stroke="#e0e3e5"/><text x={left-10} y={y(v)+5} textAnchor="end">{v}</text></g>)}
 <text x={left} y="19">Score / 10 ↑</text><line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#aaa"/>
 {ticks.map(t=><text key={t} x={x(t)} y={bottom+27} textAnchor={t===0?'start':t===metric.max?'end':'middle'}>{metric.tick(t)}</text>)}
 <text x={(left+right)/2} y={height-8} textAnchor="middle">{narrow?(axisKey==='sub'?'Estimated subscription $ / task':metric.label):metric.axis}</text>
 {curve.path&&<path className="pareto" data-axis={axisKey} data-frontier={frontier.map(r=>r.id).join(',')} d={curve.path} fill="none" stroke="#a7a7a7" strokeWidth="1.5"/>}
 {pts.map(p=><g key={p.r.id} className="eval-point" tabIndex="0" role="button" aria-label={`${p.r.label}, ${p.r.harness}. ${fmt.score(p.r.score/2)} of 10. ${metric.axis}: ${metric.tick(metric.get(p.r))}`} onMouseEnter={()=>setHover(p.r.id)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(p.r.id)} onBlur={()=>setHover(null)} onClick={()=>setHover(p.r.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setHover(p.r.id);}if(e.key==='Escape')setHover(null);}}>
 <circle cx={p.px} cy={p.py} r="17" fill="transparent"/><circle className="data-dot" data-id={p.r.id} cx={p.px} cy={p.py} r="5.5" fill={FAMILY_COLORS[familyOf(p.r)]}/>
 <text className="point-label" x={p.label.x} y={p.label.y+16}>{p.lines.map((line,i)=><tspan key={line} x={p.label.x} dy={i?lineHeight:0}>{line}</tspan>)}</text></g>)}
 </svg>{hovered&&<div className="eval-tooltip" role="status"><strong>{hovered.label}</strong><dl>{[['Score',`${fmt.score(hovered.score/2)} / 10`],['Subscription',fmt.money(hovered.sub_usd)],['API-equivalent',fmt.money(hovered.api_usd)],['Tokens',fmt.tokens(totalTokens(hovered))],['Weekly share',fmt.pct(hovered.weekly_share_pct)],['Wall time',fmt.minutes(hovered.wall_min)]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>}</div>
 <div className="agent-legend">{[['anthropic','Anthropic'],['zhipu','Z.ai'],['openai','OpenAI']].map(([k,n])=><span key={k}><i style={{background:FAMILY_COLORS[k]}}/>{n}</span>)}</div>
 <style>{`.model-eval-plot{position:relative;margin-top:24px;min-width:0}.model-eval-plot svg{display:block;width:100%;height:auto;font:16px system-ui,sans-serif;fill:#252525;overflow:visible}.eval-point{cursor:pointer;outline:none}.eval-point:focus-visible .data-dot{r:8px}.agent-legend{display:flex;flex-wrap:wrap;gap:18px 28px;font-size:17px;margin-top:16px}.agent-legend span{display:flex;align-items:center;gap:9px}.agent-legend i{width:10px;height:10px;border-radius:50%}.eval-tooltip{position:absolute;top:30px;right:8px;width:min(280px,90%);background:white;border:1px solid #ddd;padding:16px;font:16px/1.5 system-ui;pointer-events:none;box-shadow:0 6px 24px #00000012}.eval-tooltip strong{display:block;margin-bottom:10px}.eval-tooltip dl{margin:0}.eval-tooltip dl div{display:flex;justify-content:space-between;gap:20px}.eval-tooltip dd{margin:0}`}</style></section>;
}
