import Head from 'next/head'
import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact - Ivan Braun</title>
        <meta name="description" content="Get in touch with Ivan Braun for speaking engagements, consulting, or investment opportunities." />
      </Head>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>Contact</h1>
        
        <div style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--secondary-color)'}}>
          <p>
            I'm always interested in connecting with fellow entrepreneurs, potential clients, 
            and anyone passionate about AI and innovation.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Get in Touch</h2>
          
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{marginBottom: '1rem'}}>
              <strong>Email:</strong> <a href="mailto:ivan@ivanbraun.com" style={{color: 'var(--accent-color)'}}>ivan@ivanbraun.com</a>
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ivanbraun" style={{color: 'var(--accent-color)'}}>linkedin.com/in/ivanbraun</a>
            </li>
            <li style={{marginBottom: '1rem'}}>
              <strong>Location:</strong> Cariló, Argentina
            </li>
          </ul>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Speaking Engagements</h2>
          <p>
            Available for keynotes and panels on AI innovation, bootstrapped entrepreneurship, 
            and building global tech companies from emerging markets.
          </p>
          
          <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Consulting & Investment</h2>
          <p>
            I advise startups on product strategy, team building, and sustainable growth. 
            Particularly interested in AI/ML, design tools, and B2B SaaS.
          </p>
        </div>
      </div>
    </Layout>
  )
}