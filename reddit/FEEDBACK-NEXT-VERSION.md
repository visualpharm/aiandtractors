# r/MapPorn feedback → next version prompt

Captured from Ivan's dictations 2026-06-12/13. Reddit posts were in r/MapPorn and
r/tierlists. Posts landed but comments not locally cached — this captures Ivan's
own distilled feedback for the next scoring/tier-list iteration.

---

## Scoring changes for v2

### 1. ESTA vs real visa — split the "hiccup" tier

Ivan's words: "Score the clear distinction between visas that require preparing
documentation, submitting, and waiting for an uncertain decision for days/weeks
(those are visas, online or not) vs. feel-it-at-the-airport and fine in 90% of
cases (the ESTA range)."

**Decision:** ESTA-range access (US ESTA, Canada eTA, Australia ETA) should score
at ~0.75× weight instead of full 1.0× — a hiccup, not a door-slam. True visas
(eVisa with uncertain approval, print-and-mail, appointment required) should be
excluded from the score (current behavior: already excluded). Visa on arrival at the
airport door = full score (current behavior: included, keep).

The boundary:
- **Full score (1.0×):** visa-free days, visa on arrival at airport, bilateral VoA
- **Partial score (0.75×):** pre-trip online auth with auto-approval >95% (ESTA,
  Canada eTA, Australia ETA, NZ ETA, UK ETA — known easy-auth programs)
- **Zero score:** eVisa with document submission + uncertainty, traditional visa,
  appointment required

Ivan: "ESTA and visas on arrival are a minor hiccup, but still a hiccup. So how
should we divide the countries?" → 0.75× is the answer.

### 2. Suriname boost — which countries get it

Ivan asked: "Which countries should get the Suriname boost and which other e-visa
stuff easier than ESTA?"

Suriname offers a same-day e-visa that is auto-approved and cheap. Similar programs:
- Suriname (auto e-visa, $25, instant)
- Cambodia (e-visa in 3 days but high approval rate — borderline)
- Kenya eTA (instant, auto-approved)
- Ethiopia e-visa (fast, high approval)
- Rwanda (easy e-visa)

These are EASIER than ESTA in practice (cheaper, faster, auto-approved), so they
should stay at full 1.0× score. ESTA is harder (link to US criminal record check,
$21, 72h advance).

**Rule:** if the e-visa has >99% approval and <24h processing with no document
upload → full score. If it requires document upload or uncertain approval → zero.
ESTA specifically → 0.75× (it does have a denial rate, requires 72h advance, US
criminal record linkage).

### 3. EU differentiation

Ivan: "It could differentiate the clusters of equal-capacity European passports."

Currently all Schengen/EU passports share the same score. In practice:
- Romania and Bulgaria are NOT in Schengen → different USA access
- Switzerland, Norway, Iceland: Schengen but not EU → slightly different access for
  some Gulf countries
- UK post-Brexit: no longer EU → unique profile

On the tier list these are already split (Romania/Bulgaria in tier 2; UK in tier 1).
On the live ranking, differentiate by actual score rather than treating them identically.

### 4. Friction scoring — cash and simplicity bonus

Ivan: "We can also add some scoring for the simplicity and cash spent."

Proposed secondary score column (not replacing the main score):
- **Friction score:** sum of e-visa fees + ESTA fees + airport VoA fees paid annually
  per 10 trips to the top-10 tourist destinations. Lower = better.
- Display as a secondary column on the ranking page, sortable.
- Headline: "Cost of paperwork per year of travel"

This is additive information, not a change to the main score.

---

## Next tier-list image prompt (v5)

For the next Reddit post, the tier-list image should incorporate:

1. Add a "½ door" row for ESTA-range passports if any tier-list country is materially
   affected. Currently: all tier-1 passports can enter the US via ESTA or visa-free,
   so this doesn't split any tier. Skip for v5.

2. Add a footnote on the image: "VoA = full score · ESTA = ¾ score · eVisa = 0"
   below the existing footnote line.

3. Consider adding a 6th tier: "Need a visa for everywhere worth going" — targeted at
   passports in the 50M–100M range (not quite "border officer side quest" but not
   "lots of paperwork" either). Candidates: Iraq, Syria, Libya. Keep controversial
   countries off the image (as per v4 rule: no politics in labels).

---

## Web page CTA (drive traffic from Reddit)

Ivan: "We also want to make users visit our ranking web page."

In the Reddit post body, change the CTA line from:
   `🕹️ Play here: https://aiandtractors.com/passport-ranking/`
to something more compelling:
   `See where your passport lands — and compare it with a second citizenship:
   https://aiandtractors.com/passport-ranking/`

Add to every map caption on the image:
   `rank yours → aiandtractors.com/passport-ranking`
(already present on v4 image footer, keep it)
