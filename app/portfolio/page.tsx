'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type PositionRow = {
  position_id: number;
  ticker_id: number;
  quantity: number;
  average_cost: number;   // <-- matches your table
};

type UiRow = {
  symbol: string;
  qty: number;
  pnl: number;
};

const money = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// helper: get current account_id from demo_session -> users -> account
async function resolveAccountId(): Promise<number | null> {
  try {
    const raw = localStorage.getItem('demo_session');
    if (!raw) return null;

    const obj = JSON.parse(raw);
    const email =
      typeof obj?.email === 'string'
        ? obj.email
        : null;

    if (!email) return null;

    // 1) user_id from users by email
    const { data: userRow, error: userErr } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', email)
      .maybeSingle();

    if (userErr || !userRow) {
      console.error('resolveAccountId: user lookup failed', userErr);
      return null;
    }

    const userId = (userRow as any).user_id as number;

    // 2) account_id from account by user_id
    const { data: acctRow, error: acctErr } = await supabase
      .from('account')
      .select('account_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (acctErr || !acctRow) {
      console.error('resolveAccountId: account lookup failed', acctErr);
      return null;
    }

    return (acctRow as any).account_id as number;
  } catch (err) {
    console.error('resolveAccountId error', err);
    return null;
  }
}

export default function PortfolioSimplePage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [rows, setRows] = useState<UiRow[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      setLoading(true);
      setLoadError(null);

      const hasSession = !!localStorage.getItem('demo_session');
      if (!hasSession) {
        router.replace('/signin');
        return;
      }

      const accountId = await resolveAccountId();
      if (!accountId) {
        console.error('Portfolio: could not determine trading account');
        setRows([]);
        setLoading(false);
        return;
      }

      // 1) load positions for this account (note average_cost)
      const { data: posRows, error: posErr } = await supabase
        .from('position')
        .select('position_id, ticker_id, quantity, average_cost')
        .eq('account_id', accountId);

      if (posErr) {
        console.error('load positions error', posErr);
        setLoadError('Failed to load portfolio.');
        setLoading(false);
        return;
      }

      const positions = (posRows ?? []) as PositionRow[];

      if (positions.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // unique ticker_ids
      const tickerIds = Array.from(
        new Set(positions.map((p) => p.ticker_id))
      );

      if (tickerIds.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // 2) get symbols for those tickers
      const { data: tickerRows, error: tickerErr } = await supabase
        .from('ticker')
        .select('ticker_id, symbol')
        .in('ticker_id', tickerIds);

      if (tickerErr) {
        console.error('load tickers error', tickerErr);
        setLoadError('Failed to load ticker symbols.');
        setLoading(false);
        return;
      }

      const tickerMap = new Map<number, string>();
      (tickerRows ?? []).forEach((t: any) => {
        tickerMap.set(t.ticker_id, t.symbol);
      });

      // 3) latest daily close for each ticker
      const priceMap = new Map<number, number>();

      await Promise.all(
        tickerIds.map(async (tid) => {
          const { data, error } = await supabase
            .from('pricebar')
            .select('close')
            .eq('ticker_id', tid)
            .eq('time_interval', 'daily')
            .order('bar_date', { ascending: false })
            .order('bar_time', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (!error && data && (data as any).close != null) {
            priceMap.set(tid, Number((data as any).close));
          }
        })
      );

      const ui: UiRow[] = positions.map((p) => {
        const symbol = tickerMap.get(p.ticker_id) ?? '—';
        const mark = priceMap.get(p.ticker_id) ?? p.average_cost;
        const pnl = (mark - p.average_cost) * p.quantity;  // <-- use average_cost
        return {
          symbol,
          qty: p.quantity,
          pnl,
        };
      });

      setRows(ui);
      setLoading(false);
    };

    void init();
  }, [mounted, router]);

  const totalPnL = useMemo(
    () => rows.reduce((a, r) => a + r.pnl, 0),
    [rows]
  );

  if (!mounted) return null;

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">Portfolio</h1>
          <p className="stocks__sub">
            Your current holdings &amp; unrealized P/L.
          </p>
        </div>
        <div className="header-actions">
          <span className={`badge ${totalPnL >= 0 ? 'badge--ok' : ''}`}>
            Total Unrealized P/L:&nbsp;
            <strong className={totalPnL >= 0 ? 'num is-up' : 'num is-down'}>
              {totalPnL >= 0 ? '+' : ''}
              {totalPnL.toFixed(2)}
            </strong>
          </span>
        </div>
      </div>

      {loading ? (
        <p>Loading portfolio…</p>
      ) : loadError ? (
        <p className="trade__alert is-error">{loadError}</p>
      ) : (
        <section className="card portfoliotable">
          <div className="portfoliotable__head">
            <div className="portfoliotable__h left">Symbol</div>
            <div className="portfoliotable__h center">Qty</div>
            <div className="portfoliotable__h center">Unrealized P/L</div>
            <div />
          </div>

          <ul className="portfoliotable__body">
            {rows.length === 0 ? (
              <li className="portfoliotable__row">
                <div
                  className="muted"
                  style={{
                    padding: 12,
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                  }}
                >
                  No positions yet.
                </div>
              </li>
            ) : (
              rows.map((r) => (
                <li key={r.symbol} className="portfoliotable__row">
                  <div className="portfoliotable__symbol">{r.symbol}</div>
                  <div className="portfoliotable__qty">{r.qty}</div>
                  <div
                    className={`portfoliotable__pnl ${
                      r.pnl >= 0 ? 'is-up' : 'is-down'
                    }`}
                  >
                    {r.pnl >= 0 ? '+' : ''}
                    {r.pnl.toFixed(2)}
                  </div>
                  <div className="row__actions">
                    <button
                      className="iconbtn"
                      title="Trade"
                      onClick={() => router.push('/trade')}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
