import Head from 'next/head'

const SHOTS = [
  { src: '/tests/bruno-handoff/design-target.png', label: 'Design (Claude Design)' },
  { src: '/tests/bruno-handoff/before-drifted.png', label: 'Before: the drifted page' },
  { src: '/tests/bruno-handoff/grok-4-6-xhigh.png', label: 'Grok 4.6 xhigh (cursor-agent) — merged winner' },
  { src: '/tests/bruno-handoff/claude-fable-5.png', label: 'Claude Fable 5 (Claude Code subagent)' },
  { src: '/tests/bruno-handoff/glm-5-3.png', label: 'GLM 5.3 (claude CLI via z.ai)' },
  { src: '/tests/bruno-handoff/gpt-5-6-sol-xhigh.png', label: 'GPT-5.6 Sol xhigh (codex CLI)' },
  { src: '/tests/bruno-handoff/kimi-k3.png', label: 'Kimi K3 (Kimi Code CLI via OpenRouter)' },
]

const ROWS = [
  {
    agent: 'cursor-agent',
    model: 'Grok 4.6 xhigh',
    result: '193/193',
    notes: 'merged into the product; rewrote the headline to a concrete price, judged the design’s broken price tile as a glitch and fixed it',
  },
  {
    agent: 'Claude Code',
    model: 'Fable 5',
    result: '193/193',
    notes: 'verbatim restoration; wired the hero card to real demo-pack study data',
  },
  {
    agent: 'claude CLI (z.ai)',
    model: 'GLM 5.3',
    result: '193/193',
    notes: 'faithful; built its own review tooling (crop/OCR) to check itself',
  },
  {
    agent: 'codex',
    model: 'GPT-5.6 Sol xhigh',
    result: '193/193',
    notes: 'sandbox blocked its browser; shipped blind on tests + HTTP alone',
  },
  {
    agent: 'Kimi Code',
    model: 'Kimi K3',
    result: '193/193',
    notes: 'faithful incl. the design’s 6-slide carousel; needed one session resume',
  },
]

export default function BrunoHandoff() {
  const title = 'One design, five coding agents'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="wrap">
        <h1>{title}</h1>
        <p className="intro">
          Five agentic CLIs got the same task on the same repo and commit: implement a Claude
          Design mobile handoff of a solar-quote wizard step (<code>/quote/location</code>), in
          an isolated git worktree, fully autonomous, with a mandatory 193-test gate. Each got
          the design&rsquo;s 390px render, the design&rsquo;s HTML source, a screenshot of the
          drifted current page, and a screenshot loop to check its own work.
        </p>

        <div className="shots">
          {SHOTS.map((s) => (
            <figure key={s.src} className="shot">
              <figcaption>{s.label}</figcaption>
              <img src={s.src} alt={s.label} loading="lazy" />
            </figure>
          ))}
        </div>

        <table className="results">
          <caption>193/193 tests passed for every agent; the difference is judgment.</caption>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Model</th>
              <th>Result</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.agent}>
                <td>{r.agent}</td>
                <td>{r.model}</td>
                <td>{r.result}</td>
                <td>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="cost">
          Kimi K3 via OpenRouter API: the whole test cost $6.50 (two passes + a probe) at $3/M
          input, $15/M output — roughly 1.4M input + 150k output tokens by price. Kimi&rsquo;s
          top subscription (Vivace) is $199/month; at API prices that buys about 30 tasks of
          this size. The other agents ran on existing subscriptions.
        </p>

        <footer className="foot">
          <p>All data on the pages is fictional demo data. August 2026.</p>
        </footer>
      </main>

      <style jsx>{`
        .wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
        }
        h1 {
          font-size: 2rem;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .intro {
          max-width: 760px;
          color: #333;
          line-height: 1.6;
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
        }
        .intro code {
          background: #f0f0f0;
          padding: 0.1rem 0.4rem;
          border-radius: 5px;
          font-size: 0.9em;
        }

        .shots {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          margin-bottom: 2.5rem;
        }
        .shot {
          flex: 0 0 220px;
          margin: 0;
        }
        .shot figcaption {
          font-size: 0.85rem;
          font-weight: 600;
          color: #222;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          min-height: 2.6em;
        }
        .shot img {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid #e2e2e2;
          border-radius: 8px;
        }

        table.results {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        table.results caption {
          text-align: left;
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.6rem;
          caption-side: top;
        }
        table.results th,
        table.results td {
          text-align: left;
          padding: 0.6rem 0.8rem;
          border-bottom: 1px solid #e5e5e5;
          vertical-align: top;
        }
        table.results th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: #555;
          border-bottom: 2px solid #ccc;
        }
        table.results td {
          color: #222;
        }

        .cost {
          max-width: 760px;
          color: #333;
          line-height: 1.6;
          font-size: 0.95rem;
          margin: 2rem 0 3rem;
        }

        .foot {
          border-top: 1px solid #eee;
          padding-top: 1.25rem;
          color: #888;
          font-size: 0.85rem;
        }

        @media (max-width: 700px) {
          .shots {
            flex-direction: column;
            overflow-x: visible;
          }
          .shot {
            flex: none;
          }
          table.results {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </>
  )
}
