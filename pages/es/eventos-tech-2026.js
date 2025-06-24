import { useRouter } from 'next/router'
import EventsList from '../../components/EventsList'
import { events2026 } from '../../data/eventsData'

const translations = {
  en: {
    title: "Tech Events 2026 - Technology Conferences in Latin America",
    description: "Every time I look for conferences, I realize there is no single trusted source for ones. They're too generic, outdated, listing every possible small meetup, etc. So I've launched the ChatGPT research and fact checked it lightly. Since I needed to store the results somewhere, I vibe coded this section and shared it with you. Beware of hallucinations and double check it all.",
    metaDescription: "Complete calendar of tech events 2026 in Latin America. The best technology, AI, fintech, gaming and startup conferences. Over 10 events with +800,000 attendees.",
    keywords: "tech events 2026, technology conferences, AI events, fintech, gaming, startups latin america"
  },
  es: {
    title: "Eventos Tech 2026 - Conferencias de Tecnología en Latinoamérica",
    description: "Cada vez que busco conferencias, me doy cuenta de que no hay una fuente única confiable. Son demasiado genéricas, desactualizadas, listando cada pequeño meetup posible, etc. Así que lancé la investigación con ChatGPT y verifiqué ligeramente los hechos. Como necesitaba almacenar los resultados en algún lugar, programé esta sección a la ligera y la compartí contigo. Cuidado con las alucinaciones y verifica todo.",
    metaDescription: "Calendario completo de eventos tech 2026 en Latinoamérica. Las mejores conferencias de tecnología, IA, fintech, gaming y startups. Más de 10 eventos con +800,000 asistentes.",
    keywords: "eventos tech 2026, conferencias tecnología, eventos IA, fintech, gaming, startups latinoamérica"
  },
  pt: {
    title: "Eventos Tech 2026 - Conferências de Tecnologia na América Latina",
    description: "Toda vez que procuro conferências, percebo que não há uma única fonte confiável. Elas são muito genéricas, desatualizadas, listando todos os pequenos meetups possíveis, etc. Então lancei a pesquisa no ChatGPT e verifiquei levemente os fatos. Como precisava armazenar os resultados em algum lugar, codifiquei esta seção e compartilhei com você. Cuidado com alucinações e verifique tudo.",
    metaDescription: "Calendário completo de eventos tech 2026 na América Latina. As melhores conferências de tecnologia, IA, fintech, gaming e startups. Mais de 10 eventos com +800.000 participantes.",
    keywords: "eventos tech 2026, conferências tecnologia, eventos IA, fintech, gaming, startups américa latina"
  }
}

export default function EventosTech2026ES() {
  const router = useRouter()
  const { locale } = router
  const language = locale || 'es'
  const t = translations[language] || translations.es

  return (
    <EventsList
      year="2026"
      events={events2026}
      title={t.title}
      description={t.description}
      metaDescription={t.metaDescription}
      keywords={t.keywords}
      language={language}
    />
  )
}