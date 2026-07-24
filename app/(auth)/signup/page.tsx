"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'#0a0a0f'}}>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" style={{color:'#6366f1'}}>ScriptFlow</h1>
        <form onSubmit={handleSubmit} className="rounded-xl p-8" style={{background:'#12121a',border:'1px solid #2a2a3a'}}>
          <h2 className="text-2xl font-bold mb-6 text-center" style={{color:'#f0f0f5'}}>Create Account</h2>
          {error && <div className="mb-4 p-3 rounded text-sm" style={{background:'rgba(239,68,68,0.1)',color:'#f87171',border:'1px solid rgba(239,68,68,0.3)'}}>{error}</div>}
          <div className="mb-4">
            <label className="block text-sm mb-2" style={{color:'#a0a0b8'}}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full px-4 py-3 rounded-lg outline-none" style={{background:'#1e1e2e',color:'#f0f0f5',border:'1px solid #2a2a3a'}} />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" style={{color:'#a0a0b8'}}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-lg outline-none" style={{background:'#1e1e2e',color:'#f0f0f5',border:'1px solid #2a2a3a'}} />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-2" style={{color:'#a0a0b8'}}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full px-4 py-3 rounded-lg outline-none" style={{background:'#1e1e2e',color:'#f0f0f5',border:'1px solid #2a2a3a'}} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{background:'#6366f1'}}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
          <p className="mt-4 text-center text-sm" style={{color:'#7070a0'}}>
            Already have an account? <Link href="/login" className="underline" style={{color:'#6366f1'}}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
