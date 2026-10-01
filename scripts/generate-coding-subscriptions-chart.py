#!/usr/bin/env python3
"""Deterministic scientific PNG/SVG export from the audited current JSON."""
import json, textwrap
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FixedLocator, FuncFormatter, NullLocator
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/coding-subscriptions'
D=json.loads((OUT/'estimates.json').read_text());ROWS=[r for r in D['models'] if r['chart_visible']]
INK='#252525';ORANGE='#bd5938';BLUE='#315b78'
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':17,'text.color':INK,'axes.labelcolor':INK,'xtick.color':INK,'ytick.color':INK,'svg.fonttype':'none','savefig.facecolor':'white','text.parse_math':False})
def color(r):return ORANGE if r['provider']=='anthropic' else INK if r['provider']=='openai' else BLUE
def money(v):return 'Unknown' if v is None else f'${v:.3f}'
def label(r):
 s=r['label'].replace(' (with fallback)',' + fallback')
 return s.replace('Devin Fusion CLI · Claude Fable 5.1 XHigh + SWE-2 Medium','Devin Fusion · Fable 5.1 xhigh + SWE-2 medium').replace('Devin Fusion CLI · GPT-6 Astra XHigh + SWE-2 Medium','Devin Fusion · GPT-6 Astra xhigh + SWE-2 medium')
def panel(fig,pos,adjusted,phone=False):
 ax=fig.add_axes(pos);ax.set_xscale('log');ax.set_xlim((.03,2) if adjusted else (.07,20));ax.set_ylim(35,72)
 ax.spines[['top','right']].set_visible(False);ax.spines[['left','bottom']].set_color('#aaa')
 ax.yaxis.set_major_locator(FixedLocator([35,40,45,50,55,60,65,70]));ax.grid(axis='y',color='#e3e3e3',lw=.8)
 ax.xaxis.set_major_locator(FixedLocator([.03,.1,.3,1,2] if adjusted else [.1,.3,1,3,10,20]));ax.xaxis.set_major_formatter(FuncFormatter(lambda x,_:f'${x:g}'));ax.xaxis.set_minor_locator(NullLocator());ax.tick_params(length=0,pad=10,labelsize=19 if phone else 17)
 ax.set_title('Estimated subscription scenarios' if adjusted else 'Published API cost',loc='left',fontsize=23,weight='bold',pad=20)
 ax.set_xlabel('USD per benchmark attempt · log scale',fontsize=18 if phone else 17,labelpad=15)
 ax.set_ylabel('Coding Agent Index v1.5 ↑',fontsize=18 if phone else 17,labelpad=12)
 annotations=[]
 for r in ROWS:
  v=r['price'] if adjusted else r['api']
  if v is None:continue
  if adjusted:ax.plot([r['lo'],r['hi']],[r['score']]*2,color=color(r),alpha=.55,lw=2,zorder=2)
  offset = {5:(-14,16),6:(14,-16),9:(-14,10),10:(-25,-15)}.get(r['chart_number'],(0,0)) if not adjusted else (0,0)
  if offset!=(0,0):
   ax.scatter(v,r['score'],s=22,facecolor=color(r),zorder=4)
  annotations.append(ax.annotate(str(r['chart_number']),(v,r['score']),xytext=offset,textcoords='offset points',ha='center',va='center',color=color(r),fontsize=17 if phone else 14,weight='bold',zorder=4,bbox=dict(boxstyle='circle,pad=.2',fc='white',ec=color(r),lw=1.5),arrowprops=dict(arrowstyle='-',color=color(r),lw=.8) if offset!=(0,0) else None))

 if adjusted:ax.text(.06,.07,'9 of 13 configurations: subscription cost unknown',transform=ax.transAxes,fontsize=13 if phone else 16,wrap=True)
 fig.canvas.draw()
 boxes=[a.get_bbox_patch().get_window_extent(fig.canvas.get_renderer()) for a in annotations]
 for i,a in enumerate(boxes):
  for b in boxes[i+1:]:assert not a.overlaps(b), f'Numbered labels overlap: {annotations[i].get_text()} and {annotations[boxes.index(b)].get_text()}'
 return ax
