import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Link from 'next/link'

const translations = {
  en: {
    title: "Experience - Ivan Braun",
    heading: "Experience",
    subtitle: "Building AI products from zero without venture capital",
    intro: "My core experience is building AI products from zero, with no venture capital, and monetize them early. My three tools are:",
    backLink: "← Back to home",
    customerDev: "Customer Development",
    uxDesign: "UX Design",   
    uxSubtitle: "my profession",
    paywalls: "Paywalls",
    paywallsSubtitle: "monetization strategy",
    companyDesc: "Founder of Icons8 and Generated Photos, delivering AI-generated images, datasets, and design tools used by 4M+ designers and developers.",
    enterpriseDesc: "We supply large-scale resources and custom datasets to enterprise clients and are the largest graphics supplier to Canva.",
    genYou: "GenYOU – personalized AI selfies",
    faceGen: "Face Generator – real-time faces", 
    humanGen: "Human Generator – full-body humans"
  },
  es: {
    title: "Experiencia - Ivan Braun",
    heading: "Experiencia",
    subtitle: "Construyendo productos de IA desde cero sin capital de riesgo",
    intro: "Mi experiencia principal es construir productos de IA desde cero, sin capital de riesgo, y monetizarlos temprano. Mis tres herramientas son:",
    backLink: "← Volver al inicio",
    customerDev: "Desarrollo de Cliente",
    uxDesign: "Diseño UX",
    uxSubtitle: "mi profesión", 
    paywalls: "Paywalls",
    paywallsSubtitle: "estrategia de monetización",
    companyDesc: "Fundador de Icons8 y Generated Photos, entregando imágenes generadas por IA, conjuntos de datos y herramientas de diseño utilizadas por más de 4M diseñadores y desarrolladores.",
    enterpriseDesc: "Suministramos recursos a gran escala y conjuntos de datos personalizados a clientes empresariales y somos el mayor proveedor de gráficos para Canva.",
    genYou: "GenYOU – selfies de IA personalizadas",
    faceGen: "Face Generator – caras en tiempo real",
    humanGen: "Human Generator – humanos de cuerpo completo"
  },
  pt: {
    title: "Experiência - Ivan Braun",
    heading: "Experiência", 
    subtitle: "Construindo produtos de IA do zero sem capital de risco",
    intro: "Minha experiência principal é construir produtos de IA do zero, sem capital de risco, e monetizá-los cedo. Minhas três ferramentas são:",
    backLink: "← Voltar ao início",
    customerDev: "Desenvolvimento de Cliente",
    uxDesign: "Design UX",
    uxSubtitle: "minha profissão",
    paywalls: "Paywalls", 
    paywallsSubtitle: "estratégia de monetização",
    companyDesc: "Fundador da Icons8 e Generated Photos, entregando imagens geradas por IA, conjuntos de dados e ferramentas de design utilizadas por mais de 4M designers e desenvolvedores.",
    enterpriseDesc: "Fornecemos recursos em larga escala e conjuntos de dados personalizados para clientes empresariais e somos o maior fornecedor de gráficos para o Canva.",
    genYou: "GenYOU – selfies de IA personalizadas",
    faceGen: "Face Generator – rostos em tempo real",
    humanGen: "Human Generator – humanos de corpo inteiro"
  }
}

export default function Experience() {
  const router = useRouter()
  const { locale } = router
  const t = translations[locale] || translations.en

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <link rel="canonical" href={`https://ivanbraun.com/experience${locale === 'en' ? '' : '/' + locale}`} />
      </Head>

      <div className="container">
        <Link href="/" className="back-link">{t.backLink}</Link>
        
        <div className="hero-section">
          <div className="hero-content">
            <h1>Ivan Braun's Experience</h1>
            <p className="subtitle">Building AI products from zero without venture capital</p>
            <p className="description">{t.intro}</p>
          </div>
        </div>
        
        <div className="tools-section">
          <div className="tool-block">
            <h3>{t.customerDev}</h3>
            <div className="tool-books">
              <a href="https://rosenfeldmedia.com/books/interviewing-users-second-edition/" className="book-link">
                <i className="fas fa-book"></i> Interviewing Users
              </a>
              <a href="https://www.harpercollins.com/products/competing-against-luck-clayton-m-christensentaddy-hallkaren-dillondavid-s-duncan?variant=32207691743266" className="book-link">
                <i className="fas fa-book"></i> Competing Against Luck
              </a>
            </div>
          </div>
          
          <div className="tool-block">
            <h3>{t.uxDesign}</h3>
            <p className="tool-subtitle">{t.uxSubtitle}</p>
            <div className="tool-books">
              <a href="https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576" className="book-link">
                <i className="fas fa-book"></i> About Face
              </a>
              <span className="book-note">Old Jacob Nielsen books</span>
            </div>
          </div>
          
          <div className="tool-block">
            <h3>{t.paywalls}</h3>
            <p className="tool-subtitle">{t.paywallsSubtitle}</p>
          </div>
        </div>
        
        <div className="details-section">
          <ul className="experience-list">
            <li>{t.companyDesc}</li>
            <li>{t.enterpriseDesc}</li>
            <li><a href="https://generated.photos/genyou">{t.genYou}</a></li>
            <li><a href="https://generated.photos/face-generator">{t.faceGen}</a></li>
            <li><a href="https://generated.photos/human-generator">{t.humanGen}</a></li>
          </ul>
        </div>

        
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source src="/i/human-generator.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        .back-link {
            color: var(--secondary-color);
            text-decoration: none;
            margin-bottom: 2rem;
            display: inline-block;
            font-size: 0.9rem;
        }

        .back-link:hover {
            color: var(--primary-color);
        }

        .experience-grid {
            display: grid;
            grid-template-columns: 100px 0.5fr 1fr;
            gap: 2rem;
            align-items: start;
            margin-bottom: 3rem;
        }

        .title-section {
            text-align: left;
        }

        .section-title {
            font-size: 0.9rem;
            font-weight: 500;
            margin: 0;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .description-section {
            text-align: left;
        }

        .description {
            margin: 0;
            fontSize: 1.1rem;
            line-height: 1.6;
            color: var(--secondary-color);
        }

        .tools-section {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
        }

        .details-section {
            grid-column: span 3;
            margin-top: 2rem;
        }

        .tool-block {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            text-align: left;
        }

        .tool-block h3 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
            color: var(--primary-color);
        }

        .tool-subtitle {
            font-size: 0.85rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-style: italic;
        }

        .tool-books {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .book-link {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            color: var(--accent-color);
            text-decoration: none;
            font-size: 0.8rem;
            transition: opacity 0.3s ease;
        }

        .book-link:hover {
            opacity: 0.7;
        }

        .book-note {
            font-size: 0.8rem;
            color: var(--secondary-color);
            font-style: italic;
        }

        .experience-list {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 1rem;
            line-height: 1.6;
            color: var(--secondary-color);
        }

        .experience-list li {
            margin-bottom: 0.75rem;
            position: relative;
            padding-left: 1.5rem;
        }

        .experience-list li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--accent-color);
            font-weight: 600;
        }

        .experience-list a {
            color: var(--accent-color);
            text-decoration: none;
        }

        .experience-list a:hover {
            color: var(--primary-color);
        }

        .video-container {
            margin-top: 2rem;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
        }

        .video-container video {
            width: 100%;
            height: auto;
            display: block;
        }

        @media (max-width: 768px) {
            .experience-grid {
                display: block;
            }
            
            .experience-grid > div {
                margin-bottom: 2rem;
            }

            .tools-section {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </Layout>
  )
}