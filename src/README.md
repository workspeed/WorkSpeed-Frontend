# WorkSpeed — Arquitetura Frontend

Este documento é a visão geral da arquitetura do frontend do **WorkSpeed**, um ERP SaaS multi-tenant.

## Princípios arquiteturais

1. **Feature-Based Architecture** — cada módulo de negócio (produtos, vendas, financeiro) é isolado em `modules/`.
2. **Separação por responsabilidade** — cada pasta tem um propósito único e documentado.
3. **Baixo acoplamento** — módulos não importam uns aos outros diretamente; comunicação via `core/`, `shared/` ou eventos.
4. **Multi-tenancy** — identidade visual, permissões e módulos habilitados são resolvidos em `tenants/`.
5. **Escalabilidade incremental** — novos módulos são adicionados sem reorganizar a estrutura existente.

## Estrutura principal

```
src/
├── app/          → Composição raiz da aplicação (providers, App)
├── assets/       → Arquivos estáticos (imagens, ícones, fontes)
├── core/         → Infraestrutura transversal (API, auth, config, erros)
├── layouts/      → Layouts reutilizáveis (sidebar, auth, público)
├── modules/      → Módulos de negócio do ERP (features)
├── router/       → Definição e guardas de rotas
├── services/     → Serviços HTTP compartilhados (não específicos de um módulo)
├── shared/       → Componentes, hooks e utilitários genéricos
├── stores/       → Estado global (Zustand)
├── styles/       → Estilos globais, tokens e animações
├── tenants/      → Resolução e aplicação de contexto multi-tenant
├── types/        → Tipos globais compartilhados entre camadas
├── utils/        → Funções utilitárias puras (sem dependência de React)
└── main.tsx      → Ponto de entrada da aplicação
```

## Regras de dependência

As importações devem seguir esta hierarquia (de cima para baixo):

```
main.tsx → app → router → layouts → modules
                              ↓
                    shared / core / stores / tenants / services
                              ↓
                         types / utils / styles / assets
```

| Camada | Pode importar de | Não pode importar de |
|--------|------------------|----------------------|
| `modules/` | `shared/`, `core/`, `stores/`, `tenants/`, `types/`, `utils/` | Outros módulos diretamente |
| `shared/` | `types/`, `utils/`, `styles/` | `modules/`, `layouts/` |
| `core/` | `types/`, `utils/` | `modules/`, `shared/components/` |
| `utils/` | Nada de React ou negócio | Qualquer camada acima |

## Path alias

Use `@/` para importações absolutas a partir de `src/`:

```typescript
import { Button } from '@/shared/components/Button'
import { useAuth } from '@/core/auth/useAuth'
```

## Documentação por pasta

Cada pasta principal possui seu próprio `README.md` com regras detalhadas. Consulte-os antes de criar novos arquivos.

## Stack

- React 19 + TypeScript
- React Router 8
- Zustand (estado global)
- TanStack Query (server state)
- Axios (HTTP)
- React Hook Form + Zod (formulários e validação)
- Tailwind CSS 4
- React Icons
