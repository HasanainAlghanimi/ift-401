"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AccountState = {
  accountId: number | null;
  balance: number;
  availableBalance: number;
};

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AccountState>({
    accountId: null,
    balance: 0,
    availableBalance: 0,
  });
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Load account for the current demo_session email
  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setMessage(null);

        let email: string | null = null;
        if (typeof window !== "undefined") {
          try {
            const raw = window.localStorage.getItem("demo_session");
            if (raw) {
              const parsed = JSON.parse(raw);
              email = parsed.email ?? null;
            }
          } catch {
            email = null;
          }
        }

        if (!email) {
          setError("No session email found. Please sign in again.");
          return;
        }

        // users -> user_id
        const { data: userRows, error: userError } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", email)
          .limit(1);

        if (userError) {
          console.error("user lookup error:", userError);
          setError("Could not load user record for this email.");
          return;
        }
        if (!userRows || userRows.length === 0) {
          setError("No user record found for this email in the users table.");
          return;
        }

        const userId = userRows[0].user_id as number;

        // account -> balances
        const { data: accRows, error: accError } = await supabase
          .from("account")
          .select("account_id, balance, available_balance")
          .eq("user_id", userId)
          .limit(1);

        if (accError) {
          console.error("account lookup error:", accError);
          setError("Could not load account for this user.");
          return;
        }
        if (!accRows || accRows.length === 0) {
          setError(
            "No account row found for this user. Create one in Supabase (account.user_id = users.user_id)."
          );
          return;
        }

        const row = accRows[0];

        setAccount({
          accountId: row.account_id,
          balance: Number(row.balance) || 0,
          availableBalance: Number(row.available_balance) || 0,
        });
      } catch (e: any) {
        console.error("load account error:", e);
        setError("Failed to load account.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDeposit = async () => {
    setError(null);
    setMessage(null);

    const amt = Number(depositAmount);
    if (!account.accountId) {
      setError("No account loaded.");
      return;
    }
    if (!amt || amt <= 0) {
      setError("Enter a positive deposit amount.");
      return;
    }

    try {
      const newBalance = account.balance + amt;
      const newAvailable = account.availableBalance + amt;

      const { error: updateError } = await supabase
        .from("account")
        .update({
          balance: newBalance,
          available_balance: newAvailable,
        })
        .eq("account_id", account.accountId);

      if (updateError) {
        console.error("deposit update error:", updateError);
        setError("Deposit failed.");
        return;
      }

      setAccount((prev) => ({
        ...prev,
        balance: newBalance,
        availableBalance: newAvailable,
      }));
      setDepositAmount("");
      setMessage(`Deposited $${amt.toFixed(2)} successfully.`);

      // notify navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("demo-balance-changed", {
            detail: { availableBalance: newAvailable },
          })
        );
      }
    } catch (e: any) {
      console.error("deposit error:", e);
      setError("Deposit failed.");
    }
  };

  const handleWithdraw = async () => {
    setError(null);
    setMessage(null);

    const amt = Number(withdrawAmount);
    if (!account.accountId) {
      setError("No account loaded.");
      return;
    }
    if (!amt || amt <= 0) {
      setError("Enter a positive withdrawal amount.");
      return;
    }
    if (amt > account.availableBalance) {
      setError("You cannot withdraw more than your available balance.");
      return;
    }

    try {
      const newBalance = account.balance - amt;
      const newAvailable = account.availableBalance - amt;

      const { error: updateError } = await supabase
        .from("account")
        .update({
          balance: newBalance,
          available_balance: newAvailable,
        })
        .eq("account_id", account.accountId);

      if (updateError) {
        console.error("withdraw update error:", updateError);
        setError("Withdrawal failed.");
        return;
      }

      setAccount((prev) => ({
        ...prev,
        balance: newBalance,
        availableBalance: newAvailable,
      }));
      setWithdrawAmount("");
      setMessage(`Withdrew $${amt.toFixed(2)} successfully.`);

      // notify navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("demo-balance-changed", {
            detail: { availableBalance: newAvailable },
          })
        );
      }
    } catch (e: any) {
      console.error("withdraw error:", e);
      setError("Withdrawal failed.");
    }
  };

  if (loading) {
    return (
      <main
        className="page accountpage container"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <h1>Account</h1>
        <p>Loading your account…</p>
      </main>
    );
  }

  const buttonsDisabled = !account.accountId;

  return (
    <main
      className="page accountpage container"
      style={{ paddingTop: 24, paddingBottom: 24, maxWidth: 900, margin: "0 auto" }}
    >
      <h1 className="accountpage__title">Account</h1>
      <p className="accountpage__subtitle">
        Manage your cash balance for trading (linked to your user record).
      </p>

      {error && (
        <div className="account-alert account-alert--error">
          {error}
        </div>
      )}

      {message && (
        <div className="account-alert account-alert--ok">
          {message}
        </div>
      )}

      <section className="account-grid">
        {/* Balances card */}
        <div className="card accountcard">
          <h2>Balances</h2>
          <p className="account-label">Cash balance</p>
          <p className="account-value">
            {`$${account.balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </p>

          <p className="account-label" style={{ marginTop: 12 }}>
            Available to trade
          </p>
          <p className="account-value">
            {`$${account.availableBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </p>
        </div>

        {/* Deposit / Withdraw card */}
        <div className="card accountcard accountcard--actions">
          <div>
            <h2>Deposit</h2>
            <div className="account-inputrow">
              <input
                type="number"
                min="0"
                step="0.01"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount"
                className="account-input"
              />
              <button
                type="button"
                onClick={handleDeposit}
                className="btn btn--primary"
                disabled={buttonsDisabled}
              >
                Deposit
              </button>
            </div>
          </div>

          <div>
            <h2>Withdraw</h2>
            <div className="account-inputrow">
              <input
                type="number"
                min="0"
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount"
                className="account-input"
              />
              <button
                type="button"
                onClick={handleWithdraw}
                className="btn btn--ghost"
                disabled={buttonsDisabled}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
