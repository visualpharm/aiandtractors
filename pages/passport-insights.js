import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function PassportInsights() {
  return (
    <Layout>
      <Head>
        <title>Passport Ranking Insights | The Open Door Index</title>
        <meta name="description" content="Key findings from the Open Door Index - a passport ranking based on tourism potential rather than destination count." />
        <meta name="keywords" content="passport ranking insights, passport power analysis, visa-free travel insights, tourism potential" />
        <link rel="canonical" href="https://aiandtractors.com/passport-insights" />
      </Head>

      <div className="insights-page">
        <div className="header-section">
          <Link href="/passport-ranking" className="back-link">
            ← Back to Ranking
          </Link>
          <h1>Key Findings</h1>
          <p className="subtitle">What the Open Door Index reveals about passport power</p>
        </div>

        <div className="container">
          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">🇰🇷</span>
              <h2>South Korea Leads, Not Singapore</h2>
            </div>
            <p>Despite Singapore having the most visa-free destinations in traditional rankings like the Henley Passport Index, South Korea takes the top spot in the Open Door Index.</p>
            <p>The difference? Access to major tourism markets that Singapore misses. While both passports open doors to most of the world, South Korea has visa-free access to countries that receive tens of millions of visitors annually—markets where Singapore passport holders need visas.</p>
            <p>This single finding encapsulates the core insight of our methodology: the destinations you can access matter more than how many you can access.</p>
          </div>

          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">🇮🇳 🇨🇳</span>
              <h2>India & China Are Kingmakers</h2>
            </div>
            <p>Two destinations separate the truly powerful passports from the rest: India and China. Both are massive tourism markets that most passports cannot access visa-free.</p>
            <p>China's recent visa-free expansion to select countries has reshuffled the rankings. Meanwhile, India remains restrictive—only a handful of Asian passports enjoy visa-free access. Having both gives a structural advantage.</p>
            <p>This creates a significant gap at the top of our ranking. Passports with India and China access have an edge that's difficult to overcome with additional smaller destinations.</p>
          </div>

          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">🇪🇺</span>
              <h2>Schengen Is the Foundation</h2>
            </div>
            <p>Access to the Schengen zone—29 European countries with open borders—provides a massive baseline score. The combined tourism volume of France, Spain, Italy, Germany, and their neighbors represents a significant chunk of global travel.</p>
            <p>Passports without European access start at a fundamental disadvantage, regardless of how many other countries they can visit. This explains why some passports with many visa-free destinations still rank relatively low: their access is concentrated in regions with lower tourism volumes.</p>
            <p>The lesson: a few high-value destinations outweigh many low-value ones.</p>
          </div>

          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">🇺🇸</span>
              <h2>The US Is Second Only to Schengen</h2>
            </div>
            <p>After the Schengen zone, the United States is the single most valuable destination in our ranking. It receives massive international tourism, and missing US access is extremely costly.</p>
            <p>Countries like Brazil and Mexico, despite having strong regional access and visa-free travel to most of South America and parts of Europe, lose significant ground because their citizens need visas for the US.</p>
            <p>Recent policy changes—like Brazil's 2025 decision to require visas from American, Canadian, and Australian visitors—highlight how bilateral relationships directly impact passport scores.</p>
          </div>

          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">🎯</span>
              <h2>Efficiency Over Quantity</h2>
            </div>
            <p>Some passports punch well above their weight. Taiwan, Albania, and Chile access major tourism hubs with fewer total visa-free destinations than their peers, achieving high scores efficiently.</p>
            <p>These "efficient" passports have focused diplomatic relationships—they may not grant access to every small island nation, but they open doors to the destinations that matter most for tourism volume.</p>
            <p>This efficiency metric (score divided by destination count) reveals which countries have the most strategically valuable visa agreements, rather than simply the most agreements.</p>
          </div>

          <div className="insight-full">
            <div className="insight-header">
              <span className="insight-icon">📉</span>
              <h2>Many Destinations ≠ High Value</h2>
            </div>
            <p>Some passports with many visa-free destinations score poorly because they access mostly low-tourism countries. Raw destination count can be deeply misleading about real travel utility.</p>
            <p>A passport might grant visa-free access to 80 countries—but if those countries collectively receive only a fraction of global tourism, the practical value is limited. Meanwhile, another passport with access to just 60 countries might score higher because those 60 include major tourism powerhouses.</p>
            <p>This is why traditional rankings, which treat Palau and France as equivalent, can paint a misleading picture of passport power.</p>
          </div>

          <div className="insight-full movers-section">
            <div className="insight-header">
              <span className="insight-icon">🔄</span>
              <h2>Notable Movers vs. Henley Passport Index</h2>
            </div>
            <p>
              Compared to the <a href="https://www.henleyglobal.com/passport-index/ranking" target="_blank" rel="noopener noreferrer">Henley Passport Index</a>,
              which ranks passports by number of visa-free destinations, our tourism-weighted approach reveals significant differences:
            </p>

            <p className="percentile-note">
              <em>Note: Rankings shown as percentiles (Top X%) for fair comparison, since Henley has many tied positions while our index has fewer ties.</em>
            </p>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Henley</th>
                  <th>Ours</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mover-up">
                  <td><span className="table-flag">🇰🇷</span> South Korea</td>
                  <td>Top 2%</td>
                  <td>Top 1%</td>
                  <td><span className="arrow-up">↑ #1</span></td>
                </tr>
                <tr className="mover-up">
                  <td><span className="table-flag">🇯🇵</span> Japan</td>
                  <td>Top 2%</td>
                  <td>Top 1%</td>
                  <td><span className="arrow-up">↑ +1%</span></td>
                </tr>
                <tr className="mover-up">
                  <td><span className="table-flag">🇲🇴</span> Macao</td>
                  <td>Top 49%</td>
                  <td>Top 30%</td>
                  <td><span className="arrow-up">↑ +19%</span></td>
                </tr>
                <tr className="mover-up">
                  <td><span className="table-flag">🇨🇳</span> China</td>
                  <td>Top 79%</td>
                  <td>Top 68%</td>
                  <td><span className="arrow-up">↑ +11%</span></td>
                </tr>
                <tr className="mover-up">
                  <td><span className="table-flag">🇬🇪</span> Georgia</td>
                  <td>Top 57%</td>
                  <td>Top 41%</td>
                  <td><span className="arrow-up">↑ +16%</span></td>
                </tr>
                <tr className="mover-up">
                  <td><span className="table-flag">🇦🇱</span> Albania</td>
                  <td>Top 54%</td>
                  <td>Top 40%</td>
                  <td><span className="arrow-up">↑ +14%</span></td>
                </tr>
                <tr>
                  <td><span className="table-flag">🇫🇷</span> France</td>
                  <td>Top 3%</td>
                  <td>Top 3%</td>
                  <td><span className="arrow-same">→ same</span></td>
                </tr>
                <tr className="mover-down">
                  <td><span className="table-flag">🇺🇸</span> United States</td>
                  <td>Top 8%</td>
                  <td>Top 26%</td>
                  <td><span className="arrow-down">↓ -18%</span></td>
                </tr>
                <tr className="mover-down">
                  <td><span className="table-flag">🇬🇧</span> United Kingdom</td>
                  <td>Top 5%</td>
                  <td>Top 23%</td>
                  <td><span className="arrow-down">↓ -18%</span></td>
                </tr>
                <tr className="mover-down">
                  <td><span className="table-flag">🇧🇷</span> Brazil</td>
                  <td>Top 15%</td>
                  <td>Top 31%</td>
                  <td><span className="arrow-down">↓ -16%</span></td>
                </tr>
              </tbody>
            </table>

            <h4>What Drives These Differences?</h4>

            <div className="mover-item">
              <span className="mover-flag">🇰🇷 🇯🇵</span>
              <div className="mover-content">
                <strong>South Korea & Japan</strong> — Both rise to the top thanks to visa-free access to major Asian markets. South Korea's access to India—a market most European passports miss—gives it the #1 spot.
              </div>
            </div>

            <div className="mover-item">
              <span className="mover-flag">🇲🇴 🇨🇳</span>
              <div className="mover-content">
                <strong>Macao & China</strong> — Regional Asian access to tourism powerhouses like Japan, South Korea, and Southeast Asia drives significant gains. Quality of access to high-traffic destinations matters more than total count.
              </div>
            </div>

            <div className="mover-item">
              <span className="mover-flag">🇬🇪 🇦🇱</span>
              <div className="mover-content">
                <strong>Georgia & Albania</strong> — Strategic positioning between Europe and Asia pays off. Both have Schengen access plus regional agreements that unlock high-tourism destinations efficiently.
              </div>
            </div>

            <div className="mover-item">
              <span className="mover-flag">🇺🇸 🇬🇧</span>
              <div className="mover-content">
                <strong>US & UK</strong> — Both drop significantly due to missing China and India. These two Asian giants represent massive tourism value that neither passport can access visa-free.
              </div>
            </div>

            <div className="mover-item">
              <span className="mover-flag">🇧🇷</span>
              <div className="mover-content">
                <strong>Brazil</strong> — Strong regional access but missing US visa-free travel costs significantly. A single destination gap that outweighs dozens of smaller countries combined.
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h3>Explore the Data</h3>
            <p>See the full ranking, compare passports, and discover how your citizenship stacks up.</p>
            <Link href="/passport-ranking" className="cta-btn">
              View Full Ranking
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .insights-page {
          --primary-color: #1a1a2e;
          --secondary-color: #4a5568;
          --accent-color: #4361ee;
          --bg-color: #f8fafc;
          --card-bg: #ffffff;
          --border-color: #e2e8f0;
          min-height: 100vh;
          background: var(--bg-color);
        }

        @media (prefers-color-scheme: dark) {
          .insights-page {
            --primary-color: #f1f5f9;
            --secondary-color: #94a3b8;
            --accent-color: #818cf8;
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --border-color: #334155;
          }
        }

        .header-section {
          text-align: center;
          padding: 3rem 1rem 2rem;
          background: var(--card-bg);
          border-bottom: 1px solid var(--border-color);
        }

        .back-link {
          display: inline-block;
          color: var(--accent-color);
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        h1 {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--secondary-color);
          max-width: 600px;
          margin: 0 auto;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem;
        }

        .insight-full {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .insight-icon {
          font-size: 2rem;
        }

        .insight-full h2 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin: 0;
          font-weight: 600;
        }

        .insight-full p {
          color: var(--secondary-color);
          line-height: 1.7;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .insight-full p:last-child {
          margin-bottom: 0;
        }

        .cta-section {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-top: 2rem;
        }

        .cta-section h3 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }

        .cta-section p {
          color: var(--secondary-color);
          margin-bottom: 1.5rem;
        }

        .cta-btn {
          display: inline-block;
          padding: 0.875rem 2rem;
          background: var(--accent-color);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .cta-btn:hover {
          background: #3347b0;
        }

        .movers-section > p {
          margin-bottom: 1.5rem;
        }

        .mover-item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .mover-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .mover-flag {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .mover-content {
          color: var(--secondary-color);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .mover-content strong {
          color: var(--primary-color);
        }

        .movers-section h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: var(--primary-color);
        }

        .movers-section a {
          color: var(--accent-color);
        }

        .percentile-note {
          font-size: 0.85rem;
          color: var(--secondary-color);
          background: rgba(67, 97, 238, 0.05);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border-left: 3px solid var(--accent-color);
          margin-bottom: 1rem;
        }

        .percentile-note em {
          font-style: normal;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }

        .comparison-table th,
        .comparison-table td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .comparison-table th {
          font-weight: 600;
          color: var(--secondary-color);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .comparison-table td {
          color: var(--primary-color);
        }

        .comparison-table th:nth-child(2),
        .comparison-table th:nth-child(3),
        .comparison-table th:nth-child(4),
        .comparison-table td:nth-child(2),
        .comparison-table td:nth-child(3),
        .comparison-table td:nth-child(4) {
          text-align: center;
        }

        .table-flag {
          margin-right: 0.5rem;
        }

        .arrow-up {
          color: #22c55e;
          font-weight: 600;
        }

        .arrow-down {
          color: #ef4444;
          font-weight: 600;
        }

        .arrow-same {
          color: var(--secondary-color);
        }

        .mover-up {
          background: rgba(34, 197, 94, 0.05);
        }

        .mover-down {
          background: rgba(239, 68, 68, 0.03);
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 2rem;
          }

          .insight-full {
            padding: 1.5rem;
          }

          .insight-full h2 {
            font-size: 1.25rem;
          }

          .insight-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </Layout>
  )
}
