import {useEffect,useRef,useState} from 'react';
import {paretoFrontier,monotoneCubic} from '../lib/feature-eval-math';
export {paretoFrontier,monotoneCubic};
export const FAMILY_COLORS={anthropic:'#db7549',zhipu:'#2563eb',openai:'#171717'};
export const familyOf=r=>r.model.startsWith('claude')?'anthropic':r.model.startsWith('glm')?'zhipu':'openai';
export const totalTokens=r=>r.tokens.input+r.tokens.cache_write+r.tokens.cache_read+r.tokens.output;
export const fmt={money:v=>v==null?'–':`$${v.toFixed(2)}`,price:v=>v==null?'–':`$${Number(v.toFixed(3))}`,pct:v=>`${Number(v.toFixed(1))}%`,minutes:v=>`${v} min`,score:v=>`${Number(v.toFixed(2))}`,tokens:n=>n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:`${n}`,int:v=>v.toLocaleString('en-US'),ratio:v=>v.toFixed(3)};
const LABELS={'fable-low':['Fable 5.1 low','Claude Code'],'opus-low':['Opus 5 low','Claude Code'],'glm-claude-code':['GLM 5.3','Claude Code'],'glm-zcode':['GLM 5.3','ZCode'],'sonnet-medium':['Sonnet 5 medium','Claude Code'],'codex-astra-low':['GPT-6 Astra low','Codex CLI']};
const AXES=[
 {key:'sub',label:'Subscription $ per task',log:true,get:r=>r.sub_usd,ticks:[.2,.5,1],tick:v=>`$${v.toFixed(2)}`},
 {key:'api',label:'API-equivalent $',log:true,get:r=>r.api_usd,ticks:[5,10,20],tick:v=>`$${Number(v.toFixed(2))}`},
 {key:'share',label:'Share of a week',get:r=>r.weekly_share_pct,ticks:[1,2,3,4],tick:v=>`${v}%`},
 {key:'time',label:'Wall time',get:r=>r.wall_min,ticks:[10,20,30,40],tick:v=>`${v} min`}
];
export default function ModelEvalChart({runs}){
 const [axisKey,setAxisKey]=useState('sub'),[hover,setHover]=useState(null),[width,setWidth]=useState(760);
 const host=useRef(null);
 useEffect(()=>{const o=new ResizeObserver(([e])=>setWidth(Math.max(300,e.contentRect.width)));o.observe(host.current);return()=>o.disconnect();},[]);
 const narrow=width<620,height=narrow?560:490,left=narrow?32:40,right=width-14,top=34,bottom=height-64;
 const axis=AXES.find(x=>x.key===axisKey);
 const vals=runs.map(axis.get),min=Math.min(...vals),max=Math.max(...vals);
 const d0=axis.log?min/1.16:0,d1=axis.log?max*1.22:max*1.15,lg0=Math.log10(d0),lg1=Math.log10(d1);
 const x=axis.log?v=>left+(Math.log10(v)-lg0)/(lg1-lg0)*(right-left):v=>left+(v-d0)/(d1-d0)*(right-left);
 const y=v=>bottom-(v-5)/5*(bottom-top);
 const frontier=paretoFrontier(runs,axis.get),onFrontier=new Set(frontier.map(r=>r.id));
 const segHits=(a,b,box)=>{
  if(Math.max(a.x,b.x)<box.x-3||Math.min(a.x,b.x)>box.x+box.w+3)return false;
  for(let sx=Math.max(a.x,box.x);sx<=Math.min(b.x,box.x+box.w);sx+=5){
   const sy=a.y+(b.x===a.x?0:(sx-a.x)/(b.x-a.x)*(b.y-a.y));
   if(sy>box.y-3&&sy<box.y+box.h+3)return true;
  }
  return false;
 };
 const lineHits=box=>{for(let i=0;i<frontier.length-1;i++){
  const a={x:x(axis.get(frontier[i])),y:y(frontier[i].score/2)},b={x:x(axis.get(frontier[i+1])),y:y(frontier[i+1].score/2)};
  if(segHits(a,b,box))return true;
 }return false;};
 const pts=runs.map(r=>({r,px:x(axis.get(r)),py:y(r.score/2),lines:LABELS[r.id]})).sort((a,b)=>b.r.score-a.r.score);
 const fontPx=15,lineH=19,placed=[];
 const clash=(a,b,pad)=>!(a.x>b.x+b.w+pad||b.x>a.x+a.w+pad||a.y>b.y+b.h+pad||b.y>a.y+a.h+pad);
 for(const p of pts){
  const w=Math.max(...p.lines.map(t=>t.length))*fontPx*.56+2,h=p.lines.length*lineH+8;
  const preferR=p.px<(left+right)/2,sides=preferR?['right','left']:['left','right'];
  const dotBoxes=pts.filter(o=>o!==p).map(o=>({x:o.px-9,y:o.py-9,w:18,h:18}));
  let pick=null;
  for(const dy of [0,26,-26,52,-52,78,-78,104,-104,130,-130]){
   for(const side of sides){
    const bx=side==='right'?p.px+14:p.px-14-w,by=Math.max(top+2,Math.min(bottom-h-2,p.py-h/2+dy));
    const box={x:bx,y:by,w,h,side};
    if(bx<left-2||bx+w>right+2)continue;
    if(placed.some(o=>clash(box,o,4)))continue;
    if(dotBoxes.some(o=>clash(box,o,3)))continue;
    if(lineHits(box))continue;
    pick=box;break;
   }
   if(pick)break;
  }
  if(!pick){
   const side=sides[0],dy=p.py<(top+bottom)/2?130:-130;
   pick={x:side==='right'?p.px+14:Math.max(left,p.px-14-w),y:Math.max(top+2,Math.min(bottom-h-2,p.py-h/2+dy)),w,h,side};
  }
  const near=Math.hypot(Math.max(pick.x-p.px,0,p.px-(pick.x+pick.w)),Math.max(pick.y+8-p.py,0,p.py-(pick.y+h-8)));
  if(near>26)p.leader={x1:p.px+(pick.side==='right'?8:-8),y1:p.py,x2:pick.side==='right'?pick.x-4:pick.x+pick.w+4,y2:Math.max(pick.y+8,Math.min(pick.y+h-8,p.py))};
  p.label=pick;placed.push(pick);
 }
 const hovered=runs.find(r=>r.id===hover);
 return <section className="model-eval-chart" aria-label="Agent score comparison">
  <div className="eval-axis" role="radiogroup" aria-label="Horizontal axis">{AXES.map(a=><button key={a.key} type="button" role="radio" aria-checked={axisKey===a.key} className={axisKey===a.key?'on':''} onClick={()=>{setAxisKey(a.key);setHover(null);}}>{a.label}</button>)}</div>
  <div className="model-eval-plot" ref={host}><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Quality score from 5 to 10 versus ${axis.label.toLowerCase()}`}>
   {axis.ticks.map(t=><g key={t}><line x1={x(t)} x2={x(t)} y1={top} y2={bottom} stroke="#eef0f2"/><text className="tick" x={x(t)} y={bottom+26} textAnchor="middle">{axis.tick(t)}</text></g>)}
   {[5,6,7,8,9,10].map(v=><g key={v}><line x1={left} x2={right} y1={y(v)} y2={y(v)} stroke="#e0e3e5"/><text className="tick" x={left-10} y={y(v)+5} textAnchor="end">{v}</text></g>)}
   <text className="axis-title" x={left} y={top-14}>Score / 10</text>
   <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#b9bec3"/>
   <text className="axis-title" x={(left+right)/2} y={height-10} textAnchor="middle">{axis.label}</text>
   {frontier.length>1&&<polyline points={frontier.map(r=>`${x(axis.get(r))},${y(r.score/2)}`).join(' ')} fill="none" stroke="#9aa0a6" strokeWidth="1.5"/>}
   {pts.map(p=>p.leader&&<line key={`l-${p.r.id}`} x1={p.leader.x1} y1={p.leader.y1} x2={p.leader.x2} y2={p.leader.y2} stroke="#b9bec3"/>)}
   {pts.map(p=><g key={p.r.id} className="eval-point" tabIndex="0" role="button" aria-label={`${p.r.label}, ${p.r.harness}. ${fmt.score(p.r.score/2)} of 10. ${axis.label}: ${axis.tick(axis.get(p.r))}`} onMouseEnter={()=>setHover(p.r.id)} onMouseLeave={()=>setHover(null)} onFocus={()=>setHover(p.r.id)} onBlur={()=>setHover(null)} onClick={()=>setHover(p.r.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setHover(p.r.id);}if(e.key==='Escape')setHover(null);}}>
    <circle cx={p.px} cy={p.py} r="16" fill="transparent"/>
    <circle className="data-dot" cx={p.px} cy={p.py} r="5.5" fill={FAMILY_COLORS[familyOf(p.r)]} opacity={onFrontier.has(p.r.id)?1:.45}/>
    <text className={onFrontier.has(p.r.id)?'point-label':'point-label off'} x={p.label.x} y={p.label.y+16}>{p.lines.map((line,i)=><tspan key={line} x={p.label.x} dy={i?lineH:0}>{line}</tspan>)}</text>
   </g>)}
  </svg>{hovered&&<div className="eval-tooltip" role="status"><strong>{hovered.label}</strong><dl>{[['Score',`${fmt.score(hovered.score/2)} / 10`],['Subscription',fmt.money(hovered.sub_usd)],['API-equivalent',fmt.money(hovered.api_usd)],['Tokens',fmt.tokens(totalTokens(hovered))],['Weekly share',fmt.pct(hovered.weekly_share_pct)],['Wall time',fmt.minutes(hovered.wall_min)]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>}</div>
  <div className="agent-legend">{[['anthropic','Anthropic'],['zhipu','Z.ai'],['openai','OpenAI']].map(([k,n])=><span key={k}><i style={{background:FAMILY_COLORS[k]}}/>{n}</span>)}</div>
  <style>{`.model-eval-plot{position:relative;margin-top:18px;min-width:0}.model-eval-plot svg{display:block;width:100%;height:auto;font:14px system-ui,sans-serif;fill:#454545;overflow:visible}.model-eval-plot .axis-title{font-size:15px;fill:#454545}.model-eval-plot .point-label{font-size:15px;fill:#252525}.model-eval-plot .point-label.off{fill:#5f6368}.eval-point{cursor:pointer;outline:none}.eval-point:focus-visible .data-dot{r:8px}.agent-legend{display:flex;flex-wrap:wrap;gap:18px 28px;font-size:17px;margin-top:16px}.agent-legend span{display:flex;align-items:center;gap:9px}.agent-legend i{width:10px;height:10px;border-radius:50%}.eval-tooltip{position:absolute;top:30px;right:8px;width:min(280px,90%);background:white;border:1px solid #ddd;padding:16px;font:16px/1.5 system-ui;color:#252525;pointer-events:none;box-shadow:0 6px 24px #00000012}.eval-tooltip strong{display:block;margin-bottom:10px}.eval-tooltip dl{margin:0}.eval-tooltip dl div{display:flex;justify-content:space-between;gap:20px}.eval-tooltip dd{margin:0}`}</style>
 </section>;
}
