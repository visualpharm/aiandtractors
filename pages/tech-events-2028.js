import EventsList from '../components/EventsList'
import { events2028 } from '../data/eventsData'

export default function TechEvents2028() {
  return (
    <EventsList
      year="2028"
      events={events2028}
      title="Tech Events 2028 - Technology Conferences in Latin America"
      description="Every time I look for conferences, I realize there is no single trusted source for ones. They're too generic, outdated, listing every possible small meetup, etc. So I've launched the ChatGPT research and fact checked it lightly. Since I needed to store the results somewhere, I vibe coded this section and shared it with you. Beware of hallucinations and double check it all."
      metaDescription="Complete calendar of tech events 2028 in Latin America. The best technology, AI, fintech, gaming and startup conferences. Over 10 events with +800,000 attendees."
      keywords="tech events 2028, technology conferences, AI events, fintech, gaming, startups latin america"
      language="en"
    />
  )
}