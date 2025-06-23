import Head from 'next/head'
import Layout from '../../components/Layout'
import SmallCards from '../../components/SmallCards'
import LargeCards from '../../components/LargeCards'

export default function Experience() {
  return (
    <Layout>
      <Head>
        <title>Experiencia - Ivan Braun</title>
        <meta name="description" content="Construyendo productos de IA desde cero sin capital de riesgo. Fundador de Icons8 y Generated Photos." />
        <link rel="canonical" href="https://ivanbraun.com/es/experience" />
        <link rel="alternate" href="https://ivanbraun.com/experience" hrefLang="en" />
        <link rel="alternate" href="https://ivanbraun.com/pt/experience" hrefLang="pt" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-layout">
            <div className="hero-content">
              <h1>Experiencia</h1>
              <div className="description">
                <p>Soy un emprendedor en serie que lanza productos bootstrapped relacionados con IA y diseño. Mi experiencia principal es construir productos de IA desde cero, sin capital de riesgo, y monetizarlos temprano.</p>
                <h2 className="tools-intro">Mis tres herramientas son:</h2>
              </div>
            </div>
            <div className="hero-image">
              <img src="/i/experience.png" alt="Ivan Braun Experience" className="experience-image" />
            </div>
          </div>
        </div>
        
        <div className="tools-section">
          <div className="tool-card">
            <h4>Desarrollo de Cliente</h4>
            <p>Libros que me formaron:</p>
            <div className="book-covers">
              <a href="https://rosenfeldmedia.com/books/interviewing-users-second-edition/" target="_blank" rel="noopener noreferrer">
                <img src="/i/books/interviewing-users.jpg" alt="Interviewing Users" className="book-cover" />
              </a>
              <a href="https://www.harpercollins.com/products/competing-against-luck-clayton-m-christensentaddy-hallkaren-dillondavid-s-duncan?variant=32207691743266" target="_blank" rel="noopener noreferrer">
                <img src="/i/books/competing-against-luck.jpg" alt="Competing Against Luck" className="book-cover" />
              </a>
            </div>
          </div>
          
          <div className="tool-card">
            <h4>Diseño UX, mi profesión</h4>
            <p>Libros que me formaron:</p>
            <div className="book-covers">
              <a href="https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576" target="_blank" rel="noopener noreferrer">
                <img src="/i/books/about-face.webp" alt="About Face" className="book-cover" />
              </a>
              <a href="https://www.nngroup.com/books/designing-web-usability/" target="_blank" rel="noopener noreferrer">
                <img src="/i/books/designing-web-usability.jpg" alt="Designing Web Usability" className="book-cover" />
              </a>
            </div>
          </div>
          
          <div className="tool-card">
            <h4>Paywalls</h4>
            <p>Aprendiéndolo todo por las malas</p>
          </div>
        </div>
        
        <SmallCards 
          title="Productos"
          items={[
            {
              title: "Datos sintéticos",
              description: "Conjuntos de datos personalizados para clientes empresariales",
              link: "https://generated.photos/datasets"
            },
            {
              title: "Mayor proveedor de gráficos a Canva",
              description: "Asociación industrial proporcionando activos de diseño"
            },
            {
              title: "GenYOU",
              description: "Selfies de IA personalizadas"
            },
            {
              title: "Face Generator",
              description: "Tecnología detrás de nuestros datos sintéticos"
            },
            {
              title: "Human Generator",
              description: "Humanos de cuerpo completo"
            },
            {
              title: "Ouch Generator",
              description: "Genera imágenes de IA que no parecen Midjourney",
              link: "https://icons8.com/illustration-generator"
            },
            {
              title: "Iconos",
              description: "Estándar de la industria para iconos, ahora con generador de IA",
              link: "https://icons8.com/icons"
            }
          ]}
        />

        <LargeCards 
          title="Logros Clave"
          items={[
            {
              title: "4M+ Usuarios Globalmente",
              description: "Sirviendo a millones de diseñadores y desarrolladores worldwide con contenido generado por IA y herramientas de diseño"
            },
            {
              title: "150+ Miembros del Equipo",
              description: "Liderando un equipo distribuido de profesionales a través de múltiples zonas horarias y países"
            },
            {
              title: "Éxito Bootstrap",
              description: "Construido empresas de IA rentables sin capital de riesgo, enfocándose en monetización temprana y crecimiento sostenible"
            },
            {
              title: "Orador Internacional",
              description: "Orador principal regular en conferencias de IA, compartiendo insights sobre construir productos de IA exitosos"
            },
            {
              title: "Pionero en Medios Sintéticos",
              description: "Innovador temprano en caras humanas generadas por IA y creación de conjuntos de datos sintéticos para clientes empresariales"
            },
            {
              title: "Inventor del Linkware (2012)",
              description: "Inventé el modelo linkware: Usar por un enlace → impulso SEO. Pagar aquellos que valoran un enlace más que los $15 que cuesta la licencia. Mi inspiración fue el requisito de acreditar fotógrafos, pero sin requisito de enlace en ese momento."
            },
            {
              title: "Perspectiva Global",
              description: "Operando desde Argentina mientras construyo productos usados mundialmente, aportando insights internacionales únicos"
            }
          ]}
        />
        
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source src="/i/human-generator.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: center;
        }

        .hero-content {
            max-width: 800px;
        }

        h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin: 0 0 1.5rem 0;
            color: var(--primary-color);
            line-height: 1.1;
            font-family: 'DotGothic16', sans-serif;
        }

        .hero-image {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .experience-image {
            max-width: 100%;
            max-height: 400px;
            height: auto;
            width: auto;
        }

        @media (min-width: 768px) {
            .hero-layout {
                grid-template-columns: 1fr 1fr;
            }
        }

        .description p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.6;
        }
        
        .tools-intro {
            font-size: 1.5rem;
            color: var(--secondary-color);
            margin: 1.5rem 0;
            line-height: 1.4;
            font-weight: 400;
        }

        .tools-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }

        .tool-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 4px 32px rgba(69,93,204,0.07), 0 1.5px 4px rgba(0,0,0,0.03);
            padding: 2rem 1.5rem 1.5rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            transition: all 0.3s ease;
        }

        .tool-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tool-card h4 {
            font-size: 1.2rem;
            margin: 0 0 1rem 0;
            color: var(--primary-color);
            font-weight: 600;
        }

        .tool-card p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.5;
        }

        .book-covers {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 1rem;
        }

        .book-covers a {
            display: inline-block;
            text-decoration: none;
            border: none;
            line-height: 0;
        }

        .book-cover {
            height: 100px;
            width: auto;
            max-width: 150px;
            object-fit: contain;
            border-radius: 4px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: block;
            transform-origin: center bottom;
            margin: 0 5px;
        }

        .book-cover:hover {
            transform: scale(1.3);
            z-index: 1;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .video-container {
            margin-top: 2rem;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
        }

        .video-container video {
            width: 100%;
            height: auto;
            display: block;
        }

        @media (max-width: 768px) {
            .tools-section {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </Layout>
  )
}