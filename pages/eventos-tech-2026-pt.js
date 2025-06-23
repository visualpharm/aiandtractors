import EventsList from '../components/EventsList'
import { events2026 } from '../data/eventsDataPt'

export default function EventosTech2026Pt() {
  return (
    <EventsList
      year="2026"
      events={events2026}
      title="Eventos Tech 2026 - Conferências de Tecnologia na América Latina"
      description="Os principais eventos de tecnologia, IA, gaming, fintech e startups na América Latina que costumam atrair mais de 10.000 participantes."
      metaDescription="Calendário completo de eventos tech 2026 na América Latina. As melhores conferências de tecnologia, IA, fintech, gaming e startups. Mais de 10 eventos com +800.000 participantes."
      keywords="eventos tech 2026, conferências tecnologia, eventos IA, fintech, gaming, startups américa latina"
      language="pt"
    />
  )
}