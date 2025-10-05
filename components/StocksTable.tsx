// components/StocksTable.tsx
"use client";
import React, { useMemo } from "react";

export type Price = {
  last: number;
  open: number;
  high: number;
  low: number;
  prevClose?: number; // used to compute Δ%
};

export type Stock = {
  id: string;
  ticker: string;
  companyName: string;
  volume: number;
  price: Price;
  status?: "Open" | "Closed";
};

type OrderKey =
  | "ticker"
  | "companyName"
  | "volume"
  | "last"
  | "changePct"
  | "marketCap"
  | "open"
  | "high"
  | "low"
  | "status";

export type StocksTableProps = {
  rows: Stock[];
  order?: { by: OrderKey; dir: "asc" | "desc" };
  onSort?: (next: { by: OrderKey; dir: "asc" | "desc" }) => void;
  loading?: boolean;
  error?: string | null;
  searchTerm?: string; // optional, you can filter upstream or pass here
};

const numberFmt = (n?: number, opts: Intl.NumberFormatOptions = {}) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...opts,
      }).format(n)
    : "—";

const compactFmt = (n?: number) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat(undefined, {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(n)
    : "—";

const StocksTable: React.FC<StocksTableProps> = ({
  rows,
  order = { by: "ticker", dir: "asc" },
  onSort = () => {},
  loading = false,
  error = null,
  searchTerm = "",
}) => {
  // derive market cap & changePct, and do simple local filtering if searchTerm provided
  const derived = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return rows
      .map((r) => {
        const { last, open, high, low, prevClose } = r.price;
        const marketCap =
          typeof last === "number" && typeof r.volume === "number"
            ? last * r.volume
            : undefined;
        const changePct =
          typeof prevClose === "number" && prevClose > 0
            ? ((last - prevClose) / prevClose) * 100
            : undefined;

        return {
          ...r,
          _derived: { marketCap, changePct },
        };
      })
      .filter((r) =>
        term
          ? r.ticker.toLowerCase().includes(term) ||
            r.companyName.toLowerCase().includes(term)
          : true
      );
  }, [rows, searchTerm]);

  // sorting
  const sorted = useMemo(() => {
    const copy = [...derived];
    const dir = order.dir === "asc" ? 1 : -1;

    const val = (r: (typeof derived)[number], key: OrderKey) => {
      switch (key) {
        case "last":
          return r.price.last;
        case "open":
          return r.price.open;
        case "high":
          return r.price.high;
        case "low":
          return r.price.low;
        case "marketCap":
          return r._derived.marketCap;
        case "changePct":
          return r._derived.changePct;
        default:
          return (r as any)[key];
      }
    };

    copy.sort((a, b) => {
      const av = val(a, order.by);
      const bv = val(b, order.by);

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as < bs) return -1 * dir;
      if (as > bs) return 1 * dir;
      return 0;
    });

    return copy;
  }, [derived, order]);

  const cols: { key: OrderKey; label: string; numeric?: boolean; width?: string }[] =
    [
      { key: "ticker", label: "Symbol", width: "7rem" },
      { key: "companyName", label: "Name", width: "auto" },
      { key: "last", label: "Last", numeric: true, width: "8rem" },
      { key: "changePct", label: "Δ %", numeric: true, width: "6rem" },
      { key: "volume", label: "Volume", numeric: true, width: "9rem" },
      { key: "marketCap", label: "Market Cap", numeric: true, width: "11rem" },
      { key: "open", label: "Open", numeric: true, width: "8rem" },
      { key: "high", label: "High", numeric: true, width: "8rem" },
      { key: "low", label: "Low", numeric: true, width: "8rem" },
      { key: "status", label: "Status", width: "7rem" },
    ];

  const sortIcon = (key: OrderKey) =>
    order.by !== key ? "↕" : order.dir === "asc" ? "▲" : "▼";

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>Stocks Table</h2>
        {error ? (
          <span role="alert" style={styles.badgeError}>
            {error}
          </span>
        ) : loading ? (
          <span style={styles.badgeMuted}>Loading…</span>
        ) : (
          <span style={styles.badgeOk}>Live</span>
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table role="grid" style={styles.table}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key} scope="col" style={{ ...styles.th, width: c.width }}>
                  <button
                    type="button"
                    onClick={() =>
                      onSort(
                        order.by === c.key
                          ? { by: c.key, dir: order.dir === "asc" ? "desc" : "asc" }
                          : { by: c.key, dir: "asc" }
                      )
                    }
                    aria-label={`Sort by ${c.label}`}
                    style={styles.sortBtn}
                  >
                    <span>{c.label}</span>
                    <span aria-hidden="true" style={styles.sortIcon}>
                      {sortIcon(c.key)}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && rows.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {cols.map((c) => (
                      <td key={String(c.key)} style={{ ...styles.td, ...(c.numeric ? styles.tdNum : null) }}>
                        <div style={styles.skeleton} />
                      </td>
                    ))}
                  </tr>
                ))
              : sorted.length === 0
              ? (
                <tr>
                  <td colSpan={cols.length} style={{ ...styles.td, textAlign: "center", padding: "24px" }}>
                    No results.
                  </td>
                </tr>
                )
              : sorted.map((r) => {
                  const { last, open, high, low } = r.price;
                  const mcap = r._derived.marketCap;
                  const chg = r._derived.changePct;
                  const chgColor =
                    typeof chg === "number"
                      ? chg > 0
                        ? "#065f46" // green
                        : chg < 0
                        ? "#991b1b" // red
                        : "#374151"
                      : "#374151";

                  return (
                    <tr key={r.id} style={styles.row}>
                      <td style={styles.td}>{r.ticker}</td>
                      <td style={styles.td}>{r.companyName}</td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {numberFmt(last)}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum, color: chgColor }}>
                        {typeof chg === "number" ? `${chg.toFixed(2)}%` : "—"}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {compactFmt(r.volume)}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {compactFmt(mcap)}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {numberFmt(open)}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {numberFmt(high)}
                      </td>
                      <td style={{ ...styles.td, ...styles.tdNum }}>
                        {numberFmt(low)}
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badgeTiny,
                            background: r.status === "Open" ? "#ecfdf5" : "#f3f4f6",
                            color: r.status === "Open" ? "#065f46" : "#374151",
                            borderColor: r.status === "Open" ? "#a7f3d0" : "#e5e7eb",
                          }}
                        >
                          {r.status ?? "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    padding: 16,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  sortBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    font: "inherit",
    color: "#111827",
  },
  sortIcon: { opacity: 0.6, fontSize: 12 },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #f3f4f6",
    color: "#111827",
    whiteSpace: "nowrap",
  },
  tdNum: { textAlign: "right", fontVariantNumeric: "tabular-nums" },
  row: { transition: "background 120ms" },
  badgeOk: {
    background: "#ecfdf5",
    color: "#065f46",
    border: "1px solid #a7f3d0",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
  },
  badgeMuted: {
    background: "#f3f4f6",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
  },
  badgeError: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
  },
  badgeTiny: {
    display: "inline-block",
    border: "1px solid",
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 12,
  },
  skeleton: {
    height: 12,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06))",
    backgroundSize: "200% 100%",
    borderRadius: 6,
    animation: "pulse 1.2s ease-in-out infinite",
  },
};

// one-time keyframes injection (safe in client components)
if (typeof document !== "undefined" && !document.getElementById("stocks-table-keyframes")) {
  const style = document.createElement("style");
  style.id = "stocks-table-keyframes";
  style.innerHTML = `
  @keyframes pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }`;
  document.head.appendChild(style);
}

export default StocksTable;
