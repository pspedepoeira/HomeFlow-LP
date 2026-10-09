'use strict';
/**
 * HomeFlow — back-end da landing page de pré-cadastro.
 *
 * Rotas:
 *   GET  /                        → landing page (public/index.html)
 *   POST /api/pre-cadastro        → grava um pré-cadastro
 *   GET  /api/stats               → total de cadastros (público, p/ contador de vagas)
 *   GET  /api/admin/pre-cadastros → lista em JSON  (exige ADMIN_TOKEN)
 *   GET  /api/admin/export.csv    → exporta CSV    (exige ADMIN_TOKEN)
 *   GET  /api/health              → healthcheck
 */
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const { DatabaseSync } = require('node:sqlite');

// ---------- Configuração ----------
const PORT = Number(process.env.PORT) || 3000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'homeflow.db');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const WEBHOOK_URL = process.env.WEBHOOK_URL || ''; // opcional: CRM / e-mail marketing
const TRUST_PROXY = process.env.TRUST_PROXY === '1';

const BLOCOS = ['Reforma', 'Equipamentos e Mobiliário', 'Planejados e Decoração'];
// Up Life Residence: 15 andares × 10 unidades (101–110, 201–210, …, 1501–1510)
const UNIDADES = new Set(
  Array.from({ length: 150 }, (_, i) => String((Math.floor(i / 10) + 1) * 100 + (i % 10) + 1)),
);

// ---------- Banco de dados ----------
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS pre_cadastros (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    whatsapp      TEXT NOT NULL,
    fase          TEXT NOT NULL,
    blocos        TEXT NOT NULL DEFAULT '[]',
    consentimento INTEGER NOT NULL DEFAULT 0,
    utm_source    TEXT,
    utm_medium    TEXT,
    utm_campaign  TEXT,
    ip_hash       TEXT,
    user_agent    TEXT,
    criado_em     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    atualizado_em TEXT
  );
