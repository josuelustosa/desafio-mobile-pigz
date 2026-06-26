# Pigz Comanda — Gerenciamento de Mesas e Comandas

Aplicativo mobile para restaurantes gerenciarem mesas e comandas em tempo real. Permite visualizar o status de todas as mesas, pesquisar por cliente, mesa ou atendente, filtrar por estado e iniciar novos pedidos diretamente pela interface.

---

## O que o app faz

- **HomeScreen** — tela inicial com atalhos rápidos para as funções principais
- **Mapa de atendimento** — lista todas as mesas com status, atendente, cliente e tempo de inatividade
- **Pesquisa** — busca por nome do cliente, número da mesa ou atendente
- **Filtros** — visão geral, em atendimento, ocupadas, ociosas
- **Novo pedido** — abre o fluxo de criação de pedido (Mesa/Comanda ou Balcão)
- **Scroll infinito** — carrega 20 mesas por vez conforme o usuário rola a lista
- **Persistência** — estado Redux sincronizado com AsyncStorage

---

## Tecnologias

| Camada | Escolha |
|--------|---------|
| Linguagem | TypeScript |
| Framework | React Native CLI (sem Expo) |
| Estado global | Redux Toolkit + Redux Persist |
| Persistência | AsyncStorage |
| Navegação | React Navigation (Native Stack) |
| Ícones | react-native-svg |
| Fontes | Poppins (autolinking nativo) |
| Testes | Jest + React Native Testing Library |

---

## Estrutura do projeto

```
src/
├── assets/
│   ├── fonts/          # Poppins Regular, Medium, SemiBold, Bold
│   └── icons/          # SVGs Material Symbols
├── components/         # Componentes globais reutilizáveis
│   ├── EmptyState/     # Estado vazio genérico
│   ├── FilterTabs/     # Abas de filtro com ref centralizado
│   ├── Icon/           # Wrapper tipado para ícones SVG
│   ├── LoadingMore/    # Indicador de carregamento no fim da lista
│   ├── SearchBar/      # Campo de busca
│   ├── StatusBadge/    # Badge colorido de status de mesa
│   └── Text/           # Wrapper de texto com variants tipados
├── features/
│   ├── home/
│   │   ├── Home.screen.tsx         # Tela inicial
│   │   └── ActionCard.component.tsx # Card de ação clicável
│   ├── orders/
│   │   └── NewOrder.modal.tsx      # Modal de novo pedido
│   └── tables/
│       ├── TableMap.screen.tsx     # Mapa de atendimento
│       └── TableCard.component.tsx # Card individual de mesa
├── navigation/
│   └── RootNavigator.tsx   # Rotas: Home (inicial) → TableMap
├── store/
│   ├── store.ts            # Configuração Redux + Persist
│   ├── tablesSlice.ts      # Estado e thunks das mesas
│   ├── ordersSlice.ts      # Estado dos pedidos
│   ├── searchSlice.ts      # Estado da pesquisa
│   └── uiSlice.ts          # Estado de UI (modais, etc.)
└── theme/
    ├── colors.ts       # Paleta + tokens semânticos (light/dark)
    ├── typography.ts   # Escala tipográfica Poppins
    ├── spacing.ts      # Escala de espaçamento
    └── useTheme.ts     # Hook de acesso ao tema
```

---

## Componentes principais

### `Icon`
Wrapper tipado para ícones SVG. Aceita qualquer nome do mapa interno.

```tsx
<Icon name="search" size={24} color="#333" />
<Icon name="table_restaurant" size={32} color={colors.brand.default} />
```

Ícones disponíveis: `account_circle`, `add`, `arrow_left_alt`, `cards`, `chevron_right`, `close_small`, `mobile_alert`, `paid`, `room_service`, `schedule`, `search`, `settings`, `shopping_bag_speed`, `table_restaurant`.

---

### `Text`
Wrapper de `<Text>` com variants mapeados para o sistema tipográfico.

```tsx
<Text variant="h1">Título principal</Text>
<Text variant="body" color={colors.text.secondary}>Descrição</Text>
<Text variant="caption">Metadata</Text>
```

