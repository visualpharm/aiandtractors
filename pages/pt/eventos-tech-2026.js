import EventsList from '../../components/EventsList'
import { events2026 } from '../../data/eventsData'

export default function EventosTech2026PT() {
  return (
    <EventsList
      year="2026"
      events={events2026}
      title="Eventos Tech 2026 - Conferências de Tecnologia na América Latina"
      description="Toda vez que procuro conferências, percebo que não há uma única fonte confiável. Elas são muito genéricas, desatualizadas, listando todos os pequenos meetups possíveis, etc. Então lancei a pesquisa no ChatGPT e verifiquei levemente os fatos. Como precisava armazenar os resultados em algum lugar, codifiquei esta seção e compartilhei com você. Cuidado com alucinações e verifique tudo."
      metaDescription="Calendário completo de eventos tech 2026 na América Latina. As melhores conferências de tecnologia, IA, fintech, gaming e startups. Mais de 10 eventos com +800.000 participantes."
      keywords="eventos tech 2026, conferências tecnologia, eventos IA, fintech, gaming, startups américa latina"
      language="pt"
    />
  )
}