# ClimateStudy — Persistent Project Context

This file is the canonical handoff context for future AI-assisted development sessions.
Read this file before making architectural, product, monetization, security, or growth decisions.

## Project identity

- Repository: `https://github.com/ClimaVids/climatestudy`
- Owner/brand: ClimaVids
- Product name: ClimateStudy
- Maintainer: Dr. Hossein Imanipour
- Primary public language: English
- Audience: global users, students, researchers, educators, creators, and climate/weather enthusiasts.
- Market is global-first; do not make Iran the default product market.

## Core objective

Build a global climate/weather intelligence product that can acquire users organically, create useful shareable outputs, and convert a portion of users into paying customers through digital products, API access, and cryptocurrency payments.

The project must be capable of growing through its own outputs rather than depending on paid advertising.

## Growth engine — all enabled

The product should support these growth loops together:

1. Free useful tool → result → public share page → new visitor.
2. Every result page contains a natural ClimateStudy attribution and a clear CTA to create another result.
3. One-click sharing and copy-link flows.
4. Copy/shareable canonical URLs for reports and analyses.
5. Referral links (`?ref=`) with a server-side referral endpoint when the API is deployed.
6. Referral rewards, initially as product credits rather than cash payouts.
7. Embeddable charts/maps with attribution.
8. Creator-friendly downloadable images and charts.
9. Citation-friendly research pages with source and methodology metadata.
10. SEO-friendly public result pages where technically appropriate.
11. Student/research workflows that naturally produce shareable outputs.
12. Community/Open Source development on GitHub using real contributions only; never manufacture issues, PRs, stars, or other activity.

## Monetization direction

Free utility comes first. Monetization is layered behind:

- premium analyses
- advanced reports
- research/creator workflows
- API credits
- embeddable/pro tools
- referrals and partner programs
- voluntary support
- cryptocurrency checkout

Crypto is a payment rail for ClimateStudy digital products, not the product itself. The project is not a trading, investment, custody, or wallet-management service.

Target crypto assets for the initial design: BTC, LTC, and DOGE, subject to technical/provider availability and applicable laws.

## Current payment architecture

- Public receive addresses are displayed only on `support.html` for voluntary support.
- Commercial checkout is implemented server-side in `worker/src/index.js` through the BTCPay Greenfield API.
- Product prices are server-side constants; browser input cannot override the price.
- D1 stores referral counts and orders/invoice states.
- BTCPay webhook signatures are validated using `BTCPay-Sig` HMAC-SHA256 before order status changes.
- Secrets are runtime-only Worker secrets: `BTCPAY_URL`, `BTCPAY_STORE_ID`, `BTCPAY_API_KEY`, `BTCPAY_WEBHOOK_SECRET`.
- The Worker has not been deployed/configured with real credentials yet. Do not claim that commercial checkout is live until a real Worker URL and BTCPay integration have been configured and tested.

## Product principles

- Global by design: use coordinates and international standards.
- English first.
- Free value before payment.
- Shareability is a product feature, not an afterthought.
- Every public result should help acquire the next user.
- Scientific claims must be traceable to data sources/methods.
- Never expose provider credentials client-side.
- Keep high-value commercial secrets out of the public repository.
- Prefer simple, free/low-cost infrastructure until real usage justifies paid infrastructure.
- Build an MVP before adding complexity.

## Relationship to other ClimaVids projects

`climavids-weather` is the separate core weather infrastructure project and remains private.
ClimateStudy is the public-facing/global growth and product layer. Do not copy private implementation details or secrets from `climavids-weather` into this repository.

## Current MVP concept

ClimateStudy currently has a static frontend workflow for:

- global location search
- current weather snapshot
- 7-day forecast
- Leaflet map
- shareable result URL
- CSV download
- quick-start locations
- referral-link UI
- premium pricing page
- public crypto-support page

The weather MVP uses Open-Meteo for the initial non-commercial audience-building stage. Provider licensing must be reviewed before commercial traffic is enabled.

## Backend components

- `worker/src/index.js`: referral endpoint, BTCPay invoice creation, signed webhook handling.
- `worker/schema.sql`: canonical D1 schema reference.
- `worker/migrations/0001_init.sql`: Wrangler D1 migration.
- `worker/wrangler.toml`: Cloudflare Worker/D1 configuration template.
- `worker/README.md`: deployment and secret instructions.
- `api-config.js`: public frontend API-base configuration.
- `growth.js`: referral code generation, attribution and backend tracking hook.
- `pricing.html`: premium product checkout UI.

## Future product flow

Free input → analysis → preview → shareable result → referral/organic acquisition → optional premium upgrade → crypto checkout → verified fulfillment.

## Security boundary

The repository is public. Assume every committed byte is public forever.
Never commit:

- `.env` files containing values
- real API keys/tokens
- database credentials
- BTCPay API keys or webhook secrets
- wallet seed phrases/private keys
- server SSH keys
- unpublished personal data
- production customer data
- private business credentials

Use environment variables / GitHub Actions Secrets / hosting provider secrets for runtime credentials.

## Development workflow

- Keep the main branch deployable when possible.
- Add tests before or with new logic.
- Document important architectural decisions in `docs/DECISIONS.md`.
- Update `docs/ROADMAP.md` when scope changes.
- Update this file when a foundational product decision changes.
- Do not ask the maintainer to repeat decisions already documented here.

## Current status

**Frontend MVP:** implemented.

**Growth UI:** implemented; server-side referral tracking is coded but requires Worker deployment.

**Crypto support page:** live in the repository.

**Commercial crypto checkout:** backend code implemented; requires Cloudflare Worker + D1 deployment and BTCPay configuration/secrets before it is live.

**Next highest-value step:** deploy/configure the Worker, connect D1, create the scoped BTCPay API key and webhook, set `api-config.js`, then run an end-to-end test purchase at a low amount before advertising the premium products.
