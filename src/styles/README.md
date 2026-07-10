# styles/

## Objetivo da pasta

A pasta `styles/` contém **estilos globais** da aplicação: tokens de design, temas, animações e CSS que afeta toda a aplicação. Estilos específicos de componentes devem usar Tailwind diretamente nos arquivos `.tsx`.

---

## O que deve existir nela

- CSS global (`global.css`)
- Animações reutilizáveis (`animations.css`)
- Tokens de design via `@theme` do Tailwind CSS 4
- Overrides globais (reset, scrollbar, tipografia base)
- Variáveis CSS para multi-tenancy (cores do tenant)

### Tipos de arquivos permitidos

- Arquivos CSS
- Arquivos de tokens/variáveis
- Keyframes e animações globais

---

## O que NÃO deve existir nela

- CSS de componente específico (use Tailwind no `.tsx` ou CSS Modules junto ao componente)
- Lógica JavaScript/TypeScript
- Imagens ou fontes (vão em `assets/`)
- Estilos de um único módulo

---

## Estrutura sugerida

```
styles/
├── global.css
├── animations.css
├── tenant-theme.css
└── README.md
```

---

## Explicação de cada subpasta

Esta pasta é plana — estilos globais não precisam de subpastas até que o volume cresça significativamente.

---

## Explicação dos arquivos

### `global.css`

Ponto de entrada de estilos. Importa Tailwind, animações e define tokens via `@theme`:

```css
@import "tailwindcss";
@import "./animations.css";

@theme {
  --color-primary: #000;
  --color-secondary: #000;
  --color-green: #039A47;
  --color-red: #ED0707;
  --background: #F0F2F5;
}
```

Importado uma única vez em `main.tsx`.

### `animations.css`

Keyframes e classes de animação reutilizáveis (`fade-in`, `slide-up`, `skeleton-pulse`).

### `tenant-theme.css` (futuro)

Variáveis CSS sobrescritas em runtime pelo `TenantProvider`:

```css
:root {
  --color-primary: var(--tenant-primary, #000);
  --color-secondary: var(--tenant-secondary, #333);
}
```

---

## Exemplos

### Token usado em componente

```tsx
<button className="bg-primary text-white">Salvar</button>
```

O token `--color-primary` vem de `@theme` em `global.css` e pode ser sobrescrito pelo tenant.

### Multi-tenancy

1. Tenant loga → API retorna `{ primaryColor: '#1E40AF' }`
2. `TenantProvider` aplica `document.documentElement.style.setProperty('--tenant-primary', color)`
3. Todos os componentes com `bg-primary` refletem a cor do tenant

---

## styles/ vs Tailwind inline

| Situação | Abordagem |
|----------|-----------|
| Estilo de um componente | Classes Tailwind no `.tsx` |
| Token de cor/espaçamento global | `@theme` em `global.css` |
| Animação reutilizável | `animations.css` |
| Override de tenant | CSS variables + JS |

**Erro comum:** criar `products.css` aqui. Estilos de módulo ficam inline com Tailwind ou co-localizados no componente.
