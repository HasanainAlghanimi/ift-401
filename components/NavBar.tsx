"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useDemoSession } from "@/lib/useDemoSession";

const links = [
  { href: "/", label: "Home" },
  { href: "/stocks", label: "Stocks" },
  { href: "/trade", label: "Trade", authOnly: true },
  { href: "/portfolio", label: "Portfolio", authOnly: true },
  { href: "/history", label: "History", authOnly: true },
  { href: "/admin", label: "Admin", authOnly: true },
];

export default function NavBar() {
  const router = useRouter();
  const { isLoggedIn } = useDemoSession();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    localStorage.removeItem("demo_session");
    window.dispatchEvent(new Event("demo-auth-changed")); // tell listeners
    router.refresh(); // nudge any client components that care
  };

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

        <div className="nav__actions">
          {mounted && (isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn--ghost">Log out</button>
          ) : (
            <>
              <Link href="/signin" className="btn btn--ghost">Sign in</Link>
              <Link href="/signup" className="btn btn--primary">Sign up</Link>
            </>
          ))}
        </div>
      </div>
    </header>
  );
}
