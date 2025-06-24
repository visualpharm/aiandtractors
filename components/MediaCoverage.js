import Image from 'next/image'

const translations = {
  en: { 
    title: "Media Coverage",
    fakePeople: "Fake People",
    deepfakes: "Deepfakes",
    aiFaces: "AI Faces",
    syntheticPortraits: "Synthetic Portraits",
    stockPhotos: "Stock Photos",
    aiDiversity: "AI Diversity",
    aiPortraits: "AI Portraits",
    wpDescription: "Dating apps need women. Advertisers need diversity. AI companies offer a solution: Fake people.",
    bbcDescription: "Could deepfakes be used to train office workers?",
    spiegelDescription: "Werbegesichter aus dem Computer: Ist hier noch irgendjemand echt?",
    repubblicaDescription: "I 100mila volti di persone che non esistono",
    vergeDescription: "100,000 free AI-generated headshots put stock photo companies on notice",
    viceDescription: "Generated Photos Thinks It Can Solve Diversity With 100,000 Fake AI Faces",
    mailDescription: "Artists create more than 100,000 ultra-realistic AI portraits"
  },
  es: { 
    title: "Cobertura de Medios",
    fakePeople: "Personas Falsas",
    deepfakes: "Deepfakes",
    aiFaces: "Rostros IA",
    syntheticPortraits: "Retratos Sintéticos",
    stockPhotos: "Fotos de Stock",
    aiDiversity: "Diversidad IA",
    aiPortraits: "Retratos IA",
    wpDescription: "Las apps de citas necesitan mujeres. Los anunciantes necesitan diversidad. Las empresas de IA ofrecen una solución: Personas falsas.",
    bbcDescription: "¿Podrían usarse los deepfakes para entrenar a trabajadores de oficina?",
    spiegelDescription: "Rostros publicitarios de la computadora: ¿Alguien aquí sigue siendo real?",
    repubblicaDescription: "Los 100 mil rostros de personas que no existen",
    vergeDescription: "100,000 fotos de IA gratuitas ponen en alerta a las empresas de fotos de stock",
    viceDescription: "Generated Photos cree que puede resolver la diversidad con 100,000 rostros falsos de IA",
    mailDescription: "Artistas crean más de 100,000 retratos ultra-realistas de IA"
  },
  pt: { 
    title: "Cobertura da Mídia",
    fakePeople: "Pessoas Falsas",
    deepfakes: "Deepfakes",
    aiFaces: "Rostos IA",
    syntheticPortraits: "Retratos Sintéticos",
    stockPhotos: "Fotos de Stock",
    aiDiversity: "Diversidade IA",
    aiPortraits: "Retratos IA",
    wpDescription: "Apps de namoro precisam de mulheres. Anunciantes precisam de diversidade. Empresas de IA oferecem uma solução: Pessoas falsas.",
    bbcDescription: "Deepfakes poderiam ser usados para treinar funcionários de escritório?",
    spiegelDescription: "Rostos publicitários do computador: Alguém aqui ainda é real?",
    repubblicaDescription: "Os 100 mil rostos de pessoas que não existem",
    vergeDescription: "100,000 fotos de IA gratuitas colocam empresas de fotos de stock em alerta",
    viceDescription: "Generated Photos acha que pode resolver diversidade com 100,000 rostos falsos de IA",
    mailDescription: "Artistas criam mais de 100,000 retratos ultra-realistas de IA"
  }
}

export default function MediaCoverage({ language = 'en' }) {
  const t = translations[language] || translations.en

  return (
    <>
      <div className="max-w-6xl mx-auto px-8">
        <section className="m-0 p-0">
          <h2 className="text-sm font-medium my-2 text-gray-600 uppercase tracking-wider">{t.title}</h2>
        </section>
        
        <div className="flex flex-nowrap gap-3 m-0 p-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pl-0 pr-0 overflow-x-auto">
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[91px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/wp.png" 
                alt="Washington Post" 
                width={80}
                height={40}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.fakePeople}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.washingtonpost.com/technology/2020/01/07/dating-apps-need-women-advertisers-need-diversity-ai-companies-offer-solution-fake-people/" className="text-blue-600 no-underline hover:text-gray-900">{t.wpDescription}</a></p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[63px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/bbc.svg" 
                alt="BBC" 
                width={100}
                height={50}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.deepfakes}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.bbc.com/news/technology-51064933" className="text-blue-600 no-underline hover:text-gray-900">{t.bbcDescription}</a></p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[70px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/der_spiegel.svg" 
                alt="Der Spiegel" 
                width={130}
                height={39}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.aiFaces}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight">{t.spiegelDescription}</p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[63px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/la_repubblica.svg" 
                alt="La Repubblica" 
                width={130}
                height={65}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.syntheticPortraits}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.repubblica.it/tecnologia/2019/09/26/news/volti_generated_photos_deepfake-236979821/" className="text-blue-600 no-underline hover:text-gray-900">{t.repubblicaDescription}</a></p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[72px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/the_verge.svg" 
                alt="The Verge" 
                width={120}
                height={60}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.stockPhotos}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.theverge.com/2019/9/20/20875362/100000-fake-ai-photos-stock-photography-royalty-free" className="text-blue-600 no-underline hover:text-gray-900">{t.vergeDescription}</a></p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[70px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/vice.svg" 
                alt="Vice" 
                width={100}
                height={50}
                className="h-full w-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.aiDiversity}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.vice.com/en/article/generated-photos-thinks-it-can-solve-diversity-with-100000-fake-ai-faces/" className="text-blue-600 no-underline hover:text-gray-900">{t.viceDescription}</a></p>
          </div>
          <div className="flex-1 min-w-[160px] bg-white p-3 rounded-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="h-[30px] w-[103px] flex items-center justify-center mb-2">
              <Image 
                src="/i/logos/media/daily_mail.svg" 
                alt="Daily Mail" 
                width={100}
                height={50}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-gray-900">{t.aiPortraits}</h3>
            <p className="text-xs text-gray-600 m-0 leading-tight"><a href="https://www.dailymail.co.uk/sciencetech/article-7499107/Artists-create-100-000-ultra-realistic-AI-portraits.html" className="text-blue-600 no-underline hover:text-gray-900">{t.mailDescription}</a></p>
          </div>
        </div>
      </div>

    </>
  )
}