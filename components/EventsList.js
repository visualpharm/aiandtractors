import Head from 'next/head'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'

// Language translations
const translations = {
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
    attendeesText: "asistentes"
  },
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
    attendeesText: "attendees"
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
    attendeesText: "participantes"
  }
}

export default function EventsList({ 
  year, 
  events, 
  title, 
  description, 
  metaDescription, 
  keywords,
  language = 'es'
}) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('popularity')
  const [filterTag, setFilterTag] = useState('general tech')
  const [filterCountry, setFilterCountry] = useState('all')
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  
  // Translation helper
  const t = translations[language] || translations.es

  // Load filters from URL on mount
  useEffect(() => {
    const { sort, tag, country } = router.query
    if (sort) setSortBy(sort)
    if (tag) setFilterTag(tag)
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
  const updateURL = (newSort, newTag, newCountry) => {
    const query = {}
    if (newSort !== 'popularity') query.sort = newSort
    if (newTag !== 'general tech') query.tag = newTag
    if (newCountry !== 'all') query.country = newCountry
    
    router.replace({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true })
  }

  // Get all unique tags and countries
  const allTags = [...new Set(events.flatMap(event => event.tags))]
  const allCountries = [...new Set(events.map(event => event.country))]
  
  // Get country counts
  const countryCounts = allCountries.reduce((acc, country) => {
    acc[country] = events.filter(event => event.country === country).length
    return acc
  }, {})

  // Country flag mapping
  const countryFlags = {
    'Brasil': '/i/books/brasil.png',
    'México': '🇲🇽', 
    'Colombia': '🇨🇴',
    'Argentina': '🇦🇷'
  }

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

    // Filter by tag
    if (filterTag !== 'all') {
      filtered = filtered.filter(event => event.tags.includes(filterTag))
    }

    // Filter by country
    if (filterCountry !== 'all') {
      filtered = filtered.filter(event => event.country === filterCountry)
    }

    // Sort events
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date)
        case 'popularity':
          return b.popularity - a.popularity
        case 'attendees':
          return b.attendees - a.attendees
        default:
          return b.popularity - a.popularity
      }
    })

    return sorted
  }, [filterTag, filterCountry, sortBy, events])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">⭐</span>
        ))}
        {halfStar && <span className="text-yellow-400">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">⭐</span>
        ))}
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
    const locale = localeMap[language] || 'es-ES'
    
    const options = { day: 'numeric', month: 'short' }
    const formattedStart = date.toLocaleDateString(locale, options)
    const formattedEnd = endDate.toLocaleDateString(locale, options)
    
    return {
      formatted: `${formattedStart} - ${formattedEnd}`,
      isPast
    }
  }

  const years = ['2025', '2026', '2027', '2028']

  // Build year URLs with current filters
  const buildYearURL = (targetYear) => {
    const query = {}
    if (sortBy !== 'popularity') query.sort = sortBy
    if (filterTag !== 'general tech') query.tag = filterTag
    if (filterCountry !== 'all') query.country = filterCountry
    
    const queryString = Object.keys(query).length > 0 ? '?' + new URLSearchParams(query).toString() : ''
    return `/eventos-tech-${targetYear}${queryString}`
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
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

      <div className="container">
        {/* Header */}
        <div className="header-section">
          <h1>Eventos Tech Latam {year}</h1>
          <p className="subtitle">{description}</p>
        </div>

        {/* Year Navigation */}
        <div className="year-nav">
          {years.map(y => (
            <a 
              key={y}
              href={buildYearURL(y)} 
              className={year === y ? 'active' : ''}
            >
              {y}
            </a>
          ))}
        </div>

        {/* Filters and Sorting */}
        <div className="controls">
          <div className="filters">
            <div className="filter-group">
              <label>{t.sortBy}</label>
              <select value={sortBy} onChange={(e) => {
                const newSort = e.target.value
                setSortBy(newSort)
                updateURL(newSort, filterTag, filterCountry)
              }}>
                <option value="popularity">{t.popularity}</option>
                <option value="date">{t.date}</option>
                <option value="attendees">{t.attendees}</option>
              </select>
            </div>

            <div className="filter-group">
              <label>{t.category}</label>
              <select value={filterTag} onChange={(e) => {
                const newTag = e.target.value
                setFilterTag(newTag)
                updateURL(sortBy, newTag, filterCountry)
              }}>
                <option value="general tech">{t.generalTech}</option>
                <option value="gaming">{t.gaming}</option>
              </select>
            </div>

            <div className="filter-group">
              <label>{t.country}</label>
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
                          updateURL(sortBy, filterTag, 'all')
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
                            updateURL(sortBy, filterTag, country)
                            setCountryDropdownOpen(false)
                          }}
                        >
                          {country === 'Brasil' ? (
                            <img 
                              src={countryFlags[country]} 
                              alt="Brasil flag" 
                              className="country-flag-image-small"
                            />
                          ) : (
                            <span className="country-flag">{countryFlags[country]}</span>
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
        <div className="events-grid">
          {filteredAndSortedEvents.map(event => {
            const { formatted: dateFormatted, isPast } = formatDate(event.date, event.endDate)
            return (
              <div key={event.id} className={`event-card ${isPast ? 'past' : ''}`}>
                <div className="event-header">
                  <h3>{event.name}</h3>
                  <div className="rating">
                    {renderStars(event.rating)}
                    <span className="rating-text">({event.rating}/5)</span>
                  </div>
                </div>
                
                <div className="event-meta">
                  <div className="location">📍 {event.location}</div>
                  <div className="date">
                    📅 {event.confirmed ? dateFormatted : event.approximateDate}
                    {!event.confirmed && <span className="unconfirmed-badge">{t.probableDate}</span>}
                  </div>
                  <div className="attendees">👥 {event.attendees.toLocaleString()} {t.attendeesText}</div>
                </div>

                <p className="description">{event.description}</p>
                
                <div className="focus">
                  <strong>Enfoque:</strong> {event.focus}
                </div>

                <div className="tags">
                  {event.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`tag ${filterTag === tag ? 'active' : ''}`}
                      onClick={() => {
                        setFilterTag(tag)
                        updateURL(sortBy, tag, filterCountry)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .header-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: var(--primary-color);
          line-height: 1.1;
        }

        .subtitle {
          font-size: 1.5rem;
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }

        .intro {
          font-size: 1.1rem;
          color: var(--secondary-color);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .year-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .year-nav a {
          padding: 0.75rem 1.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          text-decoration: none;
          color: var(--primary-color);
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .year-nav a:hover,
        .year-nav a.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .controls {
          margin-bottom: 2rem;
        }

        .filters {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: end;
        }

        .filter-group {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--secondary-color);
        }

        .filter-group select {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: white;
          min-width: 150px;
        }

        .country-dropdown-wrapper {
          position: relative;
          min-width: 150px;
        }

        .country-dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .country-dropdown-trigger:hover {
          border-color: var(--primary-color);
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
          border: 1px solid var(--border-color);
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          margin-top: 2px;
          display: flex;
          min-width: 400px;
        }

        .dropdown-left {
          flex: 1;
          padding: 0.5rem;
          border-right: 1px solid var(--border-color);
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
          background: var(--color-tertiary);
        }

        .country-dropdown-option.active {
          background: var(--primary-color);
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

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .event-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
        }

        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .event-card.past {
          opacity: 0.6;
          background: var(--color-tertiary);
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .event-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 0;
          flex: 1;
          margin-right: 1rem;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .rating-text {
          font-size: 0.85rem;
          color: var(--secondary-color);
        }

        .event-meta {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--secondary-color);
        }

        .event-meta > div {
          margin-bottom: 0.25rem;
        }

        .unconfirmed-badge {
          display: inline-block;
          margin-left: 0.5rem;
          padding: 0.15rem 0.5rem;
          background: #fef3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .description {
          margin-bottom: 1rem;
          line-height: 1.5;
          color: var(--primary-color);
        }

        .focus {
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--secondary-color);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          padding: 0.25rem 0.75rem;
          background: var(--color-tertiary);
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--secondary-color);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .tag:hover,
        .tag.active {
          background: var(--primary-color);
          color: white;
        }

        @media (max-width: 768px) {
          .events-grid {
            grid-template-columns: 1fr;
          }

          .filters {
            flex-direction: column;
            gap: 1rem;
          }

          .filter-group select {
            width: 100%;
          }

          .event-header {
            flex-direction: column;
            gap: 0.5rem;
          }

          .event-header h3 {
            margin-right: 0;
          }

          .country-dropdown-content {
            min-width: 300px;
            flex-direction: column;
          }

          .dropdown-left {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
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