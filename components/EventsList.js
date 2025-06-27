import Head from 'next/head'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import { eventTranslations } from '../data/eventTranslations'

// Language translations
const translations = {
  en: {
    sortBy: "Sort by",
    category: "Category",
    country: "Country", 
    popularity: "Popularity",
    date: "Date",
    attendees: "Attendees",
    allCountries: "All",
    probableDate: "Probable date",
    generalTech: "General Tech",
    gaming: "Gaming",
    attendeesText: "attendees",
    focus: "Focus",
    mainTitle: "Tech Events Latam",
    popularityLabel: "Popularity",
    aiFocusLabel: "AI Focus",
    technologyConferences: "Technology Conferences",
    in: "in",
    countryDescriptions: {
      'Brasil': "Brazil hosts some of Latin America's largest technology conferences, including Campus Party Brasil with 100,000+ attendees, Febraban Tech focusing on fintech innovation, and Rio Innovation Week attracting 150,000+ participants.",
      'México': "Mexico is a growing tech hub hosting major events like Jalisco Talent Land with 40,000+ attendees and Gamergy México, the largest gaming festival in Latin America with cutting-edge esports competitions.",
      'Colombia': "Colombia leads digital transformation in Latin America with Colombia 4.0 Bogotá, the flagship digital economy event organized by the Ministry of ICT, featuring AI, EdTech, and fintech innovations.",
      'Argentina': "Argentina's tech scene features community-driven events like Nerdearla focusing on open-source development and Argentina Game Show, one of the largest gaming exhibitions in South America."
    },
    countryTitles: {
      'Brasil': 'Campus Party, Febraban Tech, Web Summit Rio',
      'México': 'Jalisco Talent Land, Gamergy México',
      'Colombia': 'Colombia 4.0 Bogotá',
      'Argentina': 'Nerdearla, Argentina Game Show'
    },
    countryMetaDescriptions: {
      'Brasil': 'Campus Party Brasil, Febraban Tech, Web Summit Rio, and Rio Innovation Week. Complete calendar of Brazil\'s major tech events.',
      'México': 'Jalisco Talent Land, Gamergy México gaming festival. Complete calendar of Mexico\'s major technology events.',
      'Colombia': 'Colombia 4.0 Bogotá digital economy event. Complete calendar of Colombia\'s major tech conferences.',
      'Argentina': 'Nerdearla open-source conference, Argentina Game Show. Complete calendar of Argentina\'s tech events.'
    }
  },
  es: {
    sortBy: "Ordenar por",
    category: "Categoría", 
    country: "País",
    popularity: "Popularidad",
    date: "Fecha",
    attendees: "Asistentes",
    allCountries: "Todos",
    probableDate: "Fecha probable",
    generalTech: "General Tech",
    gaming: "Gaming",
    attendeesText: "asistentes",
    focus: "Enfoque",
    mainTitle: "Eventos Tech Latam",
    popularityLabel: "Popularidad",
    aiFocusLabel: "Enfoque IA",
    technologyConferences: "Conferencias de Tecnología",
    in: "en",
    countryDescriptions: {
      'Brasil': "Brasil alberga algunas de las conferencias tecnológicas más grandes de América Latina, incluyendo Campus Party Brasil con más de 100,000 asistentes, Febraban Tech enfocado en innovación fintech, y Rio Innovation Week que atrae a más de 150,000 participantes.",
      'México': "México es un centro tecnológico en crecimiento que alberga eventos importantes como Jalisco Talent Land con más de 40,000 asistentes y Gamergy México, el festival de gaming más grande de América Latina con competencias de esports de vanguardia.",
      'Colombia': "Colombia lidera la transformación digital en América Latina con Colombia 4.0 Bogotá, el evento insignia de economía digital organizado por el Ministerio TIC, presentando innovaciones en IA, EdTech y fintech.",
      'Argentina': "La escena tecnológica de Argentina presenta eventos impulsados por la comunidad como Nerdearla enfocado en desarrollo de código abierto y Argentina Game Show, una de las exhibiciones de gaming más grandes de Sudamérica."
    },
    countryTitles: {
      'Brasil': 'Campus Party, Febraban Tech, Web Summit Rio',
      'México': 'Jalisco Talent Land, Gamergy México',
      'Colombia': 'Colombia 4.0 Bogotá',
      'Argentina': 'Nerdearla, Argentina Game Show'
    },
    countryMetaDescriptions: {
      'Brasil': 'Campus Party Brasil, Febraban Tech, Web Summit Rio y Rio Innovation Week. Calendario completo de los principales eventos tecnológicos de Brasil.',
      'México': 'Jalisco Talent Land, festival de gaming Gamergy México. Calendario completo de los principales eventos tecnológicos de México.',
      'Colombia': 'Evento de economía digital Colombia 4.0 Bogotá. Calendario completo de las principales conferencias tecnológicas de Colombia.',
      'Argentina': 'Conferencia de código abierto Nerdearla, Argentina Game Show. Calendario completo de eventos tecnológicos de Argentina.'
    }
  },
  pt: {
    sortBy: "Ordenar por",
    category: "Categoria",
    country: "País",
    popularity: "Popularidade", 
    date: "Data",
    attendees: "Participantes",
    allCountries: "Todos",
    probableDate: "Data provável",
    generalTech: "Tech Geral",
    gaming: "Gaming",
    attendeesText: "participantes",
    focus: "Foco",
    mainTitle: "Eventos Tech Latam",
    popularityLabel: "Popularidade",
    aiFocusLabel: "Foco IA",
    technologyConferences: "Conferências de Tecnologia",
    in: "no",
    countryDescriptions: {
      'Brasil': "O Brasil hospeda algumas das maiores conferências de tecnologia da América Latina, incluindo Campus Party Brasil com mais de 100.000 participantes, Febraban Tech focado em inovação fintech, e Rio Innovation Week atraindo mais de 150.000 participantes.",
      'México': "O México é um centro tecnológico em crescimento que hospeda grandes eventos como Jalisco Talent Land com mais de 40.000 participantes e Gamergy México, o maior festival de gaming da América Latina com competições de esports de ponta.",
      'Colombia': "A Colômbia lidera a transformação digital na América Latina com Colombia 4.0 Bogotá, o evento principal de economia digital organizado pelo Ministério TIC, apresentando inovações em IA, EdTech e fintech.",
      'Argentina': "A cena tecnológica da Argentina apresenta eventos orientados pela comunidade como Nerdearla focado em desenvolvimento de código aberto e Argentina Game Show, uma das maiores exposições de gaming da América do Sul."
    },
    countryTitles: {
      'Brasil': 'Campus Party, Febraban Tech, Web Summit Rio',
      'México': 'Jalisco Talent Land, Gamergy México',
      'Colombia': 'Colombia 4.0 Bogotá',
      'Argentina': 'Nerdearla, Argentina Game Show'
    },
    countryMetaDescriptions: {
      'Brasil': 'Campus Party Brasil, Febraban Tech, Web Summit Rio e Rio Innovation Week. Calendário completo dos principais eventos tecnológicos do Brasil.',
      'México': 'Jalisco Talent Land, festival de gaming Gamergy México. Calendário completo dos principais eventos tecnológicos do México.',
      'Colombia': 'Evento de economia digital Colombia 4.0 Bogotá. Calendário completo das principais conferências tecnológicas da Colômbia.',
      'Argentina': 'Conferência de código aberto Nerdearla, Argentina Game Show. Calendário completo de eventos tecnológicos da Argentina.'
    }
  }
}

