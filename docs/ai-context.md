# Contexto atual - Desafio Mobile Pigz

Este arquivo registra o estado atual do projeto para facilitar a continuidade da implementação do desafio técnico. Ele complementa o README `challenge-readme.md` fornecido com os requisitos e a imagem `architecture.png` da arquitetura MVC personalizada para React Native, encontrados em `docs/`.

## Visão geral

O projeto é um aplicativo mobile de mesas e comandas para restaurantes, criado com React Native CLI e TypeScript, compatível com iOS e Android.

O desafio prioriza:

- simplicidade e legibilidade;
- componentização sem inflar arquitetura;
- uso de Redux integrado com AsyncStorage;
- consumo de API REST simulado via mock local (Axios adapter);
- scroll infinito com carregamento de 20 mesas por página;
- filtros, busca e listagem responsiva;
- funcionamento adequado em dispositivos com recursos limitados (mínimo 1 GB RAM, 8 GB armazenamento).

## Etapas concluídas

1. ✅ Setup do projeto e dependências.
2. ✅ Theme e design tokens (cores, tipografia, espaçamentos, radii).
3. ✅ Redux Store com AsyncStorage e Redux Persist.
4. ✅ API service com Axios e mock local tipado.
5. ✅ `tablesSlice` com paginação, thunks assíncronos e seletores.
6. ✅ Componentes globais de UI (P1): `SearchBar`, `FilterTabs`, `StatusBadge`, `EmptyState`, `LoadingMore`.
7. ✅ Feature de Mesas (P2): `TableCard`, `TableMap.screen`, tipos, utilitários e integração com Redux.
8. ✅ Refatoração e melhoria de componentes (P3): `EmptyState` com botão de ação, `LoadingMore` com mensagem de fim de lista, `StatusBadge` com mapeamento de cores correto.
9. ✅ Integração de navegação: `RootNavigator` com React Navigation native stack.
10. ✅ Filtros de status com regra de negócio correta e alinhada com o protótipo.
11. ✅ Feature de Pedidos (P4 — estrutura + placeholder): tipos, utilitários, `ordersSlice`, `NewOrderModal` com estado "Em desenvolvimento".

## Arquitetura de pastas

Segue a arquitetura MVC personalizada para React Native definida em `docs/architecture.png`:

```
src/
├── App.tsx                        # Raiz: Provider, PersistGate, SafeAreaProvider, RootNavigator
├── navigation/
│   ├── RootNavigator.tsx          # Stack navigator principal (React Navigation)
│   └── index.ts
├── features/
│   ├── tables/
│   │   ├── TableCard.component.tsx    # Card responsivo de mesa (cor por status)
│   │   ├── TableMap.screen.tsx        # Tela principal: FlatList grid 3 colunas + FAB
│   │   ├── tables.types.ts            # Interfaces e constantes da feature
│   │   ├── tables.utils.ts            # Funções puras: mapper, formatter, filter
│   │   └── index.ts
│   └── orders/
│       ├── NewOrder.modal.tsx         # Bottom sheet: seleção de tipo de pedido + coming soon
│       ├── orders.types.ts            # Interfaces e constantes da feature de pedidos
│       ├── orders.utils.ts            # Funções puras: mapper, formatter, calculators
│       └── index.ts
├── components/                    # Componentes globais reutilizáveis
│   ├── SearchBar/                 # Input com ícone, debounce pronto para searchSlice
│   ├── FilterTabs/                # Scroll horizontal de abas de filtro
│   ├── StatusBadge/               # Indicador circular de status (cor semântica)
│   ├── EmptyState/                # Estado vazio/erro com ação opcional
│   ├── LoadingMore/               # Indicador de carregamento + mensagem de fim de lista
│   └── index.ts
├── hooks/
│   ├── useTableFilter.ts          # Hook: gerencia filtro ativo + dispara fetchTables
│   └── index.ts
├── store/
│   ├── types.ts                   # Tipos globais: Table, Order, TableStatus, FilterType, etc.
│   ├── tablesSlice.ts             # Estado de mesas, paginação, thunks, seletores
│   ├── ordersSlice.ts             # Estado de pedidos, thunks (scaffolded), seletores
│   ├── uiSlice.ts                 # Filtro ativo, estado do modal de novo pedido
│   ├── searchSlice.ts             # Query de busca, debounced query, resultIds
│   ├── rootReducer.ts             # combineReducers: tables, orders, ui, search
│   ├── store.ts                   # configureStore + persistReducer + AsyncStorage
│   ├── hooks.ts                   # useAppDispatch e useAppSelector tipados
│   └── index.ts
├── services/
│   ├── api.config.ts              # Instância Axios central com interceptors
│   ├── tables.service.ts          # getTables(params): page, perPage, filter, query
│   ├── mocks/
│   │   └── tables.mock.ts         # Gerador de 44 mesas pseudoaleatórias com paginação e filtros
│   └── index.ts
└── theme/
    ├── colors.ts                  # palette → lightColors/darkColors + tableStatus tokens
    ├── spacing.ts                 # Escala de espaçamentos e radii
    ├── typography.ts              # textStyles (headings, body, caption)
    ├── layout.ts                  # Constantes de layout responsivo
    ├── theme.ts                   # Objeto theme completo
    ├── useTheme.ts                # Hook: retorna { colors, spacing, radii, textStyles }
    └── index.ts
```

