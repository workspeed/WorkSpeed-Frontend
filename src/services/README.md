# services/

## Objetivo da pasta

A pasta `services/` contém **serviços compartilhados** que não pertencem a um módulo de negócio específico, mas são usados por múltiplos módulos. Diferente de `core/`, que é infraestrutura, `services/` é funcional — integra com APIs ou serviços externos transversais.

---

## O que deve existir nela

- Serviços de integração compartilhada (upload de arquivos, notificações, CEP, CNPJ)
- Serviços que abstraem APIs usadas por 2+ módulos
- Adapters para serviços externos

### Tipos de arquivos permitidos

- Funções/classe de serviço
- Tipos auxiliares do serviço (se não forem globais)
- Mocks de serviço (desenvolvimento)

---

## O que NÃO deve existir nela

- Cliente HTTP base (vai em `core/api/`)
- Serviços de domínio específico (vão em `modules/<modulo>/services/`)
- Componentes React
- Stores
- Lógica de autenticação

---

## Estrutura sugerida

```
services/
├── upload.service.ts
├── notification.service.ts
├── address.service.ts
└── index.ts
```

---

## Explicação de cada subpasta

Esta pasta é plana por design — sem subpastas até que o volume justifique agrupamento (ex: `services/integrations/`).

---

## Explicação dos arquivos

### `upload.service.ts`

Upload de arquivos para S3/storage, usado por produtos (imagem), financeiro (anexo) e RH (documentos).

```typescript
export const uploadService = {
  upload: (file: File, context: UploadContext) =>
    httpClient.post<UploadResult>('/uploads', formData),
}
```

### `address.service.ts`

Consulta de CEP via API externa, usado em cadastro de clientes, fornecedores e empresa.

### `notification.service.ts`

Envio e listagem de notificações in-app, consumido pelo header e múltiplos módulos.

---

## Exemplos

| Serviço | Usado por |
|---------|-----------|
| `upload.service.ts` | products, finance, hr |
| `address.service.ts` | customers, suppliers, settings |
| `notification.service.ts` | header, sales, finance |

**Erro comum:** colocar `product.service.ts` aqui porque "é um service". Se só o módulo de produtos usa, fica em `modules/products/services/`.

---

## services/ vs core/ vs modules/

```
core/api/http-client.ts     → Infraestrutura (como fazer requests)
services/upload.service.ts  → Funcional transversal (o que fazer)
modules/products/services/  → Domínio específico (regras de produto)
```

### Quando mover de modules/ para services/

Somente quando **2 ou mais módulos** precisam da mesma integração e a lógica é idêntica. Caso contrário, duplicar é preferível a acoplar módulos.
