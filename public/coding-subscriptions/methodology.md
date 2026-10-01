# Subscription cost per coding task

As of **1 October 2026**. Scores and API costs are a fresh snapshot of the [Artificial Analysis coding-agent dataset](https://artificialanalysis.ai/agents/coding-agents). Subscription values are estimates with separately dated assumptions. A benchmark task means an attempt, including unsuccessful attempts, not a guaranteed successful fix.

## A new benchmark snapshot

The current dataset has **31 harness/model/effort configurations**. All plotted scores use Coding Agent Index v1.5: the equal-weight average of DeepSWE v1.1, Terminal-Bench 4.0 and SWE-Atlas-QnA. The [AA version history](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) documents changed terminal tasks, environments and grading in September. The previous 6 September dataset and methodology are archived separately; they are not combined with current scores or used to infer score improvements.

The source retains AA's 13 available default configurations. The PNG focuses on the 11 with scores at least 50, preserving the approved linear, directly labeled frontier format. Qwen and DeepSeek are below this view and remain in the full dataset. Both panels use a 50–72 score range; the API range is $1–$16 and subscription range $0.03–$1.05. All four central shape anchors are at their actual coordinates; sensitivity ranges are retained in the article and data rather than drawn over the shapes. The independent linear cost scales are explicitly labeled: polygon area is not a measure of savings or performance. These include composite Devin Fusion configurations; those retain their two model names and receive no native Claude/Codex subscription allowance. The full table includes all 31 configurations and effort settings. Gemini 4 Argon has a published agent result but AA marks it unavailable; it appears only in the full table. A benchmark harness version is retained per evaluation in the source snapshot. Availability is AA's flag, not a guarantee of regional or account access.

GLM-5.3 now has a complete **OpenCode** agent result. This is not the old Claude Code GLM-5.2 score, a model Intelligence Index score, or a standalone Terminal-Bench percentage. Each chart coordinate retains its exact published harness, model and effort setting.

## How subscription scenarios work

**Estimated subscription cost per attempt = benchmark API cost per attempt × plan fee ÷ assumed monthly API-equivalent usage.**

This preserves AA's published cache-aware task valuation rather than treating all tokens as fresh input. Each scenario allocates the whole fee to coding and one alternative model; capacities are not additive. Using half the assumed usage doubles effective cost. Exclusions: tax, paid overages, infrastructure, human review and other subscription benefits. The article’s sensitivity ranges are scenarios, not confidence intervals; uncertainty from different workloads and future quotas is wider and unquantified.

## Retained September assumptions

These community calibrations were compiled on 4 September 2026. They remain conditional illustrations for previously calibrated families, **not verified October entitlements**. They are not assigned to GPT-6.1 Sol, GPT-6 Sol/Luna, Opus 5.5, Sonnet 5.5, Grok 4.6/4.7, Muse, Devin Fusion, Qwen or DeepSeek. Those subscription values remain unknown. The archived methodology contains the original source links and calculation history.

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

This is approximate: AA may aggregate tokens with different telemetry coverage, five-hour ceilings and availability can prevent weekly saturation, workload mix can change, and MCP use also consumes credits. It does not establish a measured subscription bill for a benchmark attempt. The [official ZCode page](https://zcode.z.ai/en) advertises $56 alongside $80 Pro, with final terms on z.ai; an older [migration notice](https://docs.z.ai/devpack/transition) shows a different example price. We use the explicit $80 reference fee and record this pricing conflict. At $56, the same all-off-peak scenario would be **$0.290111**. The 25 September–7 October all-day off-peak campaign is temporary and is not extrapolated into an entire month or transferred to Flash models.

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

Cost ranks and ratios use only the four identical harness/model/effort configurations with central subscription scenarios. API cost order is GLM, Kimi, Astra, Fable; central subscription order is Astra, Fable, GLM, Kimi. Ratios are API cost divided by modeled subscription cost: 35× for Astra, 37.5× for Fable, 10.2× for off-peak GLM, and 5.3× for Kimi. The uncertainty ranges can change these ranks; halving assumed utilization halves those ratios. These are conditional full-use comparisons, not promises of plan entitlements or verified invoices. Seven current default frontier configurations have unknown subscription costs, including the newest Sonnet, Opus and Sol. No subscription frontier winner among all new models can be inferred. The reproducible ratio and rank calculations are in `cost-differences.json`.

The September snapshot had 21 configurations; the current source has 31. The visible lineup replaces older Opus 5, GPT-5.6 Sol/Luna/Terra and Grok 4.5 generations with current defaults and removes stale Composer, historical GLM and Gemini Flash entries. Fable 5.1, GPT-6 Astra and Kimi K3 remain available current benchmark defaults. Sonnet 5.5, Opus 5.5, GPT-6.1 Sol, Grok 4.7 and matched GLM-5.3 are included. Current Gemini 4 Argon is marked unavailable. This is a coverage change, not a temporal performance trend: the benchmark suite changed.

## Paired provider shape

Select the highest-scoring available configuration per provider from the subset with a modeled subscription scenario, once, using the complete current dataset. The four anchors are Fable 5.1 max with fallback, GPT-6 Astra max, GLM-5.3 max and Kimi K3. Both panels preserve their identical configuration IDs, scores and descending-score connection order. No averaging across different numbers of models, hull recomputation, or panel-specific best selection is used. The fixed polygon has no self-crossings in either panel. Large provider-colored dots identify the anchors; other current results are small API dots.

This is explicitly the **best among the matched scenario subset**, not each provider’s overall best available agent. Sonnet 5.5 and GPT-6.1 Sol lead their respective providers but have unknown subscription costs; Cognition, xAI and Meta also have no matched scenarios. Their actual API results remain visible and their missing subscription values are disclosed. No lower-model scenario is transferred to a newer model. Independent linear cost scales aid reading each cost range; do not compare polygon area, slope or width as a quantitative metric. Use labeled costs, ratios and ranks.

## Reported GLM usage: price, consumption and plan share

A [first-hand Lite-plan report by dontWORRYimASIAN](https://www.reddit.com/r/ZaiGLM/comments/1w4eg4b/comment/p773rtu/) describes an $18 monthly fee and roughly three days using Hermes: 30–45 million tokens, 500–600 calls, and 3,400–5,700 credits from a 10,000-credit weekly pool. The credits imply **34–57% of that weekly allowance**; the author rounds it to 35–57%. They report 95% off-peak usage and a 43% GLM-5.3 / 57% Flash model mix.

The author separately estimates their August workload at $35–55 of API value per month, and projects $95–165 at full weekly utilization. Those are API-equivalent valuations, not amounts charged or measured subscription capacities. The report does not establish the cash cost of the three-day sample or its fraction of a monthly allowance. Cache denominators and periods are unclear, and Flash rates were promotional. This anecdote illustrates substantial off-peak use but does not replace the same-configuration GLM-5.3 credit calculation. The structured report and its limitations are saved in `usage-evidence.json`.

## Other first-hand plan samples

A [GPT-6.1 Sol Plus-window report](https://www.reddit.com/r/codex/comments/1wtlkg6/gpt_61_brought_another_nerf_to_usage_table_update/), using the author’s [Pi token-counter method](https://www.reddit.com/r/codex/comments/1wp0v6x/allowance_for_gpt_6_luna_sol_and_astra_measured/), records $7.50 of API-equivalent use in a fresh five-hour window on a $20 Plus plan. Its $45/week and $193/30-day figures are extrapolated; annualized consistently at 52/12, the monthly projection is $195. Pro capacity was not measured, so the post’s Pro multipliers are not adopted.

[RemakeBench’s Claude receipt](https://www.remakebench.com/capacity/plans/claude-max-20x) pairs $1,249.83 of corrected API-equivalent use with a displayed 58% weekly quota. The sample is 96.3% Opus 5.5. It implies roughly $2,155/week for that mix, but the owner reports a $200 Max plan while the app says Pro; missing activity and overages remain caveats. No Opus subscription point is calibrated from it.

[Its SuperGrok Heavy receipt](https://www.remakebench.com/capacity/plans/supergrok-heavy) pairs $76.0973 of logged API-equivalent use with a 56%→75% meter change, or 19 percentage points. The owner reports $300/month, and 96.1% of the interval is XHigh. This implies about $400.5/week under a pure-log assumption, not a provider allowance: unlogged activity can consume the shared pool. No Grok Build benchmark price is derived from the different CLI cohort.

[A Sonnet 5.5 creator](https://www.reddit.com/r/ClaudeAI/comments/1wtagdd/sonnet_55_did_this_opus_55_quality_with_half_price/) reports $30.46 of transcript-valued API tokens for a 30-second coded video on Max 20×. A related rounded weekly-percentage comment could not be independently read in this pass, and its scope is uncertain, so no subscription denominator is inferred.

None of these samples is a cash charge for the logged workload or a provider-guaranteed dollar allowance. The complete structured records keep observed values, reported projections and our derived arithmetic separate. The GLM schedule sensitivity is $0.435 per attempt at an assumed 95% off-peak mix, $0.464 at uniform round-the-clock timing across the regular week, and $0.829 entirely at peak. The main $0.414 point remains entirely off peak; the discount is not applied twice.