## Estado atual da Redux Store

Slices registrados em `rootReducer.ts`:

| Slice         | Chave    | Persistido                                |
| ------------- | -------- | ----------------------------------------- |
| `tablesSlice` | `tables` | ✅ `items` e `pagination`                 |
| `ordersSlice` | `orders` | ❌ (estado de sessão)                     |
| `uiSlice`     | `ui`     | ✅ `activeFilter`                         |
| `searchSlice` | `search` | ✅ `query`, `debouncedQuery`, `resultIds` |

### tablesSlice

- **Thunks**: `fetchTables` (primeira carga / mudança de filtro) e `fetchMoreTables` (scroll infinito com deduplicação por ID).
- **Reducers**: `resetPagination`, `setTablesStatus`, `setTablesError`, `clearTables`.
- **Seletores**: `selectAllTables`, `selectFilteredTables`, `selectTablesLoading`, `selectTablesError`, `selectTablesPagination`, `selectTableById(id)`.

### ordersSlice (scaffolded — P4.2)

- **Estrutura completa** criada, mas thunks operam localmente (sem service real). Pronto para integração com backend.
- **Thunks**: `createOrder`, `updateOrderStatus`, `deleteOrder`.
- **Reducers**: `setSelectedOrder`, `setOrdersStatus`, `clearOrders`, `loadOrdersForTable`.
- **Seletores**: `selectAllOrders`, `selectOrdersLoading`, `selectOrdersError`, `selectSelectedOrderId`, `selectOrderById(id)`, `selectOpenOrders`, `selectOrdersTotalValue`.

### uiSlice

- `openNewOrderModal(tableId?)` — abre bottom sheet e registra mesa selecionada.
- `closeNewOrderModal()` — fecha e limpa seleção.
- `setActiveFilter(filter)` — altera filtro ativo.

## Tipos globais (src/store/types.ts)

```ts
type TableStatus  = 'active' | 'waiting' | 'idle' | 'available'
type FilterType   = 'all' | 'active' | 'waiting' | 'occupied' | 'idle' | 'available'
type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface Order   { id, number, totalAmount, status, openedAt, lastOrderAt }
interface Table   { id, number, status, clientName, attendantName, orders[], guestCount, openedAt, lastOrderAt, minutesSinceLastOrder }
interface OrdersState  { items, selectedOrderId, status, error }
interface TablesState  { items, pagination, status, error }
interface UiState      { activeFilter, isNewOrderModalOpen, selectedTableId }
interface SearchState  { query, debouncedQuery, resultIds }
```

## Regras de negócio: status das mesas

| Status      | Cor         | Significado                               | Tempo sem pedido |
| ----------- | ----------- | ----------------------------------------- | ---------------- |
| `active`    | 🟢 Verde    | Em atendimento ativo                      | 2–20 min         |
| `waiting`   | 🔴 Vermelho | Aguardando retorno do atendente           | 10–45 min        |
| `idle`      | 🟡 Âmbar    | Ociosa — cliente na mesa, sem novo pedido | 60–180 min       |
| `available` | ⚪ Neutro   | Disponível — mesa vazia                   | —                |

## Filtros de mesas (FilterTabs)

