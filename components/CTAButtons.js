import { useRouter } from 'next/router'

export default function CTAButtons({
  primaryText = 'More about Ivan',
  primaryHref = '/',
  secondaryText = 'Contact',
  secondaryHref = '/contact'
}) {
  const router = useRouter()

  return (
    <>
      <div className="cta-buttons">
        <button
          className="cta-button cta-primary"
          onClick={() => router.push(primaryHref)}
        >
          <p className="framer-text">{primaryText}</p>
        </button>
        <button
          className="cta-button cta-secondary"
          onClick={() => router.push(secondaryHref)}
        >
          <p className="framer-text">{secondaryText}</p>
        </button>
      </div>

      <style jsx>{`
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cta-button {
          padding: 1rem 2.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .framer-text {
          font-family: "Inter", "Inter Placeholder", sans-serif;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0;
          white-space: nowrap;
        }
        .cta-primary {
          background: var(--accent-color);
        }
        .cta-primary .framer-text {
          color: #fff;
        }
        .cta-primary:hover {
          background: #3a4db8;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(69, 93, 204, 0.3);
        }
        .cta-secondary {
          background: #fff;
          border: 2px solid var(--border-color);
        }
        .cta-secondary .framer-text {
          color: var(--primary-color);
        }
        .cta-secondary:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(69, 93, 204, 0.2);
        }
        .cta-secondary:hover .framer-text {
          color: #fff;
        }
      `}</style>
    </>
  )
}
