import Head from 'next/head'
import Layout from '../../components/Layout'
import LargeCards from '../../components/LargeCards'
import Link from 'next/link'

export default function Book() {
  return (
    <Layout>
      <Head>
        <title>Libro - Ivan Braun</title>
        <meta name="description" content="El libro de Ivan Braun sobre construir empresas de IA sin capital de riesgo." />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://ivanbraun.com/es/book" />
        <link rel="alternate" href="https://ivanbraun.com/book" hrefLang="en" />
        <link rel="alternate" href="https://ivanbraun.com/pt/book" hrefLang="pt" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <h1 className="book-title text-6xl md:text-8xl font-normal mb-4" style={{ fontFamily: 'Cormorant', color: '#950303' }}>Zero to AI</h1>
                <p className="subtitle">Una guía práctica para construir y escalar empresas tecnológicas sin financiamiento tradicional. Basado en experiencia real gestionando equipos de 150+ personas y sirviendo a millones de usuarios, este libro ofrece lecciones prácticas en gestión, marketing y finanzas que realmente funcionan cuando estás bootstrapping.</p>
              </div>
              <div className="hero-image">
                <img src="/i/zero-to-ai.jpg" alt="Kill the Budget and 12 Other Ways to Bootstrap book cover" className="book-cover-large" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <h2 className="fun-title"><span className="fun-title-fill">Extractos del Libro</span></h2>
          
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mata los presupuestos, no los sueños</h3>
              <div className="text-gray-700 space-y-3">
                <p>Los presupuestos son una mierda. Son una suposición sobre precios óptimos que se convierte en evangelio...</p>
                <p>Si tienes $100k para marketing, no los gastes todos. Gasta $10k, aprende, luego gasta otros $10k sabiendo qué hace que la gente compre.</p>
              </div>
            </div>
            
            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Contrata como un algoritmo de compresión</h3>
              <div className="text-gray-700 space-y-3">
                <p>Los algoritmos de compresión encuentran patrones en los datos y eliminan redundancias. Cuando contratas, haz lo mismo.</p>
                <p>No contrates un especialista en cada canal. Contrata una persona que pueda encontrar el patrón subyacente en todos los canales.</p>
              </div>
            </div>

            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Haz dinero real, no dinero de PowerPoint</h3>
              <div className="text-gray-700 space-y-3">
                <p>Hay dos tipos de dinero: dinero real y dinero de PowerPoint. El dinero real viene de clientes pagando por valor.</p>
                <p>El dinero de PowerPoint viene de inversores pagando por potencial futuro. Construye tu negocio en dinero real.</p>
              </div>
            </div>

            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">El efecto red es real, pero sobrevalorado</h3>
              <div className="text-gray-700 space-y-3">
                <p>Los efectos de red no garantizan el éxito. Facebook tuvo que competir con MySpace. WhatsApp tuvo que competir con BBM.</p>
                <p>Construye un gran producto primero. Los efectos de red son la cereza del pastel, no el pastel.</p>
              </div>
            </div>
          </div>
        </div>

        <LargeCards 
          title="Testimonios"
          items={[
            {
              title: "\"Consejos prácticos que realmente funcionan\"",
              description: "A diferencia de la mayoría de libros de negocios, este está lleno de estrategias que han sido probadas en batalla en empresas reales generando ingresos reales."
            },
            {
              title: "\"Finalmente, un libro honesto sobre bootstrapping\"",
              description: "Ivan no endulza la realidad de construir una empresa sin fondos. Te dice exactamente lo que necesitas escuchar, no lo que quieres escuchar."
            }
          ]}
        />

        <div className="coming-soon-section">
          <h2 className="fun-title"><span className="fun-title-fill">Próximamente</span></h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Basado en 15 años de experiencia construyendo empresas de IA rentables, este libro comparte las lecciones reales de crecer de cero a millones de usuarios sin capital de riesgo.
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .hero-section {
          margin-bottom: 4rem;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .hero-layout {
            grid-template-columns: 1fr 400px;
          }
        }

        .book-title {
          line-height: 0.9;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .book-cover-large {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .fun-title {
          margin-top: 28px !important;
          margin-bottom: 2rem !important;
          position: relative;
          display: inline-block;
          font-size: 3rem;
          font-weight: 400 !important;
          font-family: 'Cormorant', serif !important;
          line-height: 1.1;
          color: #950303;
        }

        .fun-title-fill {
          position: relative;
          color: #950303;
          font-size: 2.5rem !important;
          font-weight: 400 !important;
          font-family: 'Cormorant', serif !important;
          z-index: 2;
          text-shadow:
            -1px 0 0 #dd9e8e,
            1px 0 0 #53cb82;
        }

        .book-content {
          margin-bottom: 4rem;
        }

        .grid {
          display: grid;
          gap: 1rem;
        }

        .grid-cols-8 {
          grid-template-columns: repeat(8, 1fr);
        }

        .col-span-8 {
          grid-column: span 8;
        }

        @media (min-width: 768px) {
          .col-span-8.md\\:col-span-4 {
            grid-column: span 4;
          }
        }

        .coming-soon-section {
          text-align: center;
          padding: 3rem 0;
          background: #f9fafb;
          border-radius: 12px;
          margin-top: 3rem;
        }
      `}</style>
    </Layout>
  )
}