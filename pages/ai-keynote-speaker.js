import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function AIKeynoteSpeaker() {
  return (
    <Layout>
      <Head>
        <title>AI Keynote Speaker - Ivan Braun | International AI Conference Speaker</title>
        <meta name="description" content="Book Ivan Braun as your AI keynote speaker. International expert in artificial intelligence, synthetic media, and bootstrapped AI development. Available for global conferences." />
        <meta name="keywords" content="ai keynote speaker, artificial intelligence speaker, ai conference speaker, synthetic media expert, ai development speaker" />
        <link rel="canonical" href="https://ivanbraun.com/ai-keynote-speaker" />
      </Head>

      <div className="seo-page">
        <div className="hero-section">
          <div className="container">
            <h1>AI Keynote Speaker</h1>
            <p className="lead">International expert in artificial intelligence, synthetic media, and lean AI development available for your next conference.</p>
            
            <div className="cta-section">
              <Link href="/contact" className="cta-button primary">Book Ivan as Speaker</Link>
              <Link href="/#speaking" className="cta-button secondary">View Speaking Experience</Link>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="container">
            <div className="expertise-grid">
              <div className="expertise-card">
                <h3>🤖 AI Product Development</h3>
                <p>From zero to 4M+ users without venture capital. Learn how to build and monetize AI products using lean, bootstrapped approaches.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🎭 Synthetic Media Ethics</h3>
                <p>Navigate the complex world of AI-generated content, deepfakes, and synthetic data with practical insights from industry experience.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🚀 Scaling AI Teams</h3>
                <p>From solo founder to leading 150+ professionals. Practical strategies for building and managing AI-focused organizations.</p>
              </div>
            </div>

            <div className="speaking-topics">
              <h2>Popular Speaking Topics</h2>
              <ul>
                <li><strong>The Future of Synthetic Media:</strong> Opportunities and challenges in AI-generated content</li>
                <li><strong>Bootstrapping AI Products:</strong> Building successful AI companies without VC funding</li>
                <li><strong>Ethics in AI Development:</strong> Responsible innovation in synthetic media</li>
                <li><strong>From Idea to 4M Users:</strong> Scaling AI products globally</li>
                <li><strong>The AI Entrepreneur's Playbook:</strong> Practical strategies for AI startups</li>
              </ul>
            </div>

            <div className="credentials">
              <h2>Speaking Credentials</h2>
              <div className="credentials-grid">
                <div>
                  <h4>🎯 Upcoming Events</h4>
                  <ul>
                    <li>Horasis Global Meeting (São Paulo, Oct 2025)</li>
                    <li>Rio Innovation Week (Rio de Janeiro, Aug 2025)</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🏆 Recognition</h4>
                  <ul>
                    <li>Visitor's Choice Award at Visual 1st Conference</li>
                    <li>Featured in BBC, Washington Post, The Verge</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🌍 Global Reach</h4>
                  <ul>
                    <li>Serving 4M+ users globally</li>
                    <li>Leading team of 150+ professionals</li>
                    <li>Fluent in Spanish, English, Portuguese, Italian</li>
                  </ul>
                </div>
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
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
          margin: 0 0 3rem 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
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
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
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

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .expertise-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .expertise-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .expertise-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .speaking-topics {
          margin-bottom: 4rem;
        }

        .speaking-topics h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .speaking-topics ul {
          list-style: none;
          padding: 0;
        }

        .speaking-topics li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }

        .speaking-topics li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: 600;
        }

        .credentials h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .credentials-grid h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .credentials-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .credentials-grid li {
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .cta-section {
            flex-direction: column;
            align-items: center;
          }

          .expertise-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  )
}