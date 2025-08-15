import Head from 'next/head'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import MediaCoverage from '../../components/MediaCoverage'
import Experience from '../../components/Experience'
import Awards from '../../components/Awards'
import Speaking from '../../components/Speaking'
import Government from '../../components/Government'

const translations = {
  es: {
    title: "Ivan Braun – Emprendedor, Inversor, Speaker IA",
    description: "Fundó y bootstrapped Icons8 y Generated Photos, sirviendo a más de 4M usuarios con herramientas creativas y funciones impulsadas por IA. Construyó equipo remoto de 150 personas. Speaker internacional sobre transformación IA y crecimiento bootstrapped.",
    subtitle: "Pionero IA • Tecnología Creativa • 4M Usuarios",
    introText: "Busco conversaciones inspiradoras, hablar en conferencias y servir como asesor de startups."
  }
}

export default function HomeES() {
  const t = translations.es

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
        descriptionWithLinks={
          <>
            Fundó y bootstrapped <a href="https://icons8.com" className="text-blue-600 no-underline hover:text-gray-900">Icons8</a> y <a href="https://generated.photos" className="text-blue-600 no-underline hover:text-gray-900">Generated Photos</a>, sirviendo a más de 4M usuarios con herramientas creativas y funciones impulsadas por IA. Construyó equipo remoto de 150 personas. Speaker internacional sobre transformación IA y crecimiento bootstrapped.
          </>
        }
        introText={t.introText}
        language="es"
      />
      
      <MediaCoverage language="es" />
      <Experience language="es" />
      <Speaking language="es" />
      <Awards language="es" />
      <Government language="es" />
    </Layout>
  )
}