import Head from 'next/head'
import CTAButtons from '../../components/CTAButtons';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';

export default function ExpertoIA() {
  return (
    <Layout>
      <Head>
        <title>Experto em IA - Ivan Braun | Palestrante Inteligência Artificial</title>
        <meta name="description" content="Contrate Ivan Braun como experto em IA para seu evento. Especialista internacional em inteligência artificial, mídia sintética e desenvolvimento de IA sem capital de risco." />
        <meta name="keywords" content="experto ia, experto inteligencia artificial, palestrante ia, speaker ia, desenvolvimento ia" />
        <link rel="canonical" href="https://ivanbraun.com/pt/experto-ia" />
      </Head>

      <Hero
        title="Experto em IA"
        subtitle="Especialista Internacional em Inteligência Artificial"
        description="Transforme seu próximo evento com insights de vanguarda sobre inteligência artificial de um empreendedor de IA comprovado. Ivan Braun oferece palestras convincentes que conectam conceitos complexos de IA com aplicações práticas de negócio."
        introText="Contrate um experto em IA que construiu e escalou empresas de IA servindo mais de 4M usuários. Obtenha insights acionáveis sobre desenvolvimento de produtos de IA, ética de mídia sintética e construção de negócios rentáveis de IA sem capital de risco."
      />

      {/* --- AI Expertise Section --- */}
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Tópicos de Palestras de IA</span></h2>
          <p>
            Desde startups de IA autofinanciadas até <a href="/argentina-ai-speaker" className="subtle">perspectivas internacionais de IA</a>, Ivan traz experiência real construindo empresas de IA que servem milhões de usuários. Suas palestras combinam expertise técnica com insights práticos de negócio que as audiências podem aplicar imediatamente.
          </p>
        </div>
        
        <h3 className="section-heading" style={{ paddingLeft: '0' }}>Tópicos de Palestra</h3>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Desenvolvimento de IA Autofinanciado</h4>
            <p>Construindo empresas bem-sucedidas de IA do zero até 4M+ usuários sem financiamento de capital de risco</p>
          </div>
          <div className="card">
            <h4>Mídia Sintética e Ética</h4>
            <p>Navegando conteúdo gerado por IA, deepfakes e criação responsável de dados sintéticos</p>
          </div>
          <div className="card">
            <h4>Estratégia de Produtos de IA</h4>
            <p>Do conceito à escala: estruturas práticas para monetizar produtos de IA cedo</p>
          </div>
          <div className="card">
            <h4>Construindo Equipes de IA</h4>
            <p>Escalando de fundador solo até liderar 150+ profissionais de IA em múltiplos produtos</p>
          </div>
          <div className="card">
            <h4>IA para Negócios Reais</h4>
            <p>Além do hype: implementando soluções de IA que geram resultados reais de negócio</p>
          </div>
        </div>

        {/* --- Conference Images Gallery --- */}
        <div className="conference-gallery">
          <a href="/i/conferences/award.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/award.jpeg" alt="Prêmio de conferência" /></a>
          <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conferece-speaker.jpg" alt="Ivan Braun falando em conferência de IA" /></a>
          <a href="/i/conferences/conference.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conference.jpeg" alt="Visão geral da conferência de IA" /></a>
          <a href="/i/conferences/fl.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl.jpg" alt="Audiência durante palestra magistral de IA" /></a>
          <a href="/i/conferences/fl2.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl2.jpg" alt="Ivan apresentando insights de IA no palco" /></a>
          <a href="/i/conferences/presenting.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/presenting.jpeg" alt="Apresentação magistral de IA de Ivan Braun" /></a>
          <a href="/i/conferences/visual1st-awards-winners.png" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/visual1st-awards-winners.png" alt="Vencedores dos prêmios Visual1st" /></a>
        </div>

        {/* --- Why Book Ivan Section --- */}
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Por Que Contratar Ivan para seu Evento de IA</span></h2>
          <p>
            Diferente dos especialistas teóricos em IA, Ivan traz experiência prática construindo e escalando produtos reais de IA. Suas apresentações combinam conhecimento técnico profundo com insights práticos de negócio, entregues com a clareza que vem de realmente implementar soluções de IA em escala.
          </p>
        </div>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Histórico Comprovado em IA</h4>
            <p>Construiu Icons8 e Generated Photos, servindo mais de 4M usuários com conteúdo gerado por IA</p>
          </div>
          <div className="card">
            <h4>Prático, Não Teórico</h4>
            <p>Insights reais de construir empresas rentáveis de IA, não apenas conhecimento acadêmico</p>
          </div>
          <div className="card">
            <h4>Perspectiva Internacional</h4>
            <p>Experiência global construindo produtos de IA usados mundialmente da Argentina</p>
          </div>
          <div className="card">
            <h4>Estilo de Apresentação Envolvente</h4>
            <p>Transforma conceitos complexos de IA em insights acionáveis que sua audiência lembrará</p>
          </div>
        </div>

        {/* --- Contact/CTA Section --- */}
        <div className="full-width" style={{ marginTop: '28px' }}>
          <h2 className="fun-title" style={{ paddingLeft: '0' }}><span className="fun-title-fill">Contrate seu Experto em IA</span></h2>
          <p>
            Pronto para transformar sua próxima conferência de IA ou evento corporativo? Ivan Braun oferece palestras magistrais convincentes que conectam inovação em IA com aplicações práticas de negócio.
          </p>
          <p><strong>Perfeito para:</strong> Conferências de IA, cúpulas tecnológicas, eventos de inovação corporativa, encontros de startups e fóruns de negócio focados em inteligência artificial e transformação digital.</p>
          <div style={{ marginTop: '40px' }}>
            <CTAButtons />
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
          padding: 0 2rem;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        .full-width {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        .full-width h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .fun-title {
          margin-top: 28px !important;
          margin-bottom: 0 !important;
          position: relative;
          display: inline-block;
          font-size: 3rem;
          font-weight: 400 !important;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          line-height: 1.1;
        }
        .fun-title-fill {
          position: relative;
          color: #222;
          font-size: 2.5rem !important;
          font-weight: 400 !important;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          z-index: 2;
          text-shadow:
            -1px 0 0 #dd9e8e,
            1px 0 0 #53cb82;
        }
        .full-width p {
          font-size: 1.12rem;
          color: #333;
          margin-bottom: 0.7rem;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          width: 100%;
        }
        .card-grid.fullwidth-cards {
          padding-left: 8px;
          padding-right: 8px;
        }
        .card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(69,93,204,0.07), 0 1.5px 4px rgba(0,0,0,0.03);
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        .section-heading {
          padding: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.8rem;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0;
          margin-left: 0;
          text-align: left;
        }
        .fullwidth-cards {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
          padding: 0;
          gap: 0.7rem;
        }
        .fullwidth-cards .card {
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          padding: 1rem 1.2rem 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          transition: all 0.3s ease;
        }
        .fullwidth-cards .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .fullwidth-cards .card h4 {
          font-size: 1.2rem;
          margin: 0;
          padding: 0;
          color: var(--primary-color);
          font-weight: 600;
          line-height: 1.2;
        }
        .fullwidth-cards .card p {
          font-size: 1rem;
          color: var(--secondary-color);
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }
        .conference-gallery {
          margin-top: 28px;
          margin-bottom: 28px;
          display: flex;
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
          gap: 4px;
          justify-content: stretch;
          align-items: stretch;
          overflow-x: auto;
          padding: 0;
        }
        .gallery-img {
          flex: 1 1 0;
          height: 180px;
          min-width: 0;
        }
        .gallery-img img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 0;
          box-shadow: none;
          cursor: zoom-in;
          transition: transform 0.2s;
          display: block;
        }
        .gallery-img img:hover {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .main-grid {
            padding: 0 0.5rem;
          }
          .card-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .main-grid {
            padding: 0 0.2rem;
          }
          .card {
            padding: 1.2rem 0.7rem 1rem 0.7rem;
          }
        }
      `}</style>
    </Layout>
  )
}