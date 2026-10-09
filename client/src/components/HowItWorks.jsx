export default function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="container">
        <h2>Simples assim:</h2>
        <p className="sub">Três passos entre você e uma reforma sem estresse.</p>
        <div className="passos">
          <div className="passo">
            <h3>Cadastre-se no App</h3>
            <p style={{ color: 'var(--gray)' }}>Crie sua conta em menos de 1 minuto.</p>
          </div>
          <div className="passo">
            <h3>Compre e contrate o que precisa</h3>
            <p style={{ color: 'var(--gray)' }}>
              Produtos com preço de distribuidor e profissionais avaliados,
              tudo em um só lugar.
            </p>
          </div>
          <div className="passo">
            <h3>Acompanhe o andamento pelo App</h3>
            <p style={{ color: 'var(--gray)' }}>Cada etapa da obra no cronograma, direto no seu celular.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
