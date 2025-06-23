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
    
    // Use language-appropriate URL pattern
    const urlPatterns = {
      es: `/eventos-tech-${targetYear}`,
      en: `/tech-events-${targetYear}`, 
      pt: `/eventos-tech-${targetYear}-pt`
    }
    
    return `${urlPatterns[language] || urlPatterns.es}${queryString}`
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

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">Eventos Tech Latam {year}</h1>
          <p className="text-2xl text-gray-600 mb-4">{description}</p>
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
                  updateURL(newSort, filterTag, filterCountry)
                }}
                className="px-2 py-2 border border-gray-300 rounded bg-white min-w-[150px]"
              >
                <option value="popularity">{t.popularity}</option>
                <option value="date">{t.date}</option>
                <option value="attendees">{t.attendees}</option>
              </select>
            </div>

            <div className="flex flex-row items-center gap-3">
              <label className="text-sm font-medium text-gray-600">{t.category}</label>
              <select 
                value={filterTag} 
                onChange={(e) => {
                  const newTag = e.target.value
                  setFilterTag(newTag)
                  updateURL(sortBy, newTag, filterCountry)
                }}
                className="px-2 py-2 border border-gray-300 rounded bg-white min-w-[150px]"
              >
                <option value="general tech">{t.generalTech}</option>
                <option value="gaming">{t.gaming}</option>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAndSortedEvents.map(event => {
            const { formatted: dateFormatted, isPast } = formatDate(event.date, event.endDate)
            return (
              <div key={event.id} className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isPast ? 'opacity-60 bg-gray-50' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-4">{event.name}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {renderStars(event.rating)}
                    <span className="text-sm text-gray-600">({event.rating}/5)</span>
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-gray-600 space-y-1">
                  <div>📍 {event.location}</div>
                  <div className="flex items-center gap-2">
                    📅 {event.confirmed ? dateFormatted : event.approximateDate}
                    {!event.confirmed && <span className="inline-block ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-xl text-xs font-medium">{t.probableDate}</span>}
                  </div>
                  <div>👥 {event.attendees.toLocaleString()} {t.attendeesText}</div>
                </div>

                <p className="mb-4 leading-relaxed text-gray-900">{event.description}</p>
                
                <div className="mb-4 text-sm text-gray-600">
                  <strong>Enfoque:</strong> {event.focus}
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-300 border ${
                        filterTag === tag 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-gray-100 text-gray-600 border-transparent hover:bg-blue-600 hover:text-white'
                      }`}
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