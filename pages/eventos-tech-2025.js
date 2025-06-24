import EventsList from '../components/EventsList'
import { events2025 } from '../data/eventsData'

export default function EventosTech2025() {
  return (
    <EventsList
      year="2025"
      events={events2025}
      title="Eventos Tech 2025 - Conferencias de Tecnología en Latinoamérica"
      description="Los principales eventos de tecnología, IA, gaming, fintech y startups en Latinoamérica que suelen atraer a más de 10.000 asistentes."
      metaDescription="Calendario completo de eventos tech 2025 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes."
      keywords="eventos tech 2025, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
      language="es"
    />
  )
}