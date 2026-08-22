# 📖 Guia de Uso — DIO Explorer

> Documento de referência completo com todos os prompts utilizados na construção do projeto,
> modos de uso, dicas práticas e boas práticas para trabalhar com o IBM Bob.

---

## 1. Prompts Utilizados na Construção do Projeto

Esta seção registra, em ordem cronológica, todos os prompts que guiaram a criação do projeto
do zero até a documentação final.

---

### 🔹 Fase 1 — Setup Inicial e Git

**Prompt 1 — Configuração do Git**
```
Meu amigo Bob, quero que você configure o git globalmente para usar o
credential.helper store, garantindo que as credenciais fiquem salvas de
forma persistente no ambiente local do usuário e não em nenhum arquivo de projeto.
```
> 💡 *O Bob executou `git config --global credential.helper store` e confirmou a configuração.*

---

**Prompt 2 — Clone do repositório**
```
Bob, clone o seguinte repositório dentro de ~/Documents/
https://github.com/vhbitencourtc/ProjetoFinal_DIO_Formacao_IBMBOB.git
```
> 💡 *O Bob usou `git clone` com o caminho absoluto via `$env:USERPROFILE`.*

---

**Prompt 3 — Primeiro arquivo**
```
Quero que dentro do meu repositório clonado (...) você crie um arquivo md
chamado Hello World e que tenha apenas essa mensagem.
```
> 💡 *O Bob criou o arquivo, configurou a identidade Git e fez o primeiro push para origin/main.*

---

### 🔹 Fase 2 — Estrutura do Projeto

**Prompt 4 — Criar estrutura de pastas**
```
Quero que dentro do repositório clonado você crie a seguinte estrutura de
projeto "DIO_Explorer" dentro vai ter que ter uma pasta com src, data,
commands, mcp e docs.
```
> 💡 *O Bob criou as 5 pastas e adicionou `.gitkeep` em cada uma para que o Git as versionasse.*

---

**Prompt 5 — Criar arquivo de dados**
```
Dentro da pasta data, quero que crie um arquivo chamado trilhas_dio.json
```
> 💡 *Arquivo criado, commitado e publicado.*

---

**Prompt 6 — Popular o JSON com dados ricos**
```
Dentro do arquivo trilhas_dio.json crie uma lista extensa e detalhada de pelo
menos 40 trilhas fictícias da DIO contendo: NOMES, TECNOLOGIA, NÍVEL, NÚMERO
DE MÓDULOS, XP TOTAL, BADGES DISPONÍVEIS, PROMOÇÕES, VITALÍCIOS E LIVES AO VIVO.
```
> 💡 *O Bob gerou 40 trilhas completas com todos os campos solicitados via PowerShell + JSON.*

---

### 🔹 Fase 3 — Slash Commands e Skills

**Prompt 7 — Criar arquivo .bobignore**
```
Bob, crie um arquivo .bobignore na raiz do projeto. Dentro desse bobignore
quero que ele ignore as pastas node_modules, arquivo .env, pasta com
data/cache-progresso, certificados gerados docs/certificados-emitidos e
qualquer outros arquivos com extensão .tmp
```
> 💡 *Criado com 5 regras de ignore bem documentadas.*

---

**Prompt 8 — Documentação dos slash commands**
```
Dentro da pasta data, quero que crie um arquivo chamado trilhas_dio.json [...]
crie uma lista extensa [...] e gere um arquivo de /desafio para o aluno e um
/certificado para o mesmo.
```
> 💡 *Criados `commands/trilha.md`, `commands/desafio.md` e `commands/certificado.md`.*

---

**Prompt 9 — Skills locais do IBM Bob**
```
Bob, quero que você crie um slash command dentro do projeto que possa ser
invocado pelo comando /trilha [...] /desafio [...] /certificado [...]
Todos esses slash commands têm que ficar armazenados de forma local, para
serem executados apenas neste projeto. Mas devo visualizá-los aqui no chat do BOB.
```
> 💡 *O Bob criou 3 `SKILL.md` em `.bob/skills/` com frontmatter, descriptions e templates formatados.*

---

### 🔹 Fase 4 — Testes

**Prompt 10 — Suite de testes unitários**
```
Bob, quero que você crie arquivos de teste unitários e TESTE ESTES fluxos para
atingir uma cobertura de 70% de aprovação. Teste os comandos /trilha para
consultar trilhas de JAVA, gere um arquivo de /desafio para o aluno e um
/certificado para o mesmo. Grave os resultados em um arquivo txt.
```
> 💡 *O Bob criou um script Node.js com 30 casos de teste cobrindo JSON, /trilha, /desafio,
> /certificado e edge cases. Resultado: 100% de aprovação (meta: 70%).*

