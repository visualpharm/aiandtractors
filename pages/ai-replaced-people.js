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
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-md font-medium mb-2" style={{ fontSize: '26px', lineHeight: '1.3' }}>
              The Great Vanishing
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'DotGothic16, monospace' }}>
              How Businesses Erased Humans from Their Visual Identity
            </h1>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
            <div className="font-normal text-gray-600" style={{ fontSize: '19px', lineHeight: '1.55' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">
                TL;DR
              </span>
              <a href="https://icons8.com" className="text-blue-600 hover:underline">Icons8</a>'s research shows that in the last six months, people have disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as "people companies"—being an AI company is everything now.
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero illustration */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-2 h-[50vh] overflow-visible">
        <div className="relative w-full h-full">
          <div className="relative h-[50vh]">
            {/* First image - slightly overlapping from left */}
            <div className="absolute left-[1%] top-[-10%] w-[52%] h-[90%] rounded-xl overflow-hidden shadow-2xl transform -rotate-[7deg] z-30 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                  alt="Corporate imagery showing people in professional settings"
                  fill
                  className="object-contain"
                  sizes="50vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
            
            {/* Second image - slightly overlapping from right */}
            <div className="absolute right-[1%] bottom-[5%] w-[52%] h-[90%] rounded-xl overflow-hidden shadow-2xl transform rotate-[4deg] z-20 bg-white p-4">
              <div className="relative w-full h-full">
                <Image 
                  src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                  alt="Corporate imagery showing technology without people"
                  fill
                  className="object-contain"
                  sizes="50vw"
                  priority
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          {/* Collapsible: Our business section */}
          <details className="group">
            <summary className="cursor-pointer list-none hover:underline">
              <div className="inline font-normal mt-16 mb-6 group-open:mb-6 group-open:text-2xl group-open:font-bold transition-all text-blue-600 group-open:text-gray-900" style={{ fontSize: '19px', lineHeight: '1.55' }}>
                <span className="group-open:text-[26px] group-open:leading-[1.3] transition-all">
                  Our business: visualizing corporate identity
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>For over 20 years, Icons8 has served businesses by creating graphics that visualize how they want to be seen. Our clients are businesses, and they buy pictures of how they want to be portrayed. One thing remained constant throughout these years: businesses valued teamwork and wanted to appear as cohesive teams of professionals with great culture and shared success.</p>
            </div>
          </details>

          {/* Collapsible: Our analytics section */}
          <details className="group">
            <summary className="cursor-pointer list-none hover:underline">
              <div className="inline font-normal mt-16 mb-6 group-open:mb-6 group-open:text-2xl group-open:font-bold transition-all text-blue-600 group-open:text-gray-900" style={{ fontSize: '19px', lineHeight: '1.55' }}>
                <span className="group-open:text-[26px] group-open:leading-[1.3] transition-all">
                  Our analytics: tracking business tastes at scale
                </span>
                <svg className="ml-2 w-5 h-5 text-blue-600 group-open:text-gray-400 group-open:rotate-90 transition-all inline-block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </summary>
            <div className="mt-4">
              <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>As a company with dozens of in-house artists, we dedicate vast resources to analyze business tastes. We use comprehensive analytics for that—download counts, search patterns, and usage metrics. We track the leaders of downloads and understand how business preferences evolve. For years, the leaders were human-centered: teams collaborating, diverse groups working together, professionals engaging face-to-face. The world we visualized was alive, bustling with human activity.</p>
            </div>
          </details>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>The great vanishing</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Something <em>apocalyptic</em> has happened in the last six months. The numbers are stark: people imagery in our <a href="https://icons8.com/illustrations/style--3d-hygge" className="text-blue-600 hover:underline">3D illustration pack</a> dropped 87.5%—from 8 human-centered illustrations to just 1: <em>reading further fragments</em>.</p>
        </div>
      </div>
        
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-with-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-with-people-hugge.png" 
                alt="6 months ago: creating illustrations was creating people. Businesses liked buying the images of people." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2359/1617' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 months ago</span>
              Creating illustrations was creating people. Businesses liked buying the images of people.
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/illustrations-without-people-hugge.png" 
               data-fancybox="gallery" 
               data-caption="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own."
               className="block bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/illustrations-without-people-hugge.png" 
                alt="Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own." 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2408/1568' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Now</span>
              People vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>People disappeared.</strong> But it's worse than disappearing—they became <em>fragments</em>. Human representation is often reduced to floating hands holding objects—a phone, a cup, making an OK sign. Humans became disembodied appendages to their devices. It's like a post-apocalypse where humanity was reduced to body parts interfacing with technology operating on its own.</p>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>In our people vs robots comparison:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• People decreased from 28+ to 20</li>
            <li className="mb-2">• While robots increased from 3 to 12</li>
          </ul>
          
          <p className="mb-4" style={{ fontSize: '19px', lineHeight: '1.55' }}>The same trend:</p>
          <ul className="mb-6 ml-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>
            <li className="mb-2">• People almost completely disappeared</li>
            <li className="mb-2">• Teamwork disappeared</li>
            <li className="mb-2">• We have more robots than people</li>
            <li className="mb-2">• We have multiple representations of AI instead</li>
          </ul>
        </div>
      </div>
      
      {/* Second image pair - people vs robots */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: people interact with people"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-2"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/people.png" 
                alt="6 months ago: people interact with people" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2204/1907' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 months ago</span>
              People interact with people
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/robots.png" 
               data-fancybox="gallery" 
               data-caption="After: people decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/robots.png" 
                alt="After: people decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '2126/1810' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Now</span>
              People decreased significantly, giving way to 4x more robots, and something unpopular before: people with robots
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>What this means</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>What we see now is a dramatic shift toward AI representations in every form—neural networks, robotic interfaces, abstract data flows, and isolated technology operating without human oversight. Agentic AI takes the place of people.</p>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>What does this transformation mean for businesses? They want to see themselves as AI companies now. People are either a less desired alternative or are simply irrelevant.</p>
        </div>
      </div>
      
      {/* Third image pair - overall comparison */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start px-4">
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-people.png" 
               data-fancybox="gallery" 
               data-caption="6 months ago: 10 images of people, including teamwork"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform rotate-1"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-people.png" 
                alt="6 months ago: 10 images of people, including teamwork" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1844/1719' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">6 months ago</span>
              10 images of people, including teamwork
            </p>
          </div>
          <div className="text-center lg:w-1/2">
            <a href="/ai-replaced-people/overall-no-people.png" 
               data-fancybox="gallery" 
               data-caption="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too"
               className="block bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow p-4 mx-auto transform -rotate-3"
               style={{ maxWidth: '90vw' }}>
              <img 
                src="/ai-replaced-people/overall-no-people.png" 
                alt="Now: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too" 
                className="w-full h-auto object-contain rounded"
                style={{ aspectRatio: '1964/1926' }}
              />
            </a>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto px-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-2">Now</span>
              Only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="prose prose-lg max-w-none space-y-6">
          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>The new reality</h2>
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>What we see now is a dramatic shift where agentic AI takes the place of people. But there's a fascinating inversion: as robots gained expressive blue eyes and emotional design language, humans lost their faces entirely. AI evolved from abstract geometric shapes to beings with distinct personalities, while humans devolved from collaborative teams to faceless fragments.</p>
          
          <table className="w-full my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Six months ago</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Now</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Professionals with multiple monitors and gizmos like Apple Vision doing the job efficiently</td>
                <td className="p-4 align-top border-l border-gray-200">AI agents operating autonomously</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Human expertise driving technology</td>
                <td className="p-4 align-top border-l border-gray-200">The technology functioning independently</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Human-centric scenes with people as primary focus and decision-makers</td>
                <td className="p-4 align-top border-l border-gray-200">Technology-centric approaches where humans have supportive or peripheral roles</td>
              </tr>
            </tbody>
          </table>
          
          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}><strong>Being a people company is not cool anymore.</strong> Being an AI company is everything. Agentic AI takes the place of people. The shareholder value lies in this transformation.</p>
          
          <p className="mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>Perhaps we're witnessing the <strong>most honest corporate communication</strong> in decades. This shift doesn't just correspond to future <em>robotaxi</em> farms, but the broadest range of businesses. For the first time, companies are showing us exactly how they see the future of work: a world where humans are optional.</p>

          <h2 className="text-2xl font-bold mt-16 mb-6" style={{ fontSize: '26px', lineHeight: '1.3' }}>Why do we still bother creating human graphics?</h2>
          
          <p className="mb-6" style={{ fontSize: '19px', lineHeight: '1.55' }}>Generated images were once not only novel but priced. Our own dataset <a href="https://generated.photos" className="text-blue-600 hover:underline">Generated Photos</a> made the headlines of <a href="https://www.theverge.com/2019/9/20/20875362/100000-fake-ai-photos-stock-photography-royalty-free?fbclid=IwAR04GSt2MI1xJTB8nbW4xwZG8TFyD_g86HUCnvmk7DSEpsWHS0eZaoRadak" className="text-blue-600 hover:underline">The Verge</a> and <a href="https://www.washingtonpost.com/technology/2020/01/07/dating-apps-need-women-advertisers-need-diversity-ai-companies-offer-solution-fake-people/" className="text-blue-600 hover:underline">The Washington Post</a> — but mass adoption has made them ubiquitous and cheap. They're now perceived as a sign of underinvestment. By contrast, human-drawn images remain expensive, so they still make a company look well-off.</p>

          <table className="my-6 border-collapse border border-gray-300 bg-white shadow-sm" style={{ fontSize: '17px', lineHeight: '1.5', maxWidth: '600px', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold border-b border-gray-300">Cheap / ubiquitous</th>
                <th className="text-left p-4 font-semibold border-b border-gray-300 border-l border-gray-300">Costly status consumption</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Generated images (today)</td>
                <td className="p-4 align-top border-l border-gray-200">Human-drawn images</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Aluminum cutlery (today)</td>
                <td className="p-4 align-top border-l border-gray-200">Aluminum cutlery when first introduced</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-4 align-top">Mass-market plastics</td>
                <td className="p-4 align-top border-l border-gray-200">Early plastics (bakelite, celluloid)</td>
              </tr>
              <tr>
                <td className="p-4 align-top">Basic stainless-steel utensils</td>
                <td className="p-4 align-top border-l border-gray-200">Stainless-steel appliance bodies</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-10 mb-8" style={{ fontSize: '19px', lineHeight: '1.55' }}>We not only have to create illustrations by hand; they must look created by hand. That keeps us running in front of the latest image-generation model. We draw whatever it still can't do, and we will do it in the next years, <del>months, or weeks before giving up to AI</del>.</p>
          
          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '19px', lineHeight: '1.55', marginTop: '30px', marginBottom: '30px' }}>
            You can find the work of our human artists at <a href="https://icons8.com/illustrations" className="text-blue-600 hover:underline">https://icons8.com/illustrations</a>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg" style={{ fontSize: '18px', lineHeight: '1.6', marginTop: '40px', marginBottom: '40px' }}>
            <div className="mb-3">
              <span className="inline-block bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium">
                Reader Commentary
              </span>
            </div>
            <blockquote className="italic text-gray-700 mb-3">
              "The concept of The Spectacle and the idea that images and representation become more real than the thing itself. We're actively walking through the door of abstraction in a way that we leave our humanity and ultimately our real connection behind."
            </blockquote>
            <cite className="text-gray-600 text-sm">
              — faptain-calcon22 on <a href="https://www.reddit.com/r/Design/comments/1lmev4r/ai_fallout_businesses_erased_people_from_their/" className="hover:underline">Reddit</a>
            </cite>
          </div>
        </div>
      </div>
    </Layout>
  )
}