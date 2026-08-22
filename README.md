# 🚀 ProjetoFinal DIO — Formação IBM Bob

> Projeto final da **Formação IBM Bob** na plataforma [DIO – Digital Innovation One](https://web.dio.me/).
> Construído inteiramente com o assistente de IA **IBM Bob**, demonstrando como um profissional moderno
> pode usar IA para criar, estruturar, testar e publicar projetos reais do zero.

---

## 📌 Sobre o Projeto

O **DIO Explorer** é uma aplicação educacional que simula o ecossistema de trilhas de aprendizado da DIO.
Ele expõe três funcionalidades principais — consulta de trilhas, geração de desafios e emissão de certificados —
via **slash commands**, **skills do IBM Bob** e um **servidor MCP** (Model Context Protocol).

---

## 🗂️ Estrutura do Repositório

```
ProjetoFinal_DIO_Formacao_IBMBOB/
│
├── .bobignore                  ← Arquivos ignorados pelo IBM Bob
├── .gitignore                  ← Arquivos ignorados pelo Git
├── Hello World.md              ← Primeiro commit do projeto
│
└── DIO_Explorer/
    ├── commands/               ← Documentação dos slash commands
    │   ├── trilha.md
    │   ├── desafio.md
    │   └── certificado.md
    │
    ├── data/
    │   └── trilhas_dio.json    ← 40 trilhas fictícias da DIO
    │
    ├── docs/
    │   ├── GUIA_DE_USO.md      ← Prompts, modos e dicas de uso
    │   ├── INSIGHTS.md         ← Insights para futuros profissionais
    │   └── relatorio_testes.txt← Relatório de testes unitários
    │
    ├── mcp/                    ← Servidor MCP (Model Context Protocol)
    │   ├── src/index.ts        ← Código-fonte TypeScript do servidor
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── README.md
    │
    └── src/
        └── test_commands.js    ← Suite de 30 testes unitários (100% pass)
```

---

## ⚡ Funcionalidades

| Funcionalidade | Como usar | Descrição |
|---|---|---|
| Consultar trilha | `/trilha <tecnologia>` | Plano de estudos com módulos, badges e lives |
| Gerar desafio | `/desafio <tecnologia> [nivel]` | Desafio de código aleatório com critérios |
| Emitir certificado | `/certificado <nome> <trilha>` | Certificado fictício em Markdown |
| Testes unitários | `node src/test_commands.js` | Suite com 30 testes e 100% de cobertura |
| MCP Server | `node mcp/build/index.js` | Servidor MCP com as 3 tools registradas |

---

## 🛠️ Stack Tecnológica

- **IBM Bob** (IA assistente) — toda a construção foi feita via prompts em linguagem natural
- **Node.js / TypeScript** — servidor MCP e testes unitários
- **JSON** — base de dados das trilhas
- **Markdown** — documentação e certificados
- **Git / GitHub** — versionamento e publicação
- **MCP Protocol** — integração com IBM Bob via stdio

---

## 🚦 Como Executar

### Pré-requisitos

- Node.js 18+
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/vhbitencourtc/ProjetoFinal_DIO_Formacao_IBMBOB.git
cd ProjetoFinal_DIO_Formacao_IBMBOB
```

### 2. Instalar dependências do MCP Server

```bash
cd DIO_Explorer/mcp
npm install
npm run build
```

### 3. Executar os testes

```bash
cd DIO_Explorer
node src/test_commands.js
```

### 4. Registrar o MCP Server no IBM Bob

Adicione ao seu `~/.bob/settings/mcp.json`:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": ["CAMINHO_ABSOLUTO/DIO_Explorer/mcp/build/index.js"]
    }
  }
}
```

---

## 📊 Histórico de Commits

| Hash | Descrição |
|---|---|
| `c3085e1` | feat: add DIO Explorer MCP Server |
| `422f8a4` | test: add unit tests suite (100% coverage) |
| `800c132` | feat: add slash commands /trilha, /desafio, /certificado |
| `d3112a9` | chore: add .bobignore |
| `f8446c0` | feat: populate trilhas_dio.json (40 trilhas) |
| `07ee2bb` | feat: add trilhas_dio.json |
| `ee38f67` | feat: create DIO_Explorer project structure |
| `a2ef01a` | feat: add Hello World.md |

---

## 👤 Autor

**Victor Hugo Bitencourt**
- GitHub: [@vhbitencourtc](https://github.com/vhbitencourtc)
- Email: vhbitencourtc@gmail.com
- Formação: IBM Bob — DIO Digital Innovation One

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como projeto final da Formação IBM Bob na DIO.

---

*"Transformando talentos em oportunidades." — DIO*
