import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../lib/feature-eval-math.js',import.meta.url),'utf8');
const {paretoFrontier,monotoneCubic}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const data=JSON.parse(readFileSync(new URL('../public/model-eval/experiment-data.json',import.meta.url)));
test('audited costs reconcile across mixed models and cache durations',()=>{
 for(const r of data.runs){
  let api=0,sub=0;
  for(const [key,c] of Object.entries(r.cost_components)){
   const model=key.split(' · ')[0],p=data.experiment.prices_per_million[model],h1=c.one_hour_cache_write_tokens||0;
   const value=(c.tokens.input*p.input+c.tokens.output*p.output+c.tokens.cache_read*p.cache_read+(c.tokens.cache_write-h1)*(p.cache_write||0)+h1*(p.cache_write_1h||p.input*2))/1e6;
   assert.ok(Math.abs(value-c.api_usd)<1e-6,`${r.id} ${model} token pricing`);
   const plan=data.experiment.allowances[r.plan],capacity=model==='claude-fable-5-1'?plan.fable_monthly_api_equiv_usd:plan.monthly_api_equiv_usd;
   assert.ok(Math.abs(c.sub_usd-value*plan.fee_usd/capacity)<1e-6,`${r.id} ${model} plan allocation`);
   api+=c.api_usd;sub+=c.sub_usd;
  }
  assert.ok(Math.abs(api-r.api_usd)<1e-6);assert.ok(Math.abs(sub-r.sub_usd)<1e-6);
  assert.equal(r.score,r.rubric.reduce((a,b)=>a+b,0));
 }
});
test('frontier handles equal cost and excludes strictly dominated configurations',()=>{
 const rows=[{id:'a',x:1,score:8},{id:'b',x:1,score:9},{id:'c',x:2,score:9},{id:'d',x:3,score:10}];
 assert.deepEqual(paretoFrontier(rows,r=>r.x).map(r=>r.id),['b','d']);
 assert.deepEqual(paretoFrontier(data.runs,r=>r.sub_usd).map(r=>r.id),['codex-astra-low','glm-zcode','glm-claude-code','fable-low']);
});
test('smooth curves pass through every frontier point with no overshoot on all five axes',()=>{
 for(const get of [r=>r.sub_usd,r=>r.api_usd,r=>r.wall_min,r=>r.weekly_share_pct,r=>Object.values(r.tokens).reduce((a,b)=>a+b,0)]){
  const points=paretoFrontier(data.runs,get).map(r=>({px:get(r),py:r.score/2})),c=monotoneCubic(points);
  assert.ok(c.path.includes(' C '));
  for(const p of points)assert.ok(Math.abs(c.sample(p.px)-p.py)<1e-8);
  let prev=-Infinity;
  for(let i=0;i<=1000;i++){const v=c.sample(points[0].px+(points.at(-1).px-points[0].px)*i/1000);if(v===null)continue;assert.ok(Number.isFinite(v));assert.ok(v>=prev-1e-8&&v<=points.at(-1).py+1e-8);prev=v;}
 }
});
