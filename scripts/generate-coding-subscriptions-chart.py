#!/usr/bin/env python3
"""Render reviewed subscription estimates and recorded usage, without mixing them."""
import json
import subprocess
import re
import numpy as np
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.path import Path as MplPath
from matplotlib.patches import PathPatch, Circle
from matplotlib.colors import to_rgba
from matplotlib.ticker import FuncFormatter, NullLocator

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/coding-subscriptions'
DATA = json.loads((OUT / 'estimates.json').read_text())
ROWS = [r for r in DATA['models'] if r['chart_visible'] and r['score'] >= 50 and not r.get('unavailable')]
INK, GRID = '#252525', '#e5e5e5'
COLORS = {'openai':'#171717', 'anthropic':'#db7549', 'google':'#4285f4', 'xai':'#25834d', 'moonshotai':'#2563eb', 'cognition':'#7561a8', 'meta':'#1686b0', 'zai':'#89558f'}
LABS=[('openai','OpenAI'),('anthropic','Anthropic'),('cognition','Cognition / Devin'),('xai','xAI / Grok'),('meta','Meta'),('zai','z.ai'),('moonshotai','Kimi')]
TEXT_BOXES=[]
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':16,'text.color':INK,
    'axes.labelcolor':INK,'xtick.color':INK,'ytick.color':INK,'text.parse_math':False,
    'axes.edgecolor':'#999999','svg.fonttype':'none','savefig.facecolor':'white'})

def money(x):
    return f'${x:.3f}'

def save(fig, name, dpi=160):
    fig.savefig(OUT / f'{name}.png', dpi=dpi)
    if True:
        fig.savefig(OUT / f'{name}.svg', metadata={'Date':DATA['as_of']})
    plt.close(fig)

def tidy(ax):
    for side in ['top','right']:
        ax.spines[side].set_visible(False)
    ax.xaxis.set_minor_locator(NullLocator())
    ax.tick_params(length=0, pad=9)

