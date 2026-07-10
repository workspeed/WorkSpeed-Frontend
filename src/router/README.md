# router/

## Objetivo da pasta

A pasta `router/` centraliza toda a **definição de rotas** da aplicação: paths, lazy loading de páginas, layouts associados, guards de autenticação e proteção por módulo/permissão.

Manter rotas em um único lugar evita fragmentação e facilita a visão global da navegação do ERP.

---

## O que deve existir nela

- Definição do router (React Router)
- Configuração de rotas por módulo
- Guards (`RequireAuth`, `RequireModule`, `RequirePermission`)
- Utilitários de navegação
- Mapa de rotas tipado (opcional)

### Tipos de arquivos permitidos

- Configuração de rotas
- Componentes guard/wrapper de rota
- Helpers de navegação
- Constantes de paths

---

## O que NÃO deve existir nela

- Páginas completas (vão em `modules/<modulo>/pages/`)
- Layouts (vão em `layouts/`)
- Lógica de autenticação (vai em `core/auth/`, guards apenas consomem)
- Componentes visuais genéricos
- Chamadas de API

---

## Estrutura sugerida

```
router/
├── routes/
│   ├── auth.routes.tsx
│   ├── products.routes.tsx
│   ├── sales.routes.tsx
│   └── index.ts
├── guards/
│   ├── RequireAuth.tsx
│   ├── RequireModule.tsx
│   └── RequirePermission.tsx
├── router.tsx
├── paths.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `routes/`

Arquivos de rota agrupados por módulo. Cada módulo exporta suas rotas e o `router.tsx` as compõe.

### `guards/`

Componentes wrapper que protegem rotas (autenticação, módulo habilitado, permissão RBAC).

---

## Explicação dos arquivos

### `router.tsx`

Monta o router final combinando todas as rotas:

```tsx
export const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          ...productRoutes,
          ...salesRoutes,
          ...dashboardRoutes,
        ],
      },
    ],
  },
  ...authRoutes,
])
```

### `paths.ts`

Constantes de paths tipadas para evitar strings mágicas:

```typescript
export const paths = {
  login: '/login',
  dashboard: '/',
  products: {
    list: '/produtos',
    detail: (id: string) => `/produtos/${id}`,
  },
} as const
```

### `guards/RequireModule.tsx`

Verifica se o módulo está habilitado para o tenant atual antes de renderizar a rota.

```tsx
export function RequireModule({ module, children }: Props) {
  const { hasModule } = useTenant()
  if (!hasModule(module)) return <Navigate to="/" />
  return children
}
```

### `routes/products.routes.tsx`

```tsx
export const productRoutes: RouteObject[] = [
  {
    path: paths.products.list,
    element: (
      <RequireModule module="products">
        <ProductListPage />
      </RequireModule>
    ),
  },
]
```

---

## Exemplos

Fluxo de navegação no WorkSpeed:

1. Usuário acessa `/produtos`
2. `RequireAuth` verifica sessão
3. `AppLayout` renderiza sidebar + conteúdo
4. `RequireModule("products")` verifica se tenant tem módulo
5. `ProductListPage` é renderizada

**Erro comum:** definir rotas dentro de `modules/products/pages/`. A página fica no módulo, a **configuração da rota** fica em `router/`.

---

## Lazy loading

Use `React.lazy` para code-splitting por módulo:

```tsx
const ProductListPage = lazy(() =>
  import('@/modules/products').then(m => ({ default: m.ProductListPage }))
)
```

Isso garante que módulos desabilitados nem carreguem JavaScript desnecessário (combinado com guards).
