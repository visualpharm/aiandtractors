import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LargeCards from '../components/LargeCards'
import Link from 'next/link'

const translations = {
  en: {
    title: "Book - Ivan Braun",
    description: "The book by Ivan Braun on building AI companies without venture capital.",
    subtitle: "A no-nonsense guide to building and scaling tech companies without traditional funding. Based on real experience growing teams of 150+ people and serving millions of users, this book offers practical lessons in management, marketing, and finance that actually work when you're bootstrapping.",
    part1: "Part 1: Management",
    part2: "Part 2: Marketing", 
    part3: "Part 3: Finance",
    killBudgets: "Kill budgets, not dreams",
    killBudgetsDesc: "Why budgets are guesswork and how to find real market prices",
    screenshotTool: "The screenshot tool",
    screenshotToolDesc: "Using Hubstaff to focus on process, not micromanaging results",
    fireNegative: "Fire the \"my life sucks\" people",
    fireNegativeDesc: "Culture levels and why toxic employees destroy teams",
    noMeetings: "No meetings, no timezones",
    noMeetingsDesc: "Building a global team without traditional management overhead",
    customerDev: "Customer development",
    customerDevDesc: "Getting 10,000 customers before building your first feature",
    socialProof: "Social proof that works",
    socialProofDesc: "Beyond testimonials: real tactics that convert visitors",
    organicGrowth: "Organic growth without ads",
    organicGrowthDesc: "Content strategies that actually drive sustainable growth",
    viralLoops: "Viral loops and network effects",
    viralLoopsDesc: "Engineering word-of-mouth into your product design",
    bootstrapFinance: "Bootstrap finance basics",
    bootstrapFinanceDesc: "Cash flow management when every dollar counts",
    pricingStrategy: "Pricing strategy without research",
    pricingStrategyDesc: "Setting prices based on value, not competition",
    revenueDiversification: "Revenue diversification",
    revenueDiversificationDesc: "Multiple income streams to weather any storm",
    exitStrategies: "Exit strategies for bootstrappers",
    exitStrategiesDesc: "When and how to consider acquisition offers"
  },
  es: {
    title: "Libro - Ivan Braun",
    description: "El libro de Ivan Braun sobre construir empresas de IA sin capital de riesgo.",
    subtitle: "Una guía práctica para construir y escalar empresas tecnológicas sin financiamiento tradicional. Basado en experiencia real dirigiendo equipos de más de 150 personas y sirviendo a millones de usuarios, este libro ofrece lecciones prácticas en gestión, marketing y finanzas que realmente funcionan cuando estás bootstrapping.",
    part1: "Parte 1: Gestión",
    part2: "Parte 2: Marketing",
    part3: "Parte 3: Finanzas", 
    killBudgets: "Mata los presupuestos, no los sueños",
    killBudgetsDesc: "Por qué los presupuestos son conjeturas y cómo encontrar precios reales de mercado",
    screenshotTool: "La herramienta de captura de pantalla",
    screenshotToolDesc: "Usando Hubstaff para enfocarse en el proceso, no microgestionar resultados",
    fireNegative: "Despide a la gente \"mi vida apesta\"",
    fireNegativeDesc: "Niveles de cultura y por qué los empleados tóxicos destruyen equipos",
    noMeetings: "Sin reuniones, sin zonas horarias",
    noMeetingsDesc: "Construyendo un equipo global sin la sobrecarga de gestión tradicional",
    customerDev: "Desarrollo de clientes",
    customerDevDesc: "Conseguir 10,000 clientes antes de construir tu primera funcionalidad",
    socialProof: "Prueba social que funciona",
    socialProofDesc: "Más allá de testimonios: tácticas reales que convierten visitantes",
    organicGrowth: "Crecimiento orgánico sin anuncios",
    organicGrowthDesc: "Estrategias de contenido que realmente impulsan crecimiento sostenible",
    viralLoops: "Bucles virales y efectos de red",
    viralLoopsDesc: "Ingeniar el boca a boca en el diseño de tu producto",
    bootstrapFinance: "Finanzas básicas de bootstrap",
    bootstrapFinanceDesc: "Gestión de flujo de efectivo cuando cada dólar cuenta",
    pricingStrategy: "Estrategia de precios sin investigación",
    pricingStrategyDesc: "Establecer precios basados en valor, no en competencia",
    revenueDiversification: "Diversificación de ingresos",
    revenueDiversificationDesc: "Múltiples fuentes de ingresos para capear cualquier tormenta",
    exitStrategies: "Estrategias de salida para bootstrappers",
    exitStrategiesDesc: "Cuándo y cómo considerar ofertas de adquisición"
  },
  pt: {
    title: "Livro - Ivan Braun",
    description: "O livro de Ivan Braun sobre construir empresas de IA sem capital de risco.",
    subtitle: "Um guia prático para construir e escalar empresas de tecnologia sem financiamento tradicional. Baseado em experiência real liderando equipes de mais de 150 pessoas e servindo milhões de usuários, este livro oferece lições práticas em gestão, marketing e finanças que realmente funcionam quando você está fazendo bootstrap.",
    part1: "Parte 1: Gestão",
    part2: "Parte 2: Marketing",
    part3: "Parte 3: Finanças",
    killBudgets: "Mate os orçamentos, não os sonhos",
    killBudgetsDesc: "Por que orçamentos são suposições e como encontrar preços reais de mercado",
    screenshotTool: "A ferramenta de screenshot",
    screenshotToolDesc: "Usando Hubstaff para focar no processo, não microgerenciar resultados",
    fireNegative: "Demita as pessoas \"minha vida é péssima\"",
    fireNegativeDesc: "Níveis de cultura e por que funcionários tóxicos destroem equipes",
    noMeetings: "Sem reuniões, sem fusos horários",
    noMeetingsDesc: "Construindo uma equipe global sem sobrecarga de gestão tradicional",
    customerDev: "Desenvolvimento de clientes",
    customerDevDesc: "Conseguir 10.000 clientes antes de construir sua primeira funcionalidade",
    socialProof: "Prova social que funciona",
    socialProofDesc: "Além de depoimentos: táticas reais que convertem visitantes",
    organicGrowth: "Crescimento orgânico sem anúncios",
    organicGrowthDesc: "Estratégias de conteúdo que realmente impulsionam crescimento sustentável",
    viralLoops: "Loops virais e efeitos de rede",
    viralLoopsDesc: "Engenharia do boca a boca no design do seu produto",
    bootstrapFinance: "Finanças básicas de bootstrap",
    bootstrapFinanceDesc: "Gestão de fluxo de caixa quando cada real conta",
    pricingStrategy: "Estratégia de preços sem pesquisa",
    pricingStrategyDesc: "Definir preços baseados em valor, não em competição",
    revenueDiversification: "Diversificação de receita",
    revenueDiversificationDesc: "Múltiplas fontes de renda para resistir a qualquer tempestade",
    exitStrategies: "Estratégias de saída para bootstrappers",
    exitStrategiesDesc: "Quando e como considerar ofertas de aquisição"
  }
}