def draw_panel(ax, adjusted=False, phone=False, options=None, title=None, ylabel='Agent score ↑', xlabel='USD per benchmark attempt'):
    width=350 if phone else 600
    script="import {chartLayout} from './lib/coding-subscription-chart-layout.js'; import fs from 'fs'; const d=JSON.parse(fs.readFileSync(0,'utf8')); console.log(JSON.stringify(chartLayout(d.models,d.width,d.adjusted,d.options)));"
    proc=subprocess.run(['node','--disable-warning=MODULE_TYPELESS_PACKAGE_JSON','--input-type=module','-e',script],input=json.dumps({'models':DATA['models'],'width':width,'adjusted':adjusted,'options':options or {}}),text=True,capture_output=True,cwd=ROOT,check=True)
    layout=json.loads(proc.stdout)
    ax.set_xlim(0,width);ax.set_ylim(620,0);ax.axis('off')
    left,right,top,bottom=[layout[k] for k in ['left','right','top','bottom']]
    scale=ax.get_position().width*ax.figure.get_figwidth()*72/width
    def label(x,y,text,size=15,**kw):
        return ax.text(x,y,text,fontsize=size*scale,va='baseline',**kw)
    title=title or ('Subscription estimates' if adjusted else 'API pricing')
    ax.set_title(title,loc='left',fontsize=(18 if phone else 21)*scale,weight='bold',pad=20)
    gradient=np.zeros((160,160,4))
    coords=np.linspace(0,1,160);t=(coords[None,:]+coords[:,None])/2
    stops=[0,.35,.65,1];colors=np.array([to_rgba(c) for c in ['#4285f4','#34a853','#fbbc05','#ea4335']])
    for channel in range(4):gradient[:,:,channel]=np.interp(t,stops,colors[:,channel])
    for cluster in layout['clusters']:
        parts=re.findall(r'[MQZ]|-?\d+(?:\.\d+)?(?:e[+-]?\d+)?',cluster['path'],re.I)
        vertices=[];codes=[];i=0
        while i<len(parts):
            command=parts[i];i+=1
            if command=='M':vertices.append((float(parts[i]),float(parts[i+1])));codes.append(MplPath.MOVETO);i+=2
            elif command=='Q':
                for _ in range(2):vertices.append((float(parts[i]),float(parts[i+1])));codes.append(MplPath.CURVE3);i+=2
            else:vertices.append(vertices[0]);codes.append(MplPath.CLOSEPOLY)
        key=cluster['key'];color='#171717' if key=='codex' else '#ee9b70'
        patch=PathPatch(MplPath(vertices,codes),facecolor=color if key!='gemini' else 'none',edgecolor=color if key!='gemini' else '#4285f4',alpha=.13 if key=='codex' else .27,lw=1.2*scale,zorder=1)
        ax.add_patch(patch)
        patch.set_clip_path(plt.Rectangle((left,top),right-left,bottom-top,transform=ax.transData))
        if key=='gemini':
            vs=np.array(vertices);xmin=max(left,vs[:,0].min());xmax=min(right,vs[:,0].max());ymin=vs[:,1].min();ymax=vs[:,1].max()
            im=ax.imshow(gradient,extent=[xmin,xmax,ymax,ymin],origin='lower',aspect='auto',alpha=.27,zorder=1)
            im.set_clip_path(patch)
    shape=layout['shape']
    if shape['path']:
        vs=[(p['x'],p['y']) for p in shape['anchors']]
        ax.add_patch(plt.Polygon(vs,closed=True,facecolor='#6262620e',edgecolor='#626262',linewidth=2*scale,zorder=1,joinstyle='round'))
    label(left,16,ylabel)
    for tick in layout['scoreTicks']:
        y=tick['y'];ax.plot([left,right],[y,y],color=GRID,lw=.7,zorder=0);label(left-10,y+5,str(tick['v']),ha='right')
    for tick in layout['costTicks']:
        v=tick['v'];label(tick['x'],bottom+28,f'${v:.2f}' if v<1 else f'${v:g}',ha='center')
    ax.plot([left,right],[bottom,bottom],color='#a9a9a9',lw=.8)
    label((left+right)/2,615,xlabel,ha='center')
    for p in layout['points']:
        c=COLORS[p['row']['provider']];x,y=p['x'],p['y'];b=p['label']
        if p.get('scoreLow') is not None:
            ax.plot([x,x],[p['scoreHigh'],p['scoreLow']],color=c,alpha=.55,lw=1.2*scale,zorder=2)
        endx=p.get('leaderEnd',{}).get('x',max(b['x'],min(b['x']+b['w'],x)));endy=p.get('leaderEnd',{}).get('y',max(b['y'],min(b['y']+b['h'],y)))
        ax.plot([x,endx],[y,endy],color='#626262' if options else '#929292',lw=(1 if options else .8)*scale,zorder=3)
        if p['provisional']:
            ax.fill_between([p['lo'],p['hi']],y-7,y+7,color=c,alpha=.16,zorder=2)
            ax.plot([p['lo'],p['hi']],[y,y],color=c,lw=1.6*scale,ls=(0,(4,3)),zorder=3)
            for bound in [p['lo'],p['hi']]:ax.plot([bound,bound],[y-6,y+6],color=c,lw=scale,zorder=3)
        if p['offscale']:
            ax.plot([right-22,right],[y,y],color=c,lw=2*scale,zorder=4)
            ax.plot([right-7,right,right-7],[y-6,y,y+6],color=c,lw=2*scale,zorder=4)
        elif not p['provisional']:ax.scatter([x],[y],s=((20 if p['anchor'] or p['prominent'] else 7)*scale)**2,facecolor=c,edgecolor='white' if p['anchor'] or p['prominent'] else c,lw=(2 if p['anchor'] or p['prominent'] else 1.2)*scale,zorder=4)
        if p['row']['provider']=='google':
            clip=Circle((x,y),4.5,transform=ax.transData)
            im=ax.imshow(gradient,extent=[x-4.5,x+4.5,y+4.5,y-4.5],origin='lower',aspect='auto',zorder=4);im.set_clip_path(clip)
        point_text=[]
        for i,line in enumerate(p['lines']):
            text=label(b['x'],b['y']+16+i*layout['lineHeight'],line,zorder=5,color='#626262' if i else INK)
            import matplotlib.patheffects as effects
            text.set_path_effects([effects.withStroke(linewidth=4*scale,foreground='white')])
            point_text.append(text)
        TEXT_BOXES.append((ax.figure,ax,p['row']['id'],point_text))


