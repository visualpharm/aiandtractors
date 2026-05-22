import Head from 'next/head'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function SpeakerIA() {
  return (
    <Layout>
      <Head>
        <title>Speaker IA - Ivan Braun | Especialista em Inteligência Artificial</title>
        <meta name="description" content="Ivan Braun, speaker de IA e especialista em inteligência artificial. Palestras sobre desenvolvimento de produtos IA, mídia sintética e empreendedorismo tecnológico." />
        <meta name="keywords" content="speaker ia, especialista em ia, palestrante inteligencia artificial, speaker tecnologia brasil" />
        <link rel="canonical" href="https://ivanbraun.com/pt/speaker-ia" />
      </Head>

      <div className="seo-page">
        <div className="hero-section">
          <div className="container">
            <h1>Speaker IA</h1>
            <p className="lead">Especialista em inteligência artificial e desenvolvimento de produtos IA sem capital de risco. Disponível para conferências internacionais.</p>
            
            <div className="cta-section">
              <Link href="/pt/contact" className="cta-button primary">Contratar como Speaker</Link>
              <Link href="/pt#speaking" className="cta-button secondary">Ver Experiência</Link>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="container">
            <div className="expertise-grid">
              <div className="expertise-card">
                <h3>🤖 Desenvolvimento de Produtos IA</h3>
                <p>De zero a 4M+ usuários sem capital de risco. Aprenda como construir e monetizar produtos de IA usando abordagens lean e bootstrapped.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🎭 Mídia Sintética e Ética</h3>
                <p>Navegue o mundo complexo do conteúdo gerado por IA, deepfakes e dados sintéticos com perspectivas práticas da indústria.</p>
              </div>
              
              <div className="expertise-card">
                <h3>🚀 Escalamento de Equipes IA</h3>
                <p>De fundador solo a liderar 150 contratados full-time. Estratégias práticas para construir e gerenciar organizações focadas em IA.</p>
              </div>
            </div>

            <div className="speaking-topics">
              <h2>Tópicos Populares de Palestras</h2>
              <ul>
                <li><strong>O Futuro da Mídia Sintética:</strong> Oportunidades e desafios em conteúdo gerado por IA</li>
                <li><strong>Bootstrapping Produtos IA:</strong> Construindo empresas IA bem-sucedidas sem financiamento VC</li>
                <li><strong>Ética no Desenvolvimento IA:</strong> Inovação responsável em mídia sintética</li>
                <li><strong>De Ideia a 4M Usuários:</strong> Escalando produtos IA globalmente</li>
                <li><strong>Manual do Empreendedor IA:</strong> Estratégias práticas para startups de IA</li>
              </ul>
            </div>

            <div className="credentials">
              <h2>Credenciais como Speaker</h2>
              <div className="credentials-grid">
                <div>
                  <h4>🎯 Próximos Eventos</h4>
                  <ul>
                    <li>Horasis Global Meeting (São Paulo, Out 2025)</li>
                    <li>Rio Innovation Week (Rio de Janeiro, Ago 2025)</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🏆 Reconhecimentos</h4>
                  <ul>
                    <li>Prêmio Visitor's Choice na Visual 1st Conference</li>
                    <li>Destaque na BBC, Washington Post, The Verge</li>
                  </ul>
                </div>
                
                <div>
                  <h4>🌍 Alcance Global</h4>
                  <ul>
                    <li>Servindo 4M+ usuários globalmente</li>
                    <li>Liderando equipe de 150 contratados full-time</li>
                    <li>Fluente em espanhol, inglês, português, italiano</li>
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
          background: linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%);
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