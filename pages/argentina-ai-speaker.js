import Head from 'next/head'
import CTAButtons from '../components/CTAButtons';

import Layout from '../components/Layout';
import Hero from '../components/Hero';

export default function ArgentinaAISpeaker() {
  return (
    <Layout>
      <Head>
        <title>Argentina AI Speaker - Ivan Braun | International Perspective on AI</title>
        <meta name="description" content="Ivan Braun, Argentina-based AI speaker offering international perspective on artificial intelligence. Book for global conferences and events worldwide." />
        <meta name="keywords" content="argentina ai speaker, latin america ai expert, international ai speaker, south america artificial intelligence" />
        <link rel="canonical" href="https://ivanbraun.com/argentina-ai-speaker" />
      </Head>

      <Hero
        title="Argentina AI Speaker"
        subtitle="International AI Expert from Buenos Aires"
        description="A globally-minded AI expert based in Argentina, offering unique international perspectives on artificial intelligence, technology innovation, and entrepreneurship from South America."
        introText="Transform your next event with cutting-edge insights on artificial intelligence from an international perspective. Ivan Braun delivers compelling keynotes that bridge the gap between AI innovation and practical business applications across cultures."
      />

      {/* --- Global AI Perspective Section --- */}
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Argentina AI Innovation Hub</span></h2>
          <p>
  Based in Argentina but thinking globally, Ivan brings a unique South American perspective to <a href="/ai-keynote-speaker" className="subtle">artificial intelligence</a> discussions. Living in Buenos Aires while building global AI companies provides distinctive insights on technology adoption, innovation, and cultural differences in AI implementation across emerging markets.
</p>
        </div>
        <h3 className="section-heading" style={{ paddingLeft: '0' }}>AI Topics from Argentina</h3>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Bootstrapped AI Development</h4>
            <p>Building successful AI companies without venture capital from emerging markets</p>
          </div>
          <div className="card">
            <h4>Global AI Product Strategy</h4>
            <p>Scaling AI products from Argentina to serve millions of users worldwide</p>
          </div>
          <div className="card">
            <h4>Cross-Cultural AI Ethics</h4>
            <p>Navigating AI governance and ethics across different cultural and regulatory environments</p>
          </div>
          <div className="card">
            <h4>Latin American AI Innovation</h4>
            <p>Unique opportunities and challenges in South American AI development</p>
          </div>
          <div className="card">
            <h4>Remote AI Team Leadership</h4>
            <p>Managing distributed AI teams across multiple time zones and cultures</p>
          </div>
        </div>
        {/* --- Conference Images Gallery --- */}
<div className="conference-gallery">
  <a href="/i/conferences/award.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/award.jpeg" alt="Conference award" /></a>
  <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conferece-speaker.jpg" alt="Ivan Braun speaking at conference" /></a>
  <a href="/i/conferences/conference.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conference.jpeg" alt="Conference overview" /></a>
  <a href="/i/conferences/fl.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl.jpg" alt="Conference audience" /></a>
  <a href="/i/conferences/fl2.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl2.jpg" alt="Ivan presenting on stage" /></a>
  <a href="/i/conferences/presenting.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/presenting.jpeg" alt="Ivan Braun presenting" /></a>
  <a href="/i/conferences/visual1st-awards-winners.png" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/visual1st-awards-winners.png" alt="Visual1st awards winners" /></a>

</div>

{/* --- International AI Expert Section --- */}
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">International AI Expert</span></h2>
          <p>
            Ivan's unique value lies in combining deep AI expertise with an international mindset. Based in Argentina but building global AI companies, he offers audiences perspectives on technology innovation that transcend geographic and cultural boundaries.
          </p>
        </div>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Multilingual AI presentations</h4>
            <p>Fluent delivery in English, Spanish, and Portuguese</p>
          </div>
          <div className="card">
            <h4>Emerging market AI insights</h4>
            <p>How Latin America approaches AI adoption and innovation</p>
          </div>
          <div className="card">
            <h4>Global time zone expertise</h4>
            <p>Managing international AI teams and projects</p>
          </div>
          <div className="card">
            <h4>Bootstrapped AI leadership</h4>
            <p>Building profitable AI companies without venture capital</p>
          </div>
        </div>

        {/* --- Contact/CTA Section --- */}
        <div className="full-width" style={{ marginTop: '28px' }}>
          <h2 className="fun-title" style={{ paddingLeft: '0' }}><span className="fun-title-fill">Bring Argentina AI Expertise to Your Event</span></h2>
          <p>
            Looking for an AI speaker who offers fresh international perspectives from South America? Ivan brings global AI expertise and cross-cultural innovation insights to audiences worldwide.
          </p>
          <p><strong>Perfect for:</strong> AI conferences, international technology summits, future of work events, innovation forums, and global business discussions on artificial intelligence from emerging markets.</p>
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
        .fun-title-stroke {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          color: transparent;
          font-weight: 400 !important;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          -webkit-text-stroke: 1px #53cb82;
          text-stroke: 1px #53cb82;
          z-index: 1;
          pointer-events: none;
          user-select: none;
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
        .card h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
        }
        .card p {
          font-size: 1rem;
          color: #444;
          margin-bottom: 0;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .cta-button {
          padding: 0.8rem 1.8rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          height: 42px;
        }
        .framer-text {
          font-family: "Inter", "Inter Placeholder", sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0;
          white-space: nowrap;
        }
        .cta-primary {
          background: var(--accent-color);
        }
        .cta-primary .framer-text {
          color: rgb(255, 255, 255);
        }
        .cta-primary:hover {
          background: #3a4db8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(69, 93, 204, 0.25);
        }
        .cta-secondary {
          background: white;
          border: 1px solid var(--border-color);
        }
        .cta-secondary .framer-text {
          color: var(--primary-color);
        }
        .cta-secondary:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(69, 93, 204, 0.2);
        }
        .cta-secondary:hover .framer-text {
          color: rgb(255, 255, 255);
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
        .fullwidth-cards .card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.4rem 0;
          color: var(--primary-color);
          text-align: left;
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

      `}</style>
    </Layout>
  )
}