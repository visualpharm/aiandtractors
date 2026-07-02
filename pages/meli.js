import Head from 'next/head'
import Layout from '../components/Layout'

const GITHUB = 'https://github.com/visualpharm/meli-local-delivery'
const STORE_URL = 'https://chromewebstore.google.com/detail/meli-local-delivery/oekkjhokghdflljkgfiglcecbajblhpi'

export default function Meli() {
  const title = 'MeLi Local Delivery — oculta la compra internacional en Mercado Libre'
  const description =
    'Extensión de Chrome gratis que fuerza el filtro “Origen del envío: Local” en Mercado Libre Argentina. Solo productos que se envían desde el país, sin aduana ni demoras.'

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://aiandtractors.com/meli/promo.png" />
        <meta property="og:url" content="https://aiandtractors.com/meli" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://aiandtractors.com/meli" />
      </Head>

      <main className="wrap">
        <section className="hero">
          <img className="truck" src="/meli/truck.png" alt="Camión con la bandera argentina" width="160" height="160" />
          <h1>MeLi Local Delivery</h1>
          <p className="tagline">
            Oculta los productos de <strong>compra internacional</strong> en Mercado Libre.
            Solo lo que se envía <strong>desde Argentina</strong>: sin aduana, sin Clave Fiscal, sin esperar 20 días.
          </p>
          <div className="cta">
            {STORE_URL ? (
              <a className="btn primary" href={STORE_URL}>Instalar en Chrome</a>
            ) : (
              <span className="btn primary disabled" title="En revisión">Próximamente en Chrome Web Store</span>
            )}
            <a className="btn ghost" href={GITHUB}>Ver en GitHub</a>
          </div>
          <p className="free">Gratis · de código abierto · sin recopilar datos</p>
        </section>

        <section className="block">
          <h2>El problema</h2>
          <p>
            Mercado Libre mezcla en cada búsqueda productos de <em>compra internacional</em> que
            tardan semanas, necesitan Clave Fiscal nivel 2 y trámites de aduana. Tildar el filtro
            “Local” a mano, una y otra vez, es tedioso.
          </p>
        </section>

        <section className="block">
          <h2>La solución</h2>
          <div className="features">
            <div className="feat"><span>🇦🇷</span><div><b>Solo nacional</b><p>Aplica el filtro nativo “Origen del envío: Local” en cada búsqueda, automáticamente.</p></div></div>
            <div className="feat"><span>⚡</span><div><b>Un clic</b><p>Encendido por defecto. Apagalo desde la barra de Chrome cuando quieras ver todo.</p></div></div>
            <div className="feat"><span>🔒</span><div><b>Privada</b><p>No recopila datos, no hace pedidos de red, no toca tu cuenta ni el pago.</p></div></div>
            <div className="feat"><span>🎯</span><div><b>Sin romper nada</b><p>Usa el filtro propio de MeLi, así los contadores, el orden y las páginas quedan correctos.</p></div></div>
          </div>
        </section>

        <section className="block">
          <h2>Por qué es mejor que “borrar” resultados</h2>
          <p>
            Otras extensiones eliminan las publicaciones del DOM y rompen la paginación y los
            contadores (“24 resultados” que en realidad son 11). MeLi Local Delivery sigue el
            enlace de filtro <b>“Local”</b> que arma el propio Mercado Libre y te lleva a los
            resultados filtrados de verdad.
          </p>
        </section>

        <section className="block install">
          <h2>Cómo instalar</h2>
          <ol>
            <li>Descargá la extensión desde <a href={GITHUB}>GitHub</a> (o la Chrome Web Store, próximamente).</li>
            <li>Abrí <code>chrome://extensions</code> y activá el <b>Modo de desarrollador</b>.</li>
            <li><b>Cargar descomprimida</b> → elegí la carpeta.</li>
            <li>Buscá en Mercado Libre. Listo: solo envíos nacionales.</li>
          </ol>
        </section>

        <footer className="foot">
          <p>
            Hecho por <a href="https://aiandtractors.com">Ivan Braun</a> ·
            <a href={GITHUB}> código en GitHub</a> · licencia MIT
          </p>
        </footer>
      </main>

      <style jsx>{`
        .wrap { max-width: 880px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
        .hero { text-align: center; padding: 2rem 0 1rem; }
        .truck { width: 160px; height: 160px; display: block; margin: 0 auto; }
        h1 { font-size: 2.6rem; margin: .6rem 0 .2rem; letter-spacing: -.02em; }
        .tagline { font-size: 1.2rem; line-height: 1.5; color: #444; max-width: 620px; margin: .4rem auto 1.4rem; }
        .cta { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; }
        .btn { display: inline-block; padding: .8rem 1.4rem; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 1rem; }
        .primary { background: #3483FA; color: #fff; }
        .primary.disabled { background: #cdd7ea; color: #5b6b86; cursor: default; }
        .ghost { background: #fff; color: #2D3277; border: 2px solid #d7def0; }
        .btn:hover:not(.disabled) { filter: brightness(.95); }
        .free { color: #888; font-size: .9rem; margin-top: 1rem; }
        .block { margin: 2.6rem 0; }
        .block h2 { font-size: 1.5rem; margin-bottom: .6rem; }
        .block p { color: #444; line-height: 1.6; font-size: 1.05rem; }
        .features { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .feat { display: flex; gap: .8rem; background: #f5f7ff; border-radius: 12px; padding: 1rem 1.1rem; }
        .feat span { font-size: 1.6rem; line-height: 1; }
        .feat b { display: block; margin-bottom: .2rem; }
        .feat p { font-size: .95rem; color: #555; margin: 0; }
        .install ol { line-height: 1.9; color: #333; padding-left: 1.2rem; }
        .install code { background: #eef1fb; padding: .1rem .4rem; border-radius: 5px; font-size: .9em; }
        a { color: #3483FA; }
        .foot { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #eee; text-align: center; color: #888; font-size: .9rem; }
        .foot a { color: #666; }
        @media (max-width: 640px) { .features { grid-template-columns: 1fr; } h1 { font-size: 2.1rem; } }
      `}</style>
    </Layout>
  )
}
