import Head from 'next/head'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'

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
    aiFocusLabel: "AI Focus"
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
    aiFocusLabel: "Enfoque IA"
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
    aiFocusLabel: "Foco IA"
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

  // Event content translation utility
  const translateEventContent = (event, language) => {
    if (language === 'es') return event // Return original Spanish content
    
    // Comprehensive translation mappings for event content
    const translations = {
      // Event descriptions
      'Evento anual de innovación y startups que conecta emprendedores, inversores y corporaciones.': 'Annual innovation and startup event connecting entrepreneurs, investors and corporations.',
      'Festival tecnológico y de talento joven más grande de México, apoyado por el estado de Jalisco.': 'Mexico\'s largest technology and young talent festival, supported by the state of Jalisco.',
      'Versión latinoamericana del congreso global Web Summit.': 'Latin American version of the global Web Summit congress.',
      'El mayor evento de tecnología financiera en América Latina.': 'The largest financial technology event in Latin America.',
      'El mayor festival geek/tech de la región, con miles de campuseros acampando onsite.': 'The largest geek/tech festival in the region, with thousands of participants camping on-site.',
      'Conferencia masiva de innovación y tecnología.': 'Massive innovation and technology conference.',
      'Principal congreso latinoamericano de telecomunicaciones, TI y conectividad.': 'Leading Latin American congress on telecommunications, IT and connectivity.',
      'Encuentro anual de economía digital organizado por el Ministerio TIC de Colombia.': 'Annual digital economy meeting organized by Colombia\'s Ministry of ICT.',
      'Conferencia comunitaria creada por sysarmy; charlas técnicas de software libre, IA, seguridad, DevOps y cultura nerd, con hackatones y workshops gratuitos.': 'Community conference created by sysarmy; technical talks on open source software, AI, security, DevOps and nerd culture, with free hackathons and workshops.',
      'Evento anual de innovación y startups que conecta emprendedores, inversores y corporaciones. Celebrará su 5ª edición en 2026.': 'Annual innovation and startup event connecting entrepreneurs, investors and corporations. Will celebrate its 5th edition in 2026.',
      'El mayor evento de tecnología financiera en América Latina (antes conocido como CIAB FEBRABAN).': 'The largest financial technology event in Latin America (formerly known as CIAB FEBRABAN).',
      'El mayor festival geek/tech de la región, con miles de campuseros acampando onsite. La edición 2026 (16ª) espera más de 100.000 visitantes.': 'The largest geek/tech festival in the region, with thousands of participants camping on-site. The 2026 edition (16th) expects over 100,000 visitors.',
      'Versión latinoamericana del congreso global Web Summit. Reúne decenas de miles de entusiastas tech, startups e inversores.': 'Latin American version of the global Web Summit congress. Brings together tens of thousands of tech enthusiasts, startups and investors.',
      'Conferencia masiva de innovación y tecnología que contó con cerca de 155.000 personas durante cuatro días en 2023.': 'Massive innovation and technology conference that had nearly 155,000 people over four days in 2023.',
      'Encuentro anual insignia de economía digital organizado por el Ministerio TIC de Colombia (entrada gratuita).': 'Annual flagship digital economy meeting organized by Colombia\'s Ministry of ICT (free admission).',
      'Principal congreso latinoamericano de telecomunicaciones, TI y conectividad (24+ ediciones).': 'Leading Latin American congress on telecommunications, IT and connectivity (24+ editions).',
      'Feria-congreso de telecomunicaciones y transformación digital ya en su 25ª+ edición.': 'Telecommunications and digital transformation trade fair-congress now in its 25th+ edition.',
      'Congreso latinoamericano de tecnología bancaria y financiera, en su 36ª edición. Tras el récord de 55 mil visitantes en 2024.': 'Latin American congress on banking and financial technology, in its 36th edition. After the record of 55 thousand visitors in 2024.',
      
      // Focus areas
      'Emprendimiento, startups e innovación': 'Entrepreneurship, startups and innovation',
      'Desarrollo de talento en tecnología, emprendimiento, programación': 'Technology talent development, entrepreneurship, programming',
      'Tendencias tecnológicas globales y emprendimiento': 'Global technology trends and entrepreneurship',
      'Soluciones tecnológicas para el sector financiero': 'Technology solutions for the financial sector',
      'Cultura tecnológica y emprendimiento': 'Technology culture and entrepreneurship',
      'Innovación abierta y transformación digital multisectorial': 'Open innovation and multi-sector digital transformation',
      'Tecnologías de la información y comunicaciones': 'Information and communication technologies',
      'Ecosistemas digitales y contenido 4.0': 'Digital ecosystems and content 4.0',
      'Tecnología & desarrollo de software open-source': 'Technology & open-source software development',
      'Emprendimiento, startups e innovación con temas de futuro del trabajo, IA, sostenibilidad': 'Entrepreneurship, startups and innovation with themes of future of work, AI, sustainability',
      'Desarrollo de talento en tecnología, emprendimiento, programación, robótica y economía creativa': 'Technology talent development, entrepreneurship, programming, robotics and creative economy',
      'Soluciones tecnológicas para el sector financiero (banca digital, pagos, seguridad, IA en finanzas)': 'Technology solutions for the financial sector (digital banking, payments, security, AI in finance)',
      'Tendencias tecnológicas globales y emprendimiento, con ponentes de alto nivel del mundo tech y empresarial': 'Global technology trends and entrepreneurship, with high-level speakers from the tech and business world',
      'Cultura tecnológica y emprendimiento, con maratones de programación, hackathons, talleres 24h y keynotes': 'Technology culture and entrepreneurship, with programming marathons, hackathons, 24h workshops and keynotes',
      'Innovación abierta y transformación digital multisectorial (tecnología, negocios, sustentabilidad, IA)': 'Open innovation and multi-sector digital transformation (technology, business, sustainability, AI)',
      'Tecnologías de la información y comunicaciones (ICT), con foco en networking B2B, telecom, transformación digital': 'Information and communication technologies (ICT), with focus on B2B networking, telecom, digital transformation',
      'Ecosistemas digitales y contenido 4.0 con ejes en IA, animación digital, videojuegos, EdTech, TravelTech, Fintech': 'Digital ecosystems and content 4.0 with focus on AI, digital animation, video games, EdTech, TravelTech, Fintech',
      'Tech & desarrollo de software open-source': 'Tech & open-source software development',
      'Tech & comunidad dev': 'Tech & dev community',
      'Fintech y banca del futuro – showcases de IA aplicada a finanzas, tendencias en open banking': 'Fintech and banking of the future – AI applied to finance showcases, open banking trends',
      'Telecom e infraestructura tech – 5G avanzado, conectividad rural, cloud computing': 'Telecom and tech infrastructure – advanced 5G, rural connectivity, cloud computing',
      'Innovación financiera – pagos digitales, blockchain en banca, ciberseguridad financiera': 'Financial innovation – digital payments, blockchain in banking, financial cybersecurity'
    }

    const translatedEvent = { ...event }
    
    // Translate description if mapping exists
    if (translations[event.description]) {
      translatedEvent.description = translations[event.description]
    }
    
    // Translate focus if mapping exists  
    if (translations[event.focus]) {
      translatedEvent.focus = translations[event.focus]
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
    'Brasil': '/i/books/brasil.png',
    'México': '🇲🇽', 
    'Colombia': '🇨🇴',
    'Argentina': '🇦🇷'
  }

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

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
  }, [filterCountry, sortBy, events])

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
    const locale = localeMap[language] || 'es-ES'
    
    const options = { day: 'numeric', month: 'short' }
    const formattedStart = date.toLocaleDateString(locale, options)
    const formattedEnd = endDate.toLocaleDateString(locale, options)
    
    return {
      formatted: `${formattedStart} - ${formattedEnd}`,
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
    
    return `${urlPatterns[detectedLanguage] || urlPatterns.es}${queryString}`
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
          <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">{title}</h1>
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
            const translatedEvent = translateEventContent(event, detectedLanguage)
            return (
              <div key={event.id} className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isPast ? 'opacity-60 bg-gray-50' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-4">{translatedEvent.name}</h3>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {renderPopularity(translatedEvent.popularity)}
                    {renderAIPresence(translatedEvent.aiPresence)}
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-gray-600 space-y-1">
                  <div>📍 {translatedEvent.location}</div>
                  <div className="flex items-center gap-2">
                    📅 {translatedEvent.confirmed ? dateFormatted : translatedEvent.approximateDate}
                    {!translatedEvent.confirmed && <span className="inline-block ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-xl text-xs font-medium">{t.probableDate}</span>}
                  </div>
                  <div>👥 {translatedEvent.attendees.toLocaleString()} {t.attendeesText}</div>
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