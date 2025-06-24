import { useRouter } from 'next/router'
import EventsList from '../components/EventsList'
import { events2025, events2026, events2027, events2028 } from '../data/eventsDataEn'

const eventsData = {
  '2025': events2025,
  '2026': events2026, 
  '2027': events2027,
  '2028': events2028
}

export default function TechEventsYear() {
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
      title={`Tech Events ${year} - Technology Conferences in Latin America`}
      description="The main technology, AI, gaming, fintech and startup events in Latin America that typically attract over 10,000 attendees."
      metaDescription={`Complete calendar of tech events ${year} in Latin America. The best technology, AI, fintech, gaming and startup conferences. Over 10 events with +800,000 attendees.`}
      keywords={`tech events ${year}, technology conferences, AI events, fintech, gaming, startups latin america`}
      language="en"
    />
  )
}

