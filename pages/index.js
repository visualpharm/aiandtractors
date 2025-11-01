import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import MediaCoverage from '../components/MediaCoverage'
import Experience from '../components/Experience'
import Awards from '../components/Awards'
import Speaking from '../components/Speaking'
import Government from '../components/Government'

const translations = {
  en: {
    title: "Ivan Braun – Entrepreneur, Investor, AI Speaker",
    description: "Founded and bootstrapped Icons8 and Generated Photos, serving 4M+ users with creative tools and AI-powered features. Built remote team of 150 people. International speaker on AI transformation and bootstrapped growth.",
    subtitle: "AI Pioneer • Creative Tech • 4M Users",
    introText: "I'm looking to find inspiring conversations, speak at conferences, and serve as an advisor for startups."
  },
  es: {
    title: "Ivan Braun – Emprendedor, Inversor, Speaker IA",
    description: "Fundó y bootstrapped Icons8 y Generated Photos, sirviendo a más de 4M usuarios con herramientas creativas y funciones impulsadas por IA. Construyó equipo remoto de 150 personas. Speaker internacional sobre transformación IA y crecimiento bootstrapped.",
    subtitle: "Pionero IA • Tecnología Creativa • 4M Usuarios",
    introText: "Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups."
  },
  pt: {
    title: "Ivan Braun – Empreendedor, Investidor, Speaker IA",
    description: "Fundou e fez bootstrapped de Icons8 e Generated Photos, servindo mais de 4M usuários com ferramentas criativas e recursos alimentados por IA. Construiu equipe remota de 150 pessoas. Palestrante internacional sobre transformação IA e crescimento bootstrapped.",
    subtitle: "Pioneiro IA • Tecnologia Criativa • 4M Usuários",
    introText: "Procuro conversas inspiradoras, palestrar em conferências e servir como consultor de startups."
  }
}

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const language = locale || 'en'
  const t = translations[language] || translations.en

  const descriptionWithLinks = language === 'en' ? (
    <>
      Founded and bootstrapped <a href="https://icons8.com" className="text-blue-600 no-underline hover:text-gray-900">Icons8</a> and <a href="https://generated.photos" className="text-blue-600 no-underline hover:text-gray-900">Generated Photos</a>, serving 4M+ users with creative tools and AI-powered features. Built remote team of 150 people. International speaker on AI transformation and bootstrapped growth.
    </>
  ) : language === 'es' ? (
    <>
      Fundó y bootstrapped <a href="https://icons8.com" className="text-blue-600 no-underline hover:text-gray-900">Icons8</a> y <a href="https://generated.photos" className="text-blue-600 no-underline hover:text-gray-900">Generated Photos</a>, sirviendo a más de 4M usuarios con herramientas creativas y funciones impulsadas por IA. Construyó equipo remoto de 150 personas. Speaker internacional sobre transformación IA y crecimiento bootstrapped.
    </>
  ) : language === 'pt' ? (
    <>
      Fundou e fez bootstrapped de <a href="https://icons8.com" className="text-blue-600 no-underline hover:text-gray-900">Icons8</a> e <a href="https://generated.photos" className="text-blue-600 no-underline hover:text-gray-900">Generated Photos</a>, servindo mais de 4M usuários com ferramentas criativas e recursos alimentados por IA. Construiu equipe remota de 150 pessoas. Palestrante internacional sobre transformação IA e crescimento bootstrapped.
    </>
  ) : null

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href={`https://ivanbraun.com${language === 'en' ? '' : '/' + language}`} />
        <link rel="alternate" hrefLang="en" href="https://ivanbraun.com" />
        <link rel="alternate" hrefLang="es" href="https://ivanbraun.com/es" />
        <link rel="alternate" hrefLang="pt" href="https://ivanbraun.com/pt" />
      </Head>

      <Hero 
        title="Ivan Braun"
        subtitle={t.subtitle}
        description={t.description}
        descriptionWithLinks={descriptionWithLinks}
        introText={t.introText}
        language={language}
      />
      
      <MediaCoverage language={language} />
      <div style={{ height: '30px' }} />
      <Experience language={language} />
      <Speaking language={language} />
      <Awards language={language} />
      <Government language={language} />
    </Layout>
  )
}