const PRODUCT_CATALOG = {
  starter_report: {
    name: 'ClimateStudy Starter Report',
    amount: '1.00',
    currency: 'USD',
    description: 'A premium ClimateStudy location analysis report.'
  },
  research_report: {
    name: 'ClimateStudy Research Report',
    amount: '3.00',
    currency: 'USD',
    description: 'A research-oriented ClimateStudy analysis report.'
  }
};

const DEFAULT_ALLOWED_ORIGINS = new Set([
  'https://climavids.github.io',
  'https://climavids.ir',
  'https://www.climavids.ir'
]);

function allowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configured]);
}

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extra
    }
  });
}

function corsHeaders(origin, env) {
  const allowed = allowedOrigins(env).has(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function safeReturnUrl(value, env) {
  if (typeof value !== 'string') return 'https://github.com/ClimaVids/climatestudy';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return 'https://github.com/ClimaVids/climatestudy';
    if (!allowedOrigins(env).has(url.origin)) return 'https://github.com/ClimaVids/climatestudy';
    return url.href.slice(0, 500);
  } catch {
    return 'https://github.com/ClimaVids/climatestudy';
  }
}

async function hmacHex(secret, body) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return [...new Uint8Array(signature)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function safeRef(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{3,64}$/.test(value) ? value : null;
}

async function trackReferral(request, env) {
  const body = await request.json();
  const ref = safeRef(body.ref);
  const event = typeof body.event === 'string' ? body.event.slice(0, 40) : 'visit';
  if (!ref) return json({ ok: true, tracked: false });

  await env.DB.prepare(`INSERT INTO referrals (ref_code, clicks, updated_at)
    VALUES (?, 1, datetime('now'))
    ON CONFLICT(ref_code) DO UPDATE SET clicks = clicks + 1, updated_at = datetime('now')`)
    .bind(ref).run();

  return json({ ok: true, tracked: true, event });
}

async function dbHealth(env) {
  await env.DB.prepare('SELECT 1 AS ok').first();
  return json({ ok: true, database: 'climatestudy' });
}

async function createCheckout(request, env) {
  if (!env.BTCPAY_URL || !env.BTCPAY_STORE_ID || !env.BTCPAY_API_KEY) {
    return json({ error: 'Crypto checkout is not configured yet.' }, 503);
  }

  const body = await request.json();
  const product = PRODUCT_CATALOG[body.product];
  if (!product) return json({ error: 'Unknown product.' }, 400);

  const ref = safeRef(body.ref);
  const resultUrl = safeReturnUrl(body.returnUrl, env);

  const orderId = crypto.randomUUID();
  const payload = {
    amount: product.amount,
    currency: product.currency,
    metadata: {
      orderId,
      product: body.product,
      referral: ref || undefined
    },
    checkout: {
      defaultPaymentMethod: 'BTC-CHAIN',
      redirectURL: resultUrl
    },
    receipt: {
      showQR: true
    }
  };

  const response = await fetch(`${env.BTCPAY_URL.replace(/\/$/, '')}/api/v1/stores/${env.BTCPAY_STORE_ID}/invoices`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${env.BTCPAY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return json({ error: 'Unable to create checkout invoice.' }, 502);
  }

  const invoice = await response.json();
  await env.DB.prepare(`INSERT INTO orders
    (order_id, invoice_id, product, amount, currency, referral, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'New', datetime('now'))`)
    .bind(orderId, invoice.id, body.product, product.amount, product.currency, ref || null).run();

  return json({ ok: true, orderId, invoiceId: invoice.id, checkoutUrl: invoice.checkoutLink });
}

async function btcpayWebhook(request, env) {
  if (!env.BTCPAY_WEBHOOK_SECRET) return json({ error: 'Webhook is not configured.' }, 503);
  const raw = await request.text();
  const signature = request.headers.get('BTCPay-Sig') || '';
  if (!signature.startsWith('sha256=')) return json({ error: 'Invalid signature.' }, 401);

  const expected = `sha256=${await hmacHex(env.BTCPAY_WEBHOOK_SECRET, raw)}`;
  const a = new TextEncoder().encode(signature);
  const b = new TextEncoder().encode(expected);
  if (a.length !== b.length || !(await crypto.subtle.timingSafeEqual?.(a, b) ?? signature === expected)) {
    if (signature !== expected) return json({ error: 'Invalid signature.' }, 401);
  }

  const event = JSON.parse(raw);
  const invoiceId = event.invoiceId || event.invoice?.id;
  if (!invoiceId) return json({ ok: true, ignored: true });

  const status = event.type === 'InvoiceSettled' ? 'Settled'
    : event.type === 'InvoiceProcessing' ? 'Processing'
    : event.type === 'InvoiceInvalid' ? 'Invalid'
    : event.type === 'InvoiceExpired' ? 'Expired'
    : null;

  if (status) {
    await env.DB.prepare(`UPDATE orders SET status = ?, updated_at = datetime('now') WHERE invoice_id = ?`)
      .bind(status, invoiceId).run();
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/health') return json({ ok: true, service: 'climatestudy-api' }, 200, cors);
      if (url.pathname === '/api/db-health') return await dbHealth(env).then(r => new Response(r.body, { status: r.status, headers: { ...Object.fromEntries(r.headers), ...cors } }));
      if (url.pathname === '/api/referral' && request.method === 'POST') return await trackReferral(request, env).then(r => new Response(r.body, { status: r.status, headers: { ...Object.fromEntries(r.headers), ...cors } }));
      if (url.pathname === '/api/checkout' && request.method === 'POST') return await createCheckout(request, env).then(r => new Response(r.body, { status: r.status, headers: { ...Object.fromEntries(r.headers), ...cors } }));
      if (url.pathname === '/api/webhooks/btcpay' && request.method === 'POST') return await btcpayWebhook(request, env);
      return json({ error: 'Not found' }, 404, cors);
    } catch (error) {
      console.error(error);
      return json({ error: 'Internal server error.' }, 500, cors);
    }
  }
};
