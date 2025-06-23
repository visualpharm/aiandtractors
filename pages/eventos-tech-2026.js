import EventsList from '../components/EventsList'
import { events2026 } from '../data/eventsData'

export default function EventosTech2026() {
  return (
    <EventsList
      year="2026"
      events={events2026}
      title="Eventos Tech 2026 - Conferencias de Tecnología en Latinoamérica"
      description="Los principales eventos de tecnología, IA, gaming, fintech y startups en Latinoamérica que suelen atraer a más de 10.000 asistentes."
      metaDescription="Calendario completo de eventos tech 2026 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes."
      keywords="eventos tech 2026, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
    />
  )
}