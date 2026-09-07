import Head from 'next/head';
import Layout from '../components/Layout';
import ModelEvalChart, { fmt, totalTokens } from '../components/ModelEvalChart';
import data from '../public/model-eval/experiment-data.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-feature-eval/';
const TITLE = 'Six coding agents, one real feature';
const DESCRIPTION = 'A real feature from a private repo given to six agent setups on the same base commit. One reviewer graded all branches on a 10-item rubric, each item scored 0 to 2 and halved to a 10-point maximum, with file-level evidence, and re-ran the tests.';
const PLAN_NAMES = { claude_max_100: 'Claude Max', glm_pro_annual: 'GLM Pro annual', codex_pro: 'Codex Pro' };
const MODEL_NAMES = {
  'claude-fable-5-1': 'Fable 5.1', 'claude-opus-5': 'Opus 5', 'claude-sonnet-5': 'Sonnet 5',
  'claude-opus-4-7': 'Opus 4.7 · automatic review', 'glm-5.3': 'GLM 5.3',
  'glm-5.3 · session 1': 'GLM 5.3 · session 1', 'glm-5.3 · session 2': 'GLM 5.3 · session 2',
  'gpt-6-astra': 'GPT-6 Astra',
};

function planOf(r, experiment) {
  const a = experiment.allowances[r.plan];
  const allowance = r.model === 'claude-fable-5-1' && a.fable_monthly_api_equiv_usd ? a.fable_monthly_api_equiv_usd : a.monthly_api_equiv_usd;
  return { plan_label: `${PLAN_NAMES[r.plan]}, $${a.fee_usd}`, fee: a.fee_usd, allowance };
}

function componentRows(r, experiment) {
  return Object.entries(r.cost_components || {}).map(([key, c]) => {
    const price = experiment.prices_per_million[key.split(' · ')[0]] || {};
    const fiveMinute = (c.tokens.cache_write || 0) - (c.one_hour_cache_write_tokens || 0);
    const oneHour = c.one_hour_cache_write_tokens || 0;
    const rates = [price.input, price.cache_write, price.cache_write_1h, price.cache_read, price.output]
      .map(v => v == null ? '—' : `$${String(parseFloat(v))}`).join(' · ');
    return { key, model: MODEL_NAMES[key] || key, requests: c.unique_requests, c, fiveMinute, oneHour, rates };
  });
}

