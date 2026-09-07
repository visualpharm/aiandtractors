import Head from 'next/head';
import Layout from '../components/Layout';
import ModelEvalChart, { fmt, totalTokens } from '../components/ModelEvalChart';
import data from '../public/model-eval/experiment-data.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-feature-eval/';
const TITLE = 'Six coding agents, one real feature';
const DESCRIPTION = 'A real feature from a private repo given to six agent setups on the same base commit. One reviewer graded all branches on a 10-item rubric, each item scored 0 to 2 and halved to a 10-point maximum, with file-level evidence, and re-ran the tests.';
const PLAN_NAMES = { claude_max_100: 'Claude Max', glm_pro_annual: 'GLM Pro annual', codex_pro: 'Codex Pro' };

function costRow(r, experiment) {
  const p = experiment.prices_per_million[r.model];
  const a = experiment.allowances[r.plan];
  const allowance = r.model === 'claude-fable-5-1' && a.fable_monthly_api_equiv_usd ? a.fable_monthly_api_equiv_usd : a.monthly_api_equiv_usd;
  return { ...r, prices: p, plan_label: `${PLAN_NAMES[r.plan]}, $${a.fee_usd}`, fee: a.fee_usd, allowance, multiplier: a.fee_usd / allowance };
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
            <li><strong>Sonnet 5 medium is off the ladder.</strong> 7 out of 10, tied for slowest at 41 minutes, and two shipping bugs the others do not have: an ARS total labelled USD, and bill answers that never reach sizing.</li>
            <li><strong>The quality ceiling costs about $2 per task on the $100 Claude plan.</strong> Fable 5.1 low scored 9.75 for $1.88. Opus 5 low scored 9.5 for $2.14.</li>
            <li><strong>GLM 5.3 lands 0.75 to 1 point lower, at $0.38 to $0.54 per task.</strong> 8.75 and 9 out of 10. Its two runs beat Sonnet's by 1.75 and 2 points for a third of the subscription price.</li>
            <li><strong>I measured GLM's weekly allowance, the number the <a href="/coding-agent-subscription-costs/">subscription article</a> was missing.</strong> Three separate 429 windows, $250 to $510 API-equivalent burned per window, about $300 per week on the Pro annual plan.</li>
            <li><strong>That measurement doubles the article's Pro estimate.</strong> The subscription-costs article assumed a $648 per month API-equivalent midpoint for the GLM Pro plan; the measured windows support about $1,300 per month.</li>
            <li><strong>Codex Astra low was the fastest and cheapest by far (14 min, 17 cents, 0.4% of a week on the $200 plan) and had the cleanest code lane, but scored 7.75.</strong> Parsers too strict so ordinary Spanish answers fell through to the LLM, and it stopped at the geocoder wall the others routed around, so it never produced a live report link.</li>
          </ol>
        </section>
      </div>
      <section className="cost-section">
        <h2>How the cost is computed</h2>
        <p>API-equivalent $ = each token count × its list price per million; subscription $ per task = API-equivalent $ × plan fee ÷ monthly API-equivalent allowance; share of one week = API-equivalent $ ÷ (allowance ÷ 4.33).</p>
        <div className="table-scroll">
          <table className="cost-table">
            <thead><tr>
              <th>Run</th><th className="num">Fresh input</th><th className="num">Cache write</th><th className="num">Cached input</th><th className="num">Output</th>
              <th className="num">Input $/M</th><th className="num">Cache write $/M</th><th className="num">Cached $/M</th><th className="num">Output $/M</th>
              <th className="num">API $</th><th>Plan and fee</th><th className="num">Monthly allowance</th><th className="num">Multiplier</th><th className="num">Subscription $</th><th className="num">Share of a week</th>
            </tr></thead>
            <tbody>{byScore.map(r => costRow(r, experiment)).map(r => <tr key={r.id}>
              <td>{r.label}</td>
              <td className="num">{fmt.tokens(r.tokens.input)}</td><td className="num">{fmt.tokens(r.tokens.cache_write)}</td><td className="num">{fmt.tokens(r.tokens.cache_read)}</td><td className="num">{fmt.tokens(r.tokens.output)}</td>
              <td className="num">{fmt.price(r.prices.input)}</td><td className="num">{fmt.price(r.prices.cache_write)}</td><td className="num">{fmt.price(r.prices.cache_read)}</td><td className="num">{fmt.price(r.prices.output)}</td>
              <td className="num">{fmt.money(r.api_usd)}</td><td>{r.plan_label}</td><td className="num">${fmt.int(r.allowance)}</td><td className="num">{fmt.ratio(r.multiplier)}</td><td className="num">{fmt.money(r.sub_usd)}</td><td className="num">{fmt.pct(r.weekly_share_pct)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
      <div className="reading method">
        <section>
          <h2>Method</h2>
          <p>Token counts are each session's own counters, priced at the provider's list rates. Efforts as run: Fable low, Opus low, Sonnet medium, Codex Astra low; GLM 5.3 ran at each harness's default, the closest like-for-like available — Claude Code with the model's own interleaved thinking on, ZCode with its max reasoning variant. The $100 Claude allowance is one quarter of the $7,000 (Opus) and $7,500 (Fable) measured on the $200 plan. The GLM allowance is measured on this account: $250 to $510 API-equivalent burned per weekly window before the 429, in three windows between 17 August and 6 September 2026, about $1,300 per month on the Pro annual plan. The Codex allowance is the <a href="/coding-agent-subscription-costs/">subscription article</a>'s central case. The full protocol — redacted task prompt, rubric, per-run data, the agents' own reports and the session-log extraction scripts — is <a href="https://github.com/visualpharm/coding-agent-feature-eval">published on GitHub</a>; the host repository is private, so the exact task cannot be re-run from it.</p>
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
