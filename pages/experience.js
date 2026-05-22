import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import SmallCards from '../components/SmallCards'
import LargeCards from '../components/LargeCards'
import Panel from '../components/Panel'
import Link from 'next/link'

const translations = {
  en: {
    title: "Experience - Ivan Braun",
    heading: "Experience",
    subtitle: "Here I share my experience, both in the format of my life lessons and the style. I would like to share my humble experience if you know how it's going to be useful. <a href='/contact' class='text-blue-600 hover:text-blue-800 underline'>Contact me</a>.",
    intro: "My core experience is building AI products from zero, with no venture capital, and monetize them early. My three tools are:",
    backLink: "← Back to home",
    customerDev: "Customer Development",
    uxDesign: "UX Design",   
    uxSubtitle: "my profession",
    paywalls: "Paywalls",
    paywallsSubtitle: "monetization strategy",
    companyDesc: "Founder of Icons8 and Generated Photos, delivering AI-generated images, datasets, and design tools used by 4M+ designers and developers.",
    enterpriseDesc: "We supply large-scale resources and custom datasets to enterprise clients and are the largest graphics supplier to Canva.",
    genYou: "GenYOU – personalized AI selfies",
    faceGen: "Face Generator – real-time faces", 
    humanGen: "Human Generator – full-body humans",
    toolsIntro: "My Areas of Expertise",
    booksFormed: "Books that formed me:",
    learningHardWay: "Learning it all hard way",
    storyIntro: "I promise to make my story short and useful. I founded a design agency and turned it into businesses: <a href='https://icons8.com' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Icons8</a> and <a href='https://generated.photos' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Generated Photos</a>. That was the short part.<br><br>Here is the useful part: by reading through the three lessons below, you will resolve most of the challenges of a young person, executive, like I was. I wish I had this text at the time.",
    wasDumb: "Read a book, any book",
    wasDumbText: "I was 20 and knew nothing about management when my boss made me manage a team of 12 developers. Why did he do that? Because my salary was the highest. I wasn't even a developer, I could write code, but it wasn't a competitive skill. Agile didn't exist; Scrum wasn't popular, and the dominating practices were too hard to grasp.\n\nI remember walking into a bookstore in Singapore with my boss and he bought several books whose titles I didn't understand. I asked him which book would help me to manage my team and he said \"none yet.\"\n\nSo, point of view: a 20 year designer surrounded and not listened by a bunch of older and smarter guys (one of whom was an academic physicist of 55 years). I had to invent IT management from scratch.\n\nWhat did I do? I managed horribly. I remember one dev postponing the deadline after deadline with no progress. My solution: to pass the task to another dev. I remember them both being confused and not understanding why I did that. I didn't understand either, but I had to do something.\n\nMy advice: Read at least one book, at least Peter Drucker. I didn't do it at the time, and I regret it.",
    managingMoney: "Manage my own money",
    managingMoneyText: "I started understanding what I do when I started paying the salaries out of my pocket. I hired an account manager when I was 24. Remote work wasn't a thing, so we sat at the office in my apartment.\n\nSomehow I didn't realize she's sitting on a stool until she ruined her back. I've bought the chair she chose the next day, and it costed me her monthly salary, but it was an easy spend for me, because I was spending my own money. I didn't have the budget constraints, I didn't have to navigate the bureaucracy, I didn't have the company norms to stick to. I just bought the chair.\n\nThat's my lesson: When you spend your own money, management is much easier.",
    pickingFruit: "Pick the low-hanging fruit",
    pickingFruitText: "When we decided to make stock photography, we did it on a scale. The idea of the time was to shoot the photos and compose them into realistic-looking collages. That was Generative AI before Generative AI. That was MidJourney without proper tech. Of course, it failed. We've left, and it left us 70,000 photos. To make them matching, we were shooting them with the same light setup, same camera height, and professional makeup and hairstyle. In other words, we had an impressive dataset for Generative AI.\n\nWhen NVIDIA released StyleGAN, we made the photos better than NVIDIA did. It used the dataset from Flickr with diverse, poorly lit, unprofessionally shot photos. Our generated photos were an instant hit, landing international press and the chain of venture capital, with Forbes calling.\n\nMy lesson: Use whatever you have at hand to get your next product. In other words, build products on the shoulders of previous work.",
    products: "PRODUCTS WE'VE LAUNCHED"
  },
  es: {
    title: "Experiencia - Ivan Braun",
    heading: "Experiencia",
    subtitle: "Aquí comparto mi experiencia, tanto en el formato de mis lecciones de vida como en el estilo. Me gustaría compartir mi humilde experiencia si sabes cómo va a ser útil. <a href='/es/contact' class='text-blue-600 hover:text-blue-800 underline'>Contáctame</a>.",
    intro: "Mi experiencia principal es construir productos de IA desde cero, sin capital de riesgo, y monetizarlos temprano. Mis tres herramientas son:",
    backLink: "← Volver al inicio",
    customerDev: "Desarrollo de Cliente",
    uxDesign: "Diseño UX",
    uxSubtitle: "mi profesión", 
    paywalls: "Paywalls",
    paywallsSubtitle: "estrategia de monetización",
    companyDesc: "Fundador de Icons8 y Generated Photos, entregando imágenes generadas por IA, conjuntos de datos y herramientas de diseño utilizadas por más de 4M diseñadores y desarrolladores.",
    enterpriseDesc: "Suministramos recursos a gran escala y conjuntos de datos personalizados a clientes empresariales y somos el mayor proveedor de gráficos para Canva.",
    genYou: "GenYOU – selfies de IA personalizadas",
    faceGen: "Face Generator – caras en tiempo real",
    humanGen: "Human Generator – humanos de cuerpo completo",
    toolsIntro: "Mis Áreas de Especialización",
    booksFormed: "Libros que me formaron:",
    learningHardWay: "Aprendiéndolo todo por las malas",
    storyIntro: "Prometo hacer mi historia corta y útil. Fundé una agencia de diseño y la convertí en negocios: <a href='https://icons8.com' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Icons8</a> y <a href='https://generated.photos' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Generated Photos</a>.<br><br>Esa fue la parte corta.<br><br>Aquí está la parte útil: al leer las tres lecciones a continuación, resolverás la mayoría de los desafíos de una persona joven, ejecutiva, como yo era. Ojalá hubiera tenido este texto en ese momento.<br><br>Y hay un blog, productos que hemos lanzado: Link GenU, Face Generator, Human Generator. Búscalos en Google.",
    wasDumb: "Lee un libro, cualquier libro",
    wasDumbText: "Tenía 20 años y no sabía nada sobre gestión cuando mi jefe me hizo gestionar un equipo de 12 desarrolladores. ¿Por qué lo hizo? Porque mi salario era el más alto. Ni siquiera era desarrollador, podía escribir código, pero no era una habilidad competitiva. Agile no existía; Scrum no era popular, y las prácticas dominantes eran demasiado difíciles de entender.\n\nRecuerdo entrar a una librería en Singapur con mi jefe y él compró varios libros cuyos títulos no entendía. Le pregunté qué libro me ayudaría a gestionar mi equipo y me dijo \"ninguno todavía\".\n\nEntonces, punto de vista: un diseñador de 20 años rodeado y no escuchado por un grupo de tipos mayores y más inteligentes (uno de los cuales era un físico académico de 55 años). Tuve que inventar la gestión de TI desde cero.\n\n¿Qué hice? Gestioné horriblemente. Recuerdo a un desarrollador posponiendo fecha tras fecha sin progreso. Mi solución: pasar la tarea a otro desarrollador. Recuerdo que ambos estaban confundidos y no entendían por qué hice eso. Yo tampoco lo entendía, pero tenía que hacer algo.\n\nMi consejo: Lee al menos un libro, al menos Peter Drucker. No lo hice en ese momento, y me arrepiento.",
    managingMoney: "Gestionando con mi propio dinero",
    managingMoneyText: "Empecé a entender lo que hacía cuando comencé a pagar los salarios de mi bolsillo. Contraté a una gerente de cuentas cuando tenía 24 años. El trabajo remoto no existía, así que nos sentamos en la oficina en mi apartamento.\n\nDe alguna manera no me di cuenta de que estaba sentada en un taburete hasta que se lastimó la espalda. Compré la silla que ella eligió al día siguiente, y me costó su salario mensual, pero fue un gasto fácil para mí, porque estaba gastando mi propio dinero. No tenía restricciones presupuestarias, no tenía que navegar la burocracia, no tenía normas de empresa a las que adherirme. Simplemente compré la silla.\n\nEsa es mi lección: Cuando gastas tu propio dinero, la gestión es mucho más fácil.",
    pickingFruit: "Eligiendo la fruta madura",
    pickingFruitText: "Cuando decidimos hacer fotografía de stock, lo hicimos a escala. La idea de la época era tomar las fotos y componerlas en collages de aspecto realista. Eso era IA Generativa antes de la IA Generativa. Eso era MidJourney sin la tecnología adecuada. Por supuesto, falló. Nos fuimos, y nos dejó 70,000 fotos. Para que coincidieran, las estábamos tomando con la misma configuración de luz, la misma altura de cámara, y maquillaje y peinado profesional. En otras palabras, teníamos un conjunto de datos impresionante para IA Generativa.\n\nCuando NVIDIA lanzó StyleGAN, hicimos las fotos mejor que NVIDIA. Usó el conjunto de datos de Flickr con fotos diversas, mal iluminadas, tomadas sin profesionalismo. Nuestras fotos generadas fueron un éxito instantáneo, llegando a la prensa internacional y la cadena de capital de riesgo, con Forbes llamando.\n\nMi lección: Usa lo que tengas a mano para obtener tu próximo producto. En otras palabras, construye productos sobre los hombros del trabajo anterior.",
    products: "PRODUCTOS QUE HEMOS LANZADO"
  },
  pt: {
    title: "Experiência - Ivan Braun",
    heading: "Experiência", 
    subtitle: "Aqui compartilho minha experiência, tanto no formato de minhas lições de vida quanto no estilo. Gostaria de compartilhar minha humilde experiência se você souber como vai ser útil. <a href='/pt/contact' class='text-blue-600 hover:text-blue-800 underline'>Entre em contato</a>.",
    intro: "Minha experiência principal é construir produtos de IA do zero, sem capital de risco, e monetizá-los cedo. Minhas três ferramentas são:",
    backLink: "← Voltar ao início",
    customerDev: "Desenvolvimento de Cliente",
    uxDesign: "Design UX",
    uxSubtitle: "minha profissão",
    paywalls: "Paywalls", 
    paywallsSubtitle: "estratégia de monetização",
    companyDesc: "Fundador da Icons8 e Generated Photos, entregando imagens geradas por IA, conjuntos de dados e ferramentas de design utilizadas por mais de 4M designers e desenvolvedores.",
    enterpriseDesc: "Fornecemos recursos em larga escala e conjuntos de dados personalizados para clientes empresariais e somos o maior fornecedor de gráficos para o Canva.",
    genYou: "GenYOU – selfies de IA personalizadas",
    faceGen: "Face Generator – rostos em tempo real",
    humanGen: "Human Generator – humanos de corpo inteiro",
    toolsIntro: "Minhas Áreas de Especialização",
    booksFormed: "Livros que me formaram:",
    learningHardWay: "Aprendendo tudo da maneira difícil",
    storyIntro: "Prometo tornar minha história curta e útil. Fundei uma agência de design e a transformei em negócios: <a href='https://icons8.com' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Icons8</a> e <a href='https://generated.photos' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:text-blue-800 underline'>Generated Photos</a>.<br><br>Essa foi a parte curta.<br><br>Aqui está a parte útil: ao ler as três lições abaixo, você resolverá a maioria dos desafios de uma pessoa jovem, executiva, como eu era. Eu gostaria de ter tido este texto na época.<br><br>E há um blog, produtos que lançamos: Link GenU, Face Generator, Human Generator. Procure por eles no Google.",
    wasDumb: "Leia um livro, qualquer livro",
    wasDumbText: "Eu tinha 20 anos e não sabia nada sobre gestão quando meu chefe me fez gerenciar uma equipe de 12 desenvolvedores. Por que ele fez isso? Porque meu salário era o mais alto. Eu nem era desenvolvedor, podia escrever código, mas não era uma habilidade competitiva. Agile não existia; Scrum não era popular, e as práticas dominantes eram muito difíceis de entender.\n\nLembro-me de entrar numa livraria em Singapura com meu chefe e ele comprou vários livros cujos títulos eu não entendia. Perguntei-lhe que livro me ajudaria a gerenciar minha equipe e ele disse \"nenhum ainda\".\n\nEntão, ponto de vista: um designer de 20 anos cercado e não ouvido por um grupo de caras mais velhos e inteligentes (um dos quais era um físico acadêmico de 55 anos). Tive que inventar a gestão de TI do zero.\n\nO que eu fiz? Gerenciei horrivelmente. Lembro-me de um dev adiando prazo após prazo sem progresso. Minha solução: passar a tarefa para outro dev. Lembro-me de ambos ficando confusos e não entendendo por que fiz isso. Eu também não entendia, mas tinha que fazer algo.\n\nMeu conselho: Leia pelo menos um livro, pelo menos Peter Drucker. Não fiz isso na época, e me arrependo.",
    managingMoney: "Gerenciando com meu próprio dinheiro",
    managingMoneyText: "Comecei a entender o que fazia quando comecei a pagar os salários do meu bolso. Contratei uma gerente de contas quando tinha 24 anos. Trabalho remoto não existia, então nos sentamos no escritório no meu apartamento.\n\nDe alguma forma não percebi que ela estava sentada num banquinho até ela machucar as costas. Comprei a cadeira que ela escolheu no dia seguinte, e me custou o salário mensal dela, mas foi um gasto fácil para mim, porque estava gastando meu próprio dinheiro. Não tinha restrições orçamentárias, não tinha que navegar a burocracia, não tinha normas da empresa para seguir. Simplesmente comprei a cadeira.\n\nEssa é minha lição: Quando você gasta seu próprio dinheiro, a gestão é muito mais fácil.",
    pickingFruit: "Colhendo frutos fáceis",
    pickingFruitText: "Quando decidimos fazer fotografia de stock, fizemos isso em escala. A ideia da época era tirar as fotos e compô-las em colagens de aparência realista. Isso era IA Generativa antes da IA Generativa. Isso era MidJourney sem a tecnologia adequada. Claro, falhou. Saímos, e isso nos deixou 70.000 fotos. Para fazê-las combinar, estávamos tirando-as com a mesma configuração de luz, mesma altura da câmera, e maquiagem e penteado profissionais. Em outras palavras, tínhamos um conjunto de dados impressionante para IA Generativa.\n\nQuando a NVIDIA lançou o StyleGAN, fizemos as fotos melhores que a NVIDIA fez. Ela usou o conjunto de dados do Flickr com fotos diversas, mal iluminadas, tiradas sem profissionalismo. Nossas fotos geradas foram um sucesso instantâneo, chegando à imprensa internacional e à cadeia de capital de risco, com a Forbes ligando.\n\nMinha lição: Use o que você tem à mão para obter seu próximo produto. Em outras palavras, construa produtos nos ombros do trabalho anterior.",
    products: "PRODUTOS QUE LANÇAMOS"
  }
}

