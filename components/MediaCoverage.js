import { useRouter } from 'next/router'
import Image from 'next/image'

const translations = {
  en: { title: "Media Coverage" },
  es: { title: "Cobertura de Medios" },
  pt: { title: "Cobertura da Mídia" }
}

export default function MediaCoverage() {
  const router = useRouter()
  const { locale } = router
  const t = translations[locale] || translations.en

  return (
    <>
      <div className="main-content">
        <section className="section" style={{margin:0,padding:0}}>
          <div style={{maxWidth: '1200px', margin: 0, padding: '0 2rem'}}>
            <h2 style={{margin:'10px 0 10px 0',padding:0}}>{t.title}</h2>
          </div>
        </section>
        
        <div className="media-grid">
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '91px' }}>
              <Image 
                src="/i/logos/media/wp.png" 
                alt="Washington Post" 
                width={80}  /* 20% smaller */
                height={40}  /* 20% smaller */
                className="media-logo"
              />
            </div>
            <h3>Fake People</h3>
            <p><a href="https://www.washingtonpost.com/technology/2020/01/07/dating-apps-need-women-advertisers-need-diversity-ai-companies-offer-solution-fake-people/">Dating apps need women. Advertisers need diversity. AI companies offer a solution: Fake people.</a></p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '63px' }}>
              <Image 
                src="/i/logos/media/bbc.svg" 
                alt="BBC" 
                width={100}
                height={50}
                className="media-logo"
              />
            </div>
            <h3>Deepfakes</h3>
            <p><a href="https://www.bbc.com/news/technology-51064933">Could deepfakes be used to train office workers?</a></p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '70px' }}>
              <Image 
                src="/i/logos/media/der_spiegel.svg" 
                alt="Der Spiegel" 
                width={130}  /* 30% larger */
                height={39}  /* 30% larger */
                className="media-logo"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3>AI Faces</h3>
            <p>Werbegesichter aus dem Computer: Ist hier noch irgendjemand echt?</p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '63px' }}>
              <Image 
                src="/i/logos/media/la_repubblica.svg" 
                alt="La Repubblica" 
                width={130}  /* 30% larger */
                height={65}  /* 30% larger */
                className="media-logo"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3>Synthetic Portraits</h3>
            <p><a href="https://www.repubblica.it/tecnologia/2019/09/26/news/volti_generated_photos_deepfake-236979821/">I 100mila volti di persone che non esistono</a></p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '72px' }}>  {/* Adjusted for larger logo */}
              <Image 
                src="/i/logos/media/the_verge.svg" 
                alt="The Verge" 
                width={120}  /* 20% larger */
                height={60}  /* 20% larger */
                className="media-logo"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3>Stock Photos</h3>
            <p><a href="https://www.theverge.com/2019/9/20/20875362/100000-fake-ai-photos-stock-photography-royalty-free">100,000 free AI-generated headshots put stock photo companies on notice</a></p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '70px' }}>
              <Image 
                src="/i/logos/media/vice.svg" 
                alt="Vice" 
                width={100}
                height={50}
                className="media-logo"
                style={{
                  height: '100%',
                  width: 'auto',
                }}
              />
            </div>
            <h3>AI Diversity</h3>
            <p><a href="https://www.vice.com/en/article/generated-photos-thinks-it-can-solve-diversity-with-100000-fake-ai-faces/">Generated Photos Thinks It Can Solve Diversity With 100,000 Fake AI Faces</a></p>
          </div>
          <div className="media-card">
            <div className="media-logo-wrapper" style={{ width: '103px' }}>
              <Image 
                src="/i/logos/media/daily_mail.svg" 
                alt="Daily Mail" 
                width={100}
                height={50}
                className="media-logo"
              />
            </div>
            <h3>AI Portraits</h3>
            <p><a href="https://www.dailymail.co.uk/sciencetech/article-7499107/Artists-create-100-000-ultra-realistic-AI-portraits.html">Artists create more than 100,000 ultra-realistic AI portraits</a></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
        }

        .section {
            margin: 0;
            padding: 0;
        }

        .section h2 {
            font-size: 0.9rem;
            font-weight: 500;
            margin: 6px 0 6px 0;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .media-grid {
            display: flex;
            flex-wrap: nowrap;
            gap: 0.8rem;
            margin: 0;
            padding: 0;
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            padding-left: 0;
            padding-right: 0;
            overflow-x: auto;
        }

        .media-card {
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

        .media-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .media-logo-wrapper {
          height: 30px;
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        
        .media-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .media-card h3 {
            font-size: 0.8rem;
            font-weight: 600;
            margin: 0 0 0.3rem 0;
            color: var(--primary-color);
        }

        .media-card p {
            font-size: 0.7rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.3;
        }

        .media-card a {
            color: var(--accent-color);
            text-decoration: none;
        }

        .media-card a:hover {
            color: var(--primary-color);
        }

        @media (max-width: 768px) {
            .media-card {
                min-width: 120px;
            }
        }

        @media (max-width: 480px) {
            .media-grid {
                flex-wrap: wrap;
            }
        }
      `}</style>
    </>
  )
}