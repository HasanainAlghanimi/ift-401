// app/page.tsx
import PublicHome from "../components/PublicHome";
import AuthedHome from "../components/AuthedHome";

/**
 * TEMP auth toggle for visuals:
 * - Set to true to see the signed-in home (Stocks table)
 * - Set to false to see the public landing page
 *
 * LATER: replace this with a real session check (NextAuth example below).
 */
const isAuthed = false;

export default function Home() {
  return isAuthed ? <AuthedHome /> : <PublicHome />;
}

/* ------------------------- NextAuth version (later) -------------------------

// If you add NextAuth, you can replace the code above with this:

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-options"; // adjust path

export default async function Home() {
  const session = await getServerSession(authOptions);
  return session ? <AuthedHome /> : <PublicHome />;
}

--------------------------------------------------------------------------- */
