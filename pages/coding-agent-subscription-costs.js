import Head from 'next/head';
import Layout from '../components/Layout';
import article from '../data/coding-subscriptions.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-subscription-costs/';
const TITLE = 'What coding agents cost on a subscription';
const DESCRIPTION = `Artificial Analysis redrawn with estimated subscription costs, plus audited Claude, Codex and GLM usage. Updated 6 September 2026 with ${article.references.length} sources.`;

export default function CodingAgentSubscriptionCosts() {
  return (
    <Layout>
      <Head>
        <title>{TITLE} | Ivan Braun</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://aiandtractors.com/coding-subscriptions/chart.png" />
        <meta property="og:image:width" content="2800" />
        <meta property="og:image:height" content="3500" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <article className="subscription-article">
        <header className="reading">
          <h1>{TITLE}</h1>
        </header>
        <div className="reading">
          <p>It always amuses me that coding agents get ranked by API token prices, while the rest of us are trying to squeeze another task out of a subscription.</p>
          <p>I redrew the <a href="https://artificialanalysis.ai/agents/coding-agents">Artificial Analysis chart</a> using estimated subscription costs per task, based on subscriber logs and community experiments.</p>
        </div>
        <figure className="chart">
          <a href="/coding-subscriptions/chart.png" aria-label="Full-resolution coding agent subscription chart">
            <picture>
              <source media="(max-width: 1100px)" srcSet="/coding-subscriptions/chart-phone.png" />
              <img src="/coding-subscriptions/chart.png" width="2800" height="3500" alt="Seventeen coding-agent configurations compared by Artificial Analysis Coding Agent Index and estimated subscription cost. Open squares show historical GLM 5.2 at 43.31 points and $0.236 per task, and GLM 5.1 at 36.91 points and $0.529, using current Pro quota scenarios. These are not GLM 5.3 results. Fable 5.1 is about 70.43 points and $0.245 with an older allowance proxy. All costs and ranges are scenarios." />
            </picture>
          </a>
        </figure>
        <figure className="chart usage-chart">
          <a href="/coding-subscriptions/usage.png" aria-label="Full-resolution recorded AI usage graph">
            <picture>
              <source media="(max-width: 900px)" srcSet="/coding-subscriptions/usage-phone.png" />
              <img src="/coding-subscriptions/usage.png" width="2240" height="1520" loading="lazy" alt="Recorded API-equivalent usage with periods: Claude mixed models in August, $19,380.10 priced subtotal; Codex Sol and Terra in August, $5,327.97 subtotal; Astra September 1–5, $1,462.00; GLM mixed models August 10–September 5, $194.67. These totals are consumption, not included subscription allowances." />
            </picture>
          </a>
        </figure>
        <div className="reading">
          <h2>What our own logs establish</h2>
          <p><strong>GLM delivered $194.67 of API-equivalent usage across 617.14M tokens.</strong> The 27-day total combines GLM 5.2, 5.3 and Turbo across two provider IDs. GLM 5.3 alone accounts for $75.49 and 233.75M tokens.</p>
          <p><strong>Claude and Codex totals do not establish a per-model allowance.</strong> Claude combines plans, models and paid overages; Codex requires fork-history deduplication. The personal totals stay separate from the subscription scenarios above.</p>
          <h2>Gemini, z.ai and Muse Code</h2>
          <ul>
            <li><strong>Gemini is now plotted through Antigravity:</strong> $0.037 per task for 3.7 Flash high and $0.053 for 3.8 Flash high on the $100 Ultra tier. These are provisional estimates using an assumed token mix and the native Antigravity SDK benchmark.</li>
            <li><strong>GLM is plotted with its historical agent results:</strong> 5.2 scores 43.31 and 5.1 scores 36.91 in Claude Code. The open squares use current $80 Pro quota scenarios, giving central estimates of $0.236 and $0.529 per task. The current plan routes both aliases to 5.3, whose agent score remains unavailable.</li>
            <li><strong>Muse Code has $5, $15 and $50 plans:</strong> I found paid-user tests, but no token count tied to quota consumption. Its cost per task remains unknown.</li>
          </ul>
          <h2>What changes when you use subscription prices</h2>
          <ul>
            <li><strong>Kimi is the most expensive in the central estimate:</strong> about $0.58 per task among the options I could price. The uncertainty ranges overlap.</li>
            <li><strong>Fable 5.1 has the highest benchmark score:</strong> about 70.4 points at an estimated $0.24 per task. The price uses an older Fable 5 allowance proxy, with a wide $0.19–$0.92 scenario range.</li>
            <li><strong>Astra max costs about 44% more than xhigh:</strong> roughly $0.135 versus $0.093 per task, for approximately 67.0 versus 66.9 benchmark points. That is barely a score difference, not proof of equal quality on every task.</li>
          </ul>
          <p>These estimates assume heavy use of each plan. Codex and Claude use $200 plans; Kimi uses $199; Grok Build uses $30 SuperGrok; Gemini uses $100 Antigravity Ultra. If you use half the modeled monthly allowance, the effective cost per task doubles.</p>
          <nav className="article-links" aria-label="Chart data">
            <a href="/coding-subscriptions/chart.png">Full chart</a>
            <a href="/coding-subscriptions/usage.png">Usage graph</a>
            <a href="/coding-subscriptions/estimates.json">Calculation data</a>
            <a href="#how-the-estimate-works">Methodology</a>
            <a href="#sources">Sources</a>
          </nav>
          <div className="methodology" dangerouslySetInnerHTML={{ __html: article.html }} />
          <section id="sources">
            <h2>All sources</h2>
            <p>The reports above are anecdotes and experiments, not an audited quota dataset. This list includes supporting measurements and sources considered for models left unpriced.</p>
            <ol>
              {article.references.map((ref) => <li key={ref.url}><a href={ref.url}>{ref.title}</a> ({new URL(ref.url).hostname.replace('www.', '')})</li>)}
            </ol>
          </section>
        </div>
      </article>
      <style jsx>{`
        .subscription-article { max-width:1280px; margin:0 auto; padding:48px 24px 72px; color:#202020; font-size:18px; line-height:1.65; }
        .reading { max-width:780px; margin:0 auto; }
        h1 { font-size:clamp(34px, 4vw, 52px); line-height:1.15; margin:0 0 28px; text-wrap:balance; }
        .chart { margin:36px 0 48px; }
        .chart a, .chart picture, .chart img { display:block; width:100%; height:auto; }
        .article-links { display:flex; flex-wrap:wrap; gap:12px 24px; margin:28px 0 44px; }
        @media(max-width:700px) {
          .subscription-article { padding:28px 20px 48px; }
          .chart { margin:28px -20px 36px; }
        }
      `}</style>
      <style jsx global>{`
        body { text-wrap:pretty; }
        .subscription-article h2 { font-size:28px; line-height:1.25; font-weight:600; margin:44px 0 20px; text-wrap:balance; }
        .subscription-article p { margin:0 0 20px; }
        .subscription-article ul, .subscription-article ol { padding-left:24px; margin:20px 0 28px; }
        .subscription-article ul { list-style:disc; }
        .subscription-article ol { list-style:decimal; }
        .subscription-article li { margin:0 0 14px; }
        .subscription-article strong { font-weight:600; }
        .subscription-article a { color:#344abb; text-decoration:none; }
        .subscription-article a:visited { color:#6f4189; }
        .subscription-article a:hover { color:#5064cf; text-decoration:none; }
        .subscription-article a:focus-visible { outline:2px solid currentColor; outline-offset:4px; }
        .subscription-article table { width:100%; border-collapse:collapse; margin:28px 0; font-size:18px; }
        .subscription-article th, .subscription-article td { text-align:left; vertical-align:top; padding:12px 14px 12px 0; border-bottom:1px solid #d9d9d9; }
        .subscription-article th { font-weight:600; }
        .subscription-article td:not(:first-child) { white-space:nowrap; font-variant-numeric:tabular-nums; }
        @media(max-width:700px) {
          .subscription-article table, .subscription-article tbody, .subscription-article tr, .subscription-article td { display:block; }
          .subscription-article table { width:calc(100% + 40px); margin-left:-20px; }
          .subscription-article thead { display:none; }
          .subscription-article tr { padding:18px 20px; border-bottom:1px solid #d9d9d9; }
          .subscription-article td { padding:4px 0; border:0; white-space:normal !important; }
          .subscription-article td:first-child { font-weight:600; margin-bottom:8px; }
          .subscription-article td:not(:first-child)::before { content:attr(data-label) ': '; display:block; font-weight:400; }
        }
      `}</style>
    </Layout>
  );
}
