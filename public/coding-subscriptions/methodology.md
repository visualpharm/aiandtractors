# Subscription cost per coding task

As of **1 October 2026**. Scores and API costs are a fresh snapshot of the [Artificial Analysis coding-agent dataset](https://artificialanalysis.ai/agents/coding-agents). Subscription values are estimates with separately dated assumptions. A benchmark task means an attempt, including unsuccessful attempts, not a guaranteed successful fix.

## A new benchmark snapshot

The current dataset has **31 harness/model/effort configurations**. All plotted scores use Coding Agent Index v1.5: the equal-weight average of DeepSWE v1.1, Terminal-Bench 4.0 and SWE-Atlas-QnA. The [AA version history](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) documents changed terminal tasks, environments and grading in September. The previous 6 September dataset and methodology are archived separately; they are not combined with current scores or used to infer score improvements.

The source retains all 31 configurations. The chart shows 11 available defaults scoring at least 50 plus the published Sonnet high and xhigh variants. Both panels use a 50–72 score range, API $1–$16 and subscription $0.03–$1.05, on independent linear USD scales. Exact values and harness versions remain in the source and table. The same Fable, Astra, GLM and Kimi configurations form the paired shape. Sonnet max is prominent on the API panel and a rough band without a central point on the subscription panel; it never anchors the polygon. Unknown subscription costs remain absent from that panel. Gemini 4 Argon remains unavailable per AA and appears only in the full dataset. Area is not a savings or performance metric.

GLM-5.3 now has a complete **OpenCode** agent result. This is not the old Claude Code GLM-5.2 score, a model Intelligence Index score, or a standalone Terminal-Bench percentage. Each chart coordinate retains its exact published harness, model and effort setting.

## How subscription scenarios work

**Estimated subscription cost per attempt = benchmark API cost per attempt × plan fee ÷ assumed monthly API-equivalent usage.**

This preserves AA's published cache-aware task valuation rather than treating all tokens as fresh input. Each scenario allocates the whole fee to coding and one alternative model; capacities are not additive. Using half the assumed usage doubles effective cost. Exclusions: tax, paid overages, infrastructure, human review and other subscription benefits. The article’s sensitivity ranges are scenarios, not confidence intervals; uncertainty from different workloads and future quotas is wider and unquantified.

## Retained September assumptions

These community calibrations were compiled on 4 September 2026. They remain conditional illustrations for previously calibrated families, **not verified October entitlements**. They are not assigned to GPT-6.1 Sol, GPT-6 Sol/Luna, Opus 5.5, Sonnet 5.5, Grok 4.6/4.7, Muse, Devin Fusion, Qwen or DeepSeek. Those subscription values remain unknown, except Sonnet max’s separately reviewed provisional same-model report below. The archived methodology contains the original source links and calculation history.

| Scenario family | Monthly fee | Assumed monthly API-equivalent value | Sensitivity values |
|---|---:|---:|---:|
| Codex, retained GPT-5.6/Astra proxy | $200 | $7,000 | $5,000–$10,000 |
| Claude Max, retained Opus 5 proxy | $200 | $7,000 | $4,000–$8,000 |
| Claude Max, Fable 5.1 with Fable 5 proxy | $200 | $7,500 | $2,000–$9,500 |
| Kimi K3, retained Vivace scenario | $199 | $1,050 | $750–$1,500 |
| Antigravity, retained Gemini 3.8 Flash scenario | $100 | $3,780.38 | $1,890.19–$5,670.57 |

Codex's denominator originally extrapolated Pro 5x observations to 20x and used a 5.6-family proxy for Astra. [Current Codex pricing](https://learn.chatgpt.com/docs/pricing) offers $100/$200/$500 tiers, model-specific credit rates and speed multipliers; it does not validate this API-dollar capacity. The $200 scenario concerns standard mode, not Ultrafast or the $500 plan. [OpenAI’s 1 October Pro-tier help page](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers) says new Pro 200 subscriptions receive a lower included allowance; eligible existing subscribers keep the previous allowance only through 29 October 2026. The retained September denominator is a historical scenario, not a calibrated current new-buyer entitlement. A Plus usage test cannot be multiplied into Pro capacity without same-model evidence for that tier.

Fable's $7,500 value is an older, favorable, cache-heavy scenario from Fable 5 reports. [Claude's current plan table](https://claude.com/pricing) limits included Fable use on Max to 50% of weekly limits. The older reports already measured a dedicated bucket; halving their denominator again would double-count that restriction. Fable 5.1's lower cache price can alter API-equivalent usage. The proxy is kept visible and dated instead of asserted as current capacity.

Kimi's $199/$1,050 scenario is retained for reproducibility. Its current international fee and full-usage dollar capacity were not independently established in this refresh. [Kimi's membership documentation](https://www.kimi.com/code/docs/kimi-code/membership.html) describes plan-dependent quota accounting; a model name alone does not establish identical quota economics. The Gemini scenario retains an inferred raw-token capacity valued with an older Antigravity benchmark mix. Neither is a contractual dollar allowance.

The four plotted estimates are: Astra max **$0.213** ($0.149–$0.299); Fable 5.1 max with fallback **$0.330** ($0.261–$1.239); Kimi K3 **$0.957** ($0.670–$1.339); GLM-5.3 max **$0.414** (all-off-peak) to **$0.829** (all-peak). These are not a precise subscription ranking, and only GLM uses newly checked published credit rules.

## GLM-5.3: published credit scenario

The [official Coding Plan schedule](https://docs.z.ai/devpack/overview) gives Pro 12,000 credits per rolling five hours and 60,000 weekly. GLM-5.3 multipliers are 6.9 for fresh input, 1.7 for cached input and 24 for output, divided by 10,000. Off-peak consumption is halved. Input includes cached input in these benchmark counters, so cached tokens are subtracted before fresh-input credit calculation and counted once.

Using AA's pooled means gives **2,693.890931 credits per attempt at peak**. Formula: ((14,202,165.166117 − 14,007,356.268427) × 6.9 + 14,007,356.268427 × 1.7 + 74,259.260726 × 24) / 10,000. Full weekly use annualized at 52/12 weeks per month is 260,000 credits. At the $80 standard fee: $80 × 2,693.890931 / 260,000 = $0.828890; all-off-peak is half, $0.414445. The main point uses the all-off-peak scenario. The all-peak sensitivity is documented here, outside the plot. It is not a midpoint or probability estimate.

This is approximate: AA may aggregate tokens with different telemetry coverage, five-hour ceilings and availability can prevent weekly saturation, workload mix can change, and MCP use also consumes credits. It does not establish a measured subscription bill for a benchmark attempt. The [official billing selector](https://z.ai/subscribe) shows $80 Pro monthly and $56 effective monthly for yearly billing. These are billing cadences, not a temporary monthly promotion. The yearly Pro scenario is $0.290111 off peak; Max at $168 monthly and 140,000 weekly credits gives $0.373000 off peak. The chart keeps monthly Pro, identifies its tier and assumes full use. The 25 September–7 October all-day off-peak campaign is separate and not extrapolated through a whole month.

The permanent Coding Plan schedule has peak model-credit consumption only Monday–Friday 14:00–18:00 Singapore time (UTC+8), equivalent to 06:00–10:00 UTC. That is 20 peak and 148 off-peak hours per week: 88.1% of calendar time is off peak. All other hours consume half the standard model credits. The chart assumes usage scheduled entirely off peak, not a random time-weighted average. The all-hours campaign from 25 September to 7 October is distinct from this durable schedule. These rules discount subscription credit consumption, not the API task-cost coordinate. Flash-only unlimited promotions are not applied to the GLM-5.3 agent. Calendar availability does not prove full utilization of weekly or five-hour allowances.

## Provider pricing audit

API coordinates retain AA's own published average costs, including its cache, context and fallback accounting. We do not replace exact task-cost measurements with an approximate reconstruction from pooled token means. Provider price tables below check model identity and current rates; they do not establish subscription quotas.

| Model | Standard input / million | Cache read / million | Output / million |
|---|---:|---:|---:|
| Claude Sonnet 5.5 | $2 | $0.20 | $10 |
| Claude Opus 5.5 | $4 | $0.20 | $20 |
| Claude Fable 5.1 | $10 | $0.25 | $50 |
| GPT-6.1 Sol, short context | $2 | $0.10 | $10 |
| GPT-6 Astra, short context | $10 | $1 | $50 |
| GPT-6 Luna, short context | $0.10 | $0.01 | $0.50 |
| GLM-5.3 | $1.40 | $0.26 | $4.40 |

Sources: [Anthropic API pricing](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI standard API pricing](https://developers.openai.com/api/docs/pricing), [z.ai API pricing](https://docs.z.ai/guides/overview/pricing). Cache writes, long context, speed, routing, fallback and tool use can add charges. Anthropic publishes separate cache-write rates. Grok 4.7's [API pricing](https://docs.x.ai/developers/pricing) also distinguishes Fast and context tiers; [SuperGrok's $30 fee](https://x.ai/pricing) does not supply a matched Grok 4.7 usage denominator, so its subscription cost remains unknown.

## Recorded usage stays historical

The usage graph retains the existing August–5 September observations, audited 6 September. Claude's $19,380.10 subtotal spans mixed models, two plans and overages. Codex's $5,327.97 August subtotal excludes unpriced minor models; Astra's $1,462 covers five days. GLM's $194.67 covers 617.14M tokens across two provider IDs over 27 days; its GLM-5.3 subset is $75.49 and 233.75M tokens. These are consumption observations, not included capacities or comparable monthly plan rankings.

The prior Cursor invoice and five-call Composer 2.5 Fast inference describe the 10 August–10 September billing cycle. There is no matching Cursor row in the current 31-record AA snapshot, so no Cursor dot or renewed capacity is asserted. The historical source and $0.066 conditional estimate remain in the September archive.

## Reproducibility

The downloadable estimates retain exact configuration IDs, harness versions, published scores and API costs, nullable subscription values, calculation inputs and sources. The saved AA snapshot records its retrieval date and source HTML SHA-256. The refresh script resolves the public page's flight references, checks all three benchmark components, and verifies each index score against the equal-weight component average. The renderer generates both PNGs and SVGs from that same JSON.
## What changes between the two price views

Cost ranks and ratios compare the four non-provisional scenarios, excluding Sonnet and unknown allowances. API order is GLM, Kimi, Astra, Fable; subscription scenario order is Astra, Fable, GLM, Kimi. Sensitivity can change these ranks; halving utilization doubles cost per attempt. Sonnet's two normalization scenarios remain separate in `cost-differences.json`; its retained API-dollar calculation is not a chart center or ranked value. Eight of the 13 visible configurations have unknown subscription costs. These are full-use illustrations, not invoices or current entitlement measurements.

The September snapshot had 21 configurations; the current source has 31. The visible lineup replaces older Opus 5, GPT-5.6 Sol/Luna/Terra and Grok 4.5 generations with current defaults and removes stale Composer, historical GLM and Gemini Flash entries. Fable 5.1, GPT-6 Astra and Kimi K3 remain available current benchmark defaults. Sonnet 5.5, Opus 5.5, GPT-6.1 Sol, Grok 4.7 and matched GLM-5.3 are included. Current Gemini 4 Argon is marked unavailable. This is a coverage change, not a temporal performance trend: the benchmark suite changed.

## Paired provider shape

Select the highest-scoring configuration per provider among non-provisional subscription scenarios once. Fable max, Astra max, GLM max and Kimi K3 retain identical IDs and descending-score connection order in both panels, without self-crossings. Sonnet max remains visible separately; its uncertain normalization never sets a solid shape vertex. Sol and other configurations with unknown allowances stay visible on the API panel. Large colored dots mark the four paired configurations; Sonnet's prominent API dot identifies the highest available score, not a subscription entitlement.

## Reported GLM usage: price, consumption and plan share

A [first-hand Lite-plan report by dontWORRYimASIAN](https://www.reddit.com/r/ZaiGLM/comments/1w4eg4b/comment/p773rtu/) describes an $18 monthly fee and roughly three days using Hermes: 30–45 million tokens, 500–600 calls, and 3,400–5,700 credits from a 10,000-credit weekly pool. The credits imply **34–57% of that weekly allowance**; the author rounds it to 35–57%. They report 95% off-peak usage and a 43% GLM-5.3 / 57% Flash model mix.

The author separately estimates their August workload at $35–55 of API value per month, and projects $95–165 at full weekly utilization. Those are API-equivalent valuations, not amounts charged or measured subscription capacities. The report does not establish the cash cost of the three-day sample or its fraction of a monthly allowance. Cache denominators and periods are unclear, and Flash rates were promotional. This anecdote illustrates substantial off-peak use but does not replace the same-configuration GLM-5.3 credit calculation. The structured report and its limitations are saved in `usage-evidence.json`.

## Other first-hand plan samples

A [GPT-6.1 Sol Plus-window report](https://www.reddit.com/r/codex/comments/1wtlkg6/gpt_61_brought_another_nerf_to_usage_table_update/), using the author’s [Pi token-counter method](https://www.reddit.com/r/codex/comments/1wp0v6x/allowance_for_gpt_6_luna_sol_and_astra_measured/), records $7.50 of API-equivalent use in a fresh five-hour window on a $20 Plus plan. Its $45/week and $193/30-day figures are extrapolated; annualized consistently at 52/12, the monthly projection is $195. Pro capacity was not measured, so the post’s Pro multipliers are not adopted.

[RemakeBench’s Claude receipt](https://www.remakebench.com/capacity/plans/claude-max-20x) pairs $1,249.83 of corrected API-equivalent use with a displayed 58% weekly quota. The sample is 96.3% Opus 5.5. It implies roughly $2,155/week for that mix, but the owner reports a $200 Max plan while the app says Pro; missing activity and overages remain caveats. No Opus subscription point is calibrated from it.

[Its SuperGrok Heavy receipt](https://www.remakebench.com/capacity/plans/supergrok-heavy) pairs $76.0973 of logged API-equivalent use with a 56%→75% meter change, or 19 percentage points. The owner reports $300/month, and 96.1% of the interval is XHigh. This implies about $400.5/week under a pure-log assumption, not a provider allowance: unlogged activity can consume the shared pool. No Grok Build benchmark price is derived from the different CLI cohort.

## Sonnet 5.5: one report, two normalization scenarios

The [original creator report](https://www.reddit.com/r/ClaudeAI/comments/1wtagdd/sonnet_55_did_this_opus_55_quality_with_half_price/), [ClaudeCode cross-post](https://www.reddit.com/r/ClaudeCode/comments/1wtapu5/sonnet_55_built_a_30_s_motiongraphics_reel_same/) and [vibecoding cross-post](https://www.reddit.com/r/vibecoding/comments/1wtajpx/sonnet_55_is_the_same_quality_as_opus_55_but/) are one author/workload, n=1. Max 20× costs $200 monthly. The author associates approximately 2% weekly usage with a $30.46 final-video ledger or $35.40 whole-session scope. The Opus same-token counterfactual is a calculation, not an observed matched Opus ledger. Creator Ultracode/subagents are not AA max quota telemetry.

API-dollar transfer: cost = AA API cost × $200 / (reported API value / weekly share × 52/12). At 2%, the scope alternatives give $0.370034–$0.430046 per AA attempt, around $0.4. This assumes subscription meter consumption follows API dollars despite a different token mix. The retained `price` field records the original $0.430046 scenario, not a preferred center.

Alternative token-weight transfer uses the [independent tracker's published JSON](https://alldonesites.com/data/claude-usage.json): W = fresh input/cache writes + 5 × output + k × cache reads, k = 0.003269985677448766. The pooled cache weight is fitted; output weight 5 is held rather than fitted. The Sonnet family rate is provisional and enters 17 of 235 stretches. Same-model rates cancel only for a matched model mix. AA W = 4,225,222; final-video W = 5,732,569; whole-session W = 7,097,231. Cost = $200 / (52/12) × 0.02 × W_AA / W_report gives $0.680359 and $0.549539, around $0.6. This is an alternative scenario, not official quota accounting.

The band combines both normalization methods, two scopes and selected 1–3% weekly shares: **$0.18501696–$1.02053856 per attempt**. It is analyst-selected sensitivity, not observed scatter, a confidence interval, or a bound on total uncertainty. It has no plotted central marker and is excluded from cost ranks and polygon anchors. The same $200 fee is allocated to each alternative, never summed across them. `sonnet-normalization.json` retains the reproducible inputs.

AA Sonnet max has 45 fallback attempts out of 909, to Opus 4.8: 39 Atlas and 6 Terminal, none DeepSWE. Per-benchmark cache/write/cost and per-metric coverage counts are unavailable. Safety attempt counts are not telemetry-coverage counts. Pooled cost sums divide by 303 tasks, not 909 again; scores average the three components equally. AA output share is 2.17% versus 0.56% in the final-video ledger. Mixed fallback tokens, output/cache mix, effort, five-hour limits and unlogged use leave quota-to-benchmark transfer unresolved. A few independent, comparably scoped token-plus-meter reports could refine a useful rough estimate without requiring a perfect controlled study.

[AA's actual variants](https://artificialanalysis.ai/agents/coding-agents/comparisons/claude-code-vs-opencode) give Sonnet high 55.01/$1.24 API, xhigh 62.87/$3.33 and max 68.36/$14.19; GLM max is 53.55/$4.24. High and xhigh beat GLM on this composite-score/API-cost comparison, with different harnesses. Their subscription costs stay unknown; max calibration is not transferred to them.


None of these samples is a cash charge for the logged workload or a provider-guaranteed dollar allowance. The complete structured records keep observed values, reported projections and our derived arithmetic separate. The GLM schedule sensitivity is $0.435 per attempt at an assumed 95% off-peak mix, $0.464 at uniform round-the-clock timing across the regular week, and $0.829 entirely at peak. The main $0.414 point remains entirely off peak; the discount is not applied twice.
