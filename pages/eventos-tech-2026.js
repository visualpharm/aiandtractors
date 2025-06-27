import EventsList from '../components/EventsList'
import { getEventsByYear } from '../data/events'

export default function EventosTech2026ES() {
  const year = '2026'
  const events = getEventsByYear(year)

  return (
    <EventsList
      year={year}
      events={events}
      title={`Eventos Tech ${year} - Conferencias de Tecnología en Latinoamérica`}
      description="Los principales eventos de tecnología, IA, fintech y startups en América Latina que suelen atraer más de 10,000 asistentes."
      metaDescription={`Calendario completo de eventos tech ${year} en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech y startups.`}
      keywords={`eventos tech ${year}, conferencias tecnología, eventos IA, fintech, startups latinoamérica`}
      language="es"
    />
  )
}

export async function getStaticProps() {
  const events = getEventsByYear('2026')
  
  return {
    props: {
      events
    }
  }
}