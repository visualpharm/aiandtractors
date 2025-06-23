import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const translations = {
  en: {
    contact: "Contact me",
    visit: "Visit me"
  },
  es: {
    contact: "Contactarme", 
    visit: "Visitarme"
  },
  pt: {
    contact: "Entre em contato",
    visit: "Me visitar"
  }
}

export default function Hero({ title, subtitle, description, introText, imageUrl }) {
  const router = useRouter()
  const [locale, setLocale] = useState('en')
  
  useEffect(() => {
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
      <section className="bg-gray-50 py-16 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <h1 className="text-6xl md:text-7xl font-normal text-gray-900 mb-2 -ml-2 leading-tight" style={{ fontFamily: "'DotGothic16', monospace" }}>
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-4 font-normal">
              {subtitle}
            </p>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex gap-4 flex-wrap">
              {imageUrl ? (
                <>
                  <button 
                    className="px-10 py-4 bg-blue-600 text-white rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.open('https://book.ilbuco.com.ar/', '_self')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">Book</p>
                  </button>
                  <button 
                    className="px-10 py-4 bg-white text-gray-900 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => window.open('https://ilbuco.com.ar', '_self')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">Learn more</p>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="px-10 py-4 bg-blue-600 text-white rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => router.push('/contact')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.contact}</p>
                  </button>
                  <button 
                    className="px-10 py-4 bg-white text-gray-900 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => router.push('/visit')}
                  >
                    <p className="font-medium tracking-tight leading-tight m-0">{t.visit}</p>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <a href={imageUrl || "/i/ivan-robot.png"} data-fancybox="profile">
              <Image 
                src={imageUrl || "/i/ivan-robot.png"} 
                alt={imageUrl ? "Ivan Braun's location in Cariló" : "Ivan Braun AI Avatar"}
                width={500}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full max-w-[505px] h-[400px] md:h-[400px] object-cover drop-shadow-lg transition-transform duration-300 hover:scale-105"
                priority
              />
            </a>
          </div>
        </div>
      </section>

    </>
  )
}