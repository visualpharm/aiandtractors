import EventsList from '../components/EventsList'
import { events2025 } from '../data/eventsData'

export default function TechEvents2025() {
  return (
    <EventsList
      year="2025"
      events={events2025}
      title="Tech Events 2025 - Technology Conferences in Latin America"
      description="Every time I look for conferences, I realize there is no single trusted source for ones. They're too generic, outdated, listing every possible small meetup, etc. So I've launched the ChatGPT research and fact checked it lightly. Since I needed to store the results somewhere, I vibe coded this section and shared it with you. Beware of hallucinations and double check it all."
      metaDescription="Complete calendar of tech events 2025 in Latin America. The best technology, AI, fintech, gaming and startup conferences. Over 10 events with +800,000 attendees."
      keywords="tech events 2025, technology conferences, AI events, fintech, gaming, startups latin america"
      language="en"
    />
  )
}