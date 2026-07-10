# stores/

## Objetivo da pasta

A pasta `stores/` centraliza o **estado global da aplicação** usando Zustand. Estado que precisa ser acessado por múltiplos módulos ou persistir entre navegações vive aqui.

Estado local de um módulo (filtros de uma listagem) deve ficar em `modules/<modulo>/stores/` ou em hooks com TanStack Query.

---

## O que deve existir nela

- Stores Zustand globais
- Slices de estado transversal
- Middleware de persistência (localStorage/sessionStorage)
- Seletores reutilizáveis

### Tipos de arquivos permitidos

- Arquivos de store (`*.store.ts`)
- Tipos do store
- Seletores e actions

---

## O que NÃO deve existir nela

- Server state / cache de API (use TanStack Query)
- Estado exclusivo de um módulo (vai no módulo)
- Componentes React
- Lógica de renderização
- Chamadas de API diretas (stores devem chamar services)

---

## Estrutura sugerida

```
stores/
├── auth.store.ts
├── tenant.store.ts
├── ui.store.ts
├── selectors/
│   └── auth.selectors.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `selectors/` (opcional)

Seletores derivados complexos extraídos do store para evitar re-renders e duplicação.

---

## Explicação dos arquivos

### `auth.store.ts`

Estado de autenticação global: usuário, token, status de sessão.

```typescript
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setSession: (user: User, token: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (user, token) => set({ user, token, isAuthenticated: true }),
      clearSession: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'workspeed-auth' },
  ),
)
```

### `tenant.store.ts`

Tenant atual, módulos habilitados, branding (cores, logo).

### `ui.store.ts`

Estado de UI global: sidebar aberta/fechada, tema, toasts pendentes.

---

## Exemplos

| Estado | Onde guardar | Por quê |
|--------|-------------|---------|
| Lista de produtos da API | TanStack Query | Server state com cache |
| Token JWT | `auth.store.ts` | Global, persiste login |
| Filtro da tabela de produtos | `modules/products/` hook ou store local | Escopo do módulo |
| Sidebar aberta/fechada | `ui.store.ts` | Global, afeta layout |

---

## Zustand vs TanStack Query

```
┌─────────────────────────────────────────────────┐
│  Pergunta: "De onde vem esse dado?"             │
├─────────────────────────────────────────────────┤
│  API/backend  →  TanStack Query                 │
│  UI local     →  useState / Zustand             │
│  Sessão/user  →  Zustand (persist)              │
│  Formulário   →  React Hook Form                │
└─────────────────────────────────────────────────┘
```

**Erro comum:** criar `products.store.ts` global com lista de produtos. Isso duplica o que TanStack Query já faz melhor (cache, refetch, invalidação).

---

## Boas práticas

1. **Um store por domínio transversal** — não um store monolítico
2. **Actions explícitas** — evite mutar estado fora de actions
3. **Seletores** — use seletores para evitar re-renders (`useAuthStore(s => s.user)`)
4. **Não duplique server state** — Query é a fonte de verdade para dados da API
