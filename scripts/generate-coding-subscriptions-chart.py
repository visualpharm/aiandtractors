#!/usr/bin/env python3
"""Render reviewed subscription estimates and recorded usage, without mixing them."""
import json
import subprocess
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.ticker import FuncFormatter, NullLocator

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/coding-subscriptions'
DATA = json.loads((OUT / 'estimates.json').read_text())
ROWS = sorted([r for r in DATA['models'] if r['score'] >= 55 and not r.get('historical') and 'composer' not in r['short'].lower()], key=lambda r:r['price'])
GLM = next(r for r in DATA['own_usage'] if r['key']=='glm_family')
INK, GRID = '#252525', '#e5e5e5'
COLORS = {'Codex':'#363636', 'Claude / Opus':'#ac542f', 'Claude / Fable':'#ac542f',
          'Kimi':'#24649b', 'Grok':'#68713c', 'Antigravity':'#936f19', 'GLM historical scenario':'#526775', 'Cursor':'#785190'}
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

def draw_panel(ax, adjusted=False, phone=False):
    width=350 if phone else 600
    script="import {chartLayout} from './lib/agent-chart-layout.js'; import fs from 'fs'; const d=JSON.parse(fs.readFileSync(0,'utf8')); console.log(JSON.stringify(chartLayout(d.models,d.width,d.adjusted)));"
    proc=subprocess.run(['node','--disable-warning=MODULE_TYPELESS_PACKAGE_JSON','--input-type=module','-e',script],input=json.dumps({'models':DATA['models'],'width':width,'adjusted':adjusted}),text=True,capture_output=True,cwd=ROOT,check=True)
    layout=json.loads(proc.stdout)
    ax.set_xscale('log');ax.set_xlim(.005,16);ax.set_ylim(55,72)
    ax.set_yticks([55,60,65,70]);ax.grid(axis='y',color=GRID,zorder=0)
    ax.set_xticks([.01,.1,1,10]);ax.xaxis.set_major_formatter(FuncFormatter(lambda x,p:f'${x:g}'))
    ax.set_xlabel('Dollars per task · log scale',fontsize=17,labelpad=13)
    ax.set_title(('Our adjustment\nSubscriptions' if phone else 'Our adjustment · subscriptions') if adjusted else 'Original · API pricing',loc='left',fontsize=22,weight='bold',pad=34)
    ax.text(0,1.025,'Coding Agent Index ↑',transform=ax.transAxes,fontsize=17)
    tidy(ax)
    font=15*ax.get_position().width*ax.figure.get_figwidth()*72/(layout['right']-layout['left'])
    for p in layout['points']:
        r=p['row'];x,y=r['price'] if adjusted else r['api'],r['score'];c=COLORS[r['group']]
        if adjusted: ax.plot([r['lo'],r['hi']],[y,y],color=c,alpha=.45,lw=1.5,zorder=2)
        ax.scatter([x],[y],s=80,facecolor='white' if r['group']=='Antigravity' else c,edgecolor=c,lw=1.5,zorder=4)
        label=p['label']
        lx=(label['x']-layout['left'])/(layout['right']-layout['left'])
        ly=1-(label['y']+14-layout['top'])/(layout['bottom']-layout['top'])
        ax.annotate(p['text'],(x,y),xytext=(lx,ly),textcoords='axes fraction',fontsize=font,ha='left',va='baseline',zorder=5,
            arrowprops={'arrowstyle':'-','color':'#929292','lw':.8,'shrinkA':2,'shrinkB':6},bbox={'facecolor':'white','edgecolor':'none','pad':.25})

def main_chart():
    fig=plt.figure(figsize=(20,15),facecolor='white')
    fig.text(.06,.96,'Coding agents: the frontier',fontsize=29,weight='bold')
    for adjusted,pos in [(False,[.06,.15,.42,.64]),(True,[.56,.15,.42,.64])]:
        draw_panel(fig.add_axes(pos),adjusted)
    names=[('Codex','Codex'),('Claude / Fable','Claude Code'),('Kimi','Kimi CLI'),('Grok','Grok Build'),('Antigravity','Antigravity')]
    fig.legend(handles=[Line2D([0],[0],marker='o',linestyle='',markerfacecolor='white' if k=='Antigravity' else COLORS[k],markeredgecolor=COLORS[k],markersize=8,label=n) for k,n in names],loc='upper left',bbox_to_anchor=(.05,.915),ncol=5,frameon=False,fontsize=17,columnspacing=2.3,handletextpad=.5)
    fig.text(.06,.072,'55–72 points · Same scores and cost scales · Horizontal lines show estimate ranges',fontsize=20)
    fig.text(.06,.029,'6 September 2026 · Full data and assumptions: aiandtractors.com/coding-agent-subscription-costs',fontsize=18)
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
    fig=plt.figure(figsize=(6,23),facecolor='white')
    fig.text(.1,.977,'Coding agents: the frontier',fontsize=22,weight='bold')
    draw_panel(fig.add_axes([.12,.57,.81,.33]),False,True)
    draw_panel(fig.add_axes([.12,.095,.81,.33]),True,True)
    fig.text(.1,.044,'55–72 points · All dots labeled',fontsize=16)
    fig.text(.1,.018,'Same scores and cost scales',fontsize=16)
    save(fig,'chart-phone',160)

if __name__=='__main__':
    for r in ROWS:
        if r['price'] is None: continue
        p=DATA['plans'][r['group']]
        assert abs(r['price']-r.get('adjustment_api',r['api'])*p['fee']/p['base'])<1e-12
        assert 0<r['lo']<=r['price']<=r['hi']
        assert not r.get('measured'), 'Usage observations are not measured allowances'
    assert len(ROWS)==15 and all(r['price'] is not None for r in ROWS)
    main_chart();phone_chart()
    for f in OUT.glob('*.svg'):
        f.write_text('\n'.join(s.rstrip() for s in f.read_text().splitlines())+'\n')
    print('Rendered15 fully labeled frontier configurations per panel with identical55–72 score axes.')
