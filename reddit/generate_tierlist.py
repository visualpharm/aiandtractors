#!/usr/bin/env python3
"""Passport tier-list, grouped. Top tiers: bracket UNDER the flags (facing up).
Bottom two tiers: label to the RIGHT of the flags.

Style brief (Ivan, Jun 2026):
 - Flags sharing the same biggest missing door are tied together. For the top
   three tiers the tie is a horizontal square bracket UNDER the flags, ticks
   pointing UP (└──── label ────┘), label centred on the line. No score.
 - The LAST TWO tiers keep the label to the RIGHT of the flag row (no bracket).
 - EU collapsed into ONE flag in the top line + note
   "EU = all of Europe except Romania & Bulgaria".
 - Argentina + Brazil sit in "Strong, missing big doors" (miss only the US).
 - Regional comfort misses USA AND China -> "✗ USA ✗ China" (two crosses).
 - Lower tiers broad + cheeky: ✗ anywhere rich / ✓ a couple neighbors + seashells.
 - No arrow. No politics in labels. Argentina = three stars, no sun.
"""
import math, pathlib

HERE = pathlib.Path(__file__).resolve().parent

ISO = {
    "Japan": "jp", "South Korea": "kr", "Singapore": "sg", "United Kingdom": "gb",
    "Canada": "ca", "Australia": "au", "United States": "us",
    "United Arab Emirates": "ae", "Hong Kong": "hk", "Malaysia": "my",
    "Romania": "ro", "Bulgaria": "bg", "Argentina": "ar", "Brazil": "br",
    "Mexico": "mx", "Colombia": "co", "China": "cn", "India": "in",
    "Turkey": "tr", "Pakistan": "pk", "Nigeria": "ng", "Afghanistan": "af",
}
ORANGE, GREEN = "#ff9e80", "#7fe0a0"
X = f'<span style="color:{ORANGE}">&#10007;</span>'  # orange cross, reusable

# (name, color, bracket?, [groups]); group = (symbol, label_html, color, [countries])
TIERS = [
    ("Almost world pass", "#f98a8a", True, [
        ("&#10007;", "Cuba", ORANGE, ["Japan", "South Korea"]),
        ("&#10007;", "India", ORANGE,
         ["Singapore", "United Kingdom", "Canada", "Australia", "__EU__"])]),
    ("Strong, missing big doors", "#ffd86b", True, [
        ("&#10007;", "China", ORANGE, ["United States"]),
        ("&#10007;", "USA", ORANGE,
         ["United Arab Emirates", "Hong Kong", "Malaysia", "Romania", "Bulgaria",
          "Argentina", "Brazil"])]),
    ("Regional comfort", "#cfe06a", True, [
        ("&#10007;", f"USA &nbsp;{X} China", ORANGE, ["Mexico", "Colombia"])]),
    ("Lots of paperwork", "#8fdd8a", False, [
        ("&#10007;", "anywhere rich", ORANGE, ["China", "India", "Turkey"])]),
    ("Border officer side quest", "#6cc6e0", False, [
        ("&#10003;", "a couple neighbors + some seashells", GREEN,
         ["Pakistan", "Nigeria", "Afghanistan"])]),
]


def star_points(cx, cy, r_out, r_in, n=5, rot=-90):
    return " ".join(
        f"{cx + (r_out if i%2==0 else r_in)*math.cos(math.radians(rot+i*180.0/n)):.2f},"
        f"{cy + (r_out if i%2==0 else r_in)*math.sin(math.radians(rot+i*180.0/n)):.2f}"
        for i in range(n * 2))


def argentina_svg():
    stars = "".join(
        f'<polygon points="{star_points(x, 30, 6.0, 2.5)}" fill="#f6b40e" '
        f'stroke="#caa20a" stroke-width="0.5"/>' for x in (28, 45, 62))
    return ('<svg class="flagimg" viewBox="0 0 90 60" preserveAspectRatio="none">'
            '<rect width="90" height="60" fill="#fff"/>'
            '<rect width="90" height="20" y="0"  fill="#74acdf"/>'
            '<rect width="90" height="20" y="40" fill="#74acdf"/>'
            f'{stars}</svg>')


def flagimg(iso):
    return argentina_svg() if iso == "ar" else \
        f'<img class="flagimg" src="flags/{iso}.png" alt="">'


