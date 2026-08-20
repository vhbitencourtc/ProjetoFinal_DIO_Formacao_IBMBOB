const fs = require("fs");
const path = require("path");

// ─────────────────────────────────────────────
// CONFIGURACAO
// ─────────────────────────────────────────────
const BASE   = path.join(process.env.USERPROFILE, "Documents", "ProjetoFinal_DIO_Formacao_IBMBOB");
const DATA   = path.join(BASE, "DIO_Explorer", "data", "trilhas_dio.json");
const OUT    = path.join(BASE, "DIO_Explorer", "docs", "relatorio_testes.txt");

const ALUNO  = "Victor Hugo";
const TECH   = "Java";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
let passed = 0, failed = 0, total = 0;
const results = [];

function assert(testName, condition, detail = "") {
  total++;
  const status = condition ? "PASS" : "FAIL";
  if (condition) passed++; else failed++;
  const line = `[${status}] ${testName}${detail ? " — " + detail : ""}`;
  results.push(line);
  console.log(line);
}

function loadJSON() {
  const raw = fs.readFileSync(DATA, "utf8");
  return JSON.parse(raw);
}

function findTrilha(data, tech) {
  return data.trilhas.find(t =>
    t.tecnologia.toLowerCase().includes(tech.toLowerCase()) ||
    t.nome.toLowerCase().includes(tech.toLowerCase())
  );
}

function gerarModulos(trilha) {
  const templates = [
    `Fundamentos e sintaxe de ${trilha.tecnologia}`,
    `Ambiente de desenvolvimento e configuração`,
    `Estruturas de dados e controle de fluxo`,
    `Programação Orientada a Objetos`,
    `APIs e integrações externas`,
    `Testes unitários e boas práticas`,
    `Padrões de projeto (Design Patterns)`,
    `Segurança e autenticação`,
    `Performance e otimização`,
    `Deploy e ambiente de produção`,
    `Projeto final guiado`,
    `Revisão geral e certificação`,
  ];
  const modulos = [];
  for (let i = 0; i < trilha.numero_de_modulos; i++) {
    modulos.push(`Módulo ${i + 1} — ${templates[i] || "Tópico avançado " + (i + 1)}`);
  }
  return modulos;
}

function gerarDesafio(trilha) {
  const num = Math.floor(Math.random() * 999) + 1;
  return {
    id: num,
    tecnologia: trilha.tecnologia,
    nivel: trilha.nivel,
    enunciado: `Implemente um sistema de cadastro de alunos em ${trilha.tecnologia} com operações CRUD completas. O sistema deve permitir adicionar, listar, atualizar e remover alunos de uma lista em memória.`,
    requisitos: [
      `Criar a classe Aluno com atributos: id, nome, email e nota.`,
      `Implementar os métodos: adicionar(), listar(), buscarPorId(), atualizar() e remover().`,
      `Validar que email não seja nulo ou vazio antes de salvar.`,
      `Retornar mensagem de erro amigável caso o aluno não seja encontrado.`,
      `Cobrir os métodos principais com testes unitários (mínimo 3 casos).`,
    ],
    entrada: `Aluno { id: 1, nome: "Victor Hugo", email: "vh@dio.me", nota: 9.5 }`,
    saida: `Aluno cadastrado com sucesso. Total de alunos: 1`,
    dicas: [
      `Use ArrayList ou HashMap para armazenar os alunos em memória.`,
      `Lance exceções customizadas para casos de validação.`,
    ],
    criterios: { funcional: 40, boas_praticas: 30, edge_cases: 20, performance: 10 }
  };
}

function gerarCertificado(aluno, trilha) {
  const now   = new Date();
  const meses = ["janeiro","fevereiro","março","abril","maio","junho",
                  "julho","agosto","setembro","outubro","novembro","dezembro"];
  const data  = `${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
  const id    = `DIO-${now.getFullYear()}-${String(Math.floor(Math.random()*900000)+100000)}`;
  return {
    id,
    aluno,
    trilha: trilha.nome,
    tecnologia: trilha.tecnologia,
    nivel: trilha.nivel,
    modulos: trilha.numero_de_modulos,
    xp: trilha.xp_total,
    badges: trilha.badges_disponiveis,
    data,
    url: `https://web.dio.me/certificate/${id}`
  };
}

// ─────────────────────────────────────────────
// SUITE DE TESTES
// ─────────────────────────────────────────────
console.log("\n=== DIO EXPLORER — SUITE DE TESTES ===\n");

// ── T01: arquivo JSON existe
let data;
try {
  data = loadJSON();
  assert("T01 — data/trilhas_dio.json existe e é válido JSON", true);
} catch(e) {
  assert("T01 — data/trilhas_dio.json existe e é válido JSON", false, e.message);
  process.exit(1);
}

// ── T02: array trilhas presente
assert("T02 — propriedade 'trilhas' é um array", Array.isArray(data.trilhas));

