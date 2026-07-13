# core/

## Objetivo da pasta

A pasta `core/` contém a **infraestrutura transversal** da aplicação — tudo que é necessário para o sistema funcionar, mas que não pertence a um módulo de negócio específico nem é um componente visual reutilizável.

Pense em `core/` como o "kernel" do frontend: autenticação, cliente HTTP base, configuração de ambiente, tratamento de erros e utilitários de infraestrutura.

---

## O que deve existir nela

- Cliente HTTP base (Axios instance)
- Lógica de autenticação (tokens, refresh, guards)
- Configuração de ambiente (`env.ts`)
- Classes/tipos de erro padronizados
- Interceptors de request/response
- Hooks de infraestrutura (`useAuth`, `usePermissions`)

### Tipos de arquivos permitidos

- Configurações
- Clientes HTTP
- Serviços de infraestrutura
- Hooks de auth/permissões
- Classes de erro
- Constantes de infraestrutura

---

## O que NÃO deve existir nela

- Componentes visuais (vão em `shared/components/`)
- Páginas ou módulos de negócio (vão em `modules/`)
- Chamadas de API específicas de domínio (vão em `modules/<modulo>/services/`)
- Stores Zustand (vão em `stores/`, exceto se for store de auth — ainda assim prefira `stores/`)
- Estilos CSS

---

## Estrutura sugerida

```
core/
├── api/
│   ├── http-client.ts
│   ├── interceptors.ts
│   └── index.ts
├── auth/
│   ├── auth.service.ts
│   ├── useAuth.ts
│   ├── AuthGuard.tsx
│   └── index.ts
├── config/
│   ├── env.ts
│   └── index.ts
├── errors/
│   ├── AppError.ts
│   ├── error-handler.ts
│   └── index.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `api/`

Cliente HTTP centralizado. Toda requisição do WorkSpeed passa por aqui para injetar token, tenant ID e tratar erros globalmente.

### `auth/`

Autenticação, autorização, refresh de token e guards de rota.

### `config/`

Variáveis de ambiente tipadas (`VITE_API_URL`, `VITE_APP_ENV`).

### `errors/`

Padronização de erros da aplicação para tratamento consistente em toda a UI.

---

## Explicação dos arquivos

### `api/http-client.ts`

Instância Axios configurada com baseURL, timeout e headers padrão.

```typescript
// Injeta automaticamente: Authorization, X-Tenant-Id
export const httpClient = axios.create({
  baseURL: env.API_URL,
  timeout: 30_000,
})
```

### `auth/useAuth.ts`

Hook que expõe estado de autenticação (usuário logado, token, logout).

### `config/env.ts`

```typescript
export const env = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_ENV: import.meta.env.VITE_APP_ENV,
} as const
```

### `errors/AppError.ts`

Classe base para erros da aplicação com `code`, `message` e `statusCode`.

---

## Exemplos

Quando o usuário faz login no WorkSpeed:

1. `modules/auth/pages/LoginPage.tsx` renderiza o formulário
2. `modules/auth/services/auth.service.ts` chama a API
3. `core/api/http-client.ts` envia a requisição
4. `core/auth/useAuth.ts` atualiza o estado de sessão
5. `stores/auth.store.ts` persiste o token

**Erro comum:** colocar `product.service.ts` em `core/`. Produtos são domínio de negócio → `modules/products/services/`.

---

## core/ vs services/

| | `core/` | `services/` |
|---|---------|-------------|
| Escopo | Infraestrutura | Integrações compartilhadas |
| Exemplo | http-client, auth | notificações, upload, CEP |
| Depende de módulo? | Não | Não, mas é funcional |
