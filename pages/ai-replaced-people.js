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
          <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">
            The Great Vanishing: How Businesses Erased Humans from Their Visual Identity
          </h1>
          <div className="text-xl font-medium text-gray-600 mb-8">
            <strong>TL;DR:</strong> Icons8's research shows that in the last six months, people have completely disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as "people companies"—being an AI company is everything now.
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">The Way Things Were</h2>
          <p>For over 20 years, Icons8 has been creating computer graphics to visualize how businesses want to be seen. One thing remained constant: businesses valued teamwork and wanted to appear as cohesive teams of professionals with great culture and shared success.</p>
          <p>As a company with dozens of in-house artists, we track what clients search for, download, and actually use. For years, our most popular content featured teams collaborating, diverse groups working together, professionals engaging face-to-face. The world we visualized was alive, bustling with human activity.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Great Vanishing</h2>
          <p>But our constant research reveals something apocalyptic has happened in the last six months.</p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-start my-8">
            <div className="text-center flex-1 max-w-lg">
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
            <div className="text-center flex-1 max-w-lg">
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
          
          <p className="text-center text-sm text-gray-500 mb-6">
            The striking example of our <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">3D modelled illustrations</a>.
          </p>
          
          <p>Have you noticed something? People disappeared. It's like a post-apocalypse—as if humanity simply vanished from the corporate landscape, leaving behind only AI, machines and technology operating on their own.</p>
          <p>What we see now is a dramatic shift toward AI representations in every form—neural networks, robotic interfaces, abstract data flows, and isolated technology operating without human oversight. Agentic AI takes the place of people. Where we once showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently, now one of our most popular illustrations is robots working on a computer.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">What This Means</h2>
          <p>What does this transformation mean for how businesses see themselves? People want to see themselves as AI companies now.</p>
          <p>Before, we showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently.</p>
          <p>Now, one of our most popular illustrations is robots working on a computer.</p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The New Reality</h2>
          <p>Being a people company is not cool anymore. Being an AI company is everything. Agentic AI takes the place of people. The shareholder value lies in this transformation.</p>
          <p className="text-xl font-medium text-gray-800">Maybe this reveals what companies always thought but were afraid to say—that people are the problem, not the solution.</p>
        </div>
      </div>
    </Layout>
  )
}