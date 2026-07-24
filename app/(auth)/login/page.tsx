"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
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
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:"var(--background)"}}>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{color:"var(--primary)"}}>ScriptFlow</h1>
          <p className="mt-2" style={{color:"var(--muted-foreground)"}}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl" style={{background:"var(--card)", border:"1px solid var(--border)"}}>
          <div>
            <label className="block text-sm mb-1" style={{color:"var(--muted-foreground)"}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-3 py-2 rounded-lg outline-none" style={{background:"var(--input)", color:"var(--foreground)", border:"1px solid var(--border)"}} />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{color:"var(--muted-foreground)"}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-3 py-2 rounded-lg outline-none" style={{background:"var(--input)", color:"var(--foreground)", border:"1px solid var(--border)"}} />
          </div>
          {message && <p className="text-sm text-red-400">{message}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{background:"var(--primary)"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button type="button" onClick={handleGoogle}
            className="w-full py-2 rounded-lg font-semibold border"
            style={{borderColor:"var(--border)", color:"var(--foreground)"}}>
            Continue with Google
          </button>
        </form>
        <p className="text-center text-sm" style={{color:"var(--muted-foreground)"}}>
          No account? <Link href="/auth/signup" className="underline" style={{color:"var(--primary)"}}>Create one</Link>
        </p>
      </div>
    </div>
  )
}