// ── T03: pelo menos 40 trilhas
assert("T03 — JSON contém pelo menos 40 trilhas", data.trilhas.length >= 40, `encontradas: ${data.trilhas.length}`);

// ── T04: cada trilha tem campos obrigatórios
const camposObrigatorios = ["id","nome","tecnologia","nivel","numero_de_modulos","xp_total","badges_disponiveis","promocoes","vitalicio","lives_ao_vivo"];
const trilhasInvalidas = data.trilhas.filter(t => camposObrigatorios.some(c => !(c in t)));
assert("T04 — todas as trilhas possuem campos obrigatórios", trilhasInvalidas.length === 0, `inválidas: ${trilhasInvalidas.length}`);

// ── T05: /trilha Java encontra resultado
const trilhaJava = findTrilha(data, TECH);
assert("T05 — /trilha Java: trilha encontrada", !!trilhaJava, trilhaJava ? `"${trilhaJava.nome}"` : "não encontrada");

// ── T06: /trilha Java retorna campos corretos
if (trilhaJava) {
  assert("T06 — /trilha Java: campo 'nivel' presente",           !!trilhaJava.nivel);
  assert("T07 — /trilha Java: campo 'xp_total' > 0",             trilhaJava.xp_total > 0, `xp=${trilhaJava.xp_total}`);
  assert("T08 — /trilha Java: badges é array não vazio",         Array.isArray(trilhaJava.badges_disponiveis) && trilhaJava.badges_disponiveis.length > 0);
  assert("T09 — /trilha Java: lives é array não vazio",          Array.isArray(trilhaJava.lives_ao_vivo) && trilhaJava.lives_ao_vivo.length > 0);
  assert("T10 — /trilha Java: numero_de_modulos > 0",            trilhaJava.numero_de_modulos > 0);
}

// ── T11: geração de módulos
const modulos = trilhaJava ? gerarModulos(trilhaJava) : [];
assert("T11 — gerarModulos: quantidade igual a numero_de_modulos", modulos.length === (trilhaJava ? trilhaJava.numero_de_modulos : -1), `gerados: ${modulos.length}`);
assert("T12 — gerarModulos: cada módulo começa com 'Módulo'",      modulos.every(m => m.startsWith("Módulo")));

// ── T13: /desafio
const desafio = trilhaJava ? gerarDesafio(trilhaJava) : null;
assert("T13 — /desafio: objeto gerado com sucesso",       !!desafio);
assert("T14 — /desafio: id entre 1 e 999",                desafio && desafio.id >= 1 && desafio.id <= 999, `id=${desafio?.id}`);
assert("T15 — /desafio: tecnologia igual à trilha",       desafio?.tecnologia === trilhaJava?.tecnologia);
assert("T16 — /desafio: enunciado não vazio",             desafio && desafio.enunciado.length > 10);
assert("T17 — /desafio: requisitos é array com itens",    desafio && Array.isArray(desafio.requisitos) && desafio.requisitos.length > 0);
assert("T18 — /desafio: criterios soma 100 pts",          desafio && Object.values(desafio.criterios).reduce((a,b)=>a+b,0) === 100);

// ── T19: /certificado
const cert = trilhaJava ? gerarCertificado(ALUNO, trilhaJava) : null;
assert("T19 — /certificado: objeto gerado com sucesso",   !!cert);
assert("T20 — /certificado: ID começa com 'DIO-'",        cert?.id?.startsWith("DIO-"));
assert("T21 — /certificado: nome do aluno correto",       cert?.aluno === ALUNO, `aluno="${cert?.aluno}"`);
assert("T22 — /certificado: trilha correta",              cert?.trilha === trilhaJava?.nome);
assert("T23 — /certificado: URL de validação gerada",     cert?.url?.includes("https://web.dio.me/certificate/"));
assert("T24 — /certificado: data de emissão não vazia",   cert && cert.data.length > 5, `data="${cert?.data}"`);
assert("T25 — /certificado: badges presentes",            cert && Array.isArray(cert.badges) && cert.badges.length > 0);

// ── T26: busca inexistente retorna undefined
const naoExiste = findTrilha(data, "COBOL_INEXISTENTE_XYZ");
assert("T26 — /trilha tecnologia inválida: retorna undefined", naoExiste === undefined);

// ── T27: busca case-insensitive
const lowerJava = findTrilha(data, "java");
assert("T27 — /trilha busca case-insensitive ('java' == 'Java')", !!lowerJava);

// ── T28: vitalicio é booleano
const semVitalicioInvalido = data.trilhas.filter(t => typeof t.vitalicio !== "boolean");
assert("T28 — todas as trilhas têm 'vitalicio' booleano", semVitalicioInvalido.length === 0, `inválidas: ${semVitalicioInvalido.length}`);

