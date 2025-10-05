// components/Hero.tsx
"use client";
import React, { useMemo } from "react";

// tiny inline sparkline for the watchlist rows
function Spark({ w = 120, h = 36, points = 18 }) {
  const d = useMemo(() => {
    const pad = 4;
    const step = (w - pad * 2) / (points - 1);
    let y = h - pad - 8;
    const lines: string[] = [];
    for (let i = 0; i < points; i++) {
      const dy = Math.sin(i / 2.2) * 3 + (i / points) * -6 + (Math.random() - 0.5) * 1.5;
      y = Math.min(h - pad - 3, Math.max(pad + 3, y + dy));
      const x = pad + i * step;
      lines.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return lines.join(" ");
  }, [w, h, points]);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#g)" strokeWidth="2.2" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Left: mock “screens” */}
        <div className="hero__devices" aria-hidden="true">
          {/* Desktop screen */}
            <div className="screen screen--desktop">
            <div className="screen__header" />

            {/* NEW: timeframe toolbar */}
            <div className="screen__toolbar">
                <button className="pill pill--active">1D</button>
                <button className="pill">1W</button>
                <button className="pill">1M</button>
                <button className="pill">1Y</button>
            </div>

            {/* Chart canvas */}
            <div className="chart chart--lg" />

            {/* NEW: floating KPIs */}
            <ul className="screen__kpis">
                <li><span className="kpi__label">Last</span><span className="kpi__value">$174.22</span></li>
                <li><span className="kpi__label">Δ</span><span className="kpi__value kpi__value--up">+0.84%</span></li>
                <li><span className="kpi__label">Vol</span><span className="kpi__value">58.2M</span></li>
            </ul>

            {/* Ladder column with depth overlay */}
            <div className="ladder">
                <div className="ladderDepth">
                <div className="depthBar is-bid" style={{ ['--w' as any]:'72%' }} />
                <div className="depthBar is-bid" style={{ ['--w' as any]:'54%' }} />
                <div className="depthBar is-bid" style={{ ['--w' as any]:'38%' }} />
                <div className="depthBar is-ask" style={{ ['--w' as any]:'61%' }} />
                <div className="depthBar is-ask" style={{ ['--w' as any]:'43%' }} />
                <div className="depthBar is-ask" style={{ ['--w' as any]:'25%' }} />
                </div>
            </div>

            {/* NEW: bottom ticker strip */}
            <div className="screen__ticker">
                <span className="tick is-up">AAPL 174.22 +0.84%</span>
                <span className="tick is-down">NVDA 874.15 −1.12%</span>
                <span className="tick is-up">MSFT 415.03 +0.33%</span>
                <span className="tick is-up">TSLA 243.50 +2.11%</span>
            </div>
            </div>


          <div className="screen screen--phone">
            <div className="screen__notch" />
            <div className="chart chart--sm" />

            {/* Order book */}
            <div className="ob">
              <div className="ob__row">
                <span className="tag tag--bid">Bid</span>
                <span className="ob__price">$174.22</span>
                <span className="ob__size">x 300</span>
              </div>
              <div className="ob__row">
                <span className="tag tag--ask">Ask</span>
                <span className="ob__price">$174.27</span>
                <span className="ob__size">x 200</span>
              </div>
            </div>

            {/* Quick action pads */}
            <div className="pads">
              <button className="pad pad--buy">Buy</button>
              <button className="pad pad--sell">Sell</button>
            </div>
          </div>
        </div>

        {/* Right: copy + CTAs */}
        <div className="hero__copy">
          <h1 className="hero__title">
            More Trading.
            <br /> More Money.
            <br /> Better than Robinhood.
          </h1>
          <p className="hero__subtitle">
            Invest all of your money with us and just pray that you don't lose it all...
          </p>
          <div className="hero__actions">
            <button className="btn btn--accent">Learn more</button>
          </div>

          {/* NEW: quick value bullets (desktop-first, hides on small) */}
          <ul className="hero__bullets">
            <li>⚡ Lightning-fast paper trades</li>
            <li>📊 Clean, readable charts</li>
            <li>🧠 Watchlists & top movers</li>
          </ul>

          {/* NEW: stat strip */}
          <dl className="statbar">
            <div className="stat">
              <dt>Symbols</dt>
              <dd>4,000+</dd>
            </div>
            <div className="stat">
              <dt>Latency</dt>
              <dd>&lt; 50ms</dd>
            </div>
            <div className="stat">
              <dt>Paper Trades</dt>
              <dd>Unlimited</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* NEW: mini watchlist preview (stays within hero) */}
      <div className="watchlist">
        <div className="watchlist__head">Market snapshot</div>
        <div className="watchlist__rows">
          {[
            { s: "AAPL", last: 174.22, chg: +0.84, vol: "58.2M" },
            { s: "NVDA", last: 874.15, chg: -1.12, vol: "34.0M" },
            { s: "MSFT", last: 415.03, chg: +0.33, vol: "22.7M" },
            { s: "TSLA", last: 243.5, chg: +2.11, vol: "89.5M" },
          ].map((r) => (
            <div className="watchlist__row" key={r.s}>
              <div className="watchlist__sym">{r.s}</div>
              <div className="watchlist__last">${r.last.toFixed(2)}</div>
              <div
                className={
                  "watchlist__chg " + (r.chg >= 0 ? "is-up" : "is-down")
                }
              >
                {r.chg >= 0 ? "+" : ""}
                {r.chg}%
              </div>
              <div className="watchlist__vol">{r.vol}</div>
              <div className="watchlist__spark">
                <Spark />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
