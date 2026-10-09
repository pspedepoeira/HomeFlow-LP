import { useEffect, useRef, useState } from 'react'

// Up Life Residence: 15 andares × 10 unidades (101–110, 201–210, …, 1501–1510)
export const ANDARES = Array.from({ length: 15 }, (_, i) => ({
  andar: i + 1,
  unidades: Array.from({ length: 10 }, (_, j) => String((i + 1) * 100 + j + 1)),
}))

export default function UnitPicker({ id, value, onChange, invalid }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDown(e) { if (!ref.current?.contains(e.target)) setOpen(false) }
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function toggle(u) {
    const next = value.includes(u) ? value.filter(v => v !== u) : [...value, u]
    onChange(next.sort((a, b) => a - b))
  }

  const resumo = value.length === 0
    ? 'Selecione...'
    : value.length === 1
      ? `Unidade ${value[0]}`
      : `${value.length} unidades: ${value.join(', ')}`

  return (
    <div className="unit-picker" ref={ref}>
      <button
        type="button" id={id}
        className={'unit-toggle' + (invalid ? ' invalido' : '') + (value.length ? '' : ' vazio')}
        aria-haspopup="true" aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>{resumo}</span>
        <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="unit-panel">
          <p className="unit-hint">Você pode selecionar mais de uma unidade.</p>
          {ANDARES.map(({ andar, unidades }) => (
            <div className="unit-andar" key={andar}>
              <span className="unit-andar-label">{andar}º andar</span>
              <div className="unit-grid">
                {unidades.map(u => (
                  <button
                    type="button" key={u}
                    className={'unit-btn' + (value.includes(u) ? ' sel' : '')}
                    aria-pressed={value.includes(u)}
                    onClick={() => toggle(u)}
                  >{u}</button>
                ))}
              </div>
            </div>
          ))}
          <button type="button" className="unit-ok" onClick={() => setOpen(false)}>Concluir</button>
        </div>
      )}
    </div>
  )
}
