import LargeCards from './LargeCards'

export default function Awards() {
  return (
    <section className="awards-section">
      <div className="main-grid">
        <div className="full-width">
          <h2 className="fun-title"><span className="fun-title-fill">Awards & Recognition</span></h2>
        </div>
        
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
        
        <div className="full-width" style={{ marginTop: '28px' }}>
          <div className="metrics-row">
            <div className="metric">
              <div className="metric-number">4M+</div>
              <div className="metric-label">Users Globally</div>
            </div>
            <div className="metric">
              <div className="metric-number">150+</div>
              <div className="metric-label">Team Members</div>
            </div>
            <div className="metric">
              <div className="metric-number">0</div>
              <div className="metric-label">Equity Sold</div>
            </div>
            <div className="metric">
              <div className="metric-number">0</div>
              <div className="metric-label">Debt</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .awards-section {
          background: #fff;
          padding: 4rem 0 0.375rem 0;
          margin: 3rem 0;
        }

        .main-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
          padding: 0 2rem;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        
        .full-width {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        
        .full-width h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .fun-title {
          margin-top: 28px !important;
          margin-bottom: 0 !important;
          position: relative;
          display: inline-block;
          font-size: 3rem;
          font-weight: 400 !important;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          line-height: 1.1;
        }
        
        .fun-title-fill {
          position: relative;
          color: #222;
          font-size: 2.5rem !important;
          font-weight: 400 !important;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          z-index: 2;
          text-shadow:
            -1px 0 0 #dd9e8e,
            1px 0 0 #53cb82;
        }

        .metrics-row {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .metric {
          text-align: center;
        }

        .metric-number {
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--primary-color);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .metric-label {
          font-size: 0.9rem;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .metrics-row {
            gap: 2rem;
          }
          
          .metric-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}