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
ROWS = sorted(DATA['models'], key=lambda r: r['price'])
GLM = next(r for r in DATA['own_usage'] if r['key']=='glm_family')
INK, GRID = '#252525', '#e5e5e5'
COLORS = {'Codex':'#363636', 'Claude / Opus':'#ac542f', 'Claude / Fable':'#ac542f',
          'Kimi':'#24649b', 'Grok':'#68713c', 'Antigravity':'#936f19', 'GLM historical scenario':'#62676b'}
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

def main_chart():
    fig=plt.figure(figsize=(20,25),facecolor='white')
    fig.text(.06,.96,'Coding agent performance and subscription cost',fontsize=29,weight='bold')
    fig.text(.06,.933,'Estimated dollars per benchmark attempt · 6 September 2026',fontsize=18)
    ax=fig.add_axes([.09,.49,.85,.37])
    ax.set_xscale('log');ax.set_xlim(.0048,1.50);ax.set_ylim(34,73)
    ax.set_yticks([35,40,45,50,55,60,65,70]);ax.grid(axis='y',color=GRID,zorder=0)
    ax.set_xticks([.01,.03,.1,.3,1]);ax.xaxis.set_major_formatter(FuncFormatter(lambda x,p:f'${x:.2f}'))
    ax.set_ylabel('Artificial Analysis Coding Agent Index',fontsize=18,labelpad=15)
    ax.set_xlabel('Estimated cost per task · logarithmic scale',fontsize=18,labelpad=12)
    tidy(ax)
    names=[('Codex','Codex · $200'),('Claude / Fable','Claude · $200'),('Kimi','Kimi · $199'),
           ('Grok','Grok · $30'),('Antigravity','Antigravity · $100'),('GLM historical scenario','GLM historical · $80 Pro scenario')]
    ax.legend(handles=[Line2D([0],[0],marker='s' if k=='GLM historical scenario' else ('^' if k=='Antigravity' else 'o'),linestyle='',
       markerfacecolor='white' if k in ['Antigravity','GLM historical scenario'] else COLORS[k],markeredgecolor=COLORS[k],
       markersize=10,label=n) for k,n in names],loc='lower left',bbox_to_anchor=(-.04,1.045),
       ncol=3,frameon=False,fontsize=16,columnspacing=2.5,handletextpad=.5)
    offsets={'Luna max':(9,14),'Astra low':(-12,-14),'Terra max':(-30,5),
       'Astra medium':(-28,-20),'Astra high':(-23,16),'Astra xhigh':(-30,24),
       'Astra max':(13,18),'Sol max':(18,6),'Opus 5 xhigh':(14,12),
       'Fable 5.1 max':(12,20),'Fable 5 max':(15,-17),'Kimi K3':(13,14),
       'Grok 4.5 high · $30 plan':(18,-22),'Gemini 3.7 Flash':(-10,-22),'Gemini 3.8 Flash':(10,-20),
       'GLM 5.1 historical':(15,16),'GLM 5.2 historical':(15,16)}
    for r in ROWS:
        c=COLORS[r['group']];x,y=r['price'],r['score']
        ax.plot([r['lo'],r['hi']],[y,y],color=c,alpha=.5,lw=1.8,zorder=2)
        ax.scatter([x],[y],s=135,marker='s' if r.get('historical') else ('^' if r['group']=='Antigravity' else 'o'),
           facecolor='white' if r.get('historical') or r['group']=='Antigravity' else c,edgecolor=c,lw=1.5,zorder=4)
        dx,dy=offsets[r['short']]
        ax.annotate(r['short'].replace(' · $30 plan',''),(x,y),xytext=(dx,dy),textcoords='offset points',fontsize=16,
           ha='right' if dx<0 else 'left',va='center',zorder=5,
           arrowprops={'arrowstyle':'-','color':'#999999','lw':.7} if abs(dy)>=24 else None)
    fig.text(.06,.418,'Estimated cost per task',fontsize=24,weight='bold')
    fig.text(.06,.397,'Point = central scenario    Line = sensitivity range',fontsize=17)
    bx=fig.add_axes([.255,.105,.33,.26])
    bx.set_xscale('log');bx.set_xlim(.0048,1.3);bx.set_ylim(-.6,len(ROWS)-.4);bx.invert_yaxis()
    bx.set_xticks([.01,.1,1]);bx.xaxis.set_major_formatter(FuncFormatter(lambda x,p:f'${x:.2f}'))
    bx.set_yticks(range(len(ROWS)));bx.set_yticklabels([r['short'].replace(' · $30 plan','') for r in ROWS],fontsize=17)
    bx.grid(axis='x',color=GRID);tidy(bx);bx.spines['left'].set_visible(False)
    for i,r in enumerate(ROWS):
        c=COLORS[r['group']]
        bx.plot([r['lo'],r['hi']],[i,i],color=c,lw=1.7)
        bx.scatter([r['price']],[i],s=70,marker='s' if r.get('historical') else ('^' if r['group']=='Antigravity' else 'o'),
            facecolor='white' if r.get('historical') or r['group']=='Antigravity' else c,edgecolor=c,zorder=3)
        bx.text(1.035,i,money(r['price']),transform=bx.get_yaxis_transform(),va='center',fontsize=17)
    fig.text(.725,.36,'Our usage audit',fontsize=23,weight='bold')
    fig.text(.725,.327,'GLM family · 27 days',fontsize=19)
    fig.text(.725,.292,f"${GLM['api_value_usd']:,.0f} / {GLM['raw_tokens']/1e6:.0f}M tokens",fontsize=23,weight='bold')
    fig.text(.725,.26,f"GLM 5.3 subset: ${GLM['glm53_value_usd']:.0f}",fontsize=18)
    fig.text(.725,.221,'GLM 5.3 score missing',fontsize=19,weight='bold')
    fig.text(.725,.195,'Squares show 5.1 / 5.2',fontsize=18)
    fig.text(.725,.159,'Fable 5.1 allowance',fontsize=19,weight='bold')
    fig.text(.725,.133,'Still a prior-model proxy',fontsize=18)
    fig.text(.06,.063,'GLM squares: historical Claude Code agent results with current Pro quota scenarios.',fontsize=18)
    fig.text(.06,.038,'All costs are estimates. Half the assumed usage doubles cost. Muse Code remains unpriced.',fontsize=18)
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
    height=33
    fig=plt.figure(figsize=(5,height),facecolor='white')
    def text_at(y,s,size=18,weight='normal',x=.08,ha='left'):
        fig.text(x,1-y/height,s,fontsize=size,weight=weight,va='top',ha=ha)
    text_at(.35,'Estimated subscription\ncost per coding task',24,'bold')
    text_at(1.5,'6 September 2026',17)
    for i,r in enumerate(ROWS):
        y=2.2+i*1.3
        text_at(y,r['short'].replace(' · $30 plan',''),18,'bold')
        text_at(y+.38,money(r['price']),21,'bold')
        text_at(y+.78,f"Range {money(r['lo'])}–{money(r['hi'])}",17)
    text_at(25,'Our GLM usage',22,'bold')
    text_at(25.55,f"${GLM['api_value_usd']:.2f} / {GLM['raw_tokens']/1e6:.2f}M tokens",18,'bold')
    text_at(26,'10 Aug–5 Sep · mixed GLM family',17)
    text_at(26.45,f"GLM 5.3 subset: ${GLM['glm53_value_usd']:.2f}",18)
    text_at(27.15,'GLM 5.1 / 5.2 are historical\nagent results with Pro scenarios.',17)
    text_at(28.15,'GLM 5.3: no matched benchmark.\nFable 5.1: older allowance proxy.',17)
    text_at(29.2,'Costs and ranges are scenarios.\nHalf the usage doubles cost.',18)
    text_at(30.35,'Plan fees per month',20,'bold')
    text_at(30.85,'Codex / Claude $200 · Kimi $199\nGrok $30 · Antigravity $100\nGLM historical scenario $80',17)
    save(fig,'chart-phone',160)

if __name__=='__main__':
    for r in ROWS:
        p=DATA['plans'][r['group']]
        assert abs(r['price']-r['api']*p['fee']/p['base'])<1e-12
        assert 0<r['lo']<=r['price']<=r['hi']
        assert not r.get('measured'), 'Usage observations are not measured allowances'
    assert len(ROWS)==17
    main_chart();usage_chart();phone_chart()
    for f in OUT.glob('*.svg'):
        f.write_text('\n'.join(s.rstrip() for s in f.read_text().splitlines())+'\n')
    print('Rendered 17 agent benchmark scenarios, 4 recorded-usage totals, and phone export.')
