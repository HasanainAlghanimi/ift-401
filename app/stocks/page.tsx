'use client';

import React, { useEffect, useMemo, useState } from 'react';

/* ----------------------------- Types ----------------------------- */

type Stock = {
  name: string;
  symbol: string;
  price: number;
  changePct: number;
  marketCap: number;
  tradable: boolean;
};

/* ------------------------------ Utilities ------------------------------ */

type SortKey = 'name' | 'symbol' | 'price' | 'changePct' | 'marketCap';

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const cap = (n: number) =>
  n >= 1e12
    ? `${(n / 1e12).toFixed(2)}T`
    : n >= 1e9
    ? `${(n / 1e9).toFixed(2)}B`
    : n >= 1e6
    ? `${(n / 1e6).toFixed(2)}M`
    : usd(n);

const pctf = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;

function cmp(a: string | number, b: string | number) {
  if (typeof a === 'string' && typeof b === 'string')
    return a.localeCompare(b);
  return (a as number) - (b as number);
}

/* ------------------------------- Component ------------------------------ */

export default function StocksPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'tradable' | 'non'>('tradable');
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* --------------------------- Fetch from API --------------------------- */

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/stocks');
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const data: Stock[] = await res.json();
        setStocks(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load stocks');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  /* ----------------------------- Sorting ----------------------------- */

  const onSort = (key: SortKey) => {
    if (key === sortKey)
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  /* ----------------------------- Filtering ----------------------------- */

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = stocks.filter((s) => {
      const inTab =
        tab === 'tradable' ? s.tradable : !s.tradable;

      const inQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.symbol.toLowerCase().includes(q);

      return inTab && inQuery;
    });

    const dir = sortDir === 'asc' ? 1 : -1;

    return [...filtered].sort(
      (a, b) => cmp(a[sortKey], b[sortKey]) * dir
    );
  }, [stocks, query, tab, sortKey, sortDir]);

  /* ------------------------------ Render ------------------------------ */

  return (
    <main className="container stocks">
      {/* Header / Search */}
      <header className="pageheader" aria-labelledby="stocks-title">
        <div>
          <h1 id="stocks-title" className="stocks__title">
            Explore stocks
          </h1>
          <p className="stocks__sub">
            Search by name or symbol, then sort by price, today’s
            change, or market cap.
          </p>
        </div>

        <input
          className="searchbar__input stocks__search"
          aria-label="Search by name or symbol"
          placeholder="Search name or symbol…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      {/* Loading / Error */}
      {loading && <p>Loading stocks…</p>}
      {error && !loading && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Tradability filter"
            className="pillgroup"
          >
            <button
              role="tab"
              aria-selected={tab === 'tradable'}
              className={`pillbtn ${
                tab === 'tradable' ? 'is-active' : ''
              }`}
              onClick={() => setTab('tradable')}
            >
              Tradable
            </button>

            <button
              role="tab"
              aria-selected={tab === 'non'}
              className={`pillbtn ${
                tab === 'non' ? 'is-active' : ''
              }`}
              onClick={() => setTab('non')}
            >
              Non-tradable
            </button>
          </div>

          {/* Stocks Table */}
          <section className="stocks-table">
            {/* Header */}
            <div className="stocks-table__head">
              <button
                onClick={() => onSort('name')}
                className="stocks-table__headcell"
              >
                Name
              </button>
              <button
                onClick={() => onSort('symbol')}
                className="stocks-table__headcell"
              >
                Symbol
              </button>
              <button
                onClick={() => onSort('price')}
                className="stocks-table__headcell"
              >
                Price
              </button>
              <button
                onClick={() => onSort('changePct')}
                className="stocks-table__headcell"
              >
                Today
              </button>
              <button
                onClick={() => onSort('marketCap')}
                className="stocks-table__headcell"
              >
                Market Cap
              </button>
              <div className="stocks-table__headcell" />
            </div>

            {/* Body */}
            <div className="stocks-table__body">
              {list.map((s) => (
                <div
                  className="stocks-table__row"
                  key={s.symbol}
                >
                  <div className="stocks-table__cell stocks-table__cell--name">
                    <strong>{s.name}</strong>
                  </div>

                  <div className="stocks-table__cell stocks-table__cell--symbol">
                    {s.symbol}
                  </div>

                  <div className="stocks-table__cell stocks-table__cell--num">
                    {usd(s.price)}
                  </div>

                  <div
                    className={`stocks-table__cell stocks-table__cell--num ${
                      s.changePct >= 0
                        ? 'stocks-table__cell--up'
                        : 'stocks-table__cell--down'
                    }`}
                  >
                    {s.changePct >= 0 ? '▲' : '▼'}{' '}
                    {pctf(s.changePct)}
                  </div>

                  <div className="stocks-table__cell stocks-table__cell--num">
                    {cap(s.marketCap)}
                  </div>

                  <div className="stocks-table__cell stocks-table__cell--actions">
                    <button
                      className="iconbtn"
                      aria-label={`Add ${s.symbol} to watchlist`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
