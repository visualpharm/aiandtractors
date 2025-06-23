export default function SmallCards({ title, items }) {
  return (
    <>
      <div className="small-cards-section">
        <div style={{maxWidth: '1200px', margin: 0, padding: '0 2rem'}}>
          <h3 className="section-heading">{title}</h3>
        </div>
        
        <div className="small-cards-grid">
          {items.map((item, index) => (
            <div key={index} className="small-card">
              {item.logo && (
                <img src={item.logo} alt={item.title} className="small-card-logo" />
              )}
              <h4>{item.title}</h4>
              <p>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener">{item.description}</a>
                ) : (
                  item.description
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .small-cards-section {
          margin: 2rem 0;
        }

        .section-heading {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 6px 0 6px 0;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .small-cards-grid {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.8rem;
          margin: 0;
          padding: 0;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding-left: 0;
          padding-right: 0;
          overflow-x: auto;
        }

        .small-card {
          flex: 1;
          min-width: 160px;
          background: var(--card-bg);
          padding: 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
        }

        .small-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .small-card-logo {
          width: 70px;
          height: 35px;
          object-fit: contain;
          margin-bottom: 0.4rem;
        }

        .small-card h4 {
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0 0 0.3rem 0;
          color: var(--primary-color);
        }

        .small-card p {
          font-size: 0.7rem;
          color: var(--secondary-color);
          margin: 0;
          line-height: 1.3;
        }

        .small-card a {
          color: var(--accent-color);
          text-decoration: none;
        }

        .small-card a:hover {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .small-card {
            min-width: 120px;
          }
        }

        @media (max-width: 480px) {
          .small-cards-grid {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  )
}