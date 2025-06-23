import Head from 'next/head'
import Layout from '../../components/Layout'
import LargeCards from '../../components/LargeCards'
import Link from 'next/link'

export default function Book() {
  return (
    <Layout>
      <Head>
        <title>Livro - Ivan Braun</title>
        <meta name="description" content="O livro de Ivan Braun sobre construir empresas de IA sem capital de risco." />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://ivanbraun.com/pt/book" />
        <link rel="alternate" href="https://ivanbraun.com/book" hrefLang="en" />
        <link rel="alternate" href="https://ivanbraun.com/es/book" hrefLang="es" />
      </Head>

      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-text">
                <h1 className="book-title text-6xl md:text-8xl font-normal mb-4" style={{ fontFamily: 'Cormorant', color: '#950303' }}>Zero to AI</h1>
                <p className="subtitle">Um guia prático para construir e escalar empresas de tecnologia sem financiamento tradicional. Baseado em experiência real gerenciando equipes de 150+ pessoas e servindo milhões de usuários, este livro oferece lições práticas em gestão, marketing e finanças que realmente funcionam quando você está bootstrapping.</p>
              </div>
              <div className="hero-image">
                <img src="/i/zero-to-ai.jpg" alt="Kill the Budget and 12 Other Ways to Bootstrap book cover" className="book-cover-large" />
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <h2 className="fun-title"><span className="fun-title-fill">Trechos do Livro</span></h2>
          
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mate os orçamentos, não os sonhos</h3>
              <div className="text-gray-700 space-y-3">
                <p>Orçamentos são bobagem. São uma suposição sobre preços ótimos que se torna evangelho...</p>
                <p>Se você tem $100k para marketing, não gaste tudo. Gaste $10k, aprenda, depois gaste outros $10k sabendo o que faz as pessoas comprarem.</p>
              </div>
            </div>
            
            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Contrate como um algoritmo de compressão</h3>
              <div className="text-gray-700 space-y-3">
                <p>Algoritmos de compressão encontram padrões nos dados e eliminam redundâncias. Quando contratar, faça o mesmo.</p>
                <p>Não contrate um especialista para cada canal. Contrate uma pessoa que possa encontrar o padrão subjacente em todos os canais.</p>
              </div>
            </div>

            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Faça dinheiro real, não dinheiro de PowerPoint</h3>
              <div className="text-gray-700 space-y-3">
                <p>Há dois tipos de dinheiro: dinheiro real e dinheiro de PowerPoint. Dinheiro real vem de clientes pagando por valor.</p>
                <p>Dinheiro de PowerPoint vem de investidores pagando por potencial futuro. Construa seu negócio em dinheiro real.</p>
              </div>
            </div>

            <div className="col-span-8 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Efeito de rede é real, mas supervalorizado</h3>
              <div className="text-gray-700 space-y-3">
                <p>Efeitos de rede não garantem sucesso. Facebook teve que competir com MySpace. WhatsApp teve que competir com BBM.</p>
                <p>Construa um ótimo produto primeiro. Efeitos de rede são a cereja do bolo, não o bolo.</p>
              </div>
            </div>
          </div>
        </div>

        <LargeCards 
          title="Depoimentos"
          items={[
            {
              title: "\"Conselhos práticos que realmente funcionam\"",
              description: "Ao contrário da maioria dos livros de negócios, este está cheio de estratégias que foram testadas em batalha em empresas reais gerando receita real."
            },
            {
              title: "\"Finalmente, um livro honesto sobre bootstrapping\"",
              description: "Ivan não adoça a realidade de construir uma empresa sem fundos. Ele te diz exatamente o que você precisa ouvir, não o que quer ouvir."
            }
          ]}
        />

        <div className="coming-soon-section">
          <h2 className="fun-title"><span className="fun-title-fill">Em Breve</span></h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Baseado em 15 anos de experiência construindo empresas de IA lucrativas, este livro compartilha as lições reais de crescer de zero a milhões de usuários sem capital de risco.
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .hero-section {
          margin-bottom: 4rem;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .hero-layout {
            grid-template-columns: 1fr 400px;
          }
        }

        .book-title {
          line-height: 0.9;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .book-cover-large {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .fun-title {
          margin-top: 28px !important;
          margin-bottom: 2rem !important;
          position: relative;
          display: inline-block;
          font-size: 3rem;
          font-weight: 400 !important;
          font-family: 'Cormorant', serif !important;
          line-height: 1.1;
          color: #950303;
        }

        .fun-title-fill {
          position: relative;
          color: #950303;
          font-size: 2.5rem !important;
          font-weight: 400 !important;
          font-family: 'Cormorant', serif !important;
          z-index: 2;
          text-shadow:
            -1px 0 0 #dd9e8e,
            1px 0 0 #53cb82;
        }

        .book-content {
          margin-bottom: 4rem;
        }

        .grid {
          display: grid;
          gap: 1rem;
        }

        .grid-cols-8 {
          grid-template-columns: repeat(8, 1fr);
        }

        .col-span-8 {
          grid-column: span 8;
        }

        @media (min-width: 768px) {
          .col-span-8.md\\:col-span-4 {
            grid-column: span 4;
          }
        }

        .coming-soon-section {
          text-align: center;
          padding: 3rem 0;
          background: #f9fafb;
          border-radius: 12px;
          margin-top: 3rem;
        }
      `}</style>
    </Layout>
  )
}