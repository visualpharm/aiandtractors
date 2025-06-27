import EventsList from '../components/EventsList'
import { getEventsByYear } from '../data/events'

export default function EventosTech2025ES() {
  return (
    <EventsList
      year="2025"
      events={getEventsByYear('2025')}
      title="Eventos Tech 2025 - Conferencias de Tecnología en Latinoamérica"
      description="Los principales eventos de tecnología, IA, fintech y startups en América Latina que suelen atraer más de 10,000 asistentes."
      metaDescription="Calendario completo de eventos tech 2025 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech y startups."
      keywords="eventos tech 2025, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
      language="es"
    />
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}