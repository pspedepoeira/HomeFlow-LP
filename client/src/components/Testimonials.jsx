export default function Testimonials() {
  return (
    <section className="dor" id="depoimentos">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Quem testou, aprovou</h2>
        <p className="sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          Depoimentos dos primeiros usuários do HomeFlow.
        </p>
        <div className="cards">
          <div className="card depo">
            "Finalmente consegui comparar orçamentos sem ligar para dez pessoas."
            <p className="autor">— [Nome], [Cidade]</p>
          </div>
          <div className="card depo">
            "O App me mostrou profissionais avaliados perto de mim. Contratei em um dia."
            <p className="autor">— [Nome], [Cidade]</p>
          </div>
          <div className="card depo">
            "Acompanhei cada etapa da reforma pelo celular. Zero surpresa no prazo."
            <p className="autor">— [Nome], [Cidade]</p>
          </div>
        </div>
        <div className="selos">
          <span className="selo">✅ Profissionais verificados</span>
          <span className="selo">🔒 Pagamento protegido</span>
          <span className="selo">🤝 Suporte humano</span>
        </div>
      </div>
    </section>
  )
}
