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
    visit: "Visit me",
    contact: "Contact"
  },
  es: {
    speaking: "Conferencias",
    experience: "Experiencia",
    book: "Libro",
    visit: "Visitarme", 
    contact: "Contacto"
  },
  pt: {
    speaking: "Palestras",
    experience: "Experiência",
    book: "Livro",
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
  
  // Footer links pool with randomization
  const getRandomFooterLinks = () => {
    const linkPools = {
      en: [
        { href: "/ai-keynote-speaker", text: "AI Keynote Speaker" },
        { href: "/argentina-ai-speaker", text: "Argentina AI Speaker" },
        { href: "/argentina-keynote-speaker", text: "Argentina Keynote Speaker" },
        { href: "https://recharge.com.ar", text: "Shelter Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ],
      es: [
        { href: "/es/ia-speaker", text: "IA Speaker" },
        { href: "/es/experto-ia", text: "Experto en IA" },
        { href: "/es/formularios-startup-argentina", text: "Formularios Startup Argentina" },
        { href: "https://recharge.com.ar", text: "Refugio Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ],
      pt: [
        { href: "/pt/speaker-ia", text: "Speaker IA" },
        { href: "/pt/experto-ia", text: "Experto em IA" },
        { href: "https://recharge.com.ar", text: "Abrigo Argentina" },
        { href: "https://ilbuco.com.ar", text: "Coliving Argentina" }
      ]
    }
    
    const pool = linkPools[locale] || linkPools.en
    // Shuffle and take 3-4 random links
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(4, shuffled.length))
  }
  
  // Helper function to get language-aware URL
  const getLocalizedUrl = (path) => {
    if (locale === 'en') return path
    return `/${locale}${path}`
  }
  
  // Helper function to switch language for current page
  const getCurrentPageInLocale = (targetLocale) => {
    const currentPath = router.pathname
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
            {getRandomFooterLinks().map((link, index) => (
              <Link key={index} href={link.href}>{link.text}</Link>
            ))}
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
        
        :root {
            --bg-color: #ffffff;
            --primary-color: #000000;
            --secondary-color: #333333;
            --accent-color: #455dcc;
            --card-bg: #ffffff;
            --border-color: #e5e7eb;
            --hero-bg: #ffffff;
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

        @media (max-width: 768px) {
            .footer-content {
                flex-direction: column;
                text-align: center;
            }
            
            .footer-links {
                justify-content: center;
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