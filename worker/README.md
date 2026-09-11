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

## First deployment

1. Create a Cloudflare D1 database named `climatestudy`.
2. Put the returned database ID into `worker/wrangler.toml`.
3. From the `worker/` directory, run the D1 migration with Wrangler.
4. Deploy the Worker.
5. Add the four BTCPay secrets using `wrangler secret put ...` or the Cloudflare dashboard.
6. Create a BTCPay webhook pointing to `https://YOUR-WORKER-DOMAIN/api/webhooks/btcpay` and authorize at least `InvoiceSettled`, `InvoiceProcessing`, `InvoiceInvalid`, and `InvoiceExpired` events.
7. Use the webhook secret returned by BTCPay as `BTCPAY_WEBHOOK_SECRET`.
8. Set `window.CLIMATESTUDY_API_BASE` in `api-config.js` to the deployed Worker HTTPS URL if the frontend remains on GitHub Pages.

## Security

The Worker never accepts a payment secret from the browser. The browser only sends a product identifier and referral code. Product prices are defined server-side in `src/index.js` so a user cannot change the amount by editing browser JavaScript.

BTCPay webhook signatures are verified using the `BTCPay-Sig` HMAC-SHA256 header before order status is changed.

## Payment scope

Crypto is a payment rail for ClimateStudy digital products. The project is not a trading, investment, custody, or wallet-management service.
