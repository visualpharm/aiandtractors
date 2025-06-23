import Head from 'next/head'
import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact - Ivan Braun</title>
        <meta name="description" content="Get in touch with Ivan Braun for speaking engagements, consulting, or investment opportunities." />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="main-title">Contact</h1>
            <p className="description">
              I'm always interested in connecting with fellow entrepreneurs, potential clients, 
              and anyone passionate about AI and innovation.
            </p>
          </div>
        </div>
        
        <div className="contact-content">
          <div className="contact-section">
            <h2 className="section-title">✅ Looking For</h2>
            <ul className="looking-for-list">
              <li><strong>Speaking</strong>: AI conferences, corporate events, startup talks</li>
              <li><strong>Investing</strong>: AI + real sectors (e.g., PropTech, manufacturing), B2B AI tools</li>
              <li><strong>Advisory</strong>: Tech startups, AI implementation, remote teams</li>
            </ul>
          </div>
          
          <div className="contact-section">
            <h2 className="section-title">❌ Not Looking For</h2>
            <ul className="not-looking-for-list">
              <li>Investment in my companies</li>
              <li>Acquisition offers</li>
              <li>General partnerships</li>
              <li>Sales pitches</li>
              <li>Icons8 & Generated Photos: please use official support channels</li>
            </ul>
          </div>
          
          <div className="contact-section">
            <h2 className="section-title">Get in Touch</h2>
            <div className="contact-info">
              <div className="contact-item">
                <strong>📧 Email:</strong> <a href="mailto:ivan@generated.photos">ivan@generated.photos</a>
              </div>
              <div className="contact-item">
                <strong>📲 Telegram:</strong> <a href="https://t.me/Icons8">@Icons8</a>
              </div>
              <div className="contact-item">
                <strong>Location:</strong> Cariló, Argentina
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .hero-section {
          background: var(--hero-bg);
          padding: 4rem 0 2rem 0;
          margin-bottom: 3rem;
        }

        .hero-content {
          max-width: 800px;
        }

        .main-title {
          font-family: 'DotGothic16', monospace;
          font-size: 4.32rem;
          font-weight: 400;
          color: var(--primary-color);
          margin: 0 0 0.5rem -10px;
          line-height: 1.1;
        }

        .description {
          font-size: 1rem;
          color: var(--secondary-color);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .contact-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--secondary-color);
        }

        .contact-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-family: 'DotGothic16', monospace;
          font-size: 1.5rem;
          font-weight: 400;
          margin-top: 3rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .contact-info {
          margin: 1.5rem 0;
        }

        .contact-item {
          margin-bottom: 1rem;
        }

        .contact-item a {
          color: var(--accent-color);
          text-decoration: none;
        }

        .contact-item a:hover {
          text-decoration: underline;
        }

        .looking-for-list, .not-looking-for-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .looking-for-list li, .not-looking-for-list li {
          margin-bottom: 0.8rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .looking-for-list li::before {
          content: "•";
          color: #22c55e;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .not-looking-for-list li::before {
          content: "•";
          color: #ef4444;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </Layout>
  )
}