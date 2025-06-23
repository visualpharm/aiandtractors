import EventsList from '../components/EventsList'
import { events2028 } from '../data/eventsData'

export default function EventosTech2028() {
  return (
    <EventsList
      year="2028"
      events={events2028}
      title="Eventos Tech 2028 - Conferencias de Tecnología en Latinoamérica"
      description="Los principales eventos de tecnología, IA, gaming, fintech y startups en Latinoamérica que suelen atraer a más de 10.000 asistentes."
      metaDescription="Calendario completo de eventos tech 2028 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes."
      keywords="eventos tech 2028, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
    />
  )
}