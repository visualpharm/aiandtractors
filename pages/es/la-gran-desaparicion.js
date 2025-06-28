import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import HeroImages from '../../components/HeroImages';

export default function LaGranDesaparicion() {
  return (
    <Layout>
      <Head>
        <title>La Gran Desaparición: Cómo las Empresas Borraron a los Humanos de su Identidad Visual</title>
        <meta name="description" content="La investigación de Icons8 muestra que en los últimos seis meses, las personas han desaparecido de las imágenes corporativas, reemplazadas por IA y robots. Las empresas ya no quieren parecer empresas de personas." />
        <link rel="canonical" href="https://ivanbraun.com/es/la-gran-desaparicion" />
      </Head>

      <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed">
        <div className="text-center mb-8">
          <div className="mb-6 relative">
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md font-medium mb-2" style={{ fontSize: '26px', lineHeight: '1.3' }}>
              La Gran Desaparición
            </div>
            <div className="relative">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'DotGothic16, monospace' }}>
                Cómo las Empresas Borraron a los Humanos de su Identidad Visual
              </h1>
              {/* Floating people icons around title */}
              <img 
                src="/ai-replaced-people/people-icon1.png" 
                alt="" 
                className="absolute hidden lg:block xl:block"
                style={{ 
                  width: '240px',
                  height: '240px',
                  top: '-90px', 
                  left: '-260px', 
                  transform: 'rotate(-20deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute hidden lg:block xl:block"
                style={{ 
                  width: '280px',
                  height: '280px',
                  top: '-70px', 
                  right: '-300px', 
                  transform: 'rotate(30deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              
              {/* Medium-large breakpoint versions (between md and lg) */}
              <img 
                src="/ai-replaced-people/people-icon1.png" 
                alt="" 
                className="absolute hidden md:block lg:hidden"
                style={{ 
                  width: '210px',
                  height: '210px',
                  top: '-110px', 
                  left: '-210px', 
                  transform: 'rotate(-20deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute hidden md:block lg:hidden"
                style={{ 
                  width: '240px',
                  height: '240px',
                  top: '-85px', 
                  right: '-210px', 
                  transform: 'rotate(30deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute hidden md:block lg:hidden"
                style={{ 
                  width: '125px',
                  height: '125px',
                  bottom: '-125px', 
                  left: '-135px', 
                  transform: 'rotate(15deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute hidden sm:block md:block lg:block xl:block"
                style={{ 
                  width: '135px',
                  height: '135px',
                  bottom: '-190px', 
                  left: '-170px', 
                  transform: 'rotate(15deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              
              {/* Mobile responsive versions */}
              <img 
                src="/ai-replaced-people/people-icon1.png" 
                alt="" 
                className="absolute block md:hidden"
                style={{ 
                  width: '110px',
                  height: '110px',
                  top: '-105px', 
                  left: '-35px', 
                  transform: 'rotate(-20deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute block md:hidden"
                style={{ 
                  width: '123px',
                  height: '123px',
                  top: '-95px', 
                  right: '-45px', 
                  transform: 'rotate(30deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute block md:hidden"
                style={{ 
                  width: '90px',
                  height: '90px',
                  bottom: '-25px', 
                  left: '20px', 
                  transform: 'rotate(15deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
            <div className="font-normal text-gray-600" style={{ fontSize: '19px', lineHeight: '1.55' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">
                Resumen
              </span>
              La investigación de <a href="https://icons8.com" className="text-blue-600 hover:underline">Icons8</a> muestra que en los últimos seis meses, las personas han desaparecido de las imágenes corporativas, reemplazadas por IA y robots. Las empresas ya no quieren parecer "empresas de personas"—ser una empresa de IA es todo ahora.
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero illustration */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-2 h-[50vh] overflow-visible" style={{ transform: 'translateY(-25px)' }}>
        <div className="relative w-full h-full">
          <div className="relative h-[50vh]">
            {/* First image - slightly overlapping from left */}
            <div className="absolute left-[1%] top-[-10%] w-[52%] h-[90%] rounded-xl overflow-hidden shadow-2xl transform -rotate-[7deg] z-30 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                  alt="Imágenes corporativas mostrando personas en entornos profesionales"
                  fill
                  className="object-contain"
                  sizes="50vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
            
            {/* Second image - slightly overlapping from right */}
            <div className="absolute right-[1%] bottom-[5%] w-[52%] h-[90%] rounded-xl overflow-hidden shadow-2xl transform rotate-[4deg] z-20 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                  alt="Imágenes corporativas mostrando tecnología sin personas"
                  fill
                  className="object-contain"
                  sizes="50vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          {/* Collapsible: Our business section */}
          <details className="group">
            <summary className="cursor-pointer list-none hover:underline">
              <div className="inline font-normal mt-16 mb-6 group-open:mb-6 group-open:text-2xl group-open:font-bold transition-all text-blue-600 group-open:text-gray-900" style={{ fontSize: '19px', lineHeight: '1.55' }}>
                <span className="group-open:text-[26px] group-open:leading-[1.3] transition-all">
                  Nuestro negocio: visualizar la identidad corporativa
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Durante más de 20 años, Icons8 ha servido a las empresas creando gráficos que visualizan cómo quieren ser vistas. Nuestros clientes son empresas, y compran imágenes de cómo quieren ser retratadas. Una cosa se mantuvo constante durante todos estos años: las empresas valoraban el trabajo en equipo y querían aparecer como equipos cohesivos de profesionales con gran cultura y éxito compartido.</p>
            </div>
          </details>

          {/* Collapsible: Our analytics section */}
          <details className="group">
            <summary className="cursor-pointer list-none hover:underline">
              <div className="inline font-normal mt-16 mb-6 group-open:mb-6 group-open:text-2xl group-open:font-bold transition-all text-blue-600 group-open:text-gray-900" style={{ fontSize: '19px', lineHeight: '1.55' }}>
                <span className="group-open:text-[26px] group-open:leading-[1.3] transition-all">
                  Nuestros análisis: siguiendo los gustos empresariales a gran escala
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Como empresa con docenas de artistas internos, dedicamos vastos recursos a analizar los gustos empresariales. Usamos análisis exhaustivos para eso—conteos de descargas, patrones de búsqueda y métricas de uso. Seguimos a los líderes de descargas y entendemos cómo evolucionan las preferencias empresariales. Durante años, los líderes estaban centrados en humanos: equipos colaborando, grupos diversos trabajando juntos, profesionales interactuando cara a cara. El mundo que visualizamos estaba vivo, bullendo de actividad humana.</p>
            </div>
          </details>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>La gran desaparición</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Algo <em>apocalíptico</em> pasó en los últimos seis meses. Los números son contundentes: las imágenes de personas en nuestro <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">pack de ilustraciones 3D</a> cayeron 87.5%—de 8 ilustraciones centradas en humanos a solo 1: <em>leyendo más fragmentos</em>.</p>
        </div>
      </div>
        
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="Hace 6 meses: crear ilustraciones era crear personas. A las empresas les gustaba comprar imágenes de personas."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                alt="Hace 6 meses: crear ilustraciones era crear personas. A las empresas les gustaba comprar imágenes de personas." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2359/1617' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Hace 6 meses</span>
              Crear ilustraciones era crear personas. A las empresas les gustaba comprar imágenes de personas.
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="Ahora: las personas desaparecieron, dejando maquinaria vacía. Las empresas prefieren el mundo vacío de las computadoras funcionando solas."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                alt="Ahora: las personas desaparecieron, dejando maquinaria vacía. Las empresas prefieren el mundo vacío de las computadoras funcionando solas." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2408/1568' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Ahora</span>
              Las personas desaparecieron, dejando maquinaria vacía. Las empresas prefieren el mundo vacío de las computadoras funcionando solas.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>Las personas desaparecieron.</strong> Pero es peor que desaparecer—se volvieron <em>fragmentos</em>. La representación humana a menudo se reduce a manos flotantes sosteniendo objetos—un teléfono, una taza, haciendo una señal de OK. Los humanos se convirtieron en apéndices sin cuerpo para sus dispositivos. Es como un post-apocalipsis donde la humanidad fue reducida a partes del cuerpo interfaceando con tecnología operando por sí sola.</p>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>En nuestra comparación personas vs robots:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• Las personas disminuyeron de 28+ a 20</li>
            <li className="mb-2">• Mientras que los robots aumentaron de 3 a 12</li>
          </ul>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>La misma tendencia:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• Las personas desaparecieron casi completamente</li>
            <li className="mb-2">• El trabajo en equipo desapareció</li>
            <li className="mb-2">• Tenemos más robots que personas</li>
            <li className="mb-2">• Tenemos múltiples representaciones de IA en su lugar</li>
          </ul>
        </div>
      </div>
      
      {/* Second image pair - people vs robots */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/people.png" 
               data-fancybox="gallery" 
               data-caption="Hace 6 meses: las personas interactúan con personas"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-2"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/people.png" 
                alt="Hace 6 meses: las personas interactúan con personas" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2204/1907' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Hace 6 meses</span>
              Las personas interactúan con personas
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/robots.png" 
               data-fancybox="gallery" 
               data-caption="Después: las personas disminuyeron significativamente, dando paso a 4x más robots, y algo impopular antes: personas con robots"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/robots.png" 
                alt="Después: las personas disminuyeron significativamente, dando paso a 4x más robots, y algo impopular antes: personas con robots" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2126/1810' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Ahora</span>
              Las personas disminuyeron significativamente, dando paso a 4x más robots, y algo impopular antes: personas con robots
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>Qué significa esto</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Lo que vemos ahora es un cambio dramático hacia representaciones de IA en todas las formas—redes neuronales, interfaces robóticas, flujos de datos abstractos, y tecnología aislada operando sin supervisión humana. La IA agéntica toma el lugar de las personas.</p>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>¿Qué significa esta transformación para las empresas? Ahora quieren verse como empresas de IA. Las personas son una alternativa menos deseada o simplemente irrelevantes.</p>
        </div>
      </div>
      
      {/* Third image pair - overall comparison */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-people.png" 
               data-fancybox="gallery" 
               data-caption="Hace 6 meses: 10 imágenes de personas, incluyendo trabajo en equipo"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-people.png" 
                alt="Hace 6 meses: 10 imágenes de personas, incluyendo trabajo en equipo" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1844/1719' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Hace 6 meses</span>
              10 imágenes de personas, incluyendo trabajo en equipo
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-no-people.png" 
               data-fancybox="gallery" 
               data-caption="Ahora: solo 2 ilustraciones de personas lo lograron. Las personas están dominadas no solo por robots, sino también por esferas que representan IA"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-no-people.png" 
                alt="Ahora: solo 2 ilustraciones de personas lo lograron. Las personas están dominadas no solo por robots, sino también por esferas que representan IA" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1964/1926' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Ahora</span>
              Solo 2 ilustraciones de personas lo lograron. Las personas están dominadas no solo por robots, sino también por esferas que representan IA
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>La nueva realidad</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Lo que vemos ahora es un cambio dramático donde la IA agéntica toma el lugar de las personas. Pero hay una inversión fascinante: mientras los robots ganaron ojos azules expresivos y lenguaje de diseño emocional, los humanos perdieron completamente sus caras. La IA evolucionó de formas geométricas abstractas a seres con personalidades distintivas, mientras que los humanos involucionaron de equipos colaborativos a fragmentos sin rostro.</p>
          
          <table className="w-full my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Hace seis meses</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Ahora</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Profesionales con múltiples monitores y gadgets como Apple Vision haciendo el trabajo eficientemente</td>
                <td className="p-4 align-top border-l border-gray-200">Agentes de IA operando autónomamente</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Experiencia humana impulsando la tecnología</td>
                <td className="p-4 align-top border-l border-gray-200">La tecnología funcionando independientemente</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Escenas centradas en humanos con personas como foco principal y tomadores de decisiones</td>
                <td className="p-4 align-top border-l border-gray-200">Enfoques centrados en tecnología donde los humanos tienen roles de apoyo o periféricos</td>
              </tr>
            </tbody>
          </table>
          
          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>Ser una empresa de personas ya no está de moda.</strong> Ser una empresa de IA es todo. La IA agéntica toma el lugar de las personas. El valor para los accionistas reside en esta transformación.</p>
          
          <p className="mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>Tal vez estamos presenciando la <strong>comunicación corporativa más honesta</strong> en décadas. Este cambio no solo corresponde a futuras granjas de <em>robotaxis</em>, sino a la gama más amplia de empresas. Por primera vez, las empresas nos están mostrando exactamente cómo ven el futuro del trabajo: un mundo donde los humanos son opcionales.</p>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>¿Por qué todavía nos molestamos en crear gráficos humanos?</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Las imágenes generadas una vez no solo eran novedosas sino que tenían precio. Nuestro propio dataset <a href="https://generated.photos" className="text-blue-600 hover:underline">Generated Photos</a> hizo los titulares de <a href="https://www.theverge.com/2019/9/20/20875362/100000-fake-ai-photos-stock-photography-royalty-free?fbclid=IwAR04GSt2MI1xJTB8nbW4xwZG8TFyD_g86HUCnvmk7DSEpsWHS0eZaoRadak" className="text-blue-600 hover:underline">The Verge</a> y <a href="https://www.washingtonpost.com/technology/2020/01/07/dating-apps-need-women-advertisers-need-diversity-ai-companies-offer-solution-fake-people/" className="text-blue-600 hover:underline">The Washington Post</a> — pero la adopción masiva las ha hecho ubicuas y baratas. Ahora se perciben como una señal de poca inversión. En contraste, las imágenes dibujadas por humanos siguen siendo caras, así que todavía hacen que una empresa se vea próspera.</p>

          <table className="my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Barato / ubicuo</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Consumo de estatus costoso</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Imágenes generadas (hoy)</td>
                <td className="p-4 align-top border-l border-gray-200">Imágenes dibujadas por humanos</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Cubiertos de aluminio (hoy)</td>
                <td className="p-4 align-top border-l border-gray-200">Cubiertos de aluminio cuando se introdujeron por primera vez</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Plásticos de mercado masivo</td>
                <td className="p-4 align-top border-l border-gray-200">Plásticos tempranos (baquelita, celuloide)</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Utensilios básicos de acero inoxidable</td>
                <td className="p-4 align-top border-l border-gray-200">Cuerpos de electrodomésticos de acero inoxidable</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>No solo tenemos que crear ilustraciones a mano; deben verse creadas a mano. Eso nos mantiene corriendo por delante del último modelo de generación de imágenes. Dibujamos lo que aún no puede hacer, y lo haremos en los próximos años, <del>meses, o semanas antes de rendirnos a la IA</del>.</p>
          
          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '19px', lineHeight: '1.55', marginTop: '30px', marginBottom: '30px' }}>
            Podés encontrar el trabajo de nuestros artistas humanos en <a href="https://icons8.com/illustrations" className="text-blue-600 hover:underline">https://icons8.com/illustrations</a>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '18px', lineHeight: '1.6', marginTop: '40px', marginBottom: '40px' }}>
            <div className="mb-3">
              <span className="inline-block bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium">
                Comentario de Lector
              </span>
            </div>
            <blockquote className="italic text-gray-700 mb-3">
              "El concepto del Espectáculo y la idea de que las imágenes y la representación se vuelven más reales que la cosa en sí misma. Estamos activamente atravesando la puerta de la abstracción de una manera que dejamos atrás nuestra humanidad y en última instancia nuestra conexión real."
            </blockquote>
            <cite className="text-gray-600 text-sm">
              — faptain-calcon22 en <a href="https://www.reddit.com/r/Design/comments/1lmev4r/ai_fallout_businesses_erased_people_from_their/" className="hover:underline">Reddit</a>
            </cite>
          </div>
        </div>
      </div>
    </Layout>
  )
}