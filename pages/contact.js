import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

const translations = {
  en: {
    title: "Contact - Ivan Braun",
    description: "Get in touch with Ivan Braun for speaking engagements, consulting, or investment opportunities.",
    heading: "Contact",
    intro: "I'm always interested in connecting with fellow entrepreneurs, potential clients, and anyone passionate about AI and innovation.",
    lookingFor: "✅ Looking For",
    notLookingFor: "❌ Not Looking For",
    getInTouch: "Get in Touch",
    speaking: "Speaking",
    speakingDesc: "AI conferences, corporate events, startup talks",
    investing: "Investing", 
    investingDesc: "AI + real sectors (e.g., PropTech, manufacturing), B2B AI tools",
    advisory: "Advisory",
    advisoryDesc: "Tech startups, AI implementation, remote teams",
    investmentInCompanies: "Investment in my companies",
    acquisitionOffers: "Acquisition offers",
    generalPartnerships: "General partnerships", 
    salesPitches: "Sales pitches",
    supportChannels: "Icons8 & Generated Photos: please use official support channels",
    email: "📧 Email:",
    telegram: "📲 Telegram:",
    location: "Location:"
  },
  es: {
    title: "Contacto - Ivan Braun",  
    description: "Ponte en contacto con Ivan Braun para conferencias, consultoría u oportunidades de inversión.",
    heading: "Contacto",
    intro: "Siempre estoy interesado en conectar con otros emprendedores, clientes potenciales y cualquier persona apasionada por la IA y la innovación.",
    lookingFor: "✅ Busco",
    notLookingFor: "❌ No Busco", 
    getInTouch: "Ponte en Contacto",
    speaking: "Conferencias",
    speakingDesc: "Conferencias de IA, eventos corporativos, charlas para startups",
    investing: "Invirtiendo",
    investingDesc: "IA + sectores reales (ej: PropTech, manufactura), herramientas B2B de IA", 
    advisory: "Consultoría",
    advisoryDesc: "Startups tecnológicas, implementación de IA, equipos remotos",
    investmentInCompanies: "Inversión en mis empresas",
    acquisitionOffers: "Ofertas de adquisición",
    generalPartnerships: "Asociaciones generales",
    salesPitches: "Pitches de ventas", 
    supportChannels: "Icons8 & Generated Photos: usa los canales oficiales de soporte",
    email: "📧 Email:",
    telegram: "📲 Telegram:",
    location: "Ubicación:"
  },
  pt: {
    title: "Contato - Ivan Braun",
    description: "Entre em contato com Ivan Braun para palestras, consultoria ou oportunidades de investimento.",
    heading: "Contato", 
    intro: "Estou sempre interessado em me conectar com outros empreendedores, clientes potenciais e qualquer pessoa apaixonada por IA e inovação.",
    lookingFor: "✅ Procurando Por",
    notLookingFor: "❌ Não Procurando Por",
    getInTouch: "Entre em Contato",
    speaking: "Palestras",
    speakingDesc: "Conferências de IA, eventos corporativos, talks para startups",
    investing: "Investindo", 
    investingDesc: "IA + setores reais (ex: PropTech, manufatura), ferramentas B2B de IA",
    advisory: "Consultoria",
    advisoryDesc: "Startups de tecnologia, implementação de IA, equipes remotas",
    investmentInCompanies: "Investimento nas minhas empresas",
    acquisitionOffers: "Ofertas de aquisição", 
    generalPartnerships: "Parcerias gerais",
    salesPitches: "Pitches de vendas",
    supportChannels: "Icons8 & Generated Photos: use os canais oficiais de suporte",
    email: "📧 Email:",
    telegram: "📲 Telegram:", 
    location: "Localização:"
  }
}

export default function Contact() {
  const router = useRouter()
  // For static export, detect locale from path
  const getLocaleFromPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/es')) return 'es'
      if (path.startsWith('/pt')) return 'pt'
    }
    return 'en'
  }
  
  const locale = getLocaleFromPath()
  const t = translations[locale] || translations.en

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
        <link rel="canonical" href={`https://ivanbraun.com${locale === 'en' ? '' : '/' + locale}/contact`} />
        <link rel="alternate" hrefLang="en" href="https://ivanbraun.com/contact" />
        <link rel="alternate" hrefLang="es" href="https://ivanbraun.com/es/contact" />
        <link rel="alternate" hrefLang="pt" href="https://ivanbraun.com/pt/contact" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="main-title">{t.heading}</h1>
            <p className="description">
              {t.intro}
            </p>
          </div>
        </div>
        
        <div className="contact-content">
          <div className="contact-section">
            <h2 className="section-title">{t.lookingFor}</h2>
            <ul className="looking-for-list">
              <li><strong>{t.speaking}</strong>: {t.speakingDesc}</li>
              <li><strong>{t.investing}</strong>: {t.investingDesc}</li>
              <li><strong>{t.advisory}</strong>: {t.advisoryDesc}</li>
            </ul>
          </div>
          
          <div className="contact-section">
            <h2 className="section-title">{t.notLookingFor}</h2>
            <ul className="not-looking-for-list">
              <li>{t.investmentInCompanies}</li>
              <li>{t.acquisitionOffers}</li>
              <li>{t.generalPartnerships}</li>
              <li>{t.salesPitches}</li>
              <li>{t.supportChannels}</li>
            </ul>
          </div>
          
          <div className="contact-section">
            <h2 className="section-title">{t.getInTouch}</h2>
            <div className="contact-info">
              <div className="contact-item">
                <strong>{t.email}</strong> <a href="mailto:ivan@generated.photos">ivan@generated.photos</a>
              </div>
              <div className="contact-item">
                <strong>{t.telegram}</strong> <a href="https://t.me/Icons8">@Icons8</a>
              </div>
              <div className="contact-item">
                <strong>{t.location}</strong> Cariló, Argentina
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