import Head from 'next/head'
import Layout from '../../components/Layout'

const GITHUB = 'https://github.com/visualpharm/meli-local-delivery'
const UPDATED = '23 de junio de 2026'

export default function MeliPrivacy() {
  const title = 'Política de privacidad — MeLi Local Delivery'
  const description =
    'MeLi Local Delivery no recopila, transmite ni vende datos. La única información guardada es un interruptor de encendido/apagado en tu navegador.'

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aiandtractors.com/meli/privacy" />
      </Head>

      <main className="wrap">
        <h1>Política de privacidad</h1>
        <p className="sub">Extensión de Chrome <strong>MeLi Local Delivery</strong> · Actualizada el {UPDATED}</p>

        <section className="block">
          <h2>Resumen</h2>
          <p>
            <strong>MeLi Local Delivery no recopila datos personales.</strong> No transmite,
            comparte ni vende información a nadie. No usa analítica, no contacta servidores
            propios y no realiza pedidos de red por su cuenta. No accede a tu cuenta de
            Mercado Libre, tus datos de pago ni tu información de envío.
          </p>
        </section>

        <section className="block">
          <h2>Qué guarda la extensión</h2>
          <p>
            El único dato almacenado es una <strong>preferencia de encendido/apagado</strong>{' '}
            (un valor verdadero/falso) que recuerda si el filtro está activo. Se guarda
            localmente en tu navegador mediante <code>chrome.storage.sync</code> y nunca sale
            de tus dispositivos de Chrome. No hay ningún otro dato guardado.
          </p>
        </section>

        <section className="block">
          <h2>Cómo funciona</h2>
          <p>
            La extensión solo se ejecuta en páginas de <strong>Mercado Libre Argentina</strong>{' '}
            (<code>*.mercadolibre.com.ar</code>). En esas páginas lee el panel de búsqueda para
            encontrar el enlace del filtro nativo “Origen del envío: Local” y redirige la
            pestaña actual a los resultados filtrados. No lee ni modifica nada fuera de esa
            función.
          </p>
        </section>

        <section className="block">
          <h2>Permisos</h2>
          <ul>
            <li><strong>storage</strong> — guarda únicamente la preferencia de encendido/apagado del filtro.</li>
            <li><strong>mercadolibre.com.ar</strong> — la extensión solo actúa en Mercado Libre Argentina, para aplicar el filtro “Local”.</li>
          </ul>
        </section>

        <section className="block">
          <h2>Código abierto</h2>
          <p>
            El código completo es público y auditable en{' '}
            <a href={GITHUB}>GitHub</a> bajo licencia MIT.
          </p>
        </section>

        <section className="block">
          <h2>Contacto</h2>
          <p>
            Por cualquier consulta sobre privacidad, escribí a{' '}
            <a href="mailto:ivan@icons8.com">ivan@icons8.com</a>.
          </p>
        </section>

        <footer className="foot">
          <p>
            <a href="/meli">← MeLi Local Delivery</a> ·
            <a href="https://aiandtractors.com"> Ivan Braun</a> ·
            <a href={GITHUB}> código en GitHub</a>
          </p>
        </footer>
      </main>

      <style jsx>{`
        .wrap { max-width: 760px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
        h1 { font-size: 2.2rem; margin: .4rem 0 .2rem; letter-spacing: -.02em; }
        .sub { color: #888; font-size: .95rem; margin-bottom: 1.5rem; }
        .block { margin: 2rem 0; }
        .block h2 { font-size: 1.35rem; margin-bottom: .5rem; }
        .block p, .block li { color: #444; line-height: 1.65; font-size: 1.05rem; }
        .block ul { padding-left: 1.2rem; }
        .block li { margin-bottom: .4rem; }
        code { background: #eef1fb; padding: .1rem .4rem; border-radius: 5px; font-size: .9em; }
        a { color: #3483FA; }
        .foot { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #eee; text-align: center; color: #888; font-size: .9rem; }
        .foot a { color: #666; }
      `}</style>
    </Layout>
  )
}
