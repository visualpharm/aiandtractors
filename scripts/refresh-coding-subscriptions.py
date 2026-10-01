#!/usr/bin/env python3
"""Read a saved public AA Next flight response; never borrow model-only scores."""
import argparse, hashlib, json, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/coding-subscriptions'
AA = 'https://artificialanalysis.ai/agents/coding-agents'

def extract(path):
    html = path.read_text()
    chunks = []
    for m in re.finditer(r'self\.__next_f\.push\((.*?)\)</script>', html):
        try:
            x = json.loads(m[1])
            if len(x)>1 and isinstance(x[1],str): chunks.append(x[1])
        except (ValueError, TypeError): pass
    nodes = {}
    for line in ''.join(chunks).splitlines():
        if ':' not in line: continue
        key, value = line.split(':',1)
        try: nodes[key] = json.loads(value)
        except ValueError: pass
    def resolve(v):
        if isinstance(v,str) and v.startswith('$'):
            parts = v[1:].split(':')
            if parts[0] in nodes:
                z = nodes[parts[0]]
                for p in parts[1:]:
                    z = z[3] if p=='props' and isinstance(z,list) else z[int(p)] if isinstance(z,list) else z[p]
                return resolve(z)
        if isinstance(v,list): return [resolve(x) for x in v]
        if isinstance(v,dict): return {k:resolve(x) for k,x in v.items()}
        return v
    def find(v):
        if isinstance(v,dict):
            if 'benchmarkRows' in v: return resolve(v['benchmarkRows'])
            for x in v.values():
                r = find(x)
                if r is not None: return r
        elif isinstance(v,list):
            for x in v:
                r = find(x)
                if r is not None: return r
    rows = next((r for v in nodes.values() if (r:=find(v)) is not None), None)
    assert rows and len({r['id'] for r in rows}) == len(rows)
    assert 'Coding Agent Index v1.5' in html
    return rows, hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    p = argparse.ArgumentParser();p.add_argument('html',type=Path);p.add_argument('--as-of',required=True)
    args = p.parse_args();rows,digest = extract(args.html)
    archive = OUT/'archive/2026-09-06';archive.mkdir(parents=True,exist_ok=True)
    for f in ['estimates.json','methodology.md','chart.png','chart.svg','chart-phone.png']:
        if not (archive/f).exists(): shutil.copy2(OUT/f,archive/f)
    old = json.loads((archive/'estimates.json').read_text())
    models = []
    for r in rows:
        assert r['indexComponentCount']==3
        assert {e['datasetIndexName'] for e in r['evals']} == {'deep-swe-v1.1','terminal-bench-v4','swe-atlas-qna'}
        score = r['indexScore']*100 if r['indexScore'] is not None else None
        assert score is None or abs(score-sum(e['mean']['reward'] for e in r['evals'])/3*100)<1e-9
        label = r['display']['agent']+' · '+r['display']['model']
        effort = re.search(r"'reasoning_effort': '([^']+)'", r['displayLabel'])
        if effort and '(' not in r['display']['model']: label += ' ('+effort[1]+')'
        m = dict(id=r['id'],short=r['id'],label=label,benchmark_label=r['displayLabel'],
                 harness=r['agentName'],model=r['display']['model'],provider=r['provider'],versions=r['versions'],
                 score=score,api=r['mean'].get('costUsd'),price=None,lo=None,hi=None,
                 benchmark_as_of=args.as_of,benchmark_version='1.5',benchmark_source=AA,
                 default=r['isDefault'],unavailable=r['isUnavailable'],
                 mean_tokens={k:r['mean'].get(k) for k in ['inputTokens','cacheTokens','outputTokens']},
                 reason='No verified same-model subscription capacity calibration; API cost does not establish an included allowance.')
        model = r['display']['model']
        group = ('Codex' if r['agentName']=='Codex' and model.startswith('GPT-') else
                 'Claude / Fable' if r['agentName']=='Claude Code' and model.startswith('Fable 5.1') else
                 'Claude / Opus' if r['agentName']=='Claude Code' and model.startswith('Opus 5 (') else
                 'Kimi' if r['agentName']=='Kimi Code CLI' else
                 'Antigravity' if r['agentName']=='Antigravity SDK' and model.startswith('Gemini 3.8') else None)
        # Retain only already-calibrated model families. New Sol/Luna generations stay null.
        retain = group and not (group=='Codex' and not (model.startswith('GPT-6 Astra') or model.startswith('GPT-5.6')))
        if retain:
            plan = old['plans'][group]
            m.update(group=group,price=m['api']*plan['fee']/plan['base'],lo=m['api']*plan['fee']/plan['high'],hi=m['api']*plan['fee']/plan['low'],
                     scenario_only=True,scenario_as_of='2026-09-04',plan=group,capacity_status='Retained September community proxy; not revalidated October capacity',
                     reason='Retained September scenario only. Model effort, cache mix, pricing and quota accounting may change effective cost.')
        else: m['group']=r['provider']
        if 'GLM-5.3' in model:
            t=m['mean_tokens'];fresh=t['inputTokens']-t['cacheTokens']
            credits=(fresh*6.9+t['cacheTokens']*1.7+t['outputTokens']*24)/10000
            monthly=60000*52/12
            m.update(group='GLM',plan='z.ai Pro standard-price scenario',price=80*credits*.5/monthly,lo=80*credits*.5/monthly,hi=80*credits/monthly,
                     scenario_only=True,scenario_as_of=args.as_of,credits_per_task=credits,monthly_credits=monthly,fee=80,
                     promotional_fee=56,promotional_offpeak_price=56*credits*.5/monthly,
                     range_type='All-off-peak to all-peak schedule scenarios at the $80 standard monthly fee; no statistical interval.',
                     capacity_status='Published credit schedule applied approximately to pooled benchmark token counters',
                     reason='Input includes cached tokens, counted once. Pooled means may have differing telemetry coverage. Full weekly utilization, no MCP use, identical benchmark token mix. The $56 offer and temporary all-day off-peak campaign are not assumed to last a full month.')
        models.append(m)
    models.sort(key=lambda m:m['score'] if m['score'] is not None else -1,reverse=True)
    n=0
    for m in models:
        m['chart_visible']=m['default'] and not m['unavailable'] and m['score'] is not None and m['score']>=50 and m['api'] is not None
        if m['chart_visible']: n+=1;m['chart_number']=n
    sources=[
        (AA,'Artificial Analysis current agent configurations and API costs'),
        ('https://artificialanalysis.ai/methodology/coding-agents-benchmarking','AA index v1.5 methodology and version history'),
        ('https://platform.claude.com/docs/en/about-claude/pricing','Anthropic model API pricing'),
        ('https://claude.com/pricing','Claude subscription tiers and Fable weekly limits'),
        ('https://learn.chatgpt.com/docs/pricing','Codex plans, model credit rates and speed multipliers'),
        ('https://developers.openai.com/api/docs/pricing','OpenAI API model pricing'),
        ('https://docs.z.ai/devpack/overview','z.ai weekly credits, model multipliers and temporary campaign'),
        ('https://docs.z.ai/guides/overview/pricing','z.ai API rates'),
        ('https://zcode.z.ai/en','z.ai advertised standard and promotional plan prices'),
        ('https://docs.x.ai/developers/pricing','Grok API pricing and Fast variant'),
        ('https://x.ai/pricing','SuperGrok plan fees'),
        ('https://www.kimi.com/code/docs/kimi-code/membership.html','Kimi membership and quota accounting'),
        ('https://platform.claude.com/docs/en/models/overview','Current Claude lineup')]
    data=dict(as_of=args.as_of,version=11,benchmark_version='1.5',benchmark_source=AA,
              source_html_sha256=digest,benchmark_records=len(rows),models=models,plans=old['plans'],
              own_usage=old['own_usage'],usage_as_of='2026-09-06',
              method=old['method'],range_type='Scenario ranges, not confidence intervals.',
              archive='/coding-subscriptions/archive/2026-09-06/estimates.json',
              assumptions=['Scores and API costs use one current v1.5 snapshot; no September scores are mixed in.',
               'Each record is a particular harness/model/effort configuration, not model-only intelligence.',
               'September community capacity scenarios are retained only for previously calibrated model families and explicitly dated.',
               'New model generations and new harnesses have null subscription costs.',
               'Full usage allocates the entire fee to one alternative; consuming half the assumed usage doubles cost per task.',
               'No taxes, overages, review labor, infrastructure or other plan benefits are included. Attempts include failures.',
               'GLM credit estimates use pooled mean counters and published credit rules; they are approximate, not a measured benchmark subscription invoice.',
               'Gemini 4 Argon is flagged unavailable by AA and retained only in the full dataset.',
               'July/August Kimi fee and quota scenario is historical; current international fee not independently confirmed.'],
              chart_view=dict(selection='AA available default configurations with score at least 50; all 31 configurations retained in data',available_default_configurations=sum(m['default'] and not m['unavailable'] for m in models),visible_configurations=n,subscription_configurations=sum(m['chart_visible'] and m['price'] is not None for m in models),cost_scale='linear',score_min=50,score_max=72,api_cost_min=1,api_cost_max=16,subscription_cost_min=.03,subscription_cost_max=1.05,provider_shape="Best scored available configuration per provider among configurations with a subscription scenario; same IDs and descending-score order in both panels",rank_scope='Four same-configuration central full-use scenarios; missing prices excluded'),
              sources=[dict(url=u,title=t,checked_at=args.as_of) for u,t in sources])
    (OUT/'aa-agent-snapshot.json').write_text(json.dumps(dict(as_of=args.as_of,source=AA,benchmark_version='1.5',html_sha256=digest,rows=rows),indent=2)+'\n')
    (OUT/'estimates.json').write_text(json.dumps(data,indent=2)+'\n')
    print(f'Validated {len(rows)} current configurations; {n} available default variants; {sum(m["price"] is not None for m in models)} explicit scenarios.')

if __name__=='__main__':main()
