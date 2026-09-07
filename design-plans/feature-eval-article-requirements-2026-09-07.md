# Feature evaluation article requirements

User conversation, 7 September 2026. Owning page: /coding-agent-feature-eval/.
- Use the audited per-run and per-model cost data, including message deduplication, cache TTL and automatic review overhead.
- Keep all six scores exactly: 9.75, 9.5, 9, 8.75, 7.75, 7. Original /20 rubric divided by two once.
- Title: Which agent is the best subagent?
- Subscription cost default, linear x axis; visible score range 6–10.
- Smooth monotone Pareto curve through nondominated observations; no stairs, label leaders, outlines or blobs.
- All dots labeled with model/effort and harness; lab colors Anthropic orange, OpenAI black, GLM blue.
- Preserve API, tokens, weekly allowance and wall-time comparison modes.
- ZCode $0.38 is TWO sessions on one graded branch. Individually $0.21/$0.17; do not claim Claude Code is inherently cheaper or assign shared grade independently.
- Clearly separate observed usage/scores from inherited subscription allowance assumptions. Do not call allowance measurements re-audited.
- Polished readable tables; main comparison concise, per-model cost details accessible without an enormous horizontal table. Fit 360–1440px.
- Public GitHub protocol link visible near top, plus chart/data downloads and relevant source links; verify public repository and reconcile outdated data/scripts.
- Preserve GLM's completed changes; isolate parallel writing; reconcile after its parent task finishes.
- Deploy and verify actual live page, responsive screenshots and data equality before claiming complete.

Backlog extraction from the owning Claude project returned no user messages; the current full conversation, current GLM session and committed page establish the requirements. Existing site layout/header/footer and shared 1296px article width are the design baseline.

Latest correction: Ivan requested the ZCode mean per session rather than combined cost. Use $0.188902639, average token usage; remove 2 sessions from graph labels. Explain the averaging and shared-branch score in the methodology. Frontier now includes ZCode between Codex and GLM via Claude Code.