def legend(fig,phone=False):
    fig.legend(handles=[Line2D([0],[0],marker='o',linestyle='',markerfacecolor=COLORS[k],markeredgecolor=COLORS[k],markersize=8,label=n) for k,n in LABS if any(r['provider']==k for r in ROWS)],loc='upper left',bbox_to_anchor=(.08,.877) if phone else (.045,.89),ncol=3 if phone else 7,frameon=False,fontsize=11 if phone else 15,columnspacing=1.2,handletextpad=.5)

def main_chart():
    fig=plt.figure(figsize=(20,13),facecolor='white')
    fig.text(.05,.958,'Coding agents: API → subscriptions',fontsize=29,weight='bold')
    fig.text(.05,.921,'1 October 2026 · Artificial Analysis Coding Agent Index v1.5',fontsize=16)
    legend(fig)
    for adjusted,pos in [(False,[.05,.14,.43,.635]),(True,[.54,.14,.43,.635])]:
        draw_panel(fig.add_axes(pos),adjusted)
    fig.text(.05,.081,'Same four configurations connected · Independent linear USD scales; full use assumed; area is not a metric.',fontsize=14)
    fig.text(.05,.051,'*Sonnet band: n=1 workload · two normalization methods · selected sensitivity, not CI. GLM off-peak; others: Sep proxies. 8 costs unknown.',fontsize=14)
    fig.text(.05,.020,'Sources + full configurations: aiandtractors.com/coding-agent-subscription-costs/',fontsize=13)
    validate_text(fig)
    save(fig,'chart',140)

def phone_chart():
    fig=plt.figure(figsize=(6,21),facecolor='white')
    fig.text(.1,.977,'Coding agents:\nAPI → subscriptions',fontsize=22,weight='bold',va='top',linespacing=1.2)
    fig.text(.1,.905,'1 October 2026 · AA index v1.5',fontsize=13)
    legend(fig,True)
    draw_panel(fig.add_axes([.05,.48,.90,.31]),False,True)
    draw_panel(fig.add_axes([.05,.105,.90,.31]),True,True)
    fig.text(.1,.013,'Same four configurations connected.\nIndependent linear scales; full use assumed.\n*Sonnet: n=1 · two normalization methods.\nSelected sensitivity, not CI; area is not a metric.\nGLM off-peak · others: Sep proxies · 8 costs unknown.\nSources + full configurations:\naiandtractors.com/coding-agent-subscription-costs/',fontsize=12,linespacing=1.35)
    validate_text(fig)
    save(fig,'chart-phone',160)

