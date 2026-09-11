# ClimateStudy Growth Engine

## Objective

The product should acquire users through useful outputs, sharing, referrals, embeds, search discovery, and community participation.

## Growth loops

### 1. Shareable result loop

Every meaningful analysis can produce a stable public URL such as:

`/report/<public-id>`

The page should contain:

- result title
- location and time period
- concise interpretation
- source/data metadata
- generated timestamp
- ClimateStudy attribution
- CTA: `Create your own free analysis`
- Share buttons
- canonical URL

### 2. Referral loop

Authenticated or anonymous users may receive a referral identifier.

Example:

`https://climatestudy.example/?ref=abc123`

Rules for the first implementation:

- Track referral attribution server-side.
- Do not expose private customer information.
- Avoid multi-level referral schemes.
- Reward useful completed actions, not clicks alone.
- Start with non-cash credits.

Possible reward events:

- referred user creates a first analysis
- referred user returns
- referred user completes an eligible purchase

### 3. Creator loop

Creators should be able to:

- download a chart/image
- copy a source line
- copy a public result URL
- embed a chart/map
- reuse outputs under the documented content/data policy

Free outputs should retain a compact ClimateStudy attribution unless a paid plan removes it.

### 4. Embeddable content

Provide a lightweight public embed endpoint where appropriate:

`/embed/chart/<id>`

`/embed/map/<id>`

Embeds must include a visible link back to the corresponding ClimateStudy result page.

### 5. SEO/discovery loop

Public result pages may be indexable when:

- they contain useful original content
- source metadata is available
- the URL is stable
- the page is not a private/user-sensitive result

Private or low-value pages should be `noindex`.

Do not generate large numbers of low-value pages solely for SEO.

### 6. Student/research loop

Research pages should support:

- reproducible parameters
- source attribution
- methodology summary
- citation-friendly URL
- chart download
- CSV download when licensed
- report export where appropriate

### 7. GitHub/Open Source loop

The public repository is part of the product's credibility and discovery strategy.

Healthy signals include:

- useful documentation
- tests
- real issues
- real pull requests
- meaningful releases
- external contributors
- useful stars/forks

Never manufacture activity for badges or vanity metrics.

## Metrics

Track a small set of metrics first:

- visitors
- analyses created
- public results created
- result shares
- referral visits
- referred analyses
- free-to-paid conversion
- revenue by product
- API usage

Do not collect unnecessary personal data.

## Product-led acquisition rule

The product itself should produce the marketing asset. A chart, map, report or explanation should be useful enough that the user has a reason to share it.
