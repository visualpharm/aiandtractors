import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'

const translations = {
  en: { title: "Speaking" },
  es: { title: "Conferencias" },
  pt: { title: "Palestras" }
}

export default function Speaking() {
  const router = useRouter()
  const { locale } = router
  const t = translations[locale] || translations.en

  useEffect(() => {
    // Initialize Fancybox when component mounts
    if (typeof window !== 'undefined' && window.Fancybox) {
      window.Fancybox.bind('[data-fancybox]', {})
    }
  }, [])

  const toggleConferenceCard = (event) => {
    const card = event.currentTarget
    
    // Remove clicked class from all cards
    document.querySelectorAll('.inclined-card.clicked').forEach(c => {
      c.classList.remove('clicked')
    })
    
    // Add clicked class to the current card
    card.classList.add('clicked')
    
    // Remove clicked class after 3 seconds
    setTimeout(() => {
      card.classList.remove('clicked')
    }, 3000)
  }

  return (
    <>
      <section className="section" style={{marginBottom: 0}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2>{t.title}</h2>
        </div>
      </section>
      
      <div className="inclined-grid">
        <div className="inclined-card photo-card">
          <a href="/i/conferences/conference.jpeg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/conference.jpeg" 
              alt="Conference event" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/presenting.jpeg" data-fancybox="conference-gallery">
            <img src="/i/conferences/presenting.jpeg" alt="Presenting at conference" />
          </a>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>Horasis Global Meeting</h3>
          <div className="location">São Paulo, Brazil</div>
          <div className="date">7–10 Oct 2025</div>
          <div className="description">Keynote on lean, independent AI development</div>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>Rio Innovation Week</h3>
          <div className="location">Rio de Janeiro, Brazil</div>
          <div className="date">12–15 Aug 2025</div>
          <div className="description">On-site, open for meetings</div>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>Visual 1st Conference</h3>
          <div className="location">San Francisco, USA</div>
          <div className="date">2021</div>
          <div className="description">Visitor's-Choice talk on synthetic image datasets</div>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/award.jpeg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/award.jpeg" 
              alt="Receiving award" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/presenting.jpeg" data-fancybox="conference-gallery">
            <img src="/i/conferences/presenting.jpeg" alt="Presenting at conference" />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/conferece-speaker.jpg" 
              alt="Speaking event" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/fl.jpg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/fl.jpg" 
              alt="Conference networking" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/visual1st-awards-winners.png" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/visual1st-awards-winners.png" 
              alt="Visual 1st Conference awards" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/fl2.jpg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/fl2.jpg" 
              alt="Conference networking" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </a>
        </div>
      </div>

      <style jsx>{`
        .section {
            margin-bottom: 3rem;
        }

        .section h2 {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .inclined-grid {
            display: flex;
            flex-wrap: nowrap;
            gap: -20px;
            padding: 2rem 0;
            overflow: visible;
            scroll-behavior: smooth;
            justify-content: flex-start;
            margin-left: -20px;
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
        }

        .inclined-card {
            background: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            flex: 0 0 auto;
            width: 180px;
            height: 240px;
            transform-origin: bottom center;
            margin-right: -20px;
        }

        .inclined-card:nth-child(4n+1) {
            transform: rotate(-3deg);
        }

        .inclined-card:nth-child(4n+2) {
            transform: rotate(2deg);
        }

        .inclined-card:nth-child(4n+3) {
            transform: rotate(-1deg);
        }

        .inclined-card:nth-child(4n+4) {
            transform: rotate(4deg);
        }

        .inclined-card:hover {
            transform: rotate(0deg) translateY(-8px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .inclined-card.clicked {
            z-index: 100;
            transform: rotate(0deg) scale(1.1);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
            transition: none;
        }

        .conference-card {
            padding: 1rem;
            border: 1px solid var(--border-color);
            cursor: pointer;
        }

        .conference-card h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
            color: var(--primary-color);
        }

        .conference-card .location {
            font-size: 0.9rem;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }

        .conference-card .date {
            font-size: 0.85rem;
            color: var(--secondary-color);
            font-style: italic;
            margin-bottom: 1rem;
        }

        .conference-card .description {
            font-size: 0.9rem;
            color: var(--primary-color);
            line-height: 1.4;
        }

        .photo-card {
          position: relative;
          overflow: hidden;
        }
        
        .photo-card a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .photo-card img {
          transition: transform 0.3s ease;
        }
        
        .photo-card:hover img {
          transform: scale(1.05);
        }

        .photo-card .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            padding: 1rem;
            color: white;
        }

        .photo-card .overlay h4 {
            margin: 0;
            font-size: 0.9rem;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .inclined-grid {
                display: none;
            }
        }

        @media (max-width: 480px) {
            .inclined-card {
                width: 160px;
                height: 200px;
            }
        }
      `}</style>
    </>
  )
}