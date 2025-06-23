import { useRouter } from 'next/router'
import Link from 'next/link'

const translations = {
  en: {
    title: "Experience",
    description: "Serial entrepreneur building bootstrapped AI and design products.",
    readMore: "Read more about my experience →",
    founderCEO: "Founder and CEO",
    icons8Desc: "Graphics for AI age",
    genPhotosDesc: "Face AI and synthetic data",
    bullet1: "Supply large-scale resources and custom datasets to enterprise clients",
    bullet2: "Leading team of 150+ professionals serving 4M+ users globally"
  },
  es: {
    title: "Experiencia", 
    description: "Emprendedor en serie construyendo productos de IA y diseño sin capital de riesgo.",
    readMore: "Leer más sobre mi experiencia →",
    founderCEO: "Fundador y CEO",
    icons8Desc: "Gráficos para la era de la IA",
    genPhotosDesc: "IA facial y datos sintéticos",
    bullet1: "Suministro de recursos a gran escala y conjuntos de datos personalizados a clientes empresariales",
    bullet2: "Liderazgo de un equipo de más de 150 profesionales que sirven a más de 4M usuarios globalmente"
  },
  pt: {
    title: "Experiência",
    description: "Empreendedor serial construindo produtos de IA e design sem capital de risco.",
    readMore: "Leia mais sobre minha experiência →",
    founderCEO: "Fundador e CEO",
    icons8Desc: "Gráficos para a era da IA", 
    genPhotosDesc: "IA facial e dados sintéticos",
    bullet1: "Fornecimento de recursos em larga escala e conjuntos de dados personalizados para clientes empresariais",
    bullet2: "Liderando equipe de mais de 150 profissionais servindo mais de 4M usuários globalmente"
  }
}

export default function Experience() {
  const router = useRouter()
  const { locale } = router
  const t = translations[locale] || translations.en

  return (
    <>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: '100px 0.5fr 200px 180px', gap: '2rem', alignItems: 'start'}}>
          <div style={{textAlign: 'left'}}>
            <h2 style={{fontSize: '0.9rem', fontWeight: '500', margin: '0', color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{t.title}</h2>
          </div>
          <div>
            <p style={{margin: '0', fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--secondary-color)'}}>
              I'm a tech founder leading a team of 150 and serving 4M users. <Link href="/experience" style={{color: 'var(--accent-color)', textDecoration: 'none'}}>{t.readMore}</Link>
            </p>
          </div>
          <div style={{textAlign: 'left'}}>
            <div style={{marginBottom: '1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <img src="/i/logos/icons8-icons8.svg" alt="Icons8" style={{width: '24px', height: '24px', marginRight: '0.5rem'}} />
                <strong style={{color: 'var(--primary-color)'}}>
                  <a href="https://icons8.com" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>Icons8</a>
                </strong>
              </div>
              <p style={{margin: '0', fontSize: '0.85rem', color: 'var(--secondary-color)', fontStyle: 'italic'}}>{t.founderCEO}</p>
              <p style={{margin: '0', fontSize: '0.85rem', color: 'var(--secondary-color)'}}>{t.icons8Desc}</p>
            </div>
          </div>
          <div style={{textAlign: 'left'}}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <img src="/i/logos/icons8-generated-photos.svg" alt="Generated Photos" style={{width: '24px', height: '24px', marginRight: '0.5rem'}} />
                <strong style={{color: 'var(--primary-color)'}}>
                  <a href="https://generated.photos" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>Generated Photos</a>
                </strong>
              </div>
              <p style={{margin: '0', fontSize: '0.85rem', color: 'var(--secondary-color)'}}>{t.genPhotosDesc}</p>
              <p style={{margin: '0', fontSize: '0.85rem', color: 'var(--secondary-color)', fontStyle: 'italic'}}>{t.founderCEO}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            display: block !important;
          }
          
          div[style*="grid-template-columns"] > div {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  )
}