| Label              | FilterType  | Status incluídos          |
| ------------------ | ----------- | ------------------------- |
| Visão geral        | `all`       | todos                     |
| Em atendimento     | `active`    | `active`                  |
| Aguardando Retorno | `waiting`   | `waiting`                 |
| Ocupadas           | `occupied`  | `active + waiting + idle` |
| Ociosas            | `idle`      | `idle`                    |
| Disponíveis        | `available` | `available`               |

A lógica de filtro existe em dois lugares com a mesma regra: `tables.utils.ts` (client-side) e `tables.mock.ts` (server-side mock).

## Feature de Pedidos — decisão de escopo

Os requisitos do projeto (`challenge-readme.md`) **não incluem criação/gerenciamento de pedidos**, apenas **visualização** de informações nas mesas (item 4 dos requisitos). Por isso:

- A estrutura de pedidos foi **scaffolded** (P4.1 tipos/utils + P4.2 ordersSlice) para facilitar expansão futura.
- A UI de "Novo Pedido" existe (FAB + `NewOrderModal`) mas ao selecionar uma opção exibe estado **"Em desenvolvimento"** (🚧) com mensagem informativa.
- Não foram implementados `orders.service.ts`, `OrderCard`, nem `OrderList`.

## Camada de serviços

- `api.config.ts`: instância Axios com timeout, headers e interceptors. O adapter do Axios redireciona `GET /tables` para o mock local, permitindo troca transparente para backend real.
- `tables.service.ts`: `getTables({ page, perPage, filter, query })`.
- `tables.mock.ts`: 44 mesas com distribuição pseudoaleatória de status, geradas uma vez por sessão para consistência entre páginas. Inclui `matchesFilter` e `matchesQuery` com a mesma lógica do cliente.

## Navegação

- `RootNavigator.tsx`: `NavigationContainer` + `createNativeStackNavigator` com `headerShown: false`.
- Rota inicial: `TableMap` → `TableMapScreen`.
- Preparada para expansão com novas rotas (detalhes de mesa, configurações, etc.).

## Dependências instaladas

**Runtime:**

- `@reduxjs/toolkit`, `react-redux`, `redux-persist`, `@react-native-async-storage/async-storage`
- `axios`
- `@react-navigation/native`, `@react-navigation/native-stack`
- `react-native-screens`, `react-native-gesture-handler`, `react-native-safe-area-context`

**Dev:**

- `@react-native/jest-preset`, `@types/jest`, `react-test-renderer`

## Validação atual

Todos os comandos abaixo passam sem erros:

```bash
npx tsc --noEmit   # ✅
npm test           # ✅ 14 testes passando
```

Suíte de testes:

- `__tests__/App.test.tsx`: smoke test — renderiza app com Provider, PersistGate e AsyncStorage mockado.
- `__tests__/tablesSlice.test.ts`: 14 casos cobrindo `fetchTables`, `fetchMoreTables`, deduplicação, paginação e estados de erro.

## Regras para agentes de IA

- Escrever documentação em português brasileiro (PT-BR), com acentuação correta.
- Mensagens de commit **sempre em inglês**, no padrão `tipo(escopo): descrição`.
- Commits são **sempre propostos** para revisão manual — nunca executar `git commit` diretamente.
- Manter linguagem técnica, natural e objetiva.
- Não traduzir nomes de tecnologias, bibliotecas, frameworks, arquivos, comandos ou APIs.
- Preservar a simplicidade do desafio técnico, evitando arquitetura inflada.
- Consultar este arquivo, o `challenge-readme.md` e `architecture.png`, antes de propor novas etapas.
- Priorizar mudanças incrementais, legíveis e fáceis de revisar.
- Antes de editar qualquer arquivo existente, verificar seu conteúdo atual.

## Próxima etapa — branch: `feat/table-map-screen`

### Escopo

Refinamento e completude da `TableMapScreen` com todos os requisitos de entrega do desafio, além de ativos visuais definitivos.

### P1 — Tipografia Poppins

Instalar e configurar a fonte **Poppins** (Google Fonts) no projeto React Native CLI.

- Variantes necessárias: `Poppins-Regular`, `Poppins-Medium`, `Poppins-SemiBold`, `Poppins-Bold`.
- Adicionar arquivos `.ttf` em `src/assets/fonts/`.
- Linkar via `react-native.config.js` + `react-native link` (autolinking de fontes).
- Atualizar `src/theme/typography.ts` para usar `fontFamily: 'Poppins-Regular'` etc. em todos os `textStyles`.