export default function CodingAgentFeatureEval() {
  const { experiment, runs, rubric_items } = data;
  const byScore = [...runs].sort((a, b) => b.score - a.score);
  return <Layout>
    <Head>
      <title>{TITLE} | Ivan Braun</title><meta name="description" content={DESCRIPTION} /><link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="article" /><meta property="og:title" content={TITLE} /><meta property="og:description" content={DESCRIPTION} /><meta property="og:url" content={PAGE_URL} />
      <meta name="twitter:card" content="summary" />
    </Head>
    <article className="subscription-article eval-article">
      <h1>{TITLE}</h1>
      <p className="intro">One real feature from a private repo, given to six agent setups on the same base commit in isolated worktrees: rebuild <a href="https://usabruno.com/">Bruno&rsquo;s public chat bot</a> so a price question runs the site&rsquo;s real solar estimator in conversation form. One reviewer graded every branch on a 10-item rubric, each item scored 0 to 2 and halved to a 10-point maximum, with file-level evidence, and re-ran the tests. Self-reports were treated as claims, not evidence.</p>
      <ModelEvalChart runs={runs} />
      <div className="reading">
        <section>
          <h2>Results</h2>
          <div className="table-scroll">
            <table className="results-table"><thead><tr><th>Run</th><th className="num">Score</th><th className="num">Wall time</th><th className="num">Tokens</th><th className="num">API $</th><th className="num">Subscription $</th><th className="num">Weekly share</th></tr></thead>
              <tbody>{byScore.map(r => <tr key={r.id}>
                <td>{r.label}</td><td className="num">{fmt.score(r.score / 2)}</td><td className="num">{fmt.minutes(r.wall_min)}</td>
                <td className="num">{fmt.tokens(totalTokens(r))}</td>
                <td className="num">{fmt.money(r.api_usd)}</td><td className="num">{fmt.money(r.sub_usd)}</td><td className="num">{fmt.pct(r.weekly_share_pct)}</td>
              </tr>)}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2>The rubric</h2>
          <ol>{rubric_items.map((item, i) => <li key={i}>{item}</li>)}</ol>
        </section>
        <section className="conclusions">
          <h2>What it means</h2>
          <ol>
            <li><strong>Sonnet 5 medium is off the ladder, and off the frontier.</strong> 7 out of 10, tied for slowest at 41 minutes, and two shipping bugs the others do not have: an ARS total labelled USD, and bill answers that never reach sizing. It is not the most expensive, though: an estimated $0.78 of subscription per task against Fable&rsquo;s $0.85 — Fable just scores 9.75 against 7.</li>
            <li><strong>The quality ceiling costs about 85 cents per task on the $100 Claude plan.</strong> Fable 5.1 low scored 9.75 for an estimated $0.85. Opus 5 low scored 9.5 for $1.07 — dominated this round: Fable was both better and cheaper.</li>
            <li><strong>GLM 5.3 via Claude Code is the frontier&rsquo;s middle point: 9 out of 10 for about 24 cents.</strong> GLM 5.3 via ZCode scored 8.75 for $0.38 — but that is two sessions combined on the one graded branch ($0.21 and $0.17 individually). The shared 8.75 belongs to neither session alone, and the pair does not establish which harness is cheaper.</li>
            <li><strong>I measured GLM&rsquo;s weekly allowance, the number the <a href="/coding-agent-subscription-costs/">subscription article</a> was missing.</strong> Three separate 429 windows, $250 to $510 API-equivalent burned per window, about $300 per week on the Pro annual plan.</li>
            <li><strong>That measurement doubles the article&rsquo;s Pro estimate.</strong> The subscription-costs article assumed a $648 per month API-equivalent midpoint for the GLM Pro plan; the measured windows support about $1,300 per month.</li>
            <li><strong>Codex GPT-6 Astra low is the cheapest and fastest — 14 minutes, about 17 cents, 0.4% of a week — and scored 7.75.</strong> Cheapest is a position on the cost axis, not a quality claim: its parsers were too strict so ordinary Spanish answers fell through to the LLM, and it stopped at the geocoder wall the others routed around, so it never produced a live report link.</li>
            <li><strong>The cost-quality frontier is Codex Astra low → GLM 5.3 via Claude Code → Fable 5.1 low.</strong> Opus 5 low, Sonnet 5 medium and GLM via ZCode are dominated on this view. One feature, one run each — scoped to this evaluation, not a universal model ranking.</li>
          </ol>
        </section>
      </div>
      <section className="cost-section">
        <h2>How the cost is computed</h2>
        <p>API-equivalent dollars price every token at its own model&rsquo;s list rate — five-minute and one-hour cache writes separately — including the automatic Opus&nbsp;4.7 security-review calls recorded inside each run; estimated subscription dollars apply each component&rsquo;s plan multiplier (monthly fee ÷ monthly API-equivalent allowance) to its own API dollars and sum them; share of one week is the subscription estimate ÷ monthly fee × 4.33. These are modeled allocations of a subscription, not observed per-task charges.</p>
        <div className="table-scroll">
          <table className="cost-table">
            <thead><tr>
              <th>Run</th><th className="num">API-equivalent $</th><th>Plan and fee</th><th className="num">Monthly allowance</th><th className="num">Effective multiplier</th><th className="num">Subscription $</th><th className="num">Share of a week</th>
            </tr></thead>
            <tbody>{byScore.map(r => { const p = planOf(r, experiment); return <tr key={r.id}>
              <td>{r.label}</td><td className="num">{fmt.money(r.api_usd)}</td><td>{p.plan_label}</td>
              <td className="num">${fmt.int(p.allowance)}</td><td className="num">{fmt.ratio(r.sub_usd / r.api_usd)}</td>
              <td className="num">{fmt.money(r.sub_usd)}</td><td className="num">{fmt.pct(r.weekly_share_pct)}</td>
            </tr>; })}</tbody>
          </table>
        </div>
        <p>Every model that touched the run, at its own rates. Cache writes are split by their real TTL; &ldquo;automatic review&rdquo; rows are the harness&rsquo;s own security-review calls, kept as overhead.</p>
        <div className="table-scroll">
          <table className="cost-table">
            <thead><tr>
              <th>Run</th><th>Model</th><th className="num">Requests</th>
              <th className="num">Fresh input</th><th className="num">5m write</th><th className="num">1h write</th><th className="num">Cached read</th><th className="num">Output</th>
              <th>List $/M (in · 5m · 1h · cached · out)</th><th className="num">API $</th><th className="num">Subscription $</th>
            </tr></thead>
            <tbody>{byScore.map(r => componentRows(r, experiment).map(row => <tr key={r.id + row.key}>
              <td>{r.label}</td><td>{row.model}</td><td className="num">{row.requests == null ? '—' : row.requests}</td>
              <td className="num">{fmt.tokens(row.c.tokens.input)}</td><td className="num">{fmt.tokens(row.fiveMinute)}</td>
              <td className="num">{fmt.tokens(row.oneHour)}</td><td className="num">{fmt.tokens(row.c.tokens.cache_read)}</td><td className="num">{fmt.tokens(row.c.tokens.output)}</td>
              <td>{row.rates}</td><td className="num">{fmt.money(row.c.api_usd)}</td><td className="num">{fmt.money(row.c.sub_usd)}</td>
            </tr>))}</tbody>
          </table>
        </div>
      </section>
      <div className="reading method">
        <section>
          <h2>Method</h2>
          <p>Token counts are each session&rsquo;s own counters, priced at the provider&rsquo;s list rates, re-audited from the raw logs: repeated assistant records (session resumes, multi-block messages) are deduplicated by message id — 248 duplicated records removed for Sonnet, 118 for Fable, 162 for Opus, 192 for GLM via Claude Code; the harness&rsquo;s automatic security-review calls to Opus&nbsp;4.7 are kept as run overhead and priced at Opus rates; cache writes are priced at their real five-minute and one-hour tiers; Codex and ZCode fresh input is reported after subtracting cached input; GLM via Claude Code uses the session&rsquo;s final aggregate usage. Efforts as run: Fable low, Opus low, Sonnet medium, Codex Astra low; GLM 5.3 ran at each harness&rsquo;s default, the closest like-for-like available — Claude Code with the model&rsquo;s own interleaved thinking on, ZCode with its max reasoning variant. The $100 Claude allowance is one quarter of the $7,000 (Opus) and $7,500 (Fable) measured on the $200 plan. The GLM allowance is measured on this account: $250 to $510 API-equivalent burned per weekly window before the 429, in three windows between 17 August and 6 September 2026, about $1,300 per month on the Pro annual plan. The Codex allowance is the <a href="/coding-agent-subscription-costs/">subscription article</a>&rsquo;s central case. The plan allowances are inherited estimates, not remeasured in this audit — if their original extraction shared the duplicate-summation bug, these subscription dollars would shift with them. The full protocol — redacted task prompt, rubric, per-run data, the agents&rsquo; own reports and the session-log extraction scripts — is <a href="https://github.com/visualpharm/coding-agent-feature-eval">published on GitHub</a>; the host repository is private, so the exact task cannot be re-run from it.</p>
        </section>
      </div>
    </article>
    <style jsx global>{`
      body { text-wrap:pretty; }
      .eval-article {max-width:1296px;margin:0 auto;padding:40px 28px 64px;color:#252525;font:18px/1.6 system-ui,sans-serif;}
      .eval-article h1 {font:600 36px/1.2 system-ui,sans-serif;max-width:900px;margin:0 0 20px;text-wrap:balance;}
      .eval-article .intro {max-width:780px;}
      .eval-article .reading {max-width:780px;margin:40px auto 0;}
      .eval-article .reading.method {margin-top:0;}
      .eval-article h2 {font:600 24px/1.3 system-ui,sans-serif;margin:40px 0 16px;text-wrap:balance;}
      .eval-article p {margin:0 0 20px;}
      .eval-article strong {font-weight:600;}
      .eval-article a {color:#344abb;text-decoration:none;}
      .eval-article a:hover {color:#5064cf;text-decoration:none;}
      .eval-article a:focus-visible {outline:2px solid currentColor;outline-offset:4px;}
      .eval-article ul,.eval-article ol {padding-left:24px;margin:20px 0 28px;}
      .eval-article ul {list-style:disc;}.eval-article ol {list-style:decimal;}.eval-article li {margin:0 0 14px;}
      .eval-article .cost-section {margin:40px 0 0;}
      .eval-article .cost-section p {max-width:780px;}
      .eval-article .table-scroll {overflow-x:auto;-webkit-overflow-scrolling:touch;margin:24px 0;}
      .eval-article table {width:100%;border-collapse:collapse;font-size:17px;font-variant-numeric:tabular-nums;}
      .eval-article th,.eval-article td {text-align:left;vertical-align:top;padding:12px 16px 12px 0;border-bottom:1px solid #ddd;white-space:nowrap;}
      .eval-article th:last-child,.eval-article td:last-child {padding-right:0;}
      .eval-article th {font-weight:600;}
      .eval-article th.num,.eval-article td.num {text-align:right;}
      .eval-article .cost-table {font-size:16px;}
      .eval-article .cost-table th {white-space:normal;vertical-align:bottom;min-width:64px;}
      @media(max-width:700px) {
        .eval-article {padding:28px 20px 48px;}
        .eval-article h1 {font-size:30px;}
        .eval-article .table-scroll {margin-left:-20px;margin-right:-20px;padding:0 20px;}
        .eval-article table {font-size:16px;}
        .eval-article th,.eval-article td {padding:10px 14px 10px 0;}
      }
    `}</style>
  </Layout>;
}
