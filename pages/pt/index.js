import Head from 'next/head'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import MediaCoverage from '../../components/MediaCoverage'
import Experience from '../../components/Experience'
import Speaking from '../../components/Speaking'

export default function HomePT() {
  const t = {
    title: "Ivan Braun – Empreendedor, Investidor, Speaker IA",
    description: "Fundador de tecnologia liderando mais de 150 membros da equipe, servindo 4M usuários. Baseado em Cariló, Argentina. Procuro conversas inspiradoras, palestrar em conferências e servir como consultor de startups.",
    subtitle: "Empreendedor Tecnológico, Speaker IA, Investidor",
    introText: "Procuro conversas inspiradoras, palestrar em conferências e servir como consultor de startups."
  }

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
      />
      
      <MediaCoverage />
      <Experience />
      <Speaking />
    </Layout>
  )
}