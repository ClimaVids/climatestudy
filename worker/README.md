# ClimateStudy API Worker

This folder contains the optional backend for the public ClimateStudy site.

## Responsibilities

- track referral visits in Cloudflare D1
- create premium BTCPay invoices without exposing the API key to browsers
- receive and verify BTCPay webhook events
- persist order status in D1

Cloudflare Workers can bind to D1 databases through Wrangler configuration. See the Cloudflare D1 documentation for the current CLI/dashboard workflow.

## Secrets

Never commit these values:

- `BTCPAY_URL`
- `BTCPAY_STORE_ID`
- `BTCPAY_API_KEY`
- `BTCPAY_WEBHOOK_SECRET`

Set them as Cloudflare Worker secrets. The BTCPay API documentation recommends scoped API keys rather than Basic Auth for application integrations. The invoice endpoint requires the store `cancreateinvoice` permission; webhook management uses the store webhook permission. See the official BTCPay Greenfield API documentation.

The repository declares these four names in `wrangler.toml` as required Worker secrets, so a production deploy is rejected when one is missing.

## First deployment

Run these commands from the `worker/` directory after installing/authenticating Wrangler:

```bash
npx wrangler login
npx wrangler d1 create climatestudy
```

Copy the returned D1 `database_id` into `worker/wrangler.toml` in place of `REPLACE_WITH_D1_DATABASE_ID`.

Then apply the migration remotely:

```bash
npx wrangler d1 migrations apply climatestudy --remote
```

Create the required Worker secrets. The safest simple approach is Cloudflare's interactive secret command, or a local ignored JSON/.env file supplied to `wrangler secret bulk`. Never commit that file.

```bash
npx wrangler secret put BTCPAY_URL
npx wrangler secret put BTCPAY_STORE_ID
npx wrangler secret put BTCPAY_API_KEY
npx wrangler secret put BTCPAY_WEBHOOK_SECRET
```

Then deploy:

```bash
npx wrangler deploy
```

After deployment, record the Worker HTTPS URL and test:

```text
https://YOUR-WORKER-DOMAIN/api/health
```

Expected result is a successful JSON health response from the Worker.

## BTCPay configuration

1. In BTCPay Server, create or select the store that will receive ClimateStudy payments.
2. Create a dedicated API key for this integration. Prefer a store-scoped key with only the permissions required by the endpoints used by ClimateStudy; at minimum the invoice creation endpoint requires the store `cancreateinvoice` permission. BTCPay recommends API keys with restricted permissions instead of Basic Auth for application integrations.
3. Create a store webhook pointing to:

```text
https://YOUR-WORKER-DOMAIN/api/webhooks/btcpay
```

4. Enable at least these events:
   - `InvoiceProcessing`
   - `InvoiceSettled`
   - `InvoiceInvalid`
   - `InvoiceExpired`
5. Use the webhook secret generated/configured for that webhook as `BTCPAY_WEBHOOK_SECRET`.
6. Confirm the BTCPay store has the cryptocurrency payment methods you intend to offer. Availability of BTC/LTC/DOGE depends on the configured BTCPay store/payment processors; the ClimateStudy frontend must not promise a method that the live store does not actually expose.

## Frontend connection

After the Worker is live, set the public API base in the repository's `api-config.js`:

```js
window.CLIMATESTUDY_API_BASE = "https://YOUR-WORKER-DOMAIN";
```

Do not put the BTCPay API key or webhook secret into `api-config.js`.

## Minimum launch verification

Before announcing paid products, verify these in order:

1. `GET /api/health` succeeds.
2. A referral link records attribution without errors.
3. `POST /api/checkout` returns a BTCPay checkout URL for a known product.
4. The checkout page displays the intended payment methods.
5. Make one low-value real test payment.
6. Confirm the BTCPay webhook reaches the Worker and the corresponding D1 order changes to the expected settled/processing state.
7. Confirm the browser never receives the BTCPay API key.
8. Only then enable public promotion of the premium products.

## Security

The Worker never accepts a payment secret from the browser. The browser only sends a product identifier and referral code. Product prices are defined server-side in `src/index.js` so a user cannot change the amount by editing browser JavaScript.

BTCPay webhook signatures are verified using the `BTCPay-Sig` HMAC-SHA256 header before order status is changed.

The public repository must contain only configuration templates and public receive addresses. Never commit API keys, webhook secrets, seed phrases, private keys, customer data, or production database credentials.

## Payment scope

Crypto is a payment rail for ClimateStudy digital products. The project is not a trading, investment, custody, or wallet-management service.
