---
description: Gera um certificado de conclusão em Markdown com o nome do usuário e a trilha concluída.
---

# /certificado

## Como usar

```
/certificado <nome do usuário> <nome da trilha>
```

**Exemplos:**
```
/certificado "Victor Hugo" "Formação Python Developer"
/certificado "Maria Silva" "Formação React Developer"
```

---

## Comportamento

Ao receber este comando, o assistente deve:

1. Receber o **nome do usuário** e o **nome da trilha** como argumentos.
2. Consultar `data/trilhas_dio.json` para obter os detalhes da trilha (tecnologia, nível, XP, badges).
3. Gerar a **data atual** automaticamente no formato `DD de Mês por extenso de AAAA`.
4. Produzir um certificado completo em Markdown seguindo o template abaixo.
5. Sugerir ao usuário salvar o arquivo como `docs/certificados-emitidos/<nome-usuario>-<trilha>.md`.

---

## Template de resposta

```markdown
---
tipo: Certificado de Conclusão
emissor: DIO Explorer
gerado_em: <data atual ISO 8601>
---

# 🏆 CERTIFICADO DE CONCLUSÃO

---

## A DIO – Digital Innovation One certifica que

# <NOME DO USUÁRIO>

concluiu com êxito a trilha de conhecimento:

## 📚 <nome da trilha>

---

| Campo              | Detalhe                        |
|--------------------|-------------------------------|
| 🛠️ Tecnologia      | <tecnologia>                  |
| 📊 Nível           | <nivel>                       |
| 🧩 Módulos         | <numero_de_modulos> módulos   |
| ⭐ XP Conquistado  | <xp_total> XP                 |
| 📅 Data de Emissão | <data por extenso>            |
| 🔖 ID do Cert.     | DIO-<ano><random 6 dígitos>   |

---

### 🎖️ Badges conquistadas

<lista de badges da trilha, uma por linha com emoji 🏅>

---

### 📜 Declaração

> Este certificado atesta que **<NOME DO USUÁRIO>** demonstrou
> domínio dos conhecimentos e habilidades práticas exigidos pela
> trilha **<nome da trilha>**, cumprindo todos os módulos,
> desafios e atividades propostos pela plataforma **DIO**.

---

### ✅ Validação

Este certificado pode ser validado em:
🔗 `https://web.dio.me/certificate/DIO-<ID>`

---

*Emitido por DIO Explorer — gerado via slash command `/certificado`*
*"Transformando talentos em oportunidades." — DIO*
```

---

## Regras

- O **ID do certificado** deve ser gerado com o ano atual + 6 dígitos aleatórios (ex.: `DIO-2025-847362`).
- O **nome do usuário** deve aparecer em CAIXA ALTA no título e com capitalização normal no corpo.
- Se a trilha não for encontrada em `data/trilhas_dio.json`, gerar o certificado com os dados fornecidos pelo usuário, sinalizando que a trilha é personalizada.
- O arquivo deve ser salvo (ou sugerido para salvar) em `docs/certificados-emitidos/` com o nome no formato `<nome-usuario>_<slug-trilha>_cert.md`.
- A pasta `docs/certificados-emitidos/` está listada no `.bobignore` — lembrar o usuário disso caso queira versionar o certificado manualmente.
- Sempre exibir o bloco de badges, mesmo que a lista esteja vazia.
