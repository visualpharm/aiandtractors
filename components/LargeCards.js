export default function LargeCards({ title, items }) {
  return (
    <>
      <div className="large-cards-section">
        <h3 className="section-heading" style={{ paddingLeft: '0' }}>{title}</h3>
        <div className="card-grid fullwidth-cards">
          {items.map((item, index) => (
            <div key={index} className="card">
              {item.logo && <img src={item.logo} alt={item.title} className="card-logo" />}
              <div className="card-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .large-cards-section {
          margin: 2rem 0;
        }

        .section-heading {
          padding: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.8rem;
          color: var(--secondary-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 0;
          margin-left: 0;
          text-align: left;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          width: 100%;
        }

        .card-grid.fullwidth-cards {
          padding-left: 8px;
          padding-right: 8px;
        }

        .fullwidth-cards {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
          padding: 0;
          gap: 0.7rem;
        }

        .fullwidth-cards .card {
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          padding: 1rem 1.2rem 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          transition: all 0.3s ease;
          justify-content: space-between;
          min-height: 180px;
        }

        .fullwidth-cards .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .fullwidth-cards .card h4 {
          font-size: 1.2rem;
          margin: 0;
          padding: 0;
          color: var(--primary-color);
          font-weight: 600;
          line-height: 1.2;
        }

        .fullwidth-cards .card p {
          font-size: 1rem;
          color: var(--secondary-color);
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }

        .card-logo {
          height: 70px;
          object-fit: contain;
          margin-bottom: auto;
          align-self: flex-start;
        }

        .card-logo[src*="BEST-STARTUP"] {
          width: 180px;
          height: auto;
          margin-top: 1rem;
        }

        .card-logo[src*="forbes"] {
          height: 91px;
        }

        .card-logo[src*="product-hunt"] {
          height: 80.5px;
        }

        .card-logo[src*="Visual-1st"] {
          height: 80px;
        }

        .card-text {
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .card-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
        }

        @media (max-width: 600px) {
          .card {
            padding: 1.2rem 0.7rem 1rem 0.7rem;
          }
        }
      `}</style>
    </>
  )
}