# types/

## Objetivo da pasta

A pasta `types/` contém **tipos e interfaces TypeScript globais** compartilhados entre múltiplas camadas da aplicação (módulos, core, shared, stores). Tipos exclusivos de um módulo ficam em `modules/<modulo>/types/`.

---

## O que deve existir nela

- Tipos base reutilizáveis (`PaginatedResponse`, `ApiError`, `ID`, `Timestamps`)
- Interfaces compartilhadas entre módulos (com critério)
- Utility types globais
- Enums transversais

### Tipos de arquivos permitidos

- Arquivos `.types.ts`
- Arquivos de enums globais
- Utility types
- Declarações de módulo (`.d.ts`) se necessário

---

## O que NÃO deve existir nela

- Tipos exclusivos de um módulo (vão no módulo)
- Lógica ou funções (vão em `utils/`)
- Componentes React
- Schemas Zod (vão nos módulos — Zod gera types)
- Qualquer código executável

---

## Estrutura sugerida

```
types/
├── api.types.ts
├── common.types.ts
├── pagination.types.ts
├── user.types.ts
└── index.ts
```

---

## Explicação de cada subpasta

Pasta plana por design. Subpastas só se o volume crescer muito (ex: `types/api/`).

---

## Explicação dos arquivos

### `api.types.ts`

Tipos relacionados à comunicação com API:

```typescript
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  code: string
  message: string
  statusCode: number
  details?: Record<string, string[]>
}
```

### `pagination.types.ts`

```typescript
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

export interface PaginationParams {
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```

### `common.types.ts`

```typescript
export type ID = string
export type Nullable<T> = T | null

export interface Timestamps {
  createdAt: string
  updatedAt: string
}
```

### `user.types.ts`

Tipo `User` usado em auth, header, permissões e múltiplos módulos.

---

## Exemplos

### Tipo exclusivo de produto

```typescript
// ✅ Correto — modules/products/types/product.types.ts
export interface Product {
  id: string
  name: string
  sku: string
  price: number
}
```

### Tipo usado em 3+ módulos

```typescript
// ✅ Correto — types/user.types.ts
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}
```

---

## types/ vs schemas/ (Zod)

| Abordagem | Quando usar |
|-----------|-------------|
| **Zod schema** gera type (`z.infer`) | Formulários, validação de input |
| **Interface manual** em `types/` | Contratos de API, tipos compartilhados |
| **Type no módulo** | Domínio exclusivo |

```typescript
// modules/products/schemas/product.schema.ts
export const productSchema = z.object({ name: z.string() })
export type ProductFormData = z.infer<typeof productSchema>

// modules/products/types/product.types.ts
export interface Product extends Timestamps {
  id: string
  name: string
}
```

**Regra:** não duplique. Se Zod já gera o type, não crie interface manual idêntica.

---

## Evite o "God types"

Não coloque todos os tipos do ERP em `types/`. Isso cria acoplamento e dificulta remoção de módulos. Pergunte: "quantos módulos usam este type?" — se a resposta é 1, fica no módulo.
