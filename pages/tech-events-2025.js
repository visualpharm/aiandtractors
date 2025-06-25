import EventsList from '../components/EventsList'
import { getEventsByYear } from '../data/events'

export default function TechEvents2025() {
  const year = '2025'
  const events = getEventsByYear(year)

  return (
    <EventsList
      year={year}
      events={events}
      title={`Tech Events ${year} - Technology Conferences in Latin America`}
      description="The main technology, AI, fintech and startup events in Latin America that typically attract over 10,000 attendees."
      metaDescription={`Complete calendar of tech events ${year} in Latin America. The best technology, AI, fintech and startup conferences.`}
      keywords={`tech events ${year}, technology conferences, AI events, fintech, startups latin america`}
      language="en"
    />
  )
}

export async function getStaticProps() {
  const events = getEventsByYear('2025')
  
  return {
    props: {
      events
    }
  }
}