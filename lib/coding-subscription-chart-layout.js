export const FRONTIER = { scoreMin:50, scoreMax:72, apiMin:1, apiMax:16, subscriptionMin:.03, subscriptionMax:1.05 };
export const LAB_COLORS = { openai:'#171717', anthropic:'#db7549', google:'#4285f4', xai:'#25834d', moonshotai:'#2563eb', cognition:'#7561a8', meta:'#1686b0', zai:'#89558f' };
export const LABS = [['openai','OpenAI'],['anthropic','Anthropic'],['cognition','Cognition / Devin'],['xai','xAI / Grok'],['meta','Meta'],['zai','z.ai'],['moonshotai','Kimi']];

function agentLabel(r) {
  if(r.harness.includes('Devin')) return [r.model.includes('Fable')?'Devin / Fable':'Devin / Astra'];
  if(r.provider==='openai') return [r.model.includes('Sol')?'Sol 6.1':'Astra 6'];
  if(r.provider==='zai') return ['GLM 5.3'];
  if(r.provider==='meta') return ['Muse 1.3'];
  return [r.model.replace(/\s*\((?:max|xhigh|high|medium|low|with fallback)\)/g,'').replace(/^Claude /,'')];
}

export function frontierRows(models) {
  return models.filter(r => r.chart_visible && r.score >= FRONTIER.scoreMin && !r.unavailable);
}

export function costComparisons(models) {
  const rows=frontierRows(models).filter(r=>r.price!=null);
  const api=[...rows].sort((a,b)=>a.api-b.api),subscription=[...rows].sort((a,b)=>a.price-b.price);
  return rows.map(r=>({id:r.id,label:r.label,api:r.api,subscription:r.price,ratio:r.api/r.price,apiRank:api.findIndex(x=>x.id===r.id)+1,subscriptionRank:subscription.findIndex(x=>x.id===r.id)+1,rankScope:'Four same-configuration central full-use scenarios; not verified entitlements',scenarioAsOf:r.scenario_as_of}));
}

// Select once from the matched pool, then retain exact configuration IDs in both panels.
// This does not substitute for a provider's overall best result: those remain separately visible.
export function providerShape(models) {
  const available=models.filter(r=>!r.unavailable && r.score>=FRONTIER.scoreMin);
  const best=rows=>[...new Set(rows.map(r=>r.provider))].map(provider=>rows.filter(r=>r.provider===provider).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id))[0]);
  const paired=best(available.filter(r=>r.price!=null)).sort((a,b)=>b.score-a.score||a.provider.localeCompare(b.provider));
  return {rule:'Best scored available configuration per provider among configurations with a subscription scenario',order:paired.map(r=>r.id),paired,overallBest:best(available),overallBestUnknown:best(available).filter(r=>r.price==null)};
}

