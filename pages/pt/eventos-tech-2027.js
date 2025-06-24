import EventsList from '../../components/EventsList'
import { events2027 } from '../../data/eventsData'

export default function EventosTech2027PT() {
  return (
    <EventsList
      year="2027"
      events={events2027}
      title="Eventos Tech 2027 - Conferências de Tecnologia na América Latina"
      description="Toda vez que procuro conferências, percebo que não há uma única fonte confiável. Elas são muito genéricas, desatualizadas, listando todos os pequenos meetups possíveis, etc. Então lancei a pesquisa no ChatGPT e verifiquei levemente os fatos. Como precisava armazenar os resultados em algum lugar, codifiquei esta seção e compartilhei com você. Cuidado com alucinações e verifique tudo."
      metaDescription="Calendário completo de eventos tech 2027 na América Latina. As melhores conferências de tecnologia, IA, fintech, gaming e startups. Mais de 10 eventos com +800.000 participantes."
      keywords="eventos tech 2027, conferências tecnologia, eventos IA, fintech, gaming, startups américa latina"
      language="pt"
    />
  )
}