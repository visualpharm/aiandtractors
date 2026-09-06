export const FRONTIER = { scoreMin:55, scoreMax:72, apiMin:1, apiMax:12, subscriptionMin:.03, subscriptionMax:.35 };
export const LAB_COLORS = { Codex:'#171717', 'Claude / Opus':'#db7549', 'Claude / Fable':'#db7549', Antigravity:'#4285f4', Grok:'#25834d', Kimi:'#2563eb' };

function agentLabel(r) {
  const model=r.short.replace(' · $30 plan','').replace('Astra medium','Astra med');
  if(r.group==='Codex') return [`Codex · ${model}`];
  if(r.group.startsWith('Claude /')) return ['Claude Code',model];
  if(r.group==='Antigravity') return ['Antigravity',`${model} high`];
  if(r.group==='Grok') return ['Grok Build',model];
  return ['Kimi CLI · Kimi K3'];
}

function softHull(points) {
  const samples=points.flatMap(p=>Array.from({length:20},(_,i)=>{
    const a=i*Math.PI/10,rx=19+3*Math.cos(a*3),ry=22+3*Math.sin(a*2);
    return [p.x+Math.cos(a)*rx,p.y+Math.sin(a)*ry];
  })).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cross=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
  const half=ps=>{const h=[];for(const p of ps){while(h.length>1&&cross(h.at(-2),h.at(-1),p)<=0)h.pop();h.push(p);}return h;};
  const hull=[...half(samples).slice(0,-1),...half([...samples].reverse()).slice(0,-1)];
  const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
  const start=mid(hull.at(-1),hull[0]);
  return `M ${start.join(' ')} `+hull.map((p,i)=>`Q ${p.join(' ')} ${mid(p,hull[(i+1)%hull.length]).join(' ')}`).join(' ')+' Z';
}

export function frontierRows(models) {
  return models.filter(r => r.score >= FRONTIER.scoreMin && !r.historical && !/composer/i.test(r.short) && r.short !== 'Luna max');
}

export function chartLayout(models, width, adjusted) {
  const height = 620, left = 38, right = width - 20, top = 30, bottom = 565;
  const costMin=adjusted?FRONTIER.subscriptionMin:FRONTIER.apiMin,costMax=adjusted?FRONTIER.subscriptionMax:FRONTIER.apiMax;
  const x = v => left + (v-costMin)/(costMax-costMin)*(right-left);
  const y = v => bottom - (v - FRONTIER.scoreMin) / (FRONTIER.scoreMax - FRONTIER.scoreMin) * (bottom - top);
  const points = frontierRows(models).filter(r => !adjusted || r.price != null).map(r => ({
    row:r, x:Math.min(right,x(adjusted ? r.price : r.api)), y:y(r.score), offscale:adjusted && r.price>costMax,
    lo:r.lo == null ? null : Math.max(left,Math.min(right,x(r.lo))), hi:r.hi == null ? null : Math.min(right,x(r.hi)),hiClipped:r.hi>costMax,
    text:agentLabel(r).join(' · '),lines:adjusted && r.price>costMax?[...agentLabel(r),`$${r.price.toFixed(3)} →`]:agentLabel(r),
  }));
  const overlap = (a,b,pad=4) => Math.max(0,Math.min(a.x+a.w+pad,b.x+b.w)-Math.max(a.x-pad,b.x)) * Math.max(0,Math.min(a.y+a.h+pad,b.y+b.h)-Math.max(a.y-pad,b.y));
  const segmentHitsBox = (a,b,box) => {
    let lo=0,hi=1;
    for(const [start,delta,min,max] of [[a.x,b.x-a.x,box.x,box.x+box.w],[a.y,b.y-a.y,box.y,box.y+box.h]]) {
      if(Math.abs(delta)<.001) {if(start<min||start>max)return false;}
      else {const t1=(min-start)/delta,t2=(max-start)/delta;lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)return false;}
    }
    return true;
  };
  const segmentsCross = (a,b,c,d) => {
    const side=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
    return side(a,b,c)*side(a,b,d)<0 && side(c,d,a)*side(c,d,b)<0;
  };
  const labels=[];
  const leaders=[];
  const ordered=[...points].sort((a,b)=>b.row.score-a.row.score);
  for (const p of ordered) {
    const w=Math.max(...p.lines.map(l=>l.length))*7.8+4, h=p.lines.length*18;
    const candidates=[];
    for(let cy=34;cy<bottom-h;cy+=14) {
      for(let cx=5;cx<width-w-4;cx+=12) candidates.push({x:cx,y:cy,w,h});
    }
    for(const dy of [-24,10,-40,26]) for(const dx of [10,-w-10,-w/2]) candidates.push({x:Math.max(5,Math.min(width-w-5,p.x+dx)),y:Math.max(34,Math.min(bottom-h,p.y+dy)),w,h});
    let best, bestScore=Infinity;
    for(const b of candidates) {
      const nearestX=Math.max(b.x,Math.min(b.x+b.w,p.x)), nearestY=Math.max(b.y,Math.min(b.y+b.h,p.y));
      const end={x:nearestX,y:nearestY};
      let score=Math.hypot(nearestX-p.x,nearestY-p.y) + Math.abs(b.y+h/2-p.y)*.12;
      for(const l of labels) score+=overlap(b,l)*300;
      for(const q of points) score+=overlap(b,{x:q.x-7,y:q.y-7,w:14,h:14},2)*150;
      for(const q of points) if(q!==p&&segmentHitsBox(p,end,{x:q.x-9,y:q.y-9,w:18,h:18}))score+=3000;
      for(const l of labels) if(segmentHitsBox(p,end,l))score+=3000;
      for(const l of leaders) if(segmentHitsBox(l.start,l.end,b))score+=3000;
      for(const l of leaders) if(segmentsCross(p,end,l.start,l.end))score+=6000;
      for(const tick of [55,60,65,70]) score+=overlap(b,{x:0,y:y(tick)-10,w:30,h:20},2)*300;
      if(score<bestScore){best=b;bestScore=score;}
    }
    Object.assign(p,{label:best});labels.push(best);
    leaders.push({start:p,end:{x:Math.max(best.x,Math.min(best.x+best.w,p.x)),y:Math.max(best.y,Math.min(best.y+best.h,p.y))}});
  }
  const groups=[['codex',p=>/^Astra (medium|high|xhigh|max)$/.test(p.row.short)||p.row.short==='Sol max'],['anthropic',p=>p.row.group.startsWith('Claude /')],['gemini',p=>p.row.group==='Antigravity']];
  const clusters=groups.map(([key,include])=>({key,members:points.filter(include)})).filter(c=>c.members.length>1).map(c=>({...c,path:softHull(c.members)}));
  return {width,height,left,right,top,bottom,costMin,costMax,points,clusters,scoreTicks:[55,60,65,70].map(v=>({v,y:y(v)})),costTicks:(adjusted?[.05,.1,.2,.3]:[1,3,6,9,12]).map(v=>({v,x:x(v)}))};
}
