import Head from 'next/head'
import Layout from '../components/Layout'

export default function Visit() {
  return (
    <Layout>
      <Head>
        <title>Visit - Ivan Braun</title>
        <meta name="description" content="Visit Ivan Braun in Cariló, Argentina. Information about location, accommodation, and meeting arrangements." />
      </Head>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>Visit Me</h1>
        
        <div style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--secondary-color)'}}>
          <p>
            I'm based in Cariló, Argentina - a beautiful coastal town perfect for 
            productive meetings and inspiring conversations.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Location</h2>
          <p>
            <strong>Cariló, Buenos Aires Province, Argentina</strong><br/>
            About 4 hours drive from Buenos Aires, located on the Atlantic coast.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>When to Visit</h2>
          <p>
            <strong>Best months:</strong> November - March (Argentine summer)<br/>
            <strong>Off-season:</strong> April - October (quieter, good for focused work)
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Accommodation</h2>
          <p>
            I can help arrange accommodation at local hotels or vacation rentals. 
            Cariló offers everything from beachfront resorts to cozy forest cabins.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Meeting Arrangements</h2>
          <p>
            Whether you're interested in:
          </p>
          <ul>
            <li>Strategic business discussions</li>
            <li>Investment opportunities</li>
            <li>Speaking at local events</li>
            <li>Collaborative projects</li>
          </ul>
          <p>
            I'm happy to host productive sessions in this inspiring environment.
          </p>
          
          <div style={{marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px'}}>
            <p style={{margin: 0}}>
              <strong>Ready to visit?</strong> <a href="/contact" style={{color: 'var(--accent-color)'}}>Get in touch</a> to 
              coordinate dates and logistics.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}