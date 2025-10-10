'use client';

import React, { useMemo, useState } from 'react';

/* ----------------------------- Types & Data ----------------------------- */

type Stock = {
  name: string;
  symbol: string;
  price: number;
  changePct: number;   // today's % change
  marketCap: number;   // USD
  tradable: boolean;
};

const DATA: Stock[] = [
  { name: 'Apple',     symbol: 'AAPL', price: 174.22, changePct:  0.84, marketCap: 2.43e12, tradable: true  },
  { name: 'Microsoft', symbol: 'MSFT', price: 415.03, changePct:  0.33, marketCap: 2.27e12, tradable: true  },
  { name: 'Tesla',     symbol: 'TSLA', price: 243.50, changePct:  2.11, marketCap: 8.95e11, tradable: true  },
  { name: 'NVIDIA',    symbol: 'NVDA', price: 874.15, changePct: -1.12, marketCap: 5.42e11, tradable: true  },
  { name: 'AMD',       symbol: 'AMD',  price: 121.77, changePct:  0.06, marketCap: 1.96e11, tradable: true  },
  { name: 'Shopify',   symbol: 'SHOP', price:  78.42, changePct: -3.29, marketCap: 1.01e11, tradable: true  },
  { name: 'Adobe',     symbol: 'ADBE', price: 516.90, changePct: -0.45, marketCap: 2.36e11, tradable: false },
  { name: 'Coinbase',  symbol: 'COIN', price: 232.11, changePct:  1.87, marketCap: 5.78e10, tradable: false },
];

/* ------------------------------ Utilities ------------------------------ */

type SortKey = 'name' | 'symbol' | 'price' | 'changePct' | 'marketCap';

const usd  = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
const cap  = (n: number) =>
  n >= 1e12 ? `${(n / 1e12).toFixed(2)}T` :
  n >= 1e9  ? `${(n / 1e9 ).toFixed(2)}B` :
  n >= 1e6  ? `${(n / 1e6 ).toFixed(2)}M` : usd(n);

const pctf = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`;

function cmp(a: string | number, b: string | number) {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
  return (a as number) - (b as number);
}

/* ------------------------------- Component ------------------------------ */

export default function StocksPage() {
  const [query, setQuery]     = useState('');
  const [tab, setTab]         = useState<'tradable' | 'non'>('tradable');
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const onSort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = DATA.filter(s => {
      const inTab = tab === 'tradable' ? s.tradable : !s.tradable;
      const inQuery = !q || s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q);
      return inTab && inQuery;
    });

    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => cmp(a[sortKey], b[sortKey]) * dir);
  }, [query, tab, sortKey, sortDir]);

  return (
    <main className="container stocks">
      {/* Header / Search */}
      <header className="pageheader" aria-labelledby="stocks-title">
        <div>
          <h1 id="stocks-title" className="stocks__title">Explore stocks</h1>
          <p className="stocks__sub">
            Search by name or symbol, then sort by price, today’s change, or market cap.
          </p>
        </div>
        <input
          className="searchbar__input stocks__search"
          aria-label="Search by name or symbol"
          placeholder="Search name or symbol…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </header>

      {/* Tabs */}
      <div role="tablist" aria-label="Tradability filter" className="pillgroup">
        <button
          role="tab"
          aria-selected={tab === 'tradable'}
          className={`pillbtn ${tab === 'tradable' ? 'is-active' : ''}`}
          onClick={() => setTab('tradable')}
        >
          Tradable
        </button>
        <button
          role="tab"
          aria-selected={tab === 'non'}
          className={`pillbtn ${tab === 'non' ? 'is-active' : ''}`}
          onClick={() => setTab('non')}
        >
          Non-tradable
        </button>
      </div>

      {/* Transparent table */}
<section className="table table--bare">
  <div className="table__head is-sticky">
    <button onClick={() => onSort('name')}>Name</button>
    <button onClick={() => onSort('symbol')}>Symbol</button>
    <button onClick={() => onSort('price')}>Price</button>
    <button onClick={() => onSort('changePct')}>Today</button>
    <button onClick={() => onSort('marketCap')}>Market Cap</button>
    <span />
  </div>

  <ul className="table__body">
    {list.map((s) => (
      <li className="row" key={s.symbol}>
        <div className="name"><strong>{s.name}</strong></div>
        <div className="symbol">{s.symbol}</div>
        <div className="num">{usd(s.price)}</div>
        <div className={`num ${s.changePct >= 0 ? 'is-up' : 'is-down'}`}>
          {s.changePct >= 0 ? '▲' : '▼'} {pctf(s.changePct)}
        </div>
        <div className="num">{cap(s.marketCap)}</div>
        <div className="row__actions">
          <button className="iconbtn" aria-label={`Add ${s.symbol} to watchlist`}>+</button>
        </div>
      </li>
    ))}
  </ul>
</section>

    </main>
  );
}
