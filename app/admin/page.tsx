"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/useDemoSession";

type Stock = {
  name: string;
  symbol: string;
  marketCap: number;
  tradable: boolean;
};

type Role = "user" | "admin";

type StockForm = {
  name: string;
  symbol: string;
  marketCap: string;
  tradable: boolean;
};

export default function AdminPage() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();

  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<StockForm>({
    name: "",
    symbol: "",
    marketCap: "",
    tradable: true,
  });

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingSymbol, setEditingSymbol] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ---------- Auth / role check ---------- */

  useEffect(() => {
    setMounted(true);

    try {
      const raw = localStorage.getItem("demo_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        const r: Role = parsed.role || "user";
        setRole(r);
      } else {
        setRole(null);
      }
    } catch {
      setRole(null);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !authChecked) return;

    if (!isLoggedIn) {
      router.replace("/signin");
      return;
    }

    if (role && role !== "admin") {
      router.replace("/");
    }
  }, [mounted, authChecked, isLoggedIn, role, router]);

  const isAdmin = isLoggedIn && role === "admin";

  /* ---------- Fetch stocks from DB (via /api/stocks) ---------- */

  const loadStocks = async () => {
    try {
      setLoadingStocks(true);
      setError(null);

      const res = await fetch("/api/stocks");
      if (!res.ok) throw new Error(`Failed to load stocks (${res.status})`);

      const data: Stock[] = await res.json();
      setStocks(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load stocks");
    } finally {
      setLoadingStocks(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    void loadStocks();
  }, [isAdmin]);

  /* ---------- Form helpers ---------- */

  const resetForm = () => {
    setForm({
      name: "",
      symbol: "",
      marketCap: "",
      tradable: true,
    });
    setMode("create");
    setEditingSymbol(null);
  };

  const onFormChange =
    (key: keyof StockForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        key === "tradable"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value as any }));
    };

  const onEdit = (stock: Stock) => {
    setMode("edit");
    setEditingSymbol(stock.symbol);
    setForm({
      name: stock.name,
      symbol: stock.symbol,
      marketCap: String(stock.marketCap ?? ""),
      tradable: stock.tradable,
    });
  };

  /* ---------- Create / update / delete (admin APIs) ---------- */

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!form.name.trim() || !form.symbol.trim()) {
      setError("Name and Symbol are required");
      return;
    }

    const payload = {
      name: form.name.trim(),
      symbol: form.symbol.trim().toUpperCase(),
      marketCap: Number(form.marketCap) || 0,
      tradable: form.tradable,
    };

    try {
      setSaving(true);
      setError(null);

      if (mode === "create") {
        const res = await fetch("/api/admin/stocks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `Create failed (${res.status})`);
        }
      } else if (mode === "edit" && editingSymbol) {
        const res = await fetch(`/api/admin/stocks/${editingSymbol}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `Update failed (${res.status})`);
        }
      }

      await loadStocks();
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (symbol: string) => {
    if (!isAdmin) return;
    if (!window.confirm(`Delete ${symbol}? This cannot be undone.`)) return;

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`/api/admin/stocks/${symbol}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Delete failed (${res.status})`);
      }

      await loadStocks();
      if (editingSymbol === symbol) resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Delete failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Render ---------- */

  if (!mounted || !authChecked) return null;
  if (!isAdmin) return null; // redirects handled above

  return (
    <main
      className="container admin"
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      <header className="pageheader" aria-labelledby="admin-title">
        <div>
          <h1 id="admin-title" className="stocks__title">
            Admin Dashboard
          </h1>
          <p className="stocks__sub">
            Only admins can manage stocks. Create, edit, or delete tickers.
          </p>
        </div>
      </header>

      {error && <div className="auth__alert">{error}</div>}

      <section className="admin__layout">
        {/* Left: form */}
        <div className="card admin__panel">
          <h2 className="admin__paneltitle">
            {mode === "create"
              ? "Add new stock"
              : `Edit stock (${editingSymbol})`}
          </h2>

          <form onSubmit={onSubmit} className="auth__form">
            <label className="field">
              <span className="field__label">Company Name</span>
              <input
                className="field__input"
                type="text"
                value={form.name}
                onChange={onFormChange("name")}
                placeholder="Tesla, Inc."
              />
            </label>

            <label className="field">
              <span className="field__label">Symbol</span>
              <input
                className="field__input"
                type="text"
                value={form.symbol}
                onChange={onFormChange("symbol")}
                placeholder="TSLA"
              />
            </label>

            <label className="field">
              <span className="field__label">Market Cap (USD)</span>
              <input
                className="field__input"
                type="number"
                value={form.marketCap}
                onChange={onFormChange("marketCap")}
                placeholder="1000000000"
              />
            </label>

            <label className="check">
              <input
                type="checkbox"
                checked={form.tradable}
                onChange={onFormChange("tradable")}
              />
              <span>Tradable</span>
            </label>

            <div className="admin__actions">
              <button
                className="btn btn--primary"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? mode === "create"
                    ? "Creating…"
                    : "Saving…"
                  : mode === "create"
                  ? "Add stock"
                  : "Save changes"}
              </button>

              {mode === "edit" && (
                <button
                  type="button"
                  className="btn"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: existing stocks */}
        <div className="card admin__panel">
          <h2 className="admin__paneltitle">Existing stocks</h2>

          {loadingStocks ? (
            <p>Loading stocks…</p>
          ) : (
            <div className="stocks-table">
              <div className="stocks-table__head">
                <div className="stocks-table__headcell">Name</div>
                <div className="stocks-table__headcell">Symbol</div>
                <div className="stocks-table__headcell">Market Cap</div>
                <div className="stocks-table__headcell">Tradable</div>
                <div className="stocks-table__headcell" />
              </div>

              <div className="stocks-table__body">
                {stocks.map((s) => (
                  <div className="stocks-table__row" key={s.symbol}>
                    <div className="stocks-table__cell stocks-table__cell--name">
                      {s.name}
                    </div>
                    <div className="stocks-table__cell stocks-table__cell--symbol">
                      {s.symbol}
                    </div>
                    <div className="stocks-table__cell stocks-table__cell--num">
                      {s.marketCap.toLocaleString("en-US")}
                    </div>
                    <div className="stocks-table__cell">
                      {s.tradable ? "Yes" : "No"}
                    </div>
                    <div className="stocks-table__cell stocks-table__cell--actions">
                      <button
                        className="iconbtn"
                        type="button"
                        aria-label={`Edit ${s.symbol}`}
                        onClick={() => onEdit(s)}
                      >
                        ✏️
                      </button>
                      <button
                        className="iconbtn"
                        type="button"
                        aria-label={`Delete ${s.symbol}`}
                        onClick={() => onDelete(s.symbol)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
