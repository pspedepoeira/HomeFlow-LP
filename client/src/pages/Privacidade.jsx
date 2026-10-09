import { Link } from 'react-router-dom'

export default function Privacidade() {
  return (
    <main className="privacidade-main">
      <Link to="/">← Voltar</Link>
      <h1 style={{ marginTop: '20px' }}>Política de Privacidade</h1>
      <p>Última atualização: 9 de outubro de 2026</p>
      <p className="aviso">Texto-modelo. Revise com assessoria jurídica e complete os campos entre colchetes antes de publicar.</p>

      <p>
        Esta Política de Privacidade explica, de forma simples e transparente, como o HomeFlow trata
        os dados pessoais de quem realiza o pré-cadastro nesta página, em conformidade com a Lei
        Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD). O controlador dos dados é
        [RAZÃO SOCIAL], inscrita no CNPJ sob o nº [NÚMERO], com sede em [ENDEREÇO], responsável pelo
        HomeFlow, e o contato do nosso encarregado pelo tratamento de dados pessoais é o e-mail
        contato@homeflow.com.br.
      </p>

      <p>
        Ao se pré-cadastrar, você nos informa seu nome completo, e-mail, número de WhatsApp, os
        serviços e produtos de seu interesse e a unidade ou as unidades que possui no Up Life Residence. Além
        disso, registramos automaticamente a origem da sua visita, quando ela chega por links de
        campanhas (parâmetros UTM), a identificação do navegador utilizado e um código derivado do
        seu endereço IP, gerado de forma irreversível, que não permite recuperar o IP original.
        Não coletamos dados pessoais sensíveis, e esta página não utiliza cookies de rastreamento
        ou de publicidade.
      </p>

      <p>
        Usamos esses dados exclusivamente para organizar a lista de acesso antecipado ao HomeFlow,
        identificar sua unidade no empreendimento, entrar em contato com você pelo e-mail ou pelo
        WhatsApp informados com novidades sobre o lançamento, entender quais canais de divulgação
        funcionam melhor e proteger o formulário contra envios automáticos e abusos. A base legal
        para o tratamento é o seu consentimento, conforme o art. 7º, inciso I, da LGPD, manifestado
        ao marcar a caixa de concordância antes do envio. Os dados técnicos utilizados apenas para
        segurança e prevenção a fraudes são tratados com base no legítimo interesse, nos termos do
        art. 7º, inciso IX, sempre limitados ao mínimo necessário.
      </p>

      <p>
        O HomeFlow não vende, não aluga e não cede seus dados pessoais a terceiros para fins
        comerciais. Podemos compartilhá-los somente com prestadores de serviço que nos apoiam na
        operação, como empresas de hospedagem, envio de e-mails e mensagens e gestão de
        relacionamento com clientes, que atuam como operadores, seguem nossas instruções e estão
        obrigados contratualmente a protegê-los. Também poderemos compartilhar dados quando houver
        obrigação legal ou ordem de autoridade competente. Caso algum desses fornecedores armazene
        dados fora do Brasil, a transferência observará as garantias exigidas pelos arts. 33 a 36
        da LGPD.
      </p>

      <p>
        Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas,
        ou seja, até o encerramento da campanha de pré-lançamento ou até que você peça a exclusão,
        o que acontecer primeiro. Depois disso, os dados são eliminados ou anonimizados, salvo
        quando a lei exigir sua guarda por prazo maior. Adotamos medidas técnicas e
        administrativas razoáveis para protegê-los contra acessos não autorizados, perda ou
        alteração indevida, como acesso restrito por senha à base de cadastros, conexão protegida
        e coleta mínima de informações. Se ocorrer algum incidente de segurança que possa causar
        risco ou dano relevante, comunicaremos você e a Autoridade Nacional de Proteção de Dados
        (ANPD), conforme o art. 48 da LGPD.
      </p>

      <p>
        Como titular, você pode, a qualquer momento e gratuitamente, confirmar se tratamos seus
        dados, acessá-los, corrigir informações incompletas ou desatualizadas, solicitar a
        anonimização, o bloqueio ou a eliminação de dados desnecessários, pedir a portabilidade,
        saber com quem os compartilhamos e revogar o seu consentimento, conforme o art. 18 da LGPD.
        A revogação não afeta o tratamento realizado anteriormente com base no consentimento dado.
        Para exercer esses direitos, basta escrever para contato@homeflow.com.br, e responderemos
        em até 15 dias. Se entender que sua solicitação não foi atendida, você também pode
        apresentar reclamação à ANPD.
      </p>

      <p>
        O pré-cadastro é destinado a maiores de 18 anos, e não coletamos intencionalmente dados de
        crianças ou adolescentes. Esta Política poderá ser atualizada para refletir mudanças no
        HomeFlow ou na legislação; a versão vigente estará sempre disponível nesta página, com a
        data da última atualização, e alterações relevantes serão comunicadas pelos canais que você
        nos informou.
      </p>
    </main>
  )
}
