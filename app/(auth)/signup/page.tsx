"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Signup() {
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
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Check your email for a confirmation link!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:"var(--background)"}}>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{color:"var(--primary)"}}>ScriptFlow</h1>
          <p className="mt-2" style={{color:"var(--muted-foreground)"}}>Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl" style={{background:"var(--card)", border:"1px solid var(--border)"}}>
          <div>
            <label className="block text-sm mb-1" style={{color:"var(--muted-foreground)"}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-3 py-2 rounded-lg outline-none" style={{background:"var(--input)", color:"var(--foreground)", border:"1px solid var(--border)"}} />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{color:"var(--muted-foreground)"}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full px-3 py-2 rounded-lg outline-none" style={{background:"var(--input)", color:"var(--foreground)", border:"1px solid var(--border)"}} />
          </div>
          {message && <p className="text-sm" style={{color: message.includes("Check") ? "green" : "var(--accent)"}}>{message}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{background:"var(--primary)"}}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm" style={{color:"var(--muted-foreground)"}}>
          Already have one? <Link href="/auth/login" className="underline" style={{color:"var(--primary)"}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
