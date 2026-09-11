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
3. One-click sharing to common social platforms.
4. Copy/shareable canonical URLs for reports and analyses.
5. Referral links (`?ref=` or an equivalent server-side referral ID).
6. Referral rewards, initially as product credits rather than cash payouts.
7. Embeddable charts/maps with attribution.
8. Creator-friendly downloadable images and charts.
9. Citation-friendly research pages with source and methodology metadata.
10. SEO-friendly public result pages where technically appropriate.
11. Student/research workflows that naturally produce shareable outputs.
12. Community/Open Source development on GitHub using real contributions only; never manufacture issues, PRs, stars, or other activity.

## Monetization direction

Free utility comes first. Monetization should be layered behind:

- premium analyses
- advanced reports
- research/creator workflows
- API credits
- embeddable/pro tools
- referral/partner programs
- voluntary support
- cryptocurrency checkout

Crypto payment design must be non-custodial where possible. Private keys, seed phrases, wallet credentials, API keys, payment secrets, webhook secrets, and production credentials must never be committed to this public repository.

Target crypto assets for the initial design: BTC, LTC, and DOGE, subject to technical/provider availability and applicable laws.

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

## Initial product concept

ClimateStudy is a global Climate & Weather Intelligence toolkit. Initial workflows include:

- location-based weather/climate analysis
- temperature and precipitation charts
- anomaly and trend analysis
- drought/heat/frost risk indicators
- map-based visualization
- shareable report pages
- downloadable image/CSV/PDF results
- map/image explanation workflows
- student/research citation helpers
- creator embeds

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

The repository is in the public foundation/MVP planning stage. The next priority is implementing the first end-to-end free utility and the viral/shareable result-page loop.