export default function EventsList({ 
  year, 
  events, 
  title, 
  description, 
  metaDescription, 
  keywords,
  language
}) {
  const router = useRouter()
  
  // Standardized language detection following index.js pattern
  const { locale } = router
  const detectedLanguage = language || locale || 'en'
  
  
  const [sortBy, setSortBy] = useState('popularity')
  const [filterCountry, setFilterCountry] = useState('all')
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  
  // Translation helper
  const t = translations[detectedLanguage] || translations.en

  // Helper functions for country-specific content
  const normalizeCountryName = (country) => {
    const mapping = {
      'Brazil': 'Brasil',
      'Mexico': 'México'
    }
    return mapping[country] || country
  }

  const getCountryDescription = (country, language) => {
    const normalizedCountry = normalizeCountryName(country)
    const t = translations[language] || translations.en
    return t.countryDescriptions?.[normalizedCountry] || description
  }

  const getCountryTitle = (country, language, year) => {
    const normalizedCountry = normalizeCountryName(country)
    const t = translations[language] || translations.en
    const eventNames = t.countryTitles?.[normalizedCountry]
    if (eventNames) {
      return `Tech Events ${year} - ${t.technologyConferences} ${t.in} ${country} | ${eventNames}`
    }
    return title
  }

  const getCountryMetaDescription = (country, language, year) => {
    const normalizedCountry = normalizeCountryName(country)
    const t = translations[language] || translations.en
    const countryMeta = t.countryMetaDescriptions?.[normalizedCountry]
    if (countryMeta) {
      return `Tech Events ${year} - ${t.technologyConferences} ${t.in} ${country}. ${countryMeta}`
    }
    return metaDescription
  }

  // Enhanced event content translation utility
  const translateEventContent = (event, language) => {
    if (language === 'en') return event // Return original English content
    
    const translatedEvent = { ...event }
    
    // Translate description using translation dictionary
    if (eventTranslations.descriptions[event.description] && eventTranslations.descriptions[event.description][language]) {
      translatedEvent.description = eventTranslations.descriptions[event.description][language]
    }
    
    // Translate focus using translation dictionary
    if (eventTranslations.focus[event.focus] && eventTranslations.focus[event.focus][language]) {
      translatedEvent.focus = eventTranslations.focus[event.focus][language]
    }

    // Translate country names in locations
    if (event.location && eventTranslations.locations) {
      let translatedLocation = event.location
      Object.keys(eventTranslations.locations).forEach(englishCountry => {
        if (eventTranslations.locations[englishCountry][language]) {
          translatedLocation = translatedLocation.replace(
            englishCountry, 
            eventTranslations.locations[englishCountry][language]
          )
        }
      })
      translatedEvent.location = translatedLocation
    }

    // Update country field for consistency
    if (event.country && eventTranslations.locations[event.country] && eventTranslations.locations[event.country][language]) {
      translatedEvent.country = eventTranslations.locations[event.country][language]
    }

    return translatedEvent
  }

  // Load filters from URL on mount
  useEffect(() => {
    const { sort, country } = router.query
    if (sort) setSortBy(sort)
    if (country) setFilterCountry(country)
  }, [router.query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownOpen && !event.target.closest('.country-dropdown-wrapper')) {
        setCountryDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [countryDropdownOpen])

  // Update URL when filters change
  const updateURL = (newSort, newCountry) => {
    const query = {}
    if (newSort !== 'popularity') query.sort = newSort
    if (newCountry !== 'all') query.country = newCountry
    
    router.replace({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true })
  }

  // Get all unique countries
  const allCountries = [...new Set(events.map(event => event.country))]
  
  // Get country counts
  const countryCounts = allCountries.reduce((acc, country) => {
    acc[country] = events.filter(event => event.country === country).length
    return acc
  }, {})

  // Country flag mapping
  const countryFlags = {
    'Brasil': '/i/icons8-flag-brasil.svg',
    'Brazil': '/i/icons8-flag-brasil.svg',
    'México': '🇲🇽',
    'Mexico': '🇲🇽', 
    'Colombia': '🇨🇴',
    'Argentina': '🇦🇷'
  }

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

    // Filter out past events for current year (use date string comparison to avoid constantly changing dates)
    const currentYear = new Date().getFullYear()
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    
    if (parseInt(year) === currentYear) {
      filtered = filtered.filter(event => {
        const eventEndDate = event.endDate || event.date
        // Only filter if the event has a proper date format (not just month names like "April")
        if (eventEndDate && eventEndDate.includes('-')) {
          return eventEndDate >= today
        }
        return true // Keep events with approximate dates like "April"
      })
    }

    // Filter by country
    if (filterCountry !== 'all') {
      filtered = filtered.filter(event => event.country === filterCountry)
    }

    // Sort events
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          // Handle mixed date formats safely
          const aDate = a.date && a.date.includes('-') ? new Date(a.date) : new Date()
          const bDate = b.date && b.date.includes('-') ? new Date(b.date) : new Date()
          return aDate - bDate
        case 'popularity':
          return b.popularity - a.popularity
        case 'attendees':
          return b.attendees - a.attendees
        default:
          return b.popularity - a.popularity
      }
    })

    return sorted
  }, [filterCountry, sortBy, events, year])

  const renderPopularity = (popularity) => {
    return (
      <div className="min-w-[120px]">
        <div className="text-xs text-gray-500 mb-1">{t.popularityLabel}</div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${popularity}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const renderAIPresence = (aiPresence) => {
    return (
      <div className="min-w-[120px] mt-3">
        <div className="text-xs text-gray-500 mb-1">{t.aiFocusLabel}</div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${aiPresence}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr, endDateStr) => {
    const date = new Date(dateStr)
    const endDate = new Date(endDateStr)
    const now = new Date()
    const isPast = date < now
    
    const localeMap = {
      es: 'es-ES',
      en: 'en-US', 
      pt: 'pt-BR'
    }
    const locale = localeMap[detectedLanguage] || 'es-ES'
    
    // Smart date range formatting
    let formatted
    if (date.getFullYear() === endDate.getFullYear()) {
      if (date.getMonth() === endDate.getMonth()) {
        // Same month: "July 14-19, 2028"
        const month = date.toLocaleDateString(locale, { month: 'long' })
        const year = date.getFullYear()
        const startDay = date.getDate()
        const endDay = endDate.getDate()
        formatted = `${month} ${startDay}-${endDay}, ${year}`
      } else {
        // Same year, different months: "June 20 - July 5, 2028"
        const startFormatted = date.toLocaleDateString(locale, { day: 'numeric', month: 'long' })
        const endFormatted = endDate.toLocaleDateString(locale, { day: 'numeric', month: 'long' })
        formatted = `${startFormatted} - ${endFormatted}, ${date.getFullYear()}`
      }
    } else {
      // Different years: "Dec 28, 2028 - Jan 3, 2029"
      const startFormatted = date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
      const endFormatted = endDate.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
      formatted = `${startFormatted} - ${endFormatted}`
    }
    
    return {
      formatted,
      isPast
    }
  }

  // Function to check if a year should be hidden (all events have ended)
  const isYearPast = (yearString) => {
    // For simplicity, we'll check if all events in the current events array are past
    // This works because each page only loads events for one year
    if (!events || events.length === 0) return false
    
    const now = new Date()
    const latestEventEnd = Math.max(...events.map(event => new Date(event.endDate).getTime()))
    
    return latestEventEnd < now.getTime()
  }

  // Get all available years and filter out past ones
  const allYears = ['2025', '2026', '2027', '2028']
  
  // Filter years - if current year is past, don't show years before it
  const currentYearIndex = allYears.indexOf(year)
  const currentEventsPast = events.length > 0 && isYearPast(year)
  
  let availableYears = allYears
  
  // If current year events are all past, filter out this year and earlier years
  if (currentEventsPast) {
    availableYears = allYears.filter((y, index) => index > currentYearIndex)
  }
  
  const years = availableYears.length > 0 ? availableYears : allYears

  // Build year URLs with current filters
  const buildYearURL = (targetYear) => {
    const query = {}
    if (sortBy !== 'popularity') query.sort = sortBy
    if (filterCountry !== 'all') query.country = filterCountry
    
    const queryString = Object.keys(query).length > 0 ? '?' + new URLSearchParams(query).toString() : ''
    
    // Use language-appropriate URL pattern
    const urlPatterns = {
      es: `/eventos-tech-${targetYear}`,
      en: `/tech-events-${targetYear}`, 
      pt: `/eventos-tech-${targetYear}-pt`
    }
    
    return `${urlPatterns[detectedLanguage] || urlPatterns.en}${queryString}`
  }

  return (
    <Layout>
      <Head>
        <title>
          {filterCountry !== 'all' 
            ? getCountryTitle(filterCountry, detectedLanguage, year)
            : title
          }
        </title>
        <meta name="description" content={
          filterCountry !== 'all'
            ? getCountryMetaDescription(filterCountry, detectedLanguage, year)
            : metaDescription
        } />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://ivanbraun.com/eventos-tech-${year}`} />
        {years.map(y => (
          <link 
            key={y} 
            rel="alternate" 
            href={`https://ivanbraun.com/eventos-tech-${y}`} 
            title={`Eventos Tech ${y}`} 
          />
        ))}
      </Head>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">
            <span className="inline-block bg-[#7f58ca] text-white text-3xl px-6 py-2 rounded-md font-medium mb-3" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
              {filterCountry !== 'all' ? `Tech Events ${year}` : title.split(' - ')[0]}
            </span>
            <span className="block text-5xl">
              {filterCountry !== 'all' ? `${t.technologyConferences} ${t.in} ${filterCountry}` : title.split(' - ')[1]}
            </span>
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            {filterCountry !== 'all' 
              ? getCountryDescription(filterCountry, detectedLanguage)
              : description
            }
          </p>
        </div>

        {/* Year Navigation */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {years.map(y => (
            <a 
              key={y}
              href={buildYearURL(y)} 
              className={`px-6 py-3 rounded-lg border font-medium transition-all duration-300 ${
                year === y 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
              }`}
            >
              {y}
            </a>
          ))}
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="flex gap-8 flex-wrap items-end md:flex-row flex-col md:gap-8 gap-4">
            <div className="flex flex-row items-center gap-3">
              <label className="text-sm font-medium text-gray-600">{t.sortBy}</label>
              <select 
                value={sortBy} 
                onChange={(e) => {
                  const newSort = e.target.value
                  setSortBy(newSort)
                  updateURL(newSort, filterCountry)
                }}
                className="px-2 py-2 border border-gray-300 rounded bg-white min-w-[150px]"
              >
                <option value="popularity">{t.popularity}</option>
                <option value="date">{t.date}</option>
                <option value="attendees">{t.attendees}</option>
              </select>
            </div>

            <div className="flex flex-row items-center gap-3">
              <label className="text-sm font-medium text-gray-600">{t.country}</label>
              <div className="country-dropdown-wrapper">
                <div 
                  className="country-dropdown-trigger"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                >
                  <span>{filterCountry === 'all' ? t.allCountries : filterCountry}</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
                
                {countryDropdownOpen && (
                  <div className="country-dropdown-content">
                    <div className="dropdown-left">
                      <div 
                        className={`country-dropdown-option ${filterCountry === 'all' ? 'active' : ''}`}
                        onClick={() => {
                          setFilterCountry('all')
                          updateURL(sortBy, 'all')
                          setCountryDropdownOpen(false)
                        }}
                      >
                        <span className="country-flag">🌎</span>
                        <span className="country-text">{t.allCountries}</span>
                        <span className="country-count">({events.length})</span>
                      </div>
                      {allCountries.map(country => (
                        <div 
                          key={country}
                          className={`country-dropdown-option ${filterCountry === country ? 'active' : ''}`}
                          onClick={() => {
                            setFilterCountry(country)
                            updateURL(sortBy, country)
                            setCountryDropdownOpen(false)
                          }}
                        >
                          {countryFlags[country] && countryFlags[country].startsWith('/') ? (
                            <img 
                              src={countryFlags[country]} 
                              alt={`${country} flag`} 
                              className="country-flag-image-small"
                            />
                          ) : (
                            <span className="country-flag">{countryFlags[country] || '🌍'}</span>
                          )}
                          <span className="country-text">{country}</span>
                          <span className="country-count">({countryCounts[country]})</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="dropdown-right">
                      <img 
                        src="/i/books/brasil.png" 
                        alt="Latin America meme" 
                        className="dropdown-meme-image"
                        onClick={() => window.open('/i/books/brasil.png', '_blank')}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAndSortedEvents.map(event => {
            const { formatted: dateFormatted, isPast } = formatDate(event.date, event.endDate)
            const translatedEvent = translateEventContent(event, detectedLanguage)
            return (
              <div key={event.id} className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isPast ? 'opacity-60 bg-gray-50' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{translatedEvent.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📍 {translatedEvent.location}</div>
                      <div className="flex items-center gap-2">
                        📅 {translatedEvent.confirmed ? dateFormatted : (translatedEvent.approximateDate || dateFormatted)}
                      </div>
                      <div>👥 {translatedEvent.attendees.toLocaleString()} {t.attendeesText}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {renderPopularity(translatedEvent.popularity)}
                    {renderAIPresence(translatedEvent.aiPresence)}
                  </div>
                </div>

                <p className="mb-4 leading-relaxed text-gray-900">{translatedEvent.description}</p>
                
                <div className="mb-4 text-sm text-gray-600">
                  <strong>{t.focus}:</strong> {translatedEvent.focus}
                </div>

              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        /* Custom styles for complex country dropdown */

        .country-dropdown-wrapper {
          position: relative;
          min-width: 150px;
        }

        .country-dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .country-dropdown-trigger:hover {
          border-color: #2563eb;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .country-dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 100;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          margin-top: 2px;
          display: flex;
          min-width: 400px;
        }

        .dropdown-left {
          flex: 1;
          padding: 0.5rem;
          border-right: 1px solid #d1d5db;
        }

        .dropdown-right {
          width: 170px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .country-dropdown-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .country-dropdown-option:hover {
          background: #f3f4f6;
        }

        .country-dropdown-option.active {
          background: #2563eb;
          color: white;
        }

        .dropdown-meme-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          cursor: zoom-in;
          transition: transform 0.2s ease;
        }

        .dropdown-meme-image:hover {
          transform: scale(1.05);
        }

        .country-flag-image-small {
          width: 16px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
        }

        .country-flag {
          font-size: 1rem;
          line-height: 1;
        }

        .country-text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .country-count {
          font-size: 0.8rem;
          opacity: 0.7;
          font-weight: 400;
        }

        .country-option.active .country-count {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .country-dropdown-content {
            min-width: 300px;
            flex-direction: column;
          }

          .dropdown-left {
            border-right: none;
            border-bottom: 1px solid #d1d5db;
          }

          .dropdown-right {
            width: auto;
            padding: 1rem;
          }

          .dropdown-meme-image {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </Layout>
  )
}