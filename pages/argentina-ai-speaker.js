import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function ArgentinaAISpeaker() {
  return (
    <Layout>
      <Head>
        <title>Argentina AI Speaker - Ivan Braun | International Perspective on AI</title>
        <meta name="description" content="Ivan Braun, Argentina-based AI speaker offering international perspective on artificial intelligence. Book for global conferences and events worldwide." />
        <meta name="keywords" content="argentina ai speaker, latin america ai expert, international ai speaker, south america artificial intelligence" />
        <link rel="canonical" href="https://ivanbraun.com/argentina-ai-speaker" />
      </Head>

      <div className="seo-page">
        <div className="hero-section">
          <div className="container">
            <h1>Argentina AI Speaker</h1>
            <p className="lead">International AI perspective from Argentina. Bridging global AI innovation with Latin American entrepreneurship.</p>
            
            <div className="location-badge">
              <span>📍 Based in Cariló, Argentina</span>
              <span>🌍 Speaking Globally</span>
            </div>
            
            <div className="cta-section">
              <Link href="/contact" className="cta-button primary">Book Ivan for Your Event</Link>
              <Link href="/#speaking" className="cta-button secondary">View Speaking Portfolio</Link>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="container">
            <div className="value-proposition">
              <h2>Why an Argentina-Based AI Speaker?</h2>
              <div className="value-grid">
                <div className="value-card">
                  <h3>🌎 Global Perspective</h3>
                  <p>Operating from Argentina while serving 4M+ users globally provides unique insights into international AI product development and market expansion.</p>
                </div>
                
                <div className="value-card">
                  <h3>🚀 Bootstrapped Innovation</h3>
                  <p>Building successful AI companies without venture capital - a perspective especially valuable for emerging markets and resource-conscious entrepreneurs.</p>
                </div>
                
                <div className="value-card">
                  <h3>🤝 Cultural Bridge</h3>
                  <p>Fluent in multiple languages (Spanish, English, Portuguese, Italian) with experience in diverse global markets and cultural contexts.</p>
                </div>
              </div>
            </div>

            <div className="regional-focus">
              <h2>Regional Expertise & Global Reach</h2>
              <div className="expertise-sections">
                <div className="section">
                  <h3>Latin American AI Innovation</h3>
                  <ul>
                    <li>Bootstrapping AI startups in emerging markets</li>
                    <li>Navigating regulatory landscapes across LATAM</li>
                    <li>Building global products from regional bases</li>
                    <li>Cultural considerations in AI product design</li>
                  </ul>
                </div>
                
                <div className="section">
                  <h3>International Market Entry</h3>
                  <ul>
                    <li>Scaling from Argentina to global markets</li>
                    <li>Cross-cultural AI product development</li>
                    <li>Remote team management across time zones</li>
                    <li>International partnership strategies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="speaking-experience">
              <h2>Speaking Experience</h2>
              <div className="experience-grid">
                <div className="experience-item">
                  <h4>🇧🇷 Upcoming: Horasis Global Meeting</h4>
                  <p>São Paulo, Brazil (October 2025) - Keynote on lean, independent AI development</p>
                </div>
                
                <div className="experience-item">
                  <h4>🇧🇷 Upcoming: Rio Innovation Week</h4>
                  <p>Rio de Janeiro, Brazil (August 2025) - Latin America's largest innovation event</p>
                </div>
                
                <div className="experience-item">
                  <h4>🇺🇸 Visual 1st Conference</h4>
                  <p>San Francisco, USA (2021) - Visitor's-Choice talk on synthetic image datasets</p>
                </div>
              </div>
            </div>

            <div className="media-coverage">
              <h2>International Media Recognition</h2>
              <p>Featured in major global publications discussing AI innovation and synthetic media:</p>
              <div className="media-list">
                <span>BBC News</span>
                <span>Washington Post</span>
                <span>The Verge</span>
                <span>Der Spiegel</span>
                <span>La Repubblica</span>
                <span>Vice</span>
                <span>Daily Mail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .seo-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #e6f3ff 0%, #cce7ff 100%);
          padding: 6rem 0 4rem 0;
          text-align: center;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h1 {
          font-family: 'DotGothic16', monospace;
          font-size: 3.5rem;
          font-weight: 400;
          color: var(--primary-color);
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }

        .lead {
          font-size: 1.25rem;
          color: var(--secondary-color);
          margin: 0 0 2rem 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .location-badge {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .location-badge span {
          background: rgba(255, 255, 255, 0.9);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          color: var(--secondary-color);
          border: 1px solid var(--border-color);
        }

        .cta-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cta-button.primary {
          background: var(--primary-color);
          color: white;
        }

        .cta-button.primary:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
        }

        .cta-button.secondary {
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        }

        .cta-button.secondary:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        .content-section {
          padding: 4rem 0;
        }

        .value-proposition {
          margin-bottom: 4rem;
        }

        .value-proposition h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
          text-align: center;
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .value-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .value-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .regional-focus {
          margin-bottom: 4rem;
        }

        .regional-focus h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .expertise-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .section {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .section li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
          color: var(--secondary-color);
        }

        .section li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: 600;
        }

        .speaking-experience {
          margin-bottom: 4rem;
        }

        .speaking-experience h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .experience-item {
          background: var(--card-bg);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .experience-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--primary-color);
        }

        .experience-item p {
          margin: 0;
          color: var(--secondary-color);
          font-size: 0.9rem;
        }

        .media-coverage h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .media-coverage p {
          margin-bottom: 1.5rem;
          color: var(--secondary-color);
        }

        .media-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .media-list span {
          background: var(--card-bg);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          font-size: 0.9rem;
          color: var(--secondary-color);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .location-badge {
            flex-direction: column;
            align-items: center;
          }

          .cta-section {
            flex-direction: column;
            align-items: center;
          }

          .value-grid, .expertise-sections, .experience-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  )
}