export default function Experience() {
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
  
  // Set page title
  const pageTitle = t.title

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <link rel="canonical" href={`https://ivanbraun.com/experience${locale === 'en' ? '' : '/' + locale}`} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
      </Head>

      <div className="max-w-6xl mx-auto px-8 py-12" style={{ paddingTop: '42px' }}>
        <div className="bg-gray-50 py-16 px-0 -mx-8 mb-12">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="max-w-3xl">
                <h1 className="text-6xl font-bold mb-6 text-gray-900 leading-tight" style={{ fontFamily: "'DotGothic16', sans-serif" }}>{t.heading}</h1>
                <p className="text-xl text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.subtitle }}></p>
              </div>
              <div className="flex justify-center items-center">
                <img src="/i/experience.png" alt="Ivan Braun Experience" className="max-w-full max-h-96 h-auto w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* MY STORY & WORK HISTORY */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="text-left">
              <h2 className="text-sm font-medium m-0 text-gray-600 uppercase tracking-wider">THREE LESSONS I LEARNED</h2>
            </div>
            <div className="md:col-span-3">
              <p className="text-lg text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.storyIntro }}></p>
              
              <Panel color="blue">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t.wasDumb}</h3>
                <div className="text-gray-700 leading-relaxed">
                  {t.wasDumbText.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('My advice:') || paragraph.startsWith('Mi consejo:') || paragraph.startsWith('Meu conselho:')) {
                      return (
                        <div key={index} className="mt-auto pt-8">
                          <div className="relative z-10">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                              LESSON
                            </span>
                            <p className="text-gray-800 leading-relaxed">{paragraph.replace('My advice:', '').replace('Mi consejo:', '').replace('Meu conselho:', '').trim()}</p>
                          </div>
                        </div>
                      )
                    }
                    return <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  })}
                </div>
              </Panel>
              
              <Panel color="green">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t.managingMoney}</h3>
                <div className="text-gray-700 leading-relaxed">
                  {t.managingMoneyText.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('That\'s my lesson:') || paragraph.startsWith('Esa es mi lección:') || paragraph.startsWith('Essa é minha lição:')) {
                      return (
                        <div key={index} className="mt-auto pt-8">
                          <div className="relative z-10">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mb-2">
                              LESSON
                            </span>
                            <p className="text-gray-800 leading-relaxed">{paragraph.replace('That\'s my lesson:', '').replace('Esa es mi lección:', '').replace('Essa é minha lição:', '').trim()}</p>
                          </div>
                        </div>
                      )
                    }
                    return <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  })}
                </div>
              </Panel>
              
              <Panel color="purple">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t.pickingFruit}</h3>
                <div className="text-gray-700 leading-relaxed">
                  {t.pickingFruitText.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('My lesson:') || paragraph.startsWith('Mi lección:') || paragraph.startsWith('Minha lição:')) {
                      return (
                        <div key={index} className="mt-auto pt-8">
                          <div className="relative z-10">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mb-2">
                              LESSON
                            </span>
                            <p className="text-gray-800 leading-relaxed">{paragraph.replace('My lesson:', '').replace('Mi lección:', '').replace('Minha lição:', '').trim()}</p>
                          </div>
                        </div>
                      )
                    }
                    return <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  })}
                </div>
              </Panel>
            </div>
          </div>
        </div>

        {/* WORK HISTORY */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="text-left">
              <h2 className="text-sm font-medium m-0 text-gray-600 uppercase tracking-wider">WORK HISTORY</h2>
            </div>
            <div>
              <p className="m-0 text-lg leading-relaxed text-gray-600">
                I'm a tech founder leading a team of 150 full-time contractors and serving 4M users.
              </p>
            </div>
            <div className="text-left">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <img src="/i/logos/icons8-icons8.svg" alt="Icons8" className="w-6 h-6 mr-2" />
                  <strong className="text-gray-900">
                    <a href="https://icons8.com" className="text-gray-900 no-underline hover:text-blue-600">Icons8</a>
                  </strong>
                </div>
                <p className="m-0 text-sm text-gray-600 italic">Founder and CEO</p>
                <p className="m-0 text-sm text-gray-600">Graphics for AI age</p>
              </div>
            </div>
            <div className="text-left">
              <div>
                <div className="flex items-center mb-2">
                  <img src="/i/logos/icons8-generated-photos.svg" alt="Generated Photos" className="w-6 h-6 mr-2" />
                  <strong className="text-gray-900">
                    <a href="https://generated.photos" className="text-gray-900 no-underline hover:text-blue-600">Generated Photos</a>
                  </strong>
                </div>
                <p className="m-0 text-sm text-gray-600">Face AI and synthetic data</p>
                <p className="m-0 text-sm text-gray-600 italic">Founder and CEO</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-sm font-medium mb-4 text-gray-600 uppercase tracking-wider">{t.toolsIntro}</h2>
          <p className="text-base text-gray-600 leading-relaxed">{t.intro}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-8">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.customerDev}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.booksFormed}</p>
            <div className="flex gap-4 items-center flex-wrap mt-4">
              <a href="https://rosenfeldmedia.com/books/interviewing-users-second-edition/" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/interviewing-users.jpg" alt="Interviewing Users" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
              <a href="https://www.harpercollins.com/products/competing-against-luck-clayton-m-christensentaddy-hallkaren-dillondavid-s-duncan?variant=32207691743266" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/competing-against-luck.jpg" alt="Competing Against Luck" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.uxDesign}, {t.uxSubtitle}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.booksFormed}</p>
            <div className="flex gap-4 items-center flex-wrap mt-4">
              <a href="https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/about-face.webp" alt="About Face" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
              <a href="https://www.nngroup.com/books/designing-web-usability/" target="_blank" rel="noopener noreferrer" className="inline-block no-underline border-0 leading-none">
                <img src="/i/books/designing-web-usability.jpg" alt="Designing Web Usability" className="h-24 w-auto max-w-36 object-contain rounded shadow-md transition-transform duration-300 hover:scale-125 hover:z-10 hover:relative hover:shadow-lg block mx-1" style={{ transformOrigin: "center bottom" }} />
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 pt-8 pb-6 flex flex-col items-start text-left">
            <h4 className="text-lg font-medium mb-3 text-gray-900">{t.paywalls}</h4>
            <p className="text-base text-gray-600 mb-4 leading-relaxed">{t.learningHardWay}</p>
          </div>
        </div>
        
        {/* PRODUCTS WE'VE LAUNCHED */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">{t.products}</h2>
          <SmallCards 
            title=""
            items={[
              {
                title: "Synthetic data",
                description: "Custom datasets for enterprise clients",
                link: "https://generated.photos/datasets"
              },
            {
              title: "Largest graphics supplier to Canva",
              description: "Industry partnership providing design assets"
            },
            {
              title: "GenYOU",
              description: "Personalized AI selfies"
            },
            {
              title: "Face Generator",
              description: "Technology behind our synthetic data"
            },
            {
              title: "Human Generator",
              description: "Full-body humans"
            },
            {
              title: "Ouch Generator",
              description: "Generates AI images that don't look Midjourney",
              link: "https://icons8.com/illustration-generator"
            },
            {
              title: "Icons",
              description: "Industry standard for icons, now with AI generator",
              link: "https://icons8.com/icons"
            }
            ]}
          />
        </div>

        <div className="mb-12 mt-8 rounded-xl overflow-hidden border border-gray-200">
          <video autoPlay muted loop playsInline className="w-full h-auto block">
            <source src="/i/human-generator.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">ACHIEVEMENTS</h2>
          <SmallCards 
            title=""
            items={[
              {
                title: "4M+ Users Globally",
                description: "Serving millions of designers and developers worldwide with AI-generated content and design tools"
              },
            {
              title: "150+ Team Members",
              description: "Leading a distributed team of professionals across multiple time zones and countries"
            },
            {
              title: "Bootstrap Success",
              description: "Built profitable AI companies without venture capital, focusing on early monetization and sustainable growth"
            },
            {
              title: "International Speaker",
              description: "Regular keynote speaker at AI conferences, sharing insights on building successful AI products"
            },
            {
              title: "Synthetic Media Pioneer",
              description: "Early innovator in AI-generated human faces and synthetic dataset creation for enterprise clients"
            },
            {
              title: "Linkware Inventor (2012)",
              description: "I invented the linkware model: Use for a link → SEO boost. Pay those who value a link more than $15 that the license costs. My inspiration was the requirement to credit photographers, but without a link requirement at the time."
            },
            {
              title: "Global Perspective",
              description: "Operating from Argentina while building products used worldwide, bringing unique international insights"
            }
            ]}
          />
        </div>

        {/* Metrics */}
        <div className="mb-12">
          <div className="flex flex-nowrap justify-center gap-4 md:gap-8 lg:gap-16 mt-8 overflow-x-auto" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
            {[
              { number: '4M', icon: '👥', label: 'users', sublabel: 'Globally' },
              { number: '150', icon: '👥', label: 'team', sublabel: '' },
              { number: '$0', icon: '', label: 'equity sold', sublabel: '' },
              { number: '$0', icon: '', label: 'debt', sublabel: '' },
              { number: `${new Date().getFullYear() - 2002}`, icon: '', label: 'years', sublabel: 'creative tech' },
              { number: '$54.6K', icon: '', label: 'avg server', sublabel: 'price' },
              { number: '1st', icon: '', label: 'vendor of', sublabel: 'Canva' }
            ].map((metric, index) => (
              <div key={index} className="text-center flex-shrink-0 min-w-[80px] max-w-[120px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
                  {metric.number} {metric.icon}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mt-1 md:mt-2 leading-tight break-words">
                  {metric.label}
                  {metric.sublabel && <><br/>{metric.sublabel}</>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GOVERNMENT & REGULATORY */}
        <div className="mb-12">
          <h2 className="text-sm font-medium mb-8 text-gray-600 uppercase tracking-wider">GOVERNMENT & REGULATORY</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-8 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Government & Regulatory</h3>
              <p className="text-gray-600 text-sm leading-relaxed">I consult governments on AI regulation, creative tools, intellectual property, and ethics. The agencies I've worked with:</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-eu text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">European Commission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">AI regulation and policy consultation for the European Union</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-us text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">U.S. Department of Justice</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Antitrust and competition matters related to creative tech</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="fi fi-gb text-6xl mb-4 block"></span>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">UK Competition and Markets Authority</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Antitrust and competition matters related to creative tech</p>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}