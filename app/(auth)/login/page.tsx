"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>
          Welcome back
        </h1>
        <p style={{ color: "var(--muted-foreground)", textAlign: "center", marginBottom: "2rem" }}>
          Sign in to your ScriptFlow account
        </p>
        <button
          onClick={handleGoogle}
          style={{
            width: "100%", padding: "0.75rem", marginBottom: "1.5rem",
            background: "var(--secondary)", color: "var(--foreground)",
            border: "1px solid var(--border)", borderRadius: "8px",
            cursor: "pointer", fontSize: "0.95rem",
          }}
        >
          Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
          <hr style={{ flex: 1, borderColor: "var(--border)" }} />
          <span>or</span>
          <hr style={{ flex: 1, borderColor: "var(--border)" }} />
        </div>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            style={inputStyle}
          />
          {message && (
            <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{message}</p>
          )}
          <button
            type="submit" disabled={loading}
            style={{
              padding: "0.75rem", background: "var(--primary)",
              color: "var(--primary-foreground)", border: "none",
              borderRadius: "8px", cursor: "pointer", fontSize: "1rem",
              fontWeight: "500", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem", background: "var(--input)",
  color: "var(--foreground)", border: "1px solid var(--border)",
  borderRadius: "8px", fontSize: "0.95rem",
}
