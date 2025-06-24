import Image from 'next/image'

const translations = {
  en: {
    contact: "Contact me",
    visit: "Visit me",
    book: "Book",
    learnMore: "Learn more",
    visitDescription: "I've built a villa to invite fellow tech founders. It's a great expensive build in the beautiful place the pine forest meets the ocean. It's 4 hours from Buenos Aires.",
    visitSubtitle: "If you book it, I'll do my best to visit you, shake hands, and chit chat (sometimes for hours, so push me out when tired)."
  },
  es: {
    contact: "Contactarme", 
    visit: "Visitarme",
    book: "Reservar",
    learnMore: "Saber más",
    visitDescription: "He construido una villa para invitar a compañeros fundadores de tecnología. Es una construcción costosa y hermosa donde el bosque de pinos se encuentra con el océano. Está a 4 horas de Buenos Aires.",
    visitSubtitle: "Si la reservas, haré todo lo posible por visitarte, estrechar tu mano y charlar (a veces durante horas, así que échame cuando te canses)."
  },
  pt: {
    contact: "Entre em contato",
    visit: "Me visitar",
    book: "Reservar",
    learnMore: "Saiba mais",
    visitDescription: "Construí uma villa para convidar colegas fundadores de tecnologia. É uma construção cara e bonita onde a floresta de pinheiros encontra o oceano. Fica a 4 horas de Buenos Aires.",
    visitSubtitle: "Se você reservá-la, farei o meu melhor para visitá-lo, apertar sua mão e conversar (às vezes por horas, então me expulse quando cansar)."
  }
}

export default function Hero({ title, subtitle, description, introText, imageUrl, language = 'en' }) {
  const t = translations[language] || translations.en

  return (
    <>
      <section className="bg-gray-50 py-16 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <h1 className="text-6xl md:text-7xl font-normal text-gray-900 mb-2 -ml-2 leading-tight" style={{ fontFamily: "'DotGothic16', monospace" }}>
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-4 font-normal">
              {subtitle}
            </p>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex gap-4 flex-wrap">
              {imageUrl ? (
                <>
                  <button 
                    className="px-10 py-4 bg-blue-600 text-white rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.open('https://book.ilbuco.com.ar/', '_self')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.book}</p>
                  </button>
                  <button 
                    className="px-10 py-4 bg-white text-gray-900 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.open('https://ilbuco.com.ar', '_self')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.learnMore}</p>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="px-10 py-4 bg-blue-600 text-white rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.contact}</p>
                  </button>
                  <button 
                    className="px-10 py-4 bg-white text-gray-900 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.location.href = '/visit'}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.visit}</p>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <a href={imageUrl || "/i/ivan-robot.png"} data-fancybox="profile">
              <Image 
                src={imageUrl || "/i/ivan-robot.png"} 
                alt={imageUrl ? "Ivan Braun's location in Cariló" : "Ivan Braun AI Avatar"}
                width={500}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full max-w-[505px] h-[400px] md:h-[400px] object-cover drop-shadow-lg transition-transform duration-300 hover:scale-105"
                priority
              />
            </a>
          </div>
        </div>
      </section>

    </>
  )
}