### P2 — Ícones SVG locais (Material Symbols)

Substituir todos os emojis atualmente usados nos componentes por ícones vetoriais locais.

- Especificação: **Material Symbols — Rounded**, Weight 300, Fill OFF, Optical size 24dp.
- Instalar `react-native-svg` e configurar suporte nativo (Android + iOS).
- Instalar `react-native-svg-transformer` para importar `.svg` como componentes React.
- Baixar os arquivos `.svg` necessários e salvar em `src/assets/icons/`.
- Criar componente wrapper `src/components/Icon/Icon.tsx` com tipagem dos nomes disponíveis.
- Substituir emojis em: `TableCard`, `FilterTabs`, `EmptyState`, `NewOrderModal`, `SearchBar`, `LoadingMore`.

### P3 — TableMapScreen: scroll infinito e refs (requisito de entrega)

Implementar os requisitos explícitos de entrega do `challenge-readme.md`:

- **Ref no FilterTabs**: ao clicar em qualquer filtro, a tab selecionada deve ser centralizada automaticamente na ScrollView horizontal (usando `scrollTo` via ref).
- **Scroll para o topo ao filtrar**: ao mudar de filtro, a FlatList de mesas deve rolar automaticamente para o início (usando `flatListRef.current?.scrollToOffset({ offset: 0 })`).
- **Scroll infinito consolidado**: garantir funcionamento correto em todos os cenários (filtro + busca + paginação simultâneos).
- **Responsividade**: validar layout em densidades de pixels variadas (testar em ao menos 2 tamanhos de tela).

### P4 — Tela Home (conforme protótipo)

Implementar a tela inicial `HomeScreen` conforme o protótipo Figma:

- **Header**: logotipo "Pigz Comanda" centralizado + nome do usuário/restaurante.
- **Grid de ações**: 3 cards grandes com ícone + label:
  - "Novo Pedido" — abre `NewOrderModal`.
  - "Mapa de atendimento" — navega para `TableMapScreen`.
  - "Configurações" — placeholder "Em desenvolvimento".
- Registrar `HomeScreen` como rota inicial no `RootNavigator`.
- `TableMapScreen` passa a ser rota secundária (navegação por botão do home).

---

## **Branch: `feat/screens`** ✅ Em Progresso

**Objetivo:** Finalização visual, ajustes refinados e implementação de telas core.

### ✅ Completado

#### **P1 — Poppins Typography**
- Configurado `react-native.config.js` para autolinking de fontes
- Adicionadas 4 variantes: Regular, Medium, SemiBold, Bold
- Todos os `textStyles` agora usam `fontFamily` Poppins

#### **P2 — SVG Icons**
- Instalado `react-native-svg` + `react-native-svg-transformer`
- Configurado `metro.config.js` para transformar SVG
- Criado sistema de ícones tipado (`Icon` component)
- 14 ícones Material Symbols incluídos
- 7 componentes refatorados para usar ícones

#### **Otimizações (Requisito: 1GB RAM + 8GB Storage)**
- Multi-arquitetura: `arm64-v8a` + `armeabi-v7a`
- ProGuard/R8 habilitado (reduz bytecode ~30%)
- Hermes Engine ativado (reduz RAM ~20%)
- **APK Release: 35MB** (40% menor que debug)

#### **P4 — HomeScreen**
- Criada `HomeScreen` como rota inicial
- Header com logo Pigz Comanda
- User info: Ghabrichelson + Zigpi Restaurante
- Grid de ações com 3 cards:
  - Novo Pedido → abre `NewOrderModal`
  - Mapa de atendimento → navega para `TableMapScreen`
  - Configurações → placeholder
- Criado `ActionCard` component reutilizável
- Criado `Text` component com variant mapping
- `TableMapScreen` agora é rota secundária
- **Fix:** Corrigido fechamento do `NewOrderModal` (onClose callback)

### 🔄 Pendente

#### **P3 — TableMapScreen: Scroll Infinito e Refs**
- Implementar scroll infinito com carregamento sob demanda
- Adicionar refs React para navegação programática
- Otimizar renderização de lista grande
- Implementar virtualização se necessário

---

## **Próximos Passos**

1. **Implementar P3** (TableMapScreen: scroll infinito e refs)
2. Testes E2E de navegação Home → TableMap
3. Validação de performance em dispositivos 1GB RAM
4. Preparação para merge em `develop`
