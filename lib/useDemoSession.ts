"use client";
import { useEffect, useState } from "react";

function readSession() {
  try { return JSON.parse(localStorage.getItem("demo_session") || "null"); }
  catch { return null; }
}

export function useDemoSession() {
  const [session, setSession] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSession(readSession());
      setReady(true);
    };
    sync();

    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "demo_session") { setSession(readSession()); }
    };
    const onAuthChanged = () => setSession(readSession());
    const onVis = () => { if (document.visibilityState === "visible") setSession(readSession()); };

    window.addEventListener("storage", onStorage);
    window.addEventListener("demo-auth-changed", onAuthChanged);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("demo-auth-changed", onAuthChanged);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return { session, isLoggedIn: !!session, ready };
}
