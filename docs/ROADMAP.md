# ClimateStudy Roadmap

All major product-led growth mechanisms are part of the active roadmap. The first priority is to complete one reliable free workflow, then connect monetization to real usage.

## Phase 0 — Public foundation ✅

- [x] Public GitHub repository
- [x] Project vision and documentation
- [x] Security policy
- [x] Contribution guidelines
- [x] Safe environment template
- [x] License
- [x] Persistent AI project context
- [x] Architectural decision log
- [x] Product specification
- [x] Growth-engine specification

## Phase 1 — Free global utility 🚧

- [x] Global location search
- [x] Current weather and 7-day forecast workspace
- [ ] Basic temperature and precipitation charts
- [x] Interactive map view
- [x] Downloadable CSV results
- [ ] Downloadable branded image results
- [x] English-first user interface
- [x] Public shareable result URLs
- [x] Stable result URL parameters
- [ ] Mobile-friendly result polish

## Phase 2 — Student, researcher and creator tools

- [ ] Climate trend analysis
- [ ] Anomaly calculations
- [ ] Drought, heat and frost-risk indicators
- [ ] Citation-friendly result pages
- [ ] Report generation
- [ ] Reproducible analysis settings
- [ ] High-quality image export
- [ ] PDF export where appropriate
- [ ] Creator-focused workflows
- [ ] Map/chart explanation workflow

## Phase 3 — Self-propagating growth engine 🚧

- [x] One-click sharing
- [x] Copy-link sharing
- [x] Web Share API with fallback
- [x] Referral links
- [x] Referral attribution
- [ ] Referral credits
- [ ] Shareable result metadata / Open Graph cards per result
- [ ] Public result pages indexed for discovery where valuable
- [ ] Creator-friendly embeds
- [ ] Embed attribution back to ClimateStudy
- [ ] Downloadable branded media
- [ ] Lightweight product analytics
- [ ] Privacy-conscious growth metrics

## Phase 4 — Monetization 🚧

- [x] Premium product definitions
- [x] Paid report checkout UI
- [ ] Premium analyses
- [ ] Paid reports fulfillment
- [ ] API credits
- [ ] Research plan
- [ ] Creator plan
- [ ] Premium embed options
- [x] Voluntary support
- [x] Crypto checkout backend
- [x] Secure payment confirmation webhook logic
- [ ] Live Cloudflare Worker deployment
- [ ] Live D1 database migration
- [ ] Live scoped BTCPay API key
- [ ] Live BTCPay webhook
- [ ] End-to-end low-value payment test
- [ ] Payment-to-feature entitlement system

## Phase 5 — Intelligence layer

- [ ] AI-assisted explanations
- [ ] Natural-language climate questions
- [ ] Weather/climate map explanation
- [ ] Student-friendly explanations
- [ ] Scientific quality checks
- [ ] Citation/source grounding
- [ ] Multi-language support

## Phase 6 — Open Source/community growth

- [ ] Real-world external contributions
- [ ] Good first issues
- [ ] Public examples/tutorials
- [ ] Release notes
- [ ] Changelog
- [ ] Community feedback loop
- [ ] External integrations

## Product growth loop

**Free analysis → useful visual result → public share page → social/research/creator sharing → new visitor → free analysis → referral → premium upgrade**

The system should prioritize genuine product value. Never manufacture GitHub activity, artificial referrals, fake reviews, or other vanity signals.

## Current highest-priority launch path

1. Create the Cloudflare D1 database and replace the database ID in `worker/wrangler.toml`.
2. Apply the D1 migration.
3. Deploy `climatestudy-api`.
4. Configure the four required Worker secrets.
5. Configure a scoped BTCPay API key and webhook.
6. Set the deployed Worker URL in `api-config.js`.
7. Test `/api/health`, referral attribution, checkout creation, and a low-value real payment.
8. Only after the end-to-end test passes, announce paid products publicly.

The project should not claim that checkout is live until these steps are completed and verified.
