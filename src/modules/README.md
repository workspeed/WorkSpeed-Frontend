# modules/

## Objetivo da pasta

A pasta `modules/` é o **coração do ERP** — cada subpasta representa um módulo de negócio independente (feature). É aqui que vivem produtos, vendas, clientes, financeiro, estoque e todos os futuros módulos.

Cada módulo é uma unidade autocontida com seus próprios componentes, páginas, hooks, services, schemas e types.

---

## O que deve existir nela

Cada módulo deve seguir a mesma estrutura interna:

- `components/` — componentes exclusivos do módulo
- `pages/` — páginas/rotas do módulo
- `hooks/` — hooks de lógica do módulo
- `services/` — chamadas API do domínio
- `schemas/` — validações Zod
- `types/` — tipos do domínio
- `stores/` — estado local do módulo (se necessário)
- `index.ts` — API pública do módulo (exports controlados)

### Tipos de arquivos permitidos

- Tudo relacionado ao domínio daquele módulo

---

## O que NÃO deve existir nela

- Componentes genéricos reutilizáveis (vão em `shared/`)
- Infraestrutura HTTP base (vai em `core/api/`)
- Layouts globais (vão em `layouts/`)
- Importações diretas entre módulos (ex: `products` importando de `sales`)
- Arquivos soltos na raiz de `modules/` (sempre dentro de um módulo)

---

## Estrutura sugerida

```
modules/
├── auth/
│   ├── components/
│   │   └── LoginForm.tsx
│   ├── pages/
│   │   └── LoginPage.tsx
│   ├── hooks/
│   │   └── useLogin.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── schemas/
│   │   └── login.schema.ts
│   ├── types/
│   │   └── auth.types.ts
│   └── index.ts
├── products/
│   ├── components/
│   │   ├── ProductTable.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductFilters.tsx
│   ├── pages/
│   │   ├── ProductListPage.tsx
│   │   └── ProductDetailPage.tsx
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useProductForm.ts
│   ├── services/
│   │   └── product.service.ts
│   ├── schemas/
│   │   └── product.schema.ts
│   ├── types/
│   │   └── product.types.ts
│   └── index.ts
├── sales/
│   └── ...
└── dashboard/
    └── ...
```

---

## Explicação de cada subpasta (dentro de um módulo)

### `components/`

Componentes visuais usados **apenas** neste módulo. Se outro módulo precisar, avalie mover para `shared/`.

### `pages/`

Componentes que representam uma rota completa. Conectam hooks, services e components.

### `hooks/`

Lógica reativa do módulo: queries TanStack, formulários, estado derivado.

### `services/`

Funções que chamam a API REST do domínio via `httpClient` de `core/api/`.

### `schemas/`

Schemas Zod para validação de formulários e payloads.

### `types/`

Interfaces e types exclusivos do domínio (ex: `Product`, `CreateProductDTO`).

### `stores/`

Estado Zustand local do módulo (filtros persistentes, wizard multi-step). Estado global vai em `stores/` na raiz.

---

## Explicação dos arquivos

### `ProductTable.tsx`

Responsável por exibir a tabela de produtos com paginação, ordenação e ações.

### `ProductForm.tsx`

Formulário de criação/edição de produto usando React Hook Form + Zod.

### `product.service.ts`

```typescript
export const productService = {
  getAll: (params: ProductFilters) =>
    httpClient.get<Product[]>('/products', { params }),
  getById: (id: string) =>
    httpClient.get<Product>(`/products/${id}`),
  create: (data: CreateProductDTO) =>
    httpClient.post<Product>('/products', data),
}
```

### `product.schema.ts`

```typescript
export const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  sku: z.string().min(1, 'SKU obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
})
```

### `index.ts`

Exporta apenas o que outros módulos/router precisam ver (geralmente páginas e rotas):

```typescript
export { ProductListPage } from './pages/ProductListPage'
export { ProductDetailPage } from './pages/ProductDetailPage'
```

---

## Exemplos

### Módulo de Vendas precisa de dados de Produto

**Errado:**
```typescript
// modules/sales/services/sale.service.ts
import { productService } from '@/modules/products/services/product.service'
```

**Correto — opções:**

1. **API compõe os dados** — endpoint `/sales` já retorna produto embutido
2. **Hook na página** — a página de venda busca produto e passa como prop
3. **Entidade compartilhada em `types/`** — apenas o type `Product`, não o service

### Quando criar um novo módulo

Ao adicionar "Financeiro" ao WorkSpeed:

```
modules/finance/
├── components/
├── pages/
├── hooks/
├── services/
├── schemas/
├── types/
└── index.ts
```

Nenhuma pasta existente precisa ser reorganizada.

---

## Comunicação entre módulos

| Abordagem | Quando usar |
|-----------|-------------|
| API/backend compõe dados | Preferida — desacopla frontend |
| Event bus / pub-sub | Ações cross-module (ex: "venda criada" atualiza dashboard) |
| `types/` compartilhado | Apenas interfaces, nunca services |
| Import direto entre módulos | **Evitar** — cria acoplamento |
