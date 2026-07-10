# shared/

## Objetivo da pasta

A pasta `shared/` contém código **genérico e reutilizável** em toda a aplicação — componentes de UI, hooks utilitários e constantes que não pertencem a nenhum módulo de negócio específico.

Tudo em `shared/` deve ser agnóstico de domínio: um `Button` não sabe o que é um "produto" ou "venda".

---

## O que deve existir nela

- Componentes de UI genéricos (`Button`, `Input`, `Modal`, `Table`, `Badge`)
- Hooks utilitários (`useDebounce`, `useMediaQuery`, `useDisclosure`)
- Constantes compartilhadas (tamanhos de página, breakpoints)
- Composables de UI (HOCs, render props — se necessário)

### Tipos de arquivos permitidos

- Componentes React genéricos
- Hooks sem lógica de negócio
- Constantes de UI
- Tipos de props de componentes compartilhados

---

## O que NÃO deve existir nela

- Componentes específicos de módulo (`ProductTable` → `modules/products/components/`)
- Lógica de negócio ou regras de domínio
- Chamadas de API
- Stores Zustand
- Layouts estruturais (vão em `layouts/`)
- Configuração de infraestrutura (vai em `core/`)

---

## Estrutura sugerida

```
shared/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   ├── Table/
│   ├── DataTable/
│   ├── EmptyState/
│   ├── LoadingSpinner/
│   └── index.ts
├── hooks/
│   ├── useDebounce.ts
│   ├── useDisclosure.ts
│   ├── useMediaQuery.ts
│   └── index.ts
├── constants/
│   ├── pagination.ts
│   └── index.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `components/`

Biblioteca de componentes de UI do design system do WorkSpeed. Cada componente em sua própria pasta com types e barrel export.

### `hooks/`

Hooks genéricos sem dependência de domínio ou API.

### `constants/`

Valores constantes usados em múltiplos lugares (ex: `DEFAULT_PAGE_SIZE = 20`).

---

## Explicação dos arquivos

### `Button.tsx`

Botão reutilizável com variantes (`primary`, `secondary`, `danger`, `ghost`) e tamanhos.

### `DataTable.tsx`

Tabela genérica com paginação, ordenação e slots para colunas — usada por produtos, clientes, vendas.

### `EmptyState.tsx`

Estado vazio genérico com título, descrição e ação — cada módulo passa conteúdo via props.

### `useDebounce.ts`

```typescript
export function useDebounce<T>(value: T, delay = 300): T {
  // ...
}
```

Usado em filtros de busca em múltiplos módulos.

---

## Exemplos

```tsx
// Correto — componente genérico
<EmptyState
  title="Nenhum produto encontrado"
  description="Cadastre seu primeiro produto"
  action={<Button onClick={onCreate}>Novo produto</Button>}
/>

// Errado — lógica de produto em shared
// shared/components/ProductCard.tsx  ← deve ser modules/products/components/
```

### Quando mover de modules/ para shared/

Um componente vai para `shared/` quando:

1. É usado por **2+ módulos**
2. Não contém lógica ou texto específico de domínio
3. É configurável via props

---

## shared/ vs layouts/

| | `shared/` | `layouts/` |
|---|-----------|------------|
| Escopo | Componente atômico/molecular | Estrutura de página |
| Exemplo | Button, Modal, Table | Sidebar, Header, AppLayout |
| Sabe de rotas? | Não | Sim |

## Evite a pasta virar "lixeira"

Se `shared/` acumular componentes usados por apenas um módulo, a organização se degrada. Revise periodicamente e mova componentes órfãos de volta aos módulos.
