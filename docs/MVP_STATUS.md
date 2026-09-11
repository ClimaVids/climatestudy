# ClimateStudy MVP Status

## Implemented in the public repository

### Global discovery
- City/region search through Open-Meteo geocoding.
- Worldwide latitude/longitude support.
- Location results with country/administrative context.

### Weather analysis
- Current temperature.
- Apparent temperature.
- Current weather condition.
- Current 10 m wind speed.
- Today's precipitation total.
- Seven-day daily outlook.
- Daily high/low temperature.
- Precipitation probability.
- Daily maximum wind.

### Visualization
- Interactive Leaflet map.
- Responsive dark interface.
- Mobile-friendly layout.

### Distribution engine
- Canonical result URL with latitude/longitude.
- Public result reload from a shared URL.
- Browser Share API when available.
- Clipboard fallback.
- CSV export.
- Referral parameter persistence through local storage.
- ClimateStudy attribution on result pages.

### Deployment
- GitHub Pages workflow included at `.github/workflows/pages.yml`.
- Public static files require no server secret.

## Known MVP limitations

1. Result pages are currently generated client-side; indexed server-rendered result pages are a later growth phase.
2. Referral storage is currently browser-local; referral attribution and reward accounting require a backend later.
3. No payment processing is enabled in the MVP.
4. Open-Meteo is being used for the initial non-commercial MVP. Commercial traffic requires a compatible provider/commercial arrangement before monetization.
5. No user account system is enabled yet.
6. AI analysis is not yet part of the first release.

## Next highest-value work

1. Add richer climate analysis and charts.
2. Add persistent shareable result records and SEO pages.
3. Add embeddable result cards.
4. Add referral IDs and server-side attribution.
5. Add student/research report generation.
6. Add a production data-provider abstraction.
7. Add non-custodial crypto checkout only after the product has clear paid value.
