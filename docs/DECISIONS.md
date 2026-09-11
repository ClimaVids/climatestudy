# ClimateStudy Architectural Decisions

This file records decisions that should not be re-litigated unless requirements materially change.

## D001 — Global-first audience

**Decision:** ClimateStudy targets a worldwide audience rather than a country-specific market.

**Reason:** The product is intended for global students, researchers, creators, educators, and general users.

## D002 — Free utility first

**Decision:** The first useful workflow is free.

**Reason:** Users need to experience value before being asked to pay, and free outputs create distribution.

## D003 — Shareable outputs are core product functionality

**Decision:** Public result pages, sharing, embeds, and referral links are core requirements, not future marketing extras.

**Reason:** The product should help market itself through useful outputs.

## D004 — Crypto is a payment rail, not the product

**Decision:** Cryptocurrency is used to receive payments for digital products/services; ClimateStudy is not a cryptocurrency investment or trading product.

**Reason:** The commercial value comes from climate/weather/research functionality.

## D005 — Public repository boundary

**Decision:** This repository is public and must remain safe to inspect, clone, and fork.

**Reason:** Public GitHub presence supports Open Source credibility, discovery, collaboration, and Portfolio value.

## D006 — Secrets stay outside Git

**Decision:** Runtime credentials are stored in environment/secret management, never in committed files.

**Reason:** Public repositories should be treated as permanently public.

## D007 — Referral rewards start as credits

**Decision:** Referral incentives initially use product credits rather than cash payouts.

**Reason:** Credits are simpler, less costly, and reduce payment/affiliate complexity during MVP.

## D008 — No artificial GitHub activity

**Decision:** Contributions, issues, pull requests, stars, and discussions must be genuine.

**Reason:** Long-term credibility is more valuable than vanity metrics.

## D009 — MVP before platform complexity

**Decision:** Build one complete free workflow before implementing advanced accounts, billing, AI, and broad integrations.

**Reason:** Validating user demand is more important than building infrastructure prematurely.

## D010 — Separate private infrastructure

**Decision:** The private `climavids-weather` project remains separate from this public product repository.

**Reason:** The private system may contain commercial implementation details or infrastructure that should not be exposed merely to make ClimateStudy Open Source.
