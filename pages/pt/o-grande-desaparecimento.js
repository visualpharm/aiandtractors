import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';

export default function OGrandeDesaparecimento() {
  return (
    <Layout>
      <Head>
        <title>O Grande Desaparecimento: Como as Empresas Apagaram os Humanos de sua Identidade Visual</title>
        <meta name="description" content="A pesquisa da Icons8 mostra que nos últimos seis meses, as pessoas desapareceram das imagens corporativas, substituídas por IA e robôs. As empresas não querem mais parecer empresas de pessoas." />
        <link rel="canonical" href="https://ivanbraun.com/pt/o-grande-desaparecimento" />
      </Head>

      <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed">
        <div className="text-center mb-8">
          <div className="mb-6 relative">
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md font-medium mb-2" style={{ fontSize: '26px', lineHeight: '1.3' }}>
              O Grande Desaparecimento
            </div>
            <div className="relative">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'DotGothic16, monospace' }}>
                Como as Empresas Apagaram os Humanos de sua Identidade Visual
              </h1>
              {/* Floating people icons around title */}
              <img 
                src="/ai-replaced-people/people-icon1.png" 
                alt="" 
                className="absolute hidden lg:block xl:block"
                style={{ 
                  width: '210px',
                  height: '210px',
                  top: '-75px', 
                  left: '-270px', 
                  transform: 'rotate(-25deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute hidden lg:block xl:block"
                style={{ 
                  width: '320px',
                  height: '320px',
                  top: '-50px', 
                  right: '-340px', 
                  transform: 'rotate(20deg)',
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
                  width: '195px',
                  height: '195px',
                  top: '-115px', 
                  left: '-205px', 
                  transform: 'rotate(-25deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute hidden md:block lg:hidden"
                style={{ 
                  width: '260px',
                  height: '260px',
                  top: '-75px', 
                  right: '-230px', 
                  transform: 'rotate(20deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute hidden md:block lg:hidden"
                style={{ 
                  width: '115px',
                  height: '115px',
                  bottom: '-115px', 
                  left: '-125px', 
                  transform: 'rotate(5deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute hidden sm:block md:block lg:block xl:block"
                style={{ 
                  width: '130px',
                  height: '130px',
                  bottom: '-170px', 
                  left: '-150px', 
                  transform: 'rotate(5deg)',
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
                  width: '115px',
                  height: '115px',
                  top: '-115px', 
                  left: '-30px', 
                  transform: 'rotate(-25deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon2.png" 
                alt="" 
                className="absolute block md:hidden"
                style={{ 
                  width: '128px',
                  height: '128px',
                  top: '-90px', 
                  right: '-55px', 
                  transform: 'rotate(20deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
              <img 
                src="/ai-replaced-people/people-icon3.png" 
                alt="" 
                className="absolute block md:hidden"
                style={{ 
                  width: '102px',
                  height: '102px',
                  bottom: '-35px', 
                  left: '25px', 
                  transform: 'rotate(5deg)',
                  zIndex: 1,
                  mixBlendMode: 'darken'
                }}
              />
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
            <div className="font-normal text-gray-600" style={{ fontSize: '19px', lineHeight: '1.55' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">
                Resumo
              </span>
              A pesquisa da <a href="https://icons8.com" className="text-blue-600 hover:underline">Icons8</a> mostra que nos últimos seis meses, as pessoas desapareceram das imagens corporativas, substituídas por IA e robôs. As empresas não querem mais parecer "empresas de pessoas"—ser uma empresa de IA é tudo agora.
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
                  alt="Imagens corporativas mostrando pessoas em ambientes profissionais"
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
                  alt="Imagens corporativas mostrando tecnologia sem pessoas"
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
                  Nosso negócio: visualizando a identidade corporativa
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Por mais de 20 anos, a Icons8 tem servido empresas criando gráficos que visualizam como elas querem ser vistas. Nossos clientes são empresas, e elas compram imagens de como querem ser retratadas. Uma coisa permaneceu constante ao longo desses anos: as empresas valorizavam o trabalho em equipe e queriam aparecer como equipes coesas de profissionais com grande cultura e sucesso compartilhado.</p>
            </div>
          </details>

          {/* Collapsible: Our analytics section */}
          <details className="group">
            <summary className="cursor-pointer list-none hover:underline">
              <div className="inline font-normal mt-16 mb-6 group-open:mb-6 group-open:text-2xl group-open:font-bold transition-all text-blue-600 group-open:text-gray-900" style={{ fontSize: '19px', lineHeight: '1.55' }}>
                <span className="group-open:text-[26px] group-open:leading-[1.3] transition-all">
                  Nossas análises: rastreando gostos empresariais em escala
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Como uma empresa com dezenas de artistas internos, dedicamos vastos recursos para analisar gostos empresariais. Usamos análises abrangentes para isso—contagens de download, padrões de busca e métricas de uso. Rastreamos os líderes de downloads e entendemos como as preferências empresariais evoluem. Por anos, os líderes eram centrados em humanos: equipes colaborando, grupos diversos trabalhando juntos, profissionais se engajando cara a cara. O mundo que visualizávamos estava vivo, fervilhando de atividade humana.</p>
            </div>
          </details>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>O grande desaparecimento</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Algo <em>apocalíptico</em> aconteceu nos últimos seis meses. Os números são gritantes: imagens de pessoas em nosso <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">pacote de ilustrações 3D</a> caíram 87,5%—de 8 ilustrações centradas em humanos para apenas 1: <em>lendo mais fragmentos</em>.</p>
        </div>
      </div>
        
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="6 meses atrás: criar ilustrações era criar pessoas. As empresas gostavam de comprar imagens de pessoas."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                alt="6 meses atrás: criar ilustrações era criar pessoas. As empresas gostavam de comprar imagens de pessoas." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2359/1617' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 meses atrás</span>
              Criar ilustrações era criar pessoas. As empresas gostavam de comprar imagens de pessoas.
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="Agora: as pessoas desapareceram, deixando maquinário vazio. As empresas preferem o mundo vazio de computadores funcionando sozinhos."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                alt="Agora: as pessoas desapareceram, deixando maquinário vazio. As empresas preferem o mundo vazio de computadores funcionando sozinhos." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2408/1568' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Agora</span>
              As pessoas desapareceram, deixando maquinário vazio. As empresas preferem o mundo vazio de computadores funcionando sozinhos.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>As pessoas desapareceram.</strong> Mas é pior do que desaparecer—elas se tornaram <em>fragmentos</em>. A representação humana frequentemente se reduz a mãos flutuantes segurando objetos—um telefone, uma xícara, fazendo um sinal de OK. Os humanos se tornaram apêndices sem corpo para seus dispositivos. É como um pós-apocalipse onde a humanidade foi reduzida a partes do corpo interfaceando com tecnologia operando por conta própria.</p>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>Em nossa comparação pessoas vs robôs:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• Pessoas diminuíram de 28+ para 20</li>
            <li className="mb-2">• Enquanto robôs aumentaram de 3 para 12</li>
          </ul>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>A mesma tendência:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• Pessoas desapareceram quase completamente</li>
            <li className="mb-2">• Trabalho em equipe desapareceu</li>
            <li className="mb-2">• Temos mais robôs do que pessoas</li>
            <li className="mb-2">• Temos múltiplas representações de IA em seu lugar</li>
          </ul>
        </div>
      </div>
      
      {/* Second image pair - people vs robots */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/people.png" 
               data-fancybox="gallery" 
               data-caption="6 meses atrás: pessoas interagem com pessoas"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-2"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/people.png" 
                alt="6 meses atrás: pessoas interagem com pessoas" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2204/1907' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 meses atrás</span>
              Pessoas interagem com pessoas
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/robots.png" 
               data-fancybox="gallery" 
               data-caption="Depois: pessoas diminuíram significativamente, dando lugar a 4x mais robôs, e algo impopular antes: pessoas com robôs"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/robots.png" 
                alt="Depois: pessoas diminuíram significativamente, dando lugar a 4x mais robôs, e algo impopular antes: pessoas com robôs" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2126/1810' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Agora</span>
              Pessoas diminuíram significativamente, dando lugar a 4x mais robôs, e algo impopular antes: pessoas com robôs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>O que isso significa</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>O que vemos agora é uma mudança dramática em direção às representações de IA em todas as formas—redes neurais, interfaces robóticas, fluxos de dados abstratos, e tecnologia isolada operando sem supervisão humana. IA agêntica toma o lugar das pessoas.</p>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>O que essa transformação significa para as empresas? Agora elas querem se ver como empresas de IA. Pessoas são uma alternativa menos desejada ou simplesmente irrelevantes.</p>
        </div>
      </div>
      
      {/* Third image pair - overall comparison */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-people.png" 
               data-fancybox="gallery" 
               data-caption="6 meses atrás: 10 imagens de pessoas, incluindo trabalho em equipe"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-people.png" 
                alt="6 meses atrás: 10 imagens de pessoas, incluindo trabalho em equipe" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1844/1719' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 meses atrás</span>
              10 imagens de pessoas, incluindo trabalho em equipe
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-no-people.png" 
               data-fancybox="gallery" 
               data-caption="Agora: apenas 2 ilustrações de pessoas conseguiram. Pessoas são dominadas não apenas por robôs, mas também por esferas representando IA"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-no-people.png" 
                alt="Agora: apenas 2 ilustrações de pessoas conseguiram. Pessoas são dominadas não apenas por robôs, mas também por esferas representando IA" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1964/1926' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Agora</span>
              Apenas 2 ilustrações de pessoas conseguiram. Pessoas são dominadas não apenas por robôs, mas também por esferas representando IA
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>A nova realidade</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>O que vemos agora é uma mudança dramática onde IA agêntica toma o lugar das pessoas. Mas há uma inversão fascinante: enquanto robôs ganharam olhos azuis expressivos e linguagem de design emocional, humanos perderam completamente seus rostos. IA evoluiu de formas geométricas abstratas para seres com personalidades distintas, enquanto humanos regrediram de equipes colaborativas para fragmentos sem rosto.</p>
          
          <table className="w-full my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Seis meses atrás</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Agora</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Profissionais com múltiplos monitores e gadgets como Apple Vision fazendo o trabalho eficientemente</td>
                <td className="p-4 align-top border-l border-gray-200">Agentes de IA operando autonomamente</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Expertise humana impulsionando a tecnologia</td>
                <td className="p-4 align-top border-l border-gray-200">A tecnologia funcionando independentemente</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Cenas centradas em humanos com pessoas como foco principal e tomadores de decisão</td>
                <td className="p-4 align-top border-l border-gray-200">Abordagens centradas em tecnologia onde humanos têm papéis de apoio ou periféricos</td>
              </tr>
            </tbody>
          </table>
          
          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>Ser uma empresa de pessoas não é mais legal.</strong> Ser uma empresa de IA é tudo. IA agêntica toma o lugar das pessoas. O valor para os acionistas reside nesta transformação.</p>
          
          <p className="mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>Talvez estejamos presenciando a <strong>comunicação corporativa mais honesta</strong> em décadas. Esta mudança não apenas corresponde a futuras fazendas de <em>robotáxi</em>, mas à gama mais ampla de empresas. Pela primeira vez, as empresas estão nos mostrando exatamente como veem o futuro do trabalho: um mundo onde humanos são opcionais.</p>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>Por que ainda nos incomodamos em criar gráficos humanos?</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Imagens geradas uma vez não eram apenas novidade, mas tinham preço. Nosso próprio dataset <a href="https://generated.photos" className="text-blue-600 hover:underline">Generated Photos</a> fez manchetes no <a href="https://www.theverge.com/2019/9/20/20875362/100000-fake-ai-photos-stock-photography-royalty-free?fbclid=IwAR04GSt2MI1xJTB8nbW4xwZG8TFyD_g86HUCnvmk7DSEpsWHS0eZaoRadak" className="text-blue-600 hover:underline">The Verge</a> e no <a href="https://www.washingtonpost.com/technology/2020/01/07/dating-apps-need-women-advertisers-need-diversity-ai-companies-offer-solution-fake-people/" className="text-blue-600 hover:underline">The Washington Post</a> — mas a adoção em massa as tornou ubíquas e baratas. Agora são percebidas como um sinal de baixo investimento. Em contraste, imagens desenhadas por humanos permanecem caras, então ainda fazem uma empresa parecer próspera.</p>

          <table className="my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Barato / ubíquo</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Consumo de status caro</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Imagens geradas (hoje)</td>
                <td className="p-4 align-top border-l border-gray-200">Imagens desenhadas por humanos</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Talheres de alumínio (hoje)</td>
                <td className="p-4 align-top border-l border-gray-200">Talheres de alumínio quando introduzidos pela primeira vez</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Plásticos de mercado de massa</td>
                <td className="p-4 align-top border-l border-gray-200">Plásticos primitivos (baquelite, celulóide)</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Utensílios básicos de aço inoxidável</td>
                <td className="p-4 align-top border-l border-gray-200">Corpos de eletrodomésticos de aço inoxidável</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>Nós não apenas temos que criar ilustrações à mão; elas devem parecer criadas à mão. Isso nos mantém correndo à frente do último modelo de geração de imagens. Desenhamos o que ele ainda não consegue fazer, e faremos isso nos próximos anos, <del>meses, ou semanas antes de nos rendermos à IA</del>.</p>
          
          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '19px', lineHeight: '1.55', marginTop: '30px', marginBottom: '30px' }}>
            Você pode encontrar o trabalho de nossos artistas humanos em <a href="https://icons8.com/illustrations" className="text-blue-600 hover:underline">https://icons8.com/illustrations</a>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '18px', lineHeight: '1.6', marginTop: '40px', marginBottom: '40px' }}>
            <div className="mb-3">
              <span className="inline-block bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium">
                Comentário do Leitor
              </span>
            </div>
            <blockquote className="italic text-gray-700 mb-3">
              "O conceito do Espetáculo e a ideia de que imagens e representação se tornam mais reais que a própria coisa. Estamos ativamente atravessando a porta da abstração de uma forma que deixamos nossa humanidade e, em última análise, nossa conexão real para trás."
            </blockquote>
            <cite className="text-gray-600 text-sm">
              — faptain-calcon22 no <a href="https://www.reddit.com/r/Design/comments/1lmev4r/ai_fallout_businesses_erased_people_from_their/" className="hover:underline">Reddit</a>
            </cite>
          </div>
        </div>
      </div>
    </Layout>
  )
}