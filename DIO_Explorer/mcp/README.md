# DIO Explorer MCP Server

Servidor MCP (Model Context Protocol) do projeto **DIO Explorer**.  
Expõe três ferramentas que podem ser consumidas pelo IBM Bob ou qualquer cliente MCP compatível.

---

## Ferramentas disponíveis

| Tool | Argumento(s) | O que faz |
|---|---|---|
| `trilha` | `tecnologia` | Retorna plano de estudos completo da trilha |
| `desafio` | `tecnologia`, `nivel` (opcional) | Gera desafio de código aleatório |
| `certificado` | `nome`, `trilha` | Gera certificado fictício em Markdown |

---

## Instalação e build

```bash
cd DIO_Explorer/mcp
npm install
npm run build
```

---

## Registro no Bob (stdio local)

Adicione ao seu `mcp.json` (`~/.bob/settings/mcp.json`):

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

## Uso via API / HTTP (futuro)

Para expor o servidor via HTTP, substitua o transport em `src/index.ts`:

```typescript
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
// Configure porta via variável de ambiente:
// MCP_PORT=3333 node build/index.js
```

---

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `MCP_PORT` | `3333` | Porta HTTP (apenas modo HTTP) |
| `DATA_PATH` | relativo ao build | Caminho customizado para `trilhas_dio.json` |

---

## Segurança

- O servidor roda localmente via **stdio** por padrão — sem exposição de rede.
- Para uso em rede, adicione autenticação via **API Key** ou **SSO** no middleware HTTP.
- Nunca exponha este servidor diretamente à internet sem um reverse proxy (nginx/Caddy) com TLS.

---

*DIO Explorer MCP Server — IBM Bob · DIO*
