import Head from 'next/head'
import Layout from '../components/Layout'
import LargeCards from '../components/LargeCards'
import Link from 'next/link'

export default function Book() {
  return (
    <Layout>
      <Head>
        <title>Book - Ivan Braun</title>
        <meta name="description" content="The book by Ivan Braun on building AI companies without venture capital." />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <h1 className="fun-title"><span className="fun-title-fill">Zero to AI</span></h1>
                <p className="subtitle">A no-nonsense guide to building and scaling tech companies without traditional funding. Based on real experience growing teams of 150+ people and serving millions of users, this book offers practical lessons in management, marketing, and finance that actually work when you're bootstrapping.</p>
              </div>
              <div className="hero-image">
                <img src="/i/zero-to-ai.jpg" alt="Kill the Budget and 12 Other Ways to Bootstrap book cover" className="book-cover-large" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Part 1: Management</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "1. Kill budgets, not dreams",
                  description: "Why budgets are guesswork and how to find real market prices"
                },
                {
                  title: "2. The screenshot tool",
                  description: "Using Hubstaff to focus on process, not micromanaging results"
                },
                {
                  title: "3. Fire the \"my life sucks\" people",
                  description: "Culture levels and why toxic employees destroy teams"
                },
                {
                  title: "4. Scrum without being an asshole",
                  description: "Using frameworks so people can't blame you personally"
                },
                {
                  title: "5. Too much control vs too little",
                  description: "Finding the balance between meetings and direction"
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Part 2: Marketing</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "6. Freemium is a pleasure",
                  description: "Build something viral first, add paywalls later"
                },
                {
                  title: "7. Think about the evil side",
                  description: "Why viral products get negative press (and that's okay)"
                },
                {
                  title: "8. SEO for poor people",
                  description: "Backlinks convert to traffic, everything else is noise"
                },
                {
                  title: "9. ChatGPT CEO is different",
                  description: "Getting mentioned in the few articles AI considers authoritative"
                }
              ]}
            />
            
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Part 3: Finance</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "10. Cherry-picking offers",
                  description: "Always shopping for prices, getting the best deals"
                },
                {
                  title: "11. Get pleasure from eliminating waste",
                  description: "The joy of cutting inefficiencies immediately"
                },
                {
                  title: "12. Offer everything except high salary",
                  description: "Flexibility, learning, reduced hours before money"
                },
                {
                  title: "13. The Zara photoshoot",
                  description: "Getting what you need without inflated budgets"
                }
              ]}
            />
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">Excerpts</span></h2>
            </div>
            
            <div className="excerpts-grid">
              <div className="excerpt-block">
                <h3>Kill budgets, not dreams</h3>
                <p>Budgets are bullshit. They're some guess about optimal pricing that turns into gospel. Instead of budgets, find the real cost of things.</p>
                <p>When we were doing photoshoots with photographers, our goal was to shoot three scenes: office, home, and pajamas. We went to Zara and purchased the clothing for it. No budget would do the trick - we just got what we needed and figured out the real price.</p>
                <p>The budget mindset makes you lazy. "We have $5,000 for this" becomes an excuse to not shop around, not negotiate, not think. Kill that. Demand good prices from the market instead.</p>
              </div>
              
              <div className="excerpt-block">
                <h3>The screenshot tool</h3>
                <p>I require people to have a process, not specific results. This way, I don't have to always define new results and try to guess the next objective, which is irritating and hard for them. Instead, I trust them.</p>
                <p>They work well if I give them a tracking tool like Hubstaff with screenshots. I know they're not watching YouTube or working for someone else. It's about focus on process, not micromanaging.</p>
                <p>Some people think this is controversial. But it works. I focus on results through process, instead of constantly defining new objectives.</p>
              </div>
              
              <div className="excerpt-block">
                <h3>Freemium is a pleasure</h3>
                <p>Freemium is something people share. If it's a free product, lean toward the free side. If you create a paid product nobody uses, that's a failure. If you create a freemium product that everybody's using and it's viral - that's pleasure.</p>
                <p>You can add paywalls wherever you want later. It's much easier to monetize something people already love than to force people to pay for something they haven't tried.</p>
                <p>We had one product reach millions of users with zero ad spend. When we added premium features, people converted because they already saw the value.</p>
              </div>
              
              <div className="excerpt-block">
                <h3>Always shopping for prices</h3>
                <p>Cherry-picking offers is an art. We got $100K worth of GPU compute for $10K per year just by shopping cloud credits, trials, and beta access. Same approach works for office space, software, everything.</p>
                <p>Most people are lazy about this. They see a price and accept it. But every price is negotiable, every service has competitors, every vendor has promotions.</p>
                <p>Do it while it's worth your money. If you can get $1K by asking a simple question that takes you 3 minutes, that's $20K per hour! In contrast, getting $2 discount for the same time probably is not worth it.</p>
              </div>
              
              <div className="excerpt-block">
                <h3>Offer everything except high salary</h3>
                <p>Flexibility, learning, reduced hours before money. When hiring, most people focus on salary first. But there's so much more you can offer: flexible schedules, remote work, learning opportunities, interesting projects.</p>
                <p>We found talented developers who valued remote work over $20K salary increases. Designers who preferred creative freedom over corporate benefits. When you can't compete on salary, compete on everything else.</p>
                <p>The key is finding people who value what you can offer. Don't try to convince someone who only cares about money. Find the people who care about what you actually have.</p>
              </div>
              
              <div className="excerpt-block">
                <h3>Think about the evil side</h3>
                <p>Why viral products get negative press (and that's okay). When something goes viral, people will find the worst possible use case and write about it. Plan for this. Our face generation tool got criticized for deepfakes. Our icon library got called "cookie cutter design."</p>
                <p>The negative coverage often drives more users than positive reviews. People hear about the controversy, try the product to see what the fuss is about, and become regular users. Don't be afraid of some negative press if your product is genuinely useful.</p>
                <p>Just make sure the core product serves a real need. Controversy around a useless product kills it. Controversy around a useful product spreads it.</p>
              </div>
            </div>
          </div>

          <div className="main-grid">
            <div className="full-width">
              <h2 className="fun-title"><span className="fun-title-fill">About This Book</span></h2>
            </div>
            
            <LargeCards 
              title=""
              items={[
                {
                  title: "Real-World Experience",
                  description: "This book distills practical lessons from building and scaling multiple technology companies without traditional venture funding. Each chapter focuses on actionable strategies that work in the real world of constrained resources and ambitious goals."
                },
                {
                  title: "Proven Results",
                  description: "Unlike theoretical business books, these insights come from actual experience managing teams of 150+ people, serving 4+ million users, and navigating the challenges of building global technology companies from unexpected locations."
                },
                {
                  title: "Framework for Growth",
                  description: "Whether you're a first-time founder or an experienced entrepreneur looking to optimize operations, these 13 strategies provide a framework for sustainable growth without burning through investor capital."
                }
              ]}
            />
            
            <div className="full-width" style={{ marginTop: '28px' }}>
              <p className="coming-soon">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        
        .main-grid {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
          padding: 0 2rem;
          font-family: 'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif;
        }
        
        .full-width {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        
        .full-width h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .full-width p {
          font-size: 1.12rem;
          color: #333;
          margin-bottom: 0.7rem;
        }


        .hero-section {
            background: var(--hero-bg);
            padding: 4rem 0 2rem 0;
            margin-bottom: 3rem;
        }

        .hero-content {
            max-width: 1200px;
        }
        
        .hero-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero-text {
            
        }
        
        .hero-image {
            display: flex;
            justify-content: center;
        }
        
        .book-cover-large {
            max-width: 300px;
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .fun-title {
            margin-top: 28px !important;
            margin-bottom: 0 !important;
            position: relative;
            display: inline-block;
            font-size: 3rem;
            font-weight: 400 !important;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            line-height: 1.1;
        }

        .fun-title-fill {
            position: relative;
            color: #222;
            font-size: 2.5rem !important;
            font-weight: 400 !important;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
            z-index: 2;
            text-shadow:
                -1px 0 0 #dd9e8e,
                1px 0 0 #53cb82;
        }

        .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            font-weight: 400;
        }

        .description {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0;
            line-height: 1.6;
        }

        .book-content h2 {
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 0.8rem;
            color: var(--secondary-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2rem;
        }
        
        .excerpts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .excerpt-block {
            
        }
        
        .excerpt-block h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
            color: var(--primary-color);
        }
        
        .excerpt-block p {
            font-size: 1rem;
            color: var(--secondary-color);
            margin: 0 0 1rem 0;
            line-height: 1.6;
        }
        
        .excerpt-block p:last-child {
            margin-bottom: 0;
        }
        
        .coming-soon {
            font-size: 1.1rem;
            color: var(--secondary-color);
            margin: 0;
            text-align: center;
        }


        .cta-button {
            background: var(--accent-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-block;
            margin-top: 1rem;
        }

        .cta-button:hover {
            background: #3a4db8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(69, 93, 204, 0.25);
        }

        @media (max-width: 768px) {
            .hero-layout {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .fun-title-fill {
                font-size: 2rem !important;
            }

            .book-cover-large {
                max-width: 200px;
            }

            .toc-grid {
                grid-template-columns: 1fr;
            }
            
            .part-title {
                font-size: 1.2rem;
            }
            
            .excerpts-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
        }
      `}</style>
    </Layout>
  )
}