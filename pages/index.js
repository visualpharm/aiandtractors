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
    description: "Tech founder leading 150+ team members, serving 4M users. Based in San Francisco and Cariló, Argentina. Recent construction including coliving for tech founders and Argentinian shelter in case of a global meltdown. One successful innovation was having a QA engineer working on error logging. I'm looking to find inspiring conversations, speak at conferences, and serve as an advisor for startups.",
    subtitle: "Tech Entrepreneur, AI Speaker, Investor",
    introText: "I'm looking to find inspiring conversations, speak at conferences, and serve as an advisor for startups."
  },
  es: {
    title: "Ivan Braun – Emprendedor, Inversor, Speaker IA",
    description: "Fundador tecnológico liderando más de 150 miembros del equipo, sirviendo a 4M usuarios. Basado en San Francisco y Cariló, Argentina. Construcción reciente incluyendo coliving para fundadores de tecnología y refugio argentino en caso de colapso global. Una innovación exitosa fue tener un ingeniero QA trabajando en el registro de errores.",
    subtitle: "Emprendedor Tecnológico, Speaker IA, Inversor",
    introText: "Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups."
  },
  pt: {
    title: "Ivan Braun – Empreendedor, Investidor, Speaker IA",
    description: "Fundador de tecnologia liderando mais de 150 membros da equipe, servindo 4M usuários. Baseado em San Francisco e Cariló, Argentina. Construção recente incluindo coliving para fundadores de tecnologia e abrigo argentino em caso de colapso global. Uma inovação bem-sucedida foi ter um engenheiro QA trabalhando no registro de erros.",
    subtitle: "Empreendedor Tecnológico, Speaker IA, Investidor",
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