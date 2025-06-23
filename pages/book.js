import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LargeCards from '../components/LargeCards'
import Link from 'next/link'

const translations = {
  en: {
    title: "Book - Ivan Braun",
    description: "The book by Ivan Braun on building AI companies without venture capital.",
    subtitle: "A no-nonsense guide to building and scaling tech companies without traditional funding. Based on real experience growing teams of 150+ people and serving millions of users, this book offers practical lessons in management, marketing, and finance that actually work when you're bootstrapping.",
    part1: "Part 1: Management",
    part2: "Part 2: Marketing", 
    part3: "Part 3: Finance",
    killBudgets: "Kill budgets, not dreams",
    killBudgetsDesc: "Why budgets are guesswork and how to find real market prices",
    screenshotTool: "The screenshot tool",
    screenshotToolDesc: "Using Hubstaff to focus on process, not micromanaging results",
    fireNegative: "Fire the \"my life sucks\" people",
    fireNegativeDesc: "Culture levels and why toxic employees destroy teams",
    noMeetings: "No meetings, no timezones",
    noMeetingsDesc: "Building a global team without traditional management overhead",
    customerDev: "Customer development",
    customerDevDesc: "Getting 10,000 customers before building your first feature",
    socialProof: "Social proof that works",
    socialProofDesc: "Beyond testimonials: real tactics that convert visitors",
    organicGrowth: "Organic growth without ads",
    organicGrowthDesc: "Content strategies that actually drive sustainable growth",
    viralLoops: "Viral loops and network effects",
    viralLoopsDesc: "Engineering word-of-mouth into your product design",
    freemium: "Freemium is a pleasure",
    freemiumDesc: "Build something viral first, add paywalls later",
    evilSide: "Think about the evil side",
    evilSideDesc: "Why viral products get negative press (and that's okay)",
    seoForPoor: "SEO for poor people",
    seoForPoorDesc: "Backlinks convert to traffic, everything else is noise",
    chatgptCeo: "ChatGPT CEO is different",
    chatgptCeoDesc: "Getting mentioned in the few articles AI considers authoritative",
    cherryPicking: "Cherry-picking offers",
    cherryPickingDesc: "Always shopping for prices, getting the best deals",
    eliminateWaste: "Get pleasure from eliminating waste",
    eliminateWasteDesc: "The joy of cutting inefficiencies immediately",
    offerEverything: "Offer everything except high salary",
    offerEverythingDesc: "Flexibility, learning, reduced hours before money",
    zaraPhotoshoot: "The Zara photoshoot",
    zaraPhotoshootDesc: "Getting what you need without inflated budgets",
    excerpts: "Excerpts",
    killBudgetsExcerpt: "Budgets are bullshit. They're some guess about optimal pricing that turns into gospel. Instead of budgets, find the real cost of things.",
    killBudgetsExcerpt2: "When we were doing photoshoots with photographers, our goal was to shoot three scenes: office, home, and pajamas. We went to Zara and purchased the clothing for it. No budget would do the trick - we just got what we needed and figured out the real price.",
    killBudgetsExcerpt3: "The budget mindset makes you lazy. \"We have $5,000 for this\" becomes an excuse to not shop around, not negotiate, not think. Kill that. Demand good prices from the market instead.",
    screenshotToolExcerpt: "I require people to have a process, not specific results. This way, I don't have to always define new results and try to guess the next objective, which is irritating and hard for them. Instead, I trust them.",
    screenshotToolExcerpt2: "They work well if I give them a tracking tool like Hubstaff with screenshots. I know they're not watching YouTube or working for someone else. It's about focus on process, not micromanaging.",
    screenshotToolExcerpt3: "Some people think this is controversial. But it works. I focus on results through process, instead of constantly defining new objectives.",
    freemiumExcerpt: "Freemium is something people share. If it's a free product, lean toward the free side. If you create a paid product nobody uses, that's a failure. If you create a freemium product that everybody's using and it's viral - that's pleasure.",
    freemiumExcerpt2: "You can add paywalls wherever you want later. It's much easier to monetize something people already love than to force people to pay for something they haven't tried.",
    freemiumExcerpt3: "We had one product reach millions of users with zero ad spend. When we added premium features, people converted because they already saw the value.",
    shoppingPricesTitle: "Always shopping for prices",
    shoppingPricesExcerpt: "Cherry-picking offers is an art. We got $100K worth of GPU compute for $10K per year just by shopping cloud credits, trials, and beta access. Same approach works for office space, software, everything.",
    shoppingPricesExcerpt2: "Most people are lazy about this. They see a price and accept it. But every price is negotiable, every service has competitors, every vendor has promotions.",
    shoppingPricesExcerpt3: "Do it while it's worth your money. If you can get $1K by asking a simple question that takes you 3 minutes, that's $20K per hour! In contrast, getting $2 discount for the same time probably is not worth it.",
    offerEverythingExcerpt: "Flexibility, learning, reduced hours before money. When hiring, most people focus on salary first. But there's so much more you can offer: flexible schedules, remote work, learning opportunities, interesting projects.",
    offerEverythingExcerpt2: "We found talented developers who valued remote work over $20K salary increases. Designers who preferred creative freedom over corporate benefits. When you can't compete on salary, compete on everything else.",
    offerEverythingExcerpt3: "The key is finding people who value what you can offer. Don't try to convince someone who only cares about money. Find the people who care about what you actually have.",
    evilSideExcerpt: "Why viral products get negative press (and that's okay). When something goes viral, people will find the worst possible use case and write about it. Plan for this. Our face generation tool got criticized for deepfakes. Our icon library got called \"cookie cutter design.\"",
    evilSideExcerpt2: "The negative coverage often drives more users than positive reviews. People hear about the controversy, try the product to see what the fuss is about, and become regular users. Don't be afraid of some negative press if your product is genuinely useful.",
    evilSideExcerpt3: "Just make sure the core product serves a real need. Controversy around a useless product kills it. Controversy around a useful product spreads it."
  },
  es: {
    title: "Libro - Ivan Braun",
    description: "El libro de Ivan Braun sobre construir empresas de IA sin capital de riesgo.",
    subtitle: "Una guía práctica para construir y escalar empresas tecnológicas sin financiamiento tradicional. Basado en experiencia real dirigiendo equipos de más de 150 personas y sirviendo a millones de usuarios, este libro ofrece lecciones prácticas en gestión, marketing y finanzas que realmente funcionan cuando estás bootstrapping.",
    part1: "Parte 1: Gestión",
    part2: "Parte 2: Marketing",
    part3: "Parte 3: Finanzas", 
    killBudgets: "Mata los presupuestos, no los sueños",
    killBudgetsDesc: "Por qué los presupuestos son conjeturas y cómo encontrar precios reales de mercado",
    screenshotTool: "La herramienta de captura de pantalla",
    screenshotToolDesc: "Usando Hubstaff para enfocarse en el proceso, no microgestionar resultados",
    fireNegative: "Despide a la gente \"mi vida apesta\"",
    fireNegativeDesc: "Niveles de cultura y por qué los empleados tóxicos destruyen equipos",
    noMeetings: "Sin reuniones, sin zonas horarias",
    noMeetingsDesc: "Construyendo un equipo global sin la sobrecarga de gestión tradicional",
    customerDev: "Desarrollo de clientes",
    customerDevDesc: "Conseguir 10,000 clientes antes de construir tu primera funcionalidad",
    socialProof: "Prueba social que funciona",
    socialProofDesc: "Más allá de testimonios: tácticas reales que convierten visitantes",
    organicGrowth: "Crecimiento orgánico sin anuncios",
    organicGrowthDesc: "Estrategias de contenido que realmente impulsan crecimiento sostenible",
    viralLoops: "Bucles virales y efectos de red",
    viralLoopsDesc: "Ingeniar el boca a boca en el diseño de tu producto",
    freemium: "Freemium es un placer",
    freemiumDesc: "Construye algo viral primero, agrega paywalls después",
    evilSide: "Piensa en el lado malvado",
    evilSideDesc: "Por qué los productos virales reciben prensa negativa (y eso está bien)",
    seoForPoor: "SEO para pobres",
    seoForPoorDesc: "Los backlinks se convierten en tráfico, todo lo demás es ruido",
    chatgptCeo: "El CEO de ChatGPT es diferente",
    chatgptCeoDesc: "Ser mencionado en los pocos artículos que la IA considera autoritativos",
    cherryPicking: "Seleccionar ofertas",
    cherryPickingDesc: "Siempre comprando precios, obteniendo las mejores ofertas",
    eliminateWaste: "Obtén placer eliminando desperdicio",
    eliminateWasteDesc: "La alegría de cortar ineficiencias inmediatamente",
    offerEverything: "Ofrece todo excepto salario alto",
    offerEverythingDesc: "Flexibilidad, aprendizaje, horas reducidas antes que dinero",
    zaraPhotoshoot: "La sesión de fotos de Zara",
    zaraPhotoshootDesc: "Conseguir lo que necesitas sin presupuestos inflados",
    excerpts: "Extractos",
    killBudgetsExcerpt: "Los presupuestos son una mierda. Son alguna suposición sobre precios óptimos que se convierte en evangelio. En lugar de presupuestos, encuentra el costo real de las cosas.",
    killBudgetsExcerpt2: "Cuando estábamos haciendo sesiones de fotos con fotógrafos, nuestro objetivo era fotografiar tres escenas: oficina, hogar y pijamas. Fuimos a Zara y compramos la ropa para ello. Ningún presupuesto serviría: simplemente conseguimos lo que necesitábamos y averiguamos el precio real.",
    killBudgetsExcerpt3: "La mentalidad de presupuesto te hace perezoso. \"Tenemos $5,000 para esto\" se convierte en una excusa para no buscar ofertas, no negociar, no pensar. Mata eso. Exige buenos precios del mercado en su lugar.",
    screenshotToolExcerpt: "Requiero que la gente tenga un proceso, no resultados específicos. De esta manera, no tengo que definir siempre nuevos resultados e intentar adivinar el siguiente objetivo, lo que es irritante y difícil para ellos. En su lugar, confío en ellos.",
    screenshotToolExcerpt2: "Trabajan bien si les doy una herramienta de seguimiento como Hubstaff con capturas de pantalla. Sé que no están viendo YouTube o trabajando para otra persona. Se trata de centrarse en el proceso, no de microgestionar.",
    screenshotToolExcerpt3: "Algunas personas piensan que esto es controvertido. Pero funciona. Me enfoco en resultados a través del proceso, en lugar de definir constantemente nuevos objetivos.",
    freemiumExcerpt: "Freemium es algo que la gente comparte. Si es un producto gratuito, inclínate hacia el lado gratuito. Si creas un producto de pago que nadie usa, eso es un fracaso. Si creas un producto freemium que todo el mundo está usando y es viral, eso es placer.",
    freemiumExcerpt2: "Puedes agregar paywalls donde quieras más tarde. Es mucho más fácil monetizar algo que la gente ya ama que obligar a la gente a pagar por algo que no han probado.",
    freemiumExcerpt3: "Tuvimos un producto que alcanzó millones de usuarios con cero gasto en anuncios. Cuando agregamos características premium, la gente se convirtió porque ya veían el valor.",
    shoppingPricesTitle: "Siempre comprando precios",
    shoppingPricesExcerpt: "Seleccionar ofertas es un arte. Conseguimos $100K en computación GPU por $10K al año solo comprando créditos en la nube, pruebas y acceso beta. El mismo enfoque funciona para espacio de oficina, software, todo.",
    shoppingPricesExcerpt2: "La mayoría de la gente es perezosa con esto. Ven un precio y lo aceptan. Pero cada precio es negociable, cada servicio tiene competidores, cada proveedor tiene promociones.",
    shoppingPricesExcerpt3: "Hazlo mientras valga tu dinero. Si puedes conseguir $1K haciendo una pregunta simple que te toma 3 minutos, ¡eso son $20K por hora! En contraste, conseguir $2 de descuento por el mismo tiempo probablemente no valga la pena.",
    offerEverythingExcerpt: "Flexibilidad, aprendizaje, horas reducidas antes que dinero. Al contratar, la mayoría de la gente se enfoca primero en el salario. Pero hay mucho más que puedes ofrecer: horarios flexibles, trabajo remoto, oportunidades de aprendizaje, proyectos interesantes.",
    offerEverythingExcerpt2: "Encontramos desarrolladores talentosos que valoraban el trabajo remoto sobre aumentos salariales de $20K. Diseñadores que preferían libertad creativa sobre beneficios corporativos. Cuando no puedes competir en salario, compite en todo lo demás.",
    offerEverythingExcerpt3: "La clave es encontrar personas que valoren lo que puedes ofrecer. No trates de convencer a alguien que solo se preocupa por el dinero. Encuentra a las personas que se preocupan por lo que realmente tienes.",
    evilSideExcerpt: "Por qué los productos virales reciben prensa negativa (y eso está bien). Cuando algo se vuelve viral, la gente encontrará el peor caso de uso posible y escribirá sobre ello. Planifica para esto. Nuestra herramienta de generación de caras fue criticada por deepfakes. Nuestra biblioteca de iconos fue llamada \"diseño de molde de galletas\".",
    evilSideExcerpt2: "La cobertura negativa a menudo atrae más usuarios que las reseñas positivas. La gente escucha sobre la controversia, prueba el producto para ver de qué se trata el alboroto, y se convierte en usuarios regulares. No tengas miedo de algo de prensa negativa si tu producto es genuinamente útil.",
    evilSideExcerpt3: "Solo asegúrate de que el producto principal satisfaga una necesidad real. La controversia alrededor de un producto inútil lo mata. La controversia alrededor de un producto útil lo difunde."
  },
  pt: {
    title: "Livro - Ivan Braun",
    description: "O livro de Ivan Braun sobre construir empresas de IA sem capital de risco.",
    subtitle: "Um guia prático para construir e escalar empresas de tecnologia sem financiamento tradicional. Baseado em experiência real liderando equipes de mais de 150 pessoas e servindo milhões de usuários, este livro oferece lições práticas em gestão, marketing e finanças que realmente funcionam quando você está fazendo bootstrap.",
    part1: "Parte 1: Gestão",
    part2: "Parte 2: Marketing",
    part3: "Parte 3: Finanças",
    killBudgets: "Mate os orçamentos, não os sonhos",
    killBudgetsDesc: "Por que orçamentos são suposições e como encontrar preços reais de mercado",
    screenshotTool: "A ferramenta de screenshot",
    screenshotToolDesc: "Usando Hubstaff para focar no processo, não microgerenciar resultados",
    fireNegative: "Demita as pessoas \"minha vida é péssima\"",
    fireNegativeDesc: "Níveis de cultura e por que funcionários tóxicos destroem equipes",
    noMeetings: "Sem reuniões, sem fusos horários",
    noMeetingsDesc: "Construindo uma equipe global sem sobrecarga de gestão tradicional",
    customerDev: "Desenvolvimento de clientes",
    customerDevDesc: "Conseguir 10.000 clientes antes de construir sua primeira funcionalidade",
    socialProof: "Prova social que funciona",
    socialProofDesc: "Além de depoimentos: táticas reais que convertem visitantes",
    organicGrowth: "Crescimento orgânico sem anúncios",
    organicGrowthDesc: "Estratégias de conteúdo que realmente impulsionam crescimento sustentável",
    viralLoops: "Loops virais e efeitos de rede",
    viralLoopsDesc: "Engenharia do boca a boca no design do seu produto",
    freemium: "Freemium é um prazer",
    freemiumDesc: "Construa algo viral primeiro, adicione paywalls depois",
    evilSide: "Pense no lado malvado",
    evilSideDesc: "Por que produtos virais recebem imprensa negativa (e tudo bem)",
    seoForPoor: "SEO para pobres",
    seoForPoorDesc: "Backlinks convertem para tráfego, todo o resto é ruído",
    chatgptCeo: "O CEO do ChatGPT é diferente",
    chatgptCeoDesc: "Ser mencionado nos poucos artigos que a IA considera autoritativos",
    cherryPicking: "Selecionando ofertas",
    cherryPickingDesc: "Sempre comprando preços, conseguindo os melhores negócios",
    eliminateWaste: "Tenha prazer eliminando desperdício",
    eliminateWasteDesc: "A alegria de cortar ineficiências imediatamente",
    offerEverything: "Ofereça tudo exceto salário alto",
    offerEverythingDesc: "Flexibilidade, aprendizado, horas reduzidas antes de dinheiro",
    zaraPhotoshoot: "O ensaio fotográfico da Zara",
    zaraPhotoshootDesc: "Conseguir o que você precisa sem orçamentos inflados",
    excerpts: "Trechos",
    killBudgetsExcerpt: "Orçamentos são besteira. São algum palpite sobre preços ideais que vira evangelho. Em vez de orçamentos, encontre o custo real das coisas.",
    killBudgetsExcerpt2: "Quando estávamos fazendo ensaios fotográficos com fotógrafos, nosso objetivo era fotografar três cenas: escritório, casa e pijamas. Fomos à Zara e compramos as roupas para isso. Nenhum orçamento serviria - apenas conseguimos o que precisávamos e descobrimos o preço real.",
    killBudgetsExcerpt3: "A mentalidade de orçamento te deixa preguiçoso. \"Temos $5.000 para isso\" vira desculpa para não pesquisar, não negociar, não pensar. Mate isso. Exija bons preços do mercado.",
    screenshotToolExcerpt: "Exijo que as pessoas tenham um processo, não resultados específicos. Assim, não preciso sempre definir novos resultados e tentar adivinhar o próximo objetivo, o que é irritante e difícil para elas. Em vez disso, confio nelas.",
    screenshotToolExcerpt2: "Elas trabalham bem se eu der uma ferramenta de rastreamento como Hubstaff com screenshots. Sei que não estão assistindo YouTube ou trabalhando para outra pessoa. É sobre foco no processo, não microgerenciamento.",
    screenshotToolExcerpt3: "Algumas pessoas acham isso controverso. Mas funciona. Foco em resultados através do processo, em vez de constantemente definir novos objetivos.",
    freemiumExcerpt: "Freemium é algo que as pessoas compartilham. Se é um produto gratuito, penda para o lado gratuito. Se você criar um produto pago que ninguém usa, isso é um fracasso. Se você criar um produto freemium que todo mundo está usando e é viral - isso é prazer.",
    freemiumExcerpt2: "Você pode adicionar paywalls onde quiser depois. É muito mais fácil monetizar algo que as pessoas já amam do que forçar pessoas a pagar por algo que não experimentaram.",
    freemiumExcerpt3: "Tivemos um produto que alcançou milhões de usuários com zero gasto em anúncios. Quando adicionamos recursos premium, as pessoas converteram porque já viam o valor.",
    shoppingPricesTitle: "Sempre comprando preços",
    shoppingPricesExcerpt: "Selecionar ofertas é uma arte. Conseguimos $100K em computação GPU por $10K ao ano apenas comprando créditos na nuvem, testes e acesso beta. A mesma abordagem funciona para espaço de escritório, software, tudo.",
    shoppingPricesExcerpt2: "A maioria das pessoas é preguiçosa com isso. Veem um preço e aceitam. Mas todo preço é negociável, todo serviço tem concorrentes, todo fornecedor tem promoções.",
    shoppingPricesExcerpt3: "Faça isso enquanto vale seu dinheiro. Se você pode conseguir $1K fazendo uma pergunta simples que leva 3 minutos, isso são $20K por hora! Em contraste, conseguir $2 de desconto pelo mesmo tempo provavelmente não vale a pena.",
    offerEverythingExcerpt: "Flexibilidade, aprendizado, horas reduzidas antes de dinheiro. Ao contratar, a maioria das pessoas foca primeiro no salário. Mas há muito mais que você pode oferecer: horários flexíveis, trabalho remoto, oportunidades de aprendizado, projetos interessantes.",
    offerEverythingExcerpt2: "Encontramos desenvolvedores talentosos que valorizavam trabalho remoto mais que aumentos salariais de $20K. Designers que preferiam liberdade criativa a benefícios corporativos. Quando não pode competir em salário, compita em todo o resto.",
    offerEverythingExcerpt3: "A chave é encontrar pessoas que valorizam o que você pode oferecer. Não tente convencer alguém que só se importa com dinheiro. Encontre as pessoas que se importam com o que você realmente tem.",
    evilSideExcerpt: "Por que produtos virais recebem imprensa negativa (e tudo bem). Quando algo vira viral, as pessoas vão encontrar o pior caso de uso possível e escrever sobre isso. Planeje para isso. Nossa ferramenta de geração de faces foi criticada por deepfakes. Nossa biblioteca de ícones foi chamada de \"design de forma de biscoito\".",
    evilSideExcerpt2: "A cobertura negativa frequentemente atrai mais usuários que avaliações positivas. As pessoas ouvem sobre a controvérsia, experimentam o produto para ver qual é o alvoroço, e se tornam usuários regulares. Não tenha medo de alguma imprensa negativa se seu produto é genuinamente útil.",
    evilSideExcerpt3: "Apenas certifique-se de que o produto principal atende uma necessidade real. Controvérsia em torno de um produto inútil o mata. Controvérsia em torno de um produto útil o espalha."
  }
}

