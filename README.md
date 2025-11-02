# assistente-visual

Extensão de navegador para melhorar a acessibilidade visual e o conforto durante a navegação — com filtros e ferramentas úteis para pessoas com baixa visão e daltonismo.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Visão geral

O projeto fornece uma extensão (Chrome / Edge compatível) que adiciona ao navegador ferramentas visuais no contexto da página:

- Filtro de luz azul
- Filtro monocromático (grayscale)
- Lupa de inspeção (ampliação)
- Filtros de daltonismo: Protanopia, Deuteranopia, Tritanopia

Os filtros são aplicados via scripts que injetam estilos/SVGs na página ativa. A UI principal está em `popup/` e os scripts em `scripts/`.

## Instalação (modo desenvolvedor)

1. Clone ou baixe este repositório.
2. Abra o Chrome/Edge e acesse chrome://extensions (ou edge://extensions).
3. Ative o "Modo do desenvolvedor" no canto superior direito.
4. Clique em "Carregar sem compactação" (Load unpacked) e selecione a pasta raiz do projeto (onde está `manifest.json`).
5. O ícone da extensão aparecerá na barra de ferramentas; abra uma página e use o popup para ativar as ferramentas.

## Uso

- Abra o popup da extensão.
- Use os botões para ativar/desativar cada ferramenta:
 	- Filtro de Luz Azul
 	- Lupa
 	- Filtro Daltonismo (Monocromático)
 	- Protanopia — simula dificuldade com vermelho
 	- Deuteranopia — simula dificuldade com verde
 	- Tritanopia — simula dificuldade com azul/amarelo

Cada filtro funciona como toggle: ao clicar novamente o mesmo script remove o filtro.

## Filtros de Daltonismo

Arquivos relacionados:

- `scripts/filtro-daltonismo-protanopia.js` — Protanopia (dificuldade com vermelho)
- `scripts/filtro-daltonismo-deuteranopia.js` — Deuteranopia (dificuldade com verde)
- `scripts/filtro-daltonismo-tritanopia.js` — Tritanopia (dificuldade com azul/amarelo)

Como funcionam:

- Cada script injeta um elemento SVG invisível com um `feColorMatrix` que transforma as cores da página.
- O filtro é aplicado ao `document.documentElement` via CSS (`filter: url(#id-do-filtro)`).
- Observação: conteúdo em iframes cross-origin pode não ser afetado.

Limitações e recomendações

- Aplicar um desses filtros sobrescreve/manipula a propriedade `filter` do elemento raiz; se outros scripts aplicarem filtros diretamente nessa propriedade, eles podem ser sobrescritos. Se desejar, posso alterar o comportamento para preservar filtros existentes.
- As matrizes usadas são aproximações visuais; para simulações científicas mais precisas, há algoritmos (ex.: Machado et al.) que podem ser integrados.

## Estrutura do projeto

```
popup/
 ├─ popup.html
 ├─ popup.css
 └─ popup.js
scripts/
 ├─ filtro-luz-azul.js
 ├─ filtro-monocromatico.js
 ├─ lupa.js
 ├─ filtro-daltonismo-protanopia.js
 ├─ filtro-daltonismo-deuteranopia.js
 └─ filtro-daltonismo-tritanopia.js
docs/
 └─ Assistente_Visual.pdf
manifest.json
README.md
```

## Contribuindo

Contribuições são bem-vindas. Para sugerir melhorias ou enviar PRs:

1. Abra uma issue descrevendo a proposta.
2. Crie uma branch com um nome descritivo.
3. Envie um pull request com a descrição das mudanças.

## Licença

Este projeto está licenciado sob a MIT — veja o arquivo `LICENSE`.

## Contato

Se precisar de ajuda com melhorias (preservar filtros, dropdown único, intensidade ajustável), abra uma issue ou solicite aqui que eu implemente a mudança.
