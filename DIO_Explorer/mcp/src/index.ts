#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ─────────────────────────────────────────────────────────
// PATHS
// ─────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(__dirname, "../../data/trilhas_dio.json");

// ─────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────
interface Promocao {
  desconto: string;
  validade: string | null;
}

interface Trilha {
  id: number;
  nome: string;
  tecnologia: string;
  nivel: string;
  numero_de_modulos: number;
  xp_total: number;
  badges_disponiveis: string[];
  promocoes: Promocao;
  vitalicio: boolean;
  lives_ao_vivo: string[];
}

interface TrilhasDB {
  trilhas: Trilha[];
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────
function loadTrilhas(): TrilhasDB {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as TrilhasDB;
}

function findTrilha(db: TrilhasDB, tech: string): Trilha | undefined {
  return db.trilhas.find(
    (t) =>
      t.tecnologia.toLowerCase().includes(tech.toLowerCase()) ||
      t.nome.toLowerCase().includes(tech.toLowerCase())
  );
}

function gerarModulos(trilha: Trilha): string[] {
  const templates = [
    `Fundamentos e sintaxe de ${trilha.tecnologia}`,
    "Ambiente de desenvolvimento e configuração",
    "Estruturas de dados e controle de fluxo",
    "Programação Orientada a Objetos",
    "APIs e integrações externas",
    "Testes unitários e boas práticas",
    "Padrões de projeto (Design Patterns)",
    "Segurança e autenticação",
    "Performance e otimização",
    "Deploy e ambiente de produção",
    "Projeto final guiado",
    "Revisão geral e certificação",
    "Microsserviços e arquitetura distribuída",
    "Monitoramento e observabilidade",
    "Capstone: projeto de portfólio",
    "Preparação para certificação oficial",
  ];
  return Array.from({ length: trilha.numero_de_modulos }, (_, i) => {
    const titulo = templates[i] ?? `Tópico avançado ${i + 1}`;
    return `Módulo ${i + 1} — ${titulo}`;
  });
}

function gerarCertId(): string {
  const ano = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 900000) + 100000);
  return `DIO-${ano}-${rand}`;
}

