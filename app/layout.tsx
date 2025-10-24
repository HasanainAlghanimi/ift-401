// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Callisto",
  description: "Best trading platform in the world",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container footer__inner">
            <span>© {new Date().getFullYear()} Callisto Inc. </span>
            <span className="muted">Callisto.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