Variants: `h1`, `h2`, `h3`, `h4`, `body`, `bodySmall`, `bodyBold`, `caption`, `button`, `label`.

---

### `FilterTabs`
Abas de filtro com scroll automático via ref — o filtro ativo nunca sai da tela e ao trocar, a lista de mesas rola para o topo.

```tsx
<FilterTabs activeFilter={filter} onFilterChange={setFilter} />
```

---

### `SearchBar`
Campo de busca com ícone e debounce integrado.

```tsx
<SearchBar value={query} onChangeText={setQuery} placeholder="Buscar mesa..." />
```

---

### `TableCard`
Card de mesa com status colorido, atendente, cliente e tempo de inatividade.

```tsx
<TableCard table={tableData} onPress={() => handleTablePress(table)} />
```

---

### `StatusBadge`
Badge de status reutilizável.

```tsx
<StatusBadge status="occupied" />   // "Ocupada"
<StatusBadge status="free" />       // "Livre"
<StatusBadge status="reserved" />   // "Reservada"
```

---

### `ActionCard`
Card de ação da HomeScreen com ícone e label.

```tsx
<ActionCard icon="add" label="Novo Pedido" onPress={handleNewOrder} />
```

---

### `EmptyState`
Exibido quando nenhuma mesa corresponde à busca/filtro.

```tsx
<EmptyState message="Nenhuma mesa encontrada" />
```

---

### `LoadingMore`
Indicador de carregamento no fim da lista durante scroll infinito.

```tsx
<LoadingMore visible={isFetchingMore} />
```

---

## Redux — Estado global

| Slice | Responsabilidade |
|-------|-----------------|
| `tablesSlice` | Busca, armazena e pagina as mesas via API |
| `ordersSlice` | Gerencia pedidos em andamento |
| `searchSlice` | Controla query de pesquisa e filtro ativo |
| `uiSlice` | Estado de modais e feedbacks visuais |

O store é configurado com `redux-persist` + `AsyncStorage`, garantindo que os dados sobrevivam ao fechamento do app.

---

## Como executar

### Pré-requisitos

- Node.js 18+
- JDK 17+
- Android SDK (API 24+)
- React Native CLI

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar via Metro + emulador/device

```bash
# Iniciar Metro
npm start

# Em outro terminal — rodar no Android
npm run android
```

### 3. Executar via device físico (WiFi)

```bash
# 1. Gerar APK debug
cd android && ./gradlew assembleDebug

# 2. Instalar via USB
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 3. Iniciar Metro
npm start

# 4. No device: shake → Dev Settings → Debug server host
#    Inserir: <IP-DA-MAQUINA>:8081 → Reload
```

### 4. Gerar APK release (otimizado)

```bash
cd android && ./gradlew assembleRelease
# Saída: app/build/outputs/apk/release/app-release.apk (~35MB)
```

---

## Testes

```bash
npm test
```

Suítes cobertas:
- `tablesSlice.test.ts` — filtros, pesquisa, paginação e seletores Redux
- `App.test.tsx` — renderização da árvore de componentes raiz

---

## Especificações técnicas

| Item | Detalhe |
|------|---------|
| Plataforma alvo | Android (arm64-v8a + armeabi-v7a) |
| Mínimo RAM | 1 GB |
| Mínimo Storage | 8 GB |
| APK release | ~35 MB |
| Engine JS | Hermes (pré-compilado, menor RAM) |
| Minificação | ProGuard/R8 habilitado em release |
| Fontes | Poppins via autolinking nativo |
| Sem Expo | React Native CLI puro |

---

## Navegação

```
HomeScreen (inicial)
├── → NewOrderModal     (card "Novo Pedido")
├── → TableMapScreen    (card "Mapa de atendimento")
└── → [placeholder]     (card "Configurações")
```

---

## Referências

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)
- [Protótipo Figma](https://www.figma.com/design/rQuxZuO2oZ7Vm8JLGCaLAD/Desafio-Pigz-Mobile-2025.1---Comanda-Mobile---Tempo-de-Inatividade?node-id=0-1)
