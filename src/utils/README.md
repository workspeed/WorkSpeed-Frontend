# utils/

## Objetivo da pasta

A pasta `utils/` contém **funções utilitárias puras** — sem dependência de React, sem side effects, sem lógica de negócio. Funções que transformam, formatam, validam ou calculam dados de forma genérica.

---

## O que deve existir nela

- Formatadores (`formatCurrency`, `formatDate`, `formatCPF`)
- Parsers e conversores
- Funções matemáticas auxiliares
- Helpers de string/array/object
- Validadores genéricos (não Zod)

### Tipos de arquivos permitidos

- Funções puras
- Constantes utilitárias
- Helpers sem estado

---

## O que NÃO deve existir nela

- Hooks React (vão em `shared/hooks/` ou no módulo)
- Componentes React
- Chamadas de API
- Lógica de negócio específica (regra de cálculo de imposto → módulo financeiro)
- Stores ou estado
- Qualquer import de React

---

## Estrutura sugerida

```
utils/
├── format/
│   ├── currency.ts
│   ├── date.ts
│   └── document.ts
├── string/
│   ├── slugify.ts
│   └── truncate.ts
├── array/
│   └── groupBy.ts
├── object/
│   └── omit.ts
└── index.ts
```

---

## Explicação de cada subpasta

### `format/`

Funções de formatação para exibição na UI.

### `string/`, `array/`, `object/`

Manipulação genérica de estruturas de dados.

---

## Explicação dos arquivos

### `format/currency.ts`

```typescript
export function formatCurrency(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}
```

Usado em produtos, vendas, financeiro.

### `format/date.ts`

```typescript
export function formatDate(date: string | Date, pattern = 'dd/MM/yyyy'): string {
  // implementação com date-fns ou Intl
}
```

### `format/document.ts`

```typescript
export function formatCPF(cpf: string): string { /* ... */ }
export function formatCNPJ(cnpj: string): string { /* ... */ }
```

### `string/slugify.ts`

```typescript
export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}
```

---

## Exemplos

```tsx
// Uso em módulo de vendas
<span>{formatCurrency(sale.total)}</span>
<span>{formatDate(sale.createdAt)}</span>
```

### Função de negócio vs utilitário

```typescript
// ✅ utils/ — genérico
formatCurrency(1500) // "R$ 1.500,00"

// ❌ NÃO é utils — regra de negócio do módulo financeiro
calculateICMS(price, state, productType)
// → modules/finance/utils/calculateICMS.ts
```

**Teste simples:** se a função precisa saber o que é um "produto" ou "venda", não é utilitário.

---

## utils/ vs shared/hooks/

| | `utils/` | `shared/hooks/` |
|---|----------|-----------------|
| React | Não | Sim |
| Pode ter estado | Não | Sim |
| Testável sem DOM | Sim | Precisa de testing library |
| Exemplo | `formatDate()` | `useDebounce()` |

---

## Testabilidade

Funções em `utils/` devem ser as mais fáceis de testar no projeto — funções puras, sem mocks, sem DOM. Priorize cobertura de testes aqui quando o projeto amadurecer.
