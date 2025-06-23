import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import SmallCards from '../components/SmallCards'
import LargeCards from '../components/LargeCards'
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
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="fun-title"><span className="fun-title-fill">Experience</span></h1>
            <p className="description">I'm a serial entrepreneur who launches bootstrapped products related to AI and design. My core experience is building AI products from zero, with no venture capital, and monetize them early. My three tools are:</p>
          </div>
        </div>
        
        <div className="tools-section">
          <div className="tool-card">
            <h4>{t.customerDev}</h4>
            <p>Books that formed me:</p>
            <div className="book-covers">
              <img src="https://m.media-amazon.com/images/I/51MEnn8ZvbL.jpg" alt="Interviewing Users" className="book-cover" />
              <img src="/i/books/competing-against-luck.jpg" alt="Competing Against Luck" className="book-cover" />
            </div>
          </div>
          
          <div className="tool-card">
            <h4>{t.uxDesign}, {t.uxSubtitle}</h4>
            <p>Books that formed me:</p>
            <div className="book-covers">
              <img src="https://m.media-amazon.com/images/I/51Rhf2DWNtL.jpg" alt="About Face" className="book-cover" />
              <img src="https://media.nngroup.com/media/images/bookCover.2e16d0ba.fill-400x600.png" alt="Designing Web Usability" className="book-cover" />
            </div>
          </div>
          
          <div className="tool-card">
            <h4>{t.paywalls}</h4>
            <p>Learning it all hard way</p>
          </div>
        </div>
        
        <SmallCards 
          title="Products"
          items={[
            {
              title: "Synthetic data",
              description: "Custom datasets for enterprise clients",
              link: "https://generated.photos/datasets"
            },
            {
              title: "Largest graphics supplier to Canva",
              description: "Industry partnership providing design assets"
            },
            {
              title: "GenYOU",
              description: "Personalized AI selfies"
            },
            {
              title: "Face Generator",
              description: "Technology behind our synthetic data"
            },
            {
              title: "Human Generator",
              description: "Full-body humans"
            },
            {
              title: "Ouch Generator",
              description: "Generates AI images that don't look Midjourney",
              link: "https://icons8.com/illustration-generator"
            },
            {
              title: "Icons",
              description: "Industry standard for icons, now with AI generator",
              link: "https://icons8.com/icons"
            }
          ]}
        />

        <LargeCards 
          title="Key Achievements"
          items={[
            {
              title: "4M+ Users Globally",
              description: "Serving millions of designers and developers worldwide with AI-generated content and design tools"
            },
            {
              title: "150+ Team Members",
              description: "Leading a distributed team of professionals across multiple time zones and countries"
            },
            {
              title: "Bootstrap Success",
              description: "Built profitable AI companies without venture capital, focusing on early monetization and sustainable growth"
            },
            {
              title: "International Speaker",
              description: "Regular keynote speaker at AI conferences, sharing insights on building successful AI products"
            },
            {
              title: "Synthetic Media Pioneer",
              description: "Early innovator in AI-generated human faces and synthetic dataset creation for enterprise clients"
            },
            {
              title: "Linkware Inventor (2012)",
              description: "I invented the linkware model: Use for a link → SEO boost. Pay those who value a link more than $15 that the license costs. My inspiration was the requirement to credit photographers, but without a link requirement at the time."
            },
            {
              title: "Global Perspective",
              description: "Operating from Argentina while building products used worldwide, bringing unique international insights"
            }
          ]}
        />
        
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

        .section-heading {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2rem;
        }

        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-content {
            max-width: 800px;
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

        .hero-content .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-weight: 400;
        }

        .hero-content .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.6;
        }

        .tools-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .tool-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 32px rgba(69,93,204,0.07), 0 1.5px 4px rgba(0,0,0,0.03);
            padding: 2rem 1.5rem 1.5rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            transition: all 0.3s ease;
        }

        .tool-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tool-card h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 0.4rem 0;
            color: var(--primary-color);
            line-height: 1.2;
        }

        .tool-card p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.5;
        }

        .book-covers {
            display: flex;
            gap: 0.5rem;
            align-items: flex-start;
            flex-wrap: wrap;
        }

        .book-cover {
            width: 20px;
            height: 30px;
            object-fit: cover;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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