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
    description: "Founded and bootstrapped Icons8 and Generated Photos, serving 4M+ users with AI-powered creative tools. Built remote teams of 150+ people. Pioneer in AI implementation for design and creative industries. International speaker on AI transformation and bootstrapped growth.",
    subtitle: "AI Pioneer • Creative Tech • 4M Users",
    introText: "I'm looking to find inspiring conversations, speak at conferences, and serve as an advisor for startups."
  },
  es: {
    title: "Ivan Braun – Emprendedor, Inversor, Speaker IA",
    description: "Fundó y bootstrapped Icons8 y Generated Photos, sirviendo a más de 4M usuarios con herramientas creativas impulsadas por IA. Construyó equipos remotos de más de 150 personas. Pionero en implementación de IA para industrias de diseño y creativas. Speaker internacional sobre transformación IA y crecimiento bootstrapped.",
    subtitle: "Pionero IA • Tecnología Creativa • 4M Usuarios",
    introText: "Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups."
  },
  pt: {
    title: "Ivan Braun – Empreendedor, Investidor, Speaker IA",
    description: "Fundou e fez bootstrapped de Icons8 e Generated Photos, servindo mais de 4M usuários com ferramentas criativas alimentadas por IA. Construiu equipes remotas de mais de 150 pessoas. Pioneiro na implementação de IA para indústrias de design e criativas. Palestrante internacional sobre transformação IA e crescimento bootstrapped.",
    subtitle: "Pioneiro IA • Tecnologia Criativa • 4M Usuários",
    introText: "Procuro conversas inspiradoras, palestrar em conferências e servir como consultor de startups."
  }
}

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const language = locale || 'en'
  const t = translations[language] || translations.en

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
        introText={t.introText}
        language={language}
      />
      
      <MediaCoverage language={language} />
      <Experience language={language} />
      <Speaking language={language} />
      <Awards language={language} />
      <Government language={language} />
    </Layout>
  )
}