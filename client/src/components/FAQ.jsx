export default function FAQ() {
  return (
    <section id="faq">
      <div className="container" style={{ maxWidth: '760px' }}>
        <h2 style={{ textAlign: 'center' }}>Perguntas frequentes</h2>
        <p className="sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          Tudo o que você precisa saber antes do lançamento.
        </p>
        <details open>
          <summary>O pré-cadastro é grátis?</summary>
          <p>Sim, 100% grátis e sem compromisso. Você entra na lista antecipada e não paga nada por isso.</p>
        </details>
        <details>
          <summary>Quantas vagas serão disponibilizadas para o HomeFlow?</summary>
          <p>Para o empreendimento Up Life Residence, inicialmente serão disponibilizadas apenas 50 vagas.</p>
        </details>
        <details>
          <summary>Quando o App vai lançar?</summary>
          <p>Estamos na fase final. Quem está na lista antecipada recebe acesso primeiro e as
          novidades em primeira mão.</p>
        </details>
        <details>
          <summary>Quais serviços vou encontrar?</summary>
          <p>Três blocos completos: Reforma (piso, revestimento, gesso, iluminação e pintura), Equipamentos
          e Mobiliário (ar-condicionado, fechadura eletrônica, aquecedor, box, sacada, espelho e linha branca) e
          Planejados/Decoração (móvel planejado e item de decoração).</p>
        </details>
        <details>
          <summary>Posso comprar produtos e contratar serviços com outros fornecedores ou profissionais?</summary>
          <p>Sim. Entretanto, isso exigirá inserir manualmente tal demanda no cronograma de sua obra e uma
          coordenação extra.</p>
        </details>
        <details>
          <summary>Meus dados estão seguros?</summary>
          <p>Sim. Usamos suas informações apenas para o pré-cadastro e a comunicação sobre o
          lançamento. Sem spam, prometido.</p>
        </details>
        <details>
          <summary>Como vou receber as propostas?</summary>
          <p>Direto no App: todos os itens e serviços serão disponibilizados no App com descrição
          e valor.</p>
        </details>
        <details>
          <summary>Quem receberá os itens adquiridos por meio do HomeFlow?</summary>
          <p>O HomeFlow terá um profissional coordenador que receberá os itens e guardará em seu
          imóvel, de acordo com o cronograma de entregas e serviços organizado pelo App com auxílio
          da IA.</p>
        </details>
        <details>
          <summary>Como poderei interagir com a coordenação do HomeFlow?</summary>
          <p>Você poderá abrir um chamado direto no App. Além disso, em cada compra você poderá
          registrar uma observação. Teremos também um canal de suporte disponível para você.</p>
        </details>
        <details>
          <summary>Poderei propor alterações nos projetos de planejados, gesso, iluminação e decoração?</summary>
          <p>Sim, o App oferecerá os serviços de customização de projetos, que poderão ser
          contratados por você.</p>
        </details>
      </div>
    </section>
  )
}
