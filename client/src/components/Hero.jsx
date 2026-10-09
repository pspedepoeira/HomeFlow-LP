import { useState } from 'react'

export default function Hero() {
  const [mockupFailed, setMockupFailed] = useState(false)

  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div>
          <h1>Sua reforma <span>fluindo</span> com prazo e economia do início à decoração final</h1>
          <p className="lead">
            O HomeFlow organiza seu Apartamento em{' '}
            <b>3 blocos — Reforma, Equipamentos/Mobiliário e Planejados/Decoração</b>{' '}
            — conectando você aos melhores profissionais e grandes fornecedores. Tudo em um só App.
          </p>
          <a className="btn" href="#formulario">Quero me pré-cadastrar grátis</a>
          <p className="micro">Vagas antecipadas • Sem compromisso • Cancele quando quiser</p>
        </div>
        <div>
          {!mockupFailed && (
            <img
              className="mockup"
              src="/assets/Imagem_App_FINAL.png"
              alt="App HomeFlow com os blocos de serviços"
              onError={() => setMockupFailed(true)}
            />
          )}
        </div>
      </div>
    </section>
  )
}
