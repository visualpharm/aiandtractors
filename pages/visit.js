import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import LargeCards from '../components/LargeCards'
import CTAButtons from '../components/CTAButtons'

export default function Visit() {
  return (
    <Layout>
      <Head>
        <title>Visit - Ivan Braun</title>
        <meta name="description" content="Visit Ivan Braun in Cariló, Argentina. Information about location, accommodation, and meeting arrangements." />
      </Head>

      <Hero
        title="Visit Me in Cariló"
        subtitle=""
        description="I've built a villa to invite fellow tech founders. It's a great expensive build in the beautiful place the pine forest meets the ocean. It's 4 hours from Buenos Aires."
        introText="If you book it, I'll do my best to visit you, shake hands, and chit chat (sometimes for hours, so push me out when tired)."
        imageUrl="/i/hero-villa-exterior.jpeg"
      />
      
      
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
        
        .villa-gallery {
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
          height: 300px;
          min-width: 0;
        }
        
        .gallery-img img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: zoom-in;
          transition: transform 0.2s;
          display: block;
        }
        
        .gallery-img img:hover {
          transform: scale(1.02);
        }
        
        @media (max-width: 900px) {
          .main-grid {
            padding: 0 0.5rem;
          }
          
          .villa-gallery {
            height: 200px;
          }
          
          .gallery-img {
            height: 200px;
          }
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
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
        }

        .framer-text {
            font-family: "Inter", "Inter Placeholder", sans-serif;
            font-weight: 500;
            letter-spacing: -0.01em;
            line-height: 120%;
            margin: 0;
        }

        .cta-primary {
            background: var(--accent-color);
        }

        .cta-primary .framer-text {
            color: rgb(255, 255, 255);
        }

        .cta-primary:hover {
            background: #3a4db8;
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(69, 93, 204, 0.3);
        }

        .cta-secondary {
            background: white;
            border: 2px solid var(--border-color);
        }

        .cta-secondary .framer-text {
            color: var(--primary-color);
        }

        .cta-secondary:hover {
            background: var(--accent-color);
            border-color: var(--accent-color);
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(69, 93, 204, 0.2);
        }

        .cta-secondary:hover .framer-text {
            color: rgb(255, 255, 255);
        }

        @media (max-width: 600px) {
          .main-grid {
            padding: 0 0.2rem;
          }
          
          .villa-gallery {
            flex-direction: column;
            height: auto;
            gap: 1rem;
          }
          
          .gallery-img {
            height: 200px;
          }
        }
      `}</style>
    </Layout>
  )
}