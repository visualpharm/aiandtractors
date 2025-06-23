import Head from 'next/head'
import CTAButtons from '../../components/CTAButtons';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';

export default function ExpertoIA() {
  return (
    <Layout>
      <Head>
        <title>Experto en IA - Ivan Braun | Conferencias Inteligencia Artificial</title>
        <meta name="description" content="Contrata a Ivan Braun como experto en IA para tu evento. Experto internacional en inteligencia artificial, medios sintéticos y desarrollo de IA sin capital de riesgo." />
        <meta name="keywords" content="experto ia, experto inteligencia artificial, conferencias ia, speaker ia, desarrollo ia" />
        <link rel="canonical" href="https://ivanbraun.com/es/experto-ia" />
      </Head>

      <Hero
        title="Experto en IA"
        subtitle="Especialista Internacional en Inteligencia Artificial"
        description="Transforma tu próximo evento con insights de vanguardia sobre inteligencia artificial de un emprendedor de IA comprobado. Ivan Braun ofrece conferencias convincentes que conectan conceptos complejos de IA con aplicaciones prácticas de negocio."
        introText="Contrata a un experto en IA que ha construido y escalado empresas de IA sirviendo a más de 4M de usuarios. Obtén insights accionables sobre desarrollo de productos de IA, ética de medios sintéticos y construcción de negocios rentables de IA sin capital de riesgo."
      />

      {/* --- AI Expertise Section --- */}
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Temas de Conferencias de IA</span></h2>
          <p>
            Desde startups de IA autofinanciadas hasta <a href="/argentina-ai-speaker" className="subtle">perspectivas internacionales de IA</a>, Ivan aporta experiencia real construyendo empresas de IA que sirven a millones de usuarios. Sus conferencias combinan experiencia técnica con insights prácticos de negocio que las audiencias pueden aplicar inmediatamente.
          </p>
        </div>
        
        <h3 className="section-heading" style={{ paddingLeft: '0' }}>Temas de Conferencia</h3>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Desarrollo de IA Autofinanciado</h4>
            <p>Construyendo empresas exitosas de IA desde cero hasta 4M+ usuarios sin financiamiento de capital de riesgo</p>
          </div>
          <div className="card">
            <h4>Medios Sintéticos y Ética</h4>
            <p>Navegando contenido generado por IA, deepfakes y creación responsable de datos sintéticos</p>
          </div>
          <div className="card">
            <h4>Estrategia de Productos de IA</h4>
            <p>Del concepto a la escala: marcos prácticos para monetizar productos de IA temprano</p>
          </div>
          <div className="card">
            <h4>Construyendo Equipos de IA</h4>
            <p>Escalando desde fundador solo hasta liderar 150+ profesionales de IA en múltiples productos</p>
          </div>
          <div className="card">
            <h4>IA para Negocios Reales</h4>
            <p>Más allá del hype: implementando soluciones de IA que impulsan resultados reales de negocio</p>
          </div>
        </div>

        {/* --- Conference Images Gallery --- */}
        <div className="conference-gallery">
          <a href="/i/conferences/award.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/award.jpeg" alt="Premio de conferencia" /></a>
          <a href="/i/conferences/conferece-speaker.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conferece-speaker.jpg" alt="Ivan Braun hablando en conferencia de IA" /></a>
          <a href="/i/conferences/conference.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/conference.jpeg" alt="Vista general de conferencia de IA" /></a>
          <a href="/i/conferences/fl.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl.jpg" alt="Audiencia durante conferencia magistral de IA" /></a>
          <a href="/i/conferences/fl2.jpg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/fl2.jpg" alt="Ivan presentando insights de IA en el escenario" /></a>
          <a href="/i/conferences/presenting.jpeg" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/presenting.jpeg" alt="Presentación magistral de IA de Ivan Braun" /></a>
          <a href="/i/conferences/visual1st-awards-winners.png" data-fancybox="gallery" className="gallery-img"><img src="/i/conferences/visual1st-awards-winners.png" alt="Ganadores de premios Visual1st" /></a>
        </div>

        {/* --- Why Book Ivan Section --- */}
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Por Qué Contratar a Ivan para tu Evento de IA</span></h2>
          <p>
            A diferencia de los expertos teóricos en IA, Ivan aporta experiencia práctica construyendo y escalando productos reales de IA. Sus presentaciones combinan conocimiento técnico profundo con insights prácticos de negocio, entregados con la claridad que viene de implementar realmente soluciones de IA a escala.
          </p>
        </div>
        <div className="card-grid fullwidth-cards">
          <div className="card">
            <h4>Historial Comprobado en IA</h4>
            <p>Construyó Icons8 y Generated Photos, sirviendo a más de 4M usuarios con contenido generado por IA</p>
          </div>
          <div className="card">
            <h4>Práctico, No Teórico</h4>
            <p>Insights reales de construir empresas rentables de IA, no solo conocimiento académico</p>
          </div>
          <div className="card">
            <h4>Perspectiva Internacional</h4>
            <p>Experiencia global construyendo productos de IA usados mundialmente desde Argentina</p>
          </div>
          <div className="card">
            <h4>Estilo de Presentación Atractivo</h4>
            <p>Transforma conceptos complejos de IA en insights accionables que tu audiencia recordará</p>
          </div>
        </div>

        {/* --- Contact/CTA Section --- */}
        <div className="full-width" style={{ marginTop: '28px' }}>
          <h2 className="fun-title" style={{ paddingLeft: '0' }}><span className="fun-title-fill">Contrata tu Experto en IA</span></h2>
          <p>
            ¿Listo para transformar tu próxima conferencia de IA o evento corporativo? Ivan Braun ofrece conferencias magistrales convincentes que conectan la innovación en IA con aplicaciones prácticas de negocio.
          </p>
          <p><strong>Perfecto para:</strong> Conferencias de IA, cumbres tecnológicas, eventos de innovación corporativa, reuniones de startups y foros de negocio enfocados en inteligencia artificial y transformación digital.</p>
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