# assets/

## Objetivo da pasta

A pasta `assets/` armazena **arquivos estáticos** importados diretamente no código (imagens, ícones SVG, fontes). Diferente de `public/`, arquivos aqui passam pelo bundler (Vite) e recebem hash no build para cache busting.

Use `public/` apenas para arquivos que precisam de URL fixa (favicon, manifest, robots.txt).

---

## O que deve existir nela

- Imagens (`.png`, `.jpg`, `.webp`, `.svg`)
- Fontes (`.woff2`, `.woff`, `.ttf`)
- Ícones SVG usados como componentes ou imports
- Ilustrações e logos **padrão** do WorkSpeed (não do tenant)

### Tipos de arquivos permitidos

- Imagens
- Fontes
- SVGs estáticos
- Arquivos de mídia leve

---

## O que NÃO deve existir nela

- Logos ou favicons **específicos de tenant** (vêm da API/CDN em runtime)
- Componentes React (vão em `shared/components/`)
- CSS (vai em `styles/`)
- JSON de configuração (vai em `core/config/` ou vem da API)
- Código TypeScript/JavaScript

---

## Estrutura sugerida

```
assets/
├── images/
│   ├── logo-default.svg
│   ├── empty-state-products.svg
│   └── onboarding-hero.webp
├── icons/
│   └── custom-icons.svg
└── fonts/
    └── inter-var.woff2
```

---

## Explicação de cada subpasta

### `images/`

Ilustrações, logos padrão, imagens de empty state e onboarding.

### `icons/`

Ícones SVG que não estão no React Icons e precisam ser importados como arquivo.

### `fonts/`

Fontes locais quando não usadas via Google Fonts ou CDN do tenant.

---

## Explicação dos arquivos

### `logo-default.svg`

Logo padrão do WorkSpeed, exibida antes do tenant ser resolvido ou na tela de login.

### `empty-state-products.svg`

Ilustração exibida quando a lista de produtos está vazia — reutilizada em `modules/products/`.

---

## Exemplos

```tsx
// Importação correta
import logoDefault from '@/assets/images/logo-default.svg'

// Logo do tenant (NÃO fica em assets/)
<img src={tenant.branding.logoUrl} alt={tenant.name} />
```

**Regra:** se o arquivo muda por tenant, não coloque em `assets/`. Use URL dinâmica do backend.

---

## assets/ vs public/

| Critério | `assets/` | `public/` |
|----------|-----------|-----------|
| Processado pelo Vite | Sim | Não |
| Hash no build | Sim | Não |
| URL fixa | Não | Sim |
| Uso típico | Imagens em componentes | favicon, manifest, PWA |
