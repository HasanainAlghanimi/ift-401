"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/useDemoSession";
import { supabase } from "@/lib/supabaseClient";

const links = [
  { href: "/", label: "Home" },
  { href: "/stocks", label: "Stocks" },
  { href: "/trade", label: "Trade", authOnly: true },
  { href: "/portfolio", label: "Portfolio", authOnly: true },
  { href: "/history", label: "History", authOnly: true },
  { href: "/account", label: "Account", authOnly: true },
  { href: "/admin", label: "Admin", authOnly: true },
];

export default function NavBar() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();
  const [mounted, setMounted] = React.useState(false);
  const [balance, setBalance] = React.useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || !isLoggedIn) return;

    const loadBalanceForUser = async () => {
      try {
        // 1) Get email from demo_session
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
          setBalance(0);
          return;
        }

        // 2) Look up user_id
        const { data: userRows, error: userError } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", email)
          .limit(1);

        if (userError || !userRows || userRows.length === 0) {
          setBalance(0);
          return;
        }

        const userId = userRows[0].user_id as number;

        // 3) Look up that user's account
        const { data: accRows, error: accError } = await supabase
          .from("account")
          .select("available_balance")
          .eq("user_id", userId)
          .limit(1);

        if (accError || !accRows || accRows.length === 0) {
          setBalance(0);
          return;
        }

        setBalance(Number(accRows[0].available_balance) || 0);
      } catch {
        setBalance(0);
      }
    };

    loadBalanceForUser();

    const handler = (event: Event) => {
      const e = event as CustomEvent<{ availableBalance?: number }>;
      if (e.detail && typeof e.detail.availableBalance === "number") {
        setBalance(e.detail.availableBalance);
      } else {
        loadBalanceForUser();
      }
    };

    window.addEventListener("demo-balance-changed", handler);
    return () => window.removeEventListener("demo-balance-changed", handler);
  }, [mounted, isLoggedIn]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_session");
      window.dispatchEvent(new Event("demo-auth-changed"));
    }
    router.refresh();
  };

  const formattedBalance =
    mounted && isLoggedIn && balance !== null
      ? `$${balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "$0.00";

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="brand">
          <span className="brand__logo">🌕</span>
          <span className="brand__name">Callisto</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {mounted &&
            links
              .filter((l) => !l.authOnly || isLoggedIn)
              .map((l) => (
                <Link key={l.href} href={l.href} className="nav__link">
                  {l.label}
                </Link>
              ))}
        </nav>

        {mounted && isLoggedIn && (
          <div
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              padding: "4px 12px",
              borderRadius: 999,
              background: "#333",
              fontSize: "0.85rem",
            }}
          >
            {formattedBalance}
          </div>
        )}

        <div className="nav__actions">
          {mounted &&
            (isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn--ghost">
                Log out
              </button>
            ) : (
              <>
                <Link href="/signin" className="btn btn--ghost">
                  Sign in</Link>
                <Link href="/signup" className="btn btn--primary">
                  Sign up</Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}
