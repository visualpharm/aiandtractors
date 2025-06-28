import Head from 'next/head'
import Layout from '../components/Layout'

export default function AIReplacedPeople() {
  return (
    <Layout>
      <Head>
        <title>The Great Vanishing: How Businesses Erased Humans from Their Visual Identity</title>
        <meta name="description" content="Icons8's research shows that in the last six months, people have completely disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as people companies." />
        <link rel="canonical" href="https://ivanbraun.com/ai-replaced-people" />
      </Head>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-4">
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium mb-2">
              The Great Vanishing
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'DotGothic16, monospace' }}>
              How Businesses Erased Humans from Their Visual Identity
            </h1>
          </div>
        </div>
      </div>
      
      {/* Hero illustration - overlapping cards - full width */}
      <div className="w-full px-4 sm:px-8 pt-4">
        <div className="relative w-full mx-auto mb-8 h-96">
          {/* First card - people illustration, slightly behind and to the left */}
          <div className="absolute top-0 left-12 w-[480px] h-72 transform -rotate-3 shadow-xl">
            <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
               data-fancybox="hero-gallery" 
               data-caption="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people."
               className="block w-full h-full bg-white rounded-lg p-4 cursor-pointer hover:shadow-2xl transition-all hover:-rotate-2">
              <img 
                src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                alt="6 months ago: creating illustrations was creating people" 
                className="w-full h-full object-contain rounded"
              />
            </a>
          </div>
          
          {/* Second card - AI illustration, on top and to the right */}
          <div className="absolute top-6 right-12 w-[480px] h-72 transform rotate-2 shadow-2xl z-10">
            <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
               data-fancybox="hero-gallery" 
               data-caption="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own."
               className="block w-full h-full bg-white rounded-lg p-4 cursor-pointer hover:shadow-2xl transition-all hover:rotate-1">
              <img 
                src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                alt="Now: people vanished, leaving empty machinery" 
                className="w-full h-full object-contain rounded"
              />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="text-xl font-medium text-gray-600 mb-8">
            <strong>TL;DR:</strong> Icons8's research shows that in the last six months, people have completely disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as "people companies"—being an AI company is everything now.
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-6">The Way Things Were</h2>
          <p className="mb-6">For over 20 years, Icons8 has been creating computer graphics to visualize how businesses want to be seen. One thing remained constant: businesses valued teamwork and wanted to appear as cohesive teams of professionals with great culture and shared success.</p>
          <p className="mb-6">As a company with dozens of in-house artists, we track what clients search for, download, and actually use. For years, our most popular content featured teams collaborating, diverse groups working together, professionals engaging face-to-face. The world we visualized was alive, bustling with human activity.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Great Vanishing</h2>
          <p className="mb-6">But our constant research reveals something apocalyptic has happened in the last six months. The most striking example are our <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">3D modeled illustrations</a>:</p>
        </div>
      </div>
        
        <div className="w-full px-4 sm:px-8 my-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="text-center flex-1">
              <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
                 data-fancybox="gallery" 
                 data-caption="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people."
                 className="block w-full h-80 md:h-96 bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                    alt="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people." 
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              </a>
              <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
                6 months ago: creating illustrations was creating people. Businesses liked buying the images of people.
              </p>
            </div>
            <div className="text-center flex-1">
              <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
                 data-fancybox="gallery" 
                 data-caption="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own."
                 className="block w-full h-80 md:h-96 bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                    alt="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own." 
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              </a>
              <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
                Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own.
              </p>
            </div>
          </div>
        </div>
        
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6"><strong>People disappeared.</strong> It's like a post-apocalypse—as if humanity simply vanished from the corporate landscape, leaving behind only AI, machines and technology operating on their own.</p>
          <p className="mb-6">Our other illustration pack shows that people are fewer. They pair with robots, and give way to robots.</p>
        </div>
      </div>
      
      {/* Second image pair - people vs robots */}
      <div className="w-full my-12 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="text-center">
            <a href="/ai-replaced-people/people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: people interact with people"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '560px', height: '487px', padding: '20px' }}>
              <img 
                src="/ai-replaced-people/people.png" 
                alt="6 months ago: people interact with people" 
                className="w-full h-full object-contain rounded"
                style={{ width: '520px', height: '447px' }}
              />
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
              6 months ago: people interact with people
            </p>
          </div>
          <div className="text-center">
            <a href="/ai-replaced-people/robots.png" 
               data-fancybox="gallery" 
               data-caption="After: people almost halved, giving way to 4x more robots, and something unpopular before: people with robots"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '541px', height: '462px', padding: '20px' }}>
              <img 
                src="/ai-replaced-people/robots.png" 
                alt="After: people almost halved, giving way to 4x more robots, and something unpopular before: people with robots" 
                className="w-full h-full object-contain rounded"
                style={{ width: '501px', height: '422px' }}
              />
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
              After: people almost halved, giving way to 4x more robots, and something unpopular before: people with robots
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6">Our overall leaders, heavily dominated by icons, show the same trend. People almost completely disappeared. Teamwork disappeared. We have more robots than people. We have multiple representations of AI instead: spheres, robots, sparkles.</p>
        </div>
      </div>
      
      {/* Third image pair - overall comparison */}
      <div className="w-full my-12 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-6 items-end">
          <div className="text-center">
            <a href="/ai-replaced-people/overall-people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: 10 images of people, including teamwork"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '471px', height: '440px', padding: '20px' }}>
              <img 
                src="/ai-replaced-people/overall-people.png" 
                alt="6 months ago: 10 images of people, including teamwork" 
                className="w-full h-full object-contain rounded"
                style={{ width: '431px', height: '400px' }}
              />
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
              6 months ago: 10 images of people, including teamwork
            </p>
          </div>
          <div className="text-center">
            <a href="/ai-replaced-people/overall-no-people.png" 
               data-fancybox="gallery" 
               data-caption="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
               style={{ width: '501px', height: '492px', padding: '20px' }}>
              <img 
                src="/ai-replaced-people/overall-no-people.png" 
                alt="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too" 
                className="w-full h-full object-contain rounded"
                style={{ width: '461px', height: '452px' }}
              />
            </a>
            <p className="mt-4 text-sm text-gray-600 max-w-sm mx-auto">
              Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6">What we see now is a dramatic shift toward AI representations in every form—neural networks, robotic interfaces, abstract data flows, and isolated technology operating without human oversight. Agentic AI takes the place of people. Where we once showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently, now one of our most popular illustrations is robots working on a computer.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">What This Means</h2>
          <p className="mb-6">What does this transformation mean for how businesses see themselves? People want to see themselves as AI companies now.</p>
          <p className="mb-6">Before, we showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently.</p>
          <p className="mb-6">Now, one of our most popular illustrations is robots working on a computer.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The New Reality</h2>
          <p className="mb-6">Being a people company is not cool anymore. Being an AI company is everything. Agentic AI takes the place of people. The shareholder value lies in this transformation.</p>
          <p className="text-xl font-medium text-gray-800 mb-6">Maybe this reveals what companies always thought but were afraid to say—that people are the problem, not the solution.</p>
        </div>
      </div>
    </Layout>
  )
}