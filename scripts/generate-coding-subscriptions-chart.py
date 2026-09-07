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
ROWS = sorted([r for r in DATA['models'] if r['score'] >= 55 and not r.get('historical') and 'composer' not in r['short'].lower() and r['short'] != 'Luna max'], key=lambda r:r['price'])
GLM = next(r for r in DATA['own_usage'] if r['key']=='glm_family')
INK, GRID = '#252525', '#e5e5e5'
COLORS = {'Codex':'#171717', 'Claude / Opus':'#db7549', 'Claude / Fable':'#db7549',
          'Kimi':'#2563eb', 'Grok':'#25834d', 'Antigravity':'#4285f4'}
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':16,'text.color':INK,
    'axes.labelcolor':INK,'xtick.color':INK,'ytick.color':INK,'text.parse_math':False,
    'axes.edgecolor':'#999999','svg.fonttype':'none','savefig.facecolor':'white'})

def money(x):
    return f'${x:.3f}'

def save(fig, name, dpi=160):
    fig.savefig(OUT / f'{name}.png', dpi=dpi)
    if name != 'chart-phone':
        fig.savefig(OUT / f'{name}.svg', metadata={'Date':DATA['as_of']})
    plt.close(fig)

def tidy(ax):
    for side in ['top','right']:
        ax.spines[side].set_visible(False)
    ax.xaxis.set_minor_locator(NullLocator())
    ax.tick_params(length=0, pad=9)

def draw_panel(ax, adjusted=False, phone=False, options=None, title=None, ylabel='Coding Agent Index ↑', xlabel='Dollars per task'):
    width=350 if phone else 600
    script="import {chartLayout} from './lib/agent-chart-layout.js'; import fs from 'fs'; const d=JSON.parse(fs.readFileSync(0,'utf8')); console.log(JSON.stringify(chartLayout(d.models,d.width,d.adjusted,d.options)));"
    proc=subprocess.run(['node','--disable-warning=MODULE_TYPELESS_PACKAGE_JSON','--input-type=module','-e',script],input=json.dumps({'models':DATA['models'],'width':width,'adjusted':adjusted,'options':options or {}}),text=True,capture_output=True,cwd=ROOT,check=True)
    layout=json.loads(proc.stdout)
    ax.set_xlim(0,width);ax.set_ylim(620,0);ax.axis('off')
    left,right,top,bottom=[layout[k] for k in ['left','right','top','bottom']]
    scale=ax.get_position().width*ax.figure.get_figwidth()*72/width
    def label(x,y,text,size=15,**kw):
        return ax.text(x,y,text,fontsize=size*scale,va='baseline',**kw)
    title=title or ('Our adjustment · subscriptions' if adjusted else 'Original · API pricing')
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
    label(left,16,ylabel)
    for tick in layout['scoreTicks']:
        y=tick['y'];ax.plot([left,right],[y,y],color=GRID,lw=.7,zorder=0);label(left-10,y+5,str(tick['v']),ha='right')
    for tick in layout['costTicks']:
        v=tick['v'];label(tick['x'],bottom+28,f'${v:.2f}' if v<1 else f'${v:g}',ha='center')
    ax.plot([left,right],[bottom,bottom],color='#a9a9a9',lw=.8)
    label((left+right)/2,615,xlabel,ha='center')
    for p in layout['points']:
        c=COLORS[p['row']['group']];x,y=p['x'],p['y'];b=p['label']
        if p.get('scoreLow') is not None:
            ax.plot([x,x],[p['scoreHigh'],p['scoreLow']],color=c,alpha=.55,lw=1.2*scale,zorder=2)
        if adjusted and not p['offscale']:
            ax.plot([p['lo'],p['hi']],[y,y],color=c,alpha=.45,lw=1.5*scale,zorder=2)
            if p['hiClipped']:ax.plot([right-5,right,right-5],[y-4,y,y+4],color=c,lw=scale,zorder=2)
        endx=p.get('leaderEnd',{}).get('x',max(b['x'],min(b['x']+b['w'],x)));endy=p.get('leaderEnd',{}).get('y',max(b['y'],min(b['y']+b['h'],y)))
        ax.plot([x,endx],[y,endy],color='#626262' if options else '#929292',lw=(1 if options else .8)*scale,zorder=3)
        if p['offscale']:
            ax.plot([right-22,right],[y,y],color=c,lw=2*scale,zorder=4)
            ax.plot([right-7,right,right-7],[y-6,y,y+6],color=c,lw=2*scale,zorder=4)
        else:ax.scatter([x],[y],s=((6 if options else 8)*scale)**2,facecolor=c,edgecolor=c,lw=1.2*scale,zorder=4)
        if p['row']['group']=='Antigravity':
            clip=Circle((x,y),4.5,transform=ax.transData)
            im=ax.imshow(gradient,extent=[x-4.5,x+4.5,y+4.5,y-4.5],origin='lower',aspect='auto',zorder=4);im.set_clip_path(clip)
        for i,line in enumerate(p['lines']):
            text=label(b['x'],b['y']+14+i*18,line,zorder=5)
            import matplotlib.patheffects as effects
            text.set_path_effects([effects.withStroke(linewidth=4*scale,foreground='white')])

