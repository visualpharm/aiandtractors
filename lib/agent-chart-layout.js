export const FRONTIER = { scoreMin:55, scoreMax:72, costMin:.005, costMax:16 };

export function frontierRows(models) {
  return models.filter(r => r.score >= FRONTIER.scoreMin && !r.historical && !/composer/i.test(r.short));
}

export function chartLayout(models, width, adjusted) {
  const height = 620, left = 38, right = width - 20, top = 30, bottom = 565;
  const x = v => left + Math.log(v / FRONTIER.costMin) / Math.log(FRONTIER.costMax / FRONTIER.costMin) * (right - left);
  const y = v => bottom - (v - FRONTIER.scoreMin) / (FRONTIER.scoreMax - FRONTIER.scoreMin) * (bottom - top);
  const points = frontierRows(models).filter(r => !adjusted || r.price != null).map(r => ({
    row:r, x:x(adjusted ? r.price : r.api), y:y(r.score),
    lo:r.lo == null ? null : x(r.lo), hi:r.hi == null ? null : x(r.hi),
    text:r.short.replace(' · $30 plan',''),
  }));
  const overlap = (a,b,pad=4) => Math.max(0,Math.min(a.x+a.w+pad,b.x+b.w)-Math.max(a.x-pad,b.x)) * Math.max(0,Math.min(a.y+a.h+pad,b.y+b.h)-Math.max(a.y-pad,b.y));
  const labels=[];
  const ordered=[...points].sort((a,b)=>b.row.score-a.row.score);
  for (const p of ordered) {
    const w=p.text.length*7.8+4, h=18;
    const candidates=[];
    for(let cy=34;cy<bottom-h;cy+=14) {
      for(let cx=5;cx<width-w-4;cx+=12) candidates.push({x:cx,y:cy,w,h});
    }
    for(const dy of [-24,10,-40,26]) for(const dx of [10,-w-10,-w/2]) candidates.push({x:Math.max(5,Math.min(width-w-5,p.x+dx)),y:Math.max(34,Math.min(bottom-h,p.y+dy)),w,h});
    let best, bestScore=Infinity;
    for(const b of candidates) {
      const nearestX=Math.max(b.x,Math.min(b.x+b.w,p.x)), nearestY=Math.max(b.y,Math.min(b.y+b.h,p.y));
      let score=Math.hypot(nearestX-p.x,nearestY-p.y) + Math.abs(b.y+h/2-p.y)*.12;
      for(const l of labels) score+=overlap(b,l)*300;
      for(const q of points) score+=overlap(b,{x:q.x-7,y:q.y-7,w:14,h:14},2)*150;
      if(score<bestScore){best=b;bestScore=score;}
    }
    Object.assign(p,{label:best});labels.push(best);
  }
  return {width,height,left,right,top,bottom,points,scoreTicks:[55,60,65,70].map(v=>({v,y:y(v)})),costTicks:[.01,.1,1,10].map(v=>({v,x:x(v)}))};
}
