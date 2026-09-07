import Head from 'next/head';
import Layout from '../components/Layout';
import ModelEvalChart from '../components/ModelEvalChart';
import data from '../public/model-eval/experiment-data.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-feature-eval/';
const fmtScore = v => String(parseFloat(v.toFixed(2)));
const TITLE = 'Six coding agents, one real feature';
const DESCRIPTION = 'A real feature from a private repo given to six agent setups on the same base commit. One reviewer graded all branches on a 10-item rubric scored 0 to 1 per item, with file-level evidence, and re-ran the tests.';

export default function CodingAgentFeatureEval() {
  const { experiment, runs, rubric_items } = data;
  return <Layout>
    <Head>
      <title>{TITLE} | Ivan Braun</title><meta name="description" content={DESCRIPTION} /><link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="article" /><meta property="og:title" content={TITLE} /><meta property="og:description" content={DESCRIPTION} /><meta property="og:url" content={PAGE_URL} />
      <meta name="twitter:card" content="summary" />
    </Head>
    <article className="subscription-article eval-article">
      <h1>{TITLE}</h1>
      <p className="intro">One real feature from a private repo, given to six agent setups on the same base commit in isolated worktrees: rebuild Bruno's public chat bot so a price question runs the site's real solar estimator in conversation form. One reviewer graded every branch on a 10-item rubric, each item scored 0 to 1, for a maximum of 10, with file-level evidence, and re-ran the tests. Self-reports were treated as claims, not evidence.</p>
      <ModelEvalChart runs={runs} rubricItems={rubric_items} />
      <div className="reading">
        <section>
          <h2>Results</h2>
          <table><thead><tr><th>Run</th><th>Score</th><th>Wall time</th><th>API $</th><th>Subscription $</th><th>Weekly share</th></tr></thead>
            <tbody>{[...runs].sort((a, b) => b.score - a.score).map(r => <tr key={r.id}>
              <td>{r.label}</td><td data-label="Score">{fmtScore(r.score / 2)}</td><td data-label="Wall time">{r.wall_min} min</td>
              <td data-label="API $">${r.api_usd.toFixed(2)}</td><td data-label="Subscription $">${r.sub_usd.toFixed(2)}</td><td data-label="Weekly share">{r.weekly_share_pct}%</td>
            </tr>)}
            </tbody>
          </table>
        </section>
        <section>
          <h2>The rubric</h2>
          <p>Each item scored 0 to 1, half points allowed. Maximum 10.</p>
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
        <details><summary>Method and assumptions</summary>
          <h2>Prices per million tokens</h2>
          <table><thead><tr><th>Model</th><th>Input</th><th>Output</th><th>Cache read</th><th>Cache write</th></tr></thead>
            <tbody>{Object.entries(experiment.prices_per_million).map(([model, p]) => <tr key={model}>
              <td>{model}</td><td data-label="Input">${p.input}</td><td data-label="Output">${p.output}</td><td data-label="Cache read">${p.cache_read}</td><td data-label="Cache write">${p.cache_write}</td>
            </tr>)}</tbody>
          </table>
          <h2>Allowances</h2>
          <table><thead><tr><th>Plan</th><th>Monthly fee</th><th>Monthly API-equivalent</th><th>Source</th></tr></thead>
            <tbody>{Object.entries(experiment.allowances).map(([plan, a]) => <tr key={plan}>
              <td>{plan}</td><td data-label="Monthly fee">${a.fee_usd}</td><td data-label="Monthly API-equivalent">${a.monthly_api_equiv_usd.toLocaleString('en-US')}</td><td data-label="Source">{a.source}</td>
            </tr>)}</tbody>
          </table>
          <p>API-equivalent dollars come from each session's own token counters at list prices. Subscription dollars per task = API dollars × monthly plan fee / monthly API-equivalent allowance, the method of the <a href="/coding-agent-subscription-costs/">subscription article</a>.</p>
          <p>Two caveats. The $100 Claude allowance is one quarter of the measured $200 plan, scaled down, not measured directly. The GLM per-task figure has a wide band: the weekly allowance itself varied from $250 to $510 API-equivalent across the three windows.</p>
        </details>
      </div>
    </article>
    <style jsx global>{`
      body { text-wrap:pretty; }
      .eval-article {max-width:1296px;margin:0 auto;padding:40px 28px 64px;color:#252525;font:18px/1.6 system-ui,sans-serif;}
      .eval-article h1 {font:600 36px/1.2 system-ui,sans-serif;max-width:900px;margin:0 0 20px;text-wrap:balance;}
      .eval-article .intro {max-width:780px;}
      .eval-article .reading {max-width:780px;margin:40px auto 0;}
      .eval-article h2 {font:600 24px/1.3 system-ui,sans-serif;margin:40px 0 16px;text-wrap:balance;}
      .eval-article details h2 {font-size:20px;margin:28px 0 12px;}
      .eval-article p {margin:0 0 20px;}
      .eval-article strong {font-weight:600;}
      .eval-article a {color:#344abb;text-decoration:none;}
      .eval-article a:hover {color:#5064cf;text-decoration:none;}
      .eval-article a:focus-visible,.eval-article summary:focus-visible {outline:2px solid currentColor;outline-offset:4px;}
      .eval-article details {border-top:1px solid #d9d9d9;margin:28px 0;padding:20px 0 0;}
      .eval-article summary {font-size:20px;font-weight:600;cursor:pointer;}
      .eval-article ul,.eval-article ol {padding-left:24px;margin:20px 0 28px;}
      .eval-article ul {list-style:disc;}.eval-article ol {list-style:decimal;}.eval-article li {margin:0 0 14px;}
      .eval-article table {width:100%;border-collapse:collapse;margin:24px 0;font-size:17px;}
      .eval-article th,.eval-article td {text-align:left;vertical-align:top;padding:12px 12px 12px 0;border-bottom:1px solid #ddd;}
      .eval-article th {font-weight:600;}
      .eval-article td:not(:first-child) {font-variant-numeric:tabular-nums;}
      @media(max-width:700px) {
        .eval-article {padding:28px 20px 48px;}
        .eval-article h1 {font-size:30px;}
        .eval-article table,.eval-article tbody,.eval-article tr,.eval-article td {display:block;}
        .eval-article thead {display:none;}
        .eval-article tr {padding:16px 0;border-bottom:1px solid #ddd;}
        .eval-article td {padding:3px 0;border:0;}
        .eval-article td:first-child {font-weight:600;margin-bottom:6px;}
        .eval-article td:not(:first-child)::before {content:attr(data-label) ': ';font-weight:400;}
      }
    `}</style>
  </Layout>;
}