export function chartLayout(models, width, adjusted, options = {}) {
  const bounds = options.bounds || FRONTIER;
  const scoreValues = options.scoreTicks || [50,55,60,65,70];
  const lineHeight=width<450?24:20;
  const height = 620, left = 38, right = width - 20, top = 30, bottom = 565;
  const costMin=adjusted?bounds.subscriptionMin:bounds.apiMin,costMax=adjusted?bounds.subscriptionMax:bounds.apiMax;
  const x = v => left + (v-costMin)/(costMax-costMin)*(right-left);
  const y = v => bottom - (v - bounds.scoreMin) / (bounds.scoreMax - bounds.scoreMin) * (bottom - top);
  const shape=providerShape(models),anchorIds=new Set(shape.order);
  const lines=r=>{
    const names=agentLabel(r);
    return adjusted?[...names,`$${r.price.toFixed(3)}`]:anchorIds.has(r.id)?[...names,`$${r.api.toFixed(2)}`]:names;
  };
  const points = (options.includeAll ? models : frontierRows(models)).filter(r => !adjusted || r.price != null).map(r => ({
    row:r, anchor:anchorIds.has(r.id), x:Math.min(right,x(adjusted ? r.price : r.api)), y:y(r.score), offscale:adjusted && r.price>costMax,
    scoreLow:r.scoreCI == null ? null : y(r.score-r.scoreCI), scoreHigh:r.scoreCI == null ? null : y(r.score+r.scoreCI),
    lo:r.lo == null ? null : Math.max(left,Math.min(right,x(r.lo))), hi:r.hi == null ? null : Math.min(right,x(r.hi)),hiClipped:r.hi>costMax,
    text:agentLabel(r).join(' · '),lines:lines(r),
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
  if(options.astraLabelColumn) {
    const astra = ['Astra max','Astra xhigh','Astra high','Astra medium','Astra low'].map(name=>points.find(p=>p.row.short===name)).filter(Boolean);
    const column=Math.max(...astra.map(p=>p.x))+10;
    astra.forEach((p,i)=>{
      p.lines=['Codex',p.row.short.replace('medium','med')];
      const b={x:column,y:30+i*40,w:Math.max(...p.lines.map(l=>l.length))*7.8+4,h:p.lines.length*18};
      if(points.some(q=>overlap(b,{x:q.x-7,y:q.y-7,w:14,h:14},2)>0)) b.x=width-b.w-8;
      p.label=b;labels.push(b);
      const end={x:b.x,y:b.y+18};p.leaderEnd=end;
      leaders.push({start:p,end});
    });
  }
  for (const p of ordered) {
    if(p.label) continue;
    const w=Math.max(...p.lines.map(l=>l.length))*7.8+4, h=p.lines.length*lineHeight+6;
    const candidates=[];
    for(let cy=34;cy<bottom-h-16;cy+=14) {
      for(let cx=5;cx<width-w-4;cx+=12) candidates.push({x:cx,y:cy,w,h});
    }
    for(const dy of [-24,10,-40,26]) for(const dx of [10,-w-10,-w/2]) candidates.push({x:Math.max(5,Math.min(width-w-5,p.x+dx)),y:Math.max(34,Math.min(bottom-h-16,p.y+dy)),w,h});
    let best, bestScore=Infinity;
    for(const b of candidates) {
      if(width<450&&Math.abs(b.y+b.h/2-p.y)>150)continue;
      const nearestX=Math.max(b.x,Math.min(b.x+b.w,p.x)), nearestY=Math.max(b.y,Math.min(b.y+b.h,p.y));
      const end={x:nearestX,y:nearestY};
      let score=Math.hypot(nearestX-p.x,nearestY-p.y) + Math.abs(b.y+h/2-p.y)*.12;
      for(const l of labels) score+=overlap(b,l)*300;
      for(const q of points) {
        const radius=q.anchor?12:7;
        score+=overlap(b,{x:q.x-radius,y:q.y-radius,w:radius*2,h:radius*2},2)*150;
      }
      for(const q of points) if(q!==p&&segmentHitsBox(p,end,{x:q.x-9,y:q.y-9,w:18,h:18}))score+=3000;
      for(const l of labels) if(segmentHitsBox(p,end,l))score+=3000;
      for(const l of leaders) if(segmentHitsBox(l.start,l.end,b))score+=3000;
      for(const l of leaders) if(segmentsCross(p,end,l.start,l.end))score+=6000;
      for(const tick of scoreValues) score+=overlap(b,{x:0,y:y(tick)-10,w:30,h:20},2)*300;
      if(score<bestScore){best=b;bestScore=score;}
    }
    Object.assign(p,{label:best});labels.push(best);
    leaders.push({start:p,end:{x:Math.max(best.x,Math.min(best.x+best.w,p.x)),y:Math.max(best.y,Math.min(best.y+best.h,p.y))}});
  }
  const anchors=shape.order.map(id=>points.find(p=>p.row.id===id)).filter(Boolean);
  const shapePath=anchors.length>=3?'M '+anchors.map(p=>`${p.x} ${p.y}`).join(' L ')+' Z':null;
  return {width,height,lineHeight,left,right,top,bottom,costMin,costMax,points,clusters:[],shape:{...shape,anchors,path:shapePath},scoreTicks:scoreValues.map(v=>({v,y:y(v)})),costTicks:(adjusted?(options.subscriptionTicks || [.05,.25,.5,.75,1]):(options.apiTicks || [1,4,8,12,16])).map(v=>({v,x:x(v)}))};
}
