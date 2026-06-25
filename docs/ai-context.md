# Contexto atual - Desafio Mobile Pigz

Este arquivo registra o estado atual do projeto para facilitar a continuidade da implementação do desafio técnico. Ele complementa o README `challenge-readme.md` fornecido com os requisitos e a imagem `architecture.png` da arquitetura MVC personalizada para React Native, encontrados em `docs/`.

## Visão geral

O projeto é um aplicativo mobile de mesas e comandas para restaurantes, criado com React Native CLI e TypeScript, compatível com iOS e Android.

O desafio prioriza:

- simplicidade e legibilidade;
- componentização sem inflar arquitetura;
- uso de Redux integrado com AsyncStorage;
- consumo futuro de API REST;
- scroll infinito com carregamento de 20 mesas por página;
- filtros, busca e listagem responsiva;
- funcionamento adequado em dispositivos com recursos limitados.

## Ordem de implementação

A ordem planejada para evolução do projeto é:

1. Setup do projeto e dependências - concluído.
2. Theme e design tokens - concluído.
3. Redux Store e AsyncStorage - concluído.
4. API service com Axios - concluído.
5. `tablesSlice` conectado com paginação real - concluído.
6. `TableCard`, `FilterTabs` e `SearchBar`.
7. `TableMapScreen` com scroll infinito e refs.
8. Modais, incluindo novo pedido.
9. Documentação final.

## Estado atual da Redux Store

A store foi implementada em `src/store/` com Redux Toolkit, React Redux, Redux Persist e AsyncStorage.

Arquivos principais:

- `src/store/types.ts`: tipos globais de entidades e estados Redux.
- `src/store/tablesSlice.ts`: estado de mesas, paginação, status e erro. Contém thunks assíncronos `fetchTables` (primeira carga e mudança de filtro/busca) e `fetchMoreTables` (scroll infinito) que se conectam ao `tablesService`.
- `src/store/uiSlice.ts`: filtro ativo e estado do modal de novo pedido.
- `src/store/searchSlice.ts`: busca global separada, com query, query debounced e IDs de resultado.
- `src/store/rootReducer.ts`: combinação dos reducers.
- `src/store/store.ts`: configuração da store, Redux Persist e AsyncStorage.
- `src/store/hooks.ts`: hooks tipados `useAppDispatch` e `useAppSelector`.
- `src/store/index.ts`: barrel export do módulo de store.

O app já está envolvido com `Provider` e `PersistGate` em `src/App.tsx`.

## Persistência

A persistência foi configurada de forma seletiva para evitar salvar estados temporários.

Persistido:

- `tables.items`;
- `tables.pagination`;
- `ui.activeFilter`;
- `search.query`;
- `search.debouncedQuery`;
- `search.resultIds`.

Não persistido:

- `tables.status`;
- `tables.error`;
- `ui.isNewOrderModalOpen`;
- `ui.selectedTableId`.

A chave usada no Redux Persist é `pigz:root`.

## Decisões de arquitetura

O `tablesSlice` agora usa `createAsyncThunk` do Redux Toolkit para carregar dados via `tablesService`. Os thunks `fetchTables` e `fetchMoreTables` gerenciam automaticamente os estados `pending`, `fulfilled` e `rejected`, eliminando a necessidade de lógica manual de loading e erro.

Reducers síncronos redundantes (`setTables` e `appendTables`) foram removidos após a implementação dos thunks, mantendo apenas a via assíncrona como ponto de entrada para dados. Isso evita superfície de API ambígua e garante que todos os carregamentos passem pelo ciclo completo de estados.

A busca foi criada como `searchSlice` separado porque a arquitetura anexada previa esse slice e ele tende a crescer quando `SearchBar` e debounce forem implementados.

## Estado atual da camada de serviços

A camada de serviços foi implementada em `src/services/` com Axios e mock local tipado, para atender o requisito de API REST mesmo sem backend disponível neste momento.