def table(fig,pos,phone=False):
 ax=fig.add_axes(pos);ax.set_xlim(0,1);ax.set_ylim(0,1);ax.axis('off')
 if phone:
  y=.96
  for r in ROWS:
   lines=textwrap.wrap(f"{r['chart_number']:02d}  {label(r)}",width=39)
   ax.text(0,y,'\n'.join(lines),fontsize=21,weight='bold',va='top',color=color(r));y-=.018*len(lines)
   p=money(r['price'])+(' scenario*' if r['price'] is not None else '')
   ax.text(0,y,f"Index {r['score']:.2f} · API {money(r['api'])} · Sub {p}",fontsize=17,va='top');y-=.032
  assert y>0,'Phone legend cropped'
 else:
  ax.text(0,.96,'Configuration · numbered in both plots',fontsize=19,weight='bold')
  for x,t in [(.66,'Index'),(.77,'API / task'),(.90,'Est. sub / task')]:ax.text(x,.96,t,fontsize=18,weight='bold',ha='right' if x==.66 else 'left')
  for i,r in enumerate(ROWS):
   y=.90-i*.064;ax.axhline(y-.028,color='#e6e6e6',lw=.7)
   ax.text(0,y,f"{r['chart_number']:02d}  {label(r)}",fontsize=16,va='center',color=color(r))
   ax.text(.66,y,f"{r['score']:.2f}",fontsize=17,ha='right',va='center')
   ax.text(.77,y,money(r['api']),fontsize=17,va='center');ax.text(.90,y,money(r['price'])+('*' if r['price'] is not None else ''),fontsize=17,va='center')
 return y if phone else 0
def render(phone=False):
 fig=plt.figure(figsize=(8,44) if phone else (20,20),facecolor='white')
 if phone:
  fig.text(.08,.982,'Coding agents:\nAPI vs. subscription costs',fontsize=28,weight='bold',va='top')
  fig.text(.08,.945,'1 October 2026 · AA index v1.5\n13 available default configurations',fontsize=21,va='top')
  panel(fig,[.14,.752,.80,.16],False,True);panel(fig,[.14,.535,.80,.16],True,True)
  end_y=table(fig,[.07,.08,.88,.42],True)
  notes=['*Full-use scenarios; unknown means no adopted quota calibration.','Astra/Fable/Kimi retain September assumptions. These are not current entitlements.','GLM: $80 Pro, all-off-peak; whisker extends to all-peak. Temporary $56 offer excluded.','Using half the assumed usage doubles cost per task. Whiskers are scenarios, not confidence intervals.','Source: artificialanalysis.ai/agents/coding-agents. Method, provider sources and all 31 rows:','aiandtractors.com/coding-agent-subscription-costs/']
  fig.text(.07,.08+.42*(end_y-.03),'\n'.join('\n'.join(textwrap.wrap(s,57)) for s in notes),fontsize=15,va='top',linespacing=1.45)
 else:
  fig.text(.06,.962,'Coding agents: API vs. estimated subscription costs',fontsize=31,weight='bold')
  fig.text(.06,.932,'1 October 2026 · Artificial Analysis Coding Agent Index v1.5 · 13 available default configurations',fontsize=19)
  panel(fig,[.08,.535,.40,.34],False);panel(fig,[.57,.535,.37,.34],True)
  table(fig,[.06,.135,.88,.35])
  notes=['*Full-use scenarios. Unknown = no adopted same-model quota calibration. All 31 configurations are in the source data.','Astra/Fable/Kimi retain September community assumptions, not October entitlements. New models do not inherit old quotas.','GLM: $80 Pro fee, all-off-peak usage; whisker extends to all-peak. The temporary $56 offer is shown separately on the website.','Whiskers are scenarios, not confidence intervals. Using half the assumed monthly usage doubles effective cost per task.','Source: artificialanalysis.ai/agents/coding-agents · Provider sources, calculations and dated assumptions:','aiandtractors.com/coding-agent-subscription-costs/ · One v1.5 snapshot; September scores are archived separately.']
  fig.text(.06,.119,'\n'.join(notes),fontsize=16,va='top',linespacing=1.55)
 name='chart-phone' if phone else 'chart';fig.savefig(OUT/f'{name}.png',dpi=150 if phone else 120,bbox_inches='tight' if phone else None);fig.savefig(OUT/f'{name}.svg',metadata={'Date':D['as_of']},bbox_inches='tight' if phone else None);plt.close(fig)
if __name__=='__main__':
 assert len(ROWS)==13 and sum(r['price'] is not None for r in ROWS)==4
 render();render(True);print('Exported desktop and phone PNG/SVG with labeled log axes and scenario footnotes.')
