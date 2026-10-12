# Eugênio Prado — Portfólio

Portfólio comercial com React, TypeScript, Vite, Tailwind CSS 4 e React Icons. A rodada de refinamento preserva a identidade escura, o verde, o monograma e a ordem das seções. Sem novas dependências, backend ou banco de dados.

## Desenvolvimento

- `npm run dev`: servidor local.
- `npm run lint`: Oxlint.
- `npm run build`: TypeScript e build em `dist/`.
- `npm run preview`: prévia do build.

## Conteúdo e configuração

- `src/constants/site.ts`: WhatsApp, LinkedIn e GitHub oficiais.
- `src/constants/projects.ts`: cases, links ao vivo, dimensões e enquadramento de cada screenshot.
- `src/types/project.ts`: contrato dos cases. Para incluir gastronomia, agendamento ou sistemas, adicione um objeto ao array; não é necessário alterar a renderização.
- `src/constants/content.ts`: serviços, tecnologias e etapas.
- `src/components/ui/QuoteLink.tsx`: CTA compartilhado de orçamento.
- `src/sections/`: seções da página.
- `src/index.css`: tokens, layout, breakpoints e microinterações.
- `src/hooks/useReveal.ts`: reveal com IntersectionObserver.

Todos os CTAs “Solicitar orçamento” abrem o WhatsApp com a mensagem:
“Olá, Eugênio! Vi seu portfólio e gostaria de conversar sobre um projeto.”

A mensagem usa encodeURIComponent. Nenhuma mensagem é enviada automaticamente. Links externos abrem em outra aba com noopener e noreferrer. LinkedIn e GitHub também estão no footer.

Os screenshots e o texto “Ver projeto ao vivo” pertencem ao mesmo link de cada case, evitando alvos duplicados na navegação por teclado. Links de repositório não confirmados permanecem null. Patas & Cia também mantém github: null para exibir somente o link ao vivo, sem seção de código.

## Case Patas & Cia

Os projetos de `src/constants/projects.ts` são ordenados alfabeticamente pelo nome, usando a localização `pt-BR`. Patas & Cia inclui conteúdo completo no campo opcional `details`, apresentado em uma área expansível nativa no card compartilhado. Não há página ou modal individual. A classificação como projeto demonstrativo segue a identificação exibida na própria captura do site.

A capa utiliza a captura disponível em `public/projects/patas-e-cia.png` (1904 × 1079), com enquadramento no topo e o mesmo tratamento dos demais projetos. Não há pendência de imagem.

## Screenshots originais

Os arquivos foram preservados, sem filtros ou reprocessamento:

| Projeto | Resolução | Avaliação |
| --- | --- | --- |
| André Dias Studio | 1899 × 909 | Boa definição para a área de preview |
| Aura | 1903 × 911 | Boa definição para a área de preview |
| Loja Bella | 400 × 250 | Limitada ao ampliar; recomenda-se nova captura em maior resolução |

A moldura usa uma área 16:9, object-fit cover e imagePosition configurável por projeto. O recorte prioriza o topo e o conteúdo central. As imagens têm dimensões intrínsecas, lazy loading e decoding assíncrono.

André Dias Studio é projeto real. Aura e Loja Bella permanecem identificados como demonstrativos.

## Verificação

Com o servidor local rodando, execute `node scripts/verify-browser.mjs`. Usa o Chrome headless instalado, sem dependências novas. Configure `BROWSER_PATH` ou `PORTFOLIO_URL` se necessário.

Verifica 320, 375, 425, 768, 1024 e 1440 px, overflow, imagens carregadas, âncoras, atributos de links externos, mensagem e número do WhatsApp, foco dos cases, menu, Escape, movimento reduzido, reveal e erros de execução. As capturas são salvas em diretório temporário informado pelo script.

A rodada passou com lint e build sem erros ou avisos, sem overflow e sem erros de console. Os três sites e o GitHub responderam HTTP 200. O LinkedIn retornou 999 ao acesso automatizado; a URL fornecida foi preservada e pode ser conferida manualmente no navegador.

## Antes de publicar

- Recomenda-se substituir apenas quando disponível a captura da Loja Bella por uma de maior resolução (por exemplo, 1600 px de largura).
- Após definir o domínio, configurar canonical, og:url e imagem de compartilhamento absoluta, se desejado.
- Nenhum commit, push ou deploy foi realizado.
