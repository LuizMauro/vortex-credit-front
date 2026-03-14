# Deploy — Guia de Setup

## Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com) (free tier)

---

## Passo a passo

### 1. Subir o código para o GitHub

```bash
cd vortex-credit
git init
git add .
git commit -m "feat: initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/vortex-credit.git
git push -u origin main
```

### 2. Criar 3 projetos no Vercel

Acesse [vercel.com/new](https://vercel.com/new) e crie 3 projetos:

| Projeto | Root Directory | Nome sugerido |
|---|---|---|
| Shell | `apps/shell` | `vortex-shell` |
| Core | `apps/core` | `vortex-core` |
| Carteira | `apps/carteira` | `vortex-carteira` |

> Em cada projeto, vá em **Settings > General** e configure:
> - **Build Command**: deixe vazio (o GitHub Actions faz o build)
> - **Output Directory**: `dist`

### 3. Pegar os IDs do Vercel

No terminal, instale a CLI do Vercel:

```bash
npm i -g vercel
vercel login
```

Para cada projeto:

```bash
cd apps/shell && vercel link
cd apps/core && vercel link
cd apps/carteira && vercel link
```

Isso cria um `.vercel/project.json` com o `projectId` e `orgId`.

### 4. Configurar Secrets no GitHub

Vá em **GitHub > Repo > Settings > Secrets and variables > Actions** e adicione:

#### Secrets (valores sensíveis)

| Secret | Onde encontrar |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `.vercel/project.json` de qualquer projeto |
| `VERCEL_PROJECT_SHELL` | `.vercel/project.json` do shell |
| `VERCEL_PROJECT_CORE` | `.vercel/project.json` do core |
| `VERCEL_PROJECT_CARTEIRA` | `.vercel/project.json` do carteira |

#### Variables (valores públicos)

| Variable | Valor |
|---|---|
| `MFE_CORE_URL` | URL do projeto Core no Vercel (ex: `https://vortex-core.vercel.app`) |
| `MFE_CARTEIRA_URL` | URL do projeto Carteira no Vercel (ex: `https://vortex-carteira.vercel.app`) |

### 5. Pronto!

A cada `git push` na `main`:

1. Pipeline detecta quais apps mudaram
2. Roda lint + type-check
3. Faz build e deploy **só do que mudou**
4. Shell é deployado por último (depende dos MFEs)

---

## Fluxo da Pipeline

```
push na main
    │
    ├── detect-changes (quais apps mudaram?)
    │
    ├── quality (lint + type-check em tudo)
    │
    ├── deploy-core ──────┐ (se core ou packages mudaram)
    ├── deploy-carteira ──┤ (se carteira ou packages mudaram)
    │                     │
    └── deploy-shell ─────┘ (se shell ou packages mudaram, roda por último)
```

## URLs finais

| App | URL |
|---|---|
| Shell (entrada) | `https://vortex-shell.vercel.app` |
| Core (remoto) | `https://vortex-core.vercel.app` |
| Carteira (remoto) | `https://vortex-carteira.vercel.app` |

O usuário acessa **apenas o Shell**. Os MFEs são carregados automaticamente via Module Federation.
