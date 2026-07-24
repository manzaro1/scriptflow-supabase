import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--primary)" }}>
          ScriptFlow
        </div>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {user ? (
            <Link href="/dashboard" style={{ color: "var(--foreground)", textDecoration: "none", fontSize: "0.95rem" }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" style={{ color: "var(--muted-foreground)", textDecoration: "none", fontSize: "0.95rem" }}>
                Sign in
              </Link>
              <Link href="/signup" style={{ background: "var(--primary)", color: "white", padding: "0.5rem 1rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.95rem" }}>
                Get Started
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "640px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "bold", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            AI-Powered Screenwriting{" "}
            <span style={{ color: "var(--primary)" }}>Built for Film</span>
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Write studio-ready screenplays with intelligent AI assistance. Format perfectly, develop characters, and bring your stories to life—all in one platform.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" style={{ background: "var(--primary)", color: "white", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontSize: "1rem", fontWeight: "500" }}>
              Start Writing Free
            </Link>
            <Link href="/login" style={{ background: "var(--secondary)", color: "var(--foreground)", padding: "0.875rem 2rem", borderRadius: "8px", textDecoration: "none", fontSize: "1rem" }}>
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "5rem", maxWidth: "900px", width: "100%" }}>
          {[
            { title: "Smart Formatting", desc: "Industry-standard screenplay format automatically" },
            { title: "AI Writing Assistant", desc: "Get suggestions and overcome writer's block" },
            { title: "Character Chat", desc: "Talk to your characters to deepen their voices" },
            { title: "Real-time Collaboration", desc: "Work with co-writers seamlessly" },
          ].map(({ title, desc }) => (
            <div key={title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "left" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: "2rem", textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.875rem", borderTop: "1px solid var(--border)" }}>
        ScriptFlow — Built for filmmakers and screenwriters.
      </footer>
    </div>
  )
}
