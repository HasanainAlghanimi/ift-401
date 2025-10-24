'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';

type Side = 'BUY' | 'SELL';
type OrderType = 'MARKET' | 'LIMIT';
type Order = {
  id: string;
  time: string;              // ISO string
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  price?: number;            // limit price (if LIMIT)
  fillPrice: number;         // execution price
};

// helpers
const fmtMoney = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString([], { hour12: false });

export default function HistoryPage() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  // mount/auth gates (avoid early returns before hooks)
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    try { setHasSession(!!localStorage.getItem('demo_session')); }
    catch { setHasSession(false); }
  }, []);
  const authed = isLoggedIn || !!hasSession;

  // orders + ui state
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState('');               // search
  const [side, setSide] = useState<'ALL' | Side>('ALL');
  const [otype, setOtype] = useState<'ALL' | OrderType>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'symbol' | 'amount'>('time');
  const [dir, setDir] = useState<'desc' | 'asc'>('desc');

  // load orders
  useEffect(() => {
    if (!mounted) return;
    try {
      const raw = JSON.parse(localStorage.getItem('demo_orders') || '[]') as Order[];
      setOrders(raw);
    } catch {
      setOrders([]);
    }
  }, [mounted]);

  // redirect once we know
  useEffect(() => {
    if (!mounted) return;
    if (!authed) router.replace('/signin');
  }, [mounted, authed, router]);

  const filtered = useMemo(() => {
    const s = q.trim().toUpperCase();
    let rows = orders.filter(o =>
      (!s || o.symbol.includes(s)) &&
      (side === 'ALL' || o.side === side) &&
      (otype === 'ALL' || o.type === otype)
    );

    rows = rows.sort((a, b) => {
      let delta = 0;
      if (sortBy === 'time') delta = new Date(a.time).getTime() - new Date(b.time).getTime();
      if (sortBy === 'symbol') delta = a.symbol.localeCompare(b.symbol);
      if (sortBy === 'amount') delta = a.fillPrice * a.qty - b.fillPrice * b.qty;
      return dir === 'asc' ? delta : -delta;
    });
    return rows;
  }, [orders, q, side, otype, sortBy, dir]);

  function toggleSort(col: typeof sortBy) {
    if (col === sortBy) setDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(col); setDir('desc'); }
  }

  function clearHistory() {
    localStorage.removeItem('demo_orders');
    setOrders([]);
  }

  function exportCSV() {
    const head = ['Time', 'Symbol', 'Side', 'Type', 'Qty', 'Limit Price', 'Fill Price', 'Notional'];
    const rows = filtered.map(o => [
      new Date(o.time).toISOString(),
      o.symbol,
      o.side,
      o.type,
      o.qty.toString(),
      o.price ? o.price.toFixed(2) : '',
      o.fillPrice.toFixed(2),
      (o.fillPrice * o.qty).toFixed(2),
    ]);
    const csv = [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!mounted || !authed) return null;

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">History</h1>
          <p className="stocks__sub">All filled orders in this demo session.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn--ghost" onClick={exportCSV}>Export CSV</button>
          <button className="btn" onClick={clearHistory} title="Remove all transactions">
            Clear history
          </button>
        </div>
      </div>

      <section className="card table--bare">
        {/* Filters */}
        <div className="actions-row" style={{ marginBottom: 8 }}>
          <input
            className="field__input"
            placeholder="Search symbol…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: 220 }}
          />
          <div className="pillgroup">
            <button
              className={`pillbtn ${side === 'ALL' ? 'is-active' : ''}`}
              onClick={() => setSide('ALL')}
              type="button"
            >All</button>
            <button
              className={`pillbtn ${side === 'BUY' ? 'is-active' : ''}`}
              onClick={() => setSide('BUY')}
              type="button"
            >Buy</button>
            <button
              className={`pillbtn ${side === 'SELL' ? 'is-active' : ''}`}
              onClick={() => setSide('SELL')}
              type="button"
            >Sell</button>
          </div>
          <div className="pillgroup">
            <button
              className={`pillbtn ${otype === 'ALL' ? 'is-active' : ''}`}
              onClick={() => setOtype('ALL')}
              type="button"
            >Any type</button>
            <button
              className={`pillbtn ${otype === 'MARKET' ? 'is-active' : ''}`}
              onClick={() => setOtype('MARKET')}
              type="button"
            >Market</button>
            <button
              className={`pillbtn ${otype === 'LIMIT' ? 'is-active' : ''}`}
              onClick={() => setOtype('LIMIT')}
              type="button"
            >Limit</button>
          </div>
          <span className="badge">Total: <strong>{filtered.length}</strong></span>
        </div>

        {/* Table header */}
        <div className="table__head is-sticky">
          <button onClick={() => toggleSort('time')}>
            Time <span className={`sort ${sortBy === 'time' ? (dir === 'asc' ? 'is-asc' : 'is-desc') : ''}`} />
          </button>
          <button onClick={() => toggleSort('symbol')}>
            Symbol <span className={`sort ${sortBy === 'symbol' ? (dir === 'asc' ? 'is-asc' : 'is-desc') : ''}`} />
          </button>
          <button>Side</button>
          <button>Type</button>
          <button>Qty</button>
          <button>Limit</button>
          <button onClick={() => toggleSort('amount')}>
            Fill <span className={`sort ${sortBy === 'amount' ? (dir === 'asc' ? 'is-asc' : 'is-desc') : ''}`} />
          </button>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="muted" style={{ padding: 16 }}>No transactions yet.</div>
        ) : (
          <ul className="table__body">
            {filtered.map(o => {
              const notional = o.fillPrice * o.qty;
              return (
                <li key={o.id} className="row"
                    style={{ gridTemplateColumns: '1.6fr .8fr .7fr .9fr .6fr .9fr .9fr' }}>
                  <div className="name">
                    <strong>{fmtDate(o.time)}</strong>
                    <span className="symbol">ID: {o.id.slice(0, 8)}</span>
                  </div>
                  <div className="num">{o.symbol}</div>
                  <div className={`num ${o.side === 'BUY' ? 'is-up' : 'is-down'}`}>{o.side}</div>
                  <div className="num">{o.type}</div>
                  <div className="num">{o.qty}</div>
                  <div className="num">{o.price ? fmtMoney(o.price) : '-'}</div>
                  <div className="num">{fmtMoney(o.fillPrice)} <span className="symbol">({fmtMoney(notional)})</span></div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
