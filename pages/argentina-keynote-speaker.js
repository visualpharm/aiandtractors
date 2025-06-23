import Head from 'next/head';
import Script from 'next/script';

import Layout from '../components/Layout';
import Hero from '../components/Hero';

export default function ArgentinaKeynoteSpeaker() {
  return (
    <Layout>
      <Hero
        title="Argentina Keynote Speaker"
        subtitle="AI Expert & International Innovation Leader from Buenos Aires"
        description="A globally-minded AI expert based in Argentina, offering unique international perspectives on artificial intelligence, technology innovation, and the future of work from the heart of South America."
        introText="Transform your next event with cutting-edge insights on artificial intelligence, machine learning, and the future of technology. Ivan Braun delivers compelling keynotes that bridge the gap between complex AI concepts and practical business applications."
      />
      {/* --- Global AI Perspective Section --- */}
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Global AI Perspective from Argentina</span></h2>
          <div className="narrow-text">
  <p>
    Based in Buenos Aires but thinking globally, Ivan brings a unique international perspective to <a href="/ai-keynote-speaker" className="subtle">artificial intelligence</a> discussions. Living in Argentina while building global AI companies provides distinctive insights on technology adoption, innovation, and cultural differences in AI implementation.
  </p>
</div>
        </div>
        <h3 className="section-heading">Topics for Speeches</h3>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h3>Global AI adoption</h3>
            <p>How different cultures and economies approach artificial intelligence</p>
          </div>
          <div className="card">
            <h3>Remote-first AI teams</h3>
            <p>Building distributed AI companies across time zones and cultures</p>
          </div>
          <div className="card">
            <h3>AI in emerging markets</h3>
            <p>Unique challenges and opportunities in non-Silicon Valley contexts</p>
          </div>
          <div className="card">
            <h3>International AI ethics</h3>
            <p>Navigating AI governance across different regulatory environments</p>
          </div>
          <div className="card">
            <h3>Cross-cultural innovation</h3>
            <p>How diverse perspectives drive better AI solutions</p>
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
            <h3>Multilingual AI presentations</h3>
            <p>Fluent delivery in English, Spanish, and Portuguese</p>
          </div>
          <div className="card">
            <h3>Cross-cultural tech insights</h3>
            <p>How different cultures approach AI adoption and ethics</p>
          </div>
          <div className="card">
            <h3>Global time zone expertise</h3>
            <p>Managing international AI teams and projects</p>
          </div>
          <div className="card">
            <h3>Virtual AI leadership</h3>
            <p>Pioneering remote AI company operations</p>
          </div>
        </div>
        {/* --- Contact/CTA Section --- */}
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Bring International AI Expertise to Your Event</span></h2>
          <p>
            Looking for an AI keynote speaker who offers fresh international perspectives beyond Silicon Valley? Ivan brings global AI expertise and cross-cultural innovation insights to audiences worldwide.
          </p>
          <p><strong>Perfect for:</strong> AI conferences, international technology summits, future of work events, innovation forums, and global business discussions on artificial intelligence.</p>
          <div className="cta-buttons">
  <button className="cta-button cta-primary" onClick={() => window.location.href = '/'}>
    <p className="framer-text">More about Ivan</p>
  </button>
  <button className="cta-button cta-secondary" onClick={() => window.location.href = '/contact'}>
    <p className="framer-text">Contact</p>
  </button>
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
          padding: 1rem 2.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
          font-size: 1rem;
          font-weight: 500;
        }
        .cta-button.secondary {
          background: #f4f4f4;
          color: #222;
          border: 2px solid #e63946;
        }
        .cta-button.secondary:hover {
          background: #e63946;
          color: #fff;
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

      `}
    </style>
    </Layout>
  );
}
