import { useState } from 'react'

export default function Header() {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <header>
      <div className="container header-inner">
        <a href="#inicio">
          {logoFailed
            ? <span className="logo-txt">Home<span style={{ color: '#A8D73D' }}>Flow</span></span>
            : <img className="logo-img" src="/assets/logo_HomeFlow.png" alt="HomeFlow" onError={() => setLogoFailed(true)} />
          }
        </a>
        <nav>
          <a className="link" href="#blocos">Blocos</a>
          <a className="link" href="#como-funciona">Como funciona</a>
          <a className="link" href="#faq">FAQ</a>
          <a className="btn btn-sm" href="#formulario">Pré-cadastre-se</a>
        </nav>
      </div>
    </header>
  )
}
