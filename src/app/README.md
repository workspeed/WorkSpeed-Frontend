# app/

## Objetivo da pasta

A pasta `app/` é o **ponto de composição raiz** da aplicação React. Ela concentra tudo que precisa existir uma única vez no topo da árvore de componentes: o componente `App`, os providers globais e a orquestração de contextos que envolvem toda a aplicação.

Esta pasta **não contém lógica de negócio** nem páginas de módulos do ERP.

---

## O que deve existir nela

- `App.tsx` — componente raiz que compõe router, layouts e providers
- `providers/` — providers React que envolvem toda a aplicação
- `index.ts` — barrel export (opcional)

### Tipos de arquivos permitidos

- Componentes de composição (`App.tsx`)
- Providers (`QueryProvider`, `ThemeProvider`, `TenantProvider`)
- Arquivos de configuração de providers

---

## O que NÃO deve existir nela

- Páginas de módulos (vão em `modules/<modulo>/pages/`)
- Componentes reutilizáveis genéricos (vão em `shared/components/`)
- Lógica de autenticação ou API (vão em `core/`)
- Definição de rotas (vai em `router/`)
- Stores Zustand (vão em `stores/`)
- Estilos globais (vão em `styles/`)

---

## Estrutura sugerida

```
app/
├── App.tsx
├── providers/
│   ├── AppProviders.tsx
│   ├── QueryProvider.tsx
│   └── index.ts
├── ErroBoundary.tsx 
└── index.ts
```

---

## Explicação de cada subpasta

### `providers/`

Agrupa todos os React Context Providers que precisam envolver a aplicação inteira.

| Provider | Responsabilidade |
|----------|-----------------|
| `QueryProvider` | Configura o TanStack Query (cache, retry, staleTime) |
| `TenantProvider` | Disponibiliza o tenant atual para toda a árvore |
| `AppProviders` | Compõe todos os providers em ordem correta |

---

## Explicação dos arquivos

### `App.tsx`

Responsável por montar a árvore principal da aplicação. Tipicamente renderiza `<AppProviders>` e o `<RouterProvider>`.

```tsx
// Exemplo futuro
function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
```

### `providers/AppProviders.tsx`

Compõe providers na ordem correta (dependências de contexto importam).

```tsx
// Ordem sugerida: Query → Tenant → Router children
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <TenantProvider>
        {children}
      </TenantProvider>
    </QueryProvider>
  )
}
```

---

## Exemplos

No WorkSpeed, `App.tsx` será o único lugar onde você conecta:

- TanStack Query para cache de dados do ERP
- Contexto do tenant (empresa logada, cores, módulos habilitados)
- React Router para navegação entre módulos (vendas, estoque, financeiro)

Se você criar um `ProductList.tsx` aqui, está no lugar errado — ele pertence a `modules/products/pages/`.
