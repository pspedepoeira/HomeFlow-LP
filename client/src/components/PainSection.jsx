import { useState } from 'react'

export default function PainSection() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section className="dor" id="dor">
      <div className="container">
        <h2>Reformar não precisa ser um pesadelo</h2>
        <p className="sub">Se você já passou por isso, sabe do que estamos falando:</p>
        <div className="cards">
          <div className="card">
            <h3>💰 Orçamento que não fecha</h3>
            <p>Você pediu orçamento para cinco profissionais e recebeu cinco preços diferentes —
            sem saber em quem confiar.</p>
          </div>
          <div className="card">
            <h3>👻 Profissional que some</h3>
            <p>O azulejista prometeu começar segunda-feira. Já se passaram três segundas-feiras.</p>
          </div>
          <div className="card">
            <h3>⏰ Prazo que furou (de novo)</h3>
            <p>A mudança está marcada, a obra não acabou e o estresse só aumenta.</p>
          </div>
        </div>
        {!imgFailed && (
          <img
            className="dor-img"
            src="/assets/Imagens_Karol_2.jpeg"
            alt="Personagem sobrecarregado no meio de uma obra"
            onError={() => setImgFailed(true)}
          />
        )}
        <p className="transition">E se toda essa bagunça virasse <b>um App simples?</b></p>
      </div>
    </section>
  )
}
