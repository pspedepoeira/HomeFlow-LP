import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import UnitPicker from './UnitPicker'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const BLOCOS = ['Reforma', 'Equipamentos e Mobiliário', 'Planejados e Decoração']

function validateLocal(data) {
  const errors = {}
  if (data.nome.length < 3 || !data.nome.includes(' '))
    errors.nome = 'Informe seu nome completo.'
  if (!EMAIL_RE.test(data.email))
    errors.email = 'Informe um e-mail válido.'
  if (!/^[1-9]{2}9\d{8}$/.test(data.whatsapp.replace(/\D/g, '')))
    errors.whatsapp = 'Informe um WhatsApp válido com DDD.'
  if (!data.blocos.length)
    errors.blocos = 'Selecione pelo menos uma opção.'
  if (!data.unidades.length)
    errors.unidades = 'Selecione sua unidade no Up Life Residence.'
  if (!data.consentimento)
    errors.consentimento = 'É preciso concordar com a Política de Privacidade.'
  return errors
}

function formatPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export default function RegistrationForm({ onSuccess }) {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    nome: '', email: '', whatsapp: '', blocos: [],
    unidades: [], empresa: '', consentimento: false,
  })
  const [errors, setErrors] = useState({})
  const [formMsg, setFormMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('Em breve entraremos em contato com as novidades do lançamento.')

  const utm = {
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'bloco') {
      setForm(f => ({
        ...f,
        blocos: checked ? [...f.blocos, value] : f.blocos.filter(b => b !== value),
      }))
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }))
    } else if (name === 'whatsapp') {
      setForm(f => ({ ...f, whatsapp: formatPhone(value) }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setFormMsg('')

    const data = {
      nome: form.nome.trim().replace(/\s+/g, ' '),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      blocos: BLOCOS.filter(b => form.blocos.includes(b)),
      unidades: form.unidades,
      consentimento: form.consentimento,
      empresa: form.empresa,
      ...utm,
    }

    const errs = validateLocal(data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    try {
      const r = await fetch('/api/pre-cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const j = await r.json()
      if (j.ok) {
        if (j.atualizado) setSuccessMsg(j.mensagem)
        setSuccess(true)
        onSuccess?.()
      } else {
        if (j.erros) setErrors(j.erros)
        setFormMsg(j.mensagem || 'Não foi possível enviar. Tente novamente.')
      }
    } catch {
      setFormMsg('Sem conexão com o servidor. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <section className="dor" id="formulario">
        <div className="container">
          <div className="form-wrap">
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ color: 'var(--lime)', fontSize: '1.4rem', marginBottom: '12px' }}>
                🎉 Pronto! Você está na lista.
              </h3>
              <p style={{ color: 'var(--gray)' }}>{successMsg}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="dor" id="formulario">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Sua casa merece fluir. Comece agora</h2>
          <p className="sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Preencha e garanta sua vaga antecipada — leva menos de 1 minuto.
          </p>
        </div>
        <div className="form-wrap">
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text" id="nome" name="nome" required
              autoComplete="name" placeholder="Seu nome"
              value={form.nome} onChange={handleChange}
              className={errors.nome ? 'invalido' : ''}
            />
            {errors.nome && <p className="erro">{errors.nome}</p>}

            <label htmlFor="email">E-mail</label>
            <input
              type="email" id="email" name="email" required
              autoComplete="email" placeholder="voce@email.com"
              value={form.email} onChange={handleChange}
              className={errors.email ? 'invalido' : ''}
            />
            {errors.email && <p className="erro">{errors.email}</p>}

            <label htmlFor="whats">WhatsApp</label>
            <input
              type="tel" id="whats" name="whatsapp" required
              autoComplete="tel-national" inputMode="numeric" maxLength={15}
              placeholder="(00) 00000-0000"
              value={form.whatsapp} onChange={handleChange}
              className={errors.whatsapp ? 'invalido' : ''}
            />
            {errors.whatsapp && <p className="erro">{errors.whatsapp}</p>}

            <label>Em quais serviços e produtos você tem interesse?</label>
            <div className="checks">
              {BLOCOS.map(b => (
                <label key={b}>
                  <input
                    type="checkbox" name="bloco" value={b}
                    checked={form.blocos.includes(b)} onChange={handleChange}
                  />
                  {b}
                </label>
              ))}
            </div>
            {errors.blocos && <p className="erro">{errors.blocos}</p>}

            <label htmlFor="unidade">Qual a sua Unidade no Up Life Residence?</label>
            <UnitPicker
              id="unidade" value={form.unidades}
              onChange={unidades => setForm(f => ({ ...f, unidades }))}
              invalid={Boolean(errors.unidades)}
            />
            {errors.unidades && <p className="erro">{errors.unidades}</p>}

            {/* Honeypot anti-bot: invisível para pessoas */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text" id="empresa" name="empresa"
                tabIndex={-1} autoComplete="off"
                value={form.empresa} onChange={handleChange}
              />
            </div>

            <label className="consent">
              <input
                type="checkbox" name="consentimento"
                checked={form.consentimento} onChange={handleChange}
              />
              <span>
                Concordo em receber comunicações do HomeFlow sobre o lançamento e li a{' '}
                <Link to="/privacidade" target="_blank" rel="noopener">Política de Privacidade</Link>.
              </span>
            </label>
            {errors.consentimento && <p className="erro">{errors.consentimento}</p>}

            <button type="submit" className="btn" style={{ width: '100%', marginTop: '28px' }} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Garantir minha vaga'}
            </button>
            {formMsg && <p className="form-msg" role="alert">{formMsg}</p>}
            <p className="micro" style={{ textAlign: 'center' }}>Seus dados estão seguros. Sem spam.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
