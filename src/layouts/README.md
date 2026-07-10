# layouts/

## Objetivo da pasta

A pasta `layouts/` contém os **esqueletos estruturais** das páginas — componentes que definem onde header, sidebar, conteúdo e footer aparecem, sem lógica de negócio.

Layouts são reutilizados por múltiplos módulos e rotas. Eles recebem `children` (o conteúdo da página) e montam a estrutura visual ao redor.

---

## O que deve existir nela

- Layouts de aplicação (`AppLayout`, `AuthLayout`, `PublicLayout`)
- Componentes estruturais do layout (`Sidebar`, `Header`, `Footer`) — **somente se forem exclusivos do layout**
- Variações de layout por contexto (ex: layout sem sidebar para onboarding)

### Tipos de arquivos permitidos

- Componentes de layout
- Subcomponentes exclusivos do layout
- Hooks específicos do layout (ex: `useSidebarState`)

---

## O que NÃO deve existir nela

- Páginas completas de módulos (vão em `modules/<modulo>/pages/`)
- Componentes genéricos reutilizáveis (`Button`, `Modal`) — vão em `shared/components/`
- Lógica de negócio (cálculos, regras de estoque, etc.)
- Chamadas de API de domínio
- Definição de rotas (vai em `router/`)

---

## Estrutura sugerida

```
layouts/
├── AppLayout/
│   ├── AppLayout.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── index.ts
├── AuthLayout/
│   ├── AuthLayout.tsx
│   └── index.ts
├── PublicLayout/
│   ├── PublicLayout.tsx
│   └── index.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `AppLayout/`

Layout principal do ERP logado: sidebar com módulos habilitados, header com usuário/tenant, área de conteúdo.

### `AuthLayout/`

Layout para telas de autenticação (login, recuperar senha, primeiro acesso). Centralizado, sem sidebar.

### `PublicLayout/`

Layout para páginas públicas (landing, termos de uso, página de erro 404 pública).

---

## Explicação dos arquivos

### `AppLayout.tsx`

```tsx
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
```

### `Sidebar.tsx`

Menu lateral que lista módulos habilitados para o tenant atual (vendas, estoque, financeiro).

### `AuthLayout.tsx`

Layout centralizado com logo do tenant e card de formulário.

---

## Exemplos

No WorkSpeed, a rota `/produtos` usa `AppLayout` e renderiza `ProductListPage` como `children`:

```
router → AppLayout → modules/products/pages/ProductListPage
```

**Erro comum:** colocar a tabela de produtos dentro de `AppLayout.tsx`. A tabela é responsabilidade do módulo `products`, não do layout.

---

## Multi-tenancy

O layout pode adaptar-se ao tenant:

- Logo e cores no `Header` (via `tenants/`)
- Sidebar exibe apenas módulos habilitados (via `tenants/modules`)
- Futuramente: layout customizado por tenant (ex: `TenantCustomLayout`)
