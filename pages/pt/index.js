import Head from 'next/head'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import MediaCoverage from '../../components/MediaCoverage'
import Experience from '../../components/Experience'
import Awards from '../../components/Awards'
import Speaking from '../../components/Speaking'
import Government from '../../components/Government'

const translations = {
  pt: {
    title: "Ivan Braun – Empreendedor, Investidor, Speaker IA",
    description: "Fundador de tecnologia liderando mais de 150 membros da equipe, servindo 4M usuários. Baseado em Cariló, Argentina.",
    subtitle: "Empreendedor Tecnológico, Speaker IA, Investidor",
    introText: "Procuro conversas inspiradoras, palestrar em conferências e servir como consultor de startups."
  }
}

export default function HomePT() {
  const t = translations.pt

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href="https://ivanbraun.com/pt" />
        <link rel="alternate" hrefLang="en" href="https://ivanbraun.com" />
        <link rel="alternate" hrefLang="es" href="https://ivanbraun.com/es" />
        <link rel="alternate" hrefLang="pt" href="https://ivanbraun.com/pt" />
      </Head>

      <Hero 
        title="Ivan Braun"
        subtitle={t.subtitle}
        description={t.description}
        introText={t.introText}
        language="pt"
      />
      
      <MediaCoverage language="pt" />
      <Experience language="pt" />
      <Speaking language="pt" />
      <Awards language="pt" />
      <Government language="pt" />
    </Layout>
  )
}