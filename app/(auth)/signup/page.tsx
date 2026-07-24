"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: 20 }}>
      <div style={{ maxWidth: 400, background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 16, padding: 36, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Check your email</h2>
        <p style={{ color: '#7070a0', marginBottom: 24 }}>We sent a confirmation link to <strong style={{ color: '#f0f0f5' }}>{email}</strong>. Click it to activate your account.</p>
        <Link href="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Back to sign in</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#12121a', border: '1px solid #2a2a3a', borderRadius: 16, padding: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4, textAlign: 'center' }}>Create account</h1>
        <p style={{ color: '#7070a0', textAlign: 'center', marginBottom: 32 }}>Start writing your screenplay today</p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} required
            style={inputStyle} />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
            style={inputStyle} />
          <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
            style={inputStyle} />
          {error && <div style={{ color: '#f87171', fontSize: 14, padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: 6 }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ background: loading ? '#4a4a6a' : '#6366f1', color: '#fff', padding: '12px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15 }}>
            {loading ? "Creating account..." : "Create Free Account"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#7070a0', fontSize: 14 }}>
          Already have an account? <Link href="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#1e1e2e', border: '1px solid #2a2a3a', borderRadius: 8,
  padding: '12px 14px', color: '#f0f0f5', fontSize: 15, width: '100%', outline: 'none',
}
