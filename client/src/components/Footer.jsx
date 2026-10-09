import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <footer>
      <div className="container">
        {logoFailed
          ? <p className="logo-txt">HomeFlow</p>
          : <img className="logo-img" src="/assets/logo_HomeFlow.png" alt="HomeFlow" onError={() => setLogoFailed(true)} />
        }
        <p>contato@homeflow.com.br</p>
        <p style={{ marginTop: '16px' }}>
          © 2026 HomeFlow. Todos os direitos reservados. •{' '}
          <Link to="/privacidade">Política de privacidade</Link>
        </p>
      </div>
    </footer>
  )
}
