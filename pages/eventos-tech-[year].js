import { useRouter } from 'next/router'
import EventsList from '../components/EventsList'
import { events2025, events2026, events2027, events2028 } from '../data/eventsData'

const eventsData = {
  '2025': events2025,
  '2026': events2026, 
  '2027': events2027,
  '2028': events2028
}

export default function EventosTechYear() {
  const router = useRouter()
  const { year } = router.query

  // Return loading state while router is loading
  if (!year) {
    return <div>Loading...</div>
  }

  const events = eventsData[year] || []

  return (
    <EventsList
      year={year}
      events={events}
      title={`Eventos Tech ${year} - Conferencias de Tecnología en Latinoamérica`}
      description="Los principales eventos de tecnología, IA, gaming, fintech y startups en Latinoamérica que suelen atraer a más de 10.000 asistentes."
      metaDescription={`Calendario completo de eventos tech ${year} en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes.`}
      keywords={`eventos tech ${year}, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica`}
      language="es"
    />
  )
}