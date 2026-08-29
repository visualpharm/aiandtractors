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

const DISCUSS = [
  { label: 'Reddit', href: 'https://www.reddit.com/r/dataisugly/comments/1w18i27/my_120_smart_scale_reports_measured_body_fat_as/' },
];

export default function GeCs10hBodyFatFormula({ scatterSvg, timelineSvg }) {
  return (
    <Layout>
      <Head>
        <title>GE Scales Are a Scam and Math Theater | Ivan Braun</title>
        <meta
          name="description"
          content="I exported 3 months of data from a GE CS10H smart scale. Body fat % is 1.5 × BMI − 17.5, exact to 0.1 points across 37 readings. It prints the same numbers with socks on and plays a fake measuring animation."
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
            src="/scale/display-annotated.jpg"
            alt="GE CS10H handle display: weight 87.70 kg circled in green as the only measured value, body fat, muscle, water, BMI, bone and visceral fat circled in red as computed values"
            className="w-full max-w-md mx-auto rounded"
          />
          <figcaption className="text-sm text-gray-600 mt-2 text-center">
            The CS10H handle display. One load cell feeds every other number on it.
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
          case in one sentence. Not even my feet sweat enough to turn socks into copper
          electrodes. The electrodes play no part in the calculation.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">The height test</h2>
        <p className="mb-4">
          Second experiment, also 2 minutes. I changed my height in the app from
          1.86 m to 1.80 m and stepped on again. Same body, same evening. The scale
          printed <strong>87.70 kg, BMI 27.1, body fat 23.2%, water 55.4%</strong>.
        </p>
        <p className="mb-4">
          Losing 6 cm of height on paper added 2.6 points of body fat. That unlocks
          the full formula. Rewrite my weight regression in BMI terms and it predicts
          fat 23.2% and water 55.5% for exactly this weigh-in. The scale runs on:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li><strong>fat % = 1.5 × BMI − 17.5</strong></li>
          <li><strong>water % = 84 − 1.06 × BMI</strong></li>
        </ul>
        <p className="mb-4">
          A $30 pocket calculator with a BMI chart taped to it, sold as a
          6-electrode body composition analyzer.
        </p>

        <figure className="mb-10">
          <img
            src="/scale/display-zoom.jpg"
            alt="Close-up of the CS10H handle display: 87.70 kg, body fat 23.2%, muscle 73.0%, water 55.4%, BMI 27.1, bone 3.9%, visceral fat 9"
            className="w-full max-w-md mx-auto rounded"
          />
          <figcaption className="text-sm text-gray-600 mt-2">
            The height test. Profile set to 1.80 m: 87.70 kg, BMI 27.1, fat 23.2%,
            water 55.4%. The BMI formula predicted 23.2 and 55.5.
          </figcaption>
        </figure>

        <p className="mb-6">
          One more touch. The scale plays a &quot;measuring&quot; animation for
          several seconds before showing these numbers. The arithmetic takes
          microseconds. The wait sells the theater.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">The hardware could do it</h2>
        <p className="mb-4">
          The CS10H has <strong>6 electrodes, including a pull-out handle</strong>.
          The listing promises 8: an &quot;8-Electrode Body Pod Fat Monitor with
          Full Body Composition Analysis&quot;. Hand plus foot electrodes are
          exactly the hardware real segmental bioimpedance uses.
        </p>
        <p className="mb-6">
          The app duly reports per-limb muscle and fat, protein, bone mass, body water,
          visceral fat, and metabolic age. Every one of them tracks weight perfectly.
          Body water in my export is a mirror of the fat curve. The hardware ships,
          the signal is ignored, the formula prints.
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

        <h2 className="text-2xl font-bold mt-10 mb-4">The app doubles down</h2>
        <p className="mb-4">
          The Fit Profile app expands the one measured number into an
          &quot;In-depth Report&quot;. These screens correspond to my 85.65 kg
          weigh-in. Body fat 19.7%. The formula says 19.69.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li><strong>Segmental fat analysis</strong> per limb: right arm 1.08 kg of fat, left arm 1.04 kg. Fake precision down to 40 grams, from a device that ignores its own electrodes.</li>
          <li><strong>Muscle balance</strong>: left leg 103.7% of normal, right leg 104.3%.</li>
          <li><strong>Metabolic age 46, waist-to-hip ratio 0.96, protein 18.2%, BMR 1855 kcal</strong>: an entire clinical report from one load cell and a profile form.</li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <img
            src="/scale/app-composition.jpg"
            alt="Fit Profile body composition screen: weight 85.65 kg circled in green, body water, protein, fat mass and bone mass boxed in red as computed values"
            className="w-full rounded"
          />
          <img
            src="/scale/app-segmental.jpg"
            alt="Fit Profile segmental fat analysis screen with all per-limb values boxed in red: every number is computed"
            className="w-full rounded"
          />
          <img
            src="/scale/app-report.jpg"
            alt="Fit Profile other measurements screen: muscle mass, BMR, subcutaneous fat, waist-to-hip ratio, metabolic age"
            className="w-full rounded"
          />
        </div>
        <p className="text-sm text-gray-600 mb-10">
          <span className="text-green-700 font-semibold">Green</span>: measured.{' '}
          <span className="text-red-700 font-semibold">Red</span>: computed. The
          third screen has no green anywhere.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Who actually makes it</h2>
        <p className="mb-6">
          The GE brand is licensed. The Fit Profile app is published by{' '}
          <strong>Global eFit Incorporated</strong>, which sells &quot;GE branded
          scales&quot; at fit-profile.com. The GE monogram on the glass is the most
          expensive component of the product.
        </p>
        <p className="mb-6">
          There is precedent. The SEC fined GE $50 million in 2009 over its
          accounting and $200 million in 2020 over its disclosures. The licensed
          scale keeps the family tradition: confident numbers with no measurement
          behind them. The biggest cooked books GE has shipped since, and this
          time they weigh you back.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">What works</h2>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>The <strong>load cell is fine</strong>. Weight readings are consistent and tracked my real 5.8 kg loss over 5 weeks.</li>
          <li>The electrodes physically exist, and the <strong>contact detection works</strong>. Skip the handle, or hold it with 1 arm, and the scale refuses to show body composition. It enforces the ritual, then discards the signal.</li>
          <li>Bluetooth sync works.</li>
          <li>The app exports clean xlsx. That export is how it got caught.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">The joke is on me</h2>
        <p className="mb-4">
          Amazon sells $10 and $20 body composition scales by the pallet. I skipped
          them all and paid <strong>$119.99</strong> for the brand name. The brand
          name skips the measurement. Amazon also flags it <strong>FSA and HSA
          eligible</strong>, so Americans can buy this formula with pre-tax health
          money.
        </p>

        <figure className="mb-10">
          <img
            src="/scale/amazon-order.png"
            alt="Amazon order: GE Smart Scale for Body Weight, 8-Electrode Body Pod Fat Monitor with Full Body Composition Analysis, sold by GE Authorized Store, $119.99, FSA or HSA eligible"
            className="w-full rounded border border-gray-200"
          />
          <figcaption className="text-sm text-gray-600 mt-2">
            The order. 8 electrodes promised, 6 present, 0 used.
          </figcaption>
        </figure>

        <h2 className="text-2xl font-bold mt-10 mb-4">Test your own scale</h2>
        <p className="mb-4">Takes 10 minutes, no lab needed:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-1">
          <li>Export your history from the companion app. Most export csv or xlsx.</li>
          <li>Plot body fat % against weight. A straight line with no scatter is a formula.</li>
          <li>Find 2 days with the same weight, weeks apart. Identical fat % is a formula.</li>
          <li>Weigh yourself with socks on. Same fat % as barefoot means the electrodes are decoration.</li>
          <li>Change your height in the app and step on again. A different fat % on the same body means the number comes from your profile settings.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">Verdict</h2>
        <p className="mb-4">
          Buy it as a weight scale, if the price says weight scale. Ignore every other
          number on the screen. And if your smart scale never surprises you, it runs
          a spreadsheet.
        </p>
        <h2 className="text-2xl font-bold mt-10 mb-4">Data and method</h2>
        <ul className="list-disc pl-6 mb-6 space-y-1 text-gray-700">
          <li>
            <strong>Data</strong>: 40 readings exported from the Fit Profile app,
            Jun 1 to Aug 27, 2026. Download:{' '}
            <a href="/scale/cs10h-readings.csv" className="text-blue-600 hover:text-blue-500">
              all 40 readings, csv
            </a>
            , minus the device MAC.
          </li>
          <li><strong>Regression</strong>: fat % = 0.4342 × weight − 17.498. r = 0.998, residual SD 0.04 points, worst deviation 0.09.</li>
          <li><strong>Height experiment</strong>, Aug 27: profile set to 1.80 m, weight 87.70 kg. Displayed fat 23.2% and water 55.4%. BMI-formula predictions: 23.16 and 55.45.</li>
        </ul>

        <p className="mt-10 text-gray-700">
          Discuss:{' '}
          {DISCUSS.map((l, i) => (
            <span key={l.href}>
              {i > 0 && <span className="text-gray-400"> · </span>}
              <a href={l.href} className="text-blue-600 hover:text-blue-500">{l.label}</a>
            </span>
          ))}
        </p>
      </article>
    </Layout>
  );
}
