# ClimateStudy MVP Product Specification

## Primary users

1. Students
2. Researchers
3. Educators
4. Content creators
5. General weather/climate users

## MVP workflow

1. User selects a city, country, coordinate, or map location.
2. User selects an analysis type.
3. System creates a free analysis.
4. System shows a useful visual result.
5. System creates a shareable public URL.
6. User can copy the link, share the result, download a permitted asset, or embed it.
7. Result page encourages another free analysis.
8. Referral attribution is preserved where applicable.
9. Premium options appear only when they add meaningful extra value.

## Initial analysis types

- current/near-term weather summary
- temperature summary
- precipitation summary
- climate trend visualization
- anomaly visualization
- heat/frost risk indicators
- drought indicator placeholder with explicit data/method limitations

## Result page requirements

- responsive/mobile-friendly
- English-first
- public canonical URL
- clear data timestamp
- source attribution
- methodology/source note
- ClimateStudy branding
- share CTA
- `Create your own free analysis` CTA
- download/embed actions where applicable

## Viral distribution requirements

Every public output should be independently shareable.

Preferred actions:

- Copy link
- Share to X
- Share to LinkedIn
- Share to Reddit
- Share to Telegram
- Share to WhatsApp
- Download image
- Embed

Exact platform integration should remain lightweight; a generic Web Share API plus copy-link fallback is preferred for the MVP.

## Referral requirements

Referral tracking should be simple and privacy-conscious.

Minimum data:

- referral code
- landing timestamp
- conversion event

Do not store unnecessary personal information.

## Monetization requirements

Free tier must demonstrate value.

Premium candidates:

- deeper analysis
- more history
- higher export quality
- PDF reports
- bulk analysis
- API credits
- creator embeds without standard branding
- research workflow features

Payment integration is a later phase and must be isolated from public frontend code.

## AI features

AI is an enhancement layer, not the source of truth. Generated explanations must reference the underlying data/method and should avoid unsupported scientific claims.

Potential AI workflows:

- explain a climate chart
- explain a weather map
- summarize a generated analysis
- convert technical output into student-friendly language

## Non-goals for the first MVP

- real-time trading or investment advice
- a general-purpose social network
- a complex account system before the free tool works
- heavy paid infrastructure
- dozens of payment assets
- low-value SEO page mass generation
