'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Side = 'BUY' | 'SELL';
type OrderType = 'MARKET';

type UiOrder = {
  id: number;
  time: string;
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  fillPrice: number;
  limitPrice?: number | null;
};

const fmtMoney = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString([], { hour12: false });

export default function HistoryPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<UiOrder[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [side, setSide] = useState<'ALL' | Side>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'symbol' | 'amount'>('time');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadData = async () => {
      setLoading(true);

      try {
        const raw = localStorage.getItem('demo_session');
        if (!raw) {
          router.replace('/signin');
          return;
        }

        const session = JSON.parse(raw);
        const email = session?.email;

        if (!email) {
          setLoadError('Invalid session.');
          setLoading(false);
          return;
        }

        // Get user_id
        const { data: userRow } = await supabase
          .from('users')
          .select('user_id')
          .eq('email', email)
          .maybeSingle();

        if (!userRow) {
          setLoadError('User not found.');
          setLoading(false);
          return;
        }

        const userId = userRow.user_id;

        // Get account_id
        const { data: acct } = await supabase
          .from('account')
          .select('account_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (!acct) {
          setLoadError('No account found.');
          setLoading(false);
          return;
        }

        const accountId = acct.account_id;

        // Get orders for account
        const { data: orderRows } = await supabase
          .from('orders')
          .select(
            `
            order_id,
            order_date,
            side,
            order_type,
            quantity,
            price,
            ticker (
              symbol
            )
          `
          )
          .eq('account_id', accountId)
          .order('order_date', { ascending: false });

        if (!orderRows) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const uiOrders: UiOrder[] = orderRows.map((o: any) => ({
          id: o.order_id,
          time: o.order_date,
          symbol: o.ticker?.symbol ?? '—',
          side: o.side.toUpperCase(),
          type: o.order_type.toUpperCase(),
          qty: o.quantity,
          fillPrice: o.price,
          limitPrice: o.limit_price ?? null
        }));

        setOrders(uiOrders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoadError('Failed to load history.');
        setLoading(false);
      }
    };

    loadData();
  }, [mounted, router]);

  const toggleSort = (col: typeof sortBy) => {
    if (col === sortBy) {
      setDir(dir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setDir('desc');
    }
  };

  const filtered = useMemo(() => {
    const s = search.trim().toUpperCase();

    let rows = orders.filter((o) => {
      return (
        (!s || o.symbol.includes(s)) &&
        (side === 'ALL' || o.side === side)
      );
    });

    rows = rows.sort((a, b) => {
      let delta = 0;

      if (sortBy === 'time') {
        delta = new Date(a.time).getTime() - new Date(b.time).getTime();
      }
      if (sortBy === 'symbol') {
        delta = a.symbol.localeCompare(b.symbol);
      }
      if (sortBy === 'amount') {
        delta = a.fillPrice * a.qty - b.fillPrice * b.qty;
      }

      return dir === 'asc' ? delta : -delta;
    });

    return rows;
  }, [orders, search, side, sortBy, dir]);

  if (!mounted) return null;

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">History</h1>
          <p className="stocks__sub">All filled orders for this account.</p>
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : loadError ? (
        <p className="trade__alert is-error">{loadError}</p>
      ) : (
        <>
          {/* Filters */}
          <div className="actions-row" style={{ marginBottom: 8 }}>
            <input
              className="field__input"
              placeholder="Search symbol…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 220 }}
            />

            <div className="pillgroup">
              <button
                className={`pillbtn ${side === 'ALL' ? 'is-active' : ''}`}
                onClick={() => setSide('ALL')}
              >
                All
              </button>
              <button
                className={`pillbtn ${side === 'BUY' ? 'is-active' : ''}`}
                onClick={() => setSide('BUY')}
              >
                Buy
              </button>
              <button
                className={`pillbtn ${side === 'SELL' ? 'is-active' : ''}`}
                onClick={() => setSide('SELL')}
              >
                Sell
              </button>
            </div>
          </div>

          {/* HEADER */}
          <div className="table__head is-sticky history-grid">
            <button onClick={() => toggleSort('time')}>
              Time
            </button>
            <button onClick={() => toggleSort('symbol')}>
              Symbol
            </button>
            <button>Side</button>
            <button>Type</button>
            <button>Qty</button>
            <button>Limit</button>
            <button onClick={() => toggleSort('amount')}>
              Fill
            </button>
          </div>

          {/* ROWS */}
          <ul className="table__body">
            {filtered.map((o) => {
              const notional = o.fillPrice * o.qty;

              return (
                <li key={o.id} className="row history-grid">
                  <div className="name">
                    <strong>{fmtDate(o.time)}</strong>
                    <span className="symbol">ID: {o.id}</span>
                  </div>

                  <div className="num">{o.symbol}</div>

                  <div
                    className={`num ${
                      o.side === 'BUY' ? 'is-up' : 'is-down'
                    }`}
                  >
                    {o.side}
                  </div>

                  <div className="num">{o.type}</div>

                  <div className="num">{o.qty}</div>

                  <div className="num">
                    {o.limitPrice ? fmtMoney(o.limitPrice) : '-'}
                  </div>

                  <div className="num">
                    {fmtMoney(o.fillPrice)}{' '}
                    <span className="symbol">
                      ({fmtMoney(notional)})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}
