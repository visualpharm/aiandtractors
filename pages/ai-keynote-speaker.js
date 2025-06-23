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

      <div className="container">
        <div className="hero-section">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="fun-title"><span className="fun-title-fill">AI Keynote Speaker</span></h1>
              <p className="description">International expert in artificial intelligence, synthetic media, and lean AI development available for your next conference. Transform your event with cutting-edge insights that bridge complex AI concepts with practical business applications.</p>
            </div>
            <div className="hero-image">
              <img src="/i/ivan-robot.png" alt="Ivan Braun AI Avatar" />
            </div>
          </div>
        </div>

        <div className="card-grid">
          <div className="card">
            <h3>🤖 AI Product Development</h3>
            <p>From zero to 4M+ users without venture capital. Learn how to build and monetize AI products using lean, bootstrapped approaches.</p>
          </div>
          
          <div className="card">
            <h3>🎭 Synthetic Media Ethics</h3>
            <p>Navigate the complex world of AI-generated content, deepfakes, and synthetic data with practical insights from industry experience.</p>
          </div>
          
          <div className="card">
            <h3>🚀 Scaling AI Teams</h3>
            <p>From solo founder to leading 150+ professionals. Practical strategies for building and managing AI-focused organizations.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }


        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .fun-title {
            margin-top: 28px !important;
            margin-bottom: 0 !important;
            position: relative;
            display: inline-block;
            font-size: 3rem;
            font-weight: 400 !important;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            line-height: 1.1;
        }

        .fun-title-fill {
            position: relative;
            color: #222;
            font-size: 2.5rem !important;
            font-weight: 400 !important;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            z-index: 2;
            text-shadow:
                -1px 0 0 #dd9e8e,
                1px 0 0 #53cb82;
        }

        .hero-content .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.6;
        }

        .hero-image {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .hero-image img {
            width: 400px;
            height: auto;
            filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
            transition: transform 0.3s ease;
        }

        .hero-image img:hover {
            transform: scale(1.05);
        }

        .card-grid {
            display: flex;
            gap: 0.8rem;
            margin-bottom: 3rem;
        }

        .card {
            flex: 1;
            min-width: 160px;
            background: var(--card-bg);
            padding: 0.8rem;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
            font-size: 0.8rem;
            font-weight: 600;
            margin: 0 0 0.3rem 0;
            color: var(--primary-color);
        }

        .card p {
            font-size: 0.7rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.4;
        }

        @media (max-width: 768px) {
            .hero-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 2.5rem;
            }

            .hero-image img {
                width: 300px;
            }

            .card-grid {
                flex-direction: column;
            }
        }
      `}</style>
    </Layout>
  )
}