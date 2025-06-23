import Head from 'next/head'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function IASpeaker() {
  return (
    <Layout>
      <Head>
        <title>IA Speaker - Ivan Braun | Experto en Inteligencia Artificial</title>
        <meta name="description" content="Ivan Braun, speaker de IA y experto en inteligencia artificial. Conferencias sobre desarrollo de productos IA, medios sintéticos y emprendimiento tecnológico." />
        <meta name="keywords" content="ia speaker, experto en ia, conferencias inteligencia artificial, speaker tecnologia argentina" />
        <link rel="canonical" href="https://ivanbraun.com/es/ia-speaker" />
      </Head>

      <div className="seo-page">
        <div className="hero-section">
          <div className="container">
            <h1>IA Speaker</h1>
            <p className="lead">Experto en inteligencia artificial y desarrollo de productos IA sin capital de riesgo. Disponible para conferencias internacionales.</p>
            
            <div className="cta-section">
              <Link href="/es/contact" className="cta-button primary">Contratar como Speaker</Link>
              <Link href="/es#speaking" className="cta-button secondary">Ver Experiencia</Link>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="container">
            <div className="expertise-grid">
              <div className="expertise-card">
                <h3>🤖 Desarrollo de Productos IA</h3>
                <p>De cero a 4M+ usuarios sin capital de riesgo. Aprende cómo construir y monetizar productos de IA usando enfoques lean y bootstrapped.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🎭 Medios Sintéticos y Ética</h3>
                <p>Navega el complejo mundo del contenido generado por IA, deepfakes y datos sintéticos con perspectivas prácticas de la industria.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🚀 Escalamiento de Equipos IA</h3>
                <p>De fundador solo a liderar 150+ profesionales. Estrategias prácticas para construir y gestionar organizaciones enfocadas en IA.</p>
              </div>
            </div>

            <div className="speaking-topics">
              <h2>Temas Populares de Conferencias</h2>
              <ul>
                <li><strong>El Futuro de los Medios Sintéticos:</strong> Oportunidades y desafíos en contenido generado por IA</li>
                <li><strong>Bootstrapping Productos IA:</strong> Construyendo empresas IA exitosas sin financiamiento VC</li>
                <li><strong>Ética en Desarrollo IA:</strong> Innovación responsable en medios sintéticos</li>
                <li><strong>De Idea a 4M Usuarios:</strong> Escalando productos IA globalmente</li>
                <li><strong>Manual del Emprendedor IA:</strong> Estrategias prácticas para startups de IA</li>
              </ul>
            </div>

            <div className="credentials">
              <h2>Credenciales como Speaker</h2>
              <div className="credentials-grid">
                <div>
                  <h4>🎯 Próximos Eventos</h4>
                  <ul>
                    <li>Horasis Global Meeting (São Paulo, Oct 2025)</li>
                    <li>Rio Innovation Week (Rio de Janeiro, Ago 2025)</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🏆 Reconocimientos</h4>
                  <ul>
                    <li>Premio Visitor's Choice en Visual 1st Conference</li>
                    <li>Destacado en BBC, Washington Post, The Verge</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🌍 Alcance Global</h4>
                  <ul>
                    <li>Sirviendo 4M+ usuarios globalmente</li>
                    <li>Liderando equipo de 150+ profesionales</li>
                    <li>Fluido en español, inglés, portugués, italiano</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .seo-page {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 6rem 0 4rem 0;
          text-align: center;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h1 {
          font-family: 'DotGothic16', monospace;
          font-size: 3.5rem;
          font-weight: 400;
          color: var(--primary-color);
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }

        .lead {
          font-size: 1.25rem;
          color: var(--secondary-color);
          margin: 0 0 3rem 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cta-button.primary {
          background: var(--primary-color);
          color: white;
        }

        .cta-button.primary:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
        }

        .cta-button.secondary {
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        }

        .cta-button.secondary:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        .content-section {
          padding: 4rem 0;
        }

        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .expertise-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .expertise-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .expertise-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .speaking-topics {
          margin-bottom: 4rem;
        }

        .speaking-topics h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .speaking-topics ul {
          list-style: none;
          padding: 0;
        }

        .speaking-topics li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.6;
        }

        .speaking-topics li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-color);
          font-weight: 600;
        }

        .credentials h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--primary-color);
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .credentials-grid h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
        }

        .credentials-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .credentials-grid li {
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .cta-section {
            flex-direction: column;
            align-items: center;
          }

          .expertise-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  )
}