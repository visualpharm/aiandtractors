import LargeCards from './LargeCards'
import Head from 'next/head'

const translations = {
  en: {
    title: "Government & Regulatory",
    description: "I consult governments on AI regulation, creative tools, intellectual property, and ethics. The agencies I've worked with:",
    europeanCommission: "European Commission",
    departmentOfJustice: "U.S. Department of Justice", 
    ukCma: "UK Competition and Markets Authority",
    euDesc: "AI regulation and policy consultation for the European Union",
    usDesc: "Antitrust and competition matters related to creative tech",
    ukDesc: "Antitrust and competition matters related to creative tech"
  },
  es: {
    title: "Gobierno y Regulación",
    description: "Asesoro a gobiernos sobre regulación de IA, herramientas creativas, propiedad intelectual y ética. Las agencias con las que he trabajado:",
    europeanCommission: "Comisión Europea",
    departmentOfJustice: "Departamento de Justicia de EE.UU.",
    ukCma: "Autoridad de Competencia y Mercados del Reino Unido",
    euDesc: "Consultoría en regulación y políticas de IA para la Unión Europea",
    usDesc: "Asuntos antimonopolio y competencia relacionados con tecnología creativa",
    ukDesc: "Asuntos antimonopolio y competencia relacionados con tecnología creativa"
  },
  pt: {
    title: "Governo e Regulamentação",
    description: "Assessoro governos sobre regulamentação de IA, ferramentas criativas, propriedade intelectual e ética. As agências com as quais trabalhei:",
    europeanCommission: "Comissão Europeia",
    departmentOfJustice: "Departamento de Justiça dos EUA",
    ukCma: "Autoridade de Concorrência e Mercados do Reino Unido",
    euDesc: "Consultoria em regulamentação e políticas de IA para a União Europeia",
    usDesc: "Questões antitruste e de concorrência relacionadas à tecnologia criativa",
    ukDesc: "Questões antitruste e de concorrência relacionadas à tecnologia criativa"
  }
}

export default function Government({ language = 'en' }) {
  const t = translations[language] || translations.en

  const govItems = [
    {
      title: t.europeanCommission,
      description: t.euDesc,
      flagClass: "fi fi-eu",
      link: "https://ec.europa.eu/"
    },
    {
      title: t.departmentOfJustice,
      description: t.usDesc, 
      flagClass: "fi fi-us",
      link: "https://www.justice.gov/"
    },
    {
      title: t.ukCma,
      description: t.ukDesc,
      flagClass: "fi fi-gb", 
      link: "https://www.gov.uk/government/organisations/competition-and-markets-authority"
    }
  ]

  // Create items with intro text in first card
  const govItemsWithIntro = [
    {
      title: t.title,
      description: t.description,
      isIntro: true
    },
    ...govItems
  ]

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </Head>
      <section className="section">
        <div className="max-w-6xl mx-auto px-8">
          <LargeCards items={govItemsWithIntro} />
        </div>
      </section>

      <style jsx>{`
        .section {
          background: var(--hero-bg);
          padding: 0;
        }
      `}</style>
    </>
  )
}