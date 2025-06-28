import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

const translations = {
  en: {
    speaking: "Speaking",
    experience: "Experience", 
    book: "Book",
    events: "Tech Events",
    vanishedPeople: "Vanished People",
    visit: "Visit me",
    contact: "Contact"
  },
  es: {
    speaking: "Conferencias",
    experience: "Experiencia",
    book: "Libro",
    events: "Eventos Tech",
    vanishedPeople: "Diseño sin Personas",
    visit: "Visitarme", 
    contact: "Contacto"
  },
  pt: {
    speaking: "Palestras",
    experience: "Experiência",
    book: "Livro",
    events: "Eventos Tech",
    vanishedPeople: "Design sem Pessoas",
    visit: "Me visitar",
    contact: "Contato"
  }
}

export default function Layout({ children }) {
  const router = useRouter()
  const [locale, setLocale] = useState('en')
  
  useEffect(() => {
    // Detect locale from path
    const path = router.asPath
    if (path.startsWith('/es')) {
      setLocale('es')
    } else if (path.startsWith('/pt')) {
      setLocale('pt')
    } else {
      setLocale('en')
    }
  }, [router.asPath])
  
  const t = translations[locale] || translations.en
  
  // Footer links pool - deterministic selection based on current page
  const getFooterLinks = () => {
    const linkPools = {
      en: [
        { href: "/ai-keynote-speaker", text: "AI Keynote Speaker" },
        { href: "/argentina-ai-speaker", text: "Argentina AI Speaker" },
        { href: "/argentina-keynote-speaker", text: "Argentina Keynote Speaker" },
        { href: "/eventos-tech-2025", text: "Tech Events 2025" },
        { href: "https://recharge.com.ar", text: "Shelter Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ],
      es: [
        { href: "/es/ia-speaker", text: "IA Speaker" },
        { href: "/es/experto-ia", text: "Experto en IA" },
        { href: "/es/formularios-startup-argentina", text: "Formularios Startup Argentina" },
        { href: "/eventos-tech-2025", text: "Eventos Tech 2025" },
        { href: "/eventos-tech-2026", text: "Eventos Tech 2026" },
        { href: "https://recharge.com.ar", text: "Refugio Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ],
      pt: [
        { href: "/pt/speaker-ia", text: "Speaker IA" },
        { href: "/pt/experto-ia", text: "Experto em IA" },
        { href: "/eventos-tech-2025", text: "Eventos Tech 2025" },
        { href: "https://recharge.com.ar", text: "Abrigo Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ]
    }
    
    const pool = linkPools[locale] || linkPools.en
    // Take first 4 links deterministically to avoid hydration mismatch
    return pool.slice(0, Math.min(4, pool.length))
  }
  
  // Helper function to get language-aware URL
  const getLocalizedUrl = (path) => {
    if (locale === 'en') return path
    return `/${locale}${path}`
  }
  
  // Helper function to switch language for current page
  const getCurrentPageInLocale = (targetLocale) => {
    const currentPath = router.pathname
    const currentQuery = router.query
    
    // Handle events pages specifically
    if (currentPath.includes('eventos-tech') || currentPath.includes('tech-events')) {
      const year = currentQuery.year || currentPath.match(/\d{4}/)?.[0] || '2025'
      const queryString = Object.keys(router.query).length > 0 
        ? '?' + new URLSearchParams(router.query).toString()
        : ''
      
      if (targetLocale === 'en') {
        return `/tech-events-${year}${queryString}`
      } else if (targetLocale === 'es') {
        return `/eventos-tech-${year}${queryString}` 
      } else if (targetLocale === 'pt') {
        return `/eventos-tech-${year}-pt${queryString}`
      }
    }
    
    // Handle ai-replaced-people pages specifically
    if (currentPath.includes('ai-replaced-people') || currentPath.includes('la-gran-desaparicion') || currentPath.includes('o-grande-desaparecimento')) {
      if (targetLocale === 'en') {
        return '/ai-replaced-people'
      } else if (targetLocale === 'es') {
        return '/es/la-gran-desaparicion'
      } else if (targetLocale === 'pt') {
        return '/pt/o-grande-desaparecimento'
      }
    }
    
    // Handle other pages
    const currentBasePath = currentPath.replace(/^\/(?:es|pt)\//, '/').replace(/^\/es$/, '/').replace(/^\/pt$/, '/')
    
    if (targetLocale === 'en') {
      return currentBasePath === '/' ? '/' : currentBasePath
    }
    
    return currentBasePath === '/' ? `/${targetLocale}` : `/${targetLocale}${currentBasePath}`
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" strategy="afterInteractive" />

      {/* Global typography */}
      <style jsx global>{`
        h1 {
          font-family: 'DotGothic16', sans-serif;
        }
      `}</style>
      
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link href={getLocalizedUrl('/')} className="nav-logo">Ivan Braun</Link>
            <ul className="nav-links">
              <li><Link href={getLocalizedUrl('/experience')}>{t.experience}</Link></li>
              <li><Link href={getLocalizedUrl('/book')}>{t.book}</Link></li>
              <li><Link href={locale === 'en' ? '/tech-events-2025' : locale === 'es' ? '/eventos-tech-2025' : '/eventos-tech-2025-pt'}>{t.events}</Link></li>
              <li><Link href={locale === 'en' ? '/ai-replaced-people' : locale === 'es' ? '/es/la-gran-desaparicion' : '/pt/o-grande-desaparecimento'}>{t.vanishedPeople}</Link></li>
              <li><Link href={getLocalizedUrl('/visit')}>{t.visit}</Link></li>
              <li><Link href={getLocalizedUrl('/contact')}>{t.contact}</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="language-switcher">
              <Link href={getCurrentPageInLocale('en')} style={{ display: 'flex' }}>
                <Image 
                  src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/us.svg" 
                  alt="English" 
                  width={24}
                  height={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    opacity: locale === 'en' ? 1 : 0.7
                  }}
                />
              </Link>
              <Link href={getCurrentPageInLocale('es')} style={{ display: 'flex' }}>
                <Image 
                  src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ar.svg" 
                  alt="Español" 
                  width={24}
                  height={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    opacity: locale === 'es' ? 1 : 0.7
                  }}
                />
              </Link>
              <Link href={getCurrentPageInLocale('pt')} style={{ display: 'flex' }}>
                <Image 
                  src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/br.svg" 
                  alt="Português" 
                  width={24}
                  height={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    opacity: locale === 'pt' ? 1 : 0.7
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Ivan Braun</p>
          <div className="footer-links">
            {getFooterLinks().map((link, index) => (
              <Link key={index} href={link.href}>{link.text}</Link>
            ))}
            <a href="https://www.instagram.com/braun.ivan/" target="_blank" rel="noopener noreferrer" className="instagram-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5rem' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @braun.ivan
            </a>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        
        :root {
            --bg-color: #f9fafb;
            --primary-color: #000000;
            --secondary-color: #333333;
            --accent-color: #455dcc;
            --card-bg: #ffffff;
            --border-color: #e5e7eb;
            --hero-bg: #f9fafb;
        }

        * {
            box-sizing: border-box;
        }

        body {
            background-color: var(--bg-color);
            color: var(--primary-color);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .top-nav {
            background: var(--bg-color);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
        }

        .nav-container {
            width: 100%;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-left {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .nav-right {
            display: flex;
            align-items: center;
        }

        .language-switcher {
            display: flex;
            gap: 0.5rem;
        }

        .language-switcher a {
            display: flex;
            align-items: center;
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }

        .language-switcher a:hover {
            opacity: 1;
        }

        .language-switcher img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid var(--border-color);
        }

        .nav-logo {
            font-family: 'DotGothic16', monospace;
            font-size: 1.2rem;
            font-weight: 400;
            color: var(--primary-color);
            text-decoration: none;
            transform: translateY(-3px);
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .nav-links a {
            color: var(--secondary-color);
            text-decoration: none;
            font-weight: 400;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--primary-color);
        }

        .footer {
            background: var(--bg-color);
            color: var(--secondary-color);
            padding: 2rem;
            margin-top: 3rem;
            border-top: 1px solid var(--border-color);
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .footer p {
            margin: 0;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .footer-links a {
            color: var(--secondary-color);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--accent-color);
        }

        .instagram-link {
            display: flex;
            align-items: center;
            color: var(--secondary-color) !important;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }

        .instagram-link:hover {
            color: #E4405F !important;
        }

        .instagram-link svg {
            transition: color 0.3s ease;
        }

        @media (max-width: 1024px) {
            .footer-content {
                flex-direction: column;
                text-align: center;
                gap: 0.75rem;
            }
            
            .footer-links {
                justify-content: center;
                gap: 1.5rem;
            }
        }

        @media (max-width: 768px) {
            .footer-content {
                flex-direction: column;
                text-align: center;
            }
            
            .footer-links {
                justify-content: center;
                gap: 1rem;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
        }
      `}</style>
    </>
  )
}