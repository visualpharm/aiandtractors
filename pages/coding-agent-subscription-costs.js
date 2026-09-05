import Head from 'next/head';
import Layout from '../components/Layout';
import article from '../data/coding-subscriptions.json';

const PAGE_URL = 'https://aiandtractors.com/coding-agent-subscription-costs/';
const TITLE = 'What coding agents cost on a subscription';
const DESCRIPTION = `Artificial Analysis redrawn with community-estimated subscription costs per task, including Antigravity/Gemini and research on z.ai and Muse Code. Calculations and ${article.references.length} sources.`;

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
        <meta property="og:image:height" content="2800" />
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
              <source media="(max-width: 700px)" srcSet="/coding-subscriptions/chart-phone.png" />
              <img src="/coding-subscriptions/chart.png" width="2800" height="2800" alt="Coding agent benchmark scores and estimated subscription costs per task. Antigravity Gemini 3.7 Flash high is $0.037 and 3.8 Flash high is $0.053 on the $100 plan, using a provisional token-mix scenario. Fable 5.1 leads at about 70.4 points and $0.245; Kimi K3 is $0.584. GLM 5.3 has a 473M monthly-token scenario but no matched benchmark; Muse Code has plans but no measured token allowance. Scenario ranges are shown." />
            </picture>
          </a>
        </figure>
        <div className="reading">
          <h2>Gemini, z.ai and Muse Code</h2>
          <ul>
            <li><strong>Gemini is now plotted through Antigravity:</strong> $0.037 per task for 3.7 Flash high and $0.053 for 3.8 Flash high on the $100 Ultra tier. These are provisional estimates using an assumed token mix and the native Antigravity SDK benchmark.</li>
            <li><strong>z.ai has a usable GLM 5.3 quota report:</strong> about 473M raw tokens per month on $18 Lite when extrapolated from one subscriber. A matching Coding Agent Index result is missing, so GLM has no plotted price or score.</li>
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
