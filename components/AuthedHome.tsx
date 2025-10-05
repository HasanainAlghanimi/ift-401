// components/AuthedHome.tsx
"use client";
import React, { useState } from "react";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import StocksTable, { Stock } from "./StocksTable";

export default function AuthedHome() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<{ by: any; dir: "asc" | "desc" }>({ by: "ticker", dir: "asc" });

  const rows: Stock[] = [
    { id: "AAPL", ticker: "AAPL", companyName: "Apple Inc.", volume: 72_300_000,
      price: { last: 174.22, open: 173.0, high: 176.2, low: 172.8, prevClose: 173.5 }, status: "Open" },
    { id: "AMZN", ticker: "AMZN", companyName: "Amazon.com Inc.", volume: 54_200_000,
      price: { last: 132.47, open: 131.2, high: 133.5, low: 130.9, prevClose: 131.8 }, status: "Open" },
    // …add more as you like
  ];

  return (
    <>
      <PageHeader
        title="Welcome to Callisto"
        subtitle="Practice buying and selling stocks with a simulated market."
        actions={<SearchBar value={search} onChange={setSearch} />}
      />
      <section className="spaced">
        <StocksTable rows={rows} order={order} onSort={setOrder} searchTerm={search} />
      </section>
    </>
  );
}
