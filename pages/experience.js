import Head from 'next/head'
import Image from 'next/image'
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
    humanGen: "Human Generator – full-body humans",
    toolsIntro: "My three areas of expertise are:",
    booksFormed: "Books that formed me:",
    learningHardWay: "Learning it all hard way",
    products: "PRODUCTS WE'VE LAUNCHED"
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
    humanGen: "Human Generator – humanos de cuerpo completo",
    toolsIntro: "Mis tres áreas de especialización son:",
    booksFormed: "Libros que me formaron:",
    learningHardWay: "Aprendiéndolo todo por las malas",
    products: "PRODUCTOS QUE HEMOS LANZADO"
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
    humanGen: "Human Generator – humanos de corpo inteiro",
    toolsIntro: "Minhas três áreas de especialização são:",
    booksFormed: "Livros que me formaram:",
    learningHardWay: "Aprendendo tudo da maneira difícil",
    products: "PRODUTOS QUE LANÇAMOS"
  }
}

export default function Experience() {
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
  
  // Set page title
  const pageTitle = t.title

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={`https://ivanbraun.com/experience${locale === 'en' ? '' : '/' + locale}`} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
      </Head>

      <div className="max-w-6xl mx-auto px-8 py-12" style={{ paddingTop: '42px' }}>
        <div className="bg-gray-50 py-16 px-0 -mx-8 mb-12">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="max-w-3xl">
                <h1 className="text-6xl font-bold mb-6 text-gray-900 leading-tight" style={{ fontFamily: "'DotGothic16', sans-serif" }}>{t.heading}</h1>
                <div>
                  <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.intro}</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <img src="/i/experience.png" alt="Ivan Braun Experience" className="max-w-full max-h-96 h-auto w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* WORK HISTORY */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="text-left">
              <h2 className="text-sm font-medium m-0 text-gray-600 uppercase tracking-wider">WORK HISTORY</h2>
            </div>
            <div>
              <p className="m-0 text-lg leading-relaxed text-gray-600">
                I'm a tech founder leading a team of 150 and serving 4M users.
              </p>
            </div>
            <div className="text-left">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img src="/i/logos/icons8-icons8.svg" alt="Icons8" className="w-6 h-6 mr-2" />
                  <strong className="text-gray-900">
                    <a href="https://icons8.com" className="text-gray-900 no-underline hover:text-blue-600">Icons8</a>
                  </strong>
                </div>
                <p className="m-0 text-sm text-gray-600 italic">Founder and CEO</p>
                <p className="m-0 text-sm text-gray-600">Graphics for AI age</p>
              </div>
            </div>
            <div className="text-left">
              <div>
                <div className="flex items-center mb-2">
                  <img src="/i/logos/icons8-generated-photos.svg" alt="Generated Photos" className="w-6 h-6 mr-2" />
                  <strong className="text-gray-900">
                    <a href="https://generated.photos" className="text-gray-900 no-underline hover:text-blue-600">Generated Photos</a>
                  </strong>
                </div>
                <p className="m-0 text-sm text-gray-600">Face AI and synthetic data</p>
                <p className="m-0 text-sm text-gray-600 italic">Founder and CEO</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">{t.toolsIntro}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-8">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.customerDev}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.booksFormed}</p>
            <div className="flex gap-4 items-center flex-wrap mt-4">
              <a href="https://rosenfeldmedia.com/books/interviewing-users-second-edition/" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/interviewing-users.jpg" alt="Interviewing Users" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
              <a href="https://www.harpercollins.com/products/competing-against-luck-clayton-m-christensentaddy-hallkaren-dillondavid-s-duncan?variant=32207691743266" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/competing-against-luck.jpg" alt="Competing Against Luck" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.uxDesign}, {t.uxSubtitle}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.booksFormed}</p>
            <div className="flex gap-4 items-center flex-wrap mt-4">
              <a href="https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/about-face.webp" alt="About Face" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
              <a href="https://www.nngroup.com/books/designing-web-usability/" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/designing-web-usability.jpg" alt="Designing Web Usability" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.paywalls}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.learningHardWay}</p>
          </div>
        </div>
        
        {/* PRODUCTS WE'VE LAUNCHED */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">{t.products}</h2>
          <SmallCards 
            title=""
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
        </div>

        <div className="mb-12 mt-8 rounded-xl overflow-hidden border border-gray-200">
          <video autoPlay muted loop playsInline className="w-full h-auto block">
            <source src="/i/human-generator.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">ACHIEVEMENTS</h2>
          <SmallCards 
            title=""
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
        </div>

        {/* Metrics */}
        <div className="mb-12">
          <div className="flex flex-nowrap justify-center gap-4 md:gap-8 lg:gap-16 mt-8 overflow-x-auto" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
            {[
              { number: '4M', icon: '👥', label: 'users', sublabel: 'Globally' },
              { number: '150', icon: '👥', label: 'team', sublabel: '' },
              { number: '$0', icon: '', label: 'equity sold', sublabel: '' },
              { number: '$0', icon: '', label: 'debt', sublabel: '' },
              { number: `${new Date().getFullYear() - 2002}`, icon: '', label: 'years', sublabel: 'creative tech' },
              { number: '$54.6K', icon: '', label: 'avg server', sublabel: 'price' },
              { number: '1st', icon: '', label: 'vendor of', sublabel: 'Canva' }
            ].map((metric, index) => (
              <div key={index} className="text-center flex-shrink-0 min-w-[80px] max-w-[120px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
                  {metric.number} {metric.icon}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mt-1 md:mt-2 leading-tight break-words">
                  {metric.label}
                  {metric.sublabel && <><br/>{metric.sublabel}</>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GOVERNMENT & REGULATORY */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">GOVERNMENT & REGULATORY</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-8 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Government & Regulatory</h3>
              <p className="text-gray-600 text-sm leading-relaxed">I consult governments on AI regulation, creative tools, intellectual property, and ethics. The agencies I've worked with:</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-eu text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">European Commission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">AI regulation and policy consultation for the European Union</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-us text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">U.S. Department of Justice</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Antitrust and competition matters related to creative tech</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-gb text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">UK Competition and Markets Authority</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Antitrust and competition matters related to creative tech</p>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}