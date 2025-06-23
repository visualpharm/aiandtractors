import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

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

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" />
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
      </Head>
      
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link href="/" className="nav-logo">Ivan Braun</Link>
            <ul className="nav-links">
              <li><Link href="/experience">{t.experience}</Link></li>
              <li><Link href="/book">{t.book}</Link></li>
              <li><Link href="/visit">{t.visit}</Link></li>
              <li><Link href="/contact">{t.contact}</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="language-switcher">
              <Link href="/">
                <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/us.svg" alt="English" />
              </Link>
              <Link href="/es">
                <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/ar.svg" alt="Español" />
              </Link>
              <Link href="/pt">
                <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/br.svg" alt="Português" />
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
            {locale === 'en' && (
              <>
                <Link href="/ai-keynote-speaker">AI Keynote Speaker</Link>
                <Link href="/argentina-ai-speaker">Argentina AI Speaker</Link>
                <Link href="/argentina-keynote-speaker">Argentina Keynote Speaker</Link>
              </>
            )}
            {locale === 'es' && (
              <>
                <Link href="/es/ia-speaker">IA Speaker</Link>
                <Link href="/es/experto-en-ia">Experto en IA</Link>
                <Link href="/es/formularios-startup-argentina">Formularios Startup Argentina</Link>
              </>
            )}
            {locale === 'pt' && (
              <>
                <Link href="/pt/speaker-ia">Speaker IA</Link>
                <Link href="/pt/experto-em-ia">Experto em IA</Link>
                <Link href="/pt/palestrante-ia-brasil">Palestrante IA Brasil</Link>
              </>
            )}
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