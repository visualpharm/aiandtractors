import Head from 'next/head';
import Layout from '../components/Layout';
import CodingAgentComparison from '../components/CodingAgentComparison';
import article from '../data/coding-subscriptions.json';
import data from '../public/coding-subscriptions/estimates.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-subscription-costs/';
const TITLE = 'What coding agents cost on a subscription';
const DESCRIPTION = 'Artificial Analysis coding-agent results beside subscription-adjusted costs, including our Cursor Pro data and audited GLM 5.3 usage.';
const money = n => n == null ? 'Not established' : `$${n.toFixed(3)}`;

export default function CodingAgentSubscriptionCosts() {
  return <Layout>
    <Head>
      <title>{TITLE} | Ivan Braun</title><meta name="description" content={DESCRIPTION} /><link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="article" /><meta property="og:title" content={TITLE} /><meta property="og:description" content={DESCRIPTION} /><meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content="https://aiandtractors.com/coding-subscriptions/chart.png?v=8" /><meta property="og:image:width" content="2800" /><meta property="og:image:height" content="1820" /><meta name="twitter:card" content="summary_large_image" />
    </Head>
    <article className="subscription-article">
      <h1>{TITLE}</h1>
      <p className="intro">Artificial Analysis’s coding-agent benchmark, priced two ways: its original API costs and our estimates for subscription users.</p>
      <CodingAgentComparison models={data.models} />
      <nav className="article-links" aria-label="Comparison files">
        <a href="https://artificialanalysis.ai/agents/coding-agents">Artificial Analysis original</a>
        <a href="/coding-subscriptions/chart.png?v=8">Comparison image</a>
        <a href="/coding-subscriptions/usage.png?v=6">Usage graph</a>
        <a href="/coding-subscriptions/estimates.json">Calculation data</a>
        <a href="/terminal-bench-subscriptions/chart.png">Terminal-Bench comparison</a>
      </nav>
      <div className="reading">
        <section className="conclusions">
          <h2>Conclusions</h2>
          <p>API price versus our estimated subscription price:</p>
          <ol>
            <li>A $12 API task costs about 30 cents on a subscription.</li>
            <li>Kimi is ridiculously expensive. About 14.5× Astra Low, with almost the same benchmark score.</li>
            <li>Grok isn’t cheaper than Astra High. It’s expensive. A worse Astra.</li>
            <li>Are Claude’s couple of extra index points worth 3× the price? (Opus 5 xhigh versus Astra High.)</li>
          </ol>
        </section>
        <section>
          <h2>GLM 5.3: used, but not yet scored here</h2>
          <p><strong>Our logs contain 233.75 million GLM 5.3 tokens, worth $75.49 at API rates.</strong> That is part of 617.14 million tokens and $194.67 across the GLM family, recorded from 10 August to 5 September 2026.</p>
          <p>I rechecked all 68 <a href="https://artificialanalysis.ai/agents/coding-agents">Artificial Analysis coding-agent results</a> on 6 September 2026. The GLM entries are 5.1 and 5.2. <a href="https://artificialanalysis.ai/models/glm-5-3">GLM 5.3 has a separate model benchmark</a>, but no published agent score in that dataset.</p>
          <p>Hitting a GLM plan limit confirms quota use; it cannot fill in the missing benchmark score.</p>
          <p><a href="https://www.tbench.ai/">Terminal-Bench 4.0</a> does publish a matched Claude Code / GLM 5.3 max result: <strong>41.82% of tasks resolved.</strong> The <a href="/terminal-bench-subscriptions/chart.png">separate comparison</a> uses its own scores and API costs with our existing subscription assumptions. Its percentages are not Artificial Analysis index points.</p>
          <p><a href="/terminal-bench-subscriptions/chart.svg">Terminal-Bench vector image</a> · <a href="/terminal-bench-subscriptions/estimates.json">Terminal-Bench calculations and scope</a></p>
        </section>
        <section>
          <h2>Our Cursor Pro subscription</h2>
          <p><strong>$20 for the 10 August–10 September 2026 cycle.</strong> Our billing page and paid invoice confirm the plan. The two usage pools are separate:</p>
          <div className="pool"><div><span>Cursor Models</span><strong>100% used</strong></div><progress max="100" value="100" aria-label="Cursor Models: 100 percent used" /></div>
          <div className="pool"><div><span>Other Models</span><strong>88.8% used</strong></div><progress max="100" value="88.8" aria-label="Other Models: 88.8 percent used" /></div>
          <p><strong>Composer 2.5 Fast: about $0.066 per benchmark task, at 38.30 points.</strong> This is a conditional estimate from five recorded calls and their displayed quota use. Its $0.062–$0.070 range covers percentage rounding only; workload and quota uncertainty are wider.</p>
          <p>Artificial Analysis’s original API cost is $0.557. For the subscription calculation, we estimate $1.522 from pooled benchmark token counters at <a href="https://cursor.com/docs/models-and-pricing">current Cursor rates</a>; our usage is valued at those same rates. The full $20 fee is assigned to this one alternative.</p>
          <p>The full dataset retains Cursor’s GPT-5.5 medium, Opus 4.7 medium and Composer 2.5 results outside this frontier view. Their subscription costs remain unpriced. Most of our Cursor tokens went to Grok, which has no matched Cursor CLI result in this agent dataset.</p>
        </section>
        <section className="usage-chart" aria-labelledby="usage-title">
          <h2 id="usage-title">Our recorded usage</h2>
          <p>API-equivalent consumption over the periods shown. These totals do not establish included subscription allowances.</p>
          {data.own_usage.map(r => <div className="usage-row" key={r.key}>
            <div><strong>{r.label}</strong><strong>${r.api_value_usd.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong></div>
            <p>{r.period_label}</p><p>{r.scope_label}</p>
            <div className="usage-track"><span style={{width:`${r.api_value_usd / 20000 * 100}%`}} /></div>
          </div>)}
        </section>
        <details>
          <summary>Full dataset · 21 configurations</summary>
          <table><thead><tr><th>Agent configuration</th><th>Score</th><th>API / task</th><th>Subscription / task</th></tr></thead>
            <tbody>{[...data.models].sort((a,b)=>b.score-a.score).map(r => <tr key={r.short}>
              <td>{r.benchmark_label || r.label}{r.historical ? ' (historical)' : ''}</td><td data-label="Score">{r.score.toFixed(2)}</td><td data-label="API / task">{money(r.api)}</td><td data-label="Subscription / task">{money(r.price)}</td>
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
      .subscription-article .intro {max-width:780px;}
      .subscription-article .reading {max-width:780px;margin:40px auto 0;}
      .subscription-article h2 {font:600 24px/1.3 system-ui,sans-serif;margin:40px 0 16px;text-wrap:balance;}
      .subscription-article .agent-panels h2 {font-size:22px;margin:0 0 14px;}
      .subscription-article p {margin:0 0 20px;}
      .subscription-article strong {font-weight:600;}
      .subscription-article a {color:#344abb;text-decoration:none;}
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