def validate_text(fig):
    fig.canvas.draw();renderer=fig.canvas.get_renderer()
    for text in fig.texts:
        b=text.get_window_extent(renderer)
        assert b.x0>=0 and b.x1<=fig.bbox.width and b.y0>=0 and b.y1<=fig.bbox.height,('cropped heading',text.get_text())
    for lg in fig.legends:
        b=lg.get_window_extent(renderer)
        assert b.x0>=0 and b.x1<=fig.bbox.width and b.y0>=0 and b.y1<=fig.bbox.height,('cropped legend',b)
        for ax in fig.axes:
            a=ax.title.get_window_extent(renderer) if ax.title.get_text() else ax._left_title.get_window_extent(renderer)
            assert min(a.x1,b.x1)-max(a.x0,b.x0)<1 or min(a.y1,b.y1)-max(a.y0,b.y0)<1,('legend overlaps panel heading')
    for ax in fig.axes:
        rows=[(key,ts) for f,a,key,ts in TEXT_BOXES if f is fig and a is ax]
        boxes=[]
        for key,ts in rows:
            for t in ts:
                b=t.get_window_extent(renderer)
                assert b.x0>=0 and b.x1<=fig.bbox.width and b.y0>=0 and b.y1<=fig.bbox.height,(key,'cropped label',b)
                boxes.append((key,b))
        for i,(ka,a) in enumerate(boxes):
            for kb,b in boxes[i+1:]:
                if True:
                    assert min(a.x1,b.x1)-max(a.x0,b.x0)<1 or min(a.y1,b.y1)-max(a.y0,b.y0)<1,(ka,kb,'overlapping rendered labels')

def cost_difference_report():
    matched=[r for r in ROWS if r['price'] is not None and not r.get('provisional')]
    api=sorted(matched,key=lambda r:r['api']);subscription=sorted(matched,key=lambda r:r['price'])
    def frontier(rows,key):
        return [r['id'] for r in rows if not any(q[key]<=r[key] and q['score']>=r['score'] and (q[key]<r[key] or q['score']>r['score']) for q in rows)]
    report=dict(as_of=DATA['as_of'],benchmark_version=DATA['benchmark_version'],rank_scope='Four non-provisional central scenarios; Sonnet band and unknown prices excluded; ranges may change ordering',rows=[dict(id=r['id'],label=r['label'],score=r['score'],api=r['api'],subscription=r['price'],ratio=r['api']/r['price'],apiRank=api.index(r)+1,subscriptionRank=subscription.index(r)+1,rankScope='Four non-provisional same-configuration scenarios; not verified entitlements',scenarioAsOf=r['scenario_as_of']) for r in matched],frontier_scope='Four non-provisional configurations; Sonnet normalization scenarios separate; not all current models',api_frontier_ids=frontier(matched,'api'),subscription_frontier_ids=frontier(matched,'price'),all_current_frontier_api_ids=frontier(ROWS,'api'))
    overall={}
    for r in DATA['models']:
        if r.get('unavailable') or r['score']<50:continue
        if r['provider'] not in overall or r['score']>overall[r['provider']]['score']:overall[r['provider']]=r
    paired={}
    for r in DATA['models']:
        if r.get('unavailable') or r['score']<50 or r['price'] is None or r.get('provisional'):continue
        if r['provider'] not in paired or r['score']>paired[r['provider']]['score']:paired[r['provider']]=r
    anchors=sorted(paired.values(),key=lambda r:-r['score'])
    report['provider_shape']={'selection_rule':'Best scored available configuration per provider among non-provisional subscription scenarios; Sonnet band is separate','order_rule':'Descending score, fixed across both panels','configuration_ids':[r['id'] for r in anchors],'overall_best_ids':{p:r['id'] for p,r in overall.items()},'overall_best_without_subscription':[r['id'] for r in overall.values() if r['price'] is None],'scale_note':'Independent linear USD scales; area has no quantitative meaning','not_all_provider_bests':True}
    report['provisional_scenarios']=[dict(id=r['id'],label=r['label'],normalization_scenarios=r['normalization_scenarios'],selected_band=[r['lo'],r['hi']],included_in_ranks=False) for r in ROWS if r.get('provisional')]
    (OUT/'cost-differences.json').write_text(json.dumps(report,indent=2)+'\n')

if __name__=='__main__':
    assert len(ROWS)==13 and sum(r['price'] is not None for r in ROWS)==5
    cost_difference_report()
    main_chart();phone_chart()
    for name in ['chart','chart-phone']:
        f=OUT/f'{name}.svg';f.write_text('\n'.join(s.rstrip() for s in f.read_text().splitlines())+'\n')
    print('Rendered 13 directly labeled frontier configurations with linear axes, a paired-provider shape, large coded anchors and explicit independent scales.')