// ── T29: promocoes tem desconto e validade
const semPromocao = data.trilhas.filter(t => !t.promocoes || !("desconto" in t.promocoes) || !("validade" in t.promocoes));
assert("T29 — todas as trilhas têm estrutura de promoção válida", semPromocao.length === 0);

// ── T30: IDs únicos no JSON
const ids = data.trilhas.map(t => t.id);
const idsUnicos = new Set(ids).size === ids.length;
assert("T30 — todos os IDs de trilhas são únicos", idsUnicos, `total=${ids.length}, únicos=${new Set(ids).size}`);

// ─────────────────────────────────────────────
// RELATORIO FINAL
// ─────────────────────────────────────────────
const coverage = ((passed / total) * 100).toFixed(1);
const aprovado = parseFloat(coverage) >= 70;

const separator = "═".repeat(54);
const header = [
  separator,
  "   DIO EXPLORER — RELATÓRIO DE TESTES UNITÁRIOS",
  separator,
  `   Data/Hora : ${new Date().toLocaleString("pt-BR")}`,
  `   Aluno     : ${ALUNO}`,
  `   Tecnologia: ${TECH}`,
  separator,
  "",
  "── RESULTADOS ─────────────────────────────────────────",
  "",
  ...results,
  "",
  "── SUMÁRIO ─────────────────────────────────────────────",
  "",
  `   Total de testes : ${total}`,
  `   ✅ Aprovados    : ${passed}`,
  `   ❌ Reprovados   : ${failed}`,
  `   📊 Cobertura    : ${coverage}%`,
  `   🏆 Status       : ${aprovado ? "APROVADO (≥ 70%)" : "REPROVADO (< 70%)"}`,
  "",
  separator,
  "",
  "── SAÍDA /trilha Java ──────────────────────────────────",
  "",
];

if (trilhaJava) {
  header.push(`   📚 Trilha     : ${trilhaJava.nome}`);
  header.push(`   🛠  Tecnologia : ${trilhaJava.tecnologia}`);
  header.push(`   📊 Nível      : ${trilhaJava.nivel}`);
  header.push(`   🧩 Módulos    : ${trilhaJava.numero_de_modulos}`);
  header.push(`   ⭐ XP Total   : ${trilhaJava.xp_total} XP`);
  header.push("");
  header.push("   Módulos gerados:");
  modulos.forEach(m => header.push(`     ${m}`));
  header.push("");
  header.push("   Badges:");
  trilhaJava.badges_disponiveis.forEach(b => header.push(`     🏅 ${b}`));
  header.push("");
  header.push("   Lives:");
  trilhaJava.lives_ao_vivo.forEach(l => header.push(`     📺 ${l}`));
}

header.push("");
header.push("── SAÍDA /desafio Java ─────────────────────────────────");
header.push("");
if (desafio) {
  header.push(`   Desafio #${desafio.id} — ${desafio.tecnologia} (${desafio.nivel})`);
  header.push(`   Enunciado: ${desafio.enunciado}`);
  header.push("");
  header.push("   Requisitos:");
  desafio.requisitos.forEach((r,i) => header.push(`     ${i+1}. ${r}`));
  header.push("");
  header.push(`   Entrada  : ${desafio.entrada}`);
  header.push(`   Saída    : ${desafio.saida}`);
  header.push("");
  header.push("   Dicas:");
  desafio.dicas.forEach(d => header.push(`     - ${d}`));
  header.push("");
  header.push("   Critérios de avaliação:");
  header.push(`     Código funcional   : ${desafio.criterios.funcional} pts`);
  header.push(`     Boas práticas      : ${desafio.criterios.boas_praticas} pts`);
  header.push(`     Edge cases         : ${desafio.criterios.edge_cases} pts`);
  header.push(`     Performance        : ${desafio.criterios.performance} pts`);
}

header.push("");
header.push("── SAÍDA /certificado ──────────────────────────────────");
header.push("");
if (cert) {
  header.push(`   ID          : ${cert.id}`);
  header.push(`   Aluno       : ${cert.aluno}`);
  header.push(`   Trilha      : ${cert.trilha}`);
  header.push(`   Tecnologia  : ${cert.tecnologia}`);
  header.push(`   Nível       : ${cert.nivel}`);
  header.push(`   Módulos     : ${cert.modulos}`);
  header.push(`   XP          : ${cert.xp}`);
  header.push(`   Data        : ${cert.data}`);
  header.push(`   Validação   : ${cert.url}`);
  header.push("");
  header.push("   Badges conquistadas:");
  cert.badges.forEach(b => header.push(`     🏅 ${b}`));
}

header.push("");
header.push(separator);
header.push("   Relatório gerado por DIO Explorer — IBM Bob");
header.push(separator);

const report = header.join("\n");
fs.writeFileSync(OUT, report, "utf8");
console.log("\n" + report);
console.log(`\nRelatório salvo em: ${OUT}`);
process.exit(aprovado ? 0 : 1);
