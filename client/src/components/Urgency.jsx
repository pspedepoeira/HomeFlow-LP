export default function Urgency({ counter }) {
  return (
    <section className="urgencia">
      <div className="container">
        <h2>Vagas antecipadas <span>limitadas</span></h2>
        <p className="sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          O HomeFlow lança em breve e o acesso antecipado é limitado aos primeiros cadastros.
          Garanta seu lugar antes da fila virar.
        </p>
        {counter !== null && (
          <p className="contador">
            {counter.toLocaleString('pt-BR')} pessoas já garantiram a vaga.
          </p>
        )}
        <a className="btn" href="#formulario">Garantir minha vaga</a>
      </div>
    </section>
  )
}