export default function Book() {
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
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href={`https://ivanbraun.com${locale === 'en' ? '' : '/' + locale}/book`} />
        <link rel="alternate" hrefLang="en" href="https://ivanbraun.com/book" />
        <link rel="alternate" hrefLang="es" href="https://ivanbraun.com/es/book" />
        <link rel="alternate" hrefLang="pt" href="https://ivanbraun.com/pt/book" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <h1 className="book-title text-6xl md:text-8xl font-normal mb-4" style={{ fontFamily: 'Cormorant', color: '#950303' }}>Zero to AI</h1>
                <p className="subtitle">{t.subtitle}</p>
              </div>
              <div className="hero-image">
                <img src="/i/zero-to-ai.jpg" alt="Kill the Budget and 12 Other Ways to Bootstrap book cover" className="book-cover-large" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.part1}</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: t.killBudgets,
                  description: t.killBudgetsDesc
                },
                {
                  title: t.screenshotTool,
                  description: t.screenshotToolDesc
                },
                {
                  title: t.fireNegative,
                  description: t.fireNegativeDesc
                },
                {
                  title: "Scrum without being an asshole",
                  description: "Using frameworks so people can't blame you personally"
                },
                {
                  title: "Too much control vs too little",
                  description: "Finding the balance between meetings and direction"
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.part2}</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "Freemium is a pleasure",
                  description: "Build something viral first, add paywalls later"
                },
                {
                  title: "Think about the evil side",
                  description: "Why viral products get negative press (and that's okay)"
                },
                {
                  title: "SEO for poor people",
                  description: "Backlinks convert to traffic, everything else is noise"
                },
                {
                  title: "ChatGPT CEO is different",
                  description: "Getting mentioned in the few articles AI considers authoritative"
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Part 3: Finance</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "Cherry-picking offers",
                  description: "Always shopping for prices, getting the best deals"
                },
                {
                  title: "Get pleasure from eliminating waste",
                  description: "The joy of cutting inefficiencies immediately"
                },
                {
                  title: "Offer everything except high salary",
                  description: "Flexibility, learning, reduced hours before money"
                },
                {
                  title: "The Zara photoshoot",
                  description: "Getting what you need without inflated budgets"
                }
              ]}
            />
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Excerpts</span></h2>
            </div>
            
            <div className="grid grid-cols-8 gap-4">
              {/* Row 1 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Kill budgets, not dreams</h3>
                <div className="text-gray-700 space-y-3">
                  <p>Budgets are bullshit. They're some guess about optimal pricing that turns into gospel. Instead of budgets, find the real cost of things.</p>
                  <p>When we were doing photoshoots with photographers, our goal was to shoot three scenes: office, home, and pajamas. We went to Zara and purchased the clothing for it. No budget would do the trick - we just got what we needed and figured out the real price.</p>
                  <p>The budget mindset makes you lazy. "We have $5,000 for this" becomes an excuse to not shop around, not negotiate, not think. Kill that. Demand good prices from the market instead.</p>
                </div>
              </div>

              
              {/* Row 2 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">The screenshot tool</h3>
                <div className="text-gray-700 space-y-3">
                  <p>I require people to have a process, not specific results. This way, I don't have to always define new results and try to guess the next objective, which is irritating and hard for them. Instead, I trust them.</p>
                  <p>They work well if I give them a tracking tool like Hubstaff with screenshots. I know they're not watching YouTube or working for someone else. It's about focus on process, not micromanaging.</p>
                  <p>Some people think this is controversial. But it works. I focus on results through process, instead of constantly defining new objectives.</p>
                </div>
              </div>

              
              {/* Spacer before Row 2 left indent */}

              
              {/* Row 3 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Freemium is a pleasure</h3>
                <div className="text-gray-700 space-y-3">
                  <p>Freemium is something people share. If it's a free product, lean toward the free side. If you create a paid product nobody uses, that's a failure. If you create a freemium product that everybody's using and it's viral - that's pleasure.</p>
                  <p>You can add paywalls wherever you want later. It's much easier to monetize something people already love than to force people to pay for something they haven't tried.</p>
                  <p>We had one product reach millions of users with zero ad spend. When we added premium features, people converted because they already saw the value.</p>
                </div>
              </div>

              
              {/* Row 4 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Always shopping for prices</h3>
                <div className="text-gray-700 space-y-3">
                  <p>Cherry-picking offers is an art. We got $100K worth of GPU compute for $10K per year just by shopping cloud credits, trials, and beta access. Same approach works for office space, software, everything.</p>
                  <p>Most people are lazy about this. They see a price and accept it. But every price is negotiable, every service has competitors, every vendor has promotions.</p>
                  <p>Do it while it's worth your money. If you can get $1K by asking a simple question that takes you 3 minutes, that's $20K per hour! In contrast, getting $2 discount for the same time probably is not worth it.</p>
                </div>
              </div>

              
              {/* Row 5 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Offer everything except high salary</h3>
                <div className="text-gray-700 space-y-3">
                  <p>Flexibility, learning, reduced hours before money. When hiring, most people focus on salary first. But there's so much more you can offer: flexible schedules, remote work, learning opportunities, interesting projects.</p>
                  <p>We found talented developers who valued remote work over $20K salary increases. Designers who preferred creative freedom over corporate benefits. When you can't compete on salary, compete on everything else.</p>
                  <p>The key is finding people who value what you can offer. Don't try to convince someone who only cares about money. Find the people who care about what you actually have.</p>
                </div>
              </div>

              
              {/* Row 6 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Think about the evil side</h3>
                <div className="text-gray-700 space-y-3">
                  <p>Why viral products get negative press (and that's okay). When something goes viral, people will find the worst possible use case and write about it. Plan for this. Our face generation tool got criticized for deepfakes. Our icon library got called "cookie cutter design."</p>
                  <p>The negative coverage often drives more users than positive reviews. People hear about the controversy, try the product to see what the fuss is about, and become regular users. Don't be afraid of some negative press if your product is genuinely useful.</p>
                  <p>Just make sure the core product serves a real need. Controversy around a useless product kills it. Controversy around a useful product spreads it.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">About This Book</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "Real-World Experience",
                  description: "This book distills practical lessons from building and scaling multiple technology companies without traditional venture funding. Each chapter focuses on actionable strategies that work in the real world of constrained resources and ambitious goals."
                },
                {
                  title: "Proven Results",
                  description: "Unlike theoretical business books, these insights come from actual experience managing teams of 150+ people, serving 4+ million users, and navigating the challenges of building global technology companies from unexpected locations."
                },
                {
                  title: "Framework for Growth",
                  description: "Whether you're a first-time founder or an experienced entrepreneur looking to optimize operations, these 13 strategies provide a framework for sustainable growth without burning through investor capital."
                }
              ]}
            />
            
            <div className="full-width" style={{ marginTop: '28px' }}>
              <p className="coming-soon">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        
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
        
        .full-width p {
          font-size: 1.12rem;
          color: #333;
          margin-bottom: 0.7rem;
        }


        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-content {
            max-width: 1200px;
        }
        
        .hero-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero-text {
            
        }
        
        .hero-image {
            display: flex;
            justify-content: center;
        }
        
        .book-cover-large {
            max-width: 300px;
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .book-title {
          font-family: 'Cormorant', serif;
          font-size: 3.75rem; /* 6xl */
          line-height: 1;
          color: #950303;
          margin-bottom: 1rem;
          font-weight: 400;
        }
        
        @media (min-width: 768px) {
          .book-title {
            font-size: 6rem; /* 8xl */
          }
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
        
        .pixel-font {
            font-family: 'Press Start 2P', 'Courier New', monospace !important;
            text-shadow: none !important;
            font-size: 2rem !important;
            letter-spacing: -1px;
            display: inline-block;
            line-height: 1.2;
        }

        .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-weight: 400;
        }

        .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.6;
        }

        .book-content h2 {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2rem;
        }
        
        /* Excerpt content styling */
                
        .excerpt-block h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
            color: var(--primary-color);
        }
        
        .excerpt-block p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.6;
        }
        
        .excerpt-block p:last-child {
            margin-bottom: 0;
        }
        
        .coming-soon {
            font-size: 1.1rem;
            color: var(--secondary-color);
            margin: 0;
            text-align: center;
        }


        .cta-button {
            background: var(--accent-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-block;
            margin-top: 1rem;
        }

        .cta-button:hover {
            background: #3a4db8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(69, 93, 204, 0.25);
        }

        @media (max-width: 768px) {
            .hero-layout {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .fun-title-fill {
                font-size: 2rem !important;
            }

            .book-cover-large {
                max-width: 200px;
            }

            .toc-grid {
                grid-template-columns: 1fr;
            }
            
            .part-title {
                font-size: 1.2rem;
            }
            
            .excerpts-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
        }
      `}</style>
    </Layout>
  )
}