`);
// Migração: coluna da unidade no Up Life Residence (bancos criados antes dela)
if (!db.prepare('PRAGMA table_info(pre_cadastros)').all().some((c) => c.name === 'unidade')) {
  db.exec('ALTER TABLE pre_cadastros ADD COLUMN unidade TEXT');
}

const stmtFindByEmail = db.prepare('SELECT id FROM pre_cadastros WHERE email = ?');
const stmtInsert = db.prepare(`
  INSERT INTO pre_cadastros
    (nome, email, whatsapp, fase, blocos, unidade, consentimento, utm_source, utm_medium, utm_campaign, ip_hash, user_agent)
  VALUES (?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?)`);
const stmtUpdate = db.prepare(`
  UPDATE pre_cadastros
     SET nome = ?, whatsapp = ?, blocos = ?, unidade = ?, consentimento = ?,
         atualizado_em = strftime('%Y-%m-%dT%H:%M:%fZ','now')
   WHERE email = ?`);
const stmtCount = db.prepare('SELECT COUNT(*) AS total FROM pre_cadastros');
const stmtAll = db.prepare('SELECT * FROM pre_cadastros ORDER BY id DESC');

// ---------- Validação ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v, max = 200) {
  return typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '';
}

function validar(body) {
  const erros = {};
  const nome = clean(body.nome, 120);
  const email = clean(body.email, 160).toLowerCase();
  const whatsDigits = clean(body.whatsapp, 30).replace(/\D/g, '');
  const blocos = Array.isArray(body.blocos)
    ? BLOCOS.filter((b) => body.blocos.includes(b))
    : [];
  const unidades = Array.isArray(body.unidades)
    ? [...new Set(body.unidades.map((u) => clean(String(u), 4)).filter((u) => UNIDADES.has(u)))].sort((a, b) => a - b)
    : [];
  const consentimento = body.consentimento === true;

  if (nome.length < 3 || !nome.includes(' ')) erros.nome = 'Informe seu nome completo.';
  if (!EMAIL_RE.test(email)) erros.email = 'Informe um e-mail válido.';
  // Celular BR: DDD (2) + 9 dígitos, opcionalmente com 55 na frente
  let whats = whatsDigits.startsWith('55') && whatsDigits.length === 13 ? whatsDigits.slice(2) : whatsDigits;
  if (!/^[1-9]{2}9\d{8}$/.test(whats)) erros.whatsapp = 'Informe um WhatsApp válido com DDD.';
  if (!blocos.length) erros.blocos = 'Selecione pelo menos uma opção.';
  if (!unidades.length) erros.unidades = 'Selecione sua unidade no Up Life Residence.';
  if (!consentimento) erros.consentimento = 'É preciso concordar com a Política de Privacidade.';

  return {
    erros,
    dados: { nome, email, whatsapp: '+55' + whats, blocos, unidades, consentimento },
  };
}

// ---------- Rate limit simples em memória (por IP) ----------
const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_JANELA = 10;
const hits = new Map();
function rateLimit(req, res, next) {
  const agora = Date.now();
  const ip = req.ip || 'desconhecido';
  const lista = (hits.get(ip) || []).filter((t) => agora - t < JANELA_MS);
  if (lista.length >= MAX_POR_JANELA) {
    return res.status(429).json({ ok: false, mensagem: 'Muitas tentativas. Tente novamente em alguns minutos.' });
  }
  lista.push(agora);
  hits.set(ip, lista);
  next();
}
setInterval(() => {
  const agora = Date.now();
  for (const [ip, lista] of hits) {
    const v = lista.filter((t) => agora - t < JANELA_MS);
    v.length ? hits.set(ip, v) : hits.delete(ip);
  }
}, JANELA_MS).unref();

function hashIp(ip) {
  // Guarda só um hash (LGPD: minimização de dados), útil para detectar abuso.
  return crypto.createHash('sha256').update(String(ip) + (ADMIN_TOKEN || 'homeflow')).digest('hex').slice(0, 16);
}

function exigirAdmin(req, res, next) {
  if (!ADMIN_TOKEN) return res.status(503).json({ ok: false, mensagem: 'ADMIN_TOKEN não configurado no servidor.' });
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.query.token || '';
  const a = Buffer.from(String(token));
  const b = Buffer.from(ADMIN_TOKEN);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ ok: false, mensagem: 'Não autorizado.' });
  }
  next();
}

async function enviarWebhook(payload) {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error('[webhook] falhou:', err.message);
  }
}

// ---------- App ----------
const app = express();
app.disable('x-powered-by');
if (TRUST_PROXY) app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  next();
});
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'], maxAge: '1h' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/stats', (req, res) => {
  res.json({ ok: true, total: stmtCount.get().total });
});

app.post('/api/pre-cadastro', rateLimit, (req, res) => {
  const body = req.body || {};

  // Honeypot anti-bot: campo invisível que humanos não preenchem.
  if (clean(body.empresa)) return res.status(201).json({ ok: true, mensagem: 'Cadastro recebido.' });

  const { erros, dados } = validar(body);
  if (Object.keys(erros).length) {
    return res.status(422).json({ ok: false, mensagem: 'Verifique os campos destacados.', erros });
  }

  const jaExiste = stmtFindByEmail.get(dados.email);

  try {
    if (jaExiste) {
      stmtUpdate.run(dados.nome, dados.whatsapp, JSON.stringify(dados.blocos), dados.unidades.join(', '), 1, dados.email);
    } else {
      stmtInsert.run(
        dados.nome, dados.email, dados.whatsapp, JSON.stringify(dados.blocos), dados.unidades.join(', '), 1,
        clean(body.utm_source, 80) || null,
        clean(body.utm_medium, 80) || null,
        clean(body.utm_campaign, 80) || null,
        hashIp(req.ip),
        clean(req.get('user-agent'), 250) || null,
      );
    }
  } catch (err) {
    console.error('[db] erro ao gravar:', err);
    return res.status(500).json({ ok: false, mensagem: 'Erro interno. Tente novamente em instantes.' });
  }

  enviarWebhook({ evento: jaExiste ? 'pre_cadastro_atualizado' : 'pre_cadastro_novo', ...dados });

  res.status(jaExiste ? 200 : 201).json({
    ok: true,
    atualizado: Boolean(jaExiste),
    mensagem: jaExiste ? 'Você já estava na lista — atualizamos seus dados.' : 'Você está na lista.',
  });
});

app.get('/api/admin/pre-cadastros', exigirAdmin, (req, res) => {
  const linhas = stmtAll.all().map((r) => ({ ...r, blocos: JSON.parse(r.blocos) }));
  res.json({ ok: true, total: linhas.length, dados: linhas });
});

app.get('/api/admin/export.csv', exigirAdmin, (req, res) => {
  const cols = ['id', 'criado_em', 'nome', 'email', 'whatsapp', 'blocos', 'unidade', 'utm_source', 'utm_medium', 'utm_campaign'];
  const esc = (v) => {
    let s = v == null ? '' : String(v);
    if (/^[=+\-@\t\r]/.test(s) && !/^\+\d+$/.test(s)) s = "'" + s; // evita injeção de fórmula no Excel
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const linhas = stmtAll.all().map((r) =>
    cols.map((c) => esc(c === 'blocos' ? JSON.parse(r.blocos).join('; ') : r[c])).join(';'),
  );
  res.set({
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': 'attachment; filename="homeflow-pre-cadastros.csv"',
  });
  res.send('﻿' + [cols.join(';'), ...linhas].join('\r\n'));
});

app.use('/api', (req, res) => res.status(404).json({ ok: false, mensagem: 'Rota não encontrada.' }));
app.use((req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

if (require.main === module) {
  app.listen(PORT, () => console.log(`HomeFlow rodando em http://localhost:${PORT}`));
}
module.exports = app;
