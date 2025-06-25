import EventsList from '../../components/EventsList'
import { events2025 } from '../../data/eventsData'

export default function EventosTech2025ES() {
  return (
    <EventsList
      year="2025"
      events={events2025}
      title="Eventos Tech 2025 - Conferencias de Tecnología en Latinoamérica"
      description="Cada vez que busco conferencias, me doy cuenta de que no hay una fuente única confiable. Son demasiado genéricas, desactualizadas, listando cada pequeño meetup posible, etc. Así que lancé la investigación con ChatGPT y verifiqué ligeramente los hechos. Como necesitaba almacenar los resultados en algún lugar, programé esta sección a la ligera y la compartí contigo. Cuidado con las alucinaciones y verifica todo."
      metaDescription="Calendario completo de eventos tech 2025 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes."
      keywords="eventos tech 2025, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
      language="es"
    />
  )
}