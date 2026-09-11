# Security Policy

ClimateStudy is a public repository. Security and privacy are therefore first-class requirements.

## Never commit secrets

Do **not** commit any of the following:

- API keys or access tokens
- Database passwords or credential-bearing connection strings
- Wallet seed phrases or private keys
- BTCPay API keys, webhook secrets or signing secrets
- Cloud-provider credentials
- OAuth client secrets
- Session secrets
- Personal data that is not necessary for the project

Use environment variables or a secure secret manager for private configuration.

## Public wallet addresses

A public receive address may be published when deliberately intended for donations or payments. A private key or seed phrase must never be published.

## Reporting a vulnerability

Please do not disclose an exploitable security vulnerability in a public issue.

Instead, report it privately through the repository's GitHub security reporting mechanism when available. Include:

1. a concise description;
2. affected component or file;
3. reproduction steps;
4. potential impact;
5. a suggested mitigation, when known.

Please do not include passwords, private keys, tokens or other secrets in a report.

## Incident response

If a credential is accidentally committed:

1. Revoke or rotate it immediately.
2. Remove it from the working tree and history as appropriate.
3. Review GitHub Actions logs and deployments for exposure.
4. Check related services for unauthorized access.
5. Document the remediation without publishing the secret.

Removing a secret from the latest commit is not enough if it has already appeared in Git history.
