import Head from 'next/head'
import CTAButtons from '../components/CTAButtons';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

export default function AIKeynoteSpeaker() {
  return (
    <Layout>
      <Head>
        <title>AI Keynote Speaker - Ivan Braun | International AI Conference Speaker</title>
        <meta name="description" content="Book Ivan Braun as your AI keynote speaker. International expert in artificial intelligence, synthetic media, and bootstrapped AI development. Available for global conferences." />
        <meta name="keywords" content="ai keynote speaker, artificial intelligence speaker, ai conference speaker, synthetic media expert, ai development speaker" />
        <link rel="canonical" href="https://ivanbraun.com/ai-keynote-speaker" />
      </Head>

      <Hero
        title="AI Keynote Speaker"
        subtitle="International Artificial Intelligence Expert"
        description="Transform your next event with cutting-edge insights on artificial intelligence from a proven AI entrepreneur. Ivan Braun delivers compelling keynotes that bridge complex AI concepts with practical business applications."
        introText="Book an AI speaker who has built and scaled AI companies serving 4M+ users. Get actionable insights on AI product development, synthetic media ethics, and building profitable AI businesses without venture capital."
      />

      {/* --- AI Expertise Section --- */}
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">AI Conference Topics</span></h2>
          <p>
            From bootstrapped AI startups to <a href="/argentina-ai-speaker" className="subtle">international AI perspectives</a>, Ivan brings real-world experience building AI companies that serve millions of users. His keynotes combine technical expertise with practical business insights that audiences can immediately apply.
          </p>
        </div>
        
        <h3 className="section-heading" style={{ paddingLeft: '0' }}>Keynote Topics</h3>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Bootstrapped AI Development</h4>
            <p>Building successful AI companies from zero to 4M+ users without venture capital funding</p>
          </div>
          <div className="card">
            <h4>Synthetic Media & Ethics</h4>
            <p>Navigating AI-generated content, deepfakes, and responsible synthetic data creation</p>
          </div>
          <div className="card">
            <h4>AI Product Strategy</h4>
            <p>From concept to scale: practical frameworks for monetizing AI products early</p>
          </div>
          <div className="card">
            <h4>Building AI Teams</h4>
            <p>Scaling from solo founder to leading 150+ AI professionals across multiple products</p>
          </div>
          <div className="card">
            <h4>AI for Real Business</h4>
            <p>Moving beyond hype: implementing AI solutions that drive actual business results</p>
          </div>
        </div>

        {/* --- Conference Images Gallery --- */}
        <div className="conference-gallery">
          <a href="/i/conferences/award.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/award.jpeg" alt="Conference award" /></a>
          <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conferece-speaker.jpg" alt="Ivan Braun speaking at AI conference" /></a>
          <a href="/i/conferences/conference.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conference.jpeg" alt="AI conference overview" /></a>
          <a href="/i/conferences/fl.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl.jpg" alt="Conference audience during AI keynote" /></a>
          <a href="/i/conferences/fl2.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl2.jpg" alt="Ivan presenting AI insights on stage" /></a>
          <a href="/i/conferences/presenting.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/presenting.jpeg" alt="Ivan Braun AI keynote presentation" /></a>
          <a href="/i/conferences/visual1st-awards-winners.png" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/visual1st-awards-winners.png" alt="Visual1st awards winners" /></a>
        </div>

        {/* --- Why Book Ivan Section --- */}
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Why Book Ivan for Your AI Event</span></h2>
          <p>
            Unlike theoretical AI speakers, Ivan brings hands-on experience building and scaling real AI products. His presentations combine deep technical knowledge with practical business insights, delivered with the clarity that comes from actually implementing AI solutions at scale.
          </p>
        </div>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Proven AI Track Record</h4>
            <p>Built Icons8 and Generated Photos, serving 4M+ users with AI-generated content</p>
          </div>
          <div className="card">
            <h4>Practical, Not Theoretical</h4>
            <p>Real insights from building profitable AI companies, not just academic knowledge</p>
          </div>
          <div className="card">
            <h4>International Perspective</h4>
            <p>Global experience building AI products used worldwide from Argentina</p>
          </div>
          <div className="card">
            <h4>Engaging Presentation Style</h4>
            <p>Transforms complex AI concepts into actionable insights your audience will remember</p>
          </div>
        </div>

        {/* --- Contact/CTA Section --- */}
        <div className="full-width" style={{ marginTop: '28px' }}>
          <h2 className="fun-title" style={{ paddingLeft: '0' }}><span className="fun-title-fill">Book Your AI Keynote Speaker</span></h2>
          <p>
            Ready to transform your next AI conference or corporate event? Ivan Braun delivers compelling keynotes that bridge the gap between AI innovation and practical business applications.
          </p>
          <p><strong>Perfect for:</strong> AI conferences, technology summits, corporate innovation events, startup gatherings, and business forums focused on artificial intelligence and digital transformation.</p>
          <div style={{ marginTop: '40px' }}>
            <CTAButtons />
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
          padding: 0 2rem;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        .full-width {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        .full-width h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 1rem;
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
        .full-width p {
          font-size: 1.12rem;
          color: #333;
          margin-bottom: 0.7rem;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          width: 100%;
        }
        .card-grid.fullwidth-cards {
          padding-left: 8px;
          padding-right: 8px;
        }
        .card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(69,93,204,0.07), 0 1.5px 4px rgba(0,0,0,0.03);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        .section-heading {
          padding: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.8rem;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0;
          margin-left: 0;
          text-align: left;
        }
        .fullwidth-cards {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
          padding: 0;
          gap: 0.7rem;
        }
        .fullwidth-cards .card {
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          padding: 1rem 1.2rem 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          transition: all 0.3s ease;
        }
        .fullwidth-cards .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .fullwidth-cards .card h4 {
          font-size: 1.2rem;
          margin: 0;
          padding: 0;
          color: var(--primary-color);
          font-weight: 600;
          line-height: 1.2;
        }
        .fullwidth-cards .card p {
          font-size: 1rem;
          color: var(--secondary-color);
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }
        .conference-gallery {
          margin-top: 28px;
          margin-bottom: 28px;
          display: flex;
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
          gap: 4px;
          justify-content: stretch;
          align-items: stretch;
          overflow-x: auto;
          padding: 0;
        }
        .gallery-img {
          flex: 1 1 0;
          height: 180px;
          min-width: 0;
        }
        .gallery-img img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 0;
          box-shadow: none;
          cursor: zoom-in;
          transition: transform 0.2s;
          display: block;
        }
        .gallery-img img:hover {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .main-grid {
            padding: 0 0.5rem;
          }
          .card-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .main-grid {
            padding: 0 0.2rem;
          }
          .card {
            padding: 1.2rem 0.7rem 1rem 0.7rem;
          }
        }
      `}</style>
    </Layout>
  )
}