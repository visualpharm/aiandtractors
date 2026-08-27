import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'public', 'scale');
  return {
    props: {
      scatterSvg: fs.readFileSync(path.join(dir, 'scatter.svg'), 'utf8'),
      timelineSvg: fs.readFileSync(path.join(dir, 'timeline.svg'), 'utf8'),
    },
  };
}

export default function GeCs10hBodyFatFormula({ scatterSvg, timelineSvg }) {
  return (
    <Layout>
      <Head>
        <title>GE Scales Are a Scam and Math Theater | Ivan Braun</title>
        <meta
          name="description"
          content="I exported 3 months of data from a GE CS10H smart scale. Body fat % is 0.434 × weight − 17.5, exact to 0.1 points across 37 readings. It even prints the same numbers with socks on."
        />
        <link rel="canonical" href="https://aiandtractors.com/ge-cs10h-body-fat-formula/" />
      </Head>

      <article className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed text-gray-900">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          GE scales are a scam and math theater
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          I exported 3 months of readings from my GE CS10H smart scale.
          The body fat percentage comes from a formula:{' '}
          <strong>fat % = 0.434 × weight − 17.5</strong>. Every one of 37 readings
          fits within 0.1 points.
        </p>

        <figure className="mb-10">
          <img
            src="/scale/ge-cs10h.jpg"
            alt="GE CS10H smart scale with handlebar electrodes"
            className="w-full max-w-md mx-auto rounded"
          />
          <figcaption className="text-sm text-gray-600 mt-2 text-center">
            The GE CS10H. 6 electrodes, including a handle. Sold for segmental body
            composition analysis.
          </figcaption>
        </figure>

        <h2 className="text-2xl font-bold mt-10 mb-4">How I caught it</h2>
        <p className="mb-4">
          The scale syncs to an app called Fit Profile. The app exports to xlsx.
          I exported <strong>40 weigh-ins</strong> from June to August 2026 and ran a
          linear regression of body fat % against weight.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>37 readings with a body fat number, 3 with none</li>
          <li>Correlation between weight and fat %: <strong>0.998</strong></li>
          <li>Residual standard deviation: <strong>0.04 points</strong></li>
          <li>Worst deviation from the formula: 0.09 points, within display rounding</li>
        </ul>
        <p className="mb-6">
          Real bioimpedance jitters. Hydration, meals, time of day, and wet feet move
          the reading 0.5 to 1.5 points at the same weight. Zero jitter means zero
          measurement.
        </p>

        <figure className="mb-10">
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: scatterSvg }} />
          <figcaption className="text-sm text-gray-600 mt-2">
            37 readings, June to August 2026. Hover a point for the date. Every
            reading sits on the line.
          </figcaption>
        </figure>

        <h2 className="text-2xl font-bold mt-10 mb-4">Same weight, same fat, months apart</h2>
        <p className="mb-4">
          The clearest tell needs no statistics. Repeat a weight, and the fat %
          repeats <strong>exactly</strong>:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li><strong>89.05 kg</strong> on Jun 16, Aug 5, and Aug 8: <strong>21.2%</strong> all 3 times</li>
          <li><strong>88.55 kg</strong> on Jun 12 and twice on Jun 22: <strong>21.0%</strong> all 3 times</li>
        </ul>
        <p className="mb-6">
          Between those dates I lost and regained real weight. My body in mid June and
          my body in early August produced the identical number, because the only input
          is the weight.
        </p>

        <figure className="mb-10">
          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: timelineSvg }} />
          <figcaption className="text-sm text-gray-600 mt-2">
            Weight and body fat over 3 months. The fat curve is the weight curve,
            rescaled. So are body water, muscle mass, and visceral fat.
          </figcaption>
        </figure>

        <h2 className="text-2xl font-bold mt-10 mb-4">The socks test</h2>
        <p className="mb-4">
          Bioimpedance needs skin contact. Electrodes push a small current through your
          body and measure resistance. Socks are an insulator: a real device errors out
          or returns garbage.
        </p>
        <p className="mb-6">
          This scale prints <strong>the same numbers with socks on</strong>. The whole
          case in one sentence. The electrodes play no part in the calculation.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">The hardware could do it</h2>
        <p className="mb-4">
          The CS10H has <strong>6 electrodes, including a pull-out handle</strong>,
          and resellers advertise it for 8-electrode segmental analysis. Hand plus
          foot electrodes are exactly the hardware real segmental bioimpedance uses.
        </p>
        <p className="mb-6">
          The app duly reports per-limb muscle and fat, protein, bone mass, body water,
          visceral fat, and metabolic age. Every one of them tracks weight perfectly.
          Body water in my export is a mirror of the fat curve. The hardware ships,
          the signal is ignored, the formula prints.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Who actually makes it</h2>
        <p className="mb-6">
          The GE brand is licensed. The Fit Profile app is published by{' '}
          <strong>Global eFit Incorporated</strong>, which sells &quot;GE branded
          scales&quot; at fit-profile.com. The GE monogram on the glass is the most
          expensive component of the product.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">What works</h2>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>The <strong>load cell is fine</strong>. Weight readings are consistent and tracked my real 5.8 kg loss over 5 weeks.</li>
          <li>Bluetooth sync works.</li>
          <li>The app exports clean xlsx. That export is how it got caught.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Test your own scale</h2>
        <p className="mb-4">Takes 10 minutes, no lab needed:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-1">
          <li>Export your history from the companion app. Most export csv or xlsx.</li>
          <li>Plot body fat % against weight. A straight line with no scatter is a formula.</li>
          <li>Find 2 days with the same weight, weeks apart. Identical fat % is a formula.</li>
          <li>Weigh yourself with socks on. Same fat % as barefoot means the electrodes are decoration.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">Verdict</h2>
        <p className="mb-4">
          Buy it as a weight scale, if the price says weight scale. Ignore every other
          number on the screen. And if your smart scale never surprises you, it runs
          a spreadsheet.
        </p>
        <p className="text-gray-700">
          Data and method: 40 readings exported from the Fit Profile app,
          Jun 1 to Aug 27, 2026. Regression: fat % = 0.4342 × weight − 17.498,
          r = 0.998, residual SD 0.04 points. Raw export available on request.
        </p>
      </article>
    </Layout>
  );
}
