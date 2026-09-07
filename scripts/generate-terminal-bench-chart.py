#!/usr/bin/env python3
"""Terminal-Bench 4.0, using published trial costs and explicit plan scenarios."""
import importlib.util
import json
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/terminal-bench-subscriptions'
SOURCE = OUT / 'leaderboard-4.0.json'
SPEC = importlib.util.spec_from_file_location('chart', ROOT / 'scripts/generate-coding-subscriptions-chart.py')
chart = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(chart)
OPTIONS = {'includeAll': True, 'astraLabelColumn': True, 'bounds': {'scoreMin': 10, 'scoreMax': 65, 'apiMin': 4, 'apiMax': 24,
    'subscriptionMin': .05, 'subscriptionMax': 1.1}, 'scoreTicks': [10,20,30,40,50,60],
    'apiTicks': [4,8,12,16,20,24], 'subscriptionTicks': [.1,.3,.5,.7,.9,1.1]}

def build_data():
    source = json.loads(SOURCE.read_text())
    plans = json.loads((ROOT / 'public/coding-subscriptions/estimates.json').read_text())['plans']
    plans = {key: dict(plans[key]) for key in ['Codex', 'Claude / Opus', 'Claude / Fable', 'Grok', 'GLM historical scenario']}
    plans['GLM'] = plans.pop('GLM historical scenario')
    plans['GLM'].update(confidence='Quota scenario; not measured monthly capacity',
        method='Current $80 Pro quota scenario applied to the matched GLM 5.3 / Claude Code result; no historical benchmark score is transferred.')
    models, omitted = [], []
    for row in source['rows']:
        md, metrics = row['metadata'], row['metrics']
        model, harness, effort = md['model_display']['label'], md['agent_display']['label'], md['reasoning_effort']
        reason = None
        if model == 'GPT-5.6 Luna':
            reason = 'Luna omitted at the user’s request.'
        elif harness == 'mini-SWE-agent':
            reason = 'No matched subscription harness. Antigravity subscription economics do not establish mini-SWE-agent performance on that subscription.'
        elif model == 'Sonnet 5':
            reason = 'No established Sonnet-specific subscription allowance in our existing estimates.'
        if reason:
            omitted.append({'source_id': row['id'], 'model': model, 'harness': harness, 'effort': effort, 'reason': reason})
            continue
        short = model.replace('GPT-6 ', '').replace('GPT-5.6 ', '').replace('GLM-', 'GLM ') + ' ' + effort
        group = ('Codex' if harness == 'Codex' else 'Grok' if harness == 'Grok Build' else
                 'GLM' if model.startswith('GLM-') else 'Claude / Fable' if model.startswith('Fable') else 'Claude / Opus')
        plan = plans[group]
        trials = metrics['n_trials']
        assert trials == row['n_trials'] == 330
        assert abs(metrics['successes']/trials*100-metrics['accuracy']) <= .0051
        api = metrics['total_cost_usd'] / trials
        models.append({'source_id': row['id'], 'model': model, 'harness': harness, 'effort': effort,
            'short': short, 'group': group, 'chartLabel': [f'Codex · {short.replace("medium", "med")}'] if group == 'Codex' else [harness, short],
            'score': metrics['accuracy'], 'scoreCI': metrics['accuracy_ci95_half_width'],
            'n_trials': trials, 'successes': metrics['successes'], 'total_cost_usd': metrics['total_cost_usd'],
            'api': api, 'price': api*plan['fee']/plan['base'], 'lo': api*plan['fee']/plan['high'],
            'hi': api*plan['fee']/plan['low'], 'measured': False})
    assert len(models) == 14 and len(omitted) == 4
    return {'as_of': '2026-09-06', 'benchmark': 'Terminal-Bench 4.0', 'dataset_version': '4-0-0',
        'sources': ['https://www.tbench.ai/', 'https://www.tbench.ai/news/terminal-bench-4-0',
            'https://www.tbench.ai/blog/terminal-bench-4-0/rollout-charts.html?chart=costpareto',
            'https://www.harborframework.com/docs/agents/trajectory-format'],
        'score_definition': 'Published resolution rate, percent. 66 tasks, five trials each. Vertical bars: published 95% confidence intervals.',
        'api_definition': 'Published aggregate model cost divided by all 330 attempts, including failed attempts. Not cost per successful solution; no infrastructure charge is added.',
        'subscription_definition': 'API cost per attempt × monthly fee ÷ assumed monthly API-equivalent capacity. Full-use scenario, not an observed bill or guaranteed allowance. Workload and utilization may change the ratio.',
        'range_definition': 'Horizontal bars vary the assumed capacity, with arrows where that sensitivity range exceeds the plot. They are not confidence intervals. Filled regions identify model families only.',
        'transfer_assumptions': ['Reuses the article’s published plan scenarios; Terminal-Bench costs and scores are independently sourced.',
            'Grok 4.6 uses the same $30 family-plan scenario as Grok 4.5; this is an assumption, not a measured model-specific allowance.',
            'GLM 5.3 has an exact model and harness benchmark match; its subscription conversion remains a quota scenario.',
            'Small score differences with overlapping confidence intervals do not establish a quality advantage.'],
        'plans': plans, 'models': models, 'omitted': omitted, 'layout': OPTIONS}

def render(data):
    chart.DATA, chart.OUT = data, OUT
    chart.COLORS['GLM'] = '#5269c4'
    def panel(ax, adjusted, phone=False):
        chart.draw_panel(ax, adjusted, phone, options=OPTIONS,
            title='Our adjustment · subscriptions' if adjusted else 'Original · API pricing',
            ylabel='Tasks resolved (%) ↑', xlabel='Dollars per attempt')
    fig = plt.figure(figsize=(20,13), facecolor='white')
    fig.text(.05,.958,'Terminal-Bench 4.0: coding agents',fontsize=29,weight='bold')
    handles = [Line2D([0],[0],marker='o',linestyle='',color=chart.COLORS[g],markersize=8,label=lab)
        for g,lab in [('Codex','OpenAI'),('Claude / Fable','Anthropic'),('Grok','xAI / Grok'),('GLM','Z.ai / GLM')]]
    handles.append(Line2D([0],[0],marker='|',linestyle='',color='#666666',markersize=17,label='95% score interval'))
    fig.legend(handles=handles,loc='upper left',bbox_to_anchor=(.04,.915),ncol=5,frameon=False,fontsize=17,handletextpad=.5,columnspacing=2)
    for adjusted, pos in [(False,[.05,.045,.43,.75]),(True,[.54,.045,.43,.75])]:
        panel(fig.add_axes(pos),adjusted)
    chart.save(fig,'chart',140)

if __name__ == '__main__':
    data = build_data()
    (OUT / 'estimates.json').write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
    render(data)
    print('Rendered 14 matched agent configurations; retained all 18 source rows and four omission reasons.')
