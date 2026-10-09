import { useState } from 'react'

export default function Admin() {
  const [token, setToken] = useState(() => {
    try { return sessionStorage.getItem('hf_token') || '' } catch { return '' }
  })
  const [data, setData] = useState([])
  const [total, setTotal] = useState(null)
  const [msg, setMsg] = useState('')

  async function carregar() {
    const t = token.trim()
    try { sessionStorage.setItem('hf_token', t) } catch {}
    setMsg('')
    try {
      const r = await fetch('/api/admin/pre-cadastros', {
        headers: { Authorization: `Bearer ${t}` },
      })
      const j = await r.json()
      if (!j.ok) { setMsg(j.mensagem); return }
      setTotal(j.total)
      setData(j.dados)
    } catch {
      setMsg('Erro de conexão.')
    }
  }

  async function baixarCsv() {
    try {
      const r = await fetch('/api/admin/export.csv', {
        headers: { Authorization: `Bearer ${token.trim()}` },
      })
      if (!r.ok) throw new Error()
      const b = await r.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(b)
      a.download = 'homeflow-pre-cadastros.csv'
      a.click()
    } catch {
      setMsg('Não autorizado ou erro ao exportar.')
    }
  }

  return (
    <div className="admin-wrap">
      <h1>Pré-cadastros HomeFlow</h1>
      <div className="admin-bar">
        <input
          type="password"
          placeholder="ADMIN_TOKEN"
          value={token}
          onChange={e => setToken(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && carregar()}
        />
        <button onClick={carregar}>Carregar</button>
        <button className="sec" onClick={baixarCsv}>Baixar CSV</button>
        {total !== null && <span className="admin-total">{total} cadastro(s)</span>}
      </div>
      {msg && <p className="admin-msg">{msg}</p>}
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Data</th><th>Nome</th><th>E-mail</th>
              <th>WhatsApp</th><th>Interesses</th><th>Unidade</th><th>Origem</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{new Date(r.criado_em).toLocaleString('pt-BR')}</td>
                <td>{r.nome}</td>
                <td>{r.email}</td>
                <td>{r.whatsapp}</td>
                <td>{r.blocos.join(', ')}</td>
                <td>{r.unidade}</td>
                <td>{[r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(' / ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
