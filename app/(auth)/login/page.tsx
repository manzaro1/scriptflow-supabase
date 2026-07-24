import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const sp = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) redirect(sp.next || '/dashboard')

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{background: 'var(--background)'}}>
      <div className="w-full max-w-md p-8 rounded-2xl" style={{background: 'var(--card)', border: '1px solid var(--border)'}}>
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl" style={{background: 'var(--primary)'}}>S</div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2" style={{color: 'var(--muted-foreground)'}}>Sign in to your ScriptFlow account</p>
        </div>

        {sp.error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)'}}>
            {sp.error === 'verify_email' ? 'Please verify your email first. Check your inbox.' : sp.error}
          </div>
        )}

        <form action="/api/auth/login" method="POST">
          <input type="hidden" name="next" value={sp.next || '/dashboard'} />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--card-foreground)'}}>Email</label>
              <input name="email" type="email" required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl outline-none transition" style={{background: 'var(--input)', color: 'var(--foreground)', border: '1px solid var(--border)'}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--card-foreground)'}}>Password</label>
              <input name="password" type="password" required placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl outline-none transition" style={{background: 'var(--input)', color: 'var(--foreground)', border: '1px solid var(--border)'}} />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-base transition hover:opacity-90" style={{background: 'var(--primary)', color: 'var(--primary-foreground)'}}>
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm" style={{color: 'var(--muted-foreground)'}}>
          Don\'t have an account? <Link href="/signup" className="font-medium" style={{color: 'var(--primary)'}}>Sign up</Link>
        </p>
      </div>
    </main>
  )
}