function dataExtenso(): string {
  const meses = [
    "janeiro","fevereiro","março","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro",
  ];
  const d = new Date();
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

// ─────────────────────────────────────────────────────────
// SERVIDOR MCP
// ─────────────────────────────────────────────────────────
const server = new McpServer({
  name: "dio-explorer-mcp",
  version: "1.0.0",
});

// ── TOOL: trilha ─────────────────────────────────────────
server.registerTool(
  "trilha",
  {
    description:
      "Busca uma trilha DIO pela tecnologia e retorna um plano de estudos completo com módulos, badges, lives e promoções.",
    inputSchema: z.object({
      tecnologia: z
        .string()
        .describe("Nome da tecnologia (ex: Java, Python, React.js, AWS)"),
    }),
  },
  async ({ tecnologia }) => {
    try {
      const db = loadTrilhas();
      const trilha = findTrilha(db, tecnologia);

      if (!trilha) {
        const disponiveis = db.trilhas.map((t) => t.tecnologia).join(", ");
        return {
          content: [
            {
              type: "text",
              text: `❌ Nenhuma trilha encontrada para "${tecnologia}".\n\nTecnologias disponíveis:\n${disponiveis}`,
            },
          ],
          isError: true,
        };
      }

      const modulos = gerarModulos(trilha);
      const linhasModulos = modulos.map((m) => `  ${m}`).join("\n");
      const badges = trilha.badges_disponiveis.map((b) => `  🏅 ${b}`).join("\n");
      const lives = trilha.lives_ao_vivo.map((l) => `  📺 ${l}`).join("\n");
      const promo =
        trilha.promocoes.desconto === "0%"
          ? "Sem promoção ativa"
          : `${trilha.promocoes.desconto} — válido até ${trilha.promocoes.validade ?? "indeterminado"}`;

      const output = `
╔══════════════════════════════════════════════════════╗
║         🎓 PLANO DE ESTUDOS — DIO EXPLORER           ║
╚══════════════════════════════════════════════════════╝

📚 Trilha     : ${trilha.nome}
🛠  Tecnologia : ${trilha.tecnologia}
📊 Nível      : ${trilha.nivel}
🧩 Módulos    : ${trilha.numero_de_modulos}
⭐ XP Total   : ${trilha.xp_total} XP

──────────────────────────────────────────────────────
📦 MÓDULOS
──────────────────────────────────────────────────────
${linhasModulos}

──────────────────────────────────────────────────────
🏅 BADGES DISPONÍVEIS
──────────────────────────────────────────────────────
${badges}

──────────────────────────────────────────────────────
📡 LIVES AO VIVO
──────────────────────────────────────────────────────
${lives}

──────────────────────────────────────────────────────
🎟  PROMOÇÃO
──────────────────────────────────────────────────────
  ${promo}
  ♾  Vitalício: ${trilha.vitalicio ? "Sim" : "Não"}

══════════════════════════════════════════════════════
  💡 Use a tool "desafio" para iniciar um desafio
  🏆 Use a tool "certificado" ao concluir a trilha
══════════════════════════════════════════════════════`.trim();

      return { content: [{ type: "text", text: output }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao carregar trilhas: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ── TOOL: desafio ─────────────────────────────────────────
server.registerTool(
  "desafio",
  {
    description:
      "Gera um desafio de código aleatório baseado na tecnologia e nível. Se o nível for omitido, usa o da trilha correspondente.",
    inputSchema: z.object({
      tecnologia: z.string().describe("Tecnologia do desafio (ex: Java, Python)"),
      nivel: z
        .enum(["Iniciante", "Intermediário", "Avançado"])
        .optional()
        .describe("Nível do desafio (opcional — usa o da trilha se omitido)"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    try {
      const db = loadTrilhas();
      const trilha = findTrilha(db, tecnologia);
      const nivelFinal = nivel ?? trilha?.nivel ?? "Intermediário";
      const desafioId = Math.floor(Math.random() * 999) + 1;

      const enunciados: Record<string, string[]> = {
        Iniciante: [
          `Escreva um programa em ${tecnologia} que leia uma lista de números e retorne a soma, média, maior e menor valor.`,
          `Crie um conversor de temperatura (Celsius ↔ Fahrenheit ↔ Kelvin) em ${tecnologia}.`,
          `Implemente um jogo de adivinhação de número aleatório entre 1 e 100 em ${tecnologia}.`,
        ],
        Intermediário: [
          `Implemente um sistema de cadastro de alunos em ${tecnologia} com operações CRUD completas usando estruturas em memória.`,
          `Crie uma API REST simples em ${tecnologia} com endpoints para listar, criar e deletar tarefas (To-Do List).`,
          `Desenvolva um sistema de login com autenticação por usuário e senha (sem banco de dados) em ${tecnologia}.`,
        ],
        Avançado: [
          `Projete e implemente um sistema de filas de mensagens (pub/sub) em ${tecnologia} com suporte a múltiplos consumidores concorrentes.`,
          `Desenvolva um rate limiter de APIs em ${tecnologia} usando o algoritmo Token Bucket com persistência em memória.`,
          `Implemente um mini ORM em ${tecnologia} que mapeie classes para tabelas e suporte operações de select, insert, update e delete.`,
        ],
      };

      const lista = enunciados[nivelFinal] ?? enunciados["Intermediário"];
      const enunciado = lista[desafioId % lista.length];

      const maxReqs: Record<string, number> = { Iniciante: 3, Intermediário: 5, Avançado: 7 };
      const numReqs = maxReqs[nivelFinal] ?? 5;

      const requisitos = [
        `Código deve executar sem erros.`,
        `Funções e variáveis com nomes descritivos.`,
        `Tratamento de entradas inválidas com mensagens claras.`,
        `Pelo menos um caso de teste coberto.`,
        `Separação de responsabilidades em funções ou classes.`,
        `Documentação inline nos pontos-chave.`,
        `Uso de boas práticas de performance para a tecnologia escolhida.`,
      ].slice(0, numReqs);

      const output = `
╔══════════════════════════════════════════════════════╗
║            ⚔  DESAFIO — DIO EXPLORER                 ║
╚══════════════════════════════════════════════════════╝

🛠  Tecnologia : ${tecnologia}
📊 Nível      : ${nivelFinal}
🎲 Desafio #  : ${desafioId}

──────────────────────────────────────────────────────
📋 ENUNCIADO
──────────────────────────────────────────────────────
  ${enunciado}

──────────────────────────────────────────────────────
✅ REQUISITOS
──────────────────────────────────────────────────────
${requisitos.map((r, i) => `  ${i + 1}. ${r}`).join("\n")}

──────────────────────────────────────────────────────
🏆 CRITÉRIOS DE AVALIAÇÃO
──────────────────────────────────────────────────────
  Código funcional e correto   : 40 pts
  Clareza e boas práticas      : 30 pts
  Tratamento de edge cases     : 20 pts
  Performance / otimização     : 10 pts
                               ────────
                        Total  : 100 pts

══════════════════════════════════════════════════════
  🏆 Use a tool "certificado" ao concluir!
══════════════════════════════════════════════════════`.trim();

      return { content: [{ type: "text", text: output }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao gerar desafio: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ── TOOL: certificado ─────────────────────────────────────
server.registerTool(
  "certificado",
  {
    description:
      "Gera um certificado fictício de conclusão em Markdown com o nome do aluno e os dados da trilha concluída.",
    inputSchema: z.object({
      nome: z.string().describe("Nome completo do aluno"),
      trilha: z.string().describe("Nome da trilha ou tecnologia concluída"),
    }),
  },
  async ({ nome, trilha: trilhaNome }) => {
    try {
      const db = loadTrilhas();
      const trilha = findTrilha(db, trilhaNome);
      const id = gerarCertId();
      const data = dataExtenso();

      const badges = trilha
        ? trilha.badges_disponiveis.map((b) => `🏅 ${b}`).join("\n")
        : "🏅 Conclusão de Trilha Personalizada";

      const cert = `---
tipo: Certificado de Conclusão
emissor: DIO Explorer MCP Server
id: ${id}
gerado_em: ${new Date().toISOString()}
---

# 🏆 CERTIFICADO DE CONCLUSÃO

---

## A DIO – Digital Innovation One certifica que

# ${nome.toUpperCase()}

concluiu com êxito a trilha de conhecimento:

## 📚 ${trilha?.nome ?? trilhaNome}

---

| Campo               | Detalhe                                  |
|---------------------|------------------------------------------|
| 🛠 Tecnologia        | ${trilha?.tecnologia ?? trilhaNome}      |
| 📊 Nível            | ${trilha?.nivel ?? "Personalizado"}      |
| 🧩 Módulos          | ${trilha?.numero_de_modulos ?? "—"} módulos |
| ⭐ XP Conquistado   | ${trilha?.xp_total ?? "—"} XP           |
| 📅 Data de Emissão  | ${data}                                  |
| 🔖 ID do Certificado| ${id}                                    |

---

### 🎖 Badges Conquistadas

${badges}

---

### 📜 Declaração

> Este certificado atesta que **${nome}** demonstrou
> domínio dos conhecimentos e habilidades práticas exigidos pela
> trilha **${trilha?.nome ?? trilhaNome}**, cumprindo todos os módulos,
> desafios e atividades propostos pela plataforma **DIO**.

---

### ✅ Validação

🔗 \`https://web.dio.me/certificate/${id}\`

---

*Emitido via DIO Explorer MCP Server — tool \`certificado\`*
*"Transformando talentos em oportunidades." — DIO*`;

      return { content: [{ type: "text", text: cert }] };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao gerar certificado: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ─────────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 DIO Explorer MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
