# REGISTRO_LICENCAS.md — Bella Napoli Visual Research

## ❌ ERRO TÉCNICO: Ferramenta Obrigatória Não Encontrada

### Tentativa de Execução
- **Data/Hora:** 2026-10-31
- **Ferramenta requerida:** `tools/visual-research/search_refs.py`
- **Resultado:** **ARQUIVO NÃO EXISTE** no projeto

### Busca Realizada
```bash
find C:/Users/jhang/Documents/BlanCoAgency-Projetos/bella-napoli -type f -name "*.py" 2>/dev/null
# Resultado: (nenhum arquivo Python encontrado)
```

```bash
glob pattern: **/tools/visual-research/search_refs.py
# Resultado: No files found
```

```bash
glob pattern: **/search_refs.py
# Resultado: No files found
```

### Consequência
- **0 imagens baixadas** para qualquer sabor
- **0 pastas criadas** em `assets/referencias/`
- Pesquisa visual **não pôde ser executada** por ausência da ferramenta obrigatória

---

## Próximos Passos Necessários

Para prosseguir com a pesquisa visual, é necessário:
1. Instalar/criar a ferramenta `tools/visual-research/search_refs.py`
2. Verificar se a ferramenta depende de APIs externas (Unsplash, Pexels, etc.) e configurar credenciais
3. Re-executar a etapa 1/3 após a ferramenta estar disponível

---

## Estrutura Esperada (Quando Ferramenta Estiver Disponível)

```
assets/referencias/
├── margherita/
│   ├── margherita-01.jpg
│   ├── margherita-02.jpg
│   └── margherita-03.jpg
├── calabresa/
│   ├── calabresa-01.jpg
│   ├── calabresa-02.jpg
│   └── calabresa-03.jpg
├── quatro-queijos/
│   ├── quatro-queijos-01.jpg
│   ├── quatro-queijos-02.jpg
│   └── quatro-queijos-03.jpg
└── REGISTRO_LICENCAS.md
```

---

*Documentado conforme regras: erro real reportado, nenhuma imagem inventada, nenhum link fabricado.*