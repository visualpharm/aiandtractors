import Head from 'next/head'
import Layout from '../../components/Layout'
import CTAButtons from '../../components/CTAButtons'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contacto - Ivan Braun</title>
        <meta name="description" content="Ponte en contacto con Ivan Braun para conferencias de IA, asesoría o inversiones en startups." />
        <link rel="canonical" href="https://ivanbraun.com/es/contact" />
        <link rel="alternate" href="https://ivanbraun.com/contact" hrefLang="en" />
        <link rel="alternate" href="https://ivanbraun.com/pt/contact" hrefLang="pt" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <h1>Contacto</h1>
          <p className="intro-text">
            Conectemos. Ya sea que necesites un orador para tu próximo evento de IA, asesoría para tu startup, o quieras discutir oportunidades de inversión, estoy aquí para ayudar.
          </p>
        </div>

        <div className="content-grid">
          <div className="section">
            <h2 className="section-title">✅ Buscando</h2>
            <ul className="looking-for-list">
              <li><strong>Conferencias</strong>: Conferencias de IA, eventos corporativos, charlas de startups</li>
              <li><strong>Inversión</strong>: IA + sectores reales (ej. PropTech, manufactura), herramientas de IA B2B</li>
              <li><strong>Asesoría</strong>: Startups tech, implementación de IA, equipos remotos</li>
              <li><strong>Colaboración</strong>: Proyectos relacionados con medios sintéticos, datos generados por IA</li>
              <li><strong>Networking</strong>: Otros fundadores bootstrapped, expertos en IA, emprendedores internacionales</li>
            </ul>
          </div>

          <div className="section">
            <h2 className="section-title">❌ No Buscando</h2>
            <ul className="not-looking-for-list">
              <li>Oportunidades de trabajo a tiempo completo</li>
              <li>Inversiones de alto riesgo sin tracción comprobada</li>
              <li>Proyectos que requieren capital de riesgo significativo</li>
              <li>Consultoría a largo plazo (más de 6 meses)</li>
              <li>Startups en etapa de idea sin MVP</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h2 className="section-title">Conectemos</h2>
          <p>¿Listo para colaborar? Ponte en contacto y charlemos sobre cómo podemos trabajar juntos.</p>
          <CTAButtons />
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          color: var(--primary-color);
          line-height: 1.1;
          font-family: 'DotGothic16', sans-serif;
        }

        .intro-text {
          font-size: 1.2rem;
          color: var(--secondary-color);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .section {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border-color);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--primary-color);
          font-family: 'DotGothic16', sans-serif;
        }

        .looking-for-list,
        .not-looking-for-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .looking-for-list li,
        .not-looking-for-list li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
          color: var(--secondary-color);
          line-height: 1.5;
        }

        .looking-for-list li:last-child,
        .not-looking-for-list li:last-child {
          border-bottom: none;
        }

        .looking-for-list li strong {
          color: var(--primary-color);
          font-weight: 600;
        }

        .cta-section {
          text-align: center;
          background: #f9fafb;
          padding: 3rem 2rem;
          border-radius: 12px;
        }

        .cta-section h2 {
          font-size: 2rem;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
          font-family: 'DotGothic16', sans-serif;
        }

        .cta-section p {
          font-size: 1.1rem;
          color: var(--secondary-color);
          margin: 0 0 2rem 0;
          line-height: 1.6;
        }
      `}</style>
    </Layout>
  )
}