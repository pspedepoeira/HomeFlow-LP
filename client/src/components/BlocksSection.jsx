export default function BlocksSection() {
  return (
    <section className="dor" id="blocos">
      <div className="container">
        <h2>Tudo o que sua casa precisa</h2>
        <p className="sub">Produtos e prestadores de serviços de forma fácil e econômica.</p>
        <div className="cards">
          <div className="card">
            <h3>🧱 Reforma</h3>
            <div>
              <span className="chip">Piso</span>
              <span className="chip">Revestimentos</span>
              <span className="chip">Gesso</span>
              <span className="chip">Iluminação</span>
              <span className="chip">Pintura</span>
            </div>
            <p style={{ marginTop: '14px' }}>
              Da preparação ao acabamento, os serviços de obra organizados
              para você contratar com confiança.
            </p>
          </div>
          <div className="card">
            <h3>🛋️ Equipamentos e Mobiliário</h3>
            <div>
              <span className="chip">Ar-condicionado</span>
              <span className="chip">Fechadura eletrônica</span>
              <span className="chip">Aquecedor</span>
              <span className="chip">Box</span>
              <span className="chip">Sacadas</span>
              <span className="chip">Espelhos</span>
              <span className="chip">Linha Branca</span>
            </div>
            <p style={{ marginTop: '14px' }}>
              Escolha e instalação dos itens que transformam a casa pronta
              em casa confortável.
            </p>
          </div>
          <div className="card">
            <h3>🖼️ Planejados e Decoração</h3>
            <div>
              <span className="chip">Móveis planejados</span>
              <span className="chip">Decoração</span>
            </div>
            <p style={{ marginTop: '14px' }}>
              Do projeto ao móvel sob medida, com o acabamento que
              sua casa merece.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
