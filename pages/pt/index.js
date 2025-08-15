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
    description: "Fundou e fez bootstrapped de Icons8 e Generated Photos, servindo mais de 4M usuários com ferramentas criativas e recursos alimentados por IA. Construiu equipe remota de 150 pessoas. Palestrante internacional sobre transformação IA e crescimento bootstrapped.",
    subtitle: "Pioneiro IA • Tecnologia Criativa • 4M Usuários",
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
        descriptionWithLinks={
          <>
            Fundou e fez bootstrapped de <a href="https://icons8.com" className="text-blue-600 no-underline hover:text-gray-900">Icons8</a> e <a href="https://generated.photos" className="text-blue-600 no-underline hover:text-gray-900">Generated Photos</a>, servindo mais de 4M usuários com ferramentas criativas e recursos alimentados por IA. Construiu equipe remota de 150 pessoas. Palestrante internacional sobre transformação IA e crescimento bootstrapped.
          </>
        }
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