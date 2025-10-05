// components/StockDetail.tsx
"use client";
import React from "react";

type Price = {
  last: number;
  open: number;
  high: number;
  low: number;
  prevClose?: number; // for Δ%
};

export type StockDetailProps = {
  ticker: string;
  companyName?: string;
  price: Price;
  status?: "Open" | "Closed";
};

const fmt = (n?: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n)
    : "—";

export default function StockDetail({ ticker, companyName, price, status }: StockDetailProps) {
  const changePct =
    typeof price.prevClose === "number" && price.prevClose > 0
      ? ((price.last - price.prevClose) / price.prevClose) * 100
      : undefined;

  const changeColor =
    typeof changePct === "number"
      ? changePct > 0
        ? "#065f46" // green
        : changePct < 0
        ? "#991b1b" // red
        : "#374151"
      : "#374151";

  return (
    <div className="sd card">
      <div className="sd__head">
        <div>
          <div className="sd__symbol">{ticker}</div>
          {companyName ? <div className="sd__name">{companyName}</div> : null}
        </div>
        {status ? (
          <span
            className="badge"
            style={{
              background: status === "Open" ? "#ecfdf5" : "#f3f4f6",
              color: status === "Open" ? "#065f46" : "#374151",
              borderColor: status === "Open" ? "#a7f3d0" : "#e5e7eb",
            }}
          >
            {status}
          </span>
        ) : null}
      </div>

      <div className="sd__lastrow">
        <div className="sd__last">
          <div className="sd__lastLabel">Last</div>
          <div className="sd__lastValue">${fmt(price.last)}</div>
        </div>
        <div className="sd__delta" style={{ color: changeColor }}>
          {typeof changePct === "number" ? `${changePct.toFixed(2)}%` : "—"}
        </div>
      </div>

      <div className="sd__grid">
        <div className="sd__cell">
          <div className="sd__label">Open</div>
          <div className="sd__value">${fmt(price.open)}</div>
        </div>
        <div className="sd__cell">
          <div className="sd__label">High</div>
          <div className="sd__value">${fmt(price.high)}</div>
        </div>
        <div className="sd__cell">
          <div className="sd__label">Low</div>
          <div className="sd__value">${fmt(price.low)}</div>
        </div>
      </div>
    </div>
  );
}
