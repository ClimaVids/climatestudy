# Monetization Architecture

ClimateStudy is intended to provide a useful free tier and optional paid features for students, researchers, educators, creators and professional users worldwide.

## Revenue streams

### 1. Premium analyses

Users may pay for deeper analyses, higher limits, advanced indicators or specialized reports.

### 2. Research reports

Generated reports may include additional charts, maps, methodology notes, citations and downloadable formats.

### 3. API credits

Developers and organizations may purchase usage credits for ClimateStudy APIs.

### 4. Creator tools

Advanced export, embeddable visualizations and higher-resolution assets may be offered as premium features.

### 5. Referral credits

Users may receive additional free usage for referring new users. A referral system should reward genuine product adoption rather than spam.

## Cryptocurrency payment direction

The project may support cryptocurrency payments, initially considering Bitcoin, Litecoin and Dogecoin.

The intended architecture is:

```text
User
  │
  ▼
ClimateStudy Checkout
  │
  ▼
Payment Server / BTCPay
  │
  ├── payment invoice
  ├── status verification
  └── signed webhook event
  │
  ▼
ClimateStudy account credit
  │
  ▼
User receives paid feature
```

## Security boundary

The public repository must never contain:

- wallet seed phrases;
- private keys;
- BTCPay private API credentials;
- webhook secrets;
- database passwords;
- production tokens;
- server-side signing secrets.

Public receive addresses may be displayed on a deliberate support/payment page, but they are not secrets and must never be confused with wallet private keys.

## Non-custodial principle

ClimateStudy should not hold customer funds as an exchange or custodial wallet. Payment infrastructure should verify payments and unlock a product or credit after confirmed settlement, while funds remain under the merchant's own wallet infrastructure.

## Free-to-paid funnel

```text
Free analysis
     ↓
Useful result
     ↓
Share result
     ↓
New visitor
     ↓
Referral / account
     ↓
Premium feature
     ↓
Crypto payment
```

The project should validate the value of the free product before introducing aggressive monetization.

## Legal and provider compliance

Payment methods, cryptocurrency availability, tax obligations, consumer protection and provider terms vary by jurisdiction. Production payment features must be reviewed against the applicable service terms and local law before activation.
