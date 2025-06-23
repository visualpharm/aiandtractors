import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const translations = {
  en: {
    contact: "Contact me",
    visit: "Visit me"
  },
  es: {
    contact: "Contactarme", 
    visit: "Visitarme"
  },
  pt: {
    contact: "Entre em contato",
    visit: "Me visitar"
  }
}

export default function Hero({ title, subtitle, description, introText, imageUrl }) {
  const router = useRouter()
  const [locale, setLocale] = useState('en')
  
  useEffect(() => {
    const path = router.asPath
    if (path.startsWith('/es')) {
      setLocale('es')
    } else if (path.startsWith('/pt')) {
      setLocale('pt')
    } else {
      setLocale('en')
    }
  }, [router.asPath])
  
  const t = translations[locale] || translations.en

  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>{title}</h1>
            <p className="subtitle">{subtitle}</p>
            <p className="description">{description}</p>
            <div className="cta-buttons">
              <button 
                className="cta-button cta-primary"
                onClick={() => router.push('/contact')}
              >
                <p className="framer-text">{t.contact}</p>
              </button>
              <button 
                className="cta-button cta-secondary"
                onClick={() => router.push('/visit')}
              >
                <p className="framer-text">{t.visit}</p>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <a href={imageUrl || "/i/ivan-robot.png"} data-fancybox="profile">
              <img src={imageUrl || "/i/ivan-robot.png"} alt={imageUrl ? "Ivan Braun's location in Cariló" : "Ivan Braun AI Avatar"} />
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        .hero-content h1 {
            font-family: 'DotGothic16', monospace;
            font-size: 4.32rem;
            font-weight: 400;
            color: var(--primary-color);
            margin: 0 0 0.5rem -10px;
            line-height: 1.1;
        }

        .hero-content .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-weight: 400;
        }

        .hero-content .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .hero-image {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .hero-image img {
            width: 505px;
            height: auto;
            filter: drop-shadow(0 8px 16px rgba(0,0,0,0.1));
            transition: transform 0.3s ease;
        }

        .hero-image img:hover {
            transform: scale(1.05);
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
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

        @media (max-width: 768px) {
            .hero-container {
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
        }

        @media (max-width: 480px) {
            .hero-content h1 {
                font-size: 2rem;
            }

            .hero-image img {
                width: 250px;
            }

            .cta-buttons {
                justify-content: center;
            }
        }
      `}</style>
    </>
  )
}