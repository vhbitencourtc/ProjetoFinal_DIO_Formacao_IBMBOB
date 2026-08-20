---
description: Gera um desafio de código aleatório baseado no nível e tecnologia escolhidos pelo usuário.
---

# /desafio

## Como usar

```
/desafio <tecnologia> <nivel>
```

**Exemplos:**
```
/desafio Python iniciante
/desafio React.js intermediário
/desafio Docker avançado
```

> Se o nível for omitido, o assistente utilizará o nível da trilha correspondente em `data/trilhas_dio.json`. Se a tecnologia também for omitida, um desafio completamente aleatório será gerado.

---

## Comportamento

Ao receber este comando, o assistente deve:

1. Identificar a `tecnologia` e o `nivel` fornecidos pelo usuário.
2. Consultar `data/trilhas_dio.json` para confirmar se a tecnologia existe na base — se sim, usar o `nivel` da trilha como padrão caso o usuário não informe.
3. Gerar um desafio de código **aleatório e inédito** adequado ao nível, seguindo o template abaixo.
4. O desafio deve ser **auto-contido**: incluir contexto, enunciado, requisitos, dicas e critérios de avaliação.

---

## Níveis e expectativas

| Nível | Expectativa |
|-------|-------------|
| Iniciante | Lógica básica, sintaxe, estruturas simples (loops, condicionais, funções) |
| Intermediário | POO, APIs, manipulação de dados, padrões de projeto simples |
| Avançado | Algoritmos complexos, performance, arquitetura, concorrência, segurança |

---

## Template de resposta

```
╔══════════════════════════════════════════════════════╗
║          ⚔️  DESAFIO DIO EXPLORER                    ║
╚══════════════════════════════════════════════════════╝

🛠️  Tecnologia : <tecnologia>
📊 Nível       : <nivel>
🎲 Desafio #   : <número aleatório entre 1 e 999>

──────────────────────────────────────────────────────
📋 ENUNCIADO
──────────────────────────────────────────────────────

  <Descrição clara e objetiva do problema a ser resolvido>

──────────────────────────────────────────────────────
✅ REQUISITOS
──────────────────────────────────────────────────────

  1. <Requisito funcional 1>
  2. <Requisito funcional 2>
  3. <Requisito funcional 3>
  (adicionar conforme complexidade do nível)

──────────────────────────────────────────────────────
📥 ENTRADA ESPERADA
──────────────────────────────────────────────────────

  <Descrever formato e exemplo de entrada>

──────────────────────────────────────────────────────
📤 SAÍDA ESPERADA
──────────────────────────────────────────────────────

  <Descrever formato e exemplo de saída>

──────────────────────────────────────────────────────
💡 DICAS
──────────────────────────────────────────────────────

  - <Dica 1 relevante para o nível>
  - <Dica 2>

──────────────────────────────────────────────────────
🏆 CRITÉRIOS DE AVALIAÇÃO
──────────────────────────────────────────────────────

  - Código funcional e correto         (40 pts)
  - Clareza e boas práticas            (30 pts)
  - Tratamento de erros/edge cases     (20 pts)
  - Performance / otimização           (10 pts)
                                      ──────────
                               Total: 100 pts

══════════════════════════════════════════════════════
  🎓 Ao concluir, use /certificado <seu nome> <trilha>
══════════════════════════════════════════════════════
```

---

## Regras

- Cada execução do comando deve gerar um desafio **diferente** — variar o enunciado, contexto e requisitos.
- O número do desafio deve ser gerado aleatoriamente entre 1 e 999.
- Para nível **iniciante**: máximo 3 requisitos, sem uso de bibliotecas externas.
- Para nível **intermediário**: até 5 requisitos, pode sugerir uso de bibliotecas padrão.
- Para nível **avançado**: até 7 requisitos, pode exigir padrões de projeto, testes ou documentação.
- Nunca repetir o mesmo enunciado em execuções consecutivas do mesmo comando.
