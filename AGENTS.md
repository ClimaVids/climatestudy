# ClimateStudy Agent Instructions

Read `AI_CONTEXT.md` before making substantial changes.

## Product

ClimateStudy is a global-first climate/weather intelligence product for students, researchers, educators, creators, and general users.

## Non-negotiable goals

- Build a genuinely useful free tool first.
- Make every useful output shareable.
- Build public result pages with strong internal linking and a CTA back to ClimateStudy.
- Use referrals, embeds, creator exports, citations, SEO-friendly result pages, and community/Open Source activity as the main organic growth channels.
- Monetize premium value rather than basic access.
- Keep cryptocurrency as a payment rail, not as the product.

## Public repository rule

This repository is public. Treat every committed byte as permanently public.
Never commit secrets, production credentials, private keys, wallet seeds, customer data, or provider/API credentials.

## Relationship to private infrastructure

Do not copy private implementation details or secrets from `ClimaVids/climavids-weather` into this repository.

## Engineering priorities

1. First complete the smallest end-to-end free analysis.
2. Add a stable shareable result page.
3. Add share/copy-link functionality.
4. Add referral attribution and credits.
5. Add creator download/embed functionality.
6. Add premium/payment infrastructure after value is validated.
7. Add AI features only when they improve the workflow.

## Quality rules

- Prefer simple architecture and low-cost infrastructure.
- Add tests for meaningful logic.
- Document significant decisions in `docs/DECISIONS.md`.
- Keep `docs/ROADMAP.md` synchronized with scope.
- Update `AI_CONTEXT.md` when a durable project decision changes.
- Do not create fake GitHub activity or artificial engagement.
- Do not mass-generate low-value SEO pages.
- Scientific claims should be grounded in documented sources/methods.