export default function Book() {
  const router = useRouter()
  // For static export, detect locale from path
  const getLocaleFromPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/es')) return 'es'
      if (path.startsWith('/pt')) return 'pt'
    }
    return 'en'
  }
  
  const locale = getLocaleFromPath()
  const t = translations[locale] || translations.en

  return (
    <Layout>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href={`https://ivanbraun.com${locale === 'en' ? '' : '/' + locale}/book`} />
        <link rel="alternate" hrefLang="en" href="https://ivanbraun.com/book" />
        <link rel="alternate" hrefLang="es" href="https://ivanbraun.com/es/book" />
        <link rel="alternate" hrefLang="pt" href="https://ivanbraun.com/pt/book" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <h1 className="book-title text-6xl md:text-8xl font-normal mb-4" style={{ fontFamily: 'Cormorant', color: '#950303' }}>Zero to AI</h1>
                <p className="subtitle">{t.subtitle}</p>
              </div>
              <div className="hero-image">
                <img src="/i/books/zero-to-ai.jpg" alt="Zero to AI book cover" className="book-cover-large" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.part1}</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: t.killBudgets,
                  description: t.killBudgetsDesc
                },
                {
                  title: t.screenshotTool,
                  description: t.screenshotToolDesc
                },
                {
                  title: t.fireNegative,
                  description: t.fireNegativeDesc
                },
                {
                  title: "Scrum without being an asshole",
                  description: "Using frameworks so people can't blame you personally"
                },
                {
                  title: "Too much control vs too little",
                  description: "Finding the balance between meetings and direction"
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.part2}</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: t.freemium,
                  description: t.freemiumDesc
                },
                {
                  title: t.evilSide,
                  description: t.evilSideDesc
                },
                {
                  title: t.seoForPoor,
                  description: t.seoForPoorDesc
                },
                {
                  title: t.chatgptCeo,
                  description: t.chatgptCeoDesc
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.part3}</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: t.cherryPicking,
                  description: t.cherryPickingDesc
                },
                {
                  title: t.eliminateWaste,
                  description: t.eliminateWasteDesc
                },
                {
                  title: t.offerEverything,
                  description: t.offerEverythingDesc
                },
                {
                  title: t.zaraPhotoshoot,
                  description: t.zaraPhotoshootDesc
                }
              ]}
            />
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">{t.excerpts}</span></h2>
            </div>
            
            <div className="grid grid-cols-8 gap-4">
              {/* Row 1 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.killBudgets}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.killBudgetsExcerpt}</p>
                  <p>{t.killBudgetsExcerpt2}</p>
                  <p>{t.killBudgetsExcerpt3}</p>
                </div>
              </div>

              
              {/* Row 2 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.screenshotTool}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.screenshotToolExcerpt}</p>
                  <p>{t.screenshotToolExcerpt2}</p>
                  <p>{t.screenshotToolExcerpt3}</p>
                </div>
              </div>

              
              {/* Spacer before Row 2 left indent */}

              
              {/* Row 3 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.freemium}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.freemiumExcerpt}</p>
                  <p>{t.freemiumExcerpt2}</p>
                  <p>{t.freemiumExcerpt3}</p>
                </div>
              </div>

              
              {/* Row 4 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.shoppingPricesTitle}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.shoppingPricesExcerpt}</p>
                  <p>{t.shoppingPricesExcerpt2}</p>
                  <p>{t.shoppingPricesExcerpt3}</p>
                </div>
              </div>

              
              {/* Row 5 */}
              <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.offerEverything}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.offerEverythingExcerpt}</p>
                  <p>{t.offerEverythingExcerpt2}</p>
                  <p>{t.offerEverythingExcerpt3}</p>
                </div>
              </div>

              
              {/* Row 6 */}
              <div className="col-span-8 md:col-span-4 md:col-start-5 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.evilSide}</h3>
                <div className="text-gray-700 space-y-3">
                  <p>{t.evilSideExcerpt}</p>
                  <p>{t.evilSideExcerpt2}</p>
                  <p>{t.evilSideExcerpt3}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">About This Book</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "Real-World Experience",
                  description: "This book distills practical lessons from building and scaling multiple technology companies without traditional venture funding. Each chapter focuses on actionable strategies that work in the real world of constrained resources and ambitious goals."
                },
                {
                  title: "Proven Results",
                  description: "Unlike theoretical business books, these insights come from actual experience managing teams of 150+ people, serving 4+ million users, and navigating the challenges of building global technology companies from unexpected locations."
                },
                {
                  title: "Framework for Growth",
                  description: "Whether you're a first-time founder or an experienced entrepreneur looking to optimize operations, these 13 strategies provide a framework for sustainable growth without burning through investor capital."
                }
              ]}
            />
            
            <div className="full-width" style={{ marginTop: '28px' }}>
              <p className="coming-soon">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        
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
        
        .full-width p {
          font-size: 1.12rem;
          color: #333;
          margin-bottom: 0.7rem;
        }


        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-content {
            max-width: 1200px;
        }
        
        .hero-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero-text {
            
        }
        
        .hero-image {
            display: flex;
            justify-content: center;
        }
        
        .book-cover-large {
            max-width: 300px;
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .book-title {
          font-family: 'Cormorant', serif;
          font-size: 3.75rem; /* 6xl */
          line-height: 1;
          color: #950303;
          margin-bottom: 1rem;
          font-weight: 400;
        }
        
        @media (min-width: 768px) {
          .book-title {
            font-size: 6rem; /* 8xl */
          }
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
        
        .pixel-font {
            font-family: 'Press Start 2P', 'Courier New', monospace !important;
            text-shadow: none !important;
            font-size: 2rem !important;
            letter-spacing: -1px;
            display: inline-block;
            line-height: 1.2;
        }

        .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-weight: 400;
        }

        .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.6;
        }

        .book-content h2 {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2rem;
        }
        
        /* Excerpt content styling */
                
        .excerpt-block h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
            color: var(--primary-color);
        }
        
        .excerpt-block p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.6;
        }
        
        .excerpt-block p:last-child {
            margin-bottom: 0;
        }
        
        .coming-soon {
            font-size: 1.1rem;
            color: var(--secondary-color);
            margin: 0;
            text-align: center;
        }


        .cta-button {
            background: var(--accent-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-block;
            margin-top: 1rem;
        }

        .cta-button:hover {
            background: #3a4db8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(69, 93, 204, 0.25);
        }

        @media (max-width: 768px) {
            .hero-layout {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .fun-title-fill {
                font-size: 2rem !important;
            }

            .book-cover-large {
                max-width: 200px;
            }

            .toc-grid {
                grid-template-columns: 1fr;
            }
            
            .part-title {
                font-size: 1.2rem;
            }
            
            .excerpts-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
        }
      `}</style>
    </Layout>
  )
}