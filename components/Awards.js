import LargeCards from './LargeCards';

export default function Awards() {
  return (
    <section className="bg-white py-16 -mt-20 mb-5">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Awards & Recognition</h2>
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
        <div className="mt-7">
          <div className="flex flex-wrap justify-center gap-16 mt-8">
            {[
              { number: '4M+', label: 'Users Globally' },
              { number: '150+', label: 'Team Members' },
              { number: '0', label: 'Equity Sold' },
              { number: '0', label: 'Debt' }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-semibold text-primary">{metric.number}</div>
                <div className="text-sm uppercase tracking-wider text-gray-500 mt-2">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}