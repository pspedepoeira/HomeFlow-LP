import { useState } from 'react'

export default function SolutionSection() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section id="solucao">
      <div className="container">
        <h2>Conheça o HomeFlow</h2>
        <p className="sub">
          O App que organiza seu imóvel oferecendo economia conectando você a
          distribuidores e aos melhores profissionais. Tudo na palma de sua mão.
        </p>
        <div className="cards">
          <div className="card">
            <h3>📊 Preços de Distribuidor</h3>
            <p>Comprando coletivamente pelo App, os preços ficam bem mais baixos.</p>
          </div>
          <div className="card">
            <h3>⭐ Avaliações de verdade</h3>
            <p>Histórico e notas reais de clientes em cada perfil. Sem indicação de vizinho,
            sem aposta.</p>
          </div>
          <div className="card">
            <h3>📅 Cronograma no controle</h3>
            <p>Cada etapa acompanhada pelo App. Prazo combinado, prazo cobrado.</p>
          </div>
        </div>
        {!imgFailed && (
          <img
            className="solucao-img"
            src="/assets/Imagens_Karol1.jpeg"
            width="1272"
            height="893"
            alt="Personagem abrindo a porta de uma casa pronta com o HomeFlow"
            onError={() => setImgFailed(true)}
          />
        )}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a className="btn" href="#formulario">Quero fluir na minha reforma</a>
        </div>
      </div>
    </section>
  )
}
