'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';

type Side = 'BUY' | 'SELL';
type OrderType = 'MARKET' | 'LIMIT';
type Position = { symbol: string; qty: number; avgPrice: number };
type Portfolio = { cash: number; positions: Position[] };
type Order = {
  id: string;
  time: string;
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  price?: number;
  fillPrice: number;
};

const STARTING_CASH = 100_000;

// ——— Quick symbol universe for the dropdown
const SYMBOLS = [
  'AAPL','MSFT','NVDA','TSLA','AMD','SHOP','GOOG','AMZN','META','NFLX',
  'JPM','BAC','TSM','AVGO','ADBE','CRM','INTC','CSCO','ORCL','QCOM',
  'KO','PEP','WMT','COST','NKE','DIS','MRNA','PFE','BABA','T','VZ'
];

// ——— persist helpers
function readJSON<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
function ensurePortfolio(): Portfolio {
  const p = readJSON<Portfolio>('demo_portfolio', { cash: STARTING_CASH, positions: [] });
  if (typeof p.cash !== 'number' || !Array.isArray(p.positions)) return { cash: STARTING_CASH, positions: [] };
  return p;
}
function getQuote(symbol: string): number {
  const s = symbol || 'AAPL';
  const seed = [...s].reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = 50 + (seed % 400);
  const jitter = (Date.now() / 1000) % 10;
  return Math.round((base + jitter) * 100) / 100;
}
const fmt = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function TradePage() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  // —— auth-check (declare hooks first, no early returns)
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    try { setHasSession(!!localStorage.getItem('demo_session')); }
    catch { setHasSession(false); }
  }, []);
  const authed = isLoggedIn || !!hasSession;

  // —— ticket state
  const [symbol, setSymbol] = useState('AAPL');
  const [qty, setQty] = useState<number>(1);
  const [side, setSide] = useState<Side>('BUY');
  const [type, setType] = useState<OrderType>('MARKET');
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // —— portfolio / orders
  const [portfolio, setPortfolio] = useState<Portfolio>({ cash: STARTING_CASH, positions: [] });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!mounted) return;
    setPortfolio(ensurePortfolio());
    setOrders(readJSON<Order[]>('demo_orders', []));
  }, [mounted]);

  // redirect only once we know
  useEffect(() => {
    if (!mounted) return;
    if (!authed) router.replace('/signin');
  }, [mounted, authed, router]);

  const posMap = useMemo(() => {
    const map = new Map<string, Position>();
    portfolio.positions.forEach(p => map.set(p.symbol, p));
    return map;
  }, [portfolio.positions]);

  const quote = useMemo(() => getQuote(symbol.toUpperCase()), [symbol]);

  function upsertPosition(s: string, fillPrice: number, qtyDelta: number) {
    const next = { ...portfolio };
    const existing = next.positions.find(p => p.symbol === s);
    if (!existing) {
      if (qtyDelta > 0) next.positions.push({ symbol: s, qty: qtyDelta, avgPrice: fillPrice });
    } else {
      const newQty = existing.qty + qtyDelta;
      if (newQty <= 0) {
        next.positions = next.positions.filter(p => p.symbol !== s);
      } else if (qtyDelta > 0) {
        existing.avgPrice = (existing.avgPrice * existing.qty + fillPrice * qtyDelta) / newQty;
        existing.qty = newQty;
      } else {
        existing.qty = newQty;
      }
    }
    setPortfolio(next);
    writeJSON('demo_portfolio', next);
  }

  function placeOrder() {
    const s = symbol.trim().toUpperCase();
    if (!/^[A-Z]{1,6}$/.test(s)) { setMessage('Enter a valid stock symbol (A–Z, up to 6).'); return; }
    if (!Number.isFinite(qty) || qty <= 0) { setMessage('Quantity must be a positive number.'); return; }

    const current = ensurePortfolio();
    const px = type === 'MARKET' ? quote : Number(limitPrice);
    if (!Number.isFinite(px) || px <= 0) { setMessage('Enter a valid price.'); return; }

    if (type === 'LIMIT') {
      if (side === 'BUY'  && px < quote) { setMessage(`Limit not reached. Current ~ ${fmt(quote)}.`); return; }
      if (side === 'SELL' && px > quote) { setMessage(`Limit not reached. Current ~ ${fmt(quote)}.`); return; }
    }

    const cost = Number((px * qty).toFixed(2));
    if (side === 'BUY' && cost > current.cash) { setMessage('Insufficient cash for this order.'); return; }
    if (side === 'SELL') {
      const have = posMap.get(s)?.qty ?? 0;
      if (qty > have) { setMessage(`You only have ${have} ${s} to sell.`); return; }
    }

    const fillPrice = px;

    const next: Portfolio = JSON.parse(JSON.stringify(current));
    if (side === 'BUY')  next.cash = Number((next.cash - cost).toFixed(2));
    if (side === 'SELL') next.cash = Number((next.cash + cost).toFixed(2));
    setPortfolio(next);
    writeJSON('demo_portfolio', next);

    upsertPosition(s, fillPrice, side === 'BUY' ? qty : -qty);

    const order: Order = {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      symbol: s, side, type, qty,
      price: type === 'LIMIT' ? px : undefined,
      fillPrice
    };
    const nextOrders = [order, ...orders].slice(0, 100);
    setOrders(nextOrders);
    writeJSON('demo_orders', nextOrders);

    setMessage(`${side} ${qty} ${s} @ ${fmt(fillPrice)} filled.`);
  }

  // derived UI helpers
  const est = (type === 'MARKET' ? quote : (limitPrice || 0)) * qty;
  const canSubmit =
    /^[A-Z]{1,6}$/.test(symbol.trim().toUpperCase()) &&
    Number.isFinite(qty) &&
    qty > 0 &&
    (type === 'MARKET' || (Number.isFinite(limitPrice) && limitPrice > 0));

  // ——— render gates (after hooks)
  if (!mounted) return null;
  if (!authed) return null;

  return (
    <main className="trade container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">Trade</h1>
          <p className="stocks__sub">Place market or limit orders in this demo environment.</p>
        </div>
        <div className="header-actions">
          <span className="badge badge--ok">Demo only</span>
        </div>
      </div>

      <div className="grid">
        {/* ——— Ticket ——— */}
        <section className="card">
          {/* Side pills */}
          <div className="pillgroup" role="tablist" aria-label="Order side">
            <button
              className={`pillbtn ${side === 'BUY' ? 'is-active' : ''}`}
              onClick={() => { setSide('BUY'); setMessage(''); }}
              type="button"
            >
              Buy
            </button>
            <button
              className={`pillbtn ${side === 'SELL' ? 'is-active' : ''}`}
              onClick={() => { setSide('SELL'); setMessage(''); }}
              type="button"
            >
              Sell
            </button>
          </div>

          <form className="auth__form" onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
            <div className="fieldrow">
              {/* Symbol with dropdown */}
              <label className="field" style={{ position: 'relative' }}>
                <span className="field__label">Symbol</span>
                <input
                  className="field__input"
                  list="symbols"
                  value={symbol}
                  onChange={(e) => { setSymbol(e.target.value.toUpperCase()); setMessage(''); }}
                  placeholder="AAPL"
                  autoCapitalize="characters"
                />
                <datalist id="symbols">
                  {SYMBOLS.map(sym => <option key={sym} value={sym} />)}
                </datalist>
              </label>

              <label className="field">
                <span className="field__label">Quantity</span>
                <input
                  className="field__input"
                  type="number"
                  min={1}
                  step={1}
                  value={qty}
                  onChange={(e) => { setQty(Math.max(1, Number(e.target.value))); setMessage(''); }}
                  placeholder="1"
                />
              </label>
            </div>

            {/* Type pills + price */}
            <div className="fieldrow">
              <label className="field">
                <span className="field__label">Order type</span>
                <div className="pillgroup">
                  <button
                    type="button"
                    className={`pillbtn ${type === 'MARKET' ? 'is-active' : ''}`}
                    onClick={() => { setType('MARKET'); setMessage(''); }}
                  >
                    Market
                  </button>
                  <button
                    type="button"
                    className={`pillbtn ${type === 'LIMIT' ? 'is-active' : ''}`}
                    onClick={() => { setType('LIMIT'); setMessage(''); }}
                  >
                    Limit
                  </button>
                </div>
              </label>

              <label className="field">
                <span className="field__label">Price {type === 'MARKET' ? '(quote)' : '(limit)'}</span>
                <input
                  className="field__input"
                  type="number"
                  step="0.01"
                  value={type === 'MARKET' ? quote : limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  placeholder="0.00"
                  disabled={type === 'MARKET'}
                />
              </label>
            </div>

            {/* Summary strip */}
            <div className="actions-row">
              <div className="badge">Est. {side === 'BUY' ? 'Cost' : 'Proceeds'}: <strong>{fmt(est || 0)}</strong></div>
              <div className="badge">Quote: {fmt(quote)}</div>
            </div>

            {message && (
              <div
                className={`trade__alert ${
                  /filled\.$/i.test(message) ? 'is-success' : 'is-error'
                }`}
                style={{ marginTop: 6 }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: '100%' }}
              disabled={!canSubmit}
              title={!canSubmit ? 'Enter a valid symbol, quantity, and price' : undefined}
            >
              {side === 'BUY' ? 'Buy' : 'Sell'} {qty} {symbol.toUpperCase()}
            </button>
          </form>
        </section>

        {/* ——— Account ——— */}
        <aside className="card">
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>Account</h3>
          <div className="sd__grid" style={{ marginBottom: 12 }}>
            <div className="sd__cell"><div className="sd__label">Cash</div><div className="sd__value">{fmt(portfolio.cash)}</div></div>
            <div className="sd__cell"><div className="sd__label">Positions</div><div className="sd__value">{portfolio.positions.length}</div></div>
            <div className="sd__cell"><div className="sd__label">Buying Power</div><div className="sd__value">{fmt(portfolio.cash)}</div></div>
          </div>

          <h4 style={{ margin: '8px 0' }}>Positions</h4>
          {portfolio.positions.length === 0 ? (
            <div className="muted">No positions yet.</div>
          ) : (
            <ul className="table__body" style={{ marginTop: 6 }}>
              {portfolio.positions.map(p => {
                const mark = getQuote(p.symbol);
                const pnl = (mark - p.avgPrice) * p.qty;
                const cls = pnl >= 0 ? 'num is-up' : 'num is-down';
                return (
                  <li key={p.symbol} className="row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                    <div className="name"><strong>{p.symbol}</strong><span className="symbol">x{p.qty}</span></div>
                    <div className="num">{fmt(p.avgPrice)}</div>
                    <div className="num">{fmt(mark)}</div>
                    <div className={cls}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>

      {/* ——— Orders ——— */}
      <section className="card spaced">
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Recent orders</h3>
        {orders.length === 0 ? (
          <div className="muted">No orders yet.</div>
        ) : (
          <ul className="table__body">
            {orders.map(o => (
              <li key={o.id} className="row" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr' }}>
                <div className="name">
                  <strong>{o.symbol}</strong>
                  <span className="symbol">{new Date(o.time).toLocaleString()}</span>
                </div>
                <div className="num">{o.side}</div>
                <div className="num">{o.type}{o.price ? ` (${fmt(o.price)})` : ''}</div>
                <div className="num">{o.qty}</div>
                <div className="num">{fmt(o.fillPrice)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
