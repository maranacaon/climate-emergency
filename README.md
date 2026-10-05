# Limiar

Simulador educativo sobre emergência climática, feito com React e Next.js. A experiência reúne uma missão de resposta a uma onda de calor e um laboratório simplificado de cenários de políticas climáticas.

## Executar localmente

```sh
npm install
npm run dev
```

O projeto usa o App Router do Next.js e fica disponível em `http://localhost:3000`.

## Verificações

```sh
npm run build
npm run lint
```

## Estrutura

- `app/layout.jsx`: layout raiz e metadados da aplicação.
- `app/page.jsx`: página principal.
- `src/App.jsx`: composição e estado dos modos da simulação.
- `src/components/AppHeader/`: cabeçalho, navegação de modos e seletor de idioma.
- `src/components/ResponseGame/`: missão de resposta à emergência e seus componentes visuais.
- `src/components/PolicySimulator/`: simulador de cenários, gráfico, controles e resumo.
- `src/hooks/useAppController.js`: estado global de idioma e modo ativo.
- `src/hooks/useLanguageMenu.js`: comportamento do menu de idiomas.
- `src/hooks/useResponseGame.js`: estado, decisões e reinício da missão.
- `src/hooks/usePolicyScenario.js`: estado dos controles e cálculos do cenário.

## Sobre as projeções

O modo de políticas usa relações simplificadas para fins educativos. Ele não reproduz o modelo científico do En-ROADS e não deve ser interpretado como previsão climática.