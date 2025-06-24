import Link from 'next/link'

const translations = {
  en: {
    title: "Experience",
    description: "Serial entrepreneur building bootstrapped AI and design products.",
    readMore: "Read more about my experience →",
    founderCEO: "Founder and CEO",
    icons8Desc: "Graphics for AI age",
    genPhotosDesc: "Face AI and synthetic data",
    bullet1: "Supply large-scale resources and custom datasets to enterprise clients",
    bullet2: "Leading team of 150+ professionals serving 4M+ users globally"
  },
  es: {
    title: "Experiencia", 
    description: "Emprendedor en serie construyendo productos de IA y diseño sin capital de riesgo.",
    readMore: "Leer más sobre mi experiencia →",
    founderCEO: "Fundador y CEO",
    icons8Desc: "Gráficos para la era de la IA",
    genPhotosDesc: "IA facial y datos sintéticos",
    bullet1: "Suministro de recursos a gran escala y conjuntos de datos personalizados a clientes empresariales",
    bullet2: "Liderazgo de un equipo de más de 150 profesionales que sirven a más de 4M usuarios globalmente"
  },
  pt: {
    title: "Experiência",
    description: "Empreendedor serial construindo produtos de IA e design sem capital de risco.",
    readMore: "Leia mais sobre minha experiência →",
    founderCEO: "Fundador e CEO",
    icons8Desc: "Gráficos para a era da IA", 
    genPhotosDesc: "IA facial e dados sintéticos",
    bullet1: "Fornecimento de recursos em larga escala e conjuntos de dados personalizados para clientes empresariais",
    bullet2: "Liderando equipe de mais de 150 profissionais servindo mais de 4M usuários globalmente"
  }
}

export default function Experience({ language = 'en' }) {
  const t = translations[language] || translations.en

  return (
    <>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="text-left">
            <h2 className="text-sm font-medium m-0 text-gray-600 uppercase tracking-wider">{t.title}</h2>
          </div>
          <div>
            <p className="m-0 text-lg leading-relaxed text-gray-600">
              {t.description} <Link href="/experience" className="text-blue-600 no-underline hover:text-gray-900">{t.readMore}</Link>
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
              <p className="m-0 text-sm text-gray-600 italic">{t.founderCEO}</p>
              <p className="m-0 text-sm text-gray-600">{t.icons8Desc}</p>
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
              <p className="m-0 text-sm text-gray-600">{t.genPhotosDesc}</p>
              <p className="m-0 text-sm text-gray-600 italic">{t.founderCEO}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}