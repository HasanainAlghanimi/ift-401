// components/NavBar.tsx
"use client";
import Link from "next/link";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/stocks", label: "Stocks" },
  { href: "/trade", label: "Trade" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/history", label: "History" },
  { href: "/admin", label: "Admin" },
];

export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="brand">
          <span className="brand__logo">🌕</span>
          <span className="brand__name">Callisto</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <Link href="/login" className="btn btn--ghost">
            Log in
          </Link>
          <Link href="/signup" className="btn btn--primary">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
