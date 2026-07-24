"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 16, padding: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4, textAlign: 'center' }}>Welcome back</h1>
        <p style={{ color: '#7070a0', textAlign: 'center', marginBottom: 32 }}>Sign in to continue writing</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} required
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required
            style={inputStyle}
          />
          {error && <div style={{ color: '#f87171', fontSize: 14, padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: 6 }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ background: loading ? '#4a4a6a' : '#6366f1', color: '#fff', padding: '12px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#7070a0', fontSize: 14 }}>
          Don't have an account? <Link href="/signup" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#1e1e2e', border: '1px solid #2a2a3a', borderRadius: 8,
  padding: '12px 14px', color: '#f0f0f5', fontSize: 15, width: '100%', outline: 'none',
}