---

### 🔹 Fase 5 — MCP Server

**Prompt 11 — Servidor MCP**
```
Bob, quero que você crie um MCP SERVER do projeto recém clonado para que
futuramente pessoas possam vir acessar por meio de um servidor HTTPS ou SSO
ou via API. Use a pasta mcp para isso.
```
> 💡 *O Bob scaffoldou um servidor MCP completo em TypeScript com 3 tools registradas,
> fez o build, registrou no `mcp.json` e publicou no GitHub.*

---

### 🔹 Fase 6 — Documentação

**Prompt 12 — Documentação completa**
```
Bob, quero que você documente todo o projeto feito até o momento, com todos os
prompts usados, modos de uso, dicas de uso e insights para futuros profissionais
que vão aprender com o nosso.
```
> 💡 *Este próprio documento é o resultado desse prompt.*

---

## 2. Modos de Uso do IBM Bob

### 🟣 Modo Agent (padrão para coding)
Usado para escrever código, criar arquivos, executar comandos e fazer commits.

**Quando usar:** criação de arquivos, refatoração, testes, builds, git.

```
Exemplos de prompts no modo Agent:
- "Crie um arquivo X com o conteúdo Y"
- "Execute o script Z e me mostre o resultado"
- "Faça commit e push das alterações"
```

---

### 🔵 Modo Plan
Usado para planejar antes de implementar. O Bob não escreve código — apenas planeja.

**Quando usar:** antes de iniciar uma feature complexa, para revisar arquitetura.

```
Exemplo:
- "Planeje como estruturar um servidor MCP para este projeto"
- "Quais são as etapas para adicionar autenticação JWT neste servidor?"
```

---

### 🟢 Modo Ask
Usado para perguntas sobre o Bob, suas ferramentas e configurações.

**Quando usar:** dúvidas sobre features do Bob, MCP servers, skills.

```
Exemplo:
- "Como funciona o sistema de skills do Bob?"
- "Quais MCP servers estão disponíveis?"
```

---

## 3. Skills Criadas neste Projeto

As skills ficam em `.bob/skills/` e são invocadas no chat com `/nome-da-skill`:

| Skill | Comando | Arquivo |
|---|---|---|
| Trilha | `/trilha <tecnologia>` | `.bob/skills/trilha/SKILL.md` |
| Desafio | `/desafio <tecnologia> [nivel]` | `.bob/skills/desafio/SKILL.md` |
| Certificado | `/certificado <nome> <trilha>` | `.bob/skills/certificado/SKILL.md` |

> ⚠️ Skills só ficam disponíveis a partir da **próxima conversa** após serem criadas.

---

## 4. Dicas Práticas de Uso do IBM Bob

### 💡 Dica 1 — Seja específico nos prompts
Quanto mais contexto você der, melhor o resultado.

```
❌ "Crie um arquivo de testes"
✅ "Crie testes unitários em Node.js puro para as funções findTrilha() e gerarModulos()
    do arquivo data/trilhas_dio.json, com pelo menos 10 casos de teste cobrindo
    casos válidos e edge cases. Salve em src/test_commands.js"
```

---

### 💡 Dica 2 — Use o modo certo para cada tarefa
- Coding → **Agent**
- Planejamento → **Plan**
- Dúvidas sobre o Bob → **Ask**

---

### 💡 Dica 3 — Peça commit + push junto
O Bob pode criar arquivos, commitar e publicar no GitHub em um único prompt.

```
"Crie o arquivo X, faça commit com mensagem Y e suba para o repositório remoto."
```

---

### 💡 Dica 4 — Itere sobre os resultados
Não precisa ser perfeito no primeiro prompt. Refine progressivamente.

```
"Agora adicione mais 5 casos de teste para edge cases"
"Melhore o formato do certificado adicionando uma tabela de dados"
```

---

### 💡 Dica 5 — Use skills para workflows recorrentes
Se você executa o mesmo fluxo com frequência, crie uma skill.
O Bob vai invocar automaticamente quando detectar o padrão no chat.

---

### 💡 Dica 6 — MCP Servers para integrações externas
Para conectar o Bob a APIs externas (Appwrite, GitHub, Banco de dados),
use MCP Servers registrados em `~/.bob/settings/mcp.json`.

---

## 5. Referências

- [IBM Bob — Documentação oficial](https://ibm.com)
- [DIO — Digital Innovation One](https://web.dio.me/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Repositório do projeto](https://github.com/vhbitencourtc/ProjetoFinal_DIO_Formacao_IBMBOB)
