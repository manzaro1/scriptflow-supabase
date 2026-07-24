"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } },
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Check your email to confirm your account!")
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
          Create your account
        </h1>
        <p style={{ color: "var(--muted-foreground)", textAlign: "center", marginBottom: "2rem" }}>
          Start writing professional screenplays with AI
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
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text" placeholder="Full name" value={fullName}
            onChange={(e) => setFullName(e.target.value)} required
            style={inputStyle}
          />
          <input
            type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password (min 6 chars)" value={password}
            onChange={(e) => setPassword(e.target.value)} required minLength={6}
            style={inputStyle}
          />
          {message && (
            <p style={{ color: message.includes("Check") ? "#22c55e" : "#ef4444", fontSize: "0.875rem" }}>{message}</p>
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Sign in
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
