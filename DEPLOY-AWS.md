# Deploy AWS — S3 + CloudFront

## Arquitetura

```
GitHub Actions → Build → S3 (bucket único) → CloudFront (1 distribuição por app)
```

Cada app fica em um prefixo do S3: `/shell`, `/core`, `/carteira`.
Cada prefixo tem sua própria distribuição CloudFront.

---

## 1. Criar o Bucket S3

```bash
aws s3 mb s3://vortex-credit-front --region us-east-1
```

> O bucket **não** precisa de acesso público. O CloudFront acessa via OAC (Origin Access Control).

## 2. Criar as Distribuições CloudFront

Crie **3 distribuições**, uma para cada app. Para cada uma:

1. Acesse o [Console CloudFront](https://console.aws.amazon.com/cloudfront)
2. **Create Distribution**
3. Origin:
   - Origin domain: `vortex-credit-front.s3.us-east-1.amazonaws.com`
   - Origin path: `/shell` (ou `/core` ou `/carteira`)
   - Origin access: **Origin access control settings (OAC)** → Create new OAC
4. Default cache behavior:
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Cache policy: **CachingOptimized**
5. Settings:
   - Default root object: `index.html`
6. **Criar** e copiar a policy S3 que o CloudFront sugere

### Error Pages (importante para SPA)

Em cada distribuição, vá em **Error Pages** e crie:

| HTTP Error Code | Response Page Path | HTTP Response Code |
|---|---|---|
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

### Bucket Policy

Após criar as 3 distribuições, aplique a policy no bucket S3:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::vortex-credit-front/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": [
            "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_SHELL",
            "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_CORE",
            "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_CARTEIRA"
          ]
        }
      }
    }
  ]
}
```

> Substitua `ACCOUNT_ID`, `DIST_SHELL`, `DIST_CORE`, `DIST_CARTEIRA` pelos seus valores.

## 3. Criar IAM User para o GitHub Actions

Crie um IAM user `github-actions-deploy` com a seguinte policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::vortex-credit-front",
        "arn:aws:s3:::vortex-credit-front/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "*"
    }
  ]
}
```

Gere Access Keys para esse user.

## 4. Configurar Secrets no GitHub

Vá em **GitHub → Repo → Settings → Secrets and variables → Actions**:

### Secrets

| Secret | Valor |
|---|---|
| `AWS_ACCESS_KEY_ID` | Access key do IAM user |
| `AWS_SECRET_ACCESS_KEY` | Secret key do IAM user |
| `S3_BUCKET` | `vortex-credit-front` |
| `CF_DISTRIBUTION_SHELL` | Distribution ID do shell |
| `CF_DISTRIBUTION_CORE` | Distribution ID do core |
| `CF_DISTRIBUTION_CARTEIRA` | Distribution ID do carteira |

### Variables

| Variable | Valor |
|---|---|
| `MFE_CORE_URL` | URL CloudFront do core (ex: `https://d1234abc.cloudfront.net`) |
| `MFE_CARTEIRA_URL` | URL CloudFront do carteira (ex: `https://d5678def.cloudfront.net`) |

## 5. Pronto!

A cada `git push` na `main`, o workflow `.github/workflows/deploy-aws.yml`:

1. Detecta quais apps mudaram
2. Roda lint + type-check
3. Faz build e `aws s3 sync` só do que mudou
4. Invalida o cache do CloudFront

## URLs finais

| App | URL |
|---|---|
| Shell (entrada) | `https://DIST_SHELL.cloudfront.net` |
| Core (remoto) | `https://DIST_CORE.cloudfront.net` |
| Carteira (remoto) | `https://DIST_CARTEIRA.cloudfront.net` |

> Para domínio customizado, adicione um **Alternate Domain Name (CNAME)** na distribuição e um certificado ACM.
