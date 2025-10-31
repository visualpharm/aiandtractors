import { useEffect } from 'react'
import Image from 'next/image'

const translations = {
  en: { 
    title: "Speaking",
    horasislTitle: "Horasis Global Meeting",
    horasislLocation: "Zurich, Switzerland",
    horasislDate: "May 2024",
    horasislDescription: "AI regulation and ethical frameworks",
    rioTitle: "Rio Innovation Week",
    rioLocation: "Rio de Janeiro, Brazil", 
    rioDate: "September 2023",
    rioDescription: "Creative AI and the future of design",
    visual1stTitle: "Visual 1st Conference",
    visual1stLocation: "Buenos Aires, Argentina",
    visual1stDate: "November 2023", 
    visual1stDescription: "Bootstrapping global creative platforms",
    conferenceEvent: "Conference presentation",
    presentingAt: "Presenting at conference",
    receivingAward: "Receiving award",
    speakingEvent: "Speaking event",
    conferenceNetworking: "Conference networking",
    visual1stAwards: "Visual 1st Awards winners"
  },
  es: { 
    title: "Conferencias",
    horasislTitle: "Horasis Global Meeting",
    horasislLocation: "Zurich, Suiza",
    horasislDate: "Mayo 2024",
    horasislDescription: "Regulación de IA y marcos éticos",
    rioTitle: "Rio Innovation Week",
    rioLocation: "Río de Janeiro, Brasil",
    rioDate: "Septiembre 2023", 
    rioDescription: "IA creativa y el futuro del diseño",
    visual1stTitle: "Conferencia Visual 1st",
    visual1stLocation: "Buenos Aires, Argentina",
    visual1stDate: "Noviembre 2023",
    visual1stDescription: "Plataformas creativas globales autofinanciadas",
    conferenceEvent: "Presentación en conferencia",
    presentingAt: "Presentando en conferencia",
    receivingAward: "Recibiendo premio",
    speakingEvent: "Evento de conferencia",
    conferenceNetworking: "Networking de conferencia",
    visual1stAwards: "Ganadores de premios Visual 1st"
  },
  pt: { 
    title: "Palestras",
    horasislTitle: "Horasis Global Meeting",
    horasislLocation: "Zurique, Suíça",
    horasislDate: "Maio 2024",
    horasislDescription: "Regulamentação de IA e frameworks éticos",
    rioTitle: "Rio Innovation Week", 
    rioLocation: "Rio de Janeiro, Brasil",
    rioDate: "Setembro 2023",
    rioDescription: "IA criativa e o futuro do design",
    visual1stTitle: "Conferência Visual 1st",
    visual1stLocation: "Buenos Aires, Argentina", 
    visual1stDate: "Novembro 2023",
    visual1stDescription: "Plataformas criativas globais autofinanciadas",
    conferenceEvent: "Apresentação em conferência",
    presentingAt: "Apresentando em conferência", 
    receivingAward: "Recebendo prêmio",
    speakingEvent: "Evento de palestra",
    conferenceNetworking: "Networking de conferência",
    visual1stAwards: "Vencedores de prêmios Visual 1st"
  }
}

export default function Speaking({ language = 'en' }) {
  const t = translations[language] || translations.en

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
        <div className="max-w-6xl mx-auto px-8">
          <h2>{t.title}</h2>
        </div>
      </section>
      
      <div className="inclined-grid">
        <div className="inclined-card photo-card">
          <a href="/i/conferences/conference.jpeg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/conference.jpeg" 
              alt={t.conferenceEvent} 
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
            <img src="/i/conferences/presenting.jpeg" alt={t.presentingAt} />
          </a>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>{t.horasislTitle}</h3>
          <div className="location">{t.horasislLocation}</div>
          <div className="date">{t.horasislDate}</div>
          <div className="description">{t.horasislDescription}</div>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>{t.rioTitle}</h3>
          <div className="location">{t.rioLocation}</div>
          <div className="date">{t.rioDate}</div>
          <div className="description">{t.rioDescription}</div>
        </div>
        
        <div className="inclined-card conference-card" onClick={toggleConferenceCard}>
          <h3>{t.visual1stTitle}</h3>
          <div className="location">{t.visual1stLocation}</div>
          <div className="date">{t.visual1stDate}</div>
          <div className="description">{t.visual1stDescription}</div>
        </div>
        
        <div className="inclined-card photo-card">
          <a href="/i/conferences/award.jpeg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/award.jpeg" 
              alt={t.receivingAward} 
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
          <a href="/i/conferences/horasis.jpg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image
              src="/i/conferences/horasis.jpg"
              alt={t.presentingAt}
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
          <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="conference-gallery" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image 
              src="/i/conferences/conferece-speaker.jpg" 
              alt={t.speakingEvent} 
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
              alt={t.conferenceNetworking} 
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
              alt={t.visual1stAwards} 
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
              alt={t.conferenceNetworking} 
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