Arquivos principais:

- `src/services/api.config.ts`: instância Axios central com timeout, headers padrão e interceptors.
- `src/services/tables.service.ts`: método `getTables(params)` para buscar mesas com `page`, `perPage`, `filter` e `query`.
- `src/services/mocks/tables.mock.ts`: gerador pseudoaleatório com seed fixa para até 500 mesas, incluindo paginação e filtros em memória.
- `src/services/index.ts`: barrel export do módulo de serviços.

Decisão importante:

- o mock é gerado uma única vez por sessão de execução para manter consistência entre chamadas paginadas;
- a API local responde `GET /tables` via adapter do Axios, facilitando a futura troca para backend real sem alterar consumidores do serviço.

## Dependências adicionadas

Dependências de runtime:

- `@reduxjs/toolkit`;
- `react-redux`;
- `redux-persist`;
- `@react-native-async-storage/async-storage`.
- `axios`.

Dependência de desenvolvimento:

- `@react-native/jest-preset`.

Sobre configuração nativa: apenas `@react-native-async-storage/async-storage` possui módulo nativo, mas no React Native CLI atual ela é integrada por autolinking. Para iOS, será necessário rodar `pod install` após instalar dependências nativas. No Android, não houve necessidade de alteração manual em arquivos nativos.

## Validação atual

Foram executados:

- `npx tsc --noEmit`;
- `npm test`.

Ambos passaram após ajuste do Jest para o preset correto e transformação das dependências ESM usadas pela stack Redux.

A suíte de testes atual inclui:

- `__tests__/App.test.tsx`: smoke test para garantir que o app renderiza com `Provider`, `PersistGate` e AsyncStorage mockado.
- `__tests__/tablesSlice.test.ts`: 14 testes unitários cobrindo thunks assíncronos (`fetchTables`, `fetchMoreTables`), deduplicação de items, tratamento de paginação e estados de erro.

## Regras para agentes de IA

Ao continuar este projeto, agentes de IA devem seguir estas regras:

- escrever documentação em português brasileiro (PT-BR), com acentuação correta;
- manter linguagem técnica, natural e objetiva;
- não traduzir nomes de tecnologias, bibliotecas, frameworks, arquivos, comandos ou APIs;
- preservar a simplicidade do desafio técnico, evitando arquitetura inflada;
- consultar este arquivo, o `challenge-readme.md` e `architecture.png`, antes de propor novas etapas;
- priorizar mudanças incrementais, legíveis e fáceis de revisar.

## Commits sugeridos

### Etapa Redux Store

Como `src/store/types.ts` já havia sido commitado com `feat(store): global types of the Redux state`, a evolução posterior desse arquivo pode ser registrada com:

- `feat(store): extend redux global types for slices state`

Demais commits sugeridos:

- `chore(deps): add redux persist stack and test preset`
- `feat(store): add tables ui and search slices`
- `feat(store): configure persisted redux store`
- `feat(app): wrap app with redux provider`
- `test(app): add smoke test for store wiring`

### Etapa tablesSlice com paginação

- `feat(store): add async thunks for tables pagination`
- `test(store): add unit tests for tables slice thunks`

## Próxima etapa recomendada

A próxima etapa natural é implementar os componentes de UI que consomem o `tablesSlice`:

- `TableCard`: card visual de mesa com status, nome do cliente, número de pedidos e tempo desde último pedido;
- `FilterTabs`: tabs horizontais para filtrar mesas por status (`all`, `active`, `occupied`, `idle`);
- `SearchBar`: input de busca com debounce integrado ao `searchSlice`.

Esses componentes devem usar os hooks `useAppSelector` e `useAppDispatch` para ler estado e disparar as actions `fetchTables`, `setActiveFilter` e atualizações de busca. Manter a filosofia de simplicidade: componentes pequenos, responsabilidade única, sem lógica de negócio embutida.