def main_chart():
    fig=plt.figure(figsize=(20,13),facecolor='white')
    fig.text(.05,.958,'Coding agents: the frontier',fontsize=29,weight='bold')
    for adjusted,pos in [(False,[.05,.045,.43,.75]),(True,[.54,.045,.43,.75])]:
        draw_panel(fig.add_axes(pos),adjusted)
    names=[('Codex','OpenAI'),('Claude / Fable','Anthropic'),('Antigravity','Google Gemini'),('Grok','xAI / Grok'),('Kimi','Kimi')]
    fig.legend(handles=[Line2D([0],[0],marker='o',linestyle='',markerfacecolor=COLORS[k],markeredgecolor=COLORS[k],markersize=8,label=n) for k,n in names],loc='upper left',bbox_to_anchor=(.04,.915),ncol=5,frameon=False,fontsize=17,columnspacing=2.3,handletextpad=.5)
    save(fig,'chart',140)

def usage_chart():
    fig=plt.figure(figsize=(14,9.5),facecolor='white')
    fig.text(.07,.93,'Our recorded AI usage',fontsize=28,weight='bold')
    fig.text(.07,.879,'API-equivalent dollars · recorded totals, not subscription allowances',fontsize=17)
    for r,pos in zip(DATA['own_usage'],[.73,.55,.37,.19]):
        fig.text(.07,pos,r['label'],fontsize=20,weight='bold')
        fig.text(.07,pos-.041,r['period_label'],fontsize=17)
        fig.text(.07,pos-.079,r['scope_label'],fontsize=16)
        fig.text(.93,pos,f"${r['api_value_usd']:,.2f}",ha='right',fontsize=24,weight='bold')
        a=fig.add_axes([.47,pos-.079,.46,.022])
        a.barh([0],[r['api_value_usd']],height=.7,color='#326b97')
        a.set_xlim(0,20000);a.set_ylim(-.5,.5);a.axis('off')
        if r['key']=='glm_family':
            fig.text(.47,pos-.039,f"GLM 5.3 alone: ${GLM['glm53_value_usd']:.2f} / {GLM['glm53_raw_tokens']/1e6:.2f}M tokens",fontsize=15)
    save(fig,'usage',160)

    fig=plt.figure(figsize=(5,14.5),facecolor='white')
    def label(y,s,size=17,weight='normal'):
        fig.text(.08,1-y/14.5,s,fontsize=size,weight=weight,va='top')
    label(.4,'Our recorded\nAI usage',25,'bold')
    label(1.55,'API-equivalent dollars\nRecorded totals, not allowances')
    for r,y in zip(DATA['own_usage'],[2.8,5.4,8,10.6]):
        label(y,r['label'],18,'bold')
        label(y+.4,f"${r['api_value_usd']:,.2f}",24,'bold')
        period=r['period_label'].replace(' · UTC','').replace('10 August–5 September 2026','10 Aug–5 Sep 2026')
        label(y+.95,period)
        scope=r['scope_label'].replace(' · ','\n')
        label(y+1.4,scope)
    label(13.5,f"GLM 5.3 subset: ${GLM['glm53_value_usd']:.2f}")
    save(fig,'usage-phone',160)

def phone_chart():
    fig=plt.figure(figsize=(6,21),facecolor='white')
    fig.text(.1,.977,'Coding agents: the frontier',fontsize=22,weight='bold')
    draw_panel(fig.add_axes([.05,.55,.90,.37]),False,True)
    draw_panel(fig.add_axes([.05,.05,.90,.37]),True,True)
    save(fig,'chart-phone',160)

if __name__=='__main__':
    for r in ROWS:
        if r['price'] is None: continue
        p=DATA['plans'][r['group']]
        assert abs(r['price']-r.get('adjustment_api',r['api'])*p['fee']/p['base'])<1e-12
        assert 0<r['lo']<=r['price']<=r['hi']
        assert not r.get('measured'), 'Usage observations are not measured allowances'
    assert len(ROWS)==14 and all(r['price'] is not None for r in ROWS)
    main_chart();phone_chart()
    for f in OUT.glob('*.svg'):
        f.write_text('\n'.join(s.rstrip() for s in f.read_text().splitlines())+'\n')
    print('Rendered 14 harness-labeled agents, Kimi arrow in the subscription panel, linear axes and three family regions per panel.')
