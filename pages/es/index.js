import Head from 'next/head'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import MediaCoverage from '../../components/MediaCoverage'
import Experience from '../../components/Experience'
import Speaking from '../../components/Speaking'

export default function HomeES() {
  const t = {
    title: "Ivan Braun – Emprendedor, Inversor, Speaker IA",
    description: "Fundador tecnológico liderando más de 150 miembros del equipo, sirviendo a 4M usuarios. Basado en Cariló, Argentina. Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups.",
    subtitle: "Emprendedor Tecnológico, Speaker IA, Inversor",
    introText: "Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups."
  }

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link rel="canonical" href="https://ivanbraun.com/es" />
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