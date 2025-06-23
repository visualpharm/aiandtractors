import LargeCards from './LargeCards';

export default function Awards() {
  return (
    <section className="bg-gray-50 pt-16 pb-0 -mt-20 mb-5">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8">
        <h2 className="text-sm font-medium mb-3 text-gray-600 uppercase tracking-wider">Awards & Recognition</h2>
      </div>

      {/* Awards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LargeCards 
          title=""
          items={[
            {
              title: "44 awards",
              description: "ProductHunt",
              logo: "/i/awards/product-hunt.webp"
            },
            {
              title: "Top 101 Founders in Web Design",
              description: "American Startup Magazine",
              logo: "/i/awards/BEST-STARTUP.US-LOGO.webp"
            },
            {
              title: "America's Best Startup Employers",
              description: "Forbes",
              logo: "/i/awards/forbes.jpg"
            },
            {
              title: "Visitor's Choice Award",
              description: "Visual 1st",
              logo: "/i/awards/Visual-1st.png"
            }
          ]}
        />
        
        {/* Metrics */}
        <div className="mt-7" style={{ paddingTop: '32px', paddingBottom: '60px' }}>
          <div className="flex flex-nowrap justify-center gap-4 md:gap-8 lg:gap-16 mt-8 overflow-x-auto">
            {[
              { number: '4M', icon: '👥', label: 'users', sublabel: 'Globally' },
              { number: '150', icon: '👥', label: 'team', sublabel: '' },
              { number: '$0', icon: '', label: 'equity sold', sublabel: '' },
              { number: '$0', icon: '', label: 'debt', sublabel: '' },
              { number: `${new Date().getFullYear() - 2002}`, icon: '', label: 'years', sublabel: 'creative tech' },
              { number: '$54.6K', icon: '', label: 'avg server', sublabel: 'price' },
              { number: '1st', icon: '', label: 'vendor of', sublabel: 'Canva' }
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