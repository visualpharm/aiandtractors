import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function AIReplacedPeople() {
  return (
    <Layout>
      <Head>
        <title>The Great Vanishing: How Businesses Erased Humans from Their Visual Identity</title>
        <meta name="description" content="Icons8's research shows that in the last six months, people have disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as people companies." />
        <link rel="canonical" href="https://ivanbraun.com/ai-replaced-people" />
      </Head>

      <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed">
        <div className="text-center mb-12">
          <div className="mb-4">
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium mb-2">
              The Great Vanishing
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-8" style={{ fontFamily: 'DotGothic16, monospace' }}>
              How Businesses Erased Humans from Their Visual Identity
            </h1>
          </div>
        </div>
      </div>
      
      {/* Hero illustration */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-20 h-[100vh] overflow-visible">
        <div className="relative w-full h-full">
          <div className="relative h-[80vh]">
            {/* First image - 60% width overlapping from left */}
            <div className="absolute left-[10%] top-[10%] w-[60%] h-[70%] rounded-xl overflow-hidden shadow-2xl transform rotate-2 z-10 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                  alt="Corporate imagery showing people in professional settings"
                  fill
                  className="object-contain"
                  sizes="60vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
            
            {/* Second image - 60% width overlapping from right */}
            <div className="absolute right-[10%] bottom-[10%] w-[60%] h-[70%] rounded-xl overflow-hidden shadow-2xl transform -rotate-2 z-20 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                  alt="Corporate imagery showing technology without people"
                  fill
                  className="object-contain"
                  sizes="60vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="font-medium text-gray-600 mb-8" style={{ fontSize: '17px', lineHeight: '1.55' }}>
            <strong>TL;DR:</strong> Icons8's research shows that in the last six months, people have disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as "people companies"—being an AI company is everything now.
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ fontSize: '28px', lineHeight: '1.3' }}>Our business: visualizing corporate identity</h2>
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>For over 20 years, Icons8 has served businesses by creating graphics that visualize how they want to be seen. Our clients are businesses, and they buy pictures of how they want to be portrayed. One thing remained constant throughout these years: businesses valued teamwork and wanted to appear as cohesive teams of professionals with great culture and shared success.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ fontSize: '28px', lineHeight: '1.3' }}>Our analytics: tracking business tastes at scale</h2>
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>As a company with dozens of in-house artists, we dedicate vast resources to analyze business tastes. We use comprehensive analytics for that—download counts, search patterns, and usage metrics. We track the leaders of downloads and understand how business preferences evolve. For years, the leaders were human-centered: teams collaborating, diverse groups working together, professionals engaging face-to-face. The world we visualized was alive, bustling with human activity.</p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ fontSize: '28px', lineHeight: '1.3' }}>The great vanishing</h2>
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>But our constant research reveals something apocalyptic has happened in the last six months. The numbers are stark: people imagery in our 3D illustration pack dropped 87.5%—from 8 human-centered illustrations to just 1. The most striking example are our <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">3D modeled illustrations</a>.</p>
        </div>
      </div>
        
      <div className="w-full my-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people."
               className="block bg-white rounded-lg shadow-lg p-3 cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                alt="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2359/1617' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              6 months ago: creating illustrations was creating people. Businesses liked buying the images of people.
            </p>
          </div>
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own."
               className="block bg-white rounded-lg shadow-lg p-3 cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                alt="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2408/1568' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}><strong>People disappeared.</strong> But it's worse than disappearing—they became fragments. Human representation is often reduced to floating hands holding objects—a phone, a cup, making an OK sign. Humans became disembodied appendages to their devices. It's like a post-apocalypse where humanity was reduced to body parts interfacing with technology operating on its own.</p>
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>Our other illustration pack confirms the trend. In our people vs robots comparison, people decreased from 28+ to 17, while robots increased from 3 to 12—a 4x jump. While human activities became more diverse, the overall shift moved toward technology-centric rather than human-centric representations.</p>
        </div>
      </div>
      
      {/* Second image pair - people vs robots */}
      <div className="w-full my-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: people interact with people"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-3"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/people.png" 
                alt="6 months ago: people interact with people" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2204/1907' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              6 months ago: people interact with people
            </p>
          </div>
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/robots.png" 
               data-fancybox="gallery" 
               data-caption="After: people decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-3"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/robots.png" 
                alt="After: people decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2126/1810' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              After: people decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>Our overall leaders, heavily dominated by icons, show the same trend. People almost completely disappeared. Teamwork disappeared. We have more robots than people. We have multiple representations of AI instead: spheres, robots, sparkles.</p>
        </div>
      </div>
      
      {/* Third image pair - overall comparison */}
      <div className="w-full my-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/overall-people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: 10 images of people, including teamwork"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-3"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/overall-people.png" 
                alt="6 months ago: 10 images of people, including teamwork" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1844/1719' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              6 months ago: 10 images of people, including teamwork
            </p>
          </div>
          <div className="text-center md:w-1/2">
            <a href="/ai-replaced-people/overall-no-people.png" 
               data-fancybox="gallery" 
               data-caption="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-3"
               style={{ width: '100%', maxWidth: '600px' }}>
              <img 
                src="/ai-replaced-people/overall-no-people.png" 
                alt="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1964/1926' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-sm mx-auto" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ fontSize: '28px', lineHeight: '1.3' }}>The new reality</h2>
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>What we see now is a dramatic shift where agentic AI takes the place of people. But there's a fascinating inversion: as robots gained expressive blue eyes and emotional design language, humans lost their faces entirely. AI evolved from abstract geometric shapes to beings with distinct personalities, while humans devolved from collaborative teams to faceless fragments.</p>
          
          <table className="w-full my-6">
            <thead>
              <tr>
                <th className="text-left p-2">Before</th>
                <th className="text-left p-2">After</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Professionals with multiple monitors and gizmos like Apple Vision doing the job efficiently</td>
                <td className="p-2">AI agents operating autonomously</td>
              </tr>
              <tr>
                <td className="p-2">Human expertise driving technology</td>
                <td className="p-2">The technology functioning independently</td>
              </tr>
              <tr>
                <td className="p-2">Human-centric scenes with people as primary focus and decision-makers</td>
                <td className="p-2">Technology-centric approaches where humans have supportive or peripheral roles</td>
              </tr>
            </tbody>
          </table>
          
          <p className="mt-10 mb-8" style={{ fontSize: '17px', lineHeight: '1.55' }}>Being a people company is not cool anymore. Being an AI company is everything. Agentic AI takes the place of people. The shareholder value lies in this transformation.</p>
          
          <p className="mb-8" style={{ fontSize: '17px', lineHeight: '1.55' }}>Perhaps we're witnessing the most honest corporate communication in decades. This shift doesn't just correspond to Robotaxi, future Robotaxi farms, and drone delivery startups, but the broadest range of businesses. For the first time, companies are showing us exactly how they see the future of work: a world where humans are optional.</p>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '28px', lineHeight: '1.3' }}>Why do we still bother creating human graphics?</h2>
          
          <p className="mb-6" style={{ fontSize: '17px', lineHeight: '1.55' }}>Generated images were once not only novel but priced. Our own dataset <a href="https://generated.photos" className="text-blue-600 hover:underline">Generated Photos</a> made the headlines of The Verge and Washington Post — but mass adoption has made them ubiquitous and cheap. They're now perceived as a sign of underinvestment. By contrast, human-drawn images remain expensive, so they still make a company look well-off.</p>

          <table className="w-full my-6">
            <thead>
              <tr>
                <th className="text-left p-2">Cheap / Ubiquitous</th>
                <th className="text-left p-2">Costly / Projects Deep Pockets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Generated images (today)</td>
                <td className="p-2">Human-drawn images</td>
              </tr>
              <tr>
                <td className="p-2">Aluminum cutlery (today)</td>
                <td className="p-2">Aluminum cutlery when first introduced</td>
              </tr>
              <tr>
                <td className="p-2">Mass-market plastics</td>
                <td className="p-2">Early plastics (Bakelite, celluloid)</td>
              </tr>
              <tr>
                <td className="p-2">Basic stainless-steel utensils</td>
                <td className="p-2">Stainless-steel appliance bodies</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 mb-8" style={{ fontSize: '17px', lineHeight: '1.55' }}>We not only have to create illustrations by hand; they must look created by hand. That keeps us running in front of the latest image-generation model. We draw whatever it still can't do, and we will do it in the next years, months, or weeks before giving up to AI.</p>
        </div>
      </div>
    </Layout>
  )
}