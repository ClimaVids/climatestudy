CREATE TABLE IF NOT EXISTS referrals (
  ref_code TEXT PRIMARY KEY,
  clicks INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  order_id TEXT PRIMARY KEY,
  invoice_id TEXT UNIQUE NOT NULL,
  product TEXT NOT NULL,
  amount TEXT NOT NULL,
  currency TEXT NOT NULL,
  referral TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_referral ON orders(referral);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
