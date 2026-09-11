# ClimateStudy Build Notes

## Why we reuse existing building blocks

ClimateStudy should minimize time-to-MVP by combining mature libraries, public APIs and proven open-source patterns instead of implementing commodity infrastructure from scratch.

The rule is **reuse the capability, rewrite the product-specific value**.

We may reuse:

- map libraries such as Leaflet
- charting libraries
- accessible UI components
- established weather/geocoding APIs
- GitHub Actions deployment patterns
- standard sharing, URL, CSV and browser APIs

We should not copy a third-party application's complete business logic or branding merely because it is available on GitHub.

## Current MVP stack

- HTML/CSS/JavaScript for the lowest-friction first release
- Leaflet for map rendering
- Open-Meteo for initial global forecast/geocoding data
- GitHub Pages for the first public static deployment
- Browser Web Share / Clipboard APIs for distribution
- URL query parameters for canonical shareable results

## Provider/licensing boundary

Open-Meteo states that its public API is free for non-commercial use and that its API data is CC BY 4.0 with attribution. Its API/source licensing and commercial-use terms must be respected. Before ClimateStudy turns paid/commercial traffic on through this provider, verify the then-current commercial terms or move the production traffic to an appropriately licensed provider.

Open-Meteo attribution must remain visible wherever its data is displayed.

## Public repository security rule

Assume every committed byte is public. Runtime credentials belong in hosting secrets or GitHub Actions secrets, never in source files.

## Product-specific value we will build ourselves

The differentiating layer is not the generic weather dashboard. It is the ClimateStudy product loop:

**global analysis → useful result → shareable public page → referral/organic discovery → advanced workflow → optional paid value**

Future commercial value should be created through analysis quality, research workflows, creator tooling, embeddable outputs, reports, API access and verified payment fulfillment.

## Candidate reusable references

Examples reviewed during planning include modern Open-Meteo weather dashboards, React/Vite weather interfaces, Leaflet map applications, and the shadcn/ui component ecosystem. These are references for architecture and reusable components, not assets to copy wholesale.
