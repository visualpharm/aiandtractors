#!/usr/bin/env python3
import json, math, re
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/coding-subscriptions'
d=json.loads((OUT/'estimates.json').read_text());s=json.loads((OUT/'aa-agent-snapshot.json').read_text());by={r['id']:r for r in s['rows']}
checks=[]
assert d['as_of']==s['as_of']=='2026-10-01' and d['benchmark_version']==s['benchmark_version']=='1.5'
assert len(by)==len(d['models'])==31
for r in d['models']:
 src=by[r['id']]
 assert r['score']==src['indexScore']*100 and r['api']==src['mean']['costUsd']
 assert abs(r['score']-sum(e['mean']['reward'] for e in src['evals'])/3*100)<1e-9
 if r['price'] is not None:
  assert 0<r['lo']<=r['price']<=r['hi']
  if r['group']=='GLM':
   t=r['mean_tokens'];c=((t['inputTokens']-t['cacheTokens'])*6.9+t['cacheTokens']*1.7+t['outputTokens']*24)/10000
   assert abs(c-r['credits_per_task'])<1e-9
   assert abs(r['price']-80*c*.5/(60000*52/12))<1e-12
   assert abs(r['promotional_offpeak_price']-56*c*.5/(60000*52/12))<1e-12
  else:
   p=d['plans'][r['plan']]
   for field,capacity in [('price','base'),('lo','high'),('hi','low')]:assert math.isclose(r[field],r['api']*p['fee']/p[capacity],rel_tol=1e-12)
 else:assert r['lo'] is None and r['hi'] is None
 if any(m in r['model'] for m in ['GPT-6.1','GPT-6 Sol','GPT-6 Luna','5.5','Grok 4.','Muse','DeepSeek','Qwen']) or 'Devin' in r['harness']:assert r['price'] is None
checks=['31 scores and API costs exactly match source configuration IDs','All scores reproduce equal-weight average of the three v1.5 components','7 modeled configurations reproduce adopted scenario formula; 24 subscription values remain null','13 available default variants; 11 in the 50–72 frontier, with 4 estimates and 7 unknowns','No new generation, third-party harness or unavailable configuration inherits old quota','GLM credit arithmetic, cache subtraction and promotional fee sensitivity reproduce','September snapshot is archived separately; historical personal usage unchanged']
old=json.loads((OUT/'archive/2026-09-06/estimates.json').read_text());assert d['own_usage']==old['own_usage']
assert sum(r['chart_visible'] for r in d['models'])==11
assert sum(r['default'] and not r['unavailable'] for r in d['models'])==13
assert sum(r['chart_visible'] and r['price'] is not None for r in d['models'])==4
frontier=[r for r in d['models'] if r['chart_visible'] and r['score']>=50 and not r.get('unavailable')]
assert d['chart_view']['cost_scale']=='linear' and d['chart_view']['visible_configurations']==11
assert len(frontier)==11 and sum(r['price'] is not None for r in frontier)==4
difference_report=json.loads((OUT/'cost-differences.json').read_text());comparisons=difference_report['rows']
assert len(comparisons)==4 and {r['id'] for r in comparisons}=={r['id'] for r in frontier if r['price'] is not None}
source={r['id']:r for r in frontier}
for r in comparisons:
 assert r['api']==source[r['id']]['api'] and r['subscription']==source[r['id']]['price']
 assert math.isclose(r['ratio'],r['api']/r['subscription'],rel_tol=1e-12)
assert [source[r['id']]['group'] for r in sorted(comparisons,key=lambda r:r['apiRank'])]==['GLM','Kimi','Codex','Claude / Fable']
assert [source[r['id']]['group'] for r in sorted(comparisons,key=lambda r:r['subscriptionRank'])]==['Codex','Claude / Fable','GLM','Kimi']
assert {source[i]['group'] for i in difference_report['api_frontier_ids']}=={'GLM','Codex','Claude / Fable'}
assert {source[i]['group'] for i in difference_report['subscription_frontier_ids']}=={'Codex','Claude / Fable'}
checks.append('Same-configuration API/subscription ratios and four central-scenario ranks reproduce; missing prices excluded')
shape=difference_report['provider_shape'];anchor_ids=shape['configuration_ids']
assert len(anchor_ids)==4 and len({source[i]['provider'] for i in anchor_ids})==4
assert anchor_ids==sorted(anchor_ids,key=lambda i:-source[i]['score'])
for i in anchor_ids:
 r=source[i]
 assert r['price'] is not None
 assert all(q['score']<=r['score'] for q in d['models'] if q['provider']==r['provider'] and not q['unavailable'] and q['price'] is not None)
assert d['chart_view']['subscription_cost_max']==1.05 and all(source[i]['price']<=1.05 for i in anchor_ids)
def cross(a,b,c):return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def crosses(a,b,c,e):return cross(a,b,c)*cross(a,b,e)<0 and cross(c,e,a)*cross(c,e,b)<0
for field in ['api','price']:
 p=[(source[i][field],source[i]['score']) for i in anchor_ids]
 assert not crosses(p[0],p[1],p[2],p[3]) and not crosses(p[1],p[2],p[3],p[0])
assert len(shape['overall_best_without_subscription'])==5
assert all(by[i]['mean']['costUsd'] is not None for i in shape['overall_best_without_subscription'])
checks.append('One top-scoring matched configuration per provider selected once; identical four IDs/order in both panels; no crossings or clipped central anchors; five overall provider bests explicitly unpaired')
images={f:list(Image.open(OUT/f).size) for f in ['chart.png','chart-phone.png']}
for f in images:assert Image.open(OUT/f).verify() is None
page=(ROOT/'pages/coding-agent-subscription-costs.js').read_text()
assert 'GLM 5.3: used, but not yet scored here' not in page and '21 configurations</summary>' not in page
assert not any(x in page for x in ['ridiculously expensive','A worse Astra','worth 3×'])
audit=dict(as_of=d['as_of'],passed=True,checks=checks,images=images,known_limitations=['Community proxies are dated September and not October entitlements','Kimi international fee and quota calibration remain historical','GLM uses pooled token means; precision does not imply exact telemetry coverage','GLM advertised standard pricing conflicts with an older migration example; temporary offer not monthly extrapolated','AA marks Gemini 4 Argon unavailable; no chart position','Scores reflect the current benchmark suite; no cross-version performance trend inferred'])
(OUT/'calculation-audit.json').write_text(json.dumps(audit,indent=2)+'\n');print(json.dumps(audit,indent=2))
