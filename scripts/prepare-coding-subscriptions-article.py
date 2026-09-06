from pathlib import Path
import re, html, json
root=Path(__file__).resolve().parents[1]
source=(root/'public/coding-subscriptions/methodology.md').read_text()
refs = []
def inline(s):
    def link(m):
        title,url=(html.unescape(v) for v in m.groups())
        if url not in [x['url'] for x in refs]: refs.append({'title':title,'url':url})
        return '<a href="'+html.escape(url, quote=True)+'">'+html.escape(title)+'</a>'
    s = html.escape(s)
    s = re.sub(r'\[([^]]+)\]\((https?://[^)]+)\)',link,s)
    return re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)
blocks=[]
for block in source.split('\n\n'):
    if not block.strip() or block.startswith('# '): continue
    if block.startswith('## '):
        heading=block[3:]
        slug=re.sub('[^a-z0-9]+','-',heading.lower()).strip('-')
        blocks.append('<h2 id="'+slug+'">'+inline(heading)+'</h2>')
    elif block.startswith('|'):
        rows=[r.strip('|').split('|') for r in block.splitlines()]
        heads=[s.strip() for s in rows[0]]
        body='<thead><tr>'+''.join('<th scope="col">'+inline(h)+'</th>' for h in heads)+'</tr></thead><tbody>'
        for row in rows[2:]:
            body+='<tr>'+''.join('<td data-label="'+html.escape(h,quote=True)+'">'+inline(s.strip())+'</td>' for h,s in zip(heads,row))+'</tr>'
        blocks.append('<table>'+body+'</tbody></table>')
    elif block.startswith('- '):
        blocks.append('<ul>'+''.join('<li>'+inline(s[2:])+'</li>' for s in block.splitlines())+'</ul>')
    else:
        blocks.append('<p>'+inline(block)+'</p>')
assert all(r['url'].startswith('https://') for r in refs)
(root/'data/coding-subscriptions.json').write_text(json.dumps({'html':'\n'.join(blocks),'references':refs},ensure_ascii=False,indent=2)+'\n')
(root/'public/coding-subscriptions/methodology.md').write_text(source)
print('Prepared article and',len(refs),'source links')
