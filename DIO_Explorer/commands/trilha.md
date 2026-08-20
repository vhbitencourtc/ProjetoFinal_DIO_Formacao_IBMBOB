---
description: Recebe o nome de uma tecnologia e retorna um plano de estudos formatado com os módulos da trilha correspondente, baseado no arquivo data/trilhas_dio.json.
---

# /trilha

## Como usar

```
/trilha <nome da tecnologia>
```

**Exemplo:**
```
/trilha Python
/trilha React.js
/trilha AWS
```

---

## Comportamento

Ao receber este comando, o assistente deve:

1. Buscar no arquivo `data/trilhas_dio.json` a trilha cuja propriedade `tecnologia` corresponda (total ou parcialmente, sem distinção de maiúsculas/minúsculas) ao argumento fornecido pelo usuário.
2. Se nenhuma trilha for encontrada, retornar uma mensagem amigável sugerindo tecnologias disponíveis.
3. Se encontrada, retornar um **plano de estudos formatado** conforme o template abaixo.

---

## Template de resposta

```
╔══════════════════════════════════════════════════════╗
║         🎓 PLANO DE ESTUDOS – DIO EXPLORER           ║
╚══════════════════════════════════════════════════════╝

📚 Trilha: <nome>
🛠️  Tecnologia: <tecnologia>
📊 Nível: <nivel>
🧩 Total de Módulos: <numero_de_modulos>
⭐ XP Total: <xp_total> XP

──────────────────────────────────────────────────────
📦 MÓDULOS DA TRILHA
──────────────────────────────────────────────────────

  Módulo 1  – Fundamentos de <tecnologia>
  Módulo 2  – Ambiente de desenvolvimento e configuração
  Módulo 3  – Conceitos intermediários e boas práticas
  Módulo 4  – Projeto prático guiado
  Módulo 5  – Tópicos avançados
  ...até o módulo <numero_de_modulos>

──────────────────────────────────────────────────────
🏅 BADGES DISPONÍVEIS
──────────────────────────────────────────────────────
  <badges_disponiveis listadas com bullet>

──────────────────────────────────────────────────────
📡 LIVES AO VIVO
──────────────────────────────────────────────────────
  <lives_ao_vivo listadas com bullet>

──────────────────────────────────────────────────────
🎟️  PROMOÇÃO ATIVA
──────────────────────────────────────────────────────
  Desconto: <promocoes.desconto>
  Válido até: <promocoes.validade>

♾️  Acesso Vitalício: <sim/não>

══════════════════════════════════════════════════════
  💡 Use /desafio <tecnologia> para iniciar um desafio!
  🏆 Use /certificado <seu nome> <trilha> ao concluir.
══════════════════════════════════════════════════════
```

---

## Regras

- A busca pela tecnologia deve ser **case-insensitive** e aceitar correspondência parcial (ex.: "react" encontra "React.js").
- Se houver mais de uma trilha compatível, listar todas e pedir ao usuário que escolha.
- Os módulos devem ser **gerados dinamicamente** em quantidade igual a `numero_de_modulos`, com títulos progressivos coerentes com a tecnologia.
- Sempre exibir o bloco de promoção, mesmo que o desconto seja `0%`.
