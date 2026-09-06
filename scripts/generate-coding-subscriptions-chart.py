#!/usr/bin/env python3
"""Render reviewed subscription estimates and recorded usage, without mixing them."""
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.ticker import FuncFormatter, NullLocator

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/coding-subscriptions'
DATA = json.loads((OUT / 'estimates.json').read_text())
ROWS = sorted(DATA['models'], key=lambda r: r['price'] if r['price'] is not None else float('inf'))
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
    ax.set_xscale('log');ax.set_xlim(.005,20);ax.set_ylim(34,74)
    ax.set_yticks([35,45,55,65,70]);ax.grid(axis='y',color=GRID,zorder=0)
    ax.set_xticks([.01,.1,1,10]);ax.xaxis.set_major_formatter(FuncFormatter(lambda x,p:f'${x:g}'))
    ax.set_xlabel('Dollars per task · log scale',fontsize=17,labelpad=13)
    ax.set_title(('Our adjustment\nSubscriptions' if phone else 'Our adjustment · subscriptions') if adjusted else 'Original · API pricing',loc='left',fontsize=22,weight='bold',pad=34)
    ax.text(0,1.025,'Coding Agent Index ↑',transform=ax.transAxes,fontsize=17)
    tidy(ax)
    offsets={'Fable 5.1 max':(-14,18) if not adjusted else (10,18),'Luna max':(10,-18) if adjusted else (-10,14),
        'GLM 5.2 historical':(-10,16) if not adjusted else (12,16),
        'GLM 5.1 historical':(-10,-20), 'Composer 2.5 Fast':(10,18) if not adjusted else (-10,18),
        'Cursor GPT-5.5 medium':(-10,16)}
    for r in ROWS:
        if adjusted and r['price'] is None: continue
        x,y=r['price'] if adjusted else r['api'],r['score'];c=COLORS[r['group']]
        if adjusted: ax.plot([r['lo'],r['hi']],[y,y],color=c,alpha=.45,lw=1.5,zorder=2)
        marker='s' if r.get('historical') else ('D' if r['group']=='Cursor' else 'o')
        ax.scatter([x],[y],s=80,marker=marker,facecolor='white' if r.get('historical') or r['group']=='Antigravity' else c,edgecolor=c,lw=1.5,zorder=4)
        if r['short'] in offsets:
            dx,dy=offsets[r['short']]
            label=r['short'].replace(' historical','').replace('Cursor GPT-5.5 medium','Cursor GPT-5.5')
            if phone and r['short']=='Composer 2.5 Fast': label='Composer Fast';dx=8
            if phone and r['short']=='Fable 5.1 max' and adjusted: dx=-6
            ax.annotate(label,(x,y),xytext=(dx,dy),textcoords='offset points',fontsize=16 if phone else 17,ha='right' if dx<0 else 'left',va='center',zorder=5,
                bbox={'facecolor':'white','edgecolor':'none','pad':.4})

def main_chart():
    fig=plt.figure(figsize=(20,12),facecolor='white')
    fig.text(.06,.95,'Coding agents: API prices vs subscription costs',fontsize=29,weight='bold')
    for adjusted,pos in [(False,[.06,.29,.42,.47]),(True,[.56,.29,.42,.47])]:
        draw_panel(fig.add_axes(pos),adjusted)
    names=[('Codex','Codex'),('Claude / Fable','Claude Code'),('Kimi','Kimi CLI'),('Grok','Grok Build'),('Antigravity','Antigravity'),('GLM historical scenario','GLM 5.1 / 5.2'),('Cursor','Cursor CLI')]
    fig.legend(handles=[Line2D([0],[0],marker='s' if k=='GLM historical scenario' else ('D' if k=='Cursor' else 'o'),linestyle='',markerfacecolor='white' if k in ['Antigravity','GLM historical scenario'] else COLORS[k],markeredgecolor=COLORS[k],markersize=8,label=n) for k,n in names],loc='upper left',bbox_to_anchor=(.05,.895),ncol=7,frameon=False,fontsize=16,columnspacing=1.4,handletextpad=.3)
    fig.text(.06,.185,'Cursor Pro $20: Composer 2.5 Fast ≈ $0.066/task, a conditional quota estimate.',fontsize=19)
    fig.text(.06,.13,'GLM 5.3: 233.75M recorded tokens. No published Coding Agent Index result in the checked dataset.',fontsize=19)
    fig.text(.06,.075,'6 September 2026 · Same scores and axes. Ranges are estimates; GLM squares are historical scenarios.',fontsize=18)
    fig.text(.06,.033,'Three Cursor configurations have API results only. Full values and assumptions: aiandtractors.com/coding-agent-subscription-costs',fontsize=17)
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
    fig=plt.figure(figsize=(6,13),facecolor='white')
    fig.text(.1,.97,'Coding agent costs',fontsize=24,weight='bold')
    draw_panel(fig.add_axes([.12,.59,.81,.27]),False,True)
    draw_panel(fig.add_axes([.12,.16,.81,.27]),True,True)
    fig.text(.1,.064,'GLM squares: historical 5.1 / 5.2',fontsize=16)
    fig.text(.1,.029,'Cursor diamonds: CLI benchmark',fontsize=16)
    save(fig,'chart-phone',160)

if __name__=='__main__':
    for r in ROWS:
        if r['price'] is None: continue
        p=DATA['plans'][r['group']]
        assert abs(r['price']-r.get('adjustment_api',r['api'])*p['fee']/p['base'])<1e-12
        assert 0<r['lo']<=r['price']<=r['hi']
        assert not r.get('measured'), 'Usage observations are not measured allowances'
    assert len(ROWS)==21 and sum(r['price'] is not None for r in ROWS)==18
    main_chart();usage_chart();phone_chart()
    for f in OUT.glob('*.svg'):
        f.write_text('\n'.join(s.rstrip() for s in f.read_text().splitlines())+'\n')
    print('Rendered original21 and adjusted18 configurations with identical axes; retained four recorded-usage totals.')
