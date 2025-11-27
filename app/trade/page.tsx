'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoSession } from '@/lib/useDemoSession';
import { supabase } from '@/lib/supabaseClient';

type Stock = {
  ticker_id: number;
  symbol: string;
  company_name: string | null;
};

type Account = {
  account_id: number;
  balance: number;
};

type Side = 'BUY' | 'SELL';
type OrderType = 'MARKET';

type Position = { symbol: string; qty: number; avgPrice: number };
type Portfolio = { cash: number; positions: Position[] };

type UiOrder = {
  id: string;
  time: string;
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  fillPrice: number;
};

const STARTING_CASH = 10_000;
const ORDER_TYPE: OrderType = 'MARKET';

// localStorage helpers
function readJSON<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
function ensurePortfolio(): Portfolio {
  const p = readJSON<Portfolio>('demo_portfolio', {
    cash: STARTING_CASH,
    positions: [],
  });
  if (typeof p.cash !== 'number' || !Array.isArray(p.positions)) {
    return { cash: STARTING_CASH, positions: [] };
  }
  return p;
}
const fmt = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

/** Helpers for market-hours check (America/New_York) */
function getNowInET() {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
    hour12: false,
  });

  const parts = fmt.formatToParts(now);
  const map: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value;
  }

  const date = `${map.year}-${map.month}-${map.day}`;
  const time = `${map.hour}:${map.minute}:${map.second}`;
  const weekdayLabel = map.weekday; // "Mon", "Tue", ... 

  const weekdayMap: Record<string, number> = {
    Sun: 7,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const dayOfWeek = weekdayMap[weekdayLabel] ?? 7;
  const hour = Number(map.hour);
  const minute = Number(map.minute);

  return { date, time, dayOfWeek, hour, minute };
}

function timeToMinutes(t: string | null | undefined): number | null {
  if (!t) return null;
  const [h, m, s] = t.split(':').map((x) => Number(x));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m + (Number.isNaN(s) ? 0 : s / 60);
}

/** 🔹 HELPERS TO WRITE TO position TABLE */
async function upsertPositionRow(
  accountId: number,
  tickerId: number,
  side: Side,
  qty: number,
  price: number
) {
  try {
    // 1) Load any existing position row for this account & ticker
    const { data: existing, error: posErr } = await supabase
      .from('position')
      .select('position_id, quantity, average_cost')
      .eq('account_id', accountId)
      .eq('ticker_id', tickerId)
      .maybeSingle();

    if (posErr) {
      console.error('position lookup error:', posErr);
      return;
    }

    const nowIso = new Date().toISOString();

    // No existing row
    if (!existing) {
      if (side === 'SELL') {
        // Shouldn't really happen because you already validated quantity,
        // but don't create a negative position.
        console.warn('SELL with no existing position, skipping position insert');
        return;
      }

      // BUY → insert new position row
      const { error: insertErr } = await supabase.from('position').insert({
        account_id: accountId,
        ticker_id: tickerId,
        quantity: qty,
        average_cost: price,
        current_value: price * qty,
        unrealized_pl: 0,
        realized_pl: 0,
        last_updated: nowIso,
      });

      if (insertErr) {
        console.error('position insert error:', insertErr);
      }
      return;
    }

    // There *is* an existing row
    const oldQty = Number((existing as any).quantity) || 0;
    const oldCost = Number((existing as any).average_cost) || 0;

    let newQty = oldQty;
    let newAvgCost = oldCost;

    if (side === 'BUY') {
      newQty = oldQty + qty;
      newAvgCost =
        newQty > 0
          ? (oldCost * oldQty + price * qty) / newQty
          : price;
    } else {
      // SELL
      newQty = oldQty - qty;
      if (newQty < 0) {
        console.warn('SELL would result in negative position, skipping update');
        return;
      }
      // keep same avg cost on sell (realized P/L could be tracked separately)
    }

    if (newQty === 0) {
      // Close the position: delete the row
      const { error: delErr } = await supabase
        .from('position')
        .delete()
        .eq('position_id', (existing as any).position_id);

      if (delErr) {
        console.error('position delete error:', delErr);
      }
      return;
    }

    // Update existing row
    const { error: updateErr } = await supabase
      .from('position')
      .update({
        quantity: newQty,
        average_cost: newAvgCost,
        current_value: newQty * price,
        last_updated: nowIso,
      })
      .eq('position_id', (existing as any).position_id);

    if (updateErr) {
      console.error('position update error:', updateErr);
    }
  } catch (e) {
    console.error('upsertPositionRow unexpected error:', e);
  }
}

