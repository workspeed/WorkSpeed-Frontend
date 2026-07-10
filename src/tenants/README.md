# tenants/

## Objetivo da pasta

A pasta `tenants/` gerencia tudo relacionado ao **multi-tenancy** no frontend: resolução do tenant atual, aplicação de branding (cores, logo, favicon, fontes), verificação de módulos habilitados e configurações específicas por empresa.

É o ponto central que transforma o WorkSpeed de "um ERP" em "o ERP da Empresa X".

---

## O que deve existir nela

- Provider de contexto do tenant
- Hooks (`useTenant`, `useTenantBranding`, `useTenantModules`)
- Serviço de resolução de tenant (subdomínio, slug, ID)
- Utilitários de branding (aplicar CSS variables, trocar favicon)
- Types do tenant

### Tipos de arquivos permitidos

- Providers
- Hooks
- Services
- Types
- Utilitários de branding/theming

---

## O que NÃO deve existir nela

- Lógica de negócio de módulos (vai em `modules/`)
- Componentes visuais genéricos (vão em `shared/`)
- Autenticação de usuário (vai em `core/auth/` — tenant e user são conceitos distintos)
- Stores (preferir `stores/tenant.store.ts` para estado, `tenants/` para lógica de resolução)

---

## Estrutura sugerida

```
tenants/
├── TenantProvider.tsx
├── hooks/
│   ├── useTenant.ts
│   ├── useTenantBranding.ts
│   └── useTenantModules.ts
├── services/
│   └── tenant.service.ts
├── utils/
│   ├── applyBranding.ts
│   └── resolveTenant.ts
├── types/
│   └── tenant.types.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `hooks/`

Hooks para consumir contexto do tenant em qualquer componente.

### `services/`

API calls para buscar dados do tenant (configurações, módulos, branding).

### `utils/`

Funções puras: resolver tenant por subdomínio, aplicar CSS variables, trocar favicon dinamicamente.

### `types/`

Interfaces `Tenant`, `TenantBranding`, `TenantModule`, `TenantConfig`.

---

## Explicação dos arquivos

### `TenantProvider.tsx`

Provider que carrega o tenant no boot da aplicação e disponibiliza via Context.

```tsx
export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { data: tenant } = useQuery({
    queryKey: ['tenant', tenantSlug],
    queryFn: () => tenantService.getCurrent(),
  })

  useEffect(() => {
    if (tenant) applyBranding(tenant.branding)
  }, [tenant])

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}
```

### `useTenantModules.ts`

```typescript
export function useTenantModules() {
  const tenant = useTenant()
  const hasModule = (module: string) =>
    tenant?.enabledModules.includes(module) ?? false
  return { hasModule, modules: tenant?.enabledModules ?? [] }
}
```

Usado por `router/guards/RequireModule` e `layouts/Sidebar`.

### `applyBranding.ts`

Aplica cores, fontes e favicon do tenant em runtime:

```typescript
export function applyBranding(branding: TenantBranding) {
  const root = document.documentElement
  root.style.setProperty('--tenant-primary', branding.primaryColor)
  root.style.setProperty('--tenant-secondary', branding.secondaryColor)
  updateFavicon(branding.faviconUrl)
}
```

### `tenant.types.ts`

```typescript
export interface Tenant {
  id: string
  name: string
  slug: string
  branding: TenantBranding
  enabledModules: string[]
  config: TenantConfig
}
```

---

## Exemplos

### Fluxo de resolução de tenant

```
1. Usuário acessa acme.workspeed.com.br
2. resolveTenant() extrai slug "acme" do subdomínio
3. tenantService.getCurrent() busca dados na API
4. TenantProvider aplica branding
5. Sidebar renderiza apenas módulos em enabledModules
```

### Empresa com módulos parciais

```typescript
// Tenant "Loja ABC" tem apenas vendas e estoque
tenant.enabledModules = ['sales', 'inventory']

// Router bloqueia /financeiro
<RequireModule module="finance">  // → redirect
```

---

## Tenant vs User vs Auth

| Conceito | Responsabilidade | Pasta |
|----------|-----------------|-------|
| **Tenant** | Empresa, branding, módulos | `tenants/` |
| **User** | Pessoa, permissões RBAC | `core/auth/` |
| **Auth** | Sessão, token, login | `core/auth/` + `stores/auth.store.ts` |

Um usuário pertence a um tenant e tem permissões dentro dele.

---

## Estratégias de resolução de tenant

| Estratégia | Prós | Contras |
|------------|------|---------|
| **Subdomínio** (`acme.app.com`) | Isolamento claro, SEO | DNS wildcard necessário |
| **Path** (`/t/acme/dashboard`) | Simples de configurar | Menos elegante |
| **Header** (`X-Tenant-Id`) | Flexível para API | Não visível na URL |

**Recomendação para WorkSpeed:** subdomínio para produção, slug em path para desenvolvimento local.
