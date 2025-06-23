import Head from 'next/head'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'

export default function Visit() {
  return (
    <Layout>
      <Head>
        <title>Visitarme en Cariló - Ivan Braun</title>
        <meta name="description" content="He construido una villa para invitar a compañeros fundadores de tech. Es una construcción costosa en el hermoso lugar donde el bosque de pinos se encuentra con el océano." />
        <link rel="canonical" href="https://ivanbraun.com/es/visit" />
        <link rel="alternate" href="https://ivanbraun.com/visit" hrefLang="en" />
        <link rel="alternate" href="https://ivanbraun.com/pt/visit" hrefLang="pt" />
      </Head>

      <Hero
        title="Visitarme en Cariló"
        subtitle=""
        description="He construido una villa para invitar a compañeros fundadores de tech. Es una construcción costosa en el hermoso lugar donde el bosque de pinos se encuentra con el océano. Está a 4 horas de Buenos Aires."
        introText="Si la reservas, haré mi mejor esfuerzo para visitarte, dar la mano y charlar (a veces por horas, así que échame cuando te canses)."
        imageUrl="/i/hero-villa-exterior.jpeg"
      />

      <style jsx>{`
        /* Inherits styles from Hero component and Layout */
      `}</style>
    </Layout>
  )
}