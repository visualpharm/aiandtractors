import Image from 'next/image'
import { useRouter } from 'next/router'
import LargeCards from './LargeCards'

const translations = {
  en: {
    title: "Government & Regulatory",
    description: "I consult governments on AI regulation, creative tools, intellectual property, and ethics. The agencies I've worked with:",
    europeanCommission: "European Commission",
    departmentOfJustice: "U.S. Department of Justice", 
    ukCma: "UK Competition and Markets Authority",
    euDesc: "AI regulation and policy consultation for the European Union",
    usDesc: "Antitrust and competition matters related to AI and technology",
    ukDesc: "Competition and markets authority consultation on AI technologies"
  },
  es: {
    title: "Gobierno y Regulación",
    description: "Asesoro a gobiernos sobre regulación de IA, herramientas creativas, propiedad intelectual y ética. Las agencias con las que he trabajado:",
    europeanCommission: "Comisión Europea",
    departmentOfJustice: "Departamento de Justicia de EE.UU.",
    ukCma: "Autoridad de Competencia y Mercados del Reino Unido",
    euDesc: "Consultoría en regulación y políticas de IA para la Unión Europea",
    usDesc: "Asuntos antimonopolio y competencia relacionados con IA y tecnología",
    ukDesc: "Consultoría en autoridad de competencia y mercados sobre tecnologías de IA"
  },
  pt: {
    title: "Governo e Regulamentação",
    description: "Assessoro governos sobre regulamentação de IA, ferramentas criativas, propriedade intelectual e ética. As agências com as quais trabalhei:",
    europeanCommission: "Comissão Europeia",
    departmentOfJustice: "Departamento de Justiça dos EUA",
    ukCma: "Autoridade de Concorrência e Mercados do Reino Unido",
    euDesc: "Consultoria em regulamentação e políticas de IA para a União Europeia",
    usDesc: "Questões antitruste e de concorrência relacionadas à IA e tecnologia",
    ukDesc: "Consultoria em autoridade de concorrência e mercados sobre tecnologias de IA"
  }
}

export default function Government() {
  const router = useRouter()
  const { locale } = router
  const t = translations[locale] || translations.en

  const govItems = [
    {
      title: t.europeanCommission,
      description: t.euDesc,
      logo: "/i/icons8-flag-eu.svg",
      link: "https://ec.europa.eu/"
    },
    {
      title: t.departmentOfJustice,
      description: t.usDesc, 
      logo: "/i/icons8-flag-us.svg",
      link: "https://www.justice.gov/"
    },
    {
      title: t.ukCma,
      description: t.ukDesc,
      logo: "/i/icons8-flag-uk.svg", 
      link: "https://www.gov.uk/government/organisations/competition-and-markets-authority"
    }
  ]

  return (
    <section className="section">
      <div className="container">
        <h2 className="cards-title">{t.title}</h2>
        
        <div className="section-content">
          <p>{t.description}</p>
        </div>
      </div>
      
      <div className="cards-fullwidth">
        <LargeCards items={govItems} />
      </div>

      <style jsx>{`
        .section {
          background: var(--hero-bg);
          padding: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .cards-title {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.8rem;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-content p {
          font-size: 1rem;
          color: var(--secondary-color);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cards-fullwidth {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding-left: 2rem;
          padding-right: 2rem;
        }

        @media (max-width: 768px) {
          .cards-fullwidth {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  )
}