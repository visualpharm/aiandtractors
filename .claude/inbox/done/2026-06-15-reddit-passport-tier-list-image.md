---
intent: task-capture
project: aiandtractors
created: 2026-06-15T10:05:00-03:00
status: pending
priority: P1
branch: main
preview: http://127.0.0.1:8791/tierlist.html (run server manually, see below)
commits: []
---

## ⏳ OPEN — do these

- **P1 — Build the world map (agreed next step).** A foreign/world map titled
  **"Which countries they can enter visa-free"**, each passport-country shaded in
  its TIER color (same pastels as the list), legend = the same door labels
  (Cuba / India / China / USA / USA+China / anywhere rich / a couple neighbors +
  some seashells). Ivan's words: colored countries + write the missing-door on
  the map. Repo already has share-map tooling — see `pages/passport-insights.js`,
  `/passport-insights/maps`, and the git history "Add shareable-maps page". Reuse
  that map renderer; feed it the tier→country→color mapping from
  `reddit/generate_tierlist.py` (the TIERS list).
- **P2 — Possible polish on v4 (only if Ivan asks):** long broad labels are now
  to the RIGHT of the flags (no overflow), so the earlier "widen bracket" question
  is MOOT. Nothing owed unless he reacts.

## ✅ DONE this session
- Iterated the Reddit passport tier-list IMAGE in `reddit/` (NOT a web page).
  Generator: `reddit/generate_tierlist.py` → writes `reddit/tierlist.html` →
  screenshot+crop → `reddit/passport-tierlist.png`.
- **v4 (current, delivered):** `reddit/passport-tierlist.png` (1405×827).
  - No score; flags only + a single missing-door label per GROUP.
  - Top 3 tiers: door label UNDER the flags inside a horizontal square bracket
    that FACES UP (└── label ──┘), label centred on the line.
  - Bottom 2 tiers: door label to the RIGHT of the flag row (no bracket).
  - Tiers (clustered by real visa data, original names): Almost world pass
    (Japan/Korea ✗Cuba; Singapore/UK/Canada/Australia/EU ✗India, + note
    "EU = all of Europe except Romania & Bulgaria"); Strong, missing big doors
    (US ✗China; UAE/HK/Malaysia/Romania/Bulgaria/Argentina/Brazil ✗USA);
    Regional comfort (Mexico/Colombia ✗ USA ✗ China — two crosses);
    Lots of paperwork (China/India/Turkey ✗ anywhere rich);
    Border officer side quest (Pakistan/Nigeria/Afghanistan ✓ a couple neighbors
    + some seashells).
  - Argentina flag = 3 stars (3 World Cups), no sun. No arrow. No politics
    (Ukraine/Russia/Israel/Palestine excluded from flags AND from labels).
- **Versioning ON (Ivan's request):** every cut saved under `reddit/versions/`:
  v1-noscore-broad, v2-grouped-labels, v3-brackets (ticks down), v4-brackets-up.
  `reddit/passport-tierlist.png` = the latest pointer.
- Data audit that drove placements: `data/calculated-passport-scores.json`
  (`misses` = top visa-required destination by tourism) + `reddit/live_scores.json`
  (scores). Key finding: "Europe + US machine" tier was bogus — UAE/HK/Malaysia/
  RO/BG all MISS the US; only the US passport misses China; EU folded into one flag
  at the top.

## Where things are
- Repo: `~/projects/aiandtractors`, branch `main`, nothing committed this session
  (Ivan hasn't asked to commit). All work is in `reddit/`.
- Restart preview: `cd ~/projects/aiandtractors/reddit && python3 generate_tierlist.py
  && python3 -m http.server 8791` then open http://127.0.0.1:8791/tierlist.html
- Render pipeline (headed Chromium runs at devicePixelRatio 0.8, so the page is
  drawn at 0.8× in the top-left of the viewport): screenshot via Playwright MCP
  (viewport ~1912×1120, non-fullPage), then crop to content with
  `/tmp/crop_content.py <src> <dst>` (pure-python PNG decode/crop, no PIL/sips).
- Flags are local PNGs in `reddit/flags/` (flagcdn w320); Argentina is an inline SVG.
