import EventsList from '../components/EventsList'
import { events2026 } from '../data/eventsDataEn'

export default function TechEvents2026() {
  return (
    <EventsList
      year="2026"
      events={events2026}
      title="Tech Events 2026 - Technology Conferences in Latin America"
      description="The main technology, AI, gaming, fintech and startup events in Latin America that typically attract over 10,000 attendees."
      metaDescription="Complete calendar of tech events 2026 in Latin America. The best technology, AI, fintech, gaming and startup conferences. Over 10 events with +800,000 attendees."
      keywords="tech events 2026, technology conferences, AI events, fintech, gaming, startups latin america"
      language="en"
    />
  )
}