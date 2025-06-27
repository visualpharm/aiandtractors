import EventsList from '../components/EventsList'
import { getEventsByYear } from '../data/events'

export default function EventosTech2025PT() {
  return (
    <EventsList
      year="2025"
      events={getEventsByYear('2025')}
      title="Eventos Tech 2025 - Conferências de Tecnologia na América Latina"
      description="Os principais eventos de tecnologia, IA, fintech e startups na América Latina que costumam atrair mais de 10.000 participantes."
      metaDescription="Calendário completo de eventos tech 2025 na América Latina. As melhores conferências de tecnologia, IA, fintech e startups."
      keywords="eventos tech 2025, conferências tecnologia, eventos IA, fintech, startups américa latina"
      language="pt"
    />
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}