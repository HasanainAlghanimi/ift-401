'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';

type Position = { symbol: string; qty: number; avgPrice: number };
type Portfolio = { cash: number; positions: Position[] };

const STARTING_CASH = 100_000;

// helpers
function readJSON<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
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
const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function PortfolioSimplePage() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  // mount/auth gates first (avoid hook-order issues)
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    try { setHasSession(!!localStorage.getItem('demo_session')); }
    catch { setHasSession(false); }
  }, []);
  const authed = isLoggedIn || !!hasSession;

  // data
  const [portfolio, setPortfolio] = useState<Portfolio>({ cash: STARTING_CASH, positions: [] });

  useEffect(() => {
    if (!mounted) return;
    setPortfolio(ensurePortfolio());
  }, [mounted]);

  // compute unrealized P/L per position (simple mark from getQuote)
  const rows = useMemo(() => {
    return portfolio.positions.map(p => {
      const mark = getQuote(p.symbol);
      const pnl = (mark - p.avgPrice) * p.qty;
      return { symbol: p.symbol, qty: p.qty, pnl };
    });
  }, [portfolio.positions]);

  const totalPnL = useMemo(() => rows.reduce((a, r) => a + r.pnl, 0), [rows]);

  // redirect if not authed once known
  useEffect(() => {
    if (!mounted) return;
    if (!authed) router.replace('/signin');
  }, [mounted, authed, router]);

  if (!mounted || !authed) return null;

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">Portfolio</h1>
          <p className="stocks__sub">Your current holdings & unrealized P/L.</p>
        </div>
        <div className="header-actions">
          <span className={`badge ${totalPnL >= 0 ? 'badge--ok' : ''}`}>
            Total Unrealized P/L:&nbsp;
            <strong className={totalPnL >= 0 ? 'num is-up' : 'num is-down'}>
              {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
            </strong>
          </span>
        </div>
      </div>

      <section className="card portfoliotable">
  {/* header */}
  <div className="portfoliotable__head">
    <div className="portfoliotable__h left">Symbol</div>
    <div className="portfoliotable__h center">Qty</div>
    <div className="portfoliotable__h center">Unrealized P/L</div>
    <div />
  </div>

  {/* body */}
  <ul className="portfoliotable__body">
    {rows.map(r => (
      <li key={r.symbol} className="portfoliotable__row">
        <div className="portfoliotable__symbol">{r.symbol}</div>
        <div className="portfoliotable__qty">{r.qty}</div>
        <div className={`portfoliotable__pnl ${r.pnl >= 0 ? 'is-up' : 'is-down'}`}>
          {r.pnl >= 0 ? '+' : ''}{r.pnl.toFixed(2)}
        </div>
        <div className="row__actions">
          <button className="iconbtn" title="Trade" onClick={() => router.push('/trade')}>+</button>
        </div>
      </li>
    ))}
  </ul>
</section>
</main>
  );
}
