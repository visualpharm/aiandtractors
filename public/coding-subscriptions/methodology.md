# Subscription cost per coding task

Estimates compiled on 4 September 2026 from community usage reports and independent experiments. These are modeled subscription economics, not lab-published token entitlements.

## How the estimate works

**Estimated subscription cost per task = benchmark API cost per task × monthly subscription price ÷ estimated monthly API-equivalent token value.**

This preserves the benchmark's actual token-cost mix in the numerator, rather than pretending cached input, fresh input and output tokens are interchangeable. A dollar of API-equivalent usage means token volume valued at API retail rates, not the provider's compute cost or spendable API credit.

The chart allocates the entire plan price to coding and assumes the estimated monthly usage is consumed. Using half of that amount doubles the effective cost. Each model is an alternative use of the same subscription; allowances must not be added together. A task is a benchmark attempt, including unsuccessful attempts, not a guaranteed successful fix.

Scores are approximate readings from the supplied screenshot. Its displayed API task prices are retained; Kimi ($3.08) and Fable 5 ($11.68) are corroborated by the [Artificial Analysis dataset](https://artificialanalysis.ai/agents/coding-agents). The screenshot's duplicated Astra “high” label is resolved as high ($2.89) and xhigh ($3.27), following its lower chart. Opus $8.17 is xhigh in the lower chart and current dataset. These corrections preserve the plotted configurations. This is an independent redraw, not an Artificial Analysis subscription benchmark.

The update adds Gemini 3.7 and 3.8 Flash using the dataset's exact **Antigravity SDK** rows: 56.57 and 59.09 points, respectively. These differ from the screenshot's OpenCode results because the harness matters. Original points retain the original snapshot. GLM/z.ai and Muse Code now have explicit coverage below; missing measurements remain unknown rather than being assigned invented chart coordinates.

## Model assumptions

| Plan / model family | Fee | Central monthly API-equivalent value | Sensitivity envelope |
|---|---:|---:|---:|
| Codex Pro | $200 | $7,000 | $5,000–$10,000 |
| Claude Max, Opus proxy | $200 | $7,000 | $4,000–$8,000 |
| Claude Max, Fable proxy | $200 | $7,500 | $2,000–$9,500 |
| Kimi Vivace, K3 | $199 | $1,050 | $750–$1,500 |
| SuperGrok, Grok Build 4.5 | $30 | $500 | $300–$750 |
| Antigravity Ultra, Gemini Flash | $100 | $3,780 | $1,890–$5,671 |

Central values are rounded analyst choices anchored to the reports below. The ranges are deliberately broad sensitivity scenarios, not confidence intervals, a survey distribution, or minimum/maximum contractual quotas. No community sample establishes identical economics across every model or reasoning setting. Astra uses a 5.6-family proxy; Fable 5.1 uses a Fable 5 proxy. Different cache mixtures and quota accounting can change these ratios materially.

## What subscribers actually measured

**Codex.** [August quota measurements](https://www.reddit.com/r/codex/comments/1vu3u05/did_pro_5x_weekly_codex_usage_drop_44_after_the/) pair token logs with quota changes. One Pro 5x user inferred about 10,037 credits/week, and a commenter reconstructed 12,160 credits in a fully exhausted window. Using the thread's $0.04 credit valuation, multiplying 5x capacity by four for 20x, and 52/12 weeks per month yields about $6,960–$8,431/month. The fourfold scaling is an assumption, not a directly measured Pro 20x quota. The $7,000 central case rounds the lower estimate. [A separate recent logged month](https://www.reddit.com/r/codex/comments/1w059nm/ai_subsidies_will_end_and_codex_will_cost/) reports $4,615–$4,828 with 6.69B input tokens, of which 6.29B were cached, and 20.85M output tokens. That is actual consumption, not an exhausted-capacity measurement.

**Claude / Opus.** [One August Max subscriber](https://www.reddit.com/r/ClaudeAI/comments/1vbvdzl/200_subscription_vs_7470_of_api_usage/) reports $7,470 API-equivalent in a month on the $200 plan, after deduplicating session logs and hitting limits repeatedly. [Another usage report](https://www.reddit.com/r/ClaudeAI/comments/1vjxabk/api_equivalent_cost/) reports $6,790 over 30 days and $1,835 over seven days. Both involve mixed models, so $7,000 is a heavy-use proxy for Opus, not an Opus-only quota measurement. [An independent earlier logged experiment](https://alexey-pelykh.com/blog/the-x20-receipts/) extrapolates roughly $4,080/month/account across three accounts, supporting the lower scenario. The reported raw total was dominated by cached tokens.

**Fable.** [A July Fable 5 user](https://www.reddit.com/r/ClaudeAI/comments/1ula5pn/claude_max_20x_vs_fable_5_usage_credits_before_7/) reports $385 API-equivalent consumed 22% of the dedicated weekly Fable allowance: $385 / 0.22 × 52/12 ≈ $7,583/month. This anchors the rounded $7,500 central case. [Another July experiment](https://github.com/ivanlhz/ia-tests/blob/main/PROTOCOL.md) reports $628–$775 for 35% of the dedicated allowance, implying roughly $7,775–$9,595/month. These already account for the dedicated bucket; halving them again would double-count its restriction. Conversely, [August developer measurements](https://dev.classmethod.jp/articles/claude-max-20x-weekly-limit-not-4x/) found Fable consumed approximately twice the weekly percentage per API dollar as Opus in the sampled workloads, and [an independent synthesis](https://zenn.dev/kimuson/articles/compare-ai-subscription-20260818?locale=en) modeled only about $2,365/month. This disagreement motivates the very wide range. The central estimate is an older, favorable, cache-heavy scenario and is **not a verified current Fable 5.1 capacity**. Fable 5.1 was too new for a full-month user log.

**Kimi.** [An instrumented subscriber report](https://github.com/MoonshotAI/kimi-cli/issues/2604) records 405M raw tokens across August 8–9, including 11.7M fresh-input-plus-output tokens, consuming 61% of weekly quota. A linear extrapolation gives about 664M raw/week or 2.88B/month. The source has a two-seat ledger ambiguity, so this is corroboration, not a precise single-seat entitlement. [The community comparison](https://zenn.dev/kimuson/articles/compare-ai-subscription-20260818?locale=en) estimates Vivace/K3 at $241–$250 API-equivalent/week, about $1,044–$1,083/month. It describes an August 13 measurement but does not link its exact originating report. $1,050 is therefore less strongly grounded than the Codex/Claude central estimates; $750–$1,500 is an analyst sensitivity envelope. Raw token equivalents depend on the cache mix, not just model name.

**Grok Build.** [One SuperGrok subscriber's logged weekly experiment](https://www.reddit.com/r/grok/comments/1vg4mce/supergrok_weekly_ai_usage_estimation/) reports $115.38 API-equivalent over a full weekly allowance on the $30 plan, implying about $500/month. [A separate Grok Build session log](https://www.reddit.com/r/grok/comments/1vh18bv/i_logged_32_grok_build_usage_snapshots_internal/) reports $20.82 in its internal product meter for 16 percentage points of weekly allowance; extrapolation gives approximately $564/month. The latter is a product-meter estimate, not necessarily API retail value, so it corroborates the rough scale only. The model mix and complete cost calculation are not independently reproducible. The central $500 estimate therefore has an analyst sensitivity envelope of $300–$750/month, giving $0.10–$0.24 per benchmark task. The chart explicitly labels the actual $30 plan instead of inventing a $200 product.

## Gemini through Antigravity

**Provisional estimate: $0.037/task for Gemini 3.7 Flash high; $0.053 for 3.8 Flash high.** The scenario ranges are $0.025–$0.074 and $0.035–$0.106.

One [subscriber's session-log experiment](https://www.reddit.com/r/LLMDevs/comments/1vwhiab/gemini_pro_ultra_claude_pro_opencode_go/) estimates 5B raw tokens/week on the $100 Ultra tier while using Gemini 3.7 Flash. Ultra was inferred from two nearly complete five-hour windows, not a fully exhausted week. The author reports a regional discount; the chart uses the stated US tier price. Their Gemini cache/input/output split is absent. Their 98.2% cache figure refers to Claude, so it is not used here.

**Our assumption:** value the reported raw capacity at the token mix measured in Artificial Analysis's native Antigravity SDK benchmark for Gemini 3.7 Flash. That benchmark averages 8.003M prompt-plus-output tokens and $1.3963 API cost per task. Therefore 5B × 52/12 ÷ 8.003M × $1.3963 gives **$3,780/month API-equivalent**. This is a calculated scenario, not a subscriber-reported dollar allowance. Gemini 3.8 uses the same monetary denominator with its own $2.0090 API task cost. Assuming comparable token mix across workloads and transferable quota economics across these models is uncertain.

For these Gemini records, the input counter already includes cached input. Adding the cache counter again would double-count tokens. The 3.8 record reproduces its API cost when cached input is subtracted from total input before fresh-input pricing, using the rates in the [AA Gemini 3.8 profile](https://artificialanalysis.ai/models/gemini-3-8-flash). Its mean totalTokens field adds cache again and is not used. The calibration uses inputTokens plus outputTokens.

The 2.5–7.5B/week sensitivity band is an analyst choice around the partial-window estimate. Different token mixtures can shift costs beyond it. The actual $100 tier avoids extrapolating unmeasured $200 capacity. It is priced separately from its own $20 Pro tier; they are not stacked.

## GLM through z.ai

**Quota estimate available; cost per task not yet comparable.** Community discussions list [Lite $18, Pro $80 and Max $168](https://www.reddit.com/r/kimi/comments/1voenuf/limi_k3_vs_glm_53_subscription_limits/). We use that source only for the plan prices, not its vendor-derived allowance figures.

A [GLM 5.3 Lite subscriber](https://www.reddit.com/r/ZaiGLM/comments/1vpxdr9/comment/p410fu5/) reports 48M tokens consuming 44% of weekly quota, with a 95% cache hit rate. Extrapolating gives **109M raw tokens/week, or 473M/month** on Lite. This is a single short self-report without raw logs. It does not establish the output share, peak-hour effects, or the capacity of Pro and Max. Multiplying the Lite measurement by advertised tier ratios would add an unverified assumption.

The checked Coding Agent Index dataset has **GLM 5.2 at 43.31 points**, but no GLM 5.3 row. The widely cited GLM 5.3 Intelligence Index score belongs to a different benchmark and cannot supply this chart's vertical coordinate. Assigning 5.2's task cost or score to 5.3 would also change the model/provider configuration. GLM therefore appears with its measured-token scenario, without a fabricated price or score.

## Muse Code

**Plans exist; a measured token allowance is still missing.** The [community launch discussion](https://www.reddit.com/r/opencodeCLI/comments/1w48fbk/meta_introduced_coding_plans_for_muse_spark_12/) describes $5 Everyday, $15 High and $50 Power plans. The $50 tier would be the relevant highest native plan; an exact $200 product is not required.

In [Fazt's paid Muse Code test](https://fazt.dev/contenido/review-muse-code-meta-harness-ia-precio-test), the $5 plan exhausted its quota after 30–40 minutes on Muse Spark 1.2 ultra, while a large multi-application task remained incomplete. No token totals or cache split were reported. Minutes of activity cannot be converted into benchmark tasks without inventing throughput. A [Muse Spark 1.3 subscriber](https://www.reddit.com/r/opencode/comments/1w6co97/meta_muse_code_plan_does_muse_spark_13/) also asks how the native meter counts Contributor usage, without a measured answer.

To calculate Muse's position, a useful report needs the native plan tier, exact model, quota percentage before and after, reset period, and input/cache/output tokens or reconstructed API value. OpenCode Go anecdotes measure a different subscription. Muse remains unpriced until that evidence is available.

## Why some models remain unpriced

These remain outside the priced comparison:

- **Qwen3.8 Max:** [A token-volume report](https://www.reddit.com/r/Qwen_AI/comments/1v2xx0x/hit_100m_tokens_after_6_hours_nonstop_coding/) concerns an $18 plan under a 50× promotion. Extrapolating it to normal $200 usage would mislead.
- **Cursor Ultra**, absent from the screenshot: [Community discussion](https://forum.cursor.com/t/how-much-usage-is-available-on-the-200-subscription/163309) reports roughly $400–$500 of third-party model usage at $200/month, with a separate Auto/Composer pool. Changing the harness can change benchmark performance, so its economics are not assigned to Claude Code or Codex points.

## Worked examples

- Astra high: $2.89 × $200 / $7,000 = **$0.083/task**.
- Astra max: $4.72 × $200 / $7,000 = **$0.135/task**.
- Fable 5.1 max: $9.18 × $200 / $7,500 = **$0.245/task**, conditional on the older Fable proxy.
- Kimi K3: $3.08 × $199 / $1,050 = **$0.584/task**.
- Grok Build / Grok 4.5 high: $2.44 × $30 / $500 = **$0.146/task**.
- Antigravity / Gemini 3.7 Flash high: $1.3963 × $100 / $3,780.38 = **$0.037/task**.
- Antigravity / Gemini 3.8 Flash high: $2.0090 × $100 / $3,780.38 = **$0.053/task**.

Prices exclude tax, overage purchases, hardware, review time and the other benefits of the subscriptions.


The original [Artificial Analysis methodology](https://artificialanalysis.ai/methodology/coding-agents-benchmarking) explains its benchmark attempts and API cost accounting. Its score and task-cost measurements are the starting point; the subscription conversion is my estimate.
