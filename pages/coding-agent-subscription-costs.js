import Head from 'next/head';
import Layout from '../components/Layout';
import CodingAgentComparison from '../components/CodingAgentComparison';
import article from '../data/coding-subscriptions.json';
import data from '../public/coding-subscriptions/estimates.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-subscription-costs/';
const TITLE = 'What coding agents cost on a subscription';
const DESCRIPTION = 'Artificial Analysis coding-agent results beside subscription-adjusted costs, updated with current agent configurations and explicitly dated capacity scenarios.';
const money = n => n == null ? 'Unknown' : `$${n.toFixed(3)}`;

export default function CodingAgentSubscriptionCosts() {
  return <Layout>
    <Head>
      <title>{TITLE} | Ivan Braun</title><meta name="description" content={DESCRIPTION} /><link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="article" /><meta property="og:title" content={TITLE} /><meta property="og:description" content={DESCRIPTION} /><meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content="https://aiandtractors.com/coding-subscriptions/chart.png?v=12" /><meta property="og:image:width" content="2800" /><meta property="og:image:height" content="1820" /><meta name="twitter:card" content="summary_large_image" />
    </Head>
    <article className="subscription-article">
      <h1>{TITLE}</h1>
      <p className="intro">Artificial Analysis’s current agent benchmark: published API costs beside conditional subscription scenarios. Updated 1 October 2026.</p>
      <CodingAgentComparison models={data.models} />
      <p className="view-note">Linear axes. The frontier extends to 50 to include GLM and Kimi; API costs extend to $16, and subscription estimates to $1.05 so every shape anchor uses its actual cost. Sensitivity ranges and full configurations are in the methodology. All 31 configurations remain below.</p>
      <nav className="article-links" aria-label="Comparison files">
        <a href="https://artificialanalysis.ai/agents/coding-agents">Artificial Analysis original</a>
        <a href="/coding-subscriptions/chart.png?v=12">Desktop PNG</a>
        <a href="/coding-subscriptions/chart-phone.png?v=12">Phone PNG</a>
        <a href="/coding-subscriptions/aa-agent-snapshot.json">Benchmark snapshot</a>
        <a href="/coding-subscriptions/usage.png?v=6">Usage graph</a>
        <a href="/coding-subscriptions/estimates.json">Calculation data</a>
        <a href="/coding-subscriptions/calculation-audit.json">Calculation audit</a>
        <a href="/coding-subscriptions/cost-differences.json">API → subscription differences</a>
        <a href="/coding-subscriptions/usage-evidence.json">Reported usage evidence</a>
        <a href="/terminal-bench-subscriptions/chart.png">Terminal-Bench comparison</a>
      </nav>
      <div className="reading">
        <section>
          <h2>API and subscription pricing change the order</h2>
          <p>The shape connects one best scored configuration per provider from the subset with a subscription scenario: Fable, Astra, GLM and Kimi. The same four harness/model/effort configurations appear in both panels, connected in descending score order without crossings. The overall best Anthropic and OpenAI results, Sonnet 5.5 and GPT-6.1 Sol, have unknown subscription costs and remain separate small API dots. The polygon is a comparison guide, not an area or volume metric.</p>
          <p>Among the four matched configurations with conditional full-use estimates, Astra moves from third-cheapest by API cost to first by subscription estimate; Fable moves from fourth to second. GLM moves from first to third, and Kimi from second to fourth. Cost ratios and the rank comparison are in the calculation download. These ranks compare the four central scenarios; their sensitivity ranges can change the ordering.</p>
          <p>The latest Sonnet 5.5, Opus 5.5 and GPT-6.1 Sol agent results are on the API panel. Their subscription costs remain unknown, so this evidence does not establish a subscription winner among the newest models.</p>
          <h2>What changed on 1 October</h2>
          <p><strong>31 published configurations, with one current Coding Agent Index v1.5 snapshot.</strong> The chart shows 11 available default variants in a 50–72 frontier view. Qwen and DeepSeek remain in the full dataset below. Sonnet 5.5, Opus 5.5, GPT-6.1 Sol, Grok 4.7, Muse Spark 1.3 and GLM-5.3 now appear with their actual agent configurations.</p>
          <p>Sonnet 5.5 max scores 68.36 at $14.191 per API attempt; Opus 5.5 max scores 65.99 at $13.036; Codex / GPT-6.1 Sol xhigh scores 62.91 at $1.040. Different effort settings can change both score and cost substantially. The full table includes all settings.</p>
          <p><strong>Subscription cost is unknown for seven of the 11 configurations in the frontier view.</strong> New model generations and Devin Fusion configurations do not inherit September’s quotas. Astra, Fable and Kimi retain explicitly dated community scenarios; their ranges are not confidence intervals or verified October allowances.</p>
          <p>The benchmark changed its task suite and grading. <a href="https://artificialanalysis.ai/methodology/coding-agents-benchmarking">AA’s version history</a> explains the change. <a href="/coding-subscriptions/archive/2026-09-06/estimates.json">September’s 21 configurations</a> remain archived separately.</p>
        </section>
        <section>
          <h2>GLM-5.3 now has an agent result</h2>
          <p><strong>OpenCode / GLM-5.3 max: 53.55 points and $4.241 per API attempt.</strong> This is a complete AA agent result, with its own harness and effort setting.</p>
          <p>Applying <a href="https://docs.z.ai/devpack/overview">z.ai’s published Pro credits</a> to AA’s pooled token counters gives an approximate full-use scenario of <strong>$0.414 per attempt entirely off peak, or $0.829 entirely at peak</strong>, using the $80 standard fee. This assumes identical token mix, full weekly use and no MCP consumption; five-hour limits can reduce achievable usage.</p>
          <p>The <a href="https://zcode.z.ai/en">advertised $56 Pro offer</a> would lower the off-peak scenario to $0.290. Regular peak hours are only weekdays 14:00–18:00 Singapore time (UTC+8); the rest of the week is off peak. The temporary all-day campaign ends 7 October. Neither temporary offer is extrapolated into a whole month in the chart. See the methodology for a conflicting older plan-price example.</p>
          <h2>What users report consuming</h2>
          <p>A <a href="https://www.reddit.com/r/ZaiGLM/comments/1w4eg4b/comment/p773rtu/">Lite subscriber’s first-hand report</a> puts an $18 monthly plan alongside 30–45M tokens, 500–600 calls and 3,400–5,700 credits over roughly three days. That is <strong>34–57% of the 10,000-credit weekly pool</strong> (reported as 35–57%), with 95% off-peak use. The workload mixes 43% GLM-5.3 with 57% Flash through Hermes.</p>
          <p>The author estimates August’s workload at $35–55 of API value and projects $95–165 per month at full use. These are reported API-equivalent valuations, not a measured subscription allowance or a payment for the three-day sample. The mixed models, broad ranges and unclear cache denominators prevent using this as an exact GLM-5.3 benchmark calibration.</p>
          <table className="evidence-table"><thead><tr><th>Plan / monthly fee</th><th>Reported API-equivalent use</th><th>Share and limitation</th></tr></thead><tbody>
            <tr><td><a href="https://www.reddit.com/r/codex/comments/1wtlkg6/gpt_61_brought_another_nerf_to_usage_table_update/">Codex Plus · $20</a></td><td data-label="Use">$7.50 with GPT-6.1 Sol</td><td data-label="Share">One fresh 5-hour limit test. Weekly/monthly values are projections; Pro was not measured.</td></tr>
            <tr><td><a href="https://www.remakebench.com/capacity/plans/claude-max-20x">Claude · owner reports $200 Max</a></td><td data-label="Use">$1,249.83; 96.3% Opus 5.5</td><td data-label="Share">58% of a weekly pool. App says Pro; plan identity and missing activity remain unresolved.</td></tr>
            <tr><td><a href="https://www.remakebench.com/capacity/plans/supergrok-heavy">SuperGrok Heavy · $300</a></td><td data-label="Use">$76.10; mostly Grok 4.7 XHigh</td><td data-label="Share">Meter rose 56% → 75%: 19 percentage points of a shared weekly pool.</td></tr>
            <tr><td><a href="https://www.reddit.com/r/ClaudeAI/comments/1wtagdd/sonnet_55_did_this_opus_55_quality_with_half_price/">Claude Max 20× · Sonnet 5.5</a></td><td data-label="Use">$30.46 for a 30-second coded video</td><td data-label="Share">Transcript valuation. A reliable quota denominator was not established.</td></tr>
          </tbody></table>
          <p>Dollar figures above value logged tokens at API prices; they are not charges for the sample. We keep these reports outside the main shape calibration. <a href="https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers">OpenAI now gives new Pro 200 subscriptions a lower allowance</a>; eligible existing users keep the old allowance only through 29 October. The chart’s September scenario does not establish today’s new-buyer capacity.</p>
          <p>The <a href="/terminal-bench-subscriptions/chart.png">separate Terminal-Bench comparison</a> remains a historical artifact with its own task percentages and assumptions; its values do not supply this index’s scores.</p>
        </section>
        <section className="usage-chart" aria-labelledby="usage-title">
          <h2 id="usage-title">Our recorded usage</h2>
          <p>Historical consumption, audited 6 September. These totals do not establish included subscription allowances.</p>
          {data.own_usage.map(r => <div className="usage-row" key={r.key}>
            <div><strong>{r.label}</strong><strong>${r.api_value_usd.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong></div>
            <p>{r.period_label}</p><p>{r.scope_label}</p>
            <div className="usage-track"><span style={{width:`${r.api_value_usd / 20000 * 100}%`}} /></div>
          </div>)}
        </section>
        <details>
          <summary>Full dataset · {data.models.length} current configurations</summary>
          <table><thead><tr><th>Agent configuration</th><th>Score</th><th>API / task</th><th>Estimated subscription / task</th></tr></thead>
            <tbody>{[...data.models].sort((a,b)=>b.score-a.score).map(r => <tr key={r.short}>
              <td>{r.label}{r.unavailable ? ' (AA: unavailable)' : ''}</td><td data-label="Score">{r.score == null ? 'Unknown' : r.score.toFixed(2)}</td><td data-label="API / task">{money(r.api)}</td><td data-label="Subscription / task">{money(r.price)}{r.price != null ? (r.group === 'GLM' ? ' · credit scenario' : ' · September proxy') : ''}</td>
            </tr>)}</tbody>
          </table>
        </details>
        <details><summary>Assumptions, calculations and sources</summary>
          <div className="methodology" dangerouslySetInnerHTML={{__html:article.html}} />
          <section id="sources"><h2>Sources</h2><ol>{article.references.map(ref => <li key={ref.url}><a href={ref.url}>{ref.title}</a></li>)}</ol></section>
        </details>
      </div>
    </article>
    <style jsx global>{`
      body { text-wrap:pretty; }
      .subscription-article {max-width:1296px;margin:0 auto;padding:40px 28px 64px;color:#252525;font:18px/1.6 system-ui,sans-serif;}
      .subscription-article h1 {font:600 36px/1.2 system-ui,sans-serif;max-width:900px;margin:0 0 20px;text-wrap:balance;}
      .subscription-article .view-note {max-width:780px;margin:24px auto 0;font-size:16px;}
      .subscription-article .intro {max-width:780px;}
      .subscription-article .reading {max-width:780px;margin:40px auto 0;}
      .subscription-article h2 {font:600 24px/1.3 system-ui,sans-serif;margin:40px 0 16px;text-wrap:balance;}
      .subscription-article .agent-panels h2 {font-size:22px;margin:0 0 14px;}
      .subscription-article p {margin:0 0 20px;}
      .subscription-article strong {font-weight:600;}
      .subscription-article a {color:#344abb;text-decoration:none;}
      .subscription-article .reading a {text-decoration:underline;text-underline-offset:3px;}
      .subscription-article a:hover {color:#5064cf;text-decoration:none;}
      .subscription-article a:focus-visible,.subscription-article summary:focus-visible {outline:2px solid currentColor;outline-offset:4px;}
      .subscription-article .article-links {display:flex;gap:18px 28px;flex-wrap:wrap;margin:28px 0;}
      .subscription-article .pool {margin:24px 0;}
      .subscription-article .pool div,.subscription-article .usage-row>div:first-child {display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;}
      .subscription-article progress {width:100%;height:9px;display:block;margin-top:12px;appearance:none;border:0;background:#e3e3e3;border-radius:0;}
      .subscription-article progress::-webkit-progress-bar {background:#e3e3e3;}
      .subscription-article progress::-webkit-progress-value {background:#785190;}
      .subscription-article progress::-moz-progress-bar {background:#785190;}
      .subscription-article .usage-row {margin:28px 0;font-variant-numeric:tabular-nums;}
      .subscription-article .usage-row p {font-size:17px;margin:4px 0;}
      .subscription-article .usage-track {height:9px;margin:12px 0;background:#f0f0f0;}
      .subscription-article .usage-track span {display:block;height:9px;background:#326b97;min-width:2px;}
      .subscription-article details {border-top:1px solid #d9d9d9;margin:28px 0;padding:20px 0 0;}
      .subscription-article summary {font-size:20px;font-weight:600;cursor:pointer;}
      .subscription-article ul,.subscription-article ol {padding-left:24px;margin:20px 0 28px;}
      .subscription-article ul {list-style:disc;}.subscription-article ol {list-style:decimal;}.subscription-article li {margin:0 0 14px;}
      .subscription-article table {width:100%;border-collapse:collapse;margin:24px 0;font-size:17px;}
      .subscription-article th,.subscription-article td {text-align:left;vertical-align:top;padding:12px 12px 12px 0;border-bottom:1px solid #ddd;}
      .subscription-article th {font-weight:600;}
      .subscription-article td:not(:first-child) {font-variant-numeric:tabular-nums;}
      @media(max-width:700px) {
        .subscription-article {padding:28px 20px 48px;}
        .subscription-article h1 {font-size:30px;}
        .subscription-article table {width:calc(100% + 40px);margin-left:-20px;padding:0 20px;}
        .subscription-article table,.subscription-article tbody,.subscription-article tr,.subscription-article td {display:block;}
        .subscription-article thead {display:none;}
        .subscription-article tr {padding:16px 0;border-bottom:1px solid #ddd;}
        .subscription-article td {padding:3px 0;border:0;}
        .subscription-article td:first-child {font-weight:600;margin-bottom:6px;}
        .subscription-article td:not(:first-child)::before {content:attr(data-label) ': ';font-weight:400;}
      }
    `}</style>
  </Layout>;
}