NOTE = ('<div class="note"><b>EU</b> = all of Europe<br>'
        'except Romania &amp; Bulgaria</div>')


def group_html(sym, label, col, countries, bracket):
    cells, note = [], ""
    for c in countries:
        if c == "__EU__":
            cells.append(f'<div class="unit">{flagimg("eu")}</div>')
            note = NOTE
        else:
            cells.append(f'<div class="unit">{flagimg(ISO[c])}</div>')
    inner = f'<span style="color:{col}">{sym}</span> {label}'
    flagrow = f'<div class="flagrow">{"".join(cells)}</div>'
    if bracket:
        g = (f'<div class="group">{flagrow}'
             f'<div class="bracket"><div class="glabel">{inner}</div></div></div>')
    else:
        g = (f'<div class="group gright">{flagrow}'
             f'<div class="glabel gr">{inner}</div></div>')
    return g + note


rows = []
for name, color, bracket, groups in TIERS:
    gs = "".join(group_html(*g, bracket) for g in groups)
    cls = "" if bracket else " center"
    rows.append(f'<div class="row"><div class="label" style="background:{color}">'
                f'{name}</div><div class="flags{cls}">{gs}</div></div>')

html = f'''<!doctype html>
<html><head><meta charset="utf-8">
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  body {{ width:2240px; background:#0b0b0d; overflow:hidden;
          font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }}
  .wrap {{ padding:30px 38px 24px; }}
  .head {{ margin:0 4px 16px; }}
  .head h1 {{ color:#fff; font-size:42px; font-weight:800; letter-spacing:-0.6px; }}
  .head .sub {{ color:#9da3b2; font-size:20px; font-weight:500; margin-top:8px; }}
  .head .sub b {{ color:#ff9e80; }}
  .rows {{ display:flex; flex-direction:column; }}
  .row {{ display:flex; align-items:stretch; min-height:166px;
          border-bottom:2px solid #0b0b0d; }}
  .label {{ width:300px; flex:none; display:flex; align-items:center;
            justify-content:center; text-align:center; color:#1b1b22;
            font-size:29px; font-weight:600; letter-spacing:-0.2px; padding:8px 16px; }}
  .flags {{ flex:1; display:flex; align-items:flex-start; flex-wrap:nowrap;
            gap:46px; padding:18px 24px 6px; background:#0b0b0d; }}
  .flags.center {{ align-items:center; padding:10px 24px; }}
  .group {{ flex:none; display:flex; flex-direction:column; align-items:stretch; }}
  .group.gright {{ flex-direction:row; align-items:center; gap:14px; }}
  .flagrow {{ display:flex; gap:16px; }}
  .unit {{ flex:none; }}
  .flagimg {{ display:block; width:132px; height:88px; border:1px solid #d8d8d8;
              object-fit:cover; }}
  /* bracket facing UP: bottom + side borders, ticks point up toward the flags */
  .bracket {{ position:relative; height:18px; margin-top:14px;
              border:3px solid #888e9c; border-top:none; }}
  .glabel {{ position:absolute; top:100%; left:50%; transform:translate(-50%,-50%);
             background:#0b0b0d; padding:0 16px; white-space:nowrap;
             font-size:30px; font-weight:700; letter-spacing:-0.3px; color:#e7ebf3; }}
  .glabel.gr {{ position:static; transform:none; background:none; padding:0;
                margin-left:6px; }}
  .note {{ flex:none; align-self:flex-start; margin-top:20px; color:#cfd3dd;
           font-size:21px; font-weight:500; line-height:1.3; white-space:nowrap; }}
  .note b {{ color:#fff; }}
  .foot {{ margin:18px 4px 0; font-size:22px; color:#7d8294; font-weight:500; }}
  .foot span {{ color:#ffd86b; }}
</style></head>
<body>
  <div class="wrap">
    <div class="head">
      <h1>Passport tier list</h1>
      <div class="sub"><b>&#10007;</b> = the biggest destination this passport still can&rsquo;t walk into visa-free</div>
    </div>
    <div class="rows">
{chr(10).join(rows)}
    </div>
    <div class="foot">rank yours &rarr; <span>aiandtractors.com/passport-ranking</span></div>
  </div>
</body></html>'''

(HERE / "tierlist.html").write_text(html)
print("wrote", HERE / "tierlist.html")
