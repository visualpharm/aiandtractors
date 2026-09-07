export function paretoFrontier(runs,get) {
  return runs.filter(r=>!runs.some(o=>o!==r && get(o)<=get(r) && o.score>=r.score && (get(o)<get(r)||o.score>r.score)))
    .sort((a,b)=>get(a)-get(b));
}
export function monotoneCubic(points) {
  const pts=points.filter((p,i)=>!i || p.px>points[i-1].px);
  if(pts.length<2)return {path:'',sample:()=>null};
  const h=pts.slice(1).map((p,i)=>p.px-pts[i].px);
  const d=h.map((v,i)=>(pts[i+1].py-pts[i].py)/v);
  const m=[d[0]];
  for(let i=1;i<pts.length-1;i++){
    const w1=2*h[i]+h[i-1],w2=h[i]+2*h[i-1];
    m[i]=d[i-1]*d[i]<=0?0:(w1+w2)/(w1/d[i-1]+w2/d[i]);
  }
  m.push(d[d.length-1]);
  for(let i=0;i<d.length;i++){
    if(!d[i]){m[i]=0;m[i+1]=0;continue;}
    const a=m[i]/d[i],b=m[i+1]/d[i],norm=Math.hypot(a,b);
    if(norm>3){m[i]=3*a*d[i]/norm;m[i+1]=3*b*d[i]/norm;}
  }
  let path=`M ${pts[0].px} ${pts[0].py}`;
  for(let i=0;i<h.length;i++)path+=` C ${pts[i].px+h[i]/3} ${pts[i].py+m[i]*h[i]/3}, ${pts[i+1].px-h[i]/3} ${pts[i+1].py-m[i+1]*h[i]/3}, ${pts[i+1].px} ${pts[i+1].py}`;
  const sample=x=>{
    if(x<pts[0].px||x>pts.at(-1).px)return null;
    let i=0;while(i<h.length-1&&x>pts[i+1].px)i++;
    const t=(x-pts[i].px)/h[i],t2=t*t,t3=t2*t;
    return (2*t3-3*t2+1)*pts[i].py+(t3-2*t2+t)*m[i]*h[i]+(-2*t3+3*t2)*pts[i+1].py+(t3-t2)*m[i+1]*h[i];
  };
  return {path,sample};
}