export default function TradePage() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  // auth / mount gates
  const [mounted, setMounted] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
    try {
      setHasSession(!!localStorage.getItem('demo_session'));
    } catch {
      setHasSession(false);
    }
  }, []);
  const authed = isLoggedIn || !!hasSession;

  // DB state
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // quote
  const [quote, setQuote] = useState<number | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  // ticket state
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [side, setSide] = useState<Side>('BUY');
  const [message, setMessage] = useState<string>('');

  // local UI portfolio + orders
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: STARTING_CASH,
    positions: [],
  });
  const [orders, setOrders] = useState<UiOrder[]>([]);

  // market-hours / holiday gating
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [marketStatusMsg, setMarketStatusMsg] = useState<string | null>(null);

  // load local portfolio + orders once mounted
  useEffect(() => {
    if (!mounted) return;
    setPortfolio(ensurePortfolio());
    setOrders(readJSON<UiOrder[]>('demo_orders', []));
  }, [mounted]);

  // redirect if not authed
  useEffect(() => {
    if (!mounted) return;
    if (!authed) router.replace('/signin');
  }, [mounted, authed, router]);

  // load tickers + account for *current user_id*
  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      setLoading(true);
      setLoadError(null);

      // 0) read user_id OR email from demo_session in localStorage
      let demoUserId: number | null = null;
      let sessionEmail: string | null = null;

      try {
        const raw = localStorage.getItem('demo_session');
        if (raw) {
          const obj = JSON.parse(raw);

          // if your login ever stores a numeric user_id, use it directly
          if (typeof obj.user_id === 'number') {
            demoUserId = obj.user_id;
          } else if (typeof obj.id === 'number') {
            demoUserId = obj.id;
          }

          // from your screenshot, you currently have: { email, remember, role }
          if (typeof obj.email === 'string') {
            sessionEmail = obj.email;
          }
        }
      } catch {
        /* ignore */
      }

      // If we didn't get a numeric user id but we *do* have an email in the session,
      // resolve user_id from the users table.
      if (!demoUserId && sessionEmail) {
        const { data: userRow, error: userErr } = await supabase
          .from('users')
          .select('user_id')
          .eq('email', sessionEmail)
          .maybeSingle();

        if (userErr) {
          console.error('Failed to resolve user id from email:', userErr);
        } else if (userRow && (userRow as any).user_id != null) {
          demoUserId = Number((userRow as any).user_id);
        }
      }

      if (!demoUserId) {
        setLoadError(
          'Could not determine logged-in user id. Check demo_session and users table.'
        );
        setLoading(false);
        return;
      }

      // 1) load tickers
      const { data: tickerRows, error: tickerError } = await supabase
        .from('ticker')
        .select('ticker_id, symbol, company_name')
        .eq('is_active', true)
        .order('symbol', { ascending: true });

      if (tickerError) {
        console.error(tickerError);
        setLoadError('Failed to load tickers.');
      } else if (tickerRows && tickerRows.length > 0) {
        setStocks(tickerRows as Stock[]);
        setSymbol((prev) => prev || tickerRows[0].symbol);
      } else {
        setStocks([]);
        setSymbol('');
      }

      // 2) load account row for this user_id
      const { data: acct, error: acctErr } = await supabase
        .from('account')
        .select('account_id, balance')
        .eq('user_id', demoUserId)
        .maybeSingle();

      if (acctErr || !acct) {
        console.error(acctErr);
        setLoadError(
          'Failed to load trading account for this user. Make sure there is an account row with this user_id.'
        );
        setLoading(false);
        return;
      }

      const acctBalance = Number((acct as any).balance);
      setAccount({
        account_id: (acct as any).account_id,
        balance: acctBalance,
      });

      setPortfolio((prev) => ({
        ...prev,
        cash: acctBalance,
      }));

      setLoading(false);
    };

    void init();
  }, [mounted]);

  // load latest close from pricebar whenever symbol changes
  useEffect(() => {
    const loadQuote = async () => {
      if (!symbol || stocks.length === 0) {
        setQuote(null);
        return;
      }

      const stock = stocks.find((st) => st.symbol === symbol);
      if (!stock) {
        setQuote(null);
        return;
      }

      setQuoteLoading(true);

      const { data, error } = await supabase
        .from('pricebar')
        .select('close, bar_date, bar_time, time_interval')
        .eq('ticker_id', stock.ticker_id)
        .eq('time_interval', 'daily')
        .order('bar_date', { ascending: false })
        .order('bar_time', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(error);
        setQuote(null);
      } else if (data && (data as any).close != null) {
        setQuote(Number((data as any).close));
      } else {
        setQuote(null);
      }

      setQuoteLoading(false);
    };

    void loadQuote();
  }, [symbol, stocks]);

  const posMap = useMemo(() => {
    const map = new Map<string, Position>();
    portfolio.positions.forEach((p) => map.set(p.symbol, p));
    return map;
  }, [portfolio.positions]);

  /** Market-hours + holiday gating effect */
  useEffect(() => {
    if (!mounted) return;

    const checkMarket = async () => {
      try {
        const { date, time, dayOfWeek, hour, minute } = getNowInET();
        const nowMinutes = hour * 60 + minute;

        // 1) Holiday / calendar check
        const { data: calRow, error: calErr } = await supabase
          .from('marketcalendar')
          .select('holiday_name, market_status')
          .eq('date', date)
          .maybeSingle();

        if (calErr) {
          console.error('marketcalendar lookup error:', calErr);
        }

        if (calRow && calRow.market_status === 'Closed') {
          setIsClosed(true);
          setMarketStatusMsg(
            calRow.holiday_name
              ? `Market closed today for ${calRow.holiday_name}.`
              : 'Market closed today.'
          );
          return;
        }

        // 2) Regular hours from markethours table
        const { data: hoursRow, error: hoursErr } = await supabase
          .from('markethours')
          .select(
            'open_time, close_time, pre_market_start, after_hours_end, is_active, effective_date'
          )
          .eq('day_of_week', dayOfWeek)
          .eq('is_active', true)
          .lte('effective_date', date)
          .order('effective_date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (hoursErr) {
          console.error('markethours lookup error:', hoursErr);
          setIsClosed(true);
          setMarketStatusMsg('Could not load market hours configuration.');
          return;
        }

        if (!hoursRow) {
          // weekend or no schedule
          setIsClosed(true);
          setMarketStatusMsg('Market is closed today.');
          return;
        }

        const startMinutes =
          timeToMinutes(hoursRow.pre_market_start) ??
          timeToMinutes(hoursRow.open_time);
        const endMinutes =
          timeToMinutes(hoursRow.after_hours_end) ??
          timeToMinutes(hoursRow.close_time);

        if (
          startMinutes == null ||
          endMinutes == null ||
          nowMinutes < startMinutes ||
          nowMinutes > endMinutes
        ) {
          setIsClosed(true);
          setMarketStatusMsg(
            'Trading is currently outside configured market hours.'
          );
        } else {
          setIsClosed(false);
          setMarketStatusMsg(null);
        }
      } catch (err) {
        console.error('market hours check error', err);
        setIsClosed(false);
        setMarketStatusMsg(null);
      }
    };

    void checkMarket();
  }, [mounted]);

  function updatePortfolio(
    newCash: number,
    s: string,
    fillPrice: number,
    qtyDelta: number
  ) {
    setPortfolio((prev) => {
      const next: Portfolio = {
        cash: newCash,
        positions: prev.positions.map((p) => ({ ...p })),
      };

      const existing = next.positions.find((p) => p.symbol === s);
      if (!existing) {
        if (qtyDelta > 0) {
          next.positions.push({
            symbol: s,
            qty: qtyDelta,
            avgPrice: fillPrice,
          });
        }
      } else {
        const newQty = existing.qty + qtyDelta;
        if (newQty <= 0) {
          next.positions = next.positions.filter((p) => p.symbol !== s);
        } else if (qtyDelta > 0) {
          existing.avgPrice =
            (existing.avgPrice * existing.qty + fillPrice * qtyDelta) / newQty;
          existing.qty = newQty;
        } else {
          existing.qty = newQty;
        }
      }

      writeJSON('demo_portfolio', next);
      return next;
    });
  }

  async function placeOrder() {
    if (!account) {
      setMessage('Trading account not loaded.');
      return;
    }

    if (isClosed) {
      setMessage(
        marketStatusMsg ||
          'Trading is currently closed. Please return during market hours.'
      );
      return;
    }

    const s = symbol.trim().toUpperCase();
    if (!s) {
      setMessage('Select a symbol.');
      return;
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      setMessage('Quantity must be a positive number.');
      return;
    }
    if (quote == null || !Number.isFinite(quote) || quote <= 0) {
      setMessage('No price data available for this symbol.');
      return;
    }

    const stock = stocks.find((st) => st.symbol === s);
    if (!stock) {
      setMessage('That symbol is not available to trade.');
      return;
    }

    const px = quote;
    const amt = Number((px * qty).toFixed(2));
    const currentBalance = Number(account.balance);

    if (side === 'BUY' && amt > currentBalance) {
      setMessage(`Insufficient funds. You have ${fmt(currentBalance)}.`);
      return;
    }

    if (side === 'SELL') {
      const have = posMap.get(s)?.qty ?? 0;
      if (qty > have) {
        setMessage(`You only have ${have} ${s} to sell.`);
        return;
      }
    }

    try {
      setMessage('Submitting order...');

      // 1) insert into orders
      const { data: orderRow, error: orderError } = await supabase
        .from('orders')
        .insert({
          account_id: account.account_id,
          ticker_id: stock.ticker_id,
          order_type: 'Market', // matches your CHECK constraint
          side: side === 'BUY' ? 'Buy' : 'Sell',
          quantity: qty,
          price: px,
          status: 'FILLED',
          order_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError || !orderRow) {
        console.error('Order insert error:', orderError);
        setMessage(
          `Could not place order: ${orderError?.message ?? 'Unknown error'}`
        );
        return;
      }

      // 2) insert into trade
      const { error: tradeError } = await supabase.from('trade').insert({
        order_id: (orderRow as any).order_id,
        ticker_id: stock.ticker_id,
        execution_price: px,
        quantity: qty,
        trade_date: new Date().toISOString(),
        commission: 0,
        settlement_date: new Date(),
      });

      if (tradeError) {
        console.error('Trade insert error:', tradeError);
        setMessage('Order created but trade record failed.');
        return;
      }

      // 3) update account balance
      const newBalance =
        side === 'BUY'
          ? Number((currentBalance - amt).toFixed(2))
          : Number((currentBalance + amt).toFixed(2));

      const { error: acctUpdateError } = await supabase
        .from('account')
        .update({ balance: newBalance, available_balance: newBalance })
        .eq('account_id', account.account_id);

      if (acctUpdateError) {
        console.error('Account update error:', acctUpdateError);
        setMessage('Trade executed but failed to update balance.');
        return;
      }

      // 4) insert into transaction
      const { error: txError } = await supabase.from('transaction').insert({
        account_id: account.account_id,
        transaction_type: side === 'BUY' ? 'Buy' : 'Sell',
        amount: amt,
        balance_before: currentBalance,
        balance_after: newBalance,
        transaction_date: new Date().toISOString(),
        status: 'COMPLETED',
      });

      if (txError) {
        console.error('Transaction insert error:', txError);
      }

      // 5) 🔹 UPDATE / INSERT INTO position TABLE
      await upsertPositionRow(
        account.account_id,
        stock.ticker_id,
        side,
        qty,
        px
      );

      // update local account + portfolio + UI orders (still tracked client-side)
      setAccount((prev) => (prev ? { ...prev, balance: newBalance } : prev));
      updatePortfolio(newBalance, s, px, side === 'BUY' ? qty : -qty);

      const uiOrder: UiOrder = {
        id: (orderRow as any).order_id.toString(),
        time: (orderRow as any).order_date,
        symbol: s,
        side,
        type: ORDER_TYPE,
        qty,
        fillPrice: px,
      };

      const nextOrders = [uiOrder, ...orders].slice(0, 100);
      setOrders(nextOrders);
      writeJSON('demo_orders', nextOrders);

      setMessage(`${side} ${qty} ${s} @ ${fmt(px)} filled.`);
      router.refresh(); // refresh navbar balance, etc.
    } catch (err) {
      console.error(err);
      setMessage('Unexpected error while placing order.');
    }
  }

  const est = (quote ?? 0) * qty;
  const canSubmit =
    !!symbol &&
    Number.isFinite(qty) &&
    qty > 0 &&
    quote != null &&
    quote > 0 &&
    !quoteLoading;

  // render gates
  if (!mounted) return null;
  if (!authed) return null;

  if (loading) {
    return (
      <main
        className="trade container"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <p>Loading trading data...</p>
      </main>
    );
  }

  if (loadError || !account) {
    return (
      <main
        className="trade container"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <p className="trade__alert is-error">
          {loadError ?? 'No trading account found.'}
        </p>
      </main>
    );
  }

  return (
    <main
      className="trade container"
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      <div className="pageheader">
        <div>
          <h1 className="stocks__title">Trade</h1>
          <p className="stocks__sub">Buy or sell stocks with ease.</p>
        </div>
      </div>

      {/* Wrapper that applies disabled state + banner when closed */}
      <div className={isClosed ? 'trade-disabled' : ''}>
        {isClosed && (
          <div className="market-closed-banner">
            {marketStatusMsg ??
              'Trading is currently closed. Please return during normal market hours.'}
          </div>
        )}

        {/* Ticket */}
        <section
          className="card"
          style={{
            marginBottom: 24,
            background: '#060816',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="pillgroup" role="tablist" aria-label="Order side">
            <button
              className={`pillbtn ${side === 'BUY' ? 'is-active' : ''}`}
              onClick={() => {
                setSide('BUY');
                setMessage('');
              }}
              type="button"
            >
              Buy
            </button>
            <button
              className={`pillbtn ${side === 'SELL' ? 'is-active' : ''}`}
              onClick={() => {
                setSide('SELL');
                setMessage('');
              }}
              type="button"
            >
              Sell
            </button>
          </div>

          <form
            className="auth__form"
            onSubmit={(e) => {
              e.preventDefault();
              void placeOrder();
            }}
          >
            <div className="fieldrow">
              <label className="field">
                <span className="field__label">Symbol</span>
                <select
                  className="field__input"
                  value={symbol}
                  onChange={(e) => {
                    setSymbol(e.target.value);
                    setMessage('');
                  }}
                  disabled={isClosed}
                >
                  {stocks.length === 0 && (
                    <option value="">No tickers available</option>
                  )}
                  {stocks.map((st) => (
                    <option key={st.ticker_id} value={st.symbol}>
                      {st.company_name
                        ? `${st.symbol} — ${st.company_name}`
                        : st.symbol}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field__label">Quantity</span>
                <input
                  className="field__input"
                  type="number"
                  min={1}
                  step={1}
                  value={qty}
                  onChange={(e) => {
                    setQty(Math.max(1, Number(e.target.value)));
                    setMessage('');
                  }}
                  placeholder="1"
                  disabled={isClosed}
                />
              </label>
            </div>

            <div className="fieldrow">
              <label className="field">
                <span className="field__label">
                  Price (latest close from pricebar)
                </span>
                <input
                  className="field__input"
                  type="text"
                  value={
                    quoteLoading
                      ? 'Loading...'
                      : quote != null
                      ? fmt(quote)
                      : 'No price data'
                  }
                  readOnly
                />
              </label>
            </div>

            <div className="actions-row">
              <div className="badge">
                Est. {side === 'BUY' ? 'Cost' : 'Proceeds'}:{' '}
                <strong>{fmt(est || 0)}</strong>
              </div>
              <div className="badge">
                Cash: <strong>{fmt(account.balance)}</strong>
              </div>
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
              disabled={!canSubmit || stocks.length === 0 || isClosed}
            >
              {side === 'BUY' ? 'Buy' : 'Sell'} {qty}{' '}
              {symbol ? symbol.toUpperCase() : ''}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
