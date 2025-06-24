import EventsList from '../../components/EventsList'
import { events2028 } from '../../data/eventsData'

export default function EventosTech2028ES() {
  return (
    <EventsList
      year="2028"
      events={events2028}
      title="Eventos Tech 2028 - Conferencias de Tecnología en Latinoamérica"
      description="Every time I look for conferences, I realize there is no single trusted source for ones. They're too generic, outdated, listing every possible small meetup, etc. So I've launched the ChatGPT research and fact checked it lightly. Since I needed to store the results somewhere, I vibe coded this section and shared it with you. Beware of hallucinations and double check it all."
      metaDescription="Calendario completo de eventos tech 2028 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes."
      keywords="eventos tech 2028, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
      language="es"
    />
  )
}