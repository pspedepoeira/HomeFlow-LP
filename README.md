# HomeFlow — Landing page de pré-cadastro

Front-end (HTML/CSS/JS puro) servido por um back-end Node.js + Express, com os
cadastros gravados em SQLite (embutido no Node 22, sem dependência nativa).

## Rodar localmente

Requisito: Node.js 22.13 ou superior.

```bash
npm install
cp .env.example .env      # edite o ADMIN_TOKEN
npm start                 # ou: npm run dev (recarrega ao salvar)
```

- Landing page: http://localhost:3000
- Política de privacidade: http://localhost:3000/privacidade
- Painel de leads: http://localhost:3000/admin (pede o ADMIN_TOKEN)

## Imagens

Coloque em `public/assets/` com estes nomes: `logo_HomeFlow.png`,
`Imagem_App_FINAL.png`, `Imagens_Karol_2.jpeg`, `Imagens_Karol1.jpeg`.
Sem elas a página continua funcionando (o logo vira texto).

## API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/pre-cadastro` | Grava o lead. Corpo JSON: `nome`, `email`, `whatsapp`, `blocos[]` (Reforma, Equipamentos e Mobiliário, Planejados e Decoração), `unidades[]` (ex.: `["101", "1502"]`), `consentimento`, `utm_*` |
| GET | `/api/stats` | Total de cadastros |
| GET | `/api/admin/pre-cadastros` | Lista (header `Authorization: Bearer <ADMIN_TOKEN>`) |
| GET | `/api/admin/export.csv` | CSV para Excel (separador `;`) |
| GET | `/api/health` | Healthcheck |

Respostas: `201` novo cadastro, `200` e-mail já existente (dados atualizados),
`422` validação (com `erros` por campo), `429` excesso de tentativas.

## O que o back-end faz

- Valida tudo no servidor (nome completo, e-mail, celular BR com DDD, interesses, unidades, consentimento)
- Não duplica: o mesmo e-mail atualiza o cadastro existente
- Anti-bot: campo honeypot invisível + limite de 10 envios / 10 min por IP
- Guarda apenas um hash do IP (minimização de dados, LGPD)
- Captura `utm_source`, `utm_medium`, `utm_campaign` da URL da página
- Envia cada lead para `WEBHOOK_URL`, se configurada (RD Station, Zapier, Make, n8n…)
- CSV protegido contra injeção de fórmulas no Excel

## Antes de publicar

1. Defina um `ADMIN_TOKEN` forte (`openssl rand -hex 24`).
2. Revise `public/privacidade.html` e preencha os campos entre colchetes.
3. Troque os depoimentos `[Nome], [Cidade]` por depoimentos reais e autorizados — ou remova a seção até tê-los.
5. Atrás de proxy (Nginx, Render, Railway, Cloudflare), use `TRUST_PROXY=1`.
6. Faça backup periódico de `data/homeflow.db`.
# HomeFlow-LP
