import EventsList from '../components/EventsList'
import { getEventsByYear } from '../data/events'

export default function TechEvents2026PT() {
  const year = '2026'
  const events = getEventsByYear(year)

  return (
    <EventsList
      year={year}
      events={events}
      title={`Eventos de Tecnologia ${year} - Conferências de Tecnologia na América Latina`}
      description="Os principais eventos de tecnologia, IA, fintech e startups na América Latina que normalmente atraem mais de 10.000 participantes."
      metaDescription={`Calendário completo de eventos de tecnologia ${year} na América Latina. As melhores conferências de tecnologia, IA, fintech e startups.`}
      keywords={`eventos de tecnologia ${year}, conferências de tecnologia, eventos de IA, fintech, startups américa latina`}
      language="pt"
    />
  )
}
