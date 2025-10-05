// components/PublicHome.tsx
"use client";
import React from "react";
import Hero from "./Hero";

export default function PublicHome() {
  return (
    <>
      {/* Full-width hero section */}
      <div className="fullbleed">
        <Hero />
      </div>

      {/* Features / marketing section */}
      <section className="marketing">
        <div className="container">
          <h2 className="marketing__title">Why Trade with Callisto?</h2>

          <div className="grid">
            <div className="card">
              <h3>⚡ Live-feeling simulator</h3>
              <p className="muted">
                Prices drift intraday using a custom random walk so you can practice
                timing and risk without using real money.
              </p>
            </div>

            <div className="card">
              <h3>📊 Trade like the pros</h3>
              <p className="muted">
                Place market and limit orders with cancel windows, observe fills,
                and track cash, P/L, and open positions just like professional traders.
              </p>
            </div>

            <div className="card">
              <h3>🎓 Learn by doing</h3>
              <p className="muted">
                Portfolio and history views make it easy to review past trades,
                analyze performance, and build winning habits that compound.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
