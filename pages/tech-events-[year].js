import { useRouter } from 'next/router'
import { useEffect } from 'react'
import EventsList from '../components/EventsList'
import { events2025, events2026, events2027, events2028 } from '../data/eventsDataEn'

const eventsData = {
  '2025': events2025,
  '2026': events2026, 
  '2027': events2027,
  '2028': events2028
}

// Function to check if a year should be hidden (all events have ended)
const isYearPast = (yearEvents) => {
  if (!yearEvents || yearEvents.length === 0) return false
  
  const now = new Date()
  const latestEventEnd = Math.max(...yearEvents.map(event => new Date(event.endDate).getTime()))
  
  return latestEventEnd < now.getTime()
}

// Get the first available (non-past) year
const getFirstAvailableYear = () => {
  const allYears = ['2025', '2026', '2027', '2028']
  
  for (const y of allYears) {
    const yearEvents = eventsData[y] || []
    if (!isYearPast(yearEvents)) {
      return y
    }
  }
  
  return '2025' // fallback
}

export default function TechEventsYear() {
  const router = useRouter()
  const { year } = router.query

  // Redirect to first available year if current year is past
  useEffect(() => {
    if (year && eventsData[year]) {
      const yearEvents = eventsData[year]
      if (isYearPast(yearEvents)) {
        const firstAvailableYear = getFirstAvailableYear()
        if (firstAvailableYear !== year) {
          router.replace(`/tech-events-${firstAvailableYear}`)
          return
        }
      }
    }
  }, [year, router])

  // Return loading state while router is loading
  if (!year) {
    return <div>Loading...</div>
  }

  // Check if year is past and redirect
  const yearEvents = eventsData[year] || []
  if (isYearPast(yearEvents)) {
    return <div>Loading...</div> // Will redirect via useEffect
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

