import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const research = [
  {
    href: '/ge-cs10h-body-fat-formula',
    title: 'GE scales are a scam and math theater',
    blurb:
      'My GE smart scale prints body fat straight from a weight formula. 3 months of exported data, 1 regression, r = 0.998.',
  },
  {
    href: '/passport-ranking',
    title: 'The Open Door Index',
    blurb:
      'A passport ranking that measures where you actually want to go: every destination weighted by tourist arrivals, not counted as one more country.',
  },
  {
    href: '/ai-replaced-people',
    title: 'The Great Vanishing',
    blurb:
      'How businesses erased humans from their visual identity. People disappeared from corporate imagery in 6 months, replaced by AI and robots.',
  },
];

const products = [
  {
    href: 'https://lira-voice.app',
    title: 'Lira',
    blurb:
      'Self-hosted voice recorder. Records in the browser, strips silence, transcribes, writes a summary. Runs in a hospital today.',
  },
  {
    href: 'https://humanrounds.org',
    title: 'Human Rounds',
    blurb:
      'Open-source AI layer for the work around care: interviews patients before the visit, reads handwritten referrals, judges urgency. Reference install: the Pinamar municipal hospital network.',
  },
  {
    href: 'https://usabruno.com',
    title: 'Bruno',
    blurb:
      'Solar quotes house by house, plus white-label sites for each installer. Prints A4 booklets the crew leaves at the door.',
  },
  {
    href: '/meli',
    title: 'MeLi Local Delivery',
    blurb:
      'Chrome extension that shows real delivery estimates for your town on MercadoLibre listings.',
  },
];

function ProjectList({ items }) {
  return (
    <ul className="space-y-8 mb-12">
      {items.map((p) => (
        <li key={p.href}>
          <Link
            href={p.href}
            className="text-xl font-semibold text-blue-600 hover:text-blue-500"
          >
            {p.title}
          </Link>
          <p className="text-gray-700 mt-1">{p.blurb}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Projects | Ivan Braun</title>
        <meta
          name="description"
          content="Ivan Braun's released projects and research: Lira, Human Rounds, Bruno, the Open Door Index passport ranking, and data investigations."
        />
        <link rel="canonical" href="https://aiandtractors.com/projects/" />
      </Head>

      <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed text-gray-900">
        <h1 className="text-4xl font-bold mb-10">Projects</h1>

        <h2 className="text-2xl font-bold mb-6">Research</h2>
        <ProjectList items={research} />

        <h2 className="text-2xl font-bold mb-6">Released products</h2>
        <ProjectList items={products} />
      </div>
    </Layout>
  );
}
