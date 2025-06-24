import LargeCards from './LargeCards';

const translations = {
  en: {
    title: "Awards & Recognition",
    awards44: "44 awards",
    productHunt: "ProductHunt",
    top101Founders: "Top 101 Founders in Web Design",
    americanStartup: "American Startup Magazine",
    bestEmployers: "America's Best Startup Employers",
    forbes: "Forbes",
    visitorsChoice: "Visitor's Choice Award",
    visual1st: "Visual 1st",
    users: "users",
    globally: "Globally",
    team: "team",
    equitySold: "equity sold",
    debt: "debt",
    years: "years",
    creativeTech: "creative tech",
    avgServer: "avg server",
    price: "price",
    vendor: "vendor of",
    canva: "Canva"
  },
  es: {
    title: "Premios y Reconocimientos",
    awards44: "44 premios",
    productHunt: "ProductHunt",
    top101Founders: "Top 101 Fundadores en Diseño Web",
    americanStartup: "American Startup Magazine",
    bestEmployers: "Mejores Empleadores Startup de América",
    forbes: "Forbes",
    visitorsChoice: "Premio Elección de Visitantes",
    visual1st: "Visual 1st",
    users: "usuarios",
    globally: "Globalmente",
    team: "equipo",
    equitySold: "capital vendido",
    debt: "deuda",
    years: "años",
    creativeTech: "tech creativa",
    avgServer: "servidor prom",
    price: "precio",
    vendor: "proveedor de",
    canva: "Canva"
  },
  pt: {
    title: "Prêmios e Reconhecimentos",
    awards44: "44 prêmios",
    productHunt: "ProductHunt",
    top101Founders: "Top 101 Fundadores em Web Design",
    americanStartup: "American Startup Magazine",
    bestEmployers: "Melhores Empregadores Startup da América",
    forbes: "Forbes",
    visitorsChoice: "Prêmio Escolha dos Visitantes",
    visual1st: "Visual 1st",
    users: "usuários",
    globally: "Globalmente",
    team: "equipe",
    equitySold: "capital vendido",
    debt: "dívida",
    years: "anos",
    creativeTech: "tech criativa",
    avgServer: "servidor méd",
    price: "preço",
    vendor: "fornecedor de",
    canva: "Canva"
  }
}

export default function Awards({ language = 'en' }) {
  const t = translations[language] || translations.en

  return (
    <section className="bg-gray-50 pt-16 pb-0 -mt-20 mb-5">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-8 mb-8 mt-8">
        <h2 className="text-sm font-medium mb-3 text-gray-600 uppercase tracking-wider">{t.title}</h2>
      </div>

      {/* Awards Grid */}
      <div className="max-w-6xl mx-auto px-8" style={{ paddingTop: '28px' }}>
        <LargeCards 
          title=""
          items={[
            {
              title: t.awards44,
              description: t.productHunt,
              logo: "/i/awards/product-hunt.webp"
            },
            {
              title: t.top101Founders,
              description: t.americanStartup,
              logo: "/i/awards/BEST-STARTUP.US-LOGO.webp"
            },
            {
              title: t.bestEmployers,
              description: t.forbes,
              logo: "/i/awards/forbes.jpg"
            },
            {
              title: t.visitorsChoice,
              description: t.visual1st,
              logo: "/i/awards/Visual-1st.png"
            }
          ]}
        />
        
        {/* Metrics */}
        <div className="mt-7" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
          <div className="flex flex-nowrap justify-center gap-4 md:gap-8 lg:gap-16 mt-8 overflow-x-auto">
            {[
              { number: '4M', icon: '👥', label: t.users, sublabel: t.globally },
              { number: '150', icon: '👥', label: t.team, sublabel: '' },
              { number: '$0', icon: '', label: t.equitySold, sublabel: '' },
              { number: '$0', icon: '', label: t.debt, sublabel: '' },
              { number: `${new Date().getFullYear() - 2002}`, icon: '', label: t.years, sublabel: t.creativeTech },
              { number: '$54.6K', icon: '', label: t.avgServer, sublabel: t.price },
              { number: '1st', icon: '', label: t.vendor, sublabel: t.canva }
            ].map((metric, index) => (
              <div key={index} className="text-center flex-shrink-0 min-w-[80px] max-w-[120px]">
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary">
                  {metric.number} {metric.icon}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mt-1 md:mt-2 leading-tight break-words">
                  {metric.label}
                  {metric.sublabel && <><br/>{metric.sublabel